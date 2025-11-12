# API Authentication & Storage Guide

## 🔒 Security & Storage Updates

### Changes Made

1. ✅ **Basic Authentication** - All API endpoints now require authentication
2. ✅ **S3-Only Storage** - Videos deleted from local disk after S3 upload
3. ✅ **UI Unchanged** - Web UI still works without authentication

---

## 🔐 1. Basic Authentication

### Overview

All API endpoints now require HTTP Basic Authentication:
- `/api/generate-video-async` ← Requires auth
- `/api/generate-flexible-video` ← Requires auth
- `/api/job-status/:jobId` ← Requires auth

**Web UI endpoints** (HTML pages) do NOT require auth:
- `/advanced-client.html` ← No auth needed
- `/` ← No auth needed

---

### Setup Authentication

#### Step 1: Set Credentials in .env

```bash
# Edit .env file
nano /home/vidbuilder/apps/vidbuilder/.env
```

Add these lines:
```env
API_USERNAME=your_username
API_PASSWORD=your_secure_password_123
```

**Security Tips:**
- Use a strong password (16+ characters)
- Don't use default credentials
- Rotate passwords regularly
- Use different credentials per environment

#### Step 2: Restart Application

```bash
pm2 restart vidbuilder
```

---

### Using Authenticated API

#### cURL Example

```bash
curl -X POST https://backend.vidbuilder.ai/api/generate-video-async \
  -u "your_username:your_password" \
  -H "Content-Type: application/json" \
  -d '{
    "webhookUrl": "https://your-app.com/webhook",
    "theme": "corporate",
    "scenes": [...]
  }'
```

#### JavaScript/Fetch Example

```javascript
const username = 'your_username';
const password = 'your_password';
const credentials = btoa(`${username}:${password}`);

const response = await fetch('https://backend.vidbuilder.ai/api/generate-video-async', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${credentials}`
  },
  body: JSON.stringify({
    webhookUrl: 'https://your-app.com/webhook',
    theme: 'corporate',
    scenes: [...]
  })
});

const result = await response.json();
```

#### Python Example

```python
import requests
from requests.auth import HTTPBasicAuth

response = requests.post(
    'https://backend.vidbuilder.ai/api/generate-video-async',
    auth=HTTPBasicAuth('your_username', 'your_password'),
    json={
        'webhookUrl': 'https://your-app.com/webhook',
        'theme': 'corporate',
        'scenes': [...]
    }
)

result = response.json()
```

---

### Error Responses

#### No Authentication

```bash
curl https://backend.vidbuilder.ai/api/generate-video-async
```

**Response (401 Unauthorized):**
```json
{
  "error": "Authentication required",
  "message": "Please provide valid credentials using Basic Authentication"
}
```

#### Invalid Credentials

```bash
curl -u "wrong:password" https://backend.vidbuilder.ai/api/generate-video-async
```

**Response (401 Unauthorized):**
```json
{
  "error": "Invalid credentials",
  "message": "Username or password is incorrect"
}
```

---

## 💾 2. S3-Only Storage (No Local Storage)

### Overview

**New Behavior:**
1. Video is rendered locally (temporary)
2. Video is uploaded to S3
3. **Local video file is DELETED** (saves disk space)
4. Only S3 URL is returned

**Benefits:**
- ✅ No disk space issues
- ✅ Unlimited storage (S3)
- ✅ Videos accessible via S3 URLs
- ✅ Automatic cleanup

---

### How It Works

```
1. Render video → /output/abc123.mp4 (temporary)
2. Upload to S3 → s3://vidbuilder/videos/abc123.mp4
3. Delete local → /output/abc123.mp4 (removed!)
4. Return S3 URL → https://vidbuilder.s3.amazonaws.com/...
```

---

### Response Changes

#### With S3 Configured (Production)

**Webhook Payload:**
```json
{
  "jobId": "abc123",
  "status": "completed",
  "s3Upload": {
    "enabled": true,
    "standard": {
      "signedUrl": "https://vidbuilder.s3.amazonaws.com/..."
    }
  }
}
```

**Note:** No `videoUrl` field (local file deleted)

#### Without S3 Configured (Development)

**Webhook Payload:**
```json
{
  "jobId": "abc123",
  "status": "completed",
  "videoUrl": "/api/download/abc123"
}
```

**Warning:** Local storage will fill up quickly!

---

### S3 Configuration Required

For production, S3 **must** be configured:

```env
# .env
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
AWS_S3_BUCKET=vidbuilder
```

See `AWS_S3_SETUP_GUIDE.md` for setup instructions.

---

## 🎨 3. UI vs API

### Web UI (No Auth Required)

The web interface at `/advanced-client.html` does NOT require authentication:

```
✅ https://backend.vidbuilder.ai/advanced-client.html
✅ https://backend.vidbuilder.ai/
```

**Why?**
- UI makes requests from the browser
- Browser can't store credentials securely
- UI is for internal/trusted use

**For Production:**
- Put UI behind a firewall
- Use VPN for access
- Or implement OAuth/session-based auth

---

### API Endpoints (Auth Required)

All API endpoints require Basic Auth:

```
🔒 POST /api/generate-video-async
🔒 POST /api/generate-flexible-video
🔒 GET  /api/job-status/:jobId
```

**Why?**
- API is for programmatic access
- Credentials can be stored securely server-side
- Prevents unauthorized video generation

---

## 🚀 Migration Guide

### Step 1: Update .env

```bash
# On server
nano /home/vidbuilder/apps/vidbuilder/.env
```

Add:
```env
# API Authentication
API_USERNAME=vidbuilder_api
API_PASSWORD=your_secure_password_here

