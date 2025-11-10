/**
 * Video Quality Configuration
 * 
 * This file defines quality presets for video rendering.
 * Switch between presets by changing the ACTIVE_PRESET constant.
 */

const QUALITY_PRESETS = {
  // 4K Ultra HD - Best quality, largest file size, slower rendering
  '4K': {
    width: 3840,
    height: 2160,
    fps: 30,
    videoBitrate: '20M',      // 20 Mbps
    encodingMaxRate: '25M',
    encodingBufferSize: '50M',
    pixelFormat: 'yuv420p',
    description: '4K Ultra HD (3840x2160) - Best for high-end displays and professional use'
  },
  
  // Full HD 1080p - High quality, balanced file size and rendering speed
  '1080p': {
    width: 1920,
    height: 1080,
    fps: 30,
    videoBitrate: '8M',       // 8 Mbps
    encodingMaxRate: '10M',
    encodingBufferSize: '20M',
    pixelFormat: 'yuv420p',
    description: 'Full HD (1920x1080) - Recommended for most use cases'
  },
  
  // HD 720p - Good quality, smaller file size, faster rendering
  '720p': {
    width: 1280,
    height: 720,
    fps: 30,
    videoBitrate: '5M',       // 5 Mbps
    encodingMaxRate: '6M',
    encodingBufferSize: '12M',
    pixelFormat: 'yuv420p',
    description: 'HD (1280x720) - Good for web and social media'
  },
  
  // 4K 60fps - Ultra smooth, best for motion-heavy content
  '4K_60fps': {
    width: 3840,
    height: 2160,
    fps: 60,
    videoBitrate: '30M',      // 30 Mbps for 60fps
    encodingMaxRate: '35M',
    encodingBufferSize: '70M',
    pixelFormat: 'yuv420p',
    description: '4K Ultra HD 60fps (3840x2160@60) - Ultra smooth, best for motion'
  },
  
  // 1080p 60fps - Smooth HD
  '1080p_60fps': {
    width: 1920,
    height: 1080,
    fps: 60,
    videoBitrate: '12M',      // 12 Mbps for 60fps
    encodingMaxRate: '15M',
    encodingBufferSize: '30M',
    pixelFormat: 'yuv420p',
    description: 'Full HD 60fps (1920x1080@60) - Smooth HD for web'
  }
};

// ⚙️ CHANGE THIS TO SWITCH QUALITY PRESET
const ACTIVE_PRESET = '4K'; // Options: '4K', '1080p', '720p', '4K_60fps', '1080p_60fps'

// Export the active configuration
const activeConfig = QUALITY_PRESETS[ACTIVE_PRESET];

if (!activeConfig) {
  console.error(`Invalid preset: ${ACTIVE_PRESET}. Available presets:`, Object.keys(QUALITY_PRESETS));
  process.exit(1);
}

console.log(`📹 Video Quality: ${ACTIVE_PRESET}`);
console.log(`   Resolution: ${activeConfig.width}x${activeConfig.height}`);
console.log(`   FPS: ${activeConfig.fps}`);
console.log(`   Bitrate: ${activeConfig.videoBitrate}`);
console.log(`   ${activeConfig.description}`);

module.exports = {
  QUALITY_PRESETS,
  ACTIVE_PRESET,
  activeConfig,
  
  // Helper function to get rendering options
  getRenderingOptions: () => ({
    videoBitrate: activeConfig.videoBitrate,
    pixelFormat: activeConfig.pixelFormat,
    encodingMaxRate: activeConfig.encodingMaxRate,
    encodingBufferSize: activeConfig.encodingBufferSize,
  }),
  
  // Helper function to get composition options
  getCompositionOptions: () => ({
    width: activeConfig.width,
    height: activeConfig.height,
    fps: activeConfig.fps,
  }),
};
