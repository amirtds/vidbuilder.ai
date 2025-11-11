# Modern Glassmorphism Pricing Cards (Loom-Inspired)

## Design Overview

The pricing card scene has been completely redesigned with a modern glassmorphism aesthetic inspired by Loom's pricing page. This creates a sleek, high-tech feel perfect for SaaS, fintech, and premium products.

## Key Design Features

### 1. **Glassmorphism Effect**
- **Translucent backgrounds** with `backdrop-filter: blur(20px)`
- **Subtle gradient overlays** for featured cards
- **Soft borders** with semi-transparent colors
- **Layered depth** with inset highlights

### 2. **Visual Hierarchy**
- **Plan name**: Left-aligned, gradient text for featured cards
- **Description**: Optional subtitle for each plan
- **Price**: Large, bold, with inline period display
- **Features**: Minimal circular checkmarks with staggered animations
- **CTA Button**: Vibrant gradient button with shadow

### 3. **Featured Card Highlights**
- **"MOST POPULAR" badge** at top center with gradient background
- **Gradient text** for plan name (primary → secondary)
- **Enhanced glow effect** around card
- **Gradient checkmarks** for features
- **Gradient CTA button** with stronger shadow

### 4. **Modern Styling**
- **Rounded corners**: 28px border radius
- **Soft shadows**: Multi-layer box-shadows
- **Smooth animations**: Spring-based entrance with stagger
- **Feature animations**: Each feature fades in sequentially

## JSON Configuration

### Basic Example (3 Plans)
```json
{
  "type": "pricing-cards",
  "duration": 5,
  "content": {
    "title": "Choose Your Plan",
    "plans": [
      {
        "name": "Starter",
        "description": "Get started with video communication",
        "price": "$0",
        "period": "/month",
        "features": [
          "25 videos",
          "5 minute screen recordings",
          "Unlimited meeting length",
          "Transcriptions in 50+ languages"
        ],
        "buttonText": "Sign up"
      },
      {
        "name": "Business",
        "description": "Move work forward faster with unlimited videos and basic editing",
        "price": "$15",
        "period": "/mo/creator",
        "billingInfo": "Billed annually",
        "features": [
          "Unlimited videos",
          "Unlimited recording time",
          "Basic waveform editing",
          "Remove Loom branding"
        ],
        "buttonText": "Try for free",
        "featured": true
      },
      {
        "name": "Enterprise",
        "description": "Control and securely manage your video content for the entire organization",
        "price": "Let's Talk",
        "features": [
          "Advanced security (SSO, SCIM)",
          "Advanced content privacy",
          "Custom data retention policies",
          "Salesforce integration"
        ],
        "buttonText": "Contact Sales"
      }
    ]
  }
}
```

## Plan Object Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | ✅ | Plan name (e.g., "Business", "Enterprise") |
| `description` | string | ❌ | Short description below plan name |
| `price` | string | ✅ | Price display (e.g., "$20", "Free", "Let's Talk") |
| `period` | string | ❌ | Billing period (e.g., "/month", "/mo/creator") |
| `billingInfo` | string | ❌ | Additional billing info (e.g., "Billed annually") |
| `features` | string[] | ✅ | Array of feature strings |
| `buttonText` | string | ❌ | CTA button text (defaults: "Try for free" or "Sign up") |
| `featured` | boolean | ❌ | Mark as featured/most popular plan |

## Design Specifications

### Card Dimensions
- **Width**: 450px (single card: 700px)
- **Min Height**: 750px
- **Padding**: 50px (single card: 70px)
- **Border Radius**: 28px
- **Gap between cards**: 60px

### Typography
- **Plan Name**: 56px, weight 800, -1px letter spacing
- **Description**: 22px, 70% opacity
- **Price**: 120px, weight 900, -3px letter spacing
- **Period**: 28px, 60% opacity
- **Features**: 26px, weight 400
- **Button**: 24px, weight 700

### Colors & Effects
- **Background**: Translucent with `backdrop-filter: blur(20px)`
- **Featured gradient**: `linear-gradient(135deg, primary, secondary)`
- **Border**: 2px solid with 40-60% opacity
- **Shadow**: Multi-layer with glow for featured cards
- **Checkmarks**: Circular badges with gradient for featured

### Animations
- **Card entrance**: Spring animation with scale
- **Opacity fade**: 30 frames
- **Blur reveal**: 8px → 0px over 25 frames
- **Feature stagger**: 5 frame delay between each
- **Featured scale**: 1.08x with glow effect

## Best Practices

### 1. **Number of Plans**
- **1 plan**: Centered, larger sizing
- **2-3 plans**: Optimal layout
- **4+ plans**: May feel crowded (consider splitting)

### 2. **Featured Plan**
- Always mark your **recommended plan** as `featured: true`
- Place featured plan in the **center** for 3-plan layouts
- Use **compelling CTA** text like "Try for free" or "Start now"

### 3. **Feature Lists**
- Keep features **concise** (3-7 items ideal)
- Use **benefit-focused** language
- Order by **importance** (most valuable first)

### 4. **Pricing Display**
- Be **transparent** about billing (annual vs monthly)
- Include **currency symbols**
- For enterprise: Use "Let's Talk" or "Contact Sales"

### 5. **Button Text**
- **Featured**: "Try for free", "Start free trial", "Get started"
- **Basic**: "Sign up", "Choose plan"
- **Enterprise**: "Contact Sales", "Talk to us"

## Theme Integration

The glassmorphism design automatically adapts to your selected DaisyUI theme:

- **Primary color**: Used for gradients, buttons, checkmarks
- **Secondary color**: Used in gradient combinations
- **Base colors**: Used for card backgrounds and text
- **Content colors**: Used for text with proper contrast

### Recommended Themes
- **Corporate**: Professional blue tones
- **Business**: Clean, modern look
- **Synthwave**: Vibrant, tech-forward
- **Luxury**: Premium, sophisticated
- **Cyberpunk**: Futuristic, edgy

## Technical Notes

### Glassmorphism Requirements
- Uses `backdrop-filter` and `WebkitBackdropFilter` for blur
- Requires semi-transparent backgrounds
- Works best with gradient or textured backgrounds behind cards

### Browser Support
- Modern browsers fully supported
- Graceful degradation for older browsers (no blur effect)

### Performance
- Blur effects are GPU-accelerated
- Animations use Remotion's spring physics
- Optimized for 4K rendering

## Examples

### SaaS Pricing
```json
{
  "plans": [
    {"name": "Free", "price": "$0", "features": ["Basic features"]},
    {"name": "Pro", "price": "$29", "featured": true, "features": ["All features"]},
    {"name": "Enterprise", "price": "Custom", "features": ["Custom solutions"]}
  ]
}
```

### Single Premium Plan
```json
{
  "plans": [
    {
      "name": "Premium",
      "description": "Everything you need to succeed",
      "price": "$99",
      "period": "/month",
      "featured": true,
      "features": ["Feature 1", "Feature 2", "Feature 3"],
      "buttonText": "Start 14-day trial"
    }
  ]
}
```

---

**Last Updated**: November 2024
**Design Style**: Modern Glassmorphism (Loom-Inspired)
**Status**: Production Ready ✅
