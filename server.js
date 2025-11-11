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

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Flexible video generation endpoint with JSON configuration
app.post('/api/generate-flexible-video', upload.array('images', 20), async (req, res) => {
  const jobId = uuidv4();
  
  try {
    const { config } = req.body;
    
    // Parse config if it's a string (JSON)
    let videoConfig;
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
    
    // Validate config
    if (!videoConfig || !videoConfig.scenes || !Array.isArray(videoConfig.scenes)) {
      return res.status(400).json({
        error: 'Invalid video configuration. Must include scenes array.'
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
      onProgress: ({ progress }) => {
        console.log(`Standard video rendering: ${Math.round(progress * 100)}%`);
      },
    });
    
    console.log(`✅ Standard video generated: ${outputPath}`);
    
    // Render Instagram Reels version if requested
    if (generateReels) {
      console.log(`\n📱 Rendering Instagram Reels version (1080x1920)...`);
      
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
          width: 1080,
          height: 1920,
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
        // Instagram Reels optimized settings
        videoBitrate: '8M', // 8 Mbps for Reels
        pixelFormat: 'yuv420p',
        encodingMaxRate: '10M',
        encodingBufferSize: '20M',
        onProgress: ({ progress }) => {
          console.log(`Reels video rendering: ${Math.round(progress * 100)}%`);
        },
      });
      
      console.log(`✅ Instagram Reels video generated: ${reelsOutputPath}`);
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
