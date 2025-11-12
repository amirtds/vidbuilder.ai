# Webhook-Based Async Video Generation API

## 🚀 Overview

The new async API allows you to start video generation and receive updates via webhook, eliminating the need to keep connections open for 3-15 minutes.

**Benefits:**
- ✅ Instant response (< 1 second)
- ✅ No timeout issues
- ✅ Progress updates via webhook
- ✅ Better scalability
- ✅ Can handle multiple concurrent jobs

---

## 📡 New Async Endpoint

### POST /api/generate-video-async

Start video generation and receive updates via webhook.

**⚠️ Required:** `webhookUrl` must be provided. This endpoint will reject requests without a webhook URL.

**Request:**

```json
{
  "webhookUrl": "https://your-app.com/webhook/video-status",  // REQUIRED
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
}
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

**Error Response - Missing Webhook URL (400 Bad Request):**

```json
{
  "error": "Webhook URL is required for async video generation.",
  "message": "Please provide a webhookUrl in your request body to receive status updates.",
  "hint": "Use /api/generate-flexible-video for synchronous generation without webhooks."
}
```

**Error Response - Invalid Webhook URL (400 Bad Request):**

```json
{
  "error": "Invalid webhook URL format.",
  "message": "Please provide a valid HTTP/HTTPS URL.",
  "receivedUrl": "invalid-url"
}
```

---

## 🔔 Webhook Notifications

Your webhook URL will receive **2 POST requests** to avoid rate limiting your server:

### 1. Started (Immediately)

```json
{
  "jobId": "abc123def456",
  "status": "started",
  "message": "Video generation started",
  "timestamp": "2025-11-12T18:30:00.000Z"
}
```

### 2. Completed Successfully (When Done) - Video Ready

```json
{
  "jobId": "abc123def456",
  "status": "completed",
  "progress": 100,
  "message": "Video generated successfully",
  "videoUrl": "/api/download/abc123def456",
  "duration": 13,
  "scenes": 3,
  "reelsGenerated": false,
  "s3Upload": {
    "enabled": true,
    "standard": {
      "s3Key": "videos/2025-11-12/standard/abc123def456.mp4",
      "signedUrl": "https://vidbuilder.s3.amazonaws.com/...",
      "expiresIn": "7 days"
    }
  },
  "renderTime": "180s",
  "timestamp": "2025-11-12T18:33:00.000Z"
}
```

**OR 2. Failed (On Error):**

```json
{
  "jobId": "abc123def456",
  "status": "failed",
  "error": "Failed to render video: Out of memory",
  "timestamp": "2025-11-12T18:31:00.000Z"
}
```

**Note:** Progress updates are NOT sent via webhook to avoid rate limiting. Use the job status endpoint to check progress.

---

## 🔍 Check Job Status

### GET /api/job-status/:jobId

Query the current status of a job without waiting for webhook.

**Request:**
```bash
curl https://backend.vidbuilder.ai/api/job-status/abc123def456
```

**Response:**
```json
{
  "jobId": "abc123def456",
  "status": "processing",
  "progress": 45,
  "message": "Rendering frames: 450/1000",
  "createdAt": "2025-11-12T18:30:00.000Z"
}
```

**Possible Status Values:**
- `queued` - Job is waiting to start
- `processing` - Video is being generated
- `completed` - Video is ready
- `failed` - Generation failed

---

## 📝 Complete Example

### 1. Start Video Generation

```javascript
const response = await fetch('https://backend.vidbuilder.ai/api/generate-video-async', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    webhookUrl: 'https://your-app.com/webhook/video-status',
    theme: 'corporate',
    music: {trackId: 'corp-1', volume: 0.3},
    quality: '4k',
    scenes: [
      {
        type: 'hero-title',
        duration: 4,
        content: {
          title: 'Welcome to **VidBuilder**',
          subtitle: 'AI-Powered Video Generation'
        }
      }
    ]
  })
});

const result = await response.json();
console.log('Job started:', result.jobId);
// Job started: abc123def456
```

### 2. Implement Webhook Handler

```javascript
// Express.js webhook handler
app.post('/webhook/video-status', express.json(), (req, res) => {
  const { jobId, status, videoUrl, s3Upload, error } = req.body;
  
  console.log(`Job ${jobId} status: ${status}`);
  
  if (status === 'completed') {
    console.log('✅ Video ready!');
    console.log('Download URL:', videoUrl);
    console.log('S3 URL:', s3Upload?.standard?.signedUrl);
    
    // Update your database
    // Send notification to user
    // etc.
  } else if (status === 'failed') {
    console.error('❌ Video generation failed:', error);
    // Handle error
  }
  
  // Always respond with 200 OK
  res.status(200).json({ received: true });
});
```

### 3. Optional: Poll for Status

```javascript
async function waitForVideo(jobId) {
  while (true) {
    const response = await fetch(`https://backend.vidbuilder.ai/api/job-status/${jobId}`);
    const status = await response.json();
    
    console.log(`Status: ${status.status} (${status.progress}%)`);
    
    if (status.status === 'completed') {
      return status;
    } else if (status.status === 'failed') {
      throw new Error(status.error);
    }
    
    // Wait 5 seconds before checking again
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
}

// Usage
const result = await waitForVideo('abc123def456');
console.log('Video URL:', result.videoUrl);
```

---

## 🔄 Migration from Sync to Async

### Old Sync API (Still Works)

```javascript
// This still works but ties up the connection for 3-15 minutes
const response = await fetch('/api/generate-flexible-video', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(config)
});

