# 🤖 LLM Video Generation Guide

## Overview
This guide provides complete instructions for Large Language Models (LLMs) to generate professional videos using JSON configurations. Follow these specifications to create engaging promotional and educational videos with proper theming, animations, and content.

---

## 🎨 DaisyUI Theme System

### Available Themes (29 Total)
Select ONE theme for your entire video. The theme controls all colors automatically.

**Light & Professional:**
- `light` - Clean, modern default
- `winter` ❄️ - Cool blue professional
- `corporate` 💼 - Business-focused
- `cupcake` 🧁 - Soft pastels
- `emerald` 💚 - Fresh green
- `bumblebee` 🐝 - Energetic yellow
- `garden` 🌿 - Natural green
- `pastel` 🎨 - Soft multi-color
- `fantasy` 🦄 - Magical purple

**Dark & Bold:**
- `dark` 🌙 - Modern dark
- `night` 🌃 - Deep blue dark
- `dracula` 🧛 - Purple dark
- `synthwave` 🌆 - Retro neon
- `halloween` 🎃 - Orange & purple
- `forest` 🌲 - Deep green
- `coffee` ☕ - Warm brown
- `black` ⚫ - Pure black
- `luxury` 💎 - Premium dark

**Colorful & Creative:**
- `retro` 📻 - Vintage warm
- `cyberpunk` 🤖 - Neon yellow
- `valentine` 💝 - Pink romantic
- `aqua` 🌊 - Ocean blue
- `autumn` 🍂 - Fall colors
- `acid` 🌈 - Vibrant neon
- `lemonade` 🍋 - Fresh citrus
- `cmyk` 🖨️ - Print colors

**Minimal:**
- `lofi` 🎧 - Black & white
- `wireframe` 📐 - Grayscale
- `business` 📊 - Professional blue

### Theme Selection Guidelines
- **Corporate/Business Videos**: `corporate`, `business`, `winter`, `emerald`
- **Creative/Marketing**: `synthwave`, `cyberpunk`, `retro`, `valentine`
- **Educational**: `light`, `cupcake`, `pastel`, `garden`
- **Tech/Modern**: `dark`, `dracula`, `night`, `forest`
- **Minimal/Clean**: `lofi`, `wireframe`, `black`

---

## 📐 Video Configuration Structure

### Basic Template
```json
{
  "title": "Video Title",
  "type": "promotional",
  "theme": "winter",
  "music": {
    "enabled": true,
    "trackId": "upbeat-1",
    "volume": 0.3,
    "fadeIn": 2,
    "fadeOut": 2
  },
  "scenes": [
    // Scene objects here
  ]
}
```

### Required Fields
- `title` (string): Video title for metadata
- `type` (string): `"promotional"` or `"educational"`
- `theme` (string): One of the 29 DaisyUI themes
- `scenes` (array): Array of scene objects (minimum 1)

### Optional Fields
- `music` (object): Background music configuration

---

## 🎵 Music Configuration

### Available Music Tracks

**Corporate/Professional:**
- `corp-1` - Corporate Upbeat (SoundHelix-Song-1)
- `corp-2` - Corporate Calm (SoundHelix-Song-2)

**Upbeat/Energetic:**
- `upbeat-1` - Happy Days (SoundHelix-Song-3)
- `upbeat-2` - Energetic Beat (SoundHelix-Song-4)

**Calm/Ambient:**
- `calm-1` - Peaceful Flow (SoundHelix-Song-5)
- `calm-2` - Gentle Waves (SoundHelix-Song-6)

**Epic/Dramatic:**
- `epic-1` - Epic Journey (SoundHelix-Song-7)
- `epic-2` - Heroic Theme (SoundHelix-Song-8)

**Tech/Modern:**
- `tech-1` - Digital Pulse (SoundHelix-Song-9)
- `tech-2` - Future Sound (SoundHelix-Song-10)

### Music Object Structure
```json
{
  "enabled": true,
  "trackId": "upbeat-1",
  "volume": 0.3,
  "fadeIn": 2,
  "fadeOut": 2
}
```

**Parameters:**
- `enabled` (boolean): Enable/disable music
- `trackId` (string): One of the 10 track IDs above
- `volume` (number): 0.0 to 1.0 (recommended: 0.2-0.4)
- `fadeIn` (number): Fade in duration in seconds
- `fadeOut` (number): Fade out duration in seconds

