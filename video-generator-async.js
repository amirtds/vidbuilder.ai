/**
 * Async Video Generation Module
 * Handles background video generation with webhook notifications
 */

const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs');
const { bundle } = require('@remotion/bundler');
const { renderMedia, selectComposition } = require('@remotion/renderer');
const sharp = require('sharp');
const { uploadVideosToS3, isS3Configured } = require('./s3-service');

// Helper function to send webhook notification
async function sendWebhook(webhookUrl, payload) {
  if (!webhookUrl) return;
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'VidBuilder/1.0',
        'X-Webhook-Event': payload.status
      },
      body: JSON.stringify(payload),
      timeout: 10000 // 10 second timeout
    });
    
    if (!response.ok) {
      console.error(`❌ Webhook failed: ${response.status} ${response.statusText}`);
    } else {
      console.log(`✅ Webhook sent to ${webhookUrl} (status: ${payload.status})`);
    }
  } catch (error) {
    console.error(`❌ Webhook error: ${error.message}`);
  }
}

// Process uploaded image
async function processImage(imagePath) {
  try {
    const processedPath = imagePath.replace(/\.[^.]+$/, '_processed.jpg');
    await sharp(imagePath)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 90 })
      .toFile(processedPath);
    return processedPath;
  } catch (error) {
    console.error('Error processing image:', error);
    return imagePath;
  }
}

/**
 * Main async video generation function
 * @param {string} jobId - Unique job identifier
 * @param {object} videoConfig - Video configuration
 * @param {Array} uploadedFiles - Uploaded image files
 * @param {string} webhookUrl - Webhook URL for notifications
 * @param {object} jobStatus - Job status Map reference
 * @param {number} PORT - Server port
 */
