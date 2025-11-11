# Music Library - Local Tracks

## Overview
The video generator now uses **your local music tracks** from the `src/tracks` folder. All music is dynamically loaded and available for preview before video generation.

## Current Tracks (16 files)

1. **Background Music** - background-music-2-424599.mp3
2. **Brain Implant Cyberpunk Sci Fi Trailer Action Intro** - brain-implant-cyberpunk-sci-fi-trailer-action-intro-330416.mp3
3. **Cyberpunk Futuristic Background** - cyberpunk-futuristic-background-349787.mp3
4. **Cyberpunk Futuristic City Music** - cyberpunk-futuristic-city-music-323171.mp3
5. **Cyberpunk Futuristic City Music** - cyberpunk-futuristic-city-music-390972.mp3
6. **Cyberpunk Metaverse Event Background Music** - cyberpunk-metaverse-event-background-music-286971.mp3
7. **Deep Abstract Ambient Snowcap** - deep-abstract-ambient_snowcap-401656.mp3
8. **Eona Emotional Ambient Pop** - eona-emotional-ambient-pop-351436.mp3
9. **Experimental Cinematic Hip Hop** - experimental-cinematic-hip-hop-315904.mp3
10. **Future Design** - future-design-344320.mp3
11. **Futuristic Motivation Synthwave** - futuristic-motivation-synthwave-431078.mp3
12. **Gardens Stylish Chill** - gardens-stylish-chill-303261.mp3
13. **Rap Beat Beats Music** - rap-beat-beats-music-416039.mp3
14. **Running Night** - running-night-393139.mp3
15. **Scary Horror Tension** - scary-horror-tension-433607.mp3

## How It Works

### 1. **Server-Side**
- `/api/music-tracks` endpoint dynamically reads MP3 files from `src/tracks/`
- Cleans up filenames to create display names
- Serves tracks via `/tracks/[filename]` route
- Assigns unique IDs (`track-1`, `track-2`, etc.)

### 2. **Client-Side**
- `advanced-client.js` loads tracks on page load via `loadMusicTracks()`
- Populates dropdown with track names
- Shows total count: "(16 tracks available)"
- Music preview player uses actual track URLs

### 3. **Video Generation**
- When music is enabled, server resolves `trackId` to local file URL
- Remotion downloads and uses the track in video
- Supports fade-in/fade-out (default: 2s fade-in, 3s fade-out)

## Adding New Music

Simply add MP3 files to `/src/tracks/` folder:

```bash
# Add your music file
cp your-new-track.mp3 /Users/amir/cubite/aiVideoGenerator/src/tracks/

# Restart server (tracks are loaded dynamically)
# Refresh browser - new track appears automatically!
```

## Usage in UI

1. **Enable Music** - Check "Enable Background Music"
2. **Select Track** - Choose from dropdown (shows cleaned-up names)
3. **Preview** - Click ▶️ Preview to listen before generating
4. **Adjust Volume** - Use slider (0-100%, default 30%)
5. **Generate** - Track is automatically included in video

## Track ID Format

- `track-1` → First file alphabetically
- `track-2` → Second file alphabetically
- etc.

IDs are assigned based on alphabetical order of filenames.

## File Requirements

- **Format**: MP3 only
- **Location**: `/src/tracks/` folder
- **Naming**: Any valid filename (cleaned automatically for display)
- **Size**: No limit (but keep reasonable for download speed)

## API Endpoints

### GET `/api/music-tracks`
Returns list of available tracks:
```json
{
  "tracks": [
    {
      "id": "track-1",
      "name": "Background Music",
      "filename": "background-music-2-424599.mp3",
      "url": "/tracks/background-music-2-424599.mp3"
    },
    ...
  ]
}
```

### GET `/tracks/[filename]`
Serves the actual MP3 file for streaming/download.

## Benefits

✅ **Full Control** - Use your own curated music  
✅ **No External Dependencies** - No API keys or CDN issues  
✅ **Instant Preview** - Listen before applying  
✅ **Dynamic Loading** - Add tracks without code changes  
✅ **Clean Names** - Filenames auto-formatted for display  
✅ **Local Files** - Fast, reliable, no 404 errors  

## License & Copyright

⚠️ **Important**: Ensure you have proper rights/licenses for all music files in the `src/tracks` folder. This system does not validate copyright - that's your responsibility!