---

## 🎬 Scene Types & Specifications

### Promotional Scenes (10 Types)

#### 1. Minimal Title Scene
**Type:** `minimal-title`  
**Best For:** Opening titles, announcements  
**Duration:** 2-4 seconds

```json
{
  "type": "minimal-title",
  "duration": 3,
  "content": {
    "superTitle": "INTRODUCING",
    "title": "Amazing Product",
    "subtitle": "Transform Your Experience"
  }
}
```

**Fields:**
- `superTitle` (optional): Small text above title
- `title` (required): Main headline
- `subtitle` (optional): Supporting text

---

#### 2. Split Screen Scene
**Type:** `split-screen`  
**Best For:** Comparisons, before/after  
**Duration:** 4-6 seconds

```json
{
  "type": "split-screen",
  "duration": 5,
  "content": {
    "leftTitle": "Before",
    "leftText": "Old way of doing things",
    "rightTitle": "After",
    "rightText": "New improved method"
  }
}
```

**Fields:**
- `leftTitle` (required): Left side heading
- `leftText` (required): Left side description
- `rightTitle` (required): Right side heading
- `rightText` (required): Right side description

---

#### 3. Stats Dashboard Scene
**Type:** `stats-dashboard`  
**Best For:** Metrics, achievements, numbers  
**Duration:** 5-7 seconds

```json
{
  "type": "stats-dashboard",
  "duration": 6,
  "content": {
    "title": "Our Impact",
    "stats": [
      {"value": 10000, "suffix": "+", "label": "Users"},
      {"value": 99, "suffix": "%", "label": "Satisfaction"},
      {"value": 50, "suffix": "M", "label": "Revenue"}
    ]
  }
}
```

**Fields:**
- `title` (optional): Dashboard heading
- `stats` (required): Array of stat objects
  - `value` (number): The number to display
  - `suffix` (string): Text after number (+, %, M, K, etc.)
  - `label` (string): Description below number

---

#### 4. Testimonial Scene
**Type:** `testimonial`  
**Best For:** Customer quotes, reviews  
**Duration:** 5-8 seconds

```json
{
  "type": "testimonial",
  "duration": 6,
  "content": {
    "quote": "This product changed my business completely!",
    "author": "Jane Smith",
    "role": "CEO, Tech Corp",
    "rating": 5
  }
}
```

**Fields:**
- `quote` (required): The testimonial text
- `author` (required): Person's name
- `role` (optional): Job title/company
- `rating` (optional): 1-5 stars
- `avatar` (optional): Image URL

---

#### 5. Timeline Scene
**Type:** `timeline`  
**Best For:** History, roadmap, process  
**Duration:** 6-10 seconds

```json
{
  "type": "timeline",
  "duration": 8,
  "content": {
    "title": "Our Journey",
    "events": [
      {"date": "2020", "title": "Founded"},
      {"date": "2022", "title": "1M Users"},
      {"date": "2024", "title": "Global Launch"}
    ]
  }
}
```

**Fields:**
- `title` (optional): Timeline heading
- `events` (required): Array of event objects
  - `date` (string): Year or date
  - `title` (string): Event description

---

#### 6. Pricing Cards Scene
**Type:** `pricing-cards`  
**Best For:** Pricing tiers, plans  
**Duration:** 7-10 seconds

```json
{
  "type": "pricing-cards",
  "duration": 8,
  "content": {
    "title": "Choose Your Plan",
    "plans": [
      {
        "name": "Basic",
        "price": "$9",
        "period": "per month",
        "features": ["Feature 1", "Feature 2"],
        "featured": false
      },
      {
        "name": "Pro",
        "price": "$29",
        "period": "per month",
        "badge": "POPULAR",
        "features": ["Everything in Basic", "Feature 3", "Feature 4"],
        "featured": true
      }
    ]
  }
}
```

**Fields:**
- `title` (optional): Pricing section heading
- `plans` (required): Array of plan objects
  - `name` (string): Plan name
  - `price` (string): Price display
  - `period` (string): Billing period
  - `features` (array): List of features
  - `featured` (boolean): Highlight this plan
  - `badge` (optional): Badge text

---

