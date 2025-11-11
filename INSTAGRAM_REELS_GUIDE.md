# Instagram Reels Video Generation Guide

## Overview
The video generator now supports creating **Instagram Reels optimized videos** (9:16 vertical format) alongside standard horizontal videos (16:9). This ensures your content looks perfect on mobile devices and doesn't get cropped or lose quality when uploaded to Instagram Reels, TikTok, or YouTube Shorts.

## The Problem We Solved

### Before:
- ❌ Standard 16:9 videos uploaded to Instagram Reels appeared **zoomed in and cropped**
- ❌ Most of the video content **overflowed off-screen**
- ❌ **Quality dropped drastically** due to Instagram's compression
- ❌ Poor viewing experience on mobile devices

### After:
- ✅ **Native 9:16 vertical format** designed for mobile
- ✅ **Optimized bitrate** (8 Mbps) for Instagram's compression
- ✅ **Perfect fit** - no cropping or overflow
- ✅ **High quality** maintained after upload
- ✅ **Dual output** - get both standard and Reels versions

## How to Use

### 1. **Enable Instagram Reels in UI**

In `advanced-client.html`:
1. Check the **"📱 Generate Instagram Reels Version (9:16 vertical)"** checkbox
2. Configure your video as normal (scenes, music, theme, etc.)
3. Click **"🚀 Generate Video"**
4. Wait for both versions to render

### 2. **Enable in JSON Configuration**

Add `"generateReels": true` to your JSON:

```json
{
  "title": "My Promo Video",
  "type": "promotional",
  "theme": "corporate",
  "generateReels": true,
  "music": {
    "enabled": true,
    "trackId": "track-1",
    "volume": 0.3
  },
  "scenes": [
    {
      "type": "hero-title",
      "duration": 5,
      "content": {
        "title": "Your **Amazing** Product",
        "subtitle": "Perfect for mobile"
      }
    }
  ]
}
```

### 3. **Download Both Versions**

After generation completes, you'll see:
- **📥 Download Standard Video (16:9)** - For YouTube, websites, presentations
- **📱 Download Instagram Reels (9:16)** - For Instagram Reels, TikTok, YouTube Shorts

## Technical Specifications

### Standard Video (16:9)
- **Resolution**: 3840x2160 (4K)
- **Aspect Ratio**: 16:9 (horizontal)
- **Bitrate**: 20 Mbps
- **FPS**: 30
- **Format**: MP4 (H.264)
- **Use Cases**: YouTube, websites, presentations, TV displays

### Instagram Reels Video (9:16)
- **Resolution**: 1080x1920 (Full HD vertical)
- **Aspect Ratio**: 9:16 (vertical)
- **Bitrate**: 8 Mbps (Instagram optimized)
- **FPS**: 30
- **Format**: MP4 (H.264)
- **Use Cases**: Instagram Reels, TikTok, YouTube Shorts, Stories

## Instagram Upload Recommendations

### Best Practices:
1. ✅ **Use the Reels version** for Instagram Reels/Stories
2. ✅ **Keep videos under 90 seconds** for Reels
3. ✅ **Add captions** - 80% of Reels are watched without sound
4. ✅ **Use trending music** from your local tracks
5. ✅ **Test on mobile** before uploading

### Upload Settings:
- **Recommended Duration**: 15-60 seconds for best engagement
- **File Size**: Under 100MB for faster upload
- **Audio**: Keep volume at 30-40% for balanced mix
- **Quality**: Use the generated Reels file directly - no re-encoding needed

## Quality Comparison

| Aspect | Standard Video | Instagram Reels |
|--------|---------------|-----------------|
| Resolution | 3840x2160 | 1080x1920 |
| Aspect Ratio | 16:9 | 9:16 |
| Bitrate | 20 Mbps | 8 Mbps |
| File Size | ~150MB/min | ~60MB/min |
| Best For | Desktop/TV | Mobile |
| Instagram Fit | Cropped | Perfect |

## Advanced Configuration

