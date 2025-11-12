const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs'); // Add sync fs for readdir callback
const { bundle } = require('@remotion/bundler');
const { renderMedia, selectComposition } = require('@remotion/renderer');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
require('dotenv').config();

// Import S3 service
const { uploadVideosToS3, isS3Configured } = require('./s3-service');

// Import async video generator
const { generateVideoAsync } = require('./video-generator-async');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic Authentication Middleware
function basicAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="VidBuilder API"');
    return res.status(401).json({
      error: 'Authentication required',
      message: 'Please provide valid credentials using Basic Authentication'
    });
  }
  
  try {
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    
    // Get credentials from environment variables
    const validUsername = process.env.API_USERNAME || 'admin';
    const validPassword = process.env.API_PASSWORD || 'changeme';
    
    if (username === validUsername && password === validPassword) {
      next();
    } else {
      res.setHeader('WWW-Authenticate', 'Basic realm="VidBuilder API"');
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Username or password is incorrect'
      });
    }
  } catch (error) {
    res.setHeader('WWW-Authenticate', 'Basic realm="VidBuilder API"');
    return res.status(401).json({
      error: 'Authentication failed',
      message: 'Invalid authorization header format'
    });
  }
}

// Serve static files from the root directory
app.use(express.static(__dirname));

// Serve music files from src/tracks
app.use('/tracks', express.static(path.join(__dirname, 'src', 'tracks')));

// API endpoint to list available music tracks
app.get('/api/music-tracks', (req, res) => {
  const tracksDir = path.join(__dirname, 'src', 'tracks');
  
  fsSync.readdir(tracksDir, (err, files) => {
    if (err) {
      console.error('Error reading tracks directory:', err);
      return res.status(500).json({ error: 'Failed to read music tracks', details: err.message });
    }
    
    // Filter for MP3 files only
    const mp3Files = files.filter(file => file.toLowerCase().endsWith('.mp3'));
    
    // Create track objects with clean names
    const tracks = mp3Files.map((file, index) => {
      // Clean up the filename to create a display name
      let name = file.replace('.mp3', '');
      // Remove numbers and hyphens, capitalize words
      name = name
        .replace(/[-_]/g, ' ')
        .replace(/\s*\d+\s*/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      return {
        id: `track-${index + 1}`,
        name: name,
        filename: file,
        url: `/tracks/${encodeURIComponent(file)}`
      };
    });
    
    console.log(`✅ Music API: Loaded ${tracks.length} tracks from src/tracks`);
    res.json({ tracks });
  });
});

// Serve static files from temp directory for Remotion to access
app.use('/temp', express.static(path.join(__dirname, 'temp')));

// Create necessary directories
const createDirectories = async () => {
  const dirs = ['uploads', 'output', 'temp'];
  for (const dir of dirs) {
    await fs.mkdir(path.join(__dirname, dir), { recursive: true });
  }
};

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Process uploaded images
const processImage = async (imagePath) => {
  const processedPath = path.join(__dirname, 'temp', `processed_${path.basename(imagePath)}`);
  
  await sharp(imagePath)
    .resize(1920, 1080, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toFile(processedPath);
  
  return processedPath;
};

// Main video generation endpoint
app.post('/api/generate-video', upload.array('screenshots', 10), async (req, res) => {
  const jobId = uuidv4();
  
  try {
    const { title, description, duration = 30 } = req.body;
    
    // Validate inputs
    if (!title || !description) {
      return res.status(400).json({
        error: 'Title and description are required'
      });
    }
    
    if (duration < 10 || duration > 120) {
      return res.status(400).json({
        error: 'Duration must be between 10 and 120 seconds'
      });
    }
    
    console.log(`Starting video generation job ${jobId}`);
    console.log(`Title: ${title}`);
    console.log(`Description: ${description}`);
    console.log(`Duration: ${duration} seconds`);
    console.log(`Screenshots: ${req.files ? req.files.length : 0}`);
    
    // Process uploaded screenshots
    let screenshotPaths = [];
    let screenshotUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const processedPath = await processImage(file.path);
        screenshotPaths.push(processedPath);
        
        // Convert file path to URL that Remotion can access
        const filename = path.basename(processedPath);
        const imageUrl = `http://localhost:${PORT}/temp/${filename}`;
        screenshotUrls.push(imageUrl);
      }
    }
    
    // Prepare input props for the video
    const inputProps = {
      title,
      description,
      screenshots: screenshotUrls, // Use URLs instead of file paths
      duration: Number(duration)
    };
    
    console.log('Screenshot URLs:', screenshotUrls);
    
    // Bundle the video
    console.log('Bundling video...');
    const bundleLocation = await bundle({
      entryPoint: path.join(__dirname, 'src/index.tsx'),
      webpackOverride: (config) => config,
    });
    
    // Get composition details
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: 'PromoVideo',
      inputProps,
    });
    
    // Update composition duration based on user input
    const fps = composition.fps;
    const durationInFrames = Math.floor(duration * fps);
    
    // Output path for the video
    const outputPath = path.join(__dirname, 'output', `${jobId}.mp4`);
    
    // Render the video
    console.log('Rendering video...');
    await renderMedia({
      composition: {
        ...composition,
        durationInFrames,
      },
      serveUrl: bundleLocation,
      codec: 'h264',
      outputLocation: outputPath,
      inputProps,
      // High-quality 4K rendering settings
      videoBitrate: '20M', // 20 Mbps for 4K quality
      pixelFormat: 'yuv420p',
      encodingMaxRate: '25M',
      encodingBufferSize: '50M',
      onProgress: ({ progress }) => {
        console.log(`Rendering progress: ${Math.round(progress * 100)}%`);
      },
    });
    
    console.log(`Video generated successfully: ${outputPath}`);
    
    // Clean up temporary files after a small delay to ensure rendering is complete
    setTimeout(async () => {
      for (const screenshot of screenshotPaths) {
        await fs.unlink(screenshot).catch((err) => {
          console.log(`Could not delete temp file: ${screenshot}`);
        });
      }
      if (req.files) {
        for (const file of req.files) {
          await fs.unlink(file.path).catch((err) => {
            console.log(`Could not delete upload file: ${file.path}`);
          });
        }
      }
      console.log('Temporary files cleaned up');
    }, 2000);
    
    res.json({
      success: true,
      jobId,
      message: 'Video generated successfully',
      videoUrl: `/api/download/${jobId}`,
      duration,
      title,
    });
    
  } catch (error) {
    console.error('Error generating video:', error);
    
    // Clean up on error
    if (req.files) {
      for (const file of req.files) {
        await fs.unlink(file.path).catch(() => {});
      }
    }
    
    res.status(500).json({
      error: 'Failed to generate video',
      details: error.message,
      jobId,
    });
  }
});

