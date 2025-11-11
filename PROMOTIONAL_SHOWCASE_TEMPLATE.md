# 🎬 Complete Promotional Showcase Template

## Overview

This template demonstrates **ALL promotional scene types** in a single comprehensive video. Perfect for:
- ✅ Testing all promotional scenes together
- ✅ Seeing how scenes flow and transition
- ✅ Learning what each scene type offers
- ✅ Creating a complete product launch video
- ✅ Showcasing your video generator capabilities

**File:** `examples/promotional-showcase-all-scenes.json`

---

## 📋 Template Structure

### Total Duration: ~75 seconds (1 minute 15 seconds)

The template includes **15 scenes** covering all promotional scene types:

1. **Brand Watermark** (3s) - Company intro
2. **Hero Title** (5s) - Main headline with typing effect
3. **Minimal Title** (4s) - Clean Apple-style title
4. **Product Showcase** (6s) - Product images with captions
5. **Feature List** (6s) - Key features with icons
6. **Split Screen** (5s) - Before/After comparison
7. **Stats Dashboard** (5s) - Key metrics and numbers
8. **Testimonial** (5s) - Customer review
9. **Timeline** (6s) - Company journey/milestones
10. **Pricing Cards** (6s) - Pricing tiers
11. **Icon Grid** (5s) - Feature icons grid
12. **Product Matrix** (5s) - Feature comparison table
13. **Process Flow** (6s) - Step-by-step process
14. **Countdown** (4s) - Limited time offer timer
15. **CTA** (4s) - Final call-to-action

---

## 🎨 Scene Breakdown

### 1. Brand Watermark (3 seconds)
```json
{
  "type": "brand-watermark",
  "duration": 3,
  "content": {
    "logo": "https://via.placeholder.com/300x300/4b6bfb/ffffff?text=LOGO",
    "companyName": "Your Brand",
    "tagline": "Innovation Simplified"
  }
}
```

**Purpose:** Professional brand introduction  
**Features:** Logo fade-in, company name typing, tagline  
**Best for:** Video opening, brand identity

---

### 2. Hero Title (5 seconds)
```json
{
  "type": "hero-title",
  "duration": 5,
  "content": {
    "title": "Transform Your **Business** with ***Innovation***",
    "subtitle": "Join ****10,000+**** successful companies"
  }
}
```

**Purpose:** Main headline with color formatting  
**Features:** Typing effect, markdown color syntax, bold typography  
**Best for:** Main value proposition, key message

---

### 3. Minimal Title (4 seconds)
```json
{
  "type": "minimal-title",
  "duration": 4,
  "content": {
    "title": "Simple. Powerful. Effective.",
    "subtitle": "Everything you need, nothing you don't"
  }
}
```

**Purpose:** Clean Apple-style title  
**Features:** Minimalist design, smooth animations  
**Best for:** Brand positioning, simple messages

---

### 4. Product Showcase (6 seconds)
```json
{
  "type": "product-showcase",
  "duration": 6,
  "content": {
    "title": "See It In Action",
    "images": [
      "https://via.placeholder.com/1200x800/4b6bfb/ffffff?text=Product+View+1",
      "https://via.placeholder.com/1200x800/667eea/ffffff?text=Product+View+2",
      "https://via.placeholder.com/1200x800/764ba2/ffffff?text=Product+View+3"
    ],
    "captions": [
      "Beautiful, intuitive interface",
      "Powerful features at your fingertips",
      "Works seamlessly across all devices"
    ],
    "fitMode": "contain"
  }
}
```

**Purpose:** Show product visuals  
**Features:** Image cycling (2s each), captions, smooth transitions  
**Best for:** Product demos, UI showcases, visual features

---

### 5. Feature List (6 seconds)
```json
{
  "type": "feature-list",
  "duration": 6,
  "content": {
    "title": "Key Features",
    "features": [
      {
        "icon": "⚡",
        "title": "Lightning Fast",
        "text": "Blazing fast performance that scales with your needs"
      },
      // ... 3 more features
    ]
  }
}
```

**Purpose:** Highlight key features  
**Features:** Icon circles, staggered animations, clean cards  
**Best for:** Feature highlights, benefits, capabilities

---

### 6. Split Screen (5 seconds)
```json
{
  "type": "split-screen",
  "duration": 5,
  "content": {
    "leftTitle": "Before",
    "leftText": "Manual processes, wasted time, frustrated teams",
    "rightTitle": "After",
    "rightText": "Automated workflows, increased productivity, happy teams",
    "leftImage": "https://via.placeholder.com/600x800/e74c3c/ffffff?text=Before",
    "rightImage": "https://via.placeholder.com/600x800/2ecc71/ffffff?text=After"
  }
}
```

**Purpose:** Before/After comparison  
**Features:** Side-by-side layout, contrasting visuals  
**Best for:** Problem/solution, comparisons, transformations

---

