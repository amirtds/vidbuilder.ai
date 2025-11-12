# Async API Quick Start Guide

## 🚀 Quick Example

### 1. Start Video Generation (Returns Immediately)

**⚠️ Important:** `webhookUrl` is REQUIRED. The API will reject requests without it.

```bash
curl -X POST https://backend.vidbuilder.ai/api/generate-video-async \
  -H "Content-Type: application/json" \
  -d '{
    "webhookUrl": "https://your-app.com/webhook/video-status",  # REQUIRED
    "theme": "corporate",
    "music": {"trackId": "corp-1", "volume": 0.3},
    "quality": "4k",
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

**Response (< 1 second):**
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

### 2. Receive Webhook Notifications

Your webhook URL will receive **2 POST requests** (to avoid rate limiting):

**1. Started (immediately):**
```json
{
  "jobId": "abc123def456",
  "status": "started",
  "message": "Video generation started",
  "timestamp": "2025-11-12T18:30:00.000Z"
}
```

**2. Completed (when done):**
```json
{
  "jobId": "abc123def456",
  "status": "completed",
  "progress": 100,
  "message": "Video generated successfully",
  "videoUrl": "/api/download/abc123def456",
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

### 3. Check Progress Anytime (Optional)

Since webhooks only notify on start/completion, use the status endpoint to check progress:

```bash
curl https://backend.vidbuilder.ai/api/job-status/abc123def456
```

Response:
```json
{
  "jobId": "abc123def456",
  "status": "processing",
  "progress": 45,
  "message": "Rendering: 45%"
}
```

---

## 📝 JavaScript Example

```javascript
// Start video generation
const response = await fetch('https://backend.vidbuilder.ai/api/generate-video-async', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    webhookUrl: 'https://your-app.com/webhook',
    theme: 'corporate',
    music: {trackId: 'corp-1', volume: 0.3},
    quality: '4k',
    scenes: [...]
  })
});

const { jobId } = await response.json();
console.log('Job started:', jobId);

// Implement webhook handler (Express.js)
app.post('/webhook', express.json(), (req, res) => {
  const { jobId, status, videoUrl, s3Upload } = req.body;
  
  if (status === 'completed') {
    console.log('✅ Video ready!');
    console.log('S3 URL:', s3Upload.standard.signedUrl);
  } else if (status === 'failed') {
    console.error('❌ Failed:', req.body.error);
  }
  
  res.status(200).json({ received: true });
});
```

---

## 🔄 API Comparison

### Old Sync API
```javascript
// Waits 3-15 minutes for response
const response = await fetch('/api/generate-flexible-video', {
  method: 'POST',
  body: JSON.stringify(config)
});
const result = await response.json(); // Blocks for minutes
```

### New Async API
```javascript
// Returns in < 1 second
const response = await fetch('/api/generate-video-async', {
  method: 'POST',
  body: JSON.stringify({...config, webhookUrl: '...'})
});
const { jobId } = await response.json(); // Returns immediately
// Receive updates via webhook!
```

---

## ✅ Benefits

| Feature | Sync API | Async API |
|---------|----------|-----------|
| Response Time | 3-15 min | < 1 sec |
| Timeout Risk | High | None |
| Progress Updates | No | Yes |
| Multiple Jobs | Sequential | Parallel |
| Scalability | Limited | High |

---

## 📚 Full Documentation

See `WEBHOOK_API_GUIDE.md` for complete documentation including:
- Webhook security
- Error handling
- Retry logic
- Production examples
- Migration guide

---

## 🚀 Deploy

1. Upload updated files:
```bash
scp server.js video-generator-async.js vidbuilder@YOUR_SERVER_IP:~/apps/vidbuilder/
```

2. Restart PM2:
```bash
ssh vidbuilder@YOUR_SERVER_IP
cd ~/apps/vidbuilder
pm2 restart vidbuilder
```

3. Test:
```bash
curl -X POST http://localhost:3000/api/generate-video-async \
  -H "Content-Type: application/json" \
  -d '{"webhookUrl":"https://webhook.site/YOUR-UNIQUE-URL",...}'
```

Use https://webhook.site to test webhooks!