// Job status storage (in production, use Redis or database)
const jobStatus = new Map();

// Helper function to send webhook notification
async function sendWebhook(webhookUrl, payload) {
  if (!webhookUrl) return;
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'VidBuilder/1.0'
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      console.error(`Webhook failed: ${response.status} ${response.statusText}`);
    } else {
      console.log(`✅ Webhook sent to ${webhookUrl}`);
    }
  } catch (error) {
    console.error(`Webhook error: ${error.message}`);
  }
}


// NEW: Async video generation endpoint with webhook support (requires auth)
app.post('/api/generate-video-async', basicAuth, upload.array('images', 20), async (req, res) => {
  const jobId = uuidv4();
  
  try {
    // Support both JSON body and multipart/form-data
    let videoConfig;
    let webhookUrl;
    const contentType = req.headers['content-type'] || '';
    
    if (contentType.includes('application/json')) {
      // Direct JSON body
      videoConfig = req.body;
      webhookUrl = req.body.webhookUrl;
    } else {
      // Multipart form data - config is a string field
      const { config, webhookUrl: formWebhook } = req.body;
      webhookUrl = formWebhook;
      
      if (typeof config === 'string') {
        try {
          videoConfig = JSON.parse(config);
        } catch (e) {
          return res.status(400).json({
            error: 'Invalid JSON configuration',
            details: e.message
          });
        }
      } else {
        videoConfig = config;
      }
    }
    
    // Validate config
    if (!videoConfig || !videoConfig.scenes || !Array.isArray(videoConfig.scenes)) {
      return res.status(400).json({
        error: 'Invalid video configuration. Must include scenes array.',
        receivedConfig: videoConfig
      });
    }
    
    // Validate webhook URL is provided
    if (!webhookUrl) {
      return res.status(400).json({
        error: 'Webhook URL is required for async video generation.',
        message: 'Please provide a webhookUrl in your request body to receive status updates.',
        hint: 'Use /api/generate-flexible-video for synchronous generation without webhooks.'
      });
    }
    
    // Validate webhook URL format
    try {
      const url = new URL(webhookUrl);
      if (!['http:', 'https:'].includes(url.protocol)) {
        return res.status(400).json({
          error: 'Invalid webhook URL protocol.',
          message: 'Webhook URL must use http:// or https://',
          receivedUrl: webhookUrl
        });
      }
    } catch (error) {
      return res.status(400).json({
        error: 'Invalid webhook URL format.',
        message: 'Please provide a valid HTTP/HTTPS URL.',
        receivedUrl: webhookUrl
      });
    }
    
    // Initialize job status
    jobStatus.set(jobId, {
      status: 'queued',
      progress: 0,
      message: 'Job queued for processing',
      createdAt: new Date().toISOString()
    });
    
    // Start video generation in background (don't await)
    generateVideoAsync(jobId, videoConfig, req.files, webhookUrl, jobStatus, PORT).catch(err => {
      console.error(`Background job ${jobId} failed:`, err);
    });
    
    // Return immediately with job ID
    return res.status(202).json({
      success: true,
      jobId,
      status: 'queued',
      message: 'Video generation started. You will receive updates via webhook.',
      webhookConfigured: !!webhookUrl,
      statusUrl: `/api/job-status/${jobId}`,
      estimatedTime: '3-15 minutes'
    });
    
  } catch (error) {
    console.error('Error starting video generation:', error);
    return res.status(500).json({
      error: 'Failed to start video generation',
      details: error.message
    });
  }
});

