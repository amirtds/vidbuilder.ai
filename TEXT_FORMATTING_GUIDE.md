# 🎨 Text Color Formatting Guide

## Overview

The video generator now supports **markdown-style color formatting** to highlight specific words or phrases in your titles, subtitles, and descriptions. This creates visual hierarchy and draws attention to key messages.

---

## Formatting Syntax

### Basic Markers

| Syntax | Color Applied | Use Case |
|--------|---------------|----------|
| `**text**` | **Primary Color** | Main emphasis, key features |
| `***text***` | **Secondary Color** | Supporting emphasis, benefits |
| `****text****` | **Accent Color** | Special highlights, CTAs |

### How It Works

The system parses your text and automatically applies theme colors to marked sections:

```json
{
  "title": "Turn your **Airbnb listings** into a ***direct booking*** website"
}
```

**Renders as:**
- "Turn your " → default text color
- "Airbnb listings" → **primary color** (e.g., blue)
- " into a " → default text color
- "direct booking" → **secondary color** (e.g., purple)
- " website" → default text color

---

## Examples

### Example 1: Hero Title

```json
{
  "type": "hero-title",
  "duration": 4,
  "content": {
    "title": "Launch a **rental website** in ***minutes***",
    "subtitle": "AI-powered design with ****zero coding****"
  }
}
```

**Visual Result:**
- Title: "rental website" in primary, "minutes" in secondary
- Subtitle: "zero coding" in accent color

---

### Example 2: Feature Highlights

```json
{
  "type": "feature-highlights",
  "duration": 6,
  "content": {
    "title": "Everything You Need for **Direct Bookings**",
    "highlights": [
      {
        "icon": "🧠",
        "title": "**AI Content**",
        "description": "Generates ***compelling*** property descriptions"
      },
      {
        "icon": "💳",
        "title": "***Stripe Checkout***",
        "description": "Accept payments with ****zero platform fees****"
      }
    ]
  }
}
```

---

### Example 3: Call-to-Action

```json
{
  "type": "call-to-action",
  "duration": 3,
  "content": {
    "title": "Turn Browsers into **Bookings**",
    "subtitle": "Launch your ***AI-crafted*** rental website ****today****",
    "buttonText": "Start Building Free"
  }
}
```

---

## Supported Scenes

### ✅ Fully Supported

All text fields in these scenes support color formatting:

1. **hero-title** - title, subtitle
2. **minimal-title** - superTitle, title, subtitle
3. **feature-highlights** - title, highlights[].title, highlights[].description
4. **call-to-action** - title, subtitle, buttonText
5. **stats-dashboard** - title, stats[].label, footnote
6. **testimonial** - quote, author, role
7. **process-flow** - title, steps[].title, steps[].description
8. **icon-grid** - title, items[].title, items[].description
9. **pricing-cards** - title, plans[].name, plans[].features[]
10. **timeline** - title, events[].title, events[].description

### 🔄 Partially Supported

Some fields support formatting, others don't:

- **split-screen** - titles and text (not images)
- **product-showcase** - title and captions (not images)

---

## Best Practices

### ✅ Do This

**1. Highlight Key Concepts**
```json
"title": "Boost revenue with **zero platform fees**"
```
✅ Clear emphasis on the main benefit

**2. Create Visual Hierarchy**
```json
"title": "**AI-Powered** Site Creation",
"subtitle": "Launch in ***minutes***, not days"
```
✅ Primary for main feature, secondary for speed benefit

**3. Use Sparingly**
```json
"title": "Turn your **Airbnb listings** into a direct booking website"
```
✅ Only 2-3 words highlighted (20% of text)

**4. Match Theme Colors**
```json
{
  "theme": "corporate",
  "scenes": [{
    "content": {
      "title": "**Professional** websites for ***short rentals***"
    }
  }]
}
```
✅ Corporate theme provides appropriate blue/purple colors

---

### ❌ Don't Do This

**1. Over-Format**
```json
"title": "**Turn** your **Airbnb** ***listings*** into a ****direct**** ***booking*** **website**"
```
❌ Too many colors, looks chaotic (60% formatted)

**2. Format Entire Sentences**
```json
"title": "**Launch a rental website in minutes**"
```
❌ No visual hierarchy, defeats the purpose

