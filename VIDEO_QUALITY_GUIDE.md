# 📹 Video Quality Configuration Guide

## Current Settings

**✅ Your videos are now rendering in 4K Ultra HD quality!**

- **Resolution:** 3840x2160 (4K)
- **Frame Rate:** 30 fps
- **Bitrate:** 20 Mbps
- **Codec:** H.264 (yuv420p)

---

## Quality Presets

### 🏆 4K Ultra HD (Current)
- **Resolution:** 3840x2160
- **Bitrate:** 20 Mbps
- **Best For:** High-end displays, professional presentations, YouTube 4K
- **File Size:** ~150 MB per minute
- **Render Time:** Slowest (4x longer than 1080p)

### 📺 Full HD 1080p
- **Resolution:** 1920x1080
- **Bitrate:** 8 Mbps
- **Best For:** Most use cases, web, social media, presentations
- **File Size:** ~60 MB per minute
- **Render Time:** Moderate

### 📱 HD 720p
- **Resolution:** 1280x720
- **Bitrate:** 5 Mbps
- **Best For:** Quick previews, web streaming, mobile
- **File Size:** ~38 MB per minute
- **Render Time:** Fastest

### 🎬 4K 60fps (Ultra Smooth)
- **Resolution:** 3840x2160 @ 60fps
- **Bitrate:** 30 Mbps
- **Best For:** Motion-heavy content, gaming, sports
- **File Size:** ~225 MB per minute
- **Render Time:** Slowest

### 🎮 1080p 60fps
- **Resolution:** 1920x1080 @ 60fps
- **Bitrate:** 12 Mbps
- **Best For:** Smooth web content, gaming highlights
- **File Size:** ~90 MB per minute
- **Render Time:** Moderate-Slow

---

## How to Change Quality

### Option 1: Edit Configuration File (Recommended)

1. Open `video-quality-config.js`
2. Change the `ACTIVE_PRESET` constant:

```javascript
// Change this line:
const ACTIVE_PRESET = '4K'; // Current

// To one of these:
const ACTIVE_PRESET = '1080p';     // Full HD
const ACTIVE_PRESET = '720p';      // HD
const ACTIVE_PRESET = '4K_60fps';  // 4K 60fps
const ACTIVE_PRESET = '1080p_60fps'; // 1080p 60fps
```

3. Restart your server
4. All new videos will use the new quality setting

### Option 2: Manual Configuration

Edit `src/Root.tsx` to change resolution:

```typescript
// For 1080p:
width={1920}
height={1080}

// For 4K:
width={3840}
height={2160}
```

Edit `server.js` to change bitrate:

```javascript
// For 1080p:
videoBitrate: '8M',
encodingMaxRate: '10M',
encodingBufferSize: '20M',

// For 4K:
videoBitrate: '20M',
encodingMaxRate: '25M',
encodingBufferSize: '50M',
```

---

## Quality vs Performance Trade-offs

| Preset | Quality | File Size | Render Speed | Use Case |
|--------|---------|-----------|--------------|----------|
| 4K | ⭐⭐⭐⭐⭐ | Very Large | Very Slow | Professional, YouTube 4K |
| 1080p | ⭐⭐⭐⭐ | Medium | Moderate | General purpose, recommended |
| 720p | ⭐⭐⭐ | Small | Fast | Quick previews, mobile |
| 4K 60fps | ⭐⭐⭐⭐⭐ | Huge | Slowest | Motion content, gaming |
| 1080p 60fps | ⭐⭐⭐⭐ | Large | Slow | Smooth web content |

---

## Recommendations by Platform

### YouTube
- **Recommended:** 4K (3840x2160) or 1080p
- **Minimum:** 1080p for best quality
- **Note:** YouTube supports 4K and will automatically create lower quality versions

### Social Media (Instagram, Facebook, Twitter)
- **Recommended:** 1080p (1920x1080)
- **Note:** Most platforms compress videos, so 4K may not provide visible benefits

### Website Embedding
- **Recommended:** 1080p or 720p
- **Note:** Balance quality with loading speed

### Professional Presentations
- **Recommended:** 4K (3840x2160)
- **Note:** Especially for large screens or projectors

### Email / Quick Sharing
- **Recommended:** 720p
- **Note:** Smaller file size for faster sharing

---

## Technical Details

### Current 4K Settings Explained

```javascript
videoBitrate: '20M'        // 20 megabits per second
                           // Higher = better quality, larger file

encodingMaxRate: '25M'     // Maximum bitrate spikes allowed
                           // Prevents quality drops in complex scenes

encodingBufferSize: '50M'  // Buffer for bitrate variations
                           // 2x the max rate is standard

pixelFormat: 'yuv420p'     // Color format
                           // yuv420p = best compatibility
```

### Why These Settings?

- **20 Mbps for 4K:** Industry standard for high-quality 4K streaming
- **H.264 Codec:** Universal compatibility across all devices
- **yuv420p:** Ensures playback on all platforms including iOS

---

## Troubleshooting

### Videos Taking Too Long to Render?
**Solution:** Switch to 1080p or 720p preset
```javascript
const ACTIVE_PRESET = '1080p'; // Much faster
```

### File Sizes Too Large?
**Solution:** Use 1080p or reduce bitrate
```javascript
videoBitrate: '5M',  // Lower bitrate = smaller files
```

### Need Smoother Motion?
**Solution:** Use 60fps preset
```javascript
const ACTIVE_PRESET = '1080p_60fps';
```

### Quality Not Good Enough?
**Solution:** Ensure you're using 4K preset and check:
1. Source images/graphics are high resolution
2. Text is crisp and not blurry
3. Bitrate is set to 20M or higher

---

## Performance Tips

1. **Start with 720p for testing** - Much faster rendering
2. **Use 1080p for production** - Best balance of quality/speed
3. **Use 4K only when needed** - For professional or large-screen use
4. **Enable hardware acceleration** - If available on your system
5. **Close other applications** - During rendering for best performance

---

## Current Configuration Summary

✅ **Resolution:** 3840x2160 (4K Ultra HD)  
✅ **Frame Rate:** 30 fps  
✅ **Bitrate:** 20 Mbps  
✅ **Codec:** H.264  
✅ **Pixel Format:** yuv420p  
✅ **Quality:** Professional Grade  

Your videos are now rendering at the highest quality! 🎉

To change these settings, edit `video-quality-config.js` and restart the server.
