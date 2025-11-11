# Unified Background System for Promotional Scenes

## Overview
Created a clean, modern, and consistent background system for all promotional scenes using a reusable `ProfessionalBackground` component.

## Design Specifications

### Background Elements
1. **Spacious Grid Pattern**
   - Grid spacing: 120px x 120px (large gaps for modern look)
   - Line thickness: 1px
   - Opacity: 8% (subtle, not overwhelming)
   - Static (no animation for cleaner look)

2. **Three Animated Triangles**
   - **Triangle 1** (Top Left): Primary color, rotating clockwise
   - **Triangle 2** (Top Right): Secondary color, rotating counter-clockwise  
   - **Triangle 3** (Bottom Right): Accent color, rotating clockwise
   - All triangles have smooth scale and rotation animations
   - Opacity fades in/out: 0% → 15-18% → 0%

### Animation Details
- **Rotation Speed**: 0.25-0.35 deg/frame (smooth, professional)
- **Scale Pulsing**: ±10-15% using sine/cosine waves
- **Fade Timing**: 20 frames fade-in, hold, 20 frames fade-out
- **Easing**: Cubic bezier (0.4, 0, 0.2, 1) for smooth motion

## Implementation

### Component Location
```
/src/scenes/ProfessionalBackground.tsx
```

### Usage
The component is automatically imported and used in all promotional scenes:

```tsx
import { ProfessionalBackground } from './ProfessionalBackground';

// Inside scene component:
<AbsoluteFill>
  <ProfessionalBackground style={style} />
  {/* Scene content */}
</AbsoluteFill>
```

## Scenes Using Unified Background

### PromoScenes.tsx (10 scenes)
✅ **MinimalTitleScene** - Apple/Nike style minimal title
✅ **SplitScreenScene** - Cinematic wipe reveal
✅ **StatsDashboardScene** - Statistics with impact
✅ **TestimonialScene** - Customer testimonials *(updated)*
✅ **TimelineScene** - Event timeline journey
✅ **PricingCardsScene** - Pricing comparison
✅ **IconGridScene** - Icon feature grid *(updated)*
✅ **ProductMatrixScene** - Product showcase matrix *(updated)*
✅ **ProcessFlowScene** - Step-by-step process
⚠️ **CountdownScene** - Uses custom primary background with pulse (intentionally different)

### SceneTemplates.tsx (4 scenes)
✅ **FeatureListScene** - Feature list with icons
✅ **HeroTitleScene** - Hero title with typing effect *(updated)*
✅ **ProductShowcaseScene** - Product showcase with images *(updated)*
🚫 **CTAScene** - No background (clean focus on CTA) *(updated)*

## Benefits

### 1. Consistency
- All promotional scenes share the same professional background
- Unified visual language across video types
- Brand consistency maintained

### 2. Maintainability
- Single component to update for all scenes
- No need to modify each scene individually
- Easy to adjust grid spacing, triangle size, or animations

### 3. Performance
- Lightweight CSS-based animations
- No heavy particle systems or complex effects
- Smooth 60fps performance

### 4. Modern Design
- Clean, spacious grid (120px gaps)
- Subtle animations (no overwhelming effects)
- Professional appearance suitable for corporate/business videos

## Customization

To modify the background for all scenes, edit:
```
/src/scenes/ProfessionalBackground.tsx
```

### Grid Spacing
Change the `120px` value in the grid pattern:
```tsx
repeating-linear-gradient(0deg, ... transparent 0, transparent 120px)
```

### Triangle Size
Adjust border widths:
```tsx
borderLeft: '100px solid transparent'  // Half of triangle width
borderBottom: '173px solid ...'        // Triangle height
```

### Animation Speed
Modify rotation multipliers:
```tsx
transform: `rotate(${frame * 0.3}deg)`  // Slower: 0.1-0.2, Faster: 0.4-0.5
```

### Opacity
Change opacity values:
```tsx
opacity: interpolate(frame, [0, 20, 100, 120], [0, 0.15, 0.15, 0])
//                                                    ^^^^  ^^^^
//                                                    Peak opacity
```

## Color Usage

The background automatically adapts to the selected DaisyUI theme:
- **Grid**: Uses `baseContent` color (text color)
- **Triangle 1**: Uses `primary` color
- **Triangle 2**: Uses `secondary` color
- **Triangle 3**: Uses `accent` color

This ensures the background always matches the video's color scheme.

## Migration Notes

### Before
Each scene had custom backgrounds:
- Flowing horizontal lines
- Animated squares
- Diagonal patterns
- Particle effects
- Hexagonal dots
- Corner shapes

### After
All scenes use the same clean background:
- Spacious grid (120px)
- 3 animated triangles
- Consistent across all promotional scenes

### Exception
**CountdownScene** intentionally uses a different background (solid primary color with pulse effect) because it's designed for urgency and impact, requiring a different visual treatment.