### Custom Reels Quality Presets

In `video-quality-config.js`, we've added:

```javascript
// Instagram Reels - Standard quality
'reels': {
  width: 1080,
  height: 1920,
  fps: 30,
  videoBitrate: '8M',
  encodingMaxRate: '10M',
  encodingBufferSize: '20M',
  pixelFormat: 'yuv420p',
  description: 'Instagram Reels (1080x1920) - Vertical 9:16 format for mobile'
},

// Instagram Reels 4K - High quality (for future-proofing)
'reels_4k': {
  width: 2160,
  height: 3840,
  fps: 30,
  videoBitrate: '15M',
  encodingMaxRate: '18M',
  encodingBufferSize: '36M',
  pixelFormat: 'yuv420p',
  description: 'Instagram Reels 4K (2160x3840) - High quality vertical 9:16'
}
```

## Server Implementation

### Dual Rendering Process:

1. **Standard Video Rendered First**
   - Uses default 4K settings (3840x2160)
   - Saves as `{jobId}.mp4`

2. **Reels Video Rendered Second** (if enabled)
   - Uses vertical dimensions (1080x1920)
   - Saves as `{jobId}_reels.mp4`
   - Optimized bitrate for Instagram

### API Response:

```json
{
  "success": true,
  "jobId": "abc-123",
  "message": "Standard and Instagram Reels videos generated successfully",
  "videoUrl": "/api/download/abc-123",
  "reelsVideoUrl": "/api/download/abc-123_reels",
  "reelsGenerated": true,
  "duration": 45,
  "scenes": 8
}
```

## Troubleshooting

### Issue: Reels video still looks cropped on Instagram
**Solution**: Make sure you're uploading the `*_reels.mp4` file, not the standard one.

### Issue: Quality drops after Instagram upload
**Solution**: 
- Use the Reels version (already optimized for Instagram compression)
- Keep videos under 60 seconds for best quality retention
- Upload directly from mobile for best results

### Issue: Both videos take too long to render
**Solution**: 
- Reduce total video duration
- Use fewer scenes
- Disable Reels generation if you only need standard video

### Issue: File size too large for Instagram
**Solution**: 
- The Reels version is already optimized (~60MB/min)
- Keep videos under 90 seconds
- Instagram automatically compresses on upload

## Performance Notes

### Rendering Time:
- **Standard only**: ~2-5 minutes for 60-second video
- **Standard + Reels**: ~4-8 minutes for 60-second video
- Reels renders faster due to lower resolution

### File Sizes (approximate):
- **Standard (4K)**: ~150MB per minute
- **Reels (1080p)**: ~60MB per minute

## Future Enhancements

Planned features:
- [ ] TikTok-specific optimizations
- [ ] YouTube Shorts preset
- [ ] Custom aspect ratio support
- [ ] Batch rendering for multiple formats
- [ ] Preview mode for Reels layout

## Examples

### E-commerce Product Launch
```json
{
  "title": "Product Launch",
  "generateReels": true,
  "scenes": [
    {"type": "hero-title", "duration": 3},
    {"type": "product-showcase", "duration": 5},
    {"type": "pricing-cards", "duration": 4},
    {"type": "cta", "duration": 3}
  ]
}
```
**Result**: 15-second punchy Reels + full desktop version

### SaaS Feature Announcement
```json
{
  "title": "New Features",
  "generateReels": true,
  "scenes": [
    {"type": "minimal-title", "duration": 4},
    {"type": "feature-list", "duration": 6},
    {"type": "stats-dashboard", "duration": 5},
    {"type": "cta", "duration": 3}
  ]
}
```
**Result**: 18-second feature highlight for Reels

## Support

For issues or questions:
1. Check server logs for rendering errors
2. Verify both output files exist in `/output` folder
3. Test with shorter videos first
4. Ensure sufficient disk space for dual rendering

---

**Pro Tip**: Always generate both versions during initial creation. It's faster than re-rendering later, and you'll have the right format ready for any platform! 📱✨
