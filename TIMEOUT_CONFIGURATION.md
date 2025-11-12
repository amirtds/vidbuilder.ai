# Timeout Configuration for Long Video Generation

## 🎯 Current Timeout Limits

For videos that can take **10-15 minutes** to generate, here are all the timeout layers:

---

## 📊 Timeout Layers Overview

| Layer | Current Timeout | Recommended for 15min Videos | Status |
|-------|----------------|------------------------------|--------|
| **Nginx (general)** | 600s (10 min) | 1200s (20 min) | ⚠️ Need to increase |
| **Nginx (video endpoint)** | 900s (15 min) | 1200s (20 min) | ⚠️ Need to increase |
| **PM2 kill timeout** | 5s | 30s | ⚠️ Need to increase |
| **PM2 listen timeout** | 10s | 30s | ✅ OK |
| **Node.js (no default)** | None | None | ✅ OK |
| **Client timeout** | User-defined | 1200s (20 min) | ⚠️ User must set |

---

## 🔧 Layer 1: Nginx Timeouts

### Current Configuration

**File:** `/etc/nginx/sites-available/vidbuilder`

```nginx
# Global timeouts (applies to all locations)
proxy_connect_timeout 600s;  # 10 minutes
proxy_send_timeout 600s;     # 10 minutes
proxy_read_timeout 600s;     # 10 minutes
send_timeout 600s;           # 10 minutes

# Video generation endpoint (specific)
location /api/generate-flexible-video {
    proxy_connect_timeout 900s;  # 15 minutes
    proxy_send_timeout 900s;     # 15 minutes
    proxy_read_timeout 900s;     # 15 minutes
}
```

### ⚠️ Problem

- **Global timeout:** 10 minutes (too short)
- **Video endpoint:** 15 minutes (barely enough)
- **Risk:** Nginx will kill the connection if video takes longer than 15 minutes

### ✅ Recommended Configuration

```nginx
# Global timeouts - increase to 20 minutes
proxy_connect_timeout 1200s;  # 20 minutes
proxy_send_timeout 1200s;     # 20 minutes
proxy_read_timeout 1200s;     # 20 minutes
send_timeout 1200s;           # 20 minutes

# Video generation endpoint - increase to 30 minutes for safety
location /api/generate-flexible-video {
    proxy_connect_timeout 1800s;  # 30 minutes
    proxy_send_timeout 1800s;     # 30 minutes
    proxy_read_timeout 1800s;     # 30 minutes
}
```

---

## 🔧 Layer 2: PM2 Timeouts

### Current Configuration

**File:** `ecosystem.config.js`

```javascript
{
  kill_timeout: 5000,      // 5 seconds
  wait_ready: true,
  listen_timeout: 10000    // 10 seconds
}
```

### ⚠️ Problem

- `kill_timeout: 5000` (5 seconds) - Too short for graceful shutdown during video generation
- If PM2 restarts/reloads during video generation, it will forcefully kill the process after 5 seconds

### ✅ Recommended Configuration

```javascript
{
  kill_timeout: 30000,     // 30 seconds - allow graceful shutdown
  wait_ready: true,
  listen_timeout: 30000    // 30 seconds
}
```

---

## 🔧 Layer 3: Node.js/Express

### Current Status

✅ **No timeout by default** - Node.js/Express doesn't have a built-in request timeout.

The server will wait indefinitely for the video generation to complete.

### Optional: Add Server Timeout

If you want to add a safety timeout at the Node.js level:

```javascript
// In server.js
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Set server timeout to 30 minutes
server.timeout = 1800000; // 30 minutes in milliseconds
server.keepAliveTimeout = 1800000;
server.headersTimeout = 1800000;
```

---

## 🔧 Layer 4: Client Timeouts

### Current Status

⚠️ **User must configure** - Clients need to set appropriate timeouts.

### Examples

**cURL:**
```bash
curl -X POST https://backend.vidbuilder.ai/api/generate-flexible-video \
  --max-time 1200 \  # 20 minutes timeout
  -H "Content-Type: application/json" \
  -d '{...}'
```

**JavaScript/Fetch:**
```javascript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 1200000); // 20 min

try {
  const response = await fetch('https://backend.vidbuilder.ai/api/generate-flexible-video', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(config),
    signal: controller.signal
  });
  
  clearTimeout(timeoutId);
  const result = await response.json();
} catch (error) {
  if (error.name === 'AbortError') {
    console.error('Request timeout - video generation taking too long');
  }
}
```

**Python:**
```python
import requests

response = requests.post(
    'https://backend.vidbuilder.ai/api/generate-flexible-video',
    json=config,
    timeout=1200  # 20 minutes
)
```

---

## 🚀 Quick Fix: Update Timeouts Now

### Step 1: Update Nginx Configuration

```bash
# SSH to server as root
ssh root@YOUR_SERVER_IP

# Edit nginx config
nano /etc/nginx/sites-available/vidbuilder
```

**Find and update these lines:**

