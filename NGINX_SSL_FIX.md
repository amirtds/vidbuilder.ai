# Nginx SSL Configuration Fix

## Problem
You're getting this error:
```
nginx: [emerg] no "ssl_certificate" is defined for the "listen ... ssl" directive
nginx: configuration file /etc/nginx/nginx.conf test failed
```

**Cause:** The `nginx.conf` file has SSL configuration (HTTPS) but the SSL certificates don't exist yet. Certbot needs to run first to create the certificates.

---

## ✅ Solution: Use Pre-SSL Config

### Step 1: Remove Current Config

```bash
# Remove the broken config
rm /etc/nginx/sites-enabled/vidbuilder
```

### Step 2: Upload Pre-SSL Config

From your **local machine**:

```bash
cd /Users/amir/cubite/aiVideoGenerator

# Upload the pre-SSL config
scp nginx-pre-ssl.conf root@YOUR_SERVER_IP:~/
```

### Step 3: Install Pre-SSL Config

On your **server** (as root):

```bash
# Copy the pre-SSL config
cp ~/nginx-pre-ssl.conf /etc/nginx/sites-available/vidbuilder

# Verify it's correct
grep server_name /etc/nginx/sites-available/vidbuilder
# Should show: server_name backend.vidbuilder.ai;

# Enable the site
ln -s /etc/nginx/sites-available/vidbuilder /etc/nginx/sites-enabled/

# Test configuration (should pass now!)
nginx -t

# Reload Nginx
systemctl reload nginx
```

### Step 4: Verify HTTP Works

```bash
# Test from server
curl http://localhost:3000/api/health
curl http://backend.vidbuilder.ai/api/health

# Both should return: {"status":"ok"}
```

### Step 5: Now Run Certbot

```bash
# Get SSL certificate
certbot --nginx -d backend.vidbuilder.ai

# Follow prompts:
# 1. Enter email address
# 2. Agree to terms (Y)
# 3. Share email? (N)
# 4. Redirect HTTP to HTTPS? (2 - Yes)
```

**What Certbot does:**
- ✅ Validates domain ownership
- ✅ Creates SSL certificates
- ✅ Automatically updates nginx config with SSL
- ✅ Sets up auto-renewal

### Step 6: Verify HTTPS Works

```bash
# Test HTTPS
curl https://backend.vidbuilder.ai/api/health

# Check certificate
certbot certificates

# Test auto-renewal
certbot renew --dry-run
```

---

## 🎯 Summary

**Before Certbot:** Use `nginx-pre-ssl.conf` (HTTP only)  
**After Certbot:** Certbot automatically adds SSL configuration

**Files:**
- `nginx-pre-ssl.conf` - Use BEFORE getting SSL certificate (HTTP only)
- `nginx.conf` - Reference for full SSL config (Certbot will create similar)

---

## ✅ Verification Checklist

After following the steps above:

- [ ] `nginx -t` shows "test is successful"
- [ ] `systemctl status nginx` shows "active (running)"
- [ ] `curl http://backend.vidbuilder.ai/api/health` works
- [ ] Certbot completed successfully
- [ ] `curl https://backend.vidbuilder.ai/api/health` works
- [ ] HTTP redirects to HTTPS
- [ ] Certificate auto-renewal configured

---

## 🔧 If You Still Have Issues

### Issue: Domain not resolving
```bash
# Check DNS
dig backend.vidbuilder.ai

# Should show your server IP in the answer section
```

### Issue: Port 80 blocked
```bash
# Check firewall
ufw status

# Should show:
# 80/tcp ALLOW Anywhere
# 443/tcp ALLOW Anywhere
```

### Issue: App not responding
```bash
# Check PM2
su - vidbuilder
pm2 status
pm2 logs vidbuilder

# Should show app is "online"
```

### Issue: Certbot fails
```bash
# Make sure domain points to server
dig backend.vidbuilder.ai

# Make sure nginx is serving HTTP
curl http://backend.vidbuilder.ai/api/health

# Check nginx error logs
tail -f /var/log/nginx/vidbuilder-error.log
```

---

## 📝 What Changed in Deployment Docs

Updated files to include `nginx-pre-ssl.conf`:
- ✅ `DEPLOYMENT_GUIDE.md` - Step 4 now uses pre-SSL config
- ✅ `DEPLOYMENT_CHECKLIST.md` - Step 6 now uses pre-SSL config
- ✅ Upload commands now include `nginx-pre-ssl.conf`

**New workflow:**
1. Upload both `nginx-pre-ssl.conf` and `nginx.conf`
2. Use `nginx-pre-ssl.conf` initially (HTTP only)
3. Run Certbot (creates certificates and updates config)
4. HTTPS now works automatically

---

## 🎉 You're All Set!

Once you complete these steps:
- ✅ Nginx will be running with HTTP
- ✅ Certbot will add SSL automatically
- ✅ Your app will be accessible via HTTPS
- ✅ HTTP will redirect to HTTPS

**Continue with the deployment checklist from Step 7!**
