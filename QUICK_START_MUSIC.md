# Quick Start - Music System

## 🚀 Start the Server

**IMPORTANT**: The music dropdown will show "Loading tracks..." until the server is running!

```bash
cd /Users/amir/cubite/aiVideoGenerator
node server.js
```

You should see:
```
Server running on http://localhost:3000
```

## 🎵 Using Music in UI

1. **Open** `http://localhost:3000/advanced-client.html` in browser
2. **Check** "Enable Background Music" checkbox
3. **Select** a track from dropdown (auto-populated from `src/tracks/`)
4. **Preview** - Click ▶️ to listen before generating
5. **Adjust** volume slider (0-100%, default 30%)
6. **Generate** - Music is automatically included!

## 📝 Using Music in JSON

The JSON editor automatically updates when you change music settings. Or manually add:

```json
{
  "title": "My Video",
  "type": "promotional",
  "theme": "corporate",
  "music": {
    "enabled": true,
    "trackId": "track-1",
    "volume": 0.3,
    "fadeIn": 2,
    "fadeOut": 2
  },
  "scenes": [...]
}
```

### Track IDs
- `track-1` = First track alphabetically
- `track-2` = Second track alphabetically
- etc.

To see available track IDs, check browser console after page loads or visit:
```
http://localhost:3000/api/music-tracks
```

## ✅ How It Works

### 1. **Server Side** (server.js)
- `/api/music-tracks` - Lists all MP3 files from `src/tracks/`
- `/tracks/[filename]` - Serves MP3 files
- Video generation resolves `trackId` to local file URL

### 2. **Client Side** (advanced-client.js)
- `loadMusicTracks()` - Fetches tracks on page load
- Populates dropdown dynamically
- Updates JSON editor when music changes
- Preview player uses actual track URLs

### 3. **Video Generation**
- Music config is sent with video request
- Server resolves track ID to local file path
- Remotion downloads and includes in video
- Fade-in/fade-out applied automatically

## 🔧 Troubleshooting

### "Loading tracks..." stuck?
**Problem**: Server not running  
**Solution**: Run `node server.js` in terminal

### "⚠️ Server not running"?
**Problem**: Can't connect to http://localhost:3000  
**Solution**: 
1. Check if server is running
2. Check if port 3000 is available
3. Look for errors in server terminal

### "No tracks found"?
**Problem**: No MP3 files in `src/tracks/`  
**Solution**: Add MP3 files to `/Users/amir/cubite/aiVideoGenerator/src/tracks/`

### Music not in video?
**Problem**: Music checkbox not enabled  
**Solution**: Check "Enable Background Music" before generating

### Preview not working?
**Problem**: Browser can't play MP3  
**Solution**: Check browser console for errors, ensure MP3 files are valid

## 📊 Current Tracks

You have **16 tracks** in `src/tracks/`:
1. Background Music
2. Brain Implant Cyberpunk Sci-Fi Trailer
3. Cyberpunk Futuristic Background
4. Cyberpunk Futuristic City Music (2 versions)
5. Cyberpunk Metaverse Event
6. Deep Abstract Ambient Snowcap
7. Eona Emotional Ambient Pop
8. Experimental Cinematic Hip Hop
9. Future Design
10. Futuristic Motivation Synthwave
11. Gardens Stylish Chill
12. Rap Beat
13. Running Night
14. Scary Horror Tension

## 🎯 Example JSON with Music

```json
{
  "title": "Cyberpunk Product Launch",
  "type": "promotional",
  "theme": "night",
  "music": {
    "enabled": true,
    "trackId": "track-3",
    "volume": 0.25,
    "fadeIn": 2,
    "fadeOut": 3
  },
  "scenes": [
    {
      "type": "hero-title",
      "duration": 5,
      "content": {
        "title": "Welcome to the **Future**",
        "subtitle": "Next-gen technology"
      }
    }
  ]
}
```

## 💡 Pro Tips

1. **Lower volume** for voice-overs (0.2-0.3)
2. **Higher volume** for music-only videos (0.5-0.7)
3. **Preview first** - Ensure track matches video mood
4. **Fade times** - Longer fades (3-4s) for calm music, shorter (1-2s) for energetic
5. **Track order** - Files are sorted alphabetically, rename to control order

## 🔄 Adding New Music

```bash
# Add new track
cp ~/Downloads/new-track.mp3 src/tracks/

# Refresh browser - new track appears automatically!
```

No code changes needed! 🎉
