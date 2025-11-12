# API Quick Fix: JSON Body Support

## ✅ Problem Solved

**Issue:** Getting error "Invalid video configuration. Must include scenes array" when sending JSON body.

**Root Cause:** The API was only accepting `multipart/form-data` with config as a string field.

**Solution:** Added support for direct JSON body requests.

---

## 🎯 How to Use the API Now

### Method 1: JSON Body (Recommended for No Images)

**Use this when you don't need to upload images.**

```bash
curl -X POST https://backend.vidbuilder.ai/api/generate-flexible-video \
  -H "Content-Type: application/json" \
  -d '{
    "theme": "corporate",
    "music": {"trackId": "corp-1", "volume": 0.3},
    "quality": "4k",
    "generateReels": false,
    "scenes": [
      {
        "type": "hero-title",
        "duration": 4,
        "content": {
          "title": "Welcome to **VidBuilder**",
          "subtitle": "Create stunning videos"
        }
      }
    ]
  }'
```

**JavaScript:**
```javascript
const response = await fetch('https://backend.vidbuilder.ai/api/generate-flexible-video', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    theme: "corporate",
    music: {trackId: "corp-1", volume: 0.3},
    quality: "4k",
    scenes: [
      {
        type: "hero-title",
        duration: 4,
        content: {
          title: "Welcome to **VidBuilder**",
          subtitle: "Create stunning videos"
        }
      }
    ]
  })
});

const result = await response.json();
```

---

### Method 2: Multipart Form Data (For Images)

**Use this when you need to upload images.**

```bash
curl -X POST https://backend.vidbuilder.ai/api/generate-flexible-video \
  -F 'config={"theme":"corporate","music":{"trackId":"corp-1","volume":0.3},"quality":"4k","scenes":[{"type":"product-showcase","duration":8,"content":{"title":"Products","images":["img1.jpg"]}}]}' \
  -F 'images=@/path/to/image.jpg'
```

**JavaScript:**
```javascript
const formData = new FormData();
formData.append('config', JSON.stringify({
  theme: "corporate",
  music: {trackId: "corp-1", volume: 0.3},
  quality: "4k",
  scenes: [...]
}));
formData.append('images', imageFile);

const response = await fetch('https://backend.vidbuilder.ai/api/generate-flexible-video', {
  method: 'POST',
  body: formData
});
```

---

## ⏱️ Response Time

**Important:** The API waits for video generation to complete before responding.

- **Typical time:** 30-120 seconds
- **Depends on:** Video duration, quality, number of scenes
- **Set timeout:** At least 300 seconds (5 minutes)

**Example with timeout:**
```javascript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 300000); // 5 min

try {
  const response = await fetch('https://backend.vidbuilder.ai/api/generate-flexible-video', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(config),
    signal: controller.signal
  });
  
  clearTimeout(timeoutId);
  const result = await response.json();
  
  console.log('✅ Video ready!');
  console.log('Download:', result.videoUrl);
  console.log('S3 URL:', result.s3Upload.standard.signedUrl);
  
} catch (error) {
  if (error.name === 'AbortError') {
    console.error('Request timeout - video generation taking too long');
  } else {
    console.error('Error:', error);
  }
}
```

---

## 📊 Response Format

**Success (200 OK):**
```json
{
  "success": true,
  "jobId": "abc123def456",
  "message": "Video generated successfully",
  "videoUrl": "/api/download/abc123def456",
  "duration": 13,
  "scenes": 3,
  "s3Upload": {
    "enabled": true,
    "standard": {
      "s3Key": "videos/2025-01-12/standard/abc123def456.mp4",
      "signedUrl": "https://vidbuilder.s3.amazonaws.com/videos/...",
      "expiresIn": "7 days"
    }
  }
}
```

