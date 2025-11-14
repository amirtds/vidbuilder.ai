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
    "trackId": "cyberpunk-futuristic-city-music-323171",
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

### Available Music Tracks (16 Total)

Use the **filename without .mp3 extension** as the trackId value.

**🎹 Ambient/Atmospheric:**
- `deep-abstract-ambient_snowcap-401656` - Peaceful, meditative ambient (educational, calm videos)
- `eona-emotional-ambient-pop-351436` - Emotional, atmospheric pop (storytelling, reflective content)
- `gardens-stylish-chill-303261` - Stylish chill vibes (modern, lifestyle, fashion)

**🤖 Cyberpunk/Tech:**
- `cyberpunk-futuristic-background-349787` - Futuristic cyberpunk background (tech products, modern SaaS)
- `cyberpunk-futuristic-city-music-323171` - Dynamic city soundscape (urban tech, innovation)
- `cyberpunk-futuristic-city-music-390972` - Alternative futuristic track (sci-fi, technology)
- `cyberpunk-metaverse-event-background-music-286971` - Metaverse event energy (web3, crypto, digital)
- `brain-implant-cyberpunk-sci-fi-trailer-action-intro-330416` - Intense sci-fi action (dramatic tech reveals)

**🎬 Cinematic/Epic:**
- `experimental-cinematic-hip-hop-315904` - Bold cinematic hip-hop (modern brands, edgy content)

**🎧 Electronic/Modern:**
- `future-design-344320` - Clean future design sounds (UI/UX, design tools, creative software)
- `futuristic-motivation-synthwave-431078` - Motivational synthwave (inspirational, achievement)
- `running-night-393139` - Energetic night running (fitness, sports, action)

**🎵 Upbeat/Energy:**
- `background-music-2-424599` - General upbeat background (versatile, positive vibes)
- `rap-beat-beats-music-416039` - Modern rap beat (youth, street culture, hip brands)

**🎃 Dark/Tension:**
- `scary-horror-tension-433607` - Horror tension (Halloween, thriller, dramatic reveals)

### Music Object Structure
```json
{
  "enabled": true,
  "trackId": "cyberpunk-futuristic-city-music-323171",
  "volume": 0.3,
  "fadeIn": 2,
  "fadeOut": 3
}
```

**Parameters:**
- `enabled` (boolean): Enable/disable music
- `trackId` (string): Filename without .mp3 (see list above)
- `volume` (number): 0.0 to 1.0 (recommended: 0.2-0.4)
- `fadeIn` (number): Fade in duration in seconds (default: 2)
  - Music gradually increases from silence to full volume
  - Creates a smooth, professional start
- `fadeOut` (number): Fade out duration in seconds (default: 3)
  - Music gradually decreases to silence at video end
  - **Critical for preventing abrupt music cuts**
  - Ensures viewers know the video is ending naturally

### Music Selection Guide

**📊 Corporate/Business Videos:**
- `deep-abstract-ambient_snowcap-401656` (calm professional)
- `future-design-344320` (modern design)
- `gardens-stylish-chill-303261` (stylish professional)

**🚀 Tech/SaaS/Startup:**
- `cyberpunk-futuristic-background-349787` (modern tech)
- `cyberpunk-futuristic-city-music-323171` (dynamic innovation)
- `futuristic-motivation-synthwave-431078` (motivational tech)

**🎓 Educational/Tutorial:**
- `deep-abstract-ambient_snowcap-401656` (focused learning)
- `eona-emotional-ambient-pop-351436` (engaging storytelling)
- `background-music-2-424599` (light, non-distracting)

**💪 Motivational/Fitness:**
- `futuristic-motivation-synthwave-431078` (achievement)
- `running-night-393139` (energy, action)
- `experimental-cinematic-hip-hop-315904` (bold, powerful)

**🎨 Creative/Lifestyle:**
- `gardens-stylish-chill-303261` (stylish, modern)
- `eona-emotional-ambient-pop-351436` (emotional connection)
- `future-design-344320` (design-focused)