### 7. Stats Dashboard (5 seconds)
```json
{
  "type": "stats-dashboard",
  "duration": 5,
  "content": {
    "title": "Trusted by Industry Leaders",
    "stats": [
      {
        "value": "10,000+",
        "label": "Active Users",
        "icon": "👥"
      },
      // ... 3 more stats
    ]
  }
}
```

**Purpose:** Show key metrics  
**Features:** Animated numbers, icon badges, grid layout  
**Best for:** Social proof, achievements, metrics

---

### 8. Testimonial (5 seconds)
```json
{
  "type": "testimonial",
  "duration": 5,
  "content": {
    "quote": "This product completely transformed how we work...",
    "author": "Sarah Johnson",
    "role": "CEO, TechCorp",
    "avatar": "https://via.placeholder.com/150/4b6bfb/ffffff?text=SJ",
    "rating": 5
  }
}
```

**Purpose:** Customer testimonial  
**Features:** Quote display, author info, star rating  
**Best for:** Social proof, credibility, trust building

---

### 9. Timeline (6 seconds)
```json
{
  "type": "timeline",
  "duration": 6,
  "content": {
    "title": "Our Journey",
    "events": [
      {
        "year": "2020",
        "title": "Founded",
        "description": "Started with a vision..."
      },
      // ... 3 more events
    ]
  }
}
```

**Purpose:** Show company history/milestones  
**Features:** Chronological display, milestone cards  
**Best for:** Company story, product evolution, roadmap

---

### 10. Pricing Cards (6 seconds)
```json
{
  "type": "pricing-cards",
  "duration": 6,
  "content": {
    "title": "Choose Your Plan",
    "plans": [
      {
        "name": "Starter",
        "price": "$29",
        "period": "/month",
        "features": ["Up to 10 users", "5GB storage", ...],
        "highlighted": false
      },
      // ... 2 more plans
    ]
  }
}
```

**Purpose:** Display pricing tiers  
**Features:** Card layout, highlighted plan, feature lists  
**Best for:** Pricing pages, plan comparisons, packages

---

### 11. Icon Grid (5 seconds)
```json
{
  "type": "icon-grid",
  "duration": 5,
  "content": {
    "title": "Everything You Need",
    "items": [
      {
        "icon": "📊",
        "label": "Analytics"
      },
      // ... 7 more items
    ]
  }
}
```

**Purpose:** Show features/capabilities grid  
**Features:** Icon grid, clean labels, responsive layout  
**Best for:** Feature overview, capabilities, integrations

---

### 12. Product Matrix (5 seconds)
```json
{
  "type": "product-matrix",
  "duration": 5,
  "content": {
    "title": "Product Comparison",
    "headers": ["Feature", "Basic", "Pro", "Enterprise"],
    "rows": [
      ["Users", "10", "50", "Unlimited"],
      // ... 5 more rows
    ]
  }
}
```

**Purpose:** Feature comparison table  
**Features:** Table layout, checkmarks, clear hierarchy  
**Best for:** Plan comparisons, feature matrices, specifications

---

### 13. Process Flow (6 seconds)
```json
{
  "type": "process-flow",
  "duration": 6,
  "content": {
    "title": "How It Works",
    "steps": [
      {
        "number": 1,
        "title": "Sign Up",
        "description": "Create your account in 60 seconds"
      },
      // ... 3 more steps
    ]
  }
}
```

**Purpose:** Show step-by-step process  
**Features:** Numbered steps, flow arrows, descriptions  
**Best for:** Onboarding, processes, workflows

---

### 14. Countdown (4 seconds)
```json
{
  "type": "countdown",
  "duration": 4,
  "content": {
    "title": "Limited Time Offer",
    "subtitle": "Special launch pricing ends in:",
    "targetDate": "2024-12-31T23:59:59",
    "urgencyText": "Don't miss out on 50% OFF!"
  }
}
```

**Purpose:** Create urgency with countdown  
**Features:** Live countdown timer, urgency messaging  
**Best for:** Limited offers, launches, deadlines

---

### 15. CTA (4 seconds)
```json
{
  "type": "cta",
  "duration": 4,
  "content": {
    "title": "Ready to Get Started?",
    "description": "Join thousands of successful companies today",
    "buttonText": "Start Free Trial",
    "urgency": "No credit card required • 14-day free trial"
  }
}
```

**Purpose:** Final call-to-action  
**Features:** Bold CTA button, urgency text, clear message  
**Best for:** Conversions, sign-ups, next steps

---

## 🎯 How to Use This Template

### Method 1: Direct API Call
```bash
curl -X POST http://localhost:3000/api/generate-flexible-video \
  -H "Content-Type: application/json" \
  -d @examples/promotional-showcase-all-scenes.json
```

### Method 2: Copy & Paste in UI
1. Open `advanced-client.html`
2. Copy the entire JSON from `promotional-showcase-all-scenes.json`
3. Paste into the JSON editor
4. Click "Generate Video"

### Method 3: Modify for Your Needs
1. Copy the template
2. Replace placeholder content:
   - Update company name and logo
   - Change product images
   - Customize features and benefits
   - Update pricing and stats
   - Add your testimonials