**With Reels:**
```json
{
  "success": true,
  "jobId": "abc123def456",
  "reelsGenerated": true,
  "reelsVideoUrl": "/api/download/abc123def456_reels",
  "s3Upload": {
    "enabled": true,
    "standard": {...},
    "reels": {
      "s3Key": "videos/2025-01-12/reels/abc123def456_reels.mp4",
      "signedUrl": "https://vidbuilder.s3.amazonaws.com/videos/...",
      "expiresIn": "7 days"
    }
  }
}
```

**Error (400 Bad Request):**
```json
{
  "success": false,
  "error": "Invalid video configuration. Must include scenes array.",
  "receivedConfig": {...}
}
```

---

## 🔧 Common Issues

### Issue 1: "Invalid video configuration"
**Cause:** Missing or invalid `scenes` array.

**Fix:**
```javascript
// ❌ Wrong
{
  theme: "corporate"
  // Missing scenes!
}

// ✅ Correct
{
  theme: "corporate",
  scenes: [
    {
      type: "hero-title",
      duration: 4,
      content: {title: "Hello"}
    }
  ]
}
```

### Issue 2: Request timeout
**Cause:** Default timeout too short for video generation.

**Fix:** Set timeout to at least 300 seconds (5 minutes).

### Issue 3: S3 URL not in response
**Cause:** S3 not configured on server.

**Check:** Response will have `s3Upload.enabled: false` or missing.

---

## 📝 Complete Working Example

```javascript
async function generateVideo() {
  const config = {
    theme: "corporate",
    music: {
      trackId: "corp-1",
      volume: 0.3
    },
    quality: "4k",
    generateReels: true,
    scenes: [
      {
        type: "hero-title",
        duration: 4,
        content: {
          title: "Transform Your **Business**",
          subtitle: "With AI-Powered Solutions"
        }
      },
      {
        type: "feature-list",
        duration: 6,
        content: {
          title: "Key Features",
          features: [
            {text: "Lightning-fast generation"},
            {text: "Cloud storage included"},
            {text: "30+ professional themes"}
          ]
        }
      },
      {
        type: "stats-dashboard",
        duration: 5,
        content: {
          title: "Our Impact",
          stats: [
            {value: "10K", label: "Videos", suffix: "+"},
            {value: "99", label: "Uptime", suffix: "%"}
          ]
        }
      },
      {
        type: "cta",
        duration: 3,
        content: {
          title: "Get Started Today",
          subtitle: "Visit vidbuilder.ai"
        }
      }
    ]
  };

  console.log('🎬 Starting video generation...');
  
  try {
    const response = await fetch('https://backend.vidbuilder.ai/api/generate-flexible-video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Generation failed');
    }

    const result = await response.json();
    
    console.log('✅ Video generated successfully!');
    console.log('📊 Job ID:', result.jobId);
    console.log('⏱️  Duration:', result.duration, 'seconds');
    console.log('🎬 Scenes:', result.scenes);
    
    console.log('\n📥 Download URLs:');
    console.log('Standard:', `https://backend.vidbuilder.ai${result.videoUrl}`);
    
    if (result.reelsGenerated) {
      console.log('Reels:', `https://backend.vidbuilder.ai${result.reelsVideoUrl}`);
    }
    
    if (result.s3Upload?.enabled) {
      console.log('\n☁️  S3 URLs (expires in 7 days):');
      console.log('Standard:', result.s3Upload.standard.signedUrl);
      if (result.s3Upload.reels) {
        console.log('Reels:', result.s3Upload.reels.signedUrl);
      }
    }
    
    return result;
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  }
}

// Run it
generateVideo();
```

---

## 🎉 Summary

**What Changed:**
- ✅ API now accepts both JSON body AND multipart form data
- ✅ API waits for video completion before responding
- ✅ Returns S3 signed URLs in response (if S3 configured)

**How to Use:**
1. **No images?** Use JSON body (`Content-Type: application/json`)
2. **With images?** Use multipart form data
3. **Set timeout** to at least 300 seconds
4. **Wait for response** - video will be ready when API responds

**Full Documentation:** See `API_DOCUMENTATION.md`