#### 7. Icon Grid Scene
**Type:** `icon-grid`  
**Best For:** Features, benefits, services  
**Duration:** 5-8 seconds

```json
{
  "type": "icon-grid",
  "duration": 6,
  "content": {
    "title": "Key Features",
    "columns": 3,
    "items": [
      {"icon": "⚡", "title": "Fast", "description": "Lightning speed"},
      {"icon": "🔒", "title": "Secure", "description": "Bank-level security"},
      {"icon": "🌐", "title": "Global", "description": "Worldwide access"}
    ]
  }
}
```

**Fields:**
- `title` (optional): Grid heading
- `columns` (number): 2-4 columns
- `items` (required): Array of item objects
  - `icon` (string): Emoji or symbol
  - `title` (string): Feature name
  - `description` (optional): Short description

---

#### 8. Product Matrix Scene
**Type:** `product-matrix`  
**Best For:** Product showcase, gallery  
**Duration:** 6-10 seconds

```json
{
  "type": "product-matrix",
  "duration": 8,
  "content": {
    "title": "Our Products",
    "columns": 3,
    "products": [
      {
        "name": "Product A",
        "description": "Best seller",
        "badge": "NEW"
      }
    ]
  }
}
```

**Fields:**
- `title` (optional): Matrix heading
- `columns` (number): 2-3 columns
- `products` (required): Array of product objects
  - `name` (string): Product name
  - `description` (optional): Short description
  - `badge` (optional): Badge text
  - `image` (optional): Product image URL

---

#### 9. Process Flow Scene
**Type:** `process-flow`  
**Best For:** Step-by-step process  
**Duration:** 6-10 seconds

```json
{
  "type": "process-flow",
  "duration": 8,
  "content": {
    "title": "How It Works",
    "steps": [
      {"number": 1, "title": "Sign Up"},
      {"number": 2, "title": "Configure"},
      {"number": 3, "title": "Launch"}
    ]
  }
}
```

**Fields:**
- `title` (optional): Process heading
- `steps` (required): Array of step objects
  - `number` (number): Step number
  - `title` (string): Step description

---

#### 10. Countdown Scene
**Type:** `countdown`  
**Best For:** Urgency, launches  
**Duration:** 3-5 seconds

```json
{
  "type": "countdown",
  "duration": 4,
  "content": {
    "title": "Launching In",
    "duration": 10,
    "message": "Get Ready!"
  }
}
```

**Fields:**
- `title` (optional): Countdown heading
- `duration` (number): Seconds to count
- `message` (optional): Message after countdown

---

### Educational Scenes (14 Types)

#### 11. Chapter Intro Scene
**Type:** `chapter-intro`  
**Best For:** Section introductions  
**Duration:** 3-5 seconds

```json
{
  "type": "chapter-intro",
  "duration": 4,
  "content": {
    "chapterNumber": "01",
    "title": "Introduction to React",
    "subtitle": "Building Modern UIs"
  }
}
```

---

#### 12. Learning Objectives Scene
**Type:** `learning-objectives`  
**Best For:** Course goals, outcomes  
**Duration**: 6-10 seconds

```json
{
  "type": "learning-objectives",
  "duration": 8,
  "content": {
    "title": "What You'll Learn",
    "objectives": [
      {"icon": "🎯", "text": "Master React hooks"},
      {"icon": "💡", "text": "Build components"},
      {"icon": "🚀", "text": "Deploy apps"}
    ]
  }
}
```

---

#### 13. Concept Explanation Scene
**Type:** `concept-explanation`  
**Best For:** Teaching concepts  
**Duration:** 6-10 seconds

```json
{
  "type": "concept-explanation",
  "duration": 8,
  "content": {
    "title": "What is React?",
    "description": "A JavaScript library for building user interfaces",
    "keyPoints": [
      "Component-based",
      "Declarative",
      "Learn once, write anywhere"
    ]
  }
}
```

---

#### 14. Interactive Quiz Scene
**Type:** `interactive-quiz`  
**Best For:** Knowledge checks  
**Duration:** 8-12 seconds

```json
{
  "type": "interactive-quiz",
  "duration": 10,
  "content": {
    "question": "What is JSX?",
    "options": [
      {"text": "A JavaScript extension", "correct": true},
      {"text": "A CSS framework", "correct": false},
      {"text": "A database", "correct": false}
    ],
    "explanation": "JSX is a syntax extension for JavaScript",
    "revealDelay": 5
  }
}
```

