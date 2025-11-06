# 🎬 AI Video Generator - Promotional Video Creator

An advanced backend system that generates high-quality promotional videos for products using Remotion. Simply provide product details and screenshots, and the system creates engaging promotional videos with multiple animated scenes.

## ✨ Features

### Core Features
- **Automated Video Generation**: Create professional promotional videos programmatically
- **Flexible Scene System**: Choose from 9+ different scene templates
- **Two Video Types**: Promotional and Educational content templates
- **Customizable Styling**: Define color schemes, border radius, and visual style
- **JSON Configuration**: Full control via JSON for automation
- **Manual Scene Builder**: Visual interface to build videos scene-by-scene
- **Image Processing**: Automatic resizing and optimization
- **RESTful API**: Easy integration with any frontend application
- **High-Quality Output**: H264 codec with optimized bitrate

### Scene Templates

#### Promotional Scenes
- **Hero Title**: Eye-catching animated titles with subtitles
- **Product Showcase**: Image carousel with smooth transitions
- **Feature List**: Animated bullet points with icons
- **Call-to-Action**: Compelling buttons with urgency messaging

#### Educational Scenes  
- **Lesson Title**: Professional course introductions
- **Step-by-Step**: Tutorial walkthroughs with images
- **Comparison**: Side-by-side before/after views
- **Key Takeaways**: Grid of important points with icons
- **Quiz**: Interactive questions with reveal timing

### Customization Options
- **Color Schemes**: Primary, secondary, accent, text colors
- **Border Radius**: Control rounded corners (0-50px)
- **Scene Duration**: Set individual scene lengths
- **Content Control**: Define text, images, and animations per scene
- **Template Selection**: Pre-built or custom configurations

## 🎨 Video Scenes

1. **Title Scene**: Eye-catching animated title with gradient background
2. **Screenshot Showcase**: Smooth transitions between product images
3. **Features Scene**: Animated bullet points highlighting key product features
4. **CTA Scene**: Compelling call-to-action with pulsing button animation

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- FFmpeg (automatically installed by Remotion)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Environment Variables

Copy the example env file:
```bash
cp .env.example .env
```

### 3. Start the Server

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

### 4. Test the Video Generator

Open `client.html` in your browser to use the test interface, or make API requests directly.

## 📡 API Endpoints

### Generate Video (Legacy)
**POST** `/api/generate-video`

Generate a new promotional video for your product (basic mode).

**Request:**
- `title` (string, required): Product name
- `description` (string, required): Product description (used for feature highlights)
- `duration` (number, optional): Video duration in seconds (10-120, default: 30)
- `screenshots` (files, optional): Product images (max 10 files, 10MB each)

**Response:**
```json
{
  "success": true,
  "jobId": "uuid-here",
  "message": "Video generated successfully",
  "videoUrl": "/api/download/uuid-here",
  "duration": 30,
  "title": "Product Name"
}
```

### Generate Flexible Video (New)
**POST** `/api/generate-flexible-video`

Generate a video with custom scenes and styling.

**Request:**
- `config` (JSON string or object, required): Video configuration
- `images` (files, optional): Images for scenes (max 20 files, 10MB each)

**Configuration Schema:**
```json
{
  "title": "Video Title",
  "type": "promotional" | "educational",
  "colorScheme": {
    "primary": "#667eea",
    "secondary": "#764ba2",
    "accent": "#f093fb",
    "text": "#ffffff",
    "borderRadius": 20
  },
  "scenes": [
    {
      "type": "hero-title",
      "duration": 3,
      "content": {
        "title": "Main Title",
        "subtitle": "Optional Subtitle"
      }
    }
  ]
}
```

### Download Video
**GET** `/api/download/:jobId`

Download a generated video file.

### Check Status
**GET** `/api/status/:jobId`

Check the status of a video generation job.

### List Videos
**GET** `/api/videos`

Get a list of all generated videos.

### Delete Video
**DELETE** `/api/videos/:jobId`

Delete a generated video.

### Health Check
**GET** `/api/health`

Check if the service is running.

## 🎯 Example Usage

### Using cURL

```bash
curl -X POST http://localhost:3000/api/generate-video \
  -F "title=Amazing Product" \
  -F "description=This product will change your life. It has incredible features. Experience the future today." \
  -F "duration=30" \
  -F "screenshots=@/path/to/image1.jpg" \
  -F "screenshots=@/path/to/image2.jpg"
```

### Using JavaScript (Fetch API)

```javascript
const formData = new FormData();
formData.append('title', 'Amazing Product');
formData.append('description', 'Your product description here');
formData.append('duration', '30');
formData.append('screenshots', fileInput.files[0]);

const response = await fetch('http://localhost:3000/api/generate-video', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log('Video URL:', result.videoUrl);
```

### Using the Test Client

**Basic Client:**
1. Open `client.html` in your browser
2. Fill in the product details
3. Upload screenshots (optional)
4. Click "Generate Video"
5. Download the generated video

**Advanced Client:**
1. Open `advanced-client.html` in your browser
2. Choose a template or build custom scenes
3. Customize colors and styling
4. Add images if needed
5. Generate and download the video

## 🛠️ Development

### Remotion Studio

To open Remotion Studio for video preview and development:

```bash
npm run studio
```

This will open a browser window where you can:
- Preview your video compositions
- Test with different props
- Adjust animations in real-time

### Test Render

To test video rendering without the API:

```bash
npm run test-render
```

## 🎨 Customization

### Modify Video Scenes

Edit `src/PromoVideo.tsx` to customize:
- Animation styles and timing
- Color schemes and gradients
- Font styles and sizes
- Transition effects
- Scene durations

### Adjust Video Quality

Edit `remotion.config.ts` to change:
- Video codec settings
- Bitrate and quality (CRF)
- Output format
- Frame rate

### Add New Scenes

1. Create a new scene component in `src/PromoVideo.tsx`
2. Add the scene to the main composition
3. Adjust scene duration calculations

## 📁 Project Structure

```
ai-video-generator/
├── src/
│   ├── PromoVideo.tsx      # Main video composition with scenes
│   ├── Root.tsx             # Remotion root component
│   └── index.tsx            # Entry point for Remotion
├── server.js                # Express backend server
├── client.html              # Test client interface
├── remotion.config.ts       # Remotion configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
└── README.md                # Documentation
```

## 🔧 Configuration

### Video Settings

Default video specifications:
- Resolution: 1920x1080 (Full HD)
- Frame Rate: 30 FPS
- Codec: H264
- Format: MP4
- Bitrate: 8Mbps

### Server Settings

- Default Port: 3000
- Max File Size: 10MB per image
- Max Screenshots: 10 per video
- Supported Image Formats: JPEG, PNG, GIF, WebP

## 🚢 Deployment

### Production Build

```bash
NODE_ENV=production npm start
```

### Docker Deployment

Create a Dockerfile:

```dockerfile
FROM node:18-alpine
RUN apk add --no-cache chromium
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t ai-video-generator .
docker run -p 3000:3000 ai-video-generator
```

## 🐛 Troubleshooting

### Common Issues

1. **FFmpeg not found**: Remotion should install FFmpeg automatically. If not, install manually:
   ```bash
   npm install @ffmpeg-installer/ffmpeg
   ```

2. **Memory issues**: For large videos, increase Node.js memory:
   ```bash
   NODE_OPTIONS="--max-old-space-size=8192" npm start
   ```

3. **Slow rendering**: Reduce video quality in `remotion.config.ts` or decrease duration

## 📝 License

MIT

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using Remotion and Node.js
