# Remotion Chrome Dependencies Fix

## 🔴 Problem

**Error:** `Failed to launch the browser process! libnss3.so: cannot open shared object file`

**Cause:** Remotion uses Chrome headless browser which requires system libraries that aren't installed by default on Ubuntu 24.04.

---

## ✅ Quick Fix (Run on Server)

### Step 1: Upload Fix Script

From your **local machine**:

```bash
cd /Users/amir/cubite/aiVideoGenerator
scp fix-chrome-dependencies.sh root@YOUR_SERVER_IP:~/
```

### Step 2: Run Fix Script

On your **server** (as root):

```bash
ssh root@YOUR_SERVER_IP

# Make executable
chmod +x fix-chrome-dependencies.sh

# Run the fix
./fix-chrome-dependencies.sh
```

### Step 3: Restart Application

```bash
# Switch to vidbuilder user
su - vidbuilder

# Restart PM2
cd ~/apps/vidbuilder
pm2 restart vidbuilder

# Check logs
pm2 logs vidbuilder --lines 50
```

### Step 4: Test Video Generation

```bash
# Test the API
curl -X POST http://localhost:3000/api/generate-flexible-video \
  -H "Content-Type: application/json" \
  -d '{
    "theme": "corporate",
    "music": {"trackId": "corp-1", "volume": 0.3},
    "quality": "1080p",
    "scenes": [
      {
        "type": "hero-title",
        "duration": 4,
        "content": {
          "title": "Test Video",
          "subtitle": "Testing Chrome dependencies"
        }
      }
    ]
  }'
```

---

## 🔧 Manual Fix (Alternative)

If you prefer to install manually:

```bash
# As root
sudo apt-get update

# Install all required libraries
sudo apt-get install -y \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libdbus-1-3 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libcairo2 \
    libasound2 \
    libatspi2.0-0 \
    libxshmfence1 \
    fonts-liberation \
    libappindicator3-1 \
    xdg-utils \
    ca-certificates

# Restart app
su - vidbuilder
pm2 restart vidbuilder
```

---

## 📋 Required Libraries

These are the system libraries Chrome needs:

| Library | Purpose |
|---------|---------|
| `libnss3` | Network Security Services |
| `libgbm1` | Generic Buffer Management |
| `libatk1.0-0` | Accessibility Toolkit |
| `libcups2` | Printing support |
| `libdrm2` | Direct Rendering Manager |
| `libxcomposite1` | X11 Composite extension |
| `libxdamage1` | X11 Damage extension |
| `libxrandr2` | X11 RandR extension |
| `libpango-1.0-0` | Text rendering |
| `libcairo2` | 2D graphics |
| `libasound2` | Audio support |

---

## 🔍 Verify Installation

Check if libraries are installed:

```bash
# Check for libnss3
ldconfig -p | grep libnss3

# Check for libgbm
ldconfig -p | grep libgbm

# List all Chrome-related libraries
dpkg -l | grep -E 'libnss3|libgbm|libatk'
```

---

## 🐛 Troubleshooting

### Error: Still getting "libnss3.so not found"

```bash
# Verify library path
ldconfig -p | grep libnss3

# If not found, reinstall
sudo apt-get install --reinstall libnss3

# Update library cache
sudo ldconfig
```

### Error: "libgbm.so.1 not found"

```bash
# Install libgbm
sudo apt-get install -y libgbm1

# Update cache
sudo ldconfig
```

### Error: "Failed to launch browser" (different library)

```bash
# Check PM2 logs for specific missing library
pm2 logs vidbuilder --lines 100 | grep "cannot open shared object"

# Install the specific library
sudo apt-get install -y <library-name>
```

### Verify Chrome Binary

```bash
# Find Remotion's Chrome binary
find /home/vidbuilder/apps/vidbuilder/node_modules -name "chrome-headless-shell"

# Check dependencies
ldd /path/to/chrome-headless-shell | grep "not found"
```

---

## 📝 For New Deployments

The `setup-server.sh` script has been updated to include these dependencies automatically.

If you're deploying to a **new server**, just run:

```bash
./setup-server.sh
```

It will install:
1. Node.js 24.x
2. PM2, Nginx
3. **Chrome dependencies** ← Now included!
4. Firewall, Fail2Ban
5. SSL tools

---

## ✅ Verification Checklist

After running the fix:

- [ ] All libraries installed: `dpkg -l | grep libnss3`
- [ ] PM2 restarted: `pm2 status`
- [ ] No errors in logs: `pm2 logs vidbuilder --lines 50`
- [ ] Test video generation works
- [ ] Chrome binary can find libraries: `ldd <chrome-path> | grep "not found"` (should be empty)

---

## 🎯 Why This Happens

**Remotion** uses **Chrome headless browser** to render videos. Chrome requires:
- Graphics libraries (Cairo, Pango)
- X11 libraries (even in headless mode)
- Security libraries (NSS)
- Audio libraries (ALSA)

Ubuntu Server doesn't install these by default because it's designed for headless operation without GUI applications.

---

## 🔗 Additional Resources

- **Remotion Troubleshooting:** https://remotion.dev/docs/troubleshooting/browser-launch
- **Chrome Dependencies:** https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix

---

## 🎉 After Fix

Once dependencies are installed:

```bash
# Your video generation should work!
curl -X POST https://backend.vidbuilder.ai/api/generate-flexible-video \
  -H "Content-Type: application/json" \
  -d '{
    "theme": "corporate",
    "music": {"trackId": "corp-1", "volume": 0.3},
    "quality": "4k",
    "scenes": [...]
  }'
```

**Response:**
```json
{
  "success": true,
  "jobId": "abc123",
  "videoUrl": "/api/download/abc123",
  "s3Upload": {
    "enabled": true,
    "standard": {
      "signedUrl": "https://vidbuilder.s3.amazonaws.com/..."
    }
  }
}
```

✅ **Video generation working!**