---

#### 15. Code Demo Scene
**Type:** `code-demo`  
**Best For:** Code examples  
**Duration:** 8-12 seconds

```json
{
  "type": "code-demo",
  "duration": 10,
  "content": {
    "title": "useState Hook",
    "code": "const [count, setCount] = useState(0);",
    "output": "Initial count: 0",
    "language": "javascript"
  }
}
```

---

#### 16. Mind Map Scene
**Type:** `mind-map`  
**Best For:** Concept relationships  
**Duration:** 6-10 seconds

```json
{
  "type": "mind-map",
  "duration": 8,
  "content": {
    "central": "React",
    "branches": [
      {"title": "Components", "items": ["Functional", "Class"]},
      {"title": "Hooks", "items": ["useState", "useEffect"]},
      {"title": "Props", "items": ["Data flow", "Validation"]}
    ]
  }
}
```

---

#### 17. Progress Tracker Scene
**Type:** `progress-tracker`  
**Best For:** Course progress  
**Duration:** 4-6 seconds

```json
{
  "type": "progress-tracker",
  "duration": 5,
  "content": {
    "title": "Your Progress",
    "completed": 7,
    "total": 10,
    "percentage": 70
  }
}
```

---

#### 18. Definition Card Scene
**Type:** `definition-card`  
**Best For:** Terminology  
**Duration:** 5-8 seconds

```json
{
  "type": "definition-card",
  "duration": 6,
  "content": {
    "term": "Component",
    "definition": "A reusable piece of UI that manages its own state",
    "example": "<Button onClick={handleClick}>Click me</Button>"
  }
}
```

---

#### 19. Case Study Scene
**Type:** `case-study`  
**Best For:** Real-world examples  
**Duration:** 8-12 seconds

```json
{
  "type": "case-study",
  "duration": 10,
  "content": {
    "title": "Case Study: Facebook",
    "problem": "Complex UI updates",
    "solution": "React's virtual DOM",
    "result": "60% performance improvement"
  }
}
```

---

#### 20. Summary Points Scene
**Type:** `summary-points`  
**Best For:** Key takeaways  
**Duration:** 6-10 seconds

```json
{
  "type": "summary-points",
  "duration": 8,
  "content": {
    "title": "Key Takeaways",
    "points": [
      {"icon": "📌", "text": "React is component-based"},
      {"icon": "📌", "text": "Use hooks for state"},
      {"icon": "📌", "text": "Props pass data down"}
    ]
  }
}
```

---

#### 21. Formula Scene
**Type:** `formula`  
**Best For:** Mathematical concepts  
**Duration:** 6-10 seconds

```json
{
  "type": "formula",
  "duration": 8,
  "content": {
    "title": "Area of Circle",
    "formula": "A = πr²",
    "explanation": "Where r is the radius",
    "example": "r = 5, A = 78.5"
  }
}
```

---

#### 22. Vocabulary Scene
**Type:** `vocabulary`  
**Best For:** Term lists  
**Duration:** 6-10 seconds

```json
{
  "type": "vocabulary",
  "duration": 8,
  "content": {
    "title": "Key Terms",
    "terms": [
      {"word": "Props", "definition": "Data passed to components"},
      {"word": "State", "definition": "Component's internal data"}
    ]
  }
}
```

---

#### 23. Interactive Timeline Scene
**Type:** `interactive-timeline`  
**Best For:** Historical events  
**Duration:** 8-12 seconds

```json
{
  "type": "interactive-timeline",
  "duration": 10,
  "content": {
    "title": "History of React",
    "events": [
      {"year": "2013", "title": "React Released", "description": "Open sourced by Facebook"},
      {"year": "2015", "title": "React Native", "description": "Mobile development"},
      {"year": "2019", "title": "Hooks Released", "description": "Functional components"}
    ]
  }
}
```

---

#### 24. Achievement Badge Scene
**Type:** `achievement-badge`  
**Best For:** Completion, milestones  
**Duration:** 4-6 seconds

```json
{
  "type": "achievement-badge",
  "duration": 5,
  "content": {
    "icon": "🏆",
    "achievement": "Course Complete!",
    "message": "You've mastered React basics"
  }
}
```

