# 🤖 LLM Video Generation Guide

## Overview
This guide provides complete instructions to generate professional videos using JSON configurations. Follow these specifications to create engaging videos with proper theming, animations, and content.

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
- `vidbuilder` 🎬 - Netflix-inspired red & dark

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
- **Tech/Modern**: `dark`, `dracula`, `night`, `forest`, `vidbuilder`
- **Minimal/Clean**: `lofi`, `wireframe`, `black`
- **Entertainment/Media**: `vidbuilder`, `dracula`, `synthwave`

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

**DURATION_LIMITS:**
- Scene: 3–12s
- Typical: 4–7s
- Total video: 20–90s (platform-dependent)

**DURATION_FORMULA:**
- Title:    2s + 0.3s × WORD_COUNT
- Subtitle: 2s + 0.4s × WORD_COUNT
- Lists:    1.5s × ITEM_COUNT
- Stats:    1.5s × STAT_COUNT

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


### Total Video Duration Targets

**VIDEO_LENGTH_TARGETS:**
- Social (Reels/TikTok): 15–30s (3–6 scenes)
- Product demo:          30–60s (5–10 scenes)
- Educational:           45–90s (6–12 scenes)
- Brand story:           60–120s (8–15 scenes)
- Scenes per video:      5–8 recommended

---

## 🎨 Text Color Formatting

Hero-title scene support **markdown-style color formatting** to highlight specific words:

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