```nginx
# Around line 67-71 (global timeouts)
proxy_connect_timeout 1200s;
proxy_send_timeout 1200s;
proxy_read_timeout 1200s;
send_timeout 1200s;

# Around line 119-121 (video endpoint)
proxy_connect_timeout 1800s;
proxy_send_timeout 1800s;
proxy_read_timeout 1800s;
```

**Test and reload:**
```bash
nginx -t
systemctl reload nginx
```

### Step 2: Update PM2 Configuration

```bash
# Switch to vidbuilder user
su - vidbuilder
cd ~/apps/vidbuilder

# Edit ecosystem config
nano ecosystem.config.js
```

**Update these values:**

```javascript
kill_timeout: 30000,      // Change from 5000
listen_timeout: 30000     // Change from 10000
```

**Restart PM2:**
```bash
pm2 reload ecosystem.config.js --env production
pm2 save
```

### Step 3: Update Client Timeout

Update your API client to use at least 20-minute timeout (see examples above).

---

## 📊 Recommended Timeout Values

For videos that take **10-15 minutes**:

| Component | Recommended Timeout | Reason |
|-----------|-------------------|---------|
| **Nginx global** | 1200s (20 min) | 5 min buffer |
| **Nginx video endpoint** | 1800s (30 min) | 15 min buffer |
| **PM2 kill timeout** | 30000ms (30 sec) | Graceful shutdown |
| **Client timeout** | 1200s (20 min) | Match nginx |
| **Node.js server** | 1800s (30 min) | Optional safety net |

---

## ⚠️ Timeout Symptoms

### Symptom 1: 504 Gateway Timeout

**Error:** `504 Gateway Timeout`

**Cause:** Nginx timeout reached before video completed.

**Solution:** Increase nginx timeouts (see Step 1 above).

### Symptom 2: Connection Reset

**Error:** `Connection reset by peer` or `ECONNRESET`

**Cause:** PM2 killed the process during video generation.

**Solution:** Increase PM2 `kill_timeout` (see Step 2 above).

### Symptom 3: Client Timeout

**Error:** `Request timeout` or `AbortError`

**Cause:** Client-side timeout reached.

**Solution:** Increase client timeout to at least 20 minutes.

---

## 🔍 Monitoring Timeouts

### Check Nginx Logs

```bash
# Look for timeout errors
tail -f /var/log/nginx/vidbuilder-error.log | grep timeout

# Common timeout errors:
# - "upstream timed out"
# - "client timed out"
```

### Check PM2 Logs

```bash
# Look for forced kills
pm2 logs vidbuilder | grep -i "kill\|timeout\|sigterm"
```

### Check Video Generation Time

```bash
# Add logging in server.js
console.log('Video generation started:', new Date());
// ... video generation ...
console.log('Video generation completed:', new Date());
console.log('Duration:', (endTime - startTime) / 1000, 'seconds');
```

---

## 📈 Performance Optimization

If videos consistently take 10-15 minutes, consider:

1. **Lower quality preset** - Use `1080p` instead of `4k`
2. **Reduce scene count** - Fewer scenes = faster rendering
3. **Optimize images** - Compress images before upload
4. **Increase server resources** - More CPU cores = faster rendering
5. **Use PM2 cluster mode** - Already enabled in ecosystem.config.js

---

## 🎯 Testing Long Videos

Test with a long video configuration:

```bash
curl -X POST https://backend.vidbuilder.ai/api/generate-flexible-video \
  --max-time 1200 \
  -H "Content-Type: application/json" \
  -d '{
    "theme": "corporate",
    "music": {"trackId": "corp-1", "volume": 0.3},
    "quality": "4k",
    "scenes": [
      {"type": "hero-title", "duration": 10, "content": {...}},
      {"type": "feature-list", "duration": 15, "content": {...}},
      {"type": "stats-dashboard", "duration": 10, "content": {...}},
      {"type": "product-showcase", "duration": 20, "content": {...}},
      {"type": "testimonial", "duration": 15, "content": {...}},
      {"type": "pricing-cards", "duration": 15, "content": {...}},
      {"type": "timeline", "duration": 15, "content": {...}},
      {"type": "cta", "duration": 10, "content": {...}}
    ]
  }'
```

**Total duration:** 110 seconds (~2 minutes of video)  
**Generation time:** ~10-15 minutes for 4K quality

---

## ✅ Summary

**Current Issues:**
- ⚠️ Nginx timeout: 15 minutes (too short)
- ⚠️ PM2 kill timeout: 5 seconds (too short)
- ⚠️ Client timeout: User must configure

**Required Actions:**
1. ✅ Increase Nginx timeouts to 20-30 minutes
2. ✅ Increase PM2 kill timeout to 30 seconds
3. ✅ Set client timeout to 20+ minutes
4. ✅ Optional: Add Node.js server timeout

**After fixes:**
- Videos up to 15 minutes generation time will work
- 5-15 minute buffer for safety
- Graceful shutdown during restarts