3. Adjust scene durations as needed
4. Generate your custom video

---

## 🎨 Customization Guide

### Change Theme
```json
{
  "theme": "corporate"  // or "winter", "lofi", "shortrentals", etc.
}
```

### Add Background Music
```json
{
  "music": {
    "enabled": true,
    "url": "https://example.com/background-music.mp3",
    "volume": 0.3,
    "fadeIn": 2,
    "fadeOut": 3
  }
}
```

### Adjust Scene Order
Simply reorder scenes in the `scenes` array to change the flow.

### Remove Scenes
Delete any scene you don't need from the array.

### Add More Scenes
Copy a scene block and modify the content.

---

## 📊 Scene Duration Recommendations

| Scene Type | Min Duration | Recommended | Max Duration |
|------------|--------------|-------------|--------------|
| Brand Watermark | 3s | 3-4s | 5s |
| Hero Title | 4s | 5-6s | 8s |
| Minimal Title | 3s | 4s | 6s |
| Product Showcase | 4s | 6-8s | 12s |
| Feature List | 5s | 6-7s | 10s |
| Split Screen | 4s | 5s | 7s |
| Stats Dashboard | 4s | 5s | 7s |
| Testimonial | 4s | 5-6s | 8s |
| Timeline | 5s | 6-8s | 10s |
| Pricing Cards | 5s | 6-7s | 10s |
| Icon Grid | 4s | 5s | 7s |
| Product Matrix | 4s | 5-6s | 8s |
| Process Flow | 5s | 6-7s | 10s |
| Countdown | 3s | 4s | 6s |
| CTA | 3s | 4s | 6s |

---

## 🎬 Video Flow Strategy

### Opening (0-12s)
1. **Brand Watermark** - Establish brand identity
2. **Hero Title** - Main value proposition
3. **Minimal Title** - Reinforce positioning

### Product Demo (12-24s)
4. **Product Showcase** - Visual demonstration
5. **Feature List** - Key capabilities

### Social Proof (24-39s)
6. **Split Screen** - Problem/solution
7. **Stats Dashboard** - Credibility
8. **Testimonial** - Customer validation

### Company Story (39-51s)
9. **Timeline** - Build trust
10. **Pricing Cards** - Show value

### Feature Details (51-67s)
11. **Icon Grid** - Comprehensive features
12. **Product Matrix** - Detailed comparison
13. **Process Flow** - How it works

### Closing (67-75s)
14. **Countdown** - Create urgency
15. **CTA** - Drive action

---

## 💡 Best Practices

### Content
- ✅ Keep text concise and impactful
- ✅ Use high-quality images (1200x800 minimum)
- ✅ Choose relevant emojis/icons
- ✅ Maintain consistent messaging
- ✅ End with clear call-to-action

### Timing
- ✅ Don't rush scenes (minimum 3-4 seconds each)
- ✅ Allow time for text to be read
- ✅ Consider total video length (60-90s ideal)
- ✅ Balance information density

### Design
- ✅ Use consistent theme throughout
- ✅ Choose appropriate color scheme
- ✅ Ensure text is readable
- ✅ Test on different screen sizes

### Flow
- ✅ Start with brand/value proposition
- ✅ Build credibility with social proof
- ✅ Show features and benefits
- ✅ End with strong call-to-action

---

## 🔧 Common Modifications

### For Product Launch
Keep: Brand Watermark, Hero Title, Product Showcase, Feature List, Stats, CTA  
Remove: Timeline, Pricing Cards, Product Matrix

### For SaaS Marketing
Keep: Hero Title, Feature List, Pricing Cards, Testimonial, Process Flow, CTA  
Remove: Timeline, Countdown

### For Brand Awareness
Keep: Brand Watermark, Hero Title, Minimal Title, Timeline, Icon Grid, CTA  
Remove: Pricing Cards, Product Matrix, Countdown

### For Limited Offer
Keep: Hero Title, Product Showcase, Feature List, Countdown, CTA  
Add: Multiple testimonials, urgency messaging

---

## 📁 Related Files

- **Template:** `examples/promotional-showcase-all-scenes.json`
- **Original Template:** `examples/promotional-video.json`
- **Educational Template:** `examples/educational-video.json`
- **Scene Documentation:** `LLM_VIDEO_GENERATION_GUIDE.md`

---

## ✅ Summary

This comprehensive template:
- ✅ Showcases **all 15 promotional scene types**
- ✅ Demonstrates **proper scene flow and transitions**
- ✅ Provides **ready-to-use placeholder content**
- ✅ Follows **DESIGN.md principles** (no gradients, clean design)
- ✅ Uses **corporate theme** by default
- ✅ Creates **~75 second professional video**
- ✅ Serves as **complete reference** for promotional videos

**Perfect for:**
- Testing all scenes together
- Learning scene capabilities
- Creating complete product videos
- Demonstrating video generator features
- Quick-start template for new projects

🎬✨