// Get job status endpoint (requires auth)
app.get('/api/job-status/:jobId', basicAuth, (req, res) => {
  const { jobId } = req.params;
  const status = jobStatus.get(jobId);
  
  if (!status) {
    return res.status(404).json({
      error: 'Job not found',
      jobId
    });
  }
  
  return res.json({
    jobId,
    ...status
  });
});

// EXISTING: Synchronous video generation endpoint (kept for backward compatibility, requires auth)
app.post('/api/generate-flexible-video', basicAuth, upload.array('images', 20), async (req, res) => {
  const jobId = uuidv4();
  
  try {
    // Support both JSON body and multipart/form-data
    let videoConfig;
    const contentType = req.headers['content-type'] || '';
    
    if (contentType.includes('application/json')) {
      // Direct JSON body
      videoConfig = req.body;
    } else {
      // Multipart form data - config is a string field
      const { config } = req.body;
      
      if (typeof config === 'string') {
        try {
          videoConfig = JSON.parse(config);
        } catch (e) {
          return res.status(400).json({
            error: 'Invalid JSON configuration',
            details: e.message
          });
        }
      } else {
        videoConfig = config;
      }
    }
    
    // Validate config
    if (!videoConfig || !videoConfig.scenes || !Array.isArray(videoConfig.scenes)) {
      return res.status(400).json({
        error: 'Invalid video configuration. Must include scenes array.',
        receivedConfig: videoConfig
      });
    }
    
    console.log(`Starting flexible video generation job ${jobId}`);
    console.log(`Title: ${videoConfig.title || 'Untitled'}`);
    console.log(`Type: ${videoConfig.type || 'promotional'}`);
    console.log(`Scenes: ${videoConfig.scenes.length}`);
    console.log(`Images uploaded: ${req.files ? req.files.length : 0}`);
    
    // Process uploaded images
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const processedPath = await processImage(file.path);
        const filename = path.basename(processedPath);
        const imageUrl = `http://localhost:${PORT}/temp/${filename}`;
        imageUrls.push(imageUrl);
      }
    }
    
    // Distribute images across scenes that can use them
    const imageScenes = ['product-showcase', 'hero-title', 'product-matrix'];
    let imageIndex = 0;
    
    videoConfig.scenes.forEach(scene => {
      if (imageScenes.includes(scene.type) && imageUrls.length > 0) {
        if (!scene.content.images) {
          scene.content.images = [];
        }
        // Add images to this scene
        const imagesForScene = imageUrls.slice(imageIndex, imageIndex + 3);
        scene.content.images.push(...imagesForScene);
        imageIndex = (imageIndex + 3) % imageUrls.length;
      }
    });
    
    // Resolve music URL from trackId - Use local tracks from src/tracks folder
    if (videoConfig.music && videoConfig.music.enabled && videoConfig.music.trackId) {
      // Build music library from local files
      const tracksDir = path.join(__dirname, 'src', 'tracks');
      const files = fsSync.readdirSync(tracksDir).filter(file => file.toLowerCase().endsWith('.mp3'));
      
      const musicLibrary = {};
      files.forEach((file, index) => {
        const trackId = `track-${index + 1}`;
        const musicUrl = `http://localhost:${PORT}/tracks/${encodeURIComponent(file)}`;
        musicLibrary[trackId] = musicUrl;
      });
      
      const musicUrl = musicLibrary[videoConfig.music.trackId];
      if (musicUrl) {
        videoConfig.music.url = musicUrl;
        console.log(`🎵 Music track resolved: ${videoConfig.music.trackId} -> ${musicUrl}`);
      } else {
        console.warn(`⚠️ Music track not found: ${videoConfig.music.trackId}`);
      }
    }
    
    console.log('Processed configuration:', JSON.stringify(videoConfig, null, 2));
    
    // Process scenes and inject image URLs where needed
    const processedScenes = videoConfig.scenes.map((scene, index) => {
      // For product-showcase scenes, inject uploaded images
      if (scene.type === 'product-showcase' && imageUrls.length > 0) {
        if (!scene.content.images || scene.content.images.length === 0) {
          scene.content.images = imageUrls;
        }
      }
      
      // For step-by-step scenes, distribute images across steps
      if (scene.type === 'step-by-step' && scene.content.steps && imageUrls.length > 0) {
        scene.content.steps.forEach((step, stepIndex) => {
          if (stepIndex < imageUrls.length && !step.image) {
            step.image = imageUrls[stepIndex];
          }
        });
      }
      
      return scene;
    });
    
    // Calculate total duration
    const totalDuration = processedScenes.reduce((sum, scene) => sum + scene.duration, 0);
    
    if (totalDuration > 120) {
      return res.status(400).json({
        error: `Total video duration (${totalDuration}s) exceeds maximum allowed (120s)`
      });
    }
    
    // Update config with processed scenes
    videoConfig.scenes = processedScenes;
    
    console.log('Processed configuration:', JSON.stringify(videoConfig, null, 2));
    
    // Bundle the video
    console.log('Bundling flexible video...');
    const bundleLocation = await bundle({
      entryPoint: path.join(__dirname, 'src/index.tsx'),
      webpackOverride: (config) => config,
    });
    
    // Get composition details - use EnhancedFlexibleVideo if it has enhanced features
    const compositionId = videoConfig.music || videoConfig.colorScheme?.fontFamily 
      ? 'EnhancedFlexibleVideo' 
      : 'FlexibleVideo';
    
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: compositionId,
      inputProps: videoConfig,
    });
    
    // Calculate frames based on total duration
    const fps = videoConfig.fps || 30;
    const durationInFrames = Math.floor(totalDuration * fps);
    
    // Check if user wants Instagram Reels version
    const generateReels = videoConfig.generateReels === true;
    
    // Output paths
    const outputPath = path.join(__dirname, 'output', `${jobId}.mp4`);
    const reelsOutputPath = generateReels ? path.join(__dirname, 'output', `${jobId}_reels.mp4`) : null;
    
    // Render standard video
    console.log(`Rendering standard video (${totalDuration} seconds)...`);
    const startTime = Date.now();
    
    await renderMedia({
      composition: {
        ...composition,
        durationInFrames,
      },
      serveUrl: bundleLocation,
      codec: 'h264',
      outputLocation: outputPath,
      inputProps: videoConfig,
      // High-quality 4K rendering settings
      videoBitrate: '20M', // 20 Mbps for 4K quality
      pixelFormat: 'yuv420p',
      encodingMaxRate: '25M',
      encodingBufferSize: '50M',
      // Performance optimizations - use all CPU cores
      concurrency: null, // Auto-detect CPU cores (uses all available)
      // Alternative: specify number of cores: concurrency: 4
      onProgress: ({ progress, renderedFrames, encodedFrames }) => {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        console.log(`Standard video: ${Math.round(progress * 100)}% (${renderedFrames}/${durationInFrames} frames, ${elapsed}s elapsed)`);
      },
    });
    
    const renderTime = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`✅ Standard video generated in ${renderTime}s: ${outputPath}`);
    
    // Render Instagram Reels version if requested
    if (generateReels) {
      console.log(`\n📱 Rendering Instagram Reels version (1080x1920)...`);
      const reelsStartTime = Date.now();
      
      // Get Reels composition with vertical dimensions
      const reelsComposition = await selectComposition({
        serveUrl: bundleLocation,
        id: compositionId,
        inputProps: {
          ...videoConfig,
          width: 1080,
          height: 1920,
        },
      });
      
      await renderMedia({
        composition: {
          ...reelsComposition,
          durationInFrames,
        },
        serveUrl: bundleLocation,
        codec: 'h264',
        outputLocation: reelsOutputPath,
        inputProps: {
          ...videoConfig,
          width: 1080,
          height: 1920,
        },
        videoBitrate: '8M', // 8 Mbps for 1080p vertical
        pixelFormat: 'yuv420p',
        encodingMaxRate: '10M',
        encodingBufferSize: '20M',
        // Performance optimizations - use all CPU cores
        concurrency: null, // Auto-detect CPU cores
        onProgress: ({ progress, renderedFrames }) => {
          const elapsed = ((Date.now() - reelsStartTime) / 1000).toFixed(1);
          console.log(`Reels video: ${Math.round(progress * 100)}% (${renderedFrames}/${durationInFrames} frames, ${elapsed}s elapsed)`);
        },
      });
      
      const reelsRenderTime = ((Date.now() - reelsStartTime) / 1000).toFixed(1);
      console.log(`✅ Reels video generated in ${reelsRenderTime}s: ${reelsOutputPath}`);
    }
    
    // Upload to S3 if configured
    let s3Upload = null;
    if (isS3Configured()) {
      console.log('\n☁️  Uploading videos to S3...');
      try {
        s3Upload = await uploadVideosToS3(
          outputPath,
          generateReels ? reelsOutputPath : null,
          jobId
        );
        
        if (s3Upload.success) {
          console.log('✅ Videos uploaded to S3 successfully');
          if (s3Upload.standard) {
            console.log(`   📹 Standard: ${s3Upload.standard.s3Key}`);
          }
          if (s3Upload.reels) {
            console.log(`   📱 Reels: ${s3Upload.reels.s3Key}`);
          }
        }
      } catch (error) {
        console.error('⚠️  S3 upload failed (videos still available locally):', error.message);
      }
    } else {
      console.log('ℹ️  S3 not configured - videos saved locally only');
    }
    
    // Clean up temporary files after a delay
    setTimeout(async () => {
      if (req.files) {
        for (const file of req.files) {
          await fs.unlink(file.path).catch((err) => {
            console.log(`Could not delete upload file: ${file.path}`);
          });
        }
      }
      console.log('Temporary files cleaned up');
    }, 2000);
    
    const response = {
      success: true,
      jobId,
      message: generateReels 
        ? 'Standard and Instagram Reels videos generated successfully' 
        : 'Video generated successfully',
      videoUrl: `/api/download/${jobId}`,
      duration: totalDuration,
      title: videoConfig.title || 'Untitled',
      type: videoConfig.type || 'promotional',
      scenes: videoConfig.scenes.length
    };
    
    // Add Reels URL if generated
    if (generateReels) {
      response.reelsVideoUrl = `/api/download/${jobId}_reels`;
      response.reelsGenerated = true;
    }
    
    // Add S3 URLs if uploaded
    if (s3Upload && s3Upload.success) {
      response.s3Upload = {
        enabled: true,
        standard: s3Upload.standard ? {
          s3Key: s3Upload.standard.s3Key,
          signedUrl: s3Upload.standard.signedUrl,
          expiresIn: s3Upload.standard.expiresIn
        } : null,
        reels: s3Upload.reels ? {
          s3Key: s3Upload.reels.s3Key,
          signedUrl: s3Upload.reels.signedUrl,
          expiresIn: s3Upload.reels.expiresIn
        } : null
      };
    }
    
    res.json(response);
    
  } catch (error) {
    console.error('Error generating flexible video:', error);
    
    // Clean up on error
    if (req.files) {
      for (const file of req.files) {
        await fs.unlink(file.path).catch(() => {});
      }
    }
    
    res.status(500).json({
      error: 'Failed to generate flexible video',
      details: error.message,
      jobId,
    });
  }
});

