import React, { useState } from 'react';
import { Img } from 'remotion';

interface SafeImageProps {
  src: string;
  style?: React.CSSProperties;
  fallbackColor?: string;
  showFallbackIcon?: boolean;
  alt?: string;
}

/**
 * SafeImage Component
 * 
 * Wraps Remotion's <Img> with error handling to prevent broken images
 * from crashing the video rendering process.
 * 
 * Features:
 * - Catches image load errors (404, broken URLs, etc.)
 * - Shows a fallback placeholder instead of breaking
 * - Maintains the same dimensions as the original image
 * - Customizable fallback appearance
 * 
 * Usage:
 * <SafeImage 
 *   src={imageUrl} 
 *   style={{width: 200, height: 200}}
 *   fallbackColor="#e5e5e5"
 * />
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  style = {},
  fallbackColor = '#e5e5e5',
  showFallbackIcon = true,
  alt = 'Image',
}) => {
  const [hasError, setHasError] = useState(false);

  // If no src provided, show fallback immediately
  if (!src || src.trim() === '') {
    return (
      <div
        style={{
          ...style,
          background: fallbackColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        {showFallbackIcon && '🖼️'}
      </div>
    );
  }

  // If image failed to load, show fallback
  if (hasError) {
    return (
      <div
        style={{
          ...style,
          background: fallbackColor,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: 14,
          fontWeight: 500,
          gap: 8,
        }}
      >
        {showFallbackIcon && <div style={{ fontSize: 32 }}>🖼️</div>}
        <div style={{ fontSize: 12, opacity: 0.7 }}>Image unavailable</div>
      </div>
    );
  }

  // Try to load the image
  return (
    <Img
      src={src}
      style={style}
      onError={() => {
        console.warn(`Failed to load image: ${src}`);
        setHasError(true);
      }}
    />
  );
};
