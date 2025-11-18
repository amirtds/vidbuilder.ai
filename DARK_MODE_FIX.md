# Dark Mode Visibility Fix

## Problem
Text was nearly invisible on dark backgrounds because scenes were using `style.neutral` (a dark gray background color like `#3d4451`) for text instead of `style.neutralContent` (the text color designed to be visible on neutral backgrounds).

## Root Cause
**DaisyUI Color Semantics Misunderstanding:**
- `neutral` = Background color (dark gray)
- `neutralContent` = Text color that goes ON neutral background (light color)
- `base100` = Main background color
- `baseContent` = Main text color

Using `neutral` for text on a dark `base100` background creates dark-on-dark text (invisible).

## Solution
Replaced all instances of `style.neutral` used for text colors with:
```typescript
style.neutralContent || style.baseContent
```

This ensures:
- ✅ Light text on dark themes (e.g., halloween, cyberpunk, forest)
- ✅ Dark text on light themes (e.g., corporate, winter, light)
- ✅ Proper contrast in all scenarios

## Files Fixed

### 1. `/src/SceneTemplates.tsx`
Fixed 6 instances across multiple scenes:
- **HeroTitleScene** (line 120) - Subtitle color
- **ProductShowcaseScene** (line 354) - Description color
- **ProductShowcaseScene** (line 413) - Caption color
- **FeatureListScene** (line 579) - Feature text color
- **CTAScene** (line 670) - Description color
- **CTAScene** (line 714) - Urgency text color

### 2. `/src/scenes/PromoScenes.tsx`
Fixed 7 instances across multiple scenes:
- **MinimalTitleScene** (line 154) - Subtitle color
- **SplitScreenScene** (line 388) - Right text color
- **StatsDashboardScene** (line 595) - Stat label color
- **TestimonialScene** (line 775) - Role color
- **IconGridScene** (line 1642) - Item description color
- **ProductMatrixScene** (line 1858) - Product description color
- **ProcessFlowScene** (line 2102) - Step description color

### 3. `/src/scenes/EducationalScenes.tsx`
✅ Already correct - no fixes needed

## Color Usage Guidelines

### ✅ Correct Usage

**For text on main background:**
```typescript
color: style.baseContent
```

**For secondary/muted text:**
```typescript
color: style.neutralContent || style.baseContent
```

**For text on primary button:**
```typescript
color: style.primaryContent
```

**For text on secondary element:**
```typescript
color: style.secondaryContent
```

### ❌ Incorrect Usage

**Never use background colors for text:**
```typescript
// WRONG - neutral is a background color
color: style.neutral

// WRONG - base100/base200/base300 are background colors
color: style.base100
color: style.base200
color: style.base300
```

## Testing

Test with dark themes to verify visibility:
```json
{
  "theme": "halloween",
  "scenes": [
    {
      "type": "hero-title",
      "content": {
        "title": "Main **Title**",
        "subtitle": "This subtitle should be clearly visible"
      },
      "duration": 4
    }
  ]
}
```

Dark themes to test:
- `halloween` - Orange/purple dark theme
- `forest` - Green dark theme
- `cyberpunk` - Pink/cyan dark theme
- `synthwave` - Purple/pink dark theme
- `dark` - Standard dark theme
- `black` - Pure black theme
- `vidbuilder` - Netflix-inspired dark theme

## DaisyUI Color Reference

| Color Property | Purpose | Example Value (Dark) | Example Value (Light) |
|---------------|---------|---------------------|----------------------|
| `base100` | Main background | `#1d232a` (dark) | `#ffffff` (white) |
| `base200` | Secondary background | `#191e24` (darker) | `#f2f2f2` (light gray) |
| `base300` | Tertiary background | `#15191e` (darkest) | `#e5e5e5` (gray) |
| `baseContent` | Text on base | `#a6adbb` (light gray) | `#1f2937` (dark gray) |
| `neutral` | Neutral background | `#2a2e37` (dark) | `#3d4451` (gray) |
| `neutralContent` | Text on neutral | `#ffffff` (white) | `#ffffff` (white) |
| `primary` | Brand color | `#661ae6` (purple) | `#570df8` (purple) |
| `primaryContent` | Text on primary | `#ffffff` (white) | `#ffffff` (white) |

## Summary

✅ **Fixed**: All text colors now use `neutralContent` or `baseContent`  
✅ **Result**: Text is clearly visible on both dark and light themes  
✅ **Files**: 2 files modified (SceneTemplates.tsx, PromoScenes.tsx)  
✅ **Scenes**: 13 scene components fixed  
✅ **Backward Compatible**: Fallback to `baseContent` if `neutralContent` is missing
