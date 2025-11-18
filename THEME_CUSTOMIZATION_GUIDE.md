# Theme Customization Guide

## Overview

The video generator supports **3 flexible ways** to customize colors:

1. **Use a predefined theme** (simplest)
2. **Start with a theme and override specific colors** (recommended)
3. **Define all colors yourself** (full control)

## Implementation

### ✅ Single Source of Truth
- **`src/services/DaisyUIThemeService.ts`** - Contains all theme definitions
- Server uses `esbuild-register` to load TypeScript directly
- **No duplicate code** - theme-resolver.js is deprecated and should be deleted

### Color Scheme Resolution Logic

Located in:
- `server.js` (line 492-515)
- `video-generator-async.js` (line 108-131)

```javascript
// Load TypeScript service
require('esbuild-register/dist/node').register();
const { getThemeColors } = require('./src/services/DaisyUIThemeService.ts');

// Mode 1: Custom colorScheme with theme (merge)
if (videoConfig.colorScheme && videoConfig.theme) {
  const baseTheme = getThemeColors(videoConfig.theme);
  videoConfig.colorScheme = { ...baseTheme, ...videoConfig.colorScheme };
}
// Mode 2: Custom colorScheme only (full override)
else if (videoConfig.colorScheme) {
  // Use as-is
}
// Mode 3: Theme only
else if (videoConfig.theme) {
  videoConfig.colorScheme = getThemeColors(videoConfig.theme);
}
// Fallback: corporate theme
else {
  videoConfig.colorScheme = getThemeColors('corporate');
}
```

## Usage Examples

### Mode 1: Theme Only (Simplest)

```json
{
  "theme": "cyberpunk",
  "scenes": [...]
}
```

**Result**: All colors from the cyberpunk theme

---

### Mode 2: Theme + Custom Overrides (Recommended)

```json
{
  "theme": "corporate",
  "colorScheme": {
    "primary": "#FF385C",
    "accent": "#00D9FF",
    "base100": "#f8f9fa"
  },
  "scenes": [...]
}
```

**Result**: 
- `primary`, `accent`, `base100` use your custom colors
- All other colors (17 remaining) use corporate theme defaults

**Benefits**:
- ✅ Only specify colors you want to change
- ✅ Theme provides sensible defaults for everything else
- ✅ Consistent color palette with brand customization

---

### Mode 3: Fully Custom (Full Control)

```json
{
  "colorScheme": {
    "primary": "#FF385C",
    "primaryContent": "#ffffff",
    "secondary": "#00D9FF",
    "secondaryContent": "#000000",
    "accent": "#FFD700",
    "accentContent": "#000000",
    "neutral": "#3d4451",
    "neutralContent": "#ffffff",
    "base100": "#ffffff",
    "base200": "#f2f2f2",
    "base300": "#e5e5e5",
    "baseContent": "#1f2937",
    "info": "#3abff8",
    "infoContent": "#002e3f",
    "success": "#36d399",
    "successContent": "#003320",
    "warning": "#fbbd23",
    "warningContent": "#382800",
    "error": "#f87272",
    "errorContent": "#470000",
    "borderRadius": 12
  },
  "scenes": [...]
}
```

**Result**: Complete control over all colors

**Note**: You must provide all 20 color properties when not using a theme.

---

## Font Customization

### ❌ Old Behavior (Removed)
Fonts were hardcoded in themes:
```typescript
fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
```

### ✅ New Behavior
Users specify their own font if needed:

```json
{
  "theme": "corporate",
  "colorScheme": {
    "fontFamily": "Inter, system-ui, sans-serif"
  },
  "scenes": [...]
}
```

**Default**: If no fontFamily is specified, Remotion/React will use browser defaults.

---

## Available Themes

### Dark Themes
- `dark`, `synthwave`, `cyberpunk`, `halloween`, `forest`
- `black`, `luxury`, `dracula`, `night`, `coffee`
- `dim`, `nord`, `sunset`, `vidbuilder`

### Light Themes
- `light`, `cupcake`, `bumblebee`, `emerald`, `corporate`
- `retro`, `valentine`, `garden`, `aqua`, `lofi`
- `pastel`, `fantasy`, `wireframe`, `winter`

### Colorful Themes
- `autumn`, `acid`, `lemonade`, `cmyk`, `business`

### Custom Themes
- `shortrentals` (Airbnb-inspired)
- `vidbuilder` (Netflix-inspired)

---

## Color Properties Reference

### Primary Colors
- `primary` - Main brand color (buttons, links, CTAs)
- `primaryContent` - Text color on primary background

### Secondary Colors
- `secondary` - Secondary brand color
- `secondaryContent` - Text color on secondary background

### Accent Colors
- `accent` - Accent/highlight color (use sparingly)
- `accentContent` - Text color on accent background

### Base Colors (Backgrounds)
- `base100` - Main background
- `base200` - Secondary background (cards, panels)
- `base300` - Tertiary background (borders, dividers)
- `baseContent` - Main text color

### Neutral Colors
- `neutral` - Neutral elements
- `neutralContent` - Text on neutral background

### Semantic Colors
- `info` / `infoContent` - Informational messages
- `success` / `successContent` - Success states
- `warning` / `warningContent` - Warning states
- `error` / `errorContent` - Error states

### Design Properties
- `borderRadius` - Border radius in pixels (default: 8)
- `fontFamily` - Optional custom font (user-specified)

---

## Best Practices

### ✅ Do
- Use **Mode 2** (theme + overrides) for most cases
- Override only brand-specific colors (primary, accent)
- Let themes handle semantic colors (info, success, warning, error)
- Test your custom colors for sufficient contrast

### ❌ Don't
- Don't hardcode fonts in themes
- Don't override all colors unless necessary
- Don't use accent color excessively
- Don't forget to test dark/light mode compatibility

---

## Migration Notes

### Deprecated
- `theme-resolver.js` - Delete this file, it's redundant
- Hardcoded `fontFamily` in themes - Removed

### Updated
- `server.js` - Now uses TypeScript service directly
- `video-generator-async.js` - Now uses TypeScript service directly
- `DaisyUIThemeService.ts` - Removed hardcoded fontFamily

---

## Testing

Test your custom colors:

```bash
# Test Mode 1: Theme only
curl -X POST http://localhost:3000/api/generate-video-async \
  -H "Content-Type: application/json" \
  -d '{"theme":"cyberpunk","scenes":[...]}'

# Test Mode 2: Theme + overrides
curl -X POST http://localhost:3000/api/generate-video-async \
  -H "Content-Type: application/json" \
  -d '{"theme":"corporate","colorScheme":{"primary":"#FF385C"},"scenes":[...]}'

# Test Mode 3: Fully custom
curl -X POST http://localhost:3000/api/generate-video-async \
  -H "Content-Type: application/json" \
  -d '{"colorScheme":{...all colors...},"scenes":[...]}'
```

---

## Summary

✅ **Single source of truth**: `DaisyUIThemeService.ts`  
✅ **3 flexible modes**: Theme only, Theme + overrides, Fully custom  
✅ **No hardcoded fonts**: Users specify their own  
✅ **TypeScript in Node.js**: Using `esbuild-register`  
✅ **No duplicate code**: Delete `theme-resolver.js`