const result = await response.json(); // Waits 3-15 minutes
console.log('Video URL:', result.videoUrl);
```

### New Async API (Recommended)

```javascript
// Returns immediately
const response = await fetch('/api/generate-video-async', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    ...config,
    webhookUrl: 'https://your-app.com/webhook'
  })
});

const result = await response.json(); // Returns in < 1 second
console.log('Job ID:', result.jobId);

// Receive updates via webhook (no waiting!)
```

---

## 🛡️ Webhook Security

### 1. Verify Webhook Source

```javascript
app.post('/webhook/video-status', (req, res) => {
  // Check IP address
  const allowedIPs = ['YOUR_SERVER_IP'];
  const clientIP = req.ip || req.connection.remoteAddress;
  
  if (!allowedIPs.includes(clientIP)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  // Process webhook
  // ...
});
```

### 2. Use HMAC Signature (Future Enhancement)

```javascript
// Server sends signature
const signature = crypto
  .createHmac('sha256', SECRET_KEY)
  .update(JSON.stringify(payload))
  .digest('hex');

// Client verifies signature
const expectedSignature = req.headers['x-webhook-signature'];
if (signature !== expectedSignature) {
  return res.status(401).json({ error: 'Invalid signature' });
}
```

### 3. Use HTTPS

Always use HTTPS for webhook URLs:
- ✅ `https://your-app.com/webhook`
- ❌ `http://your-app.com/webhook`

---

## 🔧 Webhook Best Practices

### 1. Respond Quickly

```javascript
app.post('/webhook/video-status', async (req, res) => {
  // Respond immediately
  res.status(200).json({ received: true });
  
  // Process webhook asynchronously
  processWebhook(req.body).catch(err => {
    console.error('Webhook processing error:', err);
  });
});
```

### 2. Handle Retries

VidBuilder will retry failed webhooks:
- 1st retry: 30 seconds
- 2nd retry: 2 minutes
- 3rd retry: 5 minutes

Make your webhook idempotent (safe to receive multiple times).

### 3. Log Webhooks

```javascript
app.post('/webhook/video-status', (req, res) => {
  console.log('Webhook received:', {
    jobId: req.body.jobId,
    status: req.body.status,
    timestamp: req.body.timestamp
  });
  
  // Store in database for debugging
  db.webhooks.insert(req.body);
  
  res.status(200).json({ received: true });
});
```

---

## 📊 Comparison: Sync vs Async

| Feature | Sync API | Async API |
|---------|----------|-----------|
| **Response Time** | 3-15 minutes | < 1 second |
| **Timeout Risk** | High | None |
| **Connection** | Kept open | Closed immediately |
| **Scalability** | Limited | High |
| **Progress Updates** | No | Yes (via webhook) |
| **Multiple Jobs** | Blocks | Concurrent |
| **Recommended For** | Testing | Production |

---

## 🎯 Use Cases

### Use Case 1: Web Application

```javascript
// User clicks "Generate Video"
async function generateVideo(config) {
  const response = await fetch('/api/generate-video-async', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      ...config,
      webhookUrl: 'https://your-app.com/api/webhook/video'
    })
  });
  
  const { jobId } = await response.json();
  
  // Show user: "Video is being generated... (Job ID: abc123)"
  // Store jobId in database
  // User can close browser and come back later
}

// Webhook handler updates database
app.post('/api/webhook/video', async (req, res) => {
  const { jobId, status, videoUrl, s3Upload } = req.body;
  
  await db.videos.update(jobId, {
    status,
    videoUrl: s3Upload?.standard?.signedUrl
  });
  
  // Send email/push notification to user
  if (status === 'completed') {
    await sendNotification(jobId, 'Your video is ready!');
  }
  
  res.status(200).json({ received: true });
});
```

### Use Case 2: Batch Processing

```javascript
// Generate 100 videos in parallel
const jobs = [];

for (const config of videoConfigs) {
  const response = await fetch('/api/generate-video-async', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      ...config,
      webhookUrl: 'https://your-app.com/webhook'
    })
  });
  
  const { jobId } = await response.json();
  jobs.push(jobId);
}

console.log(`Started ${jobs.length} video generation jobs`);
// All jobs run in parallel on the server!
```

### Use Case 3: API Integration

```javascript
// Third-party service integrating with VidBuilder
const vidbuilder = {
  async createVideo(config) {
    const response = await fetch('https://backend.vidbuilder.ai/api/generate-video-async', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: JSON.stringify({
        ...config,
        webhookUrl: 'https://your-service.com/vidbuilder/webhook'
      })
    });
    
    return await response.json();
  },
  
  async getStatus(jobId) {
    const response = await fetch(`https://backend.vidbuilder.ai/api/job-status/${jobId}`);
    return await response.json();
  }
};

// Usage
const { jobId } = await vidbuilder.createVideo(config);
console.log('Job started:', jobId);
```

---

## ✅ Summary

**New Async API:**
- ✅ Endpoint: `POST /api/generate-video-async`
- ✅ Returns immediately with job ID
- ✅ Sends updates to webhook URL
- ✅ No timeout issues
- ✅ Scalable for multiple concurrent jobs

**Status Endpoint:**
- ✅ Endpoint: `GET /api/job-status/:jobId`
- ✅ Query job status anytime
- ✅ No webhook required

**Old Sync API:**
- ✅ Still available: `POST /api/generate-flexible-video`
- ✅ Backward compatible
- ⚠️ Not recommended for production (timeout issues)

**Migrate to async API for better performance and reliability!** 🚀
