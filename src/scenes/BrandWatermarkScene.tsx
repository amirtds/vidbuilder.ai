import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Img, Audio } from 'remotion';
import { EnhancedColorScheme } from './types';
import { getTypedText, getTypingProgress } from '../utils/typingEffect';

interface BrandWatermarkContent {
  logo?: string; // Logo image URL
  companyName: string; // Company name
  tagline?: string; // Optional tagline
  logoSize?: number; // Logo size in px (default: 200)
  fontSize?: number; // Company name font size (default: 48)
  taglineSize?: number; // Tagline font size (default: 24)
}

/**
 * Brand Watermark Scene
 * 
 * Professional brand intro with:
 * 1. Logo appears with elegant animation
 * 2. Logo pushes up
 * 3. Company name types in below
 * 4. Optional tagline fades in
 * 
 * Note: Silent scene - Music should NOT start during this scene
 */
export const BrandWatermarkScene: React.FC<{
  content: BrandWatermarkContent;
  style: EnhancedColorScheme;
}> = ({ content, style }) => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();

  // Responsive sizing - LARGER defaults
  const baseFontSize = width >= 3840 ? 1 : width >= 1920 ? 0.8 : 0.6;
  const logoSize = (content.logoSize || 300) * baseFontSize;
  const companyFontSize = (content.fontSize || 64) * baseFontSize;
  const taglineFontSize = (content.taglineSize || 28) * baseFontSize;

  // DYNAMIC TIMELINE based on scene duration
  const totalFrames = durationInFrames;
  
  // Calculate dynamic timing (percentages of total duration)
  const logoEntranceEnd = Math.floor(totalFrames * 0.25); // First 25%
  const logoMoveEnd = Math.floor(totalFrames * 0.40); // Next 15% (40% total)
  const companyStartFrame = logoMoveEnd;
  const companyEndFrame = Math.floor(totalFrames * 0.85); // 45% for typing (85% total)
  const taglineStartFrame = Math.floor(totalFrames * 0.85);
  const taglineEndFrame = totalFrames;

  // Logo entrance (0 to 25% of duration) - Appears in CENTER with elegant fade
  const logoProgress = interpolate(
    frame,
    [0, logoEntranceEnd],
    [0, 1],
    {
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.16, 1, 0.3, 1), // Apple-style easing
    }
  );

  // Logo appears in CENTER - elegant scale and fade (NO balloon effect)
  const logoScale = interpolate(logoProgress, [0, 1], [0.7, 1]); // Subtle scale
  const logoOpacity = interpolate(logoProgress, [0, 0.5, 1], [0, 0.7, 1]); // Smooth fade

  // Logo moves up (25% to 40% of duration) - ONLY moves up after appearing
  const logoPushProgress = interpolate(
    frame,
    [logoEntranceEnd, logoMoveEnd],
    [0, 1],
    {
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Logo Y position: starts at 0 (center), then moves to -80
  const logoY = frame < logoEntranceEnd ? 0 : interpolate(logoPushProgress, [0, 1], [0, -80]);

  // Company name typing - DYNAMIC duration based on available time
  const companyAvailableFrames = companyEndFrame - companyStartFrame;
  const companyTypingDuration = Math.min(companyAvailableFrames, content.companyName.length * 2.5);
  const companyTypingProgress = getTypingProgress(frame, companyStartFrame, companyTypingDuration, 'linear');
  const companyOpacity = interpolate(frame, [companyStartFrame, companyStartFrame + 5], [0, 1], { extrapolateRight: 'clamp' });
  
  // Subtle slide up for company name
  const companyY = interpolate(frame, [companyStartFrame, companyStartFrame + 10], [20, 0], { 
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease)
  });

  // Typing sound plays during company name typing
  const isTyping = frame >= companyStartFrame && frame < (companyStartFrame + companyTypingDuration);

  // Tagline fade in (85% to 100% of duration)
  const taglineOpacity = content.tagline
    ? interpolate(frame, [taglineStartFrame, taglineEndFrame], [0, 1], { extrapolateRight: 'clamp' })
    : 0;
  
  const taglineY = content.tagline
    ? interpolate(frame, [taglineStartFrame, taglineStartFrame + 10], [15, 0], { 
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.ease)
      })
    : 0;

  return (
    <AbsoluteFill
      style={{
        background: style.base100 || '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: style.fontFamily || 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated elegant background pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle, ${style.baseContent || '#000'} 1.2px, transparent 1.2px)`,
          backgroundSize: '42px 42px',
          backgroundPosition: `${Math.sin(frame * 0.012) * 8}px ${Math.cos(frame * 0.012) * 8}px`,
          opacity: interpolate(frame, [0, 60, 120], [0.018, 0.035, 0.018], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          zIndex: 0,
        }}
      />
      {/* Animated corner accents */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          right: '10%',
          width: 170,
          height: 170,
          border: `3px solid ${style.primary || '#4b6bfb'}`,
          borderRadius: '50%',
          opacity: interpolate(frame, [0, 60, 120], [0.045, 0.09, 0.045], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${frame * 0.26}deg) scale(${1 + Math.sin(frame * 0.048) * 0.085})`,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '12%',
          left: '10%',
          width: 135,
          height: 135,
          border: `3px solid ${style.secondary || '#667eea'}`,
          borderRadius: '50%',
          opacity: interpolate(frame, [0, 60, 120], [0.045, 0.09, 0.045], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${-frame * 0.21}deg) scale(${1 + Math.cos(frame * 0.048) * 0.085})`,
          zIndex: 0,
        }}
      />
      
      {/* Typing Sound Effect - LOUDER and more audible */}
      {isTyping && (
        <Audio
          src="https://assets.mixkit.co/active_storage/sfx/2997/2997.wav"
          volume={0.4}
          playbackRate={2}
        />
      )}

      {/* Logo Container - Professional with shadow */}
      {content.logo && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, calc(-50% + ${logoY}px)) scale(${logoScale})`,
            opacity: logoOpacity,
            filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15))',
            transition: 'filter 0.3s ease',
            zIndex: 1,
          }}
        >
          <Img
            src={content.logo}
            style={{
              width: logoSize,
              height: logoSize,
              objectFit: 'contain',
            }}
          />
        </div>
      )}

      {/* Company Name - Professional with baseContent color for better contrast */}
      {frame >= companyStartFrame && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, calc(-50% + ${logoY + 220}px + ${companyY}px))`,
            fontSize: companyFontSize,
            fontWeight: 800,
            textAlign: 'center',
            opacity: companyOpacity,
            color: style.baseContent || '#1f2937',
            letterSpacing: -2,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            whiteSpace: 'nowrap',
            filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))',
            zIndex: 1,
          }}
        >
          {getTypedText({
            text: content.companyName,
            progress: companyTypingProgress,
          })}
        </div>
      )}

      {/* Tagline - Elegant and subtle */}
      {content.tagline && frame >= taglineStartFrame && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, calc(-50% + ${logoY + 300}px + ${taglineY}px))`,
            fontSize: taglineFontSize,
            fontWeight: 500,
            textAlign: 'center',
            opacity: taglineOpacity,
            color: style.neutralContent || '#666',
            letterSpacing: 1,
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            zIndex: 1,
          }}
        >
          {content.tagline}
        </div>
      )}
    </AbsoluteFill>
  );
};