// Download video endpoint
app.get('/api/download/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;
    const videoPath = path.join(__dirname, 'output', `${jobId}.mp4`);
    
    // Check if file exists
    await fs.access(videoPath);
    
    // Set headers for download
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', `attachment; filename="promo-video-${jobId}.mp4"`);
    
    // Stream the file
    const readStream = require('fs').createReadStream(videoPath);
    readStream.pipe(res);
    
  } catch (error) {
    console.error('Error downloading video:', error);
    res.status(404).json({
      error: 'Video not found'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'AI Video Generator',
    timestamp: new Date().toISOString()
  });
});

// Get video generation status
app.get('/api/status/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;
    const videoPath = path.join(__dirname, 'output', `${jobId}.mp4`);
    
    await fs.access(videoPath);
    
    const stats = await fs.stat(videoPath);
    
    res.json({
      jobId,
      status: 'completed',
      fileSize: stats.size,
      createdAt: stats.birthtime,
      downloadUrl: `/api/download/${jobId}`
    });
    
  } catch (error) {
    res.json({
      jobId,
      status: 'processing',
      message: 'Video is still being generated or not found'
    });
  }
});

// List all generated videos
app.get('/api/videos', async (req, res) => {
  try {
    const outputDir = path.join(__dirname, 'output');
    const files = await fs.readdir(outputDir);
    
    const videos = [];
    for (const file of files) {
      if (file.endsWith('.mp4')) {
        const stats = await fs.stat(path.join(outputDir, file));
        const jobId = path.basename(file, '.mp4');
        videos.push({
          jobId,
          filename: file,
          size: stats.size,
          createdAt: stats.birthtime,
          downloadUrl: `/api/download/${jobId}`
        });
      }
    }
    
    res.json({
      count: videos.length,
      videos: videos.sort((a, b) => b.createdAt - a.createdAt)
    });
    
  } catch (error) {
    console.error('Error listing videos:', error);
    res.status(500).json({
      error: 'Failed to list videos'
    });
  }
});