---

## 📋 Complete Example: Promotional Video

```json
{
  "title": "Product Launch Video",
  "type": "promotional",
  "theme": "winter",
  "music": {
    "enabled": true,
    "trackId": "upbeat-1",
    "volume": 0.3,
    "fadeIn": 2,
    "fadeOut": 2
  },
  "scenes": [
    {
      "type": "minimal-title",
      "duration": 3,
      "content": {
        "superTitle": "INTRODUCING",
        "title": "NextGen Platform",
        "subtitle": "The Future of Productivity"
      }
    },
    {
      "type": "stats-dashboard",
      "duration": 6,
      "content": {
        "title": "Trusted by Thousands",
        "stats": [
          {"value": 50000, "suffix": "+", "label": "Active Users"},
          {"value": 99, "suffix": "%", "label": "Uptime"},
          {"value": 4, "suffix": ".9★", "label": "Rating"}
        ]
      }
    },
    {
      "type": "icon-grid",
      "duration": 6,
      "content": {
        "title": "Why Choose Us",
        "columns": 3,
        "items": [
          {"icon": "⚡", "title": "Lightning Fast", "description": "Optimized performance"},
          {"icon": "🔒", "title": "Secure", "description": "Enterprise-grade security"},
          {"icon": "🌐", "title": "Global", "description": "Available worldwide"}
        ]
      }
    },
    {
      "type": "testimonial",
      "duration": 6,
      "content": {
        "quote": "This platform transformed our workflow completely!",
        "author": "Sarah Johnson",
        "role": "CTO, Tech Innovations",
        "rating": 5
      }
    },
    {
      "type": "pricing-cards",
      "duration": 8,
      "content": {
        "title": "Simple Pricing",
        "plans": [
          {
            "name": "Starter",
            "price": "$9",
            "period": "per month",
            "features": ["5 Projects", "10GB Storage", "Email Support"],
            "featured": false
          },
          {
            "name": "Professional",
            "price": "$29",
            "period": "per month",
            "badge": "POPULAR",
            "features": ["Unlimited Projects", "100GB Storage", "Priority Support", "Advanced Analytics"],
            "featured": true
          }
        ]
      }
    },
    {
      "type": "countdown",
      "duration": 4,
      "content": {
        "title": "Launch Special Ends In",
        "duration": 10,
        "message": "Don't Miss Out!"
      }
    }
  ]
}
```

**Total Duration:** 33 seconds

---

## 📋 Complete Example: Educational Video

```json
{
  "title": "Introduction to React Course",
  "type": "educational",
  "theme": "light",
  "music": {
    "enabled": true,
    "trackId": "calm-1",
    "volume": 0.2,
    "fadeIn": 2,
    "fadeOut": 2
  },
  "scenes": [
    {
      "type": "chapter-intro",
      "duration": 4,
      "content": {
        "chapterNumber": "01",
        "title": "Getting Started with React",
        "subtitle": "Your First Steps"
      }
    },
    {
      "type": "learning-objectives",
      "duration": 8,
      "content": {
        "title": "What You'll Learn",
        "objectives": [
          {"icon": "🎯", "text": "Understand React fundamentals"},
          {"icon": "💡", "text": "Build your first component"},
          {"icon": "🚀", "text": "Use hooks effectively"},
          {"icon": "🔧", "text": "Manage state and props"}
        ]
      }
    },
    {
      "type": "concept-explanation",
      "duration": 8,
      "content": {
        "title": "What is React?",
        "description": "React is a JavaScript library for building user interfaces, developed by Facebook",
        "keyPoints": [
          "Component-based architecture",
          "Declarative programming",
          "Virtual DOM for performance",
          "Reusable UI components"
        ]
      }
    },
    {
      "type": "code-demo",
      "duration": 10,
      "content": {
        "title": "Your First Component",
        "code": "function Welcome() {\n  return <h1>Hello, React!</h1>;\n}",
        "output": "Renders: Hello, React!",
        "language": "javascript"
      }
    },
    {
      "type": "interactive-quiz",
      "duration": 10,
      "content": {
        "question": "What does JSX stand for?",
        "options": [
          {"text": "JavaScript XML", "correct": true},
          {"text": "Java Syntax Extension", "correct": false},
          {"text": "JSON XML", "correct": false},
          {"text": "JavaScript Extension", "correct": false}
        ],
        "explanation": "JSX stands for JavaScript XML. It's a syntax extension that lets you write HTML-like code in JavaScript.",
        "revealDelay": 5
      }
    },
    {
      "type": "summary-points",
      "duration": 8,
      "content": {
        "title": "Key Takeaways",
        "points": [
          {"icon": "📌", "text": "React uses components to build UIs"},
          {"icon": "📌", "text": "JSX makes writing components easier"},
          {"icon": "📌", "text": "Components can be reused"},
          {"icon": "📌", "text": "React is declarative and efficient"}
        ]
      }
    },
    {
      "type": "achievement-badge",
      "duration": 5,
      "content": {
        "icon": "🏆",
        "achievement": "Chapter 1 Complete!",
        "message": "You've learned React basics"
      }
    }
  ]
}
```

