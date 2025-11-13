# Music API Reference

## 🎵 Using Background Music in Videos

### **Use trackId with Filename Value**

The key is always `trackId`, but the value can be either a filename or numeric ID:

```json
{
  "music": {
    "enabled": true,
    "trackId": "cyberpunk-futuristic-city-music-323171",  // Filename (without .mp3)
    "volume": 0.3
  }
}
```

### **Or Use Numeric Track ID**

Old numeric format also works:

```json
{
  "music": {
    "enabled": true,
    "trackId": "track-1",  // First file in directory
    "volume": 0.3
  }
}
```

---

## 📋 Available Music Files

All music files are located in `/src/tracks/` directory.

### **How to Find Filenames**

#### **Option 1: API Endpoint**

```bash
GET /api/music-tracks
```

Response:
```json
{
  "tracks": [
    {
      "id": "corp-1",
      "filename": "corporate-technology-corporate-rock-121034.mp3",
      "name": "Corporate Technology Corporate Rock",
      "url": "/tracks/corporate-technology-corporate-rock-121034.mp3"
    },
    ...
  ]
}
```

#### **Option 2: List Files on Server**

```bash
ssh vidbuilder@YOUR_SERVER_IP
ls -1 ~/apps/vidbuilder/src/tracks/
```

---

## 🎯 Usage Examples

### **Example 1: With Filename (Recommended)**

```json
{
  "webhookUrl": "https://your-app.com/webhook",
  "theme": "corporate",
  "music": {
    "enabled": true,
    "filename": "cyberpunk-futuristic-city-music-323171",
    "volume": 0.3
  },
  "scenes": [...]
}
```

### **Example 2: With .mp3 Extension (Also Works)**

```json
{
  "music": {
    "enabled": true,
    "filename": "cyberpunk-futuristic-city-music-323171.mp3",
    "volume": 0.3
  }
}
```

### **Example 3: Old Track ID Format**

```json
{
  "music": {
    "enabled": true,
    "trackId": "corp-1",
    "volume": 0.3
  }
}
```

---

## 🔍 How Music Resolution Works

The API tries to find music in this order:

1. **Exact filename match** (with or without `.mp3`)
   - `"cyberpunk-futuristic-city-music-323171"` → matches `cyberpunk-futuristic-city-music-323171.mp3`
   - `"cyberpunk-futuristic-city-music-323171.mp3"` → matches `cyberpunk-futuristic-city-music-323171.mp3`

2. **Fallback to track ID** (legacy format)
   - `"corp-1"` → matches first file in `/src/tracks/`
   - `"corp-2"` → matches second file in `/src/tracks/`

3. **Not found**
   - Logs warning: `⚠️ Music track not found: <identifier>`
   - Video generates without music

---

## 📝 Music Configuration Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `enabled` | boolean | Yes | Enable/disable background music |
| `filename` | string | No* | Music filename (without .mp3) |
| `trackId` | string | No* | Legacy track ID format |
| `volume` | number | No | Volume level (0.0 to 1.0), default: 0.3 |

*Either `filename` or `trackId` must be provided if `enabled` is `true`.

---

## ✅ Best Practices

### **For Remote API Integrations**

✅ **Use `filename`** - More explicit and predictable
```json
{"filename": "cyberpunk-futuristic-city-music-323171"}
```

❌ **Avoid `trackId`** - Depends on file order in directory
```json
{"trackId": "corp-1"}  // Which file is this?
```

### **For Internal/UI Use**

Either format works, but `filename` is clearer.

---

## 🎼 Common Music Files

Based on Pixabay Music Library:

### Corporate/Professional
- `corporate-technology-corporate-rock-121034`
- `corporate-upbeat-inspiring-motivational-121038`
- `corporate-inspiring-upbeat-uplifting-121039`

### Upbeat/Energetic
- `upbeat-inspiring-corporate-pop-rock-121040`
- `upbeat-energetic-inspiring-corporate-121041`

### Electronic/Tech
- `cyberpunk-futuristic-city-music-323171`
- `electronic-future-beats-117997`
- `tech-house-vibes-130841`

### Calm/Ambient
- `calm-ambient-inspiring-corporate-121042`
- `ambient-relaxing-peaceful-121043`

### Cinematic/Epic
- `cinematic-epic-inspiring-121044`
- `epic-cinematic-inspiring-121045`

**See:** `PIXABAY_MUSIC_LIBRARY.md` for complete list with descriptions.

---

## 🧪 Testing

### Test Music Resolution

```bash
# Test with filename
curl -u "username:password" \
  -X POST http://localhost:3000/api/generate-video-async \
  -H "Content-Type: application/json" \
  -d '{
    "webhookUrl": "https://webhook.site/YOUR-URL",
    "theme": "corporate",
    "music": {
      "enabled": true,
      "filename": "cyberpunk-futuristic-city-music-323171",
      "volume": 0.3
    },
    "quality": "1080p",
    "scenes": [
      {
        "type": "hero-title",
        "duration": 4,
        "content": {
          "title": "Test Music",
          "subtitle": "Testing filename resolution"
        }
      }
    ]
  }'
```

Check logs:
```bash
pm2 logs vidbuilder | grep "Music track"
```

Expected output:
```
🎵 Music track resolved by filename: cyberpunk-futuristic-city-music-323171.mp3
```

---

## ❓ FAQ

### Q: Can I use the full filename with .mp3?

**A:** Yes! Both work:
- `"filename": "cyberpunk-futuristic-city-music-323171"` ✅
- `"filename": "cyberpunk-futuristic-city-music-323171.mp3"` ✅

### Q: What if the file doesn't exist?

**A:** The API logs a warning and generates video without music:
```
⚠️ Music track not found: nonexistent-track
```

### Q: Can I still use trackId?

**A:** Yes, for backward compatibility. But `filename` is recommended for API integrations.

### Q: How do I list all available music?

**A:** Use the API endpoint:
```bash
curl http://localhost:3000/api/music-tracks
```

### Q: What's the default volume?

**A:** 0.3 (30%). Range is 0.0 (silent) to 1.0 (full volume).

---

## 🚀 Migration Guide

### From Track ID to Filename

**Before:**
```json
{
  "music": {
    "enabled": true,
    "trackId": "corp-1",
    "volume": 0.3
  }
}
```

**After:**
```json
{
  "music": {
    "enabled": true,
    "filename": "corporate-technology-corporate-rock-121034",
    "volume": 0.3
  }
}
```

**Steps:**
1. Call `/api/music-tracks` to get filename for your track ID
2. Update your API calls to use `filename` instead of `trackId`
3. Test with a sample video generation

---

## ✅ Summary

**Recommended Format:**
```json
{
  "music": {
    "enabled": true,
    "filename": "cyberpunk-futuristic-city-music-323171",
    "volume": 0.3
  }
}
```

**Why Filename?**
- ✅ Explicit and predictable
- ✅ Works across environments
- ✅ Easy to document and share
- ✅ No dependency on file order

**The API now supports both `filename` and `trackId` for maximum flexibility!** 🎵
