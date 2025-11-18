# Process Flow & Timeline Improvements

## Summary
Fixed timing issues in Process Flow scene and improved Timeline UI alignment and centering.

---

## 1. ✅ Process Flow - Dynamic Timing

### Problem
Steps were appearing too quickly with hardcoded delays (`delay = 25 + i * 20`), giving only 20 frames (~0.67 seconds) per step regardless of scene duration.

### Solution
Implemented dynamic timing based on scene duration, similar to FeatureListScene:

```typescript
// Dynamic delay based on scene duration and number of steps
const titleDuration = 35; // Title animation duration
const availableTime = durationInFrames - titleDuration - 30; // Reserve 30 frames at end
const itemDelay = steps.length > 1 ? availableTime / steps.length : 0;
const delay = titleDuration + (i * itemDelay);
const animDuration = 30;
```

### How It Works

**Example with 4 steps and 15 second duration (450 frames @ 30fps):**
- Title duration: 35 frames
- Reserved end time: 30 frames
- Available time: 450 - 35 - 30 = 385 frames
- Time per step: 385 / 4 = 96.25 frames (~3.2 seconds each)

**Step Timing:**
1. Step 1: Appears at frame 35, animates for 30 frames, visible until frame 131
2. Step 2: Appears at frame 131, animates for 30 frames, visible until frame 227
3. Step 3: Appears at frame 227, animates for 30 frames, visible until frame 323
4. Step 4: Appears at frame 323, animates for 30 frames, visible until frame 420

### File Modified
`/src/scenes/PromoScenes.tsx` - ProcessFlowScene

### Result
- ✅ Each step gets proper time to display
- ✅ Timing scales with scene duration
- ✅ Smooth, professional pacing
- ✅ No more rushed animations

### JSON Example
```json
{
  "type": "process-flow",
  "duration": 15,
  "content": {
    "title": "How It Works",
    "steps": [
      {
        "number": 1,
        "title": "Step 1",
        "description": "Describe your video to AI"
      },
      {
        "number": 2,
        "title": "Step 2",
        "description": "Build your video scenes"
      },
      {
        "number": 3,
        "title": "Step 3",
        "description": "Generate Your Video"
      },
      {
        "number": 4,
        "title": "Step 4",
        "description": "Edits and Revisions"
      }
    ]
  }
}
```

---

## 2. ✅ Timeline - Fixed Alignment & Centering

### Problems
1. Timeline events appeared far from the center line
2. Center circle (dot) was not properly centered
3. Inconsistent spacing between events and line

### Solutions

#### A. Fixed Width Content Areas
**Before:**
```typescript
flex: 1  // Variable width, caused misalignment
```

**After:**
```typescript
width: '45%'  // Fixed width for consistent alignment
```

#### B. Centered Layout
Added `justifyContent: 'center'` to the flex container to ensure proper centering.

#### C. Prevent Dot Squishing
Added `flexShrink: 0` to the center dot to prevent it from being compressed.

#### D. Description Support
Added support for `event.description` field to display additional details below the title.

### File Modified
`/src/scenes/PromoScenes.tsx` - TimelineScene

### Visual Layout
```
┌─────────────────────────────────────────────────┐
│                                                 │
│   [45% width]        ●        [45% width]      │
│   Date               │        (empty)           │
│   Title              │                          │
│   Description        │                          │
│                      │                          │
│   (empty)            ●        Date              │
│                      │        Title             │
│                      │        Description       │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Result
- ✅ Events are properly aligned with center line
- ✅ Center dots are perfectly centered
- ✅ Consistent spacing on both sides
- ✅ Description field now supported
- ✅ Professional, balanced appearance

### JSON Example
```json
{
  "type": "timeline",
  "duration": 15,
  "content": {
    "title": "Our Roadmap",
    "events": [
      {
        "date": "Q1 2026",
        "title": "Educational Content Support",
        "description": "Create engaging educational and tutorial videos"
      },
      {
        "date": "Q1 2026",
        "title": "Social Media Integration",
        "description": "Direct sharing to YouTube, LinkedIn, Instagram"
      },
      {
        "date": "Q2 2026",
        "title": "RESTful API Access",
        "description": "Full API functionality for programmatic access"
      }
    ]
  }
}
```

---

## Testing

### Process Flow Test
```json
{
  "theme": "vidbuilder",
  "scenes": [
    {
      "type": "process-flow",
      "duration": 15,
      "content": {
        "title": "How It Works",
        "steps": [
          {"number": 1, "title": "Step 1", "description": "First step"},
          {"number": 2, "title": "Step 2", "description": "Second step"},
          {"number": 3, "title": "Step 3", "description": "Third step"},
          {"number": 4, "title": "Step 4", "description": "Fourth step"}
        ]
      }
    }
  ]
}
```

**Expected Result:**
- Each step appears and stays visible for ~3.2 seconds
- Smooth transitions between steps
- All steps visible before scene ends

### Timeline Test
```json
{
  "theme": "vidbuilder",
  "scenes": [
    {
      "type": "timeline",
      "duration": 15,
      "content": {
        "title": "Our Roadmap",
        "events": [
          {
            "date": "Q1 2026",
            "title": "Feature A",
            "description": "Description of feature A"
          },
          {
            "date": "Q2 2026",
            "title": "Feature B",
            "description": "Description of feature B"
          }
        ]
      }
    }
  ]
}
```

**Expected Result:**
- Events alternate left/right perfectly aligned with center line
- Center dots are perfectly centered
- Descriptions display below titles
- Consistent spacing throughout

---

## Technical Details

### Process Flow Timing Formula
```typescript
availableTime = durationInFrames - titleDuration - reservedEndTime
timePerStep = availableTime / numberOfSteps
stepDelay(i) = titleDuration + (i * timePerStep)
```

### Timeline Layout Structure
```typescript
Container: display: flex, justifyContent: center
├─ Left Content: width: 45%
├─ Center Dot: flexShrink: 0
└─ Right Content: width: 45%
```

---

## Summary

✅ **Process Flow**: Dynamic timing based on scene duration - each step gets proper display time  
✅ **Timeline**: Fixed alignment with centered dots and consistent spacing  
✅ **Both scenes**: Professional, polished appearance  
✅ **Backward compatible**: Existing JSON works unchanged

Both scenes now provide a much better user experience with proper timing and alignment! 🎯✨