# S3 Configuration (if not already configured)
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
AWS_S3_BUCKET=vidbuilder
```

### Step 2: Upload Updated Files

```bash
# From local machine
cd /Users/amir/cubite/aiVideoGenerator
scp server.js vidbuilder@YOUR_SERVER_IP:~/apps/vidbuilder/
scp video-generator-async.js vidbuilder@YOUR_SERVER_IP:~/apps/vidbuilder/
scp .env.example vidbuilder@YOUR_SERVER_IP:~/apps/vidbuilder/
```

### Step 3: Restart Application

```bash
# On server
ssh vidbuilder@YOUR_SERVER_IP
cd ~/apps/vidbuilder
pm2 restart vidbuilder
pm2 logs vidbuilder
```

### Step 4: Update API Clients

Update all API clients to include authentication:

```javascript
// Before
fetch('/api/generate-video-async', {
  method: 'POST',
  body: JSON.stringify(config)
});

// After
const credentials = btoa('username:password');
fetch('/api/generate-video-async', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${credentials}`
  },
  body: JSON.stringify(config)
});
```

---

## 🧪 Testing

### Test Authentication

```bash
# Should fail (no auth)
curl https://backend.vidbuilder.ai/api/job-status/test123

# Should work (with auth)
curl -u "username:password" https://backend.vidbuilder.ai/api/job-status/test123
```

### Test S3 Storage

```bash
# Generate video
curl -u "username:password" \
  -X POST https://backend.vidbuilder.ai/api/generate-video-async \
  -H "Content-Type: application/json" \
  -d '{
    "webhookUrl": "https://webhook.site/YOUR-URL",
    "theme": "corporate",
    "quality": "1080p",
    "scenes": [...]
  }'

# Check webhook - should have s3Upload.standard.signedUrl
# Local file should NOT exist on server
ssh vidbuilder@YOUR_SERVER_IP
ls -lh ~/apps/vidbuilder/output/
# Should be empty or minimal files
```

---

## 📊 Storage Monitoring

### Check Disk Usage

```bash
# On server
df -h /home/vidbuilder/apps/vidbuilder/output/

# Should show minimal usage (< 1GB)
```

### Check S3 Usage

```bash
# AWS CLI
aws s3 ls s3://vidbuilder/videos/ --recursive --human-readable --summarize

# Or use AWS Console
# https://s3.console.aws.amazon.com/s3/buckets/vidbuilder
```

---

## 🔒 Security Best Practices

### 1. Strong Passwords

```bash
# Generate secure password
openssl rand -base64 32
```

### 2. Environment Variables

```bash
# Never commit .env to git
echo ".env" >> .gitignore
```

### 3. HTTPS Only

```bash
# Ensure SSL is configured
curl https://backend.vidbuilder.ai/api/health
```

### 4. Rotate Credentials

```bash
# Change password every 90 days
# Update .env
# Restart PM2
# Update all API clients
```

### 5. Monitor Access

```bash
# Check nginx logs for unauthorized attempts
tail -f /var/log/nginx/vidbuilder-access.log | grep 401
```

---

## ❓ FAQ

### Q: Can I disable authentication for development?

**A:** Yes, comment out the `basicAuth` middleware:

```javascript
// In server.js
// app.post('/api/generate-video-async', basicAuth, upload.array(...))
app.post('/api/generate-video-async', upload.array(...))  // No auth
```

**Warning:** Never do this in production!

### Q: What if S3 upload fails?

**A:** Video is kept locally and `videoUrl` is included in response:

```json
{
  "status": "completed",
  "videoUrl": "/api/download/abc123",
  "s3Upload": {
    "enabled": false
  }
}
```

### Q: Can I use API keys instead of Basic Auth?

**A:** Yes, you can implement custom middleware:

```javascript
function apiKeyAuth(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(401).json({ error: 'Invalid API key' });
  }
}

app.post('/api/generate-video-async', apiKeyAuth, ...);
```

### Q: Does the UI work with these changes?

**A:** Yes! The UI at `/advanced-client.html` works without authentication. Only API endpoints require auth.

---

## ✅ Summary

**Authentication:**
- ✅ All API endpoints require Basic Auth
- ✅ Credentials stored in .env
- ✅ UI does not require auth

**Storage:**
- ✅ Videos uploaded to S3
- ✅ Local files deleted after upload
- ✅ Only S3 URLs returned
- ✅ No disk space issues

**Migration:**
- ✅ Update .env with credentials
- ✅ Upload new server files
- ✅ Restart PM2
- ✅ Update API clients

**Security:**
- ✅ Strong passwords
- ✅ HTTPS only
- ✅ Environment variables
- ✅ Regular rotation