async function generateVideoAsync(jobId, videoConfig, uploadedFiles, webhookUrl, jobStatus, PORT) {
  const startTime = Date.now();
  
  // Update status to processing
  jobStatus.set(jobId, {
    status: 'processing',
    progress: 0,
    message: 'Video generation started',
    createdAt: new Date().toISOString()
  });
  
  try {
    console.log(`\n🎬 Starting async video generation job ${jobId}`);
    console.log(`Title: ${videoConfig.title || 'Untitled'}`);
    console.log(`Scenes: ${videoConfig.scenes.length}`);
    console.log(`Webhook URL: ${webhookUrl || 'None'}`);
    
    // Send initial webhook notification (start)
    await sendWebhook(webhookUrl, {
      jobId,
      status: 'started',
      message: 'Video generation started',
      timestamp: new Date().toISOString()
    });
    
    // Update progress: 5%
    jobStatus.set(jobId, { ...jobStatus.get(jobId), progress: 5, message: 'Processing images...' });
    
    // Process uploaded images
    let imageUrls = [];
    if (uploadedFiles && uploadedFiles.length > 0) {
      console.log(`Processing ${uploadedFiles.length} uploaded images...`);
      for (const file of uploadedFiles) {
        const processedPath = await processImage(file.path);
        const filename = path.basename(processedPath);
        const imageUrl = `http://localhost:${PORT}/temp/${filename}`;
        imageUrls.push(imageUrl);
      }
      console.log(`✅ Processed ${imageUrls.length} images`);
    }
    
    // Update progress: 10%
    jobStatus.set(jobId, { ...jobStatus.get(jobId), progress: 10, message: 'Configuring scenes...' });
    
    // Distribute images across scenes
    const imageScenes = ['product-showcase', 'hero-title', 'product-matrix'];
    let imageIndex = 0;
    
    videoConfig.scenes.forEach(scene => {
      if (imageScenes.includes(scene.type) && imageUrls.length > 0) {
        if (!scene.content.images) {
          scene.content.images = [];
        }
        const imagesForScene = imageUrls.slice(imageIndex, imageIndex + 3);
        scene.content.images.push(...imagesForScene);
        imageIndex = (imageIndex + 3) % imageUrls.length;
      }
    });
    
    // Resolve music URL from trackId (can be filename or track-1 format)
    console.log('🎵 Music config received:', JSON.stringify(videoConfig.music, null, 2));
    
    if (videoConfig.music && videoConfig.music.enabled && videoConfig.music.trackId) {
      const trackId = videoConfig.music.trackId;
      const tracksDir = path.join(__dirname, 'src', 'tracks');
      const files = fsSync.readdirSync(tracksDir).filter(file => file.toLowerCase().endsWith('.mp3'));
      
      console.log(`🎵 Looking for trackId: "${trackId}"`);
      console.log(`🎵 Available files (${files.length}):`, files);
      
      let musicUrl = null;
      
      // Try to match by filename first (with or without .mp3 extension)
      const matchingFile = files.find(file => {
        const fileWithoutExt = file.replace(/\.mp3$/i, '');
        const trackIdWithoutExt = trackId.replace(/\.mp3$/i, '');
        const matches = fileWithoutExt === trackIdWithoutExt || file === trackId;
        if (matches) {
          console.log(`🎵 Match found: "${file}" matches "${trackId}"`);
        }
        return matches;
      });
      
      if (matchingFile) {
        musicUrl = `http://localhost:${PORT}/tracks/${encodeURIComponent(matchingFile)}`;
        console.log(`✅ Music track resolved: ${matchingFile}`);
        console.log(`✅ Music URL: ${musicUrl}`);
      } else {
        // Fallback: try old numeric format (track-1, track-2, etc.)
        console.log(`🎵 No filename match, trying numeric format...`);
        const musicLibrary = {};
        files.forEach((file, index) => {
          const numericId = `track-${index + 1}`;
          musicLibrary[numericId] = `http://localhost:${PORT}/tracks/${encodeURIComponent(file)}`;
        });
        
        musicUrl = musicLibrary[trackId];
        if (musicUrl) {
          console.log(`✅ Music track resolved by index: ${trackId}`);
          console.log(`✅ Music URL: ${musicUrl}`);
        }
      }
      
      if (musicUrl) {
        videoConfig.music.url = musicUrl;
        console.log(`✅ Final music config:`, JSON.stringify(videoConfig.music, null, 2));
      } else {
        console.error(`❌ Music track not found: ${trackId}`);
        console.error(`❌ Available files: ${files.join(', ')}`);
      }
    } else {
      console.log('⚠️  Music not enabled or trackId missing');
      console.log('   - enabled:', videoConfig.music?.enabled);
      console.log('   - trackId:', videoConfig.music?.trackId);
    }
    
    // Process scenes
    const processedScenes = videoConfig.scenes.map((scene) => {
      if (scene.type === 'product-showcase' && imageUrls.length > 0) {
        if (!scene.content.images || scene.content.images.length === 0) {
          scene.content.images = imageUrls;
        }
      }
      
      if (scene.type === 'step-by-step' && scene.content.steps && imageUrls.length > 0) {
        scene.content.steps.forEach((step, stepIndex) => {
          if (stepIndex < imageUrls.length && !step.image) {
            step.image = imageUrls[stepIndex];
          }
        });
      }
      
      return scene;
    });
    
    const totalDuration = processedScenes.reduce((sum, scene) => sum + scene.duration, 0);
    videoConfig.scenes = processedScenes;
    
    console.log(`Total video duration: ${totalDuration} seconds`);
    
    // Update progress: 15%
    jobStatus.set(jobId, { ...jobStatus.get(jobId), progress: 15, message: 'Bundling video components...' });
    
    // Bundle the video
    console.log('📦 Bundling video components...');
    const bundleLocation = await bundle({
      entryPoint: path.join(__dirname, 'src/index.tsx'),
      webpackOverride: (config) => config,
    });
    
    // Update progress: 20%
    jobStatus.set(jobId, { ...jobStatus.get(jobId), progress: 20, message: 'Preparing composition...' });
    
    // Always use EnhancedFlexibleVideo - it's backward compatible and supports all scene types
    const compositionId = 'EnhancedFlexibleVideo';
    
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: compositionId,
      inputProps: videoConfig,
    });
    
    const fps = videoConfig.fps || 30;
    const durationInFrames = Math.floor(totalDuration * fps);
    const generateReels = videoConfig.generateReels === true;
    
    // Output paths
    const outputPath = path.join(__dirname, 'output', `${jobId}.mp4`);
    const reelsOutputPath = generateReels ? path.join(__dirname, 'output', `${jobId}_reels.mp4`) : null;
    
    // Update progress: 25%
    jobStatus.set(jobId, { ...jobStatus.get(jobId), progress: 25, message: 'Rendering standard video...' });
    
    // Render standard video
    console.log(`🎥 Rendering standard video (${totalDuration}s, ${durationInFrames} frames)...`);
    const renderStartTime = Date.now();
    
    await renderMedia({
      composition: {
        ...composition,
        durationInFrames,
      },
      serveUrl: bundleLocation,
      codec: 'h264',
      outputLocation: outputPath,
      inputProps: videoConfig,
      videoBitrate: '20M',
      pixelFormat: 'yuv420p',
      encodingMaxRate: '25M',
      encodingBufferSize: '50M',
      concurrency: null, // Use all CPU cores
      onProgress: ({ progress, renderedFrames }) => {
        const currentProgress = 25 + Math.floor(progress * 50); // 25-75%
        const elapsed = ((Date.now() - renderStartTime) / 1000).toFixed(1);
        
        // Update job status (for status endpoint queries)
        jobStatus.set(jobId, {
          ...jobStatus.get(jobId),
          progress: currentProgress,
          message: `Rendering: ${Math.round(progress * 100)}% (${renderedFrames}/${durationInFrames} frames, ${elapsed}s)`
        });
        
        console.log(`Standard video: ${Math.round(progress * 100)}% (${renderedFrames}/${durationInFrames} frames, ${elapsed}s elapsed)`);
      },
    });
    
    const renderTime = ((Date.now() - renderStartTime) / 1000).toFixed(1);
    console.log(`✅ Standard video rendered in ${renderTime}s: ${outputPath}`);
    
    // Update progress: 75%
    jobStatus.set(jobId, { ...jobStatus.get(jobId), progress: 75, message: 'Standard video complete' });
    
    // Render Reels if requested
    if (generateReels) {
      console.log(`\n📱 Rendering Instagram Reels version...`);
      const reelsStartTime = Date.now();
      
      // Update progress: 76%
      jobStatus.set(jobId, { ...jobStatus.get(jobId), progress: 76, message: 'Rendering Reels version...' });
      
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
        videoBitrate: '8M',
        pixelFormat: 'yuv420p',
        encodingMaxRate: '10M',
        encodingBufferSize: '20M',
        concurrency: null,
        onProgress: ({ progress, renderedFrames }) => {
          const currentProgress = 76 + Math.floor(progress * 14); // 76-90%
          jobStatus.set(jobId, {
            ...jobStatus.get(jobId),
            progress: currentProgress,
            message: `Rendering Reels: ${Math.round(progress * 100)}%`
          });
        },
      });
      
      const reelsRenderTime = ((Date.now() - reelsStartTime) / 1000).toFixed(1);
      console.log(`✅ Reels video rendered in ${reelsRenderTime}s: ${reelsOutputPath}`);
    }
    
    // Update progress: 90%
    jobStatus.set(jobId, { ...jobStatus.get(jobId), progress: 90, message: 'Uploading to S3...' });
    
    // Upload to S3
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
          
          // Delete local video files after successful S3 upload
          console.log('🗑️  Deleting local video files to save disk space...');
          try {
            await fs.unlink(outputPath);
            console.log(`✅ Deleted local file: ${outputPath}`);
            
            if (generateReels && reelsOutputPath) {
              await fs.unlink(reelsOutputPath);
              console.log(`✅ Deleted local file: ${reelsOutputPath}`);
            }
          } catch (deleteError) {
            console.error('⚠️  Failed to delete local files:', deleteError.message);
          }
        }
      } catch (error) {
        console.error('⚠️  S3 upload failed (videos kept locally):', error.message);
      }
    } else {
      console.log('ℹ️  S3 not configured - videos saved locally only');
      console.log('⚠️  Warning: Local storage will fill up quickly. Configure S3 for production.');
    }
    
    // Update progress: 95%
    jobStatus.set(jobId, { ...jobStatus.get(jobId), progress: 95, message: 'Cleaning up...' });
    
    // Clean up temporary files (uploaded images)
    setTimeout(async () => {
      if (uploadedFiles) {
        for (const file of uploadedFiles) {
          await fs.unlink(file.path).catch(() => {});
        }
      }
      console.log('🧹 Temporary image files cleaned up');
    }, 2000);
    
    const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
    
    // Final success payload
    const successPayload = {
      jobId,
      status: 'completed',
      progress: 100,
      message: 'Video generated successfully',
      duration: totalDuration,
      scenes: videoConfig.scenes.length,
      reelsGenerated: generateReels,
      renderTime: `${totalTime}s`,
      timestamp: new Date().toISOString()
    };
    
    // Only include local download URLs if S3 is not configured (files still exist locally)
    if (!isS3Configured() || (s3Upload && !s3Upload.success)) {
      successPayload.videoUrl = `/api/download/${jobId}`;
      if (generateReels) {
        successPayload.reelsVideoUrl = `/api/download/${jobId}_reels`;
      }
    }
    
    if (s3Upload && s3Upload.success) {
      successPayload.s3Upload = {
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
    
    // Update final status
    jobStatus.set(jobId, successPayload);
    
    // Send success webhook
    await sendWebhook(webhookUrl, successPayload);
    
    console.log(`\n✅ Job ${jobId} completed successfully in ${totalTime}s`);
    
  } catch (error) {
    console.error(`❌ Error in async video generation for job ${jobId}:`, error);
    
    const errorPayload = {
      jobId,
      status: 'failed',
      error: error.message,
      timestamp: new Date().toISOString()
    };
    
    jobStatus.set(jobId, errorPayload);
    await sendWebhook(webhookUrl, errorPayload);
  }
}

module.exports = { generateVideoAsync };