// Delete a video
app.delete('/api/videos/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;
    const videoPath = path.join(__dirname, 'output', `${jobId}.mp4`);
    
    await fs.unlink(videoPath);
    
    res.json({
      success: true,
      message: 'Video deleted successfully',
      jobId
    });
    
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(404).json({
      error: 'Video not found or already deleted'
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File too large. Maximum size is 10MB'
      });
    }
    return res.status(400).json({
      error: error.message
    });
  }
  
  console.error('Server error:', error);
  res.status(500).json({
    error: 'Internal server error',
    details: error.message
  });
});

// Start server
const startServer = async () => {
  try {
    await createDirectories();
    
    app.listen(PORT, () => {
      console.log(`\n🎬 Video Generator Server Started`);
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`📹 Video Quality: 4K Ultra HD (3840x2160)`);
      console.log(`🎯 Bitrate: 20 Mbps (Professional Grade)`);
      console.log(`⚡ Frame Rate: 30 fps`);
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`🌐 Server: http://localhost:${PORT}`);
      console.log(`📤 Upload endpoint: http://localhost:${PORT}/api/generate-video`);
      console.log(`🎨 Flexible video: http://localhost:${PORT}/api/generate-flexible-video`);
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      
      // S3 Status
      if (isS3Configured()) {
        console.log(`☁️  AWS S3: Enabled (${process.env.AWS_S3_BUCKET})`);
        console.log(`📍 Region: ${process.env.AWS_REGION}`);
      } else {
        console.log(`☁️  AWS S3: Disabled (videos saved locally only)`);
        console.log(`💡 To enable S3: See AWS_S3_SETUP_GUIDE.md`);
      }
      
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`💡 To change quality: Edit video-quality-config.js`);
      console.log(`📖 Guide: See VIDEO_QUALITY_GUIDE.md\n`);
      console.log(`✨ AI Video Generator Backend is running on http://localhost:${PORT}`);
      console.log(`\nAvailable endpoints:`);
      console.log(`  POST   /api/generate-video - Generate a new promotional video`);
      console.log(`  GET    /api/download/:jobId - Download generated video`);
      console.log(`  GET    /api/status/:jobId - Check video generation status`);
      console.log(`  GET    /api/videos - List all generated videos`);
      console.log(`  DELETE /api/videos/:jobId - Delete a video`);
      console.log(`  GET    /api/health - Health check`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