**🌆 Web3/Crypto/Metaverse:**
- `cyberpunk-metaverse-event-background-music-286971` (digital future)
- `cyberpunk-futuristic-city-music-390972` (blockchain, NFT)

**Why Fade-Out Matters:**
Without fade-out, music cuts abruptly when the video ends, confusing viewers who hear the music "just getting started." The fade-out effect signals that the video is concluding, creating a professional, polished finish.

---

## ⏱️ Scene Duration Guidelines (CRITICAL)

### Duration Calculation Rules

Proper scene duration is **critical** for production-ready videos. Too short = unreadable, too long = boring.

**Reading Speed Formula:**
```
Base Duration + Content Duration = Total Scene Duration
```

**Text Reading Speeds:**
- **Title/Headline**: 2 seconds base + (word count × 0.3 seconds)
- **Subtitle/Description**: 2 seconds base + (word count × 0.4 seconds)
- **List Items**: 1.5 seconds per item
- **Stats/Numbers**: 1.5 seconds per stat (viewers need time to process numbers)

**Duration Constraints:**
- **Minimum**: 3 seconds (even for very short text)
- **Maximum**: 12 seconds (avoid viewer fatigue)
- **Optimal**: 4-7 seconds for most scenes

**Calculation Examples:**

1. **Hero Title: "Launch Your Product Today"**
   - Title: 4 words → 2 + (4 × 0.3) = 3.2s
   - No subtitle
   - **Result: 4 seconds** (rounded up to minimum comfortable)

2. **Hero Title with Subtitle:**
   - Title: "Transform your business with AI" (5 words) → 2 + (5 × 0.3) = 3.5s
   - Subtitle: "Automate workflows and boost productivity" (5 words) → 2 + (5 × 0.4) = 4s
   - **Result: 3.5 + 4 = 7.5s → round to 8 seconds**

3. **Stats Dashboard with 3 Stats:**
   - Title: "Our Impact" (2 words) → 2 + (2 × 0.3) = 2.6s
   - 3 stats → 3 × 1.5 = 4.5s
   - **Result: 2.6 + 4.5 = 7.1s → round to 7 seconds**

4. **Icon Grid with 6 Items:**
   - Title: "Key Features" (2 words) → 2.6s
   - 6 items with short descriptions → 6 × 1.5 = 9s
   - **Result: 2.6 + 9 = 11.6s → round to 12 seconds**

---

### Scene Type Duration Guidelines

Use these ranges as starting points, then adjust based on content:

**⚡ Quick Scenes (7-8 seconds):**
- `hero-title` - Short, punchy headlines (< 8 words)
- `minimal-title` - Simple announcements
- `countdown` - Visual countdown effect
- `achievement-badge` - Completion celebration
- `brand-watermark` - Logo + company name

**📊 Medium Scenes (9-12 seconds):**
- `hero-title` - With subtitle or longer text
- `stats-dashboard` - 3-4 statistics
- `icon-grid` - 3-4 features
- `testimonial` - Short quote (< 20 words)
- `split-screen` - Before/after comparison
- `chapter-intro` - Section introduction
- `definition-card` - Term + definition

**📚 Long Scenes (12-15 seconds):**
- `pricing-cards` - Multiple pricing tiers
- `interactive-quiz` - Question + options + reveal time
- `code-demo` - Code snippet + explanation
- `timeline` - 4+ events
- `icon-grid` - 6+ features
- `learning-objectives` - 4+ objectives
- `concept-explanation` - Detailed explanation
- `process-flow` - Multi-step process

---

### Common Duration Mistakes ⚠️

**❌ TOO SHORT - Unreadable:**

```json
{
  "type": "hero-title",
  "duration": 2,  // ❌ TOO SHORT!
  "content": {
    "title": "Transform your business with our revolutionary AI-powered platform",
    "subtitle": "Boost productivity by 300% and reduce costs"
  }
}
```
**Problem:** 15+ words in 2 seconds = impossible to read

