# Video Generation Concurrency Guide

## Overview

The video generation API now includes a **concurrency control system** that limits the number of simultaneous video renders to prevent server overload and ensure stable performance.

## Configuration

**Current Settings:**
- **Max Concurrent Renders**: 5
- **Queue System**: Enabled
- **Auto-processing**: Jobs automatically start when slots become available

## How It Works

### 1. Job Submission

When you submit a video generation request to `/api/generate-video-async`:

```bash
curl -X POST https://backend.vidbuilder.ai/api/generate-video-async \
  -u admin:changeme \
  -H "Content-Type: application/json" \
  -d '{
    "webhookUrl": "https://your-app.com/webhook",
    "theme": "winter",
    "scenes": [...]
  }'
```

**Response:**
```json
{
  "success": true,
  "jobId": "abc123",
  "status": "queued",
  "message": "Video generation started. You will receive updates via webhook.",
  "queue": {
    "position": 3,
    "activeRenders": 5,
    "maxConcurrent": 5,
    "queueLength": 2
  }
}
```

### 2. Queue Processing

- **If slots available** (< 5 active renders): Job starts immediately
- **If all slots full**: Job is queued and will start automatically when a slot opens
- **FIFO order**: First in, first out

### 3. Job Status Updates

Jobs transition through these statuses:

1. **`queued`** - Waiting for available slot
2. **`processing`** - Actively rendering
3. **`completed`** - Successfully finished
4. **`failed`** - Error occurred

## API Endpoints

### Check Job Status

```bash
GET /api/job-status/:jobId
```

**Response:**
```json
{
  "jobId": "abc123",
  "status": "processing",
  "progress": 45,
  "message": "Rendering: 45%",
  "queue": {
    "activeRenders": 5,
    "maxConcurrent": 5,
    "queueLength": 2
  }
}
```

### Check Queue Status

```bash
GET /api/queue-status
```

**Response:**
```json
{
  "activeRenders": 5,
  "maxConcurrent": 5,
  "queueLength": 3,
  "availableSlots": 0,
  "queuedJobs": [
    {
      "jobId": "def456",
      "queuedAt": "2025-11-14T18:30:00.000Z"
    },
    {
      "jobId": "ghi789",
      "queuedAt": "2025-11-14T18:30:05.000Z"
    }
  ]
}
```

## Console Logs

The server logs provide real-time queue visibility:

```
📥 Job abc123 queued (Queue: 3, Active: 5/5)
🎬 Starting queued job abc123 (Active: 5/5, Queue: 2)
✅ Job abc123 completed (Active: 4/5, Queue: 2)
🎬 Starting queued job def456 (Active: 5/5, Queue: 1)
```

## Adjusting Concurrency Limit

To change the maximum concurrent renders, edit `server.js`:

```javascript
const MAX_CONCURRENT_RENDERS = 5; // Change this value
```

**Recommendations:**
- **Small server (2-4 CPU cores)**: 2-3 concurrent renders
- **Medium server (8 CPU cores)**: 5-7 concurrent renders
- **Large server (16+ CPU cores)**: 10-15 concurrent renders

**Note:** Each render uses significant CPU and memory. Monitor your server resources and adjust accordingly.

## Webhook Notifications

Webhooks are sent at:
1. **Job start** - When job moves from `queued` to `processing`
2. **Job completion** - When job finishes (success or failure)

**No webhooks during queue wait** - Use `/api/job-status/:jobId` to check queue position.

## Best Practices

### For API Consumers

1. **Check queue status** before submitting many jobs
2. **Monitor job status** via `/api/job-status/:jobId`
3. **Handle webhook notifications** for completion
4. **Implement retry logic** for failed jobs

### For Server Operators

1. **Monitor server resources** (CPU, RAM, disk)
2. **Adjust MAX_CONCURRENT_RENDERS** based on capacity
3. **Set up logging** to track queue performance
4. **Consider Redis** for persistent queue in production

## Production Considerations

For high-volume production use, consider:

1. **Persistent Queue**: Use Redis + BullMQ instead of in-memory queue
2. **Horizontal Scaling**: Multiple worker servers processing from shared queue
3. **Job Priorities**: Priority queue for urgent requests
4. **Rate Limiting**: Per-user/per-API-key limits
5. **Monitoring**: Prometheus/Grafana for queue metrics
6. **Timeouts**: Automatic job cancellation after X minutes

## Troubleshooting

### Jobs stuck in queue?

Check active renders:
```bash
curl -u admin:changeme https://backend.vidbuilder.ai/api/queue-status
```

If `activeRenders` is less than `maxConcurrent` but jobs aren't processing, restart the server.

### Server overloaded?

Reduce `MAX_CONCURRENT_RENDERS` to 2-3 and monitor CPU/RAM usage.

### Queue growing too large?

- Increase `MAX_CONCURRENT_RENDERS` (if server can handle it)
- Add more worker servers
- Implement job expiration (auto-cancel old queued jobs)

## Example: Bulk Video Generation

```javascript
// Submit 20 videos
const jobs = [];
for (let i = 0; i < 20; i++) {
  const response = await fetch('https://backend.vidbuilder.ai/api/generate-video-async', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa('admin:changeme'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      webhookUrl: 'https://your-app.com/webhook',
      theme: 'winter',
      scenes: [...]
    })
  });
  
  const data = await response.json();
  jobs.push(data.jobId);
  
  console.log(`Job ${data.jobId} queued at position ${data.queue.position}`);
}

// First 5 start immediately, rest are queued
// As each completes, next in queue starts automatically
```

---

**Current Version**: 1.0  
**Last Updated**: November 14, 2025
