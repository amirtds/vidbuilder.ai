#!/bin/bash
# Script to fix theme color properties in scene files
# Updates old property names to DaisyUI theme property names

echo "Fixing theme color properties in scene files..."

# PromoScenes.tsx replacements
sed -i '' 's/style\.background/style.base100/g' src/scenes/PromoScenes.tsx
sed -i '' 's/style\.backgroundGradient || style\.base100/style.base100/g' src/scenes/PromoScenes.tsx
sed -i '' 's/style\.text/style.baseContent/g' src/scenes/PromoScenes.tsx
sed -i '' 's/style\.textLight/style.neutralContent/g' src/scenes/PromoScenes.tsx
sed -i '' 's/style\.textMuted/style.neutral/g' src/scenes/PromoScenes.tsx

# Fix the StatsDashboard gradient reference to use primaryContent for light text
sed -i '' 's/style\.primaryContent/style.primaryContent/g' src/scenes/PromoScenes.tsx

# EducationalScenes.tsx replacements
sed -i '' 's/style\.background/style.base100/g' src/scenes/EducationalScenes.tsx
sed -i '' 's/style\.text/style.baseContent/g' src/scenes/EducationalScenes.tsx
sed -i '' 's/style\.textLight/style.neutralContent/g' src/scenes/EducationalScenes.tsx

# EducationalScenes2.tsx replacements  
sed -i '' 's/style\.background/style.base100/g' src/scenes/EducationalScenes2.tsx
sed -i '' 's/style\.text/style.baseContent/g' src/scenes/EducationalScenes2.tsx
sed -i '' 's/style\.textLight/style.neutralContent/g' src/scenes/EducationalScenes2.tsx

# SceneTemplates.tsx replacements (if using old interface)
sed -i '' 's/style\.text/style.baseContent || "#000"/g' src/SceneTemplates.tsx
sed -i '' 's/style\.textLight/style.neutralContent || "#666"/g' src/SceneTemplates.tsx
sed -i '' 's/style\.backgroundGradient || style\.background/style.base100 || "#fff"/g' src/SceneTemplates.tsx
sed -i '' 's/style\.background/style.base100 || "#fff"/g' src/SceneTemplates.tsx

echo "Theme color properties fixed!"