**3. Mix Too Many Colors**
```json
"title": "**AI** ***powered*** ****site**** **creation** ***for*** ****rentals****"
```
❌ Confusing, no clear emphasis

**4. Format Unimportant Words**
```json
"title": "Turn your Airbnb listings into **a** direct booking website"
```
❌ Highlighting "a" makes no sense

---

## Color Selection Guide

### Primary Color (`**text**`)

**Use for:**
- Main product/feature names
- Key benefits
- Important numbers/stats
- Brand terms

**Examples:**
- "**Airbnb listings**"
- "**zero platform fees**"
- "**AI-powered**"
- "**50% increase**"

---

### Secondary Color (`***text***`)

**Use for:**
- Supporting benefits
- Action words
- Time/speed indicators
- Complementary features

**Examples:**
- "***direct booking***"
- "***minutes***"
- "***automated***"
- "***professional***"

---

### Accent Color (`****text****`)

**Use for:**
- Special offers
- Urgency indicators
- Unique selling points
- Call-to-action emphasis

**Examples:**
- "****today****"
- "****free****"
- "****limited time****"
- "****exclusive****"

---

## Theme Color Reference

Different themes provide different color palettes:

### Corporate Theme
- Primary: Professional Blue (#3B82F6)
- Secondary: Deep Purple (#8B5CF6)
- Accent: Teal (#14B8A6)

### Winter Theme
- Primary: Cool Blue (#0EA5E9)
- Secondary: Ice Blue (#38BDF8)
- Accent: Cyan (#22D3EE)

### Synthwave Theme
- Primary: Hot Pink (#FF007A)
- Secondary: Electric Purple (#B026FF)
- Accent: Neon Yellow (#FFE600)

**Tip:** Choose your theme first, then format text knowing what colors will be applied!

---

## Technical Details

### Implementation

The formatting is handled by `/src/utils/textFormatting.tsx`:

```typescript
parseFormattedText(text, {
  primaryColor: theme.primary,
  secondaryColor: theme.secondary,
  accentColor: theme.accent,
  defaultColor: theme.baseContent
})
```

### Rendering

Text is split into React nodes with inline color styles:

```tsx
<span style={{ color: primaryColor }}>highlighted text</span>
```

### Performance

- Parsing happens once per scene render
- No performance impact on video rendering
- Works with all video resolutions (1080p, 4K)

---

## Migration Guide

### Old Format (Plain Text)

```json
{
  "title": "Amazing Product Features",
  "subtitle": "Fast, Secure, and Reliable"
}
```

### New Format (With Formatting)

```json
{
  "title": "**Amazing** Product Features",
  "subtitle": "***Fast***, ****Secure****, and ***Reliable***"
}
```

**No breaking changes!** Plain text still works perfectly. Formatting is optional.

---

## Troubleshooting

### Issue: Colors Not Showing

**Problem:** Text appears in default color only

**Solutions:**
1. Check marker syntax: `**text**` not `*text*`
2. Ensure theme is set correctly
3. Verify scene type supports formatting

---

### Issue: Wrong Colors Applied

**Problem:** Expected primary but got secondary

**Solutions:**
1. Count asterisks: 2=primary, 3=secondary, 4=accent
2. Check for typos in markers
3. Ensure matching opening/closing markers

---

### Issue: Markers Visible in Video

**Problem:** Seeing `**text**` instead of colored text

**Solutions:**
1. Update to latest version
2. Check scene component supports formatting
3. Verify textFormatting.tsx is imported

---

## Quick Reference

```
**text**       → Primary color (main emphasis)
***text***     → Secondary color (supporting)
****text****   → Accent color (special)

✅ Highlight 1-3 key phrases
✅ Use 20-30% of text maximum
✅ Match theme colors
✅ Create clear hierarchy

❌ Don't over-format
❌ Don't format entire sentences
❌ Don't mix too many colors
```

---

## Summary

✅ **Markdown-style formatting** for easy color highlighting  
✅ **Three color levels** (primary, secondary, accent)  
✅ **Works in all text fields** across scenes  
✅ **Theme-aware** - colors match your selected theme  
✅ **Optional** - plain text still works  
✅ **No performance impact** on rendering  

Use color formatting to create **professional, visually engaging videos** that guide viewer attention to your key messages! 🎨✨