**✅ CORRECT:**
```json
{
  "type": "hero-title",
  "duration": 6,  // ✅ Proper duration
  "content": {
    "title": "Transform your business with our revolutionary AI-powered platform",
    "subtitle": "Boost productivity by 300% and reduce costs"
  }
}
```
**Calculation:** Title (8 words × 0.3 = 2.4s) + Subtitle (7 words × 0.4 = 2.8s) + 1s buffer = 6.2s → **6 seconds**

---

**❌ TOO SHORT - Stats Dashboard:**

```json
{
  "type": "stats-dashboard",
  "duration": 3,  // ❌ TOO SHORT!
  "content": {
    "title": "Our Impact",
    "stats": [
      {"value": 50000, "suffix": "+", "label": "Active Users"},
      {"value": 99, "suffix": "%", "label": "Satisfaction"},
      {"value": 150, "suffix": "M", "label": "Revenue"}
    ]
  }
}
```
**Problem:** Viewers need time to read and process numbers

**✅ CORRECT:**
```json
{
  "type": "stats-dashboard",
  "duration": 7,  // ✅ Proper duration
  "content": {
    "title": "Our Impact",
    "stats": [
      {"value": 50000, "suffix": "+", "label": "Active Users"},
      {"value": 99, "suffix": "%", "label": "Satisfaction"},
      {"value": 150, "suffix": "M", "label": "Revenue"}
    ]
  }
}
```
**Calculation:** Title (2 words × 0.3 = 0.6s) + 3 stats (3 × 1.5 = 4.5s) + 2s buffer = **7 seconds**

---

**❌ TOO LONG - Simple Title:**

```json
{
  "type": "minimal-title",
  "duration": 10,  // ❌ TOO LONG!
  "content": {
    "title": "Welcome"
  }
}
```
**Problem:** 1 word doesn't need 10 seconds - viewers get bored

**✅ CORRECT:**
```json
{
  "type": "minimal-title",
  "duration": 3,  // ✅ Proper duration
  "content": {
    "title": "Welcome"
  }
}
```
**Calculation:** 1 word = minimum 3 seconds

---

### Quick Duration Reference Table

| Content Type | Words/Items | Recommended Duration |
|--------------|-------------|---------------------|
| Short title (1-3 words) | 1-3 | 3-4 seconds |
| Medium title (4-8 words) | 4-8 | 4-5 seconds |
| Long title (9-15 words) | 9-15 | 5-6 seconds |
| Title + short subtitle | 5 + 5 | 6-7 seconds |
| Title + long subtitle | 8 + 8 | 8-9 seconds |
| 3 stats/numbers | 3 items | 6-7 seconds |
| 4-6 list items | 4-6 items | 8-10 seconds |
| Quiz (question + 4 options) | - | 10-12 seconds |
| Code snippet | - | 10-12 seconds |

---

### Total Video Duration Targets

**By Platform:**
- **Social Media (Instagram/TikTok/Reels)**: 15-30 seconds (3-6 scenes)
- **Product Demo**: 30-60 seconds (5-10 scenes)
- **Educational Tutorial**: 45-90 seconds (6-12 scenes)
- **Brand Story**: 60-120 seconds (8-15 scenes)

**Rule of Thumb:** Aim for 5-8 scenes per video for optimal engagement.

---

## 🎨 Text Color Formatting

All text fields support **markdown-style color formatting** to highlight specific words:

### Formatting Syntax