**Total Duration:** 53 seconds

---

## ✅ Best Practices for LLMs

### 1. **Scene Duration Guidelines**
- **Title scenes**: 2-4 seconds
- **Content scenes**: 5-8 seconds
- **Complex scenes** (quiz, code): 8-12 seconds
- **Total video**: 20-90 seconds recommended

### 2. **Scene Flow**
- Start with intro/title scene
- Build narrative progressively
- End with call-to-action or summary
- Vary scene types for engagement

### 3. **Theme Selection**
- Match theme to video purpose
- Consider target audience
- Ensure readability (light text on dark, vice versa)

### 4. **Music Selection**
- **Promotional**: upbeat, epic, or tech tracks
- **Educational**: calm or corporate tracks
- Keep volume low (0.2-0.4) to not overpower narration

### 5. **Content Guidelines**
- Keep text concise (max 10-15 words per line)
- Use emojis sparingly for visual interest
- Ensure all required fields are provided
- Test with different themes for accessibility

### 6. **Common Mistakes to Avoid**
- ❌ Missing required fields
- ❌ Invalid theme names
- ❌ Scenes too short (< 2 seconds)
- ❌ Too much text in one scene
- ❌ Inconsistent content structure

---

## 🔧 API Endpoint

**POST** `/api/generate-flexible-video`

**Content-Type:** `application/json`

**Request Body:**
```json
{
  "config": {
    // Your video configuration JSON here
  }
}
```

**Response:**
```json
{
  "success": true,
  "videoPath": "/output/video-abc123.mp4",
  "duration": 33,
  "message": "Video generated successfully"
}
```

---

## 📊 Validation Checklist

Before generating, verify:
- [ ] Valid theme name from the 29 available
- [ ] At least 1 scene defined
- [ ] All required scene fields present
- [ ] Scene durations are reasonable (2-12 seconds)
- [ ] Music trackId is valid (if music enabled)
- [ ] Total video duration is appropriate
- [ ] Text content is concise and clear
- [ ] JSON is properly formatted

---

## 🎓 Quick Start for LLMs

1. **Choose video type**: promotional or educational
2. **Select theme**: Pick from 29 DaisyUI themes
3. **Add music** (optional): Choose appropriate track
4. **Build scenes**: Select 3-8 scene types
5. **Fill content**: Provide all required fields
6. **Validate JSON**: Ensure proper structure
7. **Generate**: Send to API endpoint

---

## 💡 Example Prompts for LLMs

**"Create a 30-second promotional video for a SaaS product"**
→ Use `winter` theme, `upbeat-1` music, include: minimal-title, stats-dashboard, icon-grid, testimonial, pricing-cards

**"Generate an educational video about Python basics"**
→ Use `light` theme, `calm-1` music, include: chapter-intro, learning-objectives, concept-explanation, code-demo, quiz, summary-points

**"Make a product launch countdown video"**
→ Use `synthwave` theme, `epic-1` music, include: minimal-title, stats-dashboard, countdown

---

## 📞 Support

For issues or questions:
- Check JSON syntax
- Verify all required fields
- Ensure theme name is valid
- Confirm scene types are correct
- Review duration values

---

**Remember:** All colors are controlled by the theme. No custom colors needed. Follow DESIGN.md principles: solid colors only, no gradients, system fonts, accessibility first!
