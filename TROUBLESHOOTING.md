# Troubleshooting Guide

## Common Issues and Solutions

### 1. Image Loading Error (404 Not Found)

**Error Message:**
```
Failed to load resource: the server responded with a status of 404 (Not Found)
Error loading image with src: http://localhost:3001/Users/amir/...
```

**Cause:**
Remotion runs in a browser environment and cannot access absolute file system paths. It needs HTTP URLs to load images.

**Solution:**
The server now:
1. Serves the `temp` directory as static files via Express
2. Converts file paths to HTTP URLs before passing to Remotion
3. Cleans up temporary files after rendering completes

**What was changed:**
- Added static file serving: `app.use('/temp', express.static(path.join(__dirname, 'temp')))`
- Convert paths to URLs: `http://localhost:${PORT}/temp/${filename}`
- Pass URLs instead of file paths to the Remotion composition

### 2. Port Conflicts

If you see errors about port 3000 being in use:

```bash
# Change the port in your .env file
PORT=3001
```

Or start with a different port:
```bash
PORT=3001 npm start
```

### 3. FFmpeg Not Found

If you get FFmpeg errors:

```bash
# Remotion should install FFmpeg automatically, but if not:
npm install @ffmpeg-installer/ffmpeg
```

### 4. Out of Memory Errors

For large videos or many screenshots:

```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=8192" npm start
```

### 5. Slow Rendering

To speed up rendering:
- Reduce video duration
- Use fewer screenshots
- Lower the CRF value in `remotion.config.ts` (higher = faster but lower quality)
- Reduce resolution in `src/Root.tsx`

### 6. TypeScript/Module Errors

If you see "Cannot find module" errors:

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Debug Mode

To see detailed logs:

```bash
DEBUG=* npm start
```

## Verify Setup

1. Check if server is running:
```bash
curl http://localhost:3000/api/health
```

2. Check if temp directory is accessible:
```bash
# After uploading an image, verify it's accessible
curl http://localhost:3000/temp/processed_<filename>.png
```

3. Test video generation with minimal data:
```bash
curl -X POST http://localhost:3000/api/generate-video \
  -F "title=Test" \
  -F "description=Test description" \
  -F "duration=10"
```

## Getting Help

If issues persist:
1. Check the console logs for detailed error messages
2. Verify all dependencies are installed: `npm list`
3. Ensure Node.js version is 16 or higher: `node --version`
4. Check that all required directories exist: `uploads/`, `output/`, `temp/`