- `**text**` → Applies **primary color** (theme's primary)
- `***text***` → Applies **secondary color** (theme's secondary)
- `****text****` → Applies **accent color** (theme's accent)

### Examples

```json
{
  "title": "Turn your **Airbnb listings** into a ***direct booking*** website"
}
```

**Result:** "Airbnb listings" in primary color, "direct booking" in secondary color

```json
{
  "subtitle": "Boost revenue with **zero platform fees** and ****premium features****"
}
```

**Result:** "zero platform fees" in primary, "premium features" in accent

### Best Practices

✅ **Do:**
- Highlight 1-3 key phrases per text block
- Use primary color for main emphasis
- Use secondary for supporting emphasis
- Keep formatting consistent across scenes

❌ **Don't:**
- Over-format (max 30% of text)
- Mix too many colors in one sentence
- Format entire sentences

---

## ✍️ Content Writing Guidelines (CRITICAL)

### Text Length Limits

**Per Scene Type:**

| Scene Type | Title Max | Subtitle Max | Description Max |
|------------|-----------|--------------|-----------------|
| `hero-title` | 12 words | 15 words | - |
| `minimal-title` | 5 words | 10 words | - |
| `stats-dashboard` | 5 words | - | 3 words per label |
| `testimonial` | - | - | 25 words (quote) |
| `icon-grid` | 5 words | - | 8 words per item |
| `pricing-cards` | 5 words | - | 5 words per feature |
| `concept-explanation` | 8 words | - | 30 words (description) |
| `code-demo` | 8 words | - | 5 lines of code max |

**General Rules:**
- **Titles**: 3-12 words (shorter = more impact)
- **Subtitles**: 5-15 words
- **Descriptions**: 15-30 words
- **List items**: 3-8 words each
- **Quotes**: 15-25 words

---

### Writing Style & Tone

**✅ DO - Action-Oriented & Benefit-Focused:**

```json
❌ "Our platform provides comprehensive solutions"
✅ "**Boost revenue** by ***30%*** in 60 days"

❌ "We have many features for businesses"
✅ "**Automate workflows** and ***save 10 hours*** weekly"

❌ "Advanced AI technology for data processing"
✅ "Turn **raw data** into ***actionable insights*** instantly"
```

**Power Words to Use:**
- **Action**: Launch, Transform, Boost, Accelerate, Unlock, Maximize
- **Benefit**: Save, Earn, Grow, Increase, Reduce, Eliminate
- **Emotion**: Revolutionary, Powerful, Simple, Effortless, Proven
- **Urgency**: Today, Now, Instantly, Immediately, Fast

**Words to Avoid:**
- ❌ Jargon: "Leverage synergies", "Paradigm shift"
- ❌ Vague: "Comprehensive", "Solutions", "Innovative"
- ❌ Passive: "Can be used", "Is designed to"
- ❌ Weak: "Try to", "Might help", "Possibly"

---

### Content Structure by Scene Type

**Hero Title - Hook Formula:**
```
[Action Verb] + [Benefit] + [Timeframe/Ease]

Examples:
✅ "**Launch** your product in ***24 hours***"
✅ "**Double** your revenue with ****zero effort****"
✅ "**Transform** meetings into ***action items*** automatically"
```

**Stats Dashboard - Impact Formula:**
```
[Big Number] + [Metric] + [Context]

Examples:
✅ {"value": 10000, "suffix": "+", "label": "Happy Customers"}
✅ {"value": 99, "suffix": "%", "label": "Uptime SLA"}
✅ {"value": 5, "suffix": "M", "label": "Saved Annually"}
```

**Testimonial - Credibility Formula:**
```
[Specific Result] + [Emotional Impact] + [Timeframe]

Examples:
✅ "We **increased sales by 150%** in just 3 months. Game changer!"
✅ "Cut our costs by **$50K annually**. Couldn't be happier!"
```

**Icon Grid - Feature Formula:**
```
[Benefit-Focused Title] + [How It Helps]

Examples:
✅ {"icon": "⚡", "title": "Lightning Fast", "description": "Load in under 1 second"}
✅ {"icon": "🔒", "title": "Bank-Level Security", "description": "256-bit encryption"}
```

---

### Call-to-Action (CTA) Best Practices

**Strong CTAs:**
```json
✅ "Start Free Trial"
✅ "Get Started Now"
✅ "Claim Your Discount"
✅ "Book a Demo"
✅ "Join 10,000+ Users"
```

**Weak CTAs:**
```json
❌ "Click Here"
❌ "Learn More"
❌ "Submit"
❌ "Continue"
```

**CTA with Urgency:**
```json
{
  "type": "countdown",
  "content": {
    "title": "Limited Offer Ends In",
    "duration": 10,
    "message": "Claim **50% Off** Now!"
  }
}
```

---

### Consistency Rules

**Within Same Video:**

1. **Emoji Style** - Pick one and stick to it:
   ```json
   ✅ All colorful: 🚀 💡 ⚡ 🎯
   ✅ All simple: → • ✓ ×
   ❌ Mixed: 🚀 • ⚡ ×  // Inconsistent!
   ```

2. **Number Format** - Be consistent:
   ```json
   ✅ All with suffixes: "10K", "5M", "99%"
   ✅ All full numbers: "10,000", "5,000,000", "99%"
   ❌ Mixed: "10K", "5,000,000", "99%"  // Inconsistent!
   ```

3. **Capitalization** - Pick one style:
   ```json
   ✅ Title Case: "Transform Your Business"
   ✅ Sentence case: "Transform your business"
   ❌ Mixed: "Transform Your business"  // Inconsistent!
   ```

4. **Color Formatting** - Use same emphasis pattern:
   ```json
   ✅ Primary for main benefit, secondary for supporting:
   - "**Boost revenue** by ***30%***"
   - "**Save time** with ***automation***"
   
   ❌ Random formatting:
   - "**Boost** revenue by 30%"
   - "Save ***time*** with automation"
   ```

---

## 🎬 Scene Types & Specifications

### Brand/Utility Scenes (1 Type)

#### Brand Watermark Scene
**Type:** `brand-watermark`  
**Best For:** Video opening, brand intro, company identity  
**Duration:** 3-5 seconds (flexible - animations adapt automatically)  
**Note:** ⚠️ **Music should NOT start during this scene** - Typing sound plays

```json
{
  "type": "brand-watermark",
  "duration": 3,
  "content": {
    "logo": "https://example.com/logo.png",
    "companyName": "ShortRentals AI",
    "tagline": "Direct Booking Made Simple"
  }
}
```

**Fields:**
- `logo` (optional): Logo image URL (use high-quality PNG)
- `companyName` (required): Company/brand name (displays in **primary color**)
- `tagline` (optional): Short tagline or slogan
- `logoSize` (optional): Logo size in px (default: 300)
- `fontSize` (optional): Company name size (default: 64)
- `taglineSize` (optional): Tagline font size (default: 28)

**Dynamic Animation Timeline:**
- **First 25%:** Logo appears in CENTER with elegant fade and scale
- **25-40%:** Logo smoothly moves up
- **40-85%:** Company name types in (adapts to available time)
- **85-100%:** Tagline fades in (if present)

**Key Features:**
- ✅ **Dynamic timing** - Animations adapt to any duration (3-10 seconds)
- ✅ **Center logo** - Appears elegantly in center (no balloon effect)
- ✅ **Typing sound** - Plays during company name typing
- ✅ **Primary color** - Company name uses theme's primary color
- ✅ **Flexible** - Works perfectly with 3s, 4s, or 5s duration

**Audio:**
- Typing sound effect (plays during company name typing)
- No background music (music starts in next scene)

**Best Practices:**
- Use high-quality, transparent PNG logo
- Keep company name short (2-4 words)
- Tagline should be brief (4-6 words max)
- Place at start of video before hero-title

---

### Promotional Scenes (11 Types)

#### 1. Hero Title Scene (Professional)
**Type:** `hero-title`  
**Best For:** Bold opening statements, product launches, hero moments  
**Duration:** 4-6 seconds  
**Design:** Apple/Nike inspired cinematic style

```json
{
  "type": "hero-title",
  "duration": 5,
  "content": {
    "title": "Turn your **Airbnb listings** into a ***direct booking*** website",
    "subtitle": "Hosts using Direct Booking Sites keep up to **18% more revenue**",
    "fontSize": 120,
    "fontWeight": 900,
    "subtitleSize": 44,
    "subtitleWeight": 500,
    "letterSpacing": -3.5,
    "lineHeight": 1.05
  }
}
```

**Fields:**
- `title` (required): Main headline (supports color formatting, auto line-breaks)
- `subtitle` (optional): Supporting text (supports color formatting)
- `fontSize` (optional): Title size in px (default: 120, auto-scales for 4K/1080p)
- `fontWeight` (optional): Title weight (default: 900 - extra black)
- `subtitleSize` (optional): Subtitle size in px (default: 44)
- `subtitleWeight` (optional): Subtitle weight (default: 500 - medium)
- `letterSpacing` (optional): Title letter spacing (default: -3.5px - very tight)
- `lineHeight` (optional): Title line height (default: 1.05 - compact)

**Professional Animations:**
- **Typewriter effect** - Text types in character by character
- **Delayed subtitle** - Starts after title finishes typing
- **Smooth fade-in** - Quick, subtle entrance
- **Dynamic timing** - Automatically adapts to scene duration
  - With subtitle: Title uses 50% of time, subtitle uses remaining 50%
  - Without subtitle: Title uses 85% of time
- **Flexible duration** - Works with 3-10 seconds (animations adapt)

**Typography Excellence:**
- **Extra large, bold headlines** (120px default, responsive)
- **Very tight letter spacing** (-3.5px) for modern, premium look
- **Ultra-heavy font weight** (900) for maximum impact
- **Compact line height** (1.05) for powerful presence
- **Auto line-breaking** for long titles
- **Anti-aliased rendering** for crisp text
- **Responsive sizing** (auto-adjusts for 4K/1080p/720p)

---

#### 2. Minimal Title Scene
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

## ✅ Best Practices for LLMs

### 1. **Scene Duration Guidelines**
- **Title scenes**: 2-4 seconds
- **Content scenes**: 5-8 seconds
- **Complex scenes** (quiz, code): 8-12 seconds
- **Total video**: 20-90 seconds recommended

### 2. **Scene Flow & Narrative Structure** (CRITICAL)

**Proven Video Structures:**

**🎯 Promotional Video Structure (AIDA Model):**
```
1. Attention (Hook) → hero-title or brand-watermark
2. Interest (Problem) → split-screen or testimonial
3. Desire (Solution) → icon-grid or stats-dashboard
4. Action (CTA) → pricing-cards or countdown
```

**Example 30s Promotional:**
```json
[
  {"type": "hero-title", "duration": 4},      // Hook: "**Launch** in ***24 hours***"
  {"type": "split-screen", "duration": 5},    // Problem: Before vs After
  {"type": "icon-grid", "duration": 6},       // Solution: 3 key features
  {"type": "stats-dashboard", "duration": 6}, // Proof: Numbers & results
  {"type": "testimonial", "duration": 5},     // Social proof
  {"type": "pricing-cards", "duration": 8}    // Offer & CTA
]
// Total: 34 seconds
```

**📚 Educational Video Structure:**
```
1. Introduction → chapter-intro
2. Learning Goals → learning-objectives
3. Core Content → concept-explanation or code-demo
4. Practice → interactive-quiz
5. Summary → summary-points
6. Achievement → achievement-badge
```

**Example 60s Educational:**
```json
[
  {"type": "chapter-intro", "duration": 4},
  {"type": "learning-objectives", "duration": 8},
  {"type": "concept-explanation", "duration": 10},
  {"type": "code-demo", "duration": 12},
  {"type": "interactive-quiz", "duration": 12},
  {"type": "summary-points", "duration": 8},
  {"type": "achievement-badge", "duration": 5}
]
// Total: 59 seconds
```

**🚀 Product Launch Structure:**
```
1. Brand intro → brand-watermark
2. Big announcement → hero-title
3. Key features → icon-grid
4. Social proof → stats-dashboard + testimonial
5. Urgency → countdown
6. Offer → pricing-cards
```

**Scene Sequencing Rules:**

✅ **DO:**
- Start strong with hook (hero-title or brand-watermark)
- Show problem BEFORE solution
- Provide proof AFTER claims (stats after features)
- End with clear CTA
- Build momentum (short → medium → long scenes)

❌ **DON'T:**
- Start with pricing (show value first)
- Put testimonial before showing product
- End without CTA
- Use same scene type twice in a row
- Make first scene longer than 5 seconds

**Transition Logic:**

Good flow examples:
```
hero-title → stats-dashboard ✅ (claim → proof)
icon-grid → testimonial ✅ (features → validation)
split-screen → pricing-cards ✅ (problem/solution → offer)
```

Bad flow examples:
```
pricing-cards → icon-grid ❌ (offer before value)
testimonial → hero-title ❌ (proof before claim)
stats-dashboard → stats-dashboard ❌ (repetitive)
```

### 3. **Theme Selection Decision Tree** (IMPORTANT)

**Decision Flowchart:**

```
START → What's the video type?
│
├─ Tech/SaaS Product?
│  ├─ Modern/Edgy → cyberpunk, synthwave, dracula
│  ├─ Professional → corporate, winter, business
│  └─ Creative → retro, acid, cmyk
│
├─ Corporate/Business?
│  ├─ Conservative → corporate, business, winter
│  ├─ Modern → emerald, garden, aqua
│  └─ Luxury → luxury, black, dark
│
├─ Educational/Tutorial?
│  ├─ Friendly → light, cupcake, pastel
│  ├─ Professional → corporate, winter, garden
│  └─ Tech-focused → dark, dracula, forest
│
├─ Creative/Marketing?
│  ├─ Bold → synthwave, cyberpunk, halloween
│  ├─ Elegant → valentine, fantasy, autumn
│  └─ Vintage → retro, coffee, lofi
│
└─ E-commerce/Product?
   ├─ Fashion → valentine, pastel, fantasy
   ├─ Tech → cyberpunk, dark, night
   └─ Food → autumn, bumblebee, garden
```

**Industry-Specific Recommendations:**

| Industry | Primary Themes | Avoid |
|----------|---------------|-------|
| **SaaS/Software** | cyberpunk, winter, corporate, dark | halloween, valentine, cupcake |
| **Finance/Banking** | corporate, business, luxury, winter | synthwave, halloween, acid |
| **Healthcare** | light, emerald, garden, aqua | halloween, dracula, black |
| **Education** | light, cupcake, pastel, garden | halloween, luxury, black |
| **E-commerce** | retro, valentine, autumn, bumblebee | dracula, halloween, black |
| **Real Estate** | luxury, emerald, garden, autumn | cyberpunk, synthwave, acid |
| **Fitness/Sports** | dark, synthwave, forest, night | cupcake, pastel, valentine |
| **Food/Restaurant** | autumn, bumblebee, garden, retro | dracula, halloween, black |
| **Fashion/Beauty** | valentine, fantasy, pastel, luxury | halloween, forest, coffee |
| **Web3/Crypto** | cyberpunk, synthwave, acid, night | cupcake, pastel, garden |

**Mood/Tone Matching:**

**Professional & Trustworthy:**
→ `corporate`, `business`, `winter`, `emerald`

**Modern & Innovative:**
→ `cyberpunk`, `synthwave`, `dark`, `night`

**Friendly & Approachable:**
→ `light`, `cupcake`, `pastel`, `garden`

**Bold & Energetic:**
→ `synthwave`, `acid`, `bumblebee`, `halloween`

**Elegant & Premium:**
→ `luxury`, `black`, `valentine`, `fantasy`

**Minimal & Clean:**
→ `lofi`, `wireframe`, `light`, `business`

**Quick Selection Guide:**

```
IF audience = "developers" → dark, dracula, cyberpunk
IF audience = "executives" → corporate, business, luxury
IF audience = "students" → light, cupcake, garden
IF audience = "consumers" → retro, valentine, pastel
IF audience = "investors" → corporate, winter, business
```

**Readability Check:**
- ✅ Light themes: Use for detailed text, educational content
- ✅ Dark themes: Use for bold statements, tech products
- ⚠️ Ensure contrast: Test with long text scenes

### 4. **Music Selection**
- **Promotional**: Use cyberpunk/tech tracks for modern feel
- **Educational**: Use ambient/chill tracks for focus
- **Corporate**: Use stylish/design tracks for professionalism
- Keep volume low (0.2-0.4) to not overpower narration
- Use **trackId** with filename (without .mp3)

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
- [ ] Music trackId is valid filename without .mp3 (if music enabled)
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
→ Use `winter` theme, `cyberpunk-futuristic-city-music-323171` music, include: hero-title, stats-dashboard, icon-grid, testimonial, pricing-cards

**"Generate an educational video about Python basics"**
→ Use `light` theme, `deep-abstract-ambient_snowcap-401656` music, include: chapter-intro, learning-objectives, concept-explanation, code-demo, quiz, summary-points

**"Make a product launch countdown video"**
→ Use `synthwave` theme, `futuristic-motivation-synthwave-431078` music, include: hero-title, stats-dashboard, countdown

---

## 📞 Support

For issues or questions:
- Check JSON syntax
- Verify all required fields
- Ensure theme name is valid
- Confirm scene types are correct
- Review duration values

---

## ✅ Production-Ready Video Checklist

Before generating, verify ALL of these:

### **1. Duration Calculations** ⏱️
- [ ] Calculated duration for each scene based on word count
- [ ] Used formula: Base (2s) + (words × 0.3-0.4s)
- [ ] Minimum 3 seconds per scene
- [ ] Maximum 12 seconds per scene
- [ ] Total video duration matches platform target

### **2. Content Quality** ✍️
- [ ] Titles are 3-12 words (concise)
- [ ] Used action verbs and power words
- [ ] Benefit-focused, not feature-focused
- [ ] No jargon or vague language
- [ ] Strong CTA at the end
- [ ] Consistent emoji style throughout
- [ ] Consistent number formatting
- [ ] Consistent capitalization

### **3. Scene Flow** 🎬
- [ ] Starts with strong hook (hero-title or brand-watermark)
- [ ] Follows proven structure (AIDA for promo, Intro→Content→Summary for edu)
- [ ] Problem shown BEFORE solution
- [ ] Proof shown AFTER claims
- [ ] No duplicate scene types in a row
- [ ] Ends with clear CTA
- [ ] Total 5-8 scenes for optimal engagement

### **4. Theme Selection** 🎨
- [ ] Theme matches industry/audience
- [ ] Theme matches mood/tone
- [ ] Readability verified (light vs dark)
- [ ] Consistent with brand (if applicable)

### **5. Music Configuration** 🎵
- [ ] Music enabled: true
- [ ] trackId uses filename (without .mp3)
- [ ] Volume set to 0.2-0.4
- [ ] fadeIn: 2 seconds
- [ ] fadeOut: 2-3 seconds (CRITICAL)
- [ ] Music matches video type (tech/ambient/etc)

### **6. Technical Validation** 🔧
- [ ] Valid JSON syntax
- [ ] All required fields present
- [ ] Theme name is valid (one of 29)
- [ ] All scene types are valid
- [ ] No missing content fields
- [ ] Color formatting used correctly (**text**, ***text***)

### **7. Brand Consistency** 🎯
- [ ] Same emoji style across all scenes
- [ ] Same color formatting pattern
- [ ] Same capitalization style
- [ ] Same number format (K/M or full numbers)
- [ ] Consistent tone of voice

---

## 🎯 Quick Production Workflow

**Step 1: Understand Requirements**
- Video type (promo/educational)
- Target audience
- Platform (social/web/presentation)
- Key message

**Step 2: Select Foundation**
- Choose theme (use decision tree)
- Choose music (match video type)
- Decide video structure (AIDA/Educational)

**Step 3: Plan Scenes**
- List 5-8 scenes following structure
- Calculate duration for each scene
- Ensure total matches target (15-90s)

**Step 4: Write Content**
- Use formulas (Hook/Impact/Credibility)
- Keep text concise (word limits)
- Use power words and benefits
- Add color formatting strategically

**Step 5: Validate**
- Run through checklist above
- Verify JSON syntax
- Check all durations
- Confirm consistency

**Step 6: Generate**
- Send to API endpoint
- Review output
- Iterate if needed

---

**Remember:** All colors are controlled by the theme. No custom colors needed. Follow DESIGN.md principles: solid colors only, no gradients, system fonts, accessibility first!
