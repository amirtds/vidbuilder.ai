# Professional Animated Background Art Guide

## Overview
This guide documents the subtle, professional **animated** background art patterns added to all promotional video scenes to enhance visual appeal without overwhelming content.

## Design Principles
- **Subtle opacity**: All patterns use 2-5% opacity with pulsing animations
- **No gradients**: Solid colors only, per DESIGN.md
- **Theme-aware**: Uses DaisyUI theme colors
- **Non-distracting**: Backgrounds enhance, never compete with content
- **Professional**: Inspired by Apple, Nike, and premium brand aesthetics
- **Smooth animations**: Slow, continuous motion using sine/cosine functions
- **Performance optimized**: CSS-only, GPU-accelerated transforms

## Background Patterns by Scene

### 1. Stats Dashboard ✨
**Pattern**: Diagonal crosshatch grid with drift
- 45° and -45° repeating lines
- 40px × 40px grid size
- 3% opacity (pulsing 3-5%)
- **Animation**: Slow diagonal drift (`frame * 0.1px`)
**Accents**:
- Top-right circle (300px, primary) - rotating + pulsing scale
- Bottom-left circle (400px, accent) - counter-rotating + pulsing scale
- **Animation**: Rotation (±0.15-0.2°/frame), opacity pulse (6-12%), scale (±5%)

### 2. Pricing Cards ✨
**Pattern**: Radial dot grid with wave motion
- 1px dots in circular pattern
- 30px spacing
- 3-5% opacity (pulsing)
- **Animation**: Circular wave motion (sine/cosine × 5px)
**Accents**:
- Top-right corner L-shape (primary) - pulsing scale
- Bottom-left corner L-shape (accent) - pulsing scale
- **Animation**: Opacity pulse (8-14%), scale (±8%)

### 3. Testimonial ✨
**Pattern**: Giant quote mark watermark with rotation
- 400px font size quote mark
- 1.5-2.5% opacity (pulsing)
- **Animation**: Subtle rotation (±3°), scale pulse (±5%)
**Accents**:
- Top-right circle (150px, primary) - rotating + pulsing
- Bottom-left circle (100px, accent) - counter-rotating + pulsing
- **Animation**: Rotation (±0.25-0.3°/frame), opacity (4-12%), scale (±10%)

### 4. Timeline ✨
**Pattern**: Vertical lines with horizontal drift
- Repeating 1px lines every 80px
- 2.5-4% opacity (pulsing)
- **Animation**: Horizontal drift (`frame * 0.15px`)
**Accents**:
- Top-left circle (80px, primary) - pulsing scale
- Bottom-right circle (60px, accent) - pulsing scale
- **Animation**: Opacity pulse (6-12%), scale (±12%)

### 5. Process Flow ✨
**Pattern**: Horizontal lines with vertical flow
- Repeating 1px lines every 60px
- 2.5-4% opacity (pulsing)
- **Animation**: Vertical flow (`frame * 0.2px`)
**Accents**:
- Top-left square (120px, primary) - rotating + scaling
- Bottom-right square (100px, accent) - counter-rotating + scaling
- **Animation**: Rotation (±0.25-0.3°/frame), opacity (6-12%), scale (±10%)

### 6. Icon Grid ✨
**Pattern**: Square grid with circular wave
- 50px × 50px grid
- 2.5-4% opacity (pulsing)
- **Animation**: Circular wave motion (sine/cosine × 10px)
**Accents**:
- Top-left triangle (150px, primary) - rotating + scaling
- Bottom-right triangle (120px, accent) - counter-rotating + scaling
- **Animation**: Rotation (±0.15-0.2°/frame), opacity (5-10%), scale (±10%)

### 7. Product Matrix ✨
**Pattern**: Hexagonal dots with wave motion
- 2px dots in hex pattern
- 40px spacing
- 2.5-4% opacity (pulsing)
- **Animation**: Circular wave (sine/cosine × 8px)
**Accents**:
- Top-right diagonal lines (250px, primary) - rotating + scaling
- Bottom-left diagonal lines (200px, accent) - counter-rotating + scaling
- **Animation**: Rotation (±0.18-0.2°/frame), opacity (6-12%), scale (±8%)

### 8. Countdown (No Background) ⛔
**Note**: Per user request, countdown scene has NO animated background

### 9. Split Screen (No Background) ⛔
**Note**: Per user request, split-screen scene has NO animated background

## Animation Techniques

### 1. Pattern Movement
**Drift Animation**: Continuous linear movement
```typescript
backgroundPosition: `${frame * speed}px ${frame * speed}px`
```
- Stats: Diagonal drift (0.1px/frame)
- Timeline: Horizontal drift (0.15px/frame)
- Process Flow: Vertical flow (0.2px/frame)

**Wave Motion**: Circular/organic movement
```typescript
backgroundPosition: `${Math.sin(frame * 0.02) * amplitude}px ${Math.cos(frame * 0.02) * amplitude}px`
```
- Pricing Cards: 5px amplitude
- Icon Grid: 10px amplitude
- Product Matrix: 8px amplitude

### 2. Opacity Pulsing
**Breathing Effect**: Smooth opacity transitions
```typescript
opacity: interpolate(frame, [0, 60, 120], [min, max, min], {
  extrapolateRight: 'clamp',
  easing: Easing.inOut(Easing.ease),
})
```
- Pattern opacity: 2.5-5% range
- Accent opacity: 4-14% range

### 3. Rotation & Scale
**Continuous Rotation**: Slow, infinite spin
```typescript
transform: `rotate(${frame * speed}deg)`
```
- Clockwise: 0.15-0.3°/frame
- Counter-clockwise: -0.15 to -0.3°/frame

**Pulsing Scale**: Breathing size effect
```typescript
scale: ${1 + Math.sin(frame * 0.04) * amplitude}
```
- Amplitude: 0.05-0.12 (5-12% size change)

### 4. Combined Transforms
**Multi-axis Animation**: Rotation + Scale + Opacity
```typescript
transform: `rotate(${frame * 0.2}deg) scale(${1 + Math.sin(frame * 0.04) * 0.1})`
opacity: interpolate(frame, [0, 60, 120], [0.06, 0.12, 0.06])
```

## Implementation Notes

### Z-Index Layering
```
Background patterns: z-index: 0
Decorative accents: z-index: 0
Content: z-index: 1
```

### Responsive Considerations
- Patterns scale with viewport
- Animation speeds remain constant
- Accents positioned with percentages
- All transforms are GPU-accelerated

### Performance
- CSS-only patterns (no images)
- GPU-accelerated transforms (rotate, scale, translate)
- Minimal CPU usage
- Smooth 30fps playback
- No JavaScript animation loops

## Color Usage
All patterns use theme colors:
- `style.baseContent` - Main pattern color
- `style.primary` - Primary accents
- `style.accent` - Secondary accents
- `style.secondary` - Tertiary accents

## Accessibility
- Patterns are purely decorative
- Do not interfere with text readability
- Maintain WCAG contrast ratios
- Can be disabled without losing information

## Future Enhancements
- Animated patterns (subtle motion)
- Theme-specific pattern variations
- User-configurable pattern intensity
- Pattern library expansion
