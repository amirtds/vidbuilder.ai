# VidBuilder API Documentation

Complete API reference for the VidBuilder video generation platform.

**Base URL:** `https://backend.vidbuilder.ai`  
**Version:** 1.0  
**Authentication:** Basic Auth (required for all API endpoints)  
**Content-Type:** `application/json` or `multipart/form-data`

## 🔐 Authentication

All API endpoints require HTTP Basic Authentication:

```bash
# cURL
curl -u "username:password" https://backend.vidbuilder.ai/api/...

# JavaScript
const credentials = btoa('username:password');
fetch(url, {
  headers: {
    'Authorization': `Basic ${credentials}`
  }
});

# Python
import requests
from requests.auth import HTTPBasicAuth
requests.get(url, auth=HTTPBasicAuth('username', 'password'))
```

**Credentials:** Set in `.env` file (`API_USERNAME` and `API_PASSWORD`)

**See:** `API_AUTHENTICATION_GUIDE.md` for complete authentication documentation.

---

## 📋 Table of Contents

1. [Video Generation API](#video-generation-api)
2. [Video Management API](#video-management-api)
3. [Health & Status API](#health--status-api)
4. [Scene Types Reference](#scene-types-reference)
5. [Themes & Music](#themes--music)
6. [Error Handling](#error-handling)
7. [Complete Examples](#complete-examples)

---

## 🎬 Video Generation API

### 🆕 Generate Video (Async with Webhook) - RECOMMENDED

Generate a video asynchronously and receive updates via webhook. Returns immediately.

**Endpoint:** `POST /api/generate-video-async`

**Authentication:** Required (Basic Auth)

**Content-Type:** `application/json` OR `multipart/form-data`

**⚠️ Required:** `webhookUrl` must be provided to receive status updates.

**Benefits:**
- ✅ Returns immediately (< 1 second)
- ✅ No timeout issues
- ✅ Progress updates via webhook
- ✅ Supports multiple concurrent jobs

**Request Body:**
```json
{
  "webhookUrl": "https://your-app.com/webhook/video-status",  // REQUIRED
  "theme": "corporate",
  "music": {
    "enabled": true,
    "filename": "cyberpunk-futuristic-city-music-323171",  // Use filename (recommended)
    "volume": 0.3
  },
  "quality": "4k",
  "generateReels": false,
  "scenes": [...]
}
```

**Note:** Use `filename` (without .mp3) instead of `trackId` for music. Old `trackId` format still supported for backward compatibility.

**Authentication:**
```bash
curl -u "username:password" \
  -X POST https://backend.vidbuilder.ai/api/generate-video-async \
  -H "Content-Type: application/json" \
  -d '{...}'
```

**Immediate Response (202 Accepted):**
```json
{
  "success": true,
  "jobId": "abc123def456",
  "status": "queued",
  "message": "Video generation started. You will receive updates via webhook.",
  "webhookConfigured": true,
  "statusUrl": "/api/job-status/abc123def456",
  "estimatedTime": "3-15 minutes"
}
```

**Webhook Notifications:**

Your webhook URL will receive **2 POST requests** (to avoid rate limiting):

1. **Started (immediately):**
```json
{
  "jobId": "abc123def456",
  "status": "started",
  "message": "Video generation started",
  "timestamp": "2025-11-12T18:30:00.000Z"
}
```

2. **Completed (when done):**
```json
{
  "jobId": "abc123def456",
  "status": "completed",
  "progress": 100,
  "message": "Video generated successfully",
  "duration": 13,
  "scenes": 3,
  "s3Upload": {
    "enabled": true,
    "standard": {
      "signedUrl": "https://vidbuilder.s3.amazonaws.com/..."
    }
  },
  "renderTime": "180s",
  "timestamp": "2025-11-12T18:33:00.000Z"
}
```

**OR Failed (on error):**
```json
{
  "jobId": "abc123def456",
  "status": "failed",
  "error": "Error message",
  "timestamp": "2025-11-12T18:31:00.000Z"
}
```

**Note:** Progress updates are NOT sent via webhook to avoid rate limiting. Use the job status endpoint to check progress.

**Check Job Status:**
```bash
GET /api/job-status/:jobId
```

Response:
```json
{
  "jobId": "abc123def456",
  "status": "processing",
  "progress": 45,
  "message": "Rendering: 45%",
  "createdAt": "2025-11-12T18:30:00.000Z"
}
```

**See:** `WEBHOOK_API_GUIDE.md` for complete webhook documentation.

---

### Generate Flexible Video (Synchronous)

Generate a custom video synchronously. Waits for completion before responding.

**Endpoint:** `POST /api/generate-flexible-video`

**Authentication:** Required (Basic Auth)

**Content-Type:** `application/json` OR `multipart/form-data`

**⚠️ Important:** 
- The API waits for video generation to complete before responding
- **Generation time:** 30 seconds to 15 minutes (depending on video length, quality, and complexity)
- **Timeout limits:** Server configured for up to 30-minute requests
- **Client timeout:** Set your client timeout to at least 20 minutes (1200 seconds)
- **Recommended:** Use async API (`/api/generate-video-async`) for production

**Request Methods:**

#### Method 1: JSON Body (No Images)

Use `Content-Type: application/json` when you don't need to upload images.

**Request Body:**
```json
{
  "theme": "corporate",
  "music": {"trackId": "corp-1", "volume": 0.3},
  "quality": "4k",
  "generateReels": false,
  "scenes": [...]
}
```

#### Method 2: Multipart Form Data (With Images)

Use `Content-Type: multipart/form-data` when uploading images.

**Form Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `config` | JSON string | Yes | Video configuration as JSON string |
| `images` | File[] | No | Image files for scenes (max 500MB total) |

**Configuration Schema:**

```json
{
  "theme": "corporate",
  "music": {
    "trackId": "corp-1",
    "volume": 0.3
  },
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
}
```

**Example 1: JSON Body Request (No Images)**

```bash
# cURL with Basic Auth
curl -u "username:password" \
  -X POST https://backend.vidbuilder.ai/api/generate-flexible-video \
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
          "subtitle": "AI-Powered Video Generation"
        }
      }
    ]
  }'
```

```javascript
// JavaScript/Fetch with Basic Auth
const config = {
  theme: "corporate",
  music: {trackId: "corp-1", volume: 0.3},
  quality: "4k",
  generateReels: false,
  scenes: [
    {
      type: "hero-title",
      duration: 4,
      content: {
        title: "Welcome to **VidBuilder**",
        subtitle: "AI-Powered Video Generation"
      }
    }
  ]
};

// Add Basic Auth
const username = 'your_username';
const password = 'your_password';
const credentials = btoa(`${username}:${password}`);

const response = await fetch('https://backend.vidbuilder.ai/api/generate-flexible-video', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${credentials}`
  },
  body: JSON.stringify(config)
});

const result = await response.json();
console.log('Video URL:', result.videoUrl);
console.log('S3 URL:', result.s3Upload.standard.signedUrl);
```

**Example 2: Multipart Form Data (With Images)**

```bash
# cURL with Basic Auth
curl -u "username:password" \
  -X POST https://backend.vidbuilder.ai/api/generate-flexible-video \
  -F 'config={
    "theme": "corporate",
    "music": {"trackId": "corp-1", "volume": 0.3},
    "quality": "4k",
    "scenes": [
      {
        "type": "product-showcase",
        "duration": 8,
        "content": {
          "title": "Our Products",
          "images": ["image1.jpg", "image2.jpg"],
          "captions": ["Product 1", "Product 2"]
        }
      }
    ]
  }' \
  -F 'images=@/path/to/image1.jpg' \
  -F 'images=@/path/to/image2.jpg'
```

```javascript
// JavaScript/Fetch with images
const config = {
  theme: "corporate",
  music: {trackId: "corp-1", volume: 0.3},
  quality: "4k",
  scenes: [
    {
      type: "product-showcase",
      duration: 8,
      content: {
        title: "Our Products",
        images: ["image1.jpg", "image2.jpg"],
        captions: ["Product 1", "Product 2"]
      }
    }
  ]
};

const formData = new FormData();
formData.append('config', JSON.stringify(config));

// Add image files
const imageFile1 = document.getElementById('image1').files[0];
const imageFile2 = document.getElementById('image2').files[0];
formData.append('images', imageFile1);
formData.append('images', imageFile2);

const response = await fetch('https://backend.vidbuilder.ai/api/generate-flexible-video', {
  method: 'POST',
  body: formData  // Don't set Content-Type header - browser sets it automatically
});

const result = await response.json();
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "Video generated successfully!",
  "jobId": "abc123def456",
  "duration": 13,
  "type": "flexible",
  "scenes": 3,
  "videoUrl": "/api/download/abc123def456",
  "reelsGenerated": false,
  "s3Upload": {
    "enabled": true,
    "standard": {
      "s3Key": "videos/2025-01-12/standard/abc123def456.mp4",
      "signedUrl": "https://vidbuilder.s3.amazonaws.com/...",
      "expiresIn": "7 days"
    }
  }
}
```

**Error Response (400 Bad Request):**

```json
{
  "success": false,
  "error": "Invalid configuration: scenes array is required"
}
```

---

## 📥 Video Management API

### 1. Download Video

**Endpoint:** `GET /api/download/:jobId`

**Example:**
```bash
curl -O https://backend.vidbuilder.ai/api/download/abc123def456
```

Returns video file with `Content-Type: video/mp4`

### 2. List All Videos

**Endpoint:** `GET /api/videos`

**Response:**
```json
{
  "videos": [
    {
      "jobId": "abc123def456",
      "filename": "abc123def456.mp4",
      "size": "15.2 MB",
      "created": "2025-01-12T10:30:00Z",
      "url": "/api/download/abc123def456"
    }
  ],
  "count": 1,
  "totalSize": "15.2 MB"
}
```

### 3. Check Video Status

**Endpoint:** `GET /api/status/:jobId`

**Response:**
```json
{
  "jobId": "abc123def456",
  "status": "completed",
  "progress": 100,
  "videoUrl": "/api/download/abc123def456"
}
```

Status values: `processing`, `completed`, `failed`, `not_found`

### 4. Delete Video

**Endpoint:** `DELETE /api/videos/:jobId`

**Response:**
```json
{
  "success": true,
  "message": "Video deleted successfully"
}
```

---

## 🏥 Health & Status API

### Health Check

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-12T10:30:00Z"
}
```

---

## 📝 Scene Types Reference

### Hero Title Scene
```json
{
  "type": "hero-title",
  "duration": 4,
  "content": {
    "title": "Your **Main** Title",
    "subtitle": "Supporting text",
    "fontSize": 96
  }
}
```

### Feature List Scene
```json
{
  "type": "feature-list",
  "duration": 6,
  "content": {
    "title": "Features",
    "features": [
      {"text": "Feature 1"},
      {"text": "Feature 2"}
    ]
  }
}
```

### Stats Dashboard Scene
```json
{
  "type": "stats-dashboard",
  "duration": 5,
  "content": {
    "title": "Our Numbers",
    "stats": [
      {"value": "10K", "label": "Users", "suffix": "+"},
      {"value": "99", "label": "Uptime", "suffix": "%"}
    ]
  }
}
```

### Product Showcase Scene
```json
{
  "type": "product-showcase",
  "duration": 8,
  "content": {
    "title": "Our Product",
    "images": ["image1.jpg", "image2.jpg"],
    "captions": ["Feature 1", "Feature 2"]
  }
}
```

### Testimonial Scene
```json
{
  "type": "testimonial",
  "duration": 6,
  "content": {
    "quote": "This product changed my life!",
    "author": "John Doe",
    "role": "CEO, Company Inc"
  }
}
```

### CTA Scene
```json
{
  "type": "cta",
  "duration": 3,
  "content": {
    "title": "Get Started Today",
    "subtitle": "Visit our website"
  }
}
```

### Pricing Cards Scene
```json
{
  "type": "pricing-cards",
  "duration": 8,
  "content": {
    "title": "Choose Your Plan",
    "plans": [
      {
        "name": "Starter",
        "price": "$9",
        "period": "per month",
        "features": ["10 videos", "HD quality"]
      }
    ]
  }
}
```

### Timeline Scene
```json
{
  "type": "timeline",
  "duration": 8,
  "content": {
    "title": "Our Journey",
    "events": [
      {"year": "2020", "title": "Founded"},
      {"year": "2024", "title": "Today"}
    ]
  }
}
```

---

## 🎨 Themes & Music

### Available Themes

**Light:** `light`, `corporate`, `cupcake`, `bumblebee`, `emerald`, `valentine`, `garden`, `lofi`, `pastel`, `fantasy`, `wireframe`, `cmyk`, `autumn`, `acid`, `lemonade`, `winter`

**Dark:** `dark`, `synthwave`, `retro`, `cyberpunk`, `halloween`, `forest`, `aqua`, `black`, `luxury`, `dracula`, `business`, `night`, `coffee`

### Music Tracks

- **Corporate:** `corp-1` to `corp-8`
- **Upbeat:** `upbeat-1` to `upbeat-8`
- **Electronic:** `tech-1` to `tech-8`
- **Calm:** `calm-1` to `calm-6`
- **Cinematic:** `epic-1` to `epic-8`
- **Motivational:** `motiv-1` to `motiv-5`
- **Pop:** `pop-1` to `pop-5`
- **Lofi:** `lofi-1` to `lofi-5`

### Quality Presets

| Preset | Resolution | Aspect | Bitrate | FPS |
|--------|-----------|--------|---------|-----|
| `4k` | 3840x2160 | 16:9 | 20 Mbps | 30 |
| `1080p` | 1920x1080 | 16:9 | 8 Mbps | 30 |
| `720p` | 1280x720 | 16:9 | 5 Mbps | 30 |
| `reels` | 1080x1920 | 9:16 | 8 Mbps | 30 |

---

## ❌ Error Handling

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request |
| 404 | Not Found |
| 413 | File Too Large |
| 429 | Rate Limited |
| 500 | Server Error |

### Error Format

```json
{
  "success": false,
  "error": "Error message"
}
```

### Rate Limits

- Video generation: 2 req/s (burst: 5)
- Other endpoints: 10 req/s (burst: 20)

---

## 📚 Complete Examples

### Example 1: Simple Video (JSON Body)

```javascript
const config = {
  theme: "corporate",
  music: {trackId: "corp-1", volume: 0.3},
  quality: "1080p",
  scenes: [
    {
      type: "hero-title",
      duration: 4,
      content: {
        title: "Welcome to **VidBuilder**",
        subtitle: "Create videos in minutes"
      }
    },
    {
      type: "cta",
      duration: 3,
      content: {
        title: "Get Started",
        subtitle: "Visit vidbuilder.ai"
      }
    }
  ]
};

const response = await fetch('https://backend.vidbuilder.ai/api/generate-flexible-video', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(config)
});

const result = await response.json();
console.log('Video URL:', result.videoUrl);
console.log('S3 URL:', result.s3Upload.standard.signedUrl);
```

### Example 2: Marketing Video with Images

```javascript
const config = {
  theme: "corporate",
  music: {trackId: "corp-1", volume: 0.3},
  quality: "4k",
  generateReels: true,
  scenes: [
    {
      type: "hero-title",
      duration: 4,
      content: {
        title: "Transform Your **Business**",
        subtitle: "With AI Solutions"
      }
    },
    {
      type: "feature-list",
      duration: 6,
      content: {
        title: "Key Features",
        features: [
          {text: "Fast generation"},
          {text: "Cloud storage"},
          {text: "30+ themes"}
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
      type: "product-showcase",
      duration: 8,
      content: {
        title: "See It In Action",
        images: ["dashboard.jpg", "analytics.jpg"],
        captions: ["Dashboard", "Analytics"]
      }
    },
    {
      type: "cta",
      duration: 3,
      content: {
        title: "Start Today",
        subtitle: "Get your first video free"
      }
    }
  ]
};

const formData = new FormData();
formData.append('config', JSON.stringify(config));
formData.append('images', dashboardImage);
formData.append('images', analyticsImage);

const response = await fetch('https://backend.vidbuilder.ai/api/generate-flexible-video', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log('Standard:', result.videoUrl);
console.log('Reels:', result.reelsVideoUrl);
```

### Example 3: Python SDK

```python
import requests
import json

def generate_video(config, images=None):
    url = "https://backend.vidbuilder.ai/api/generate-flexible-video"
    
    files = []
    if images:
        for img_path in images:
            files.append(('images', open(img_path, 'rb')))
    
    data = {'config': json.dumps(config)}
    response = requests.post(url, data=data, files=files)
    
    for f in files:
        f[1].close()
    
    return response.json()

config = {
    "theme": "corporate",
    "music": {"trackId": "corp-1", "volume": 0.3},
    "quality": "4k",
    "scenes": [
        {
            "type": "hero-title",
            "duration": 4,
            "content": {
                "title": "Hello **World**",
                "subtitle": "From Python"
            }
        }
    ]
}

result = generate_video(config)
print(f"Video: {result['videoUrl']}")
print(f"S3: {result['s3Upload']['standard']['signedUrl']}")
```

---

## 📞 Support & Resources

- **Deployment:** `DEPLOYMENT_GUIDE.md`
- **S3 Setup:** `AWS_S3_SETUP_GUIDE.md`
- **Music Library:** `PIXABAY_MUSIC_LIBRARY.md`
- **Health Check:** `GET /api/health`

**Need help?** Check the health endpoint or review error messages for details.
