import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing
} from 'remotion';
import { EnhancedColorScheme } from './types';

// 1. Minimal Title Scene - Cinematic Apple/Nike Style
export const MinimalTitleScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  
  // Responsive sizing - MUCH LARGER for dramatic impact
  const baseFontSize = width >= 3840 ? 1 : width >= 1920 ? 0.8 : 0.6;
  const titleSize = (content.fontSize || 140) * baseFontSize; // Increased from 96
  const subtitleSize = 48 * baseFontSize; // Increased from 36
  const superTitleSize = 24 * baseFontSize; // Increased from 20
  
  // Cinematic entrance - dramatic scale + fade + blur
  const titleScale = spring({
    frame: frame - 5,
    fps: 30,
    config: {
      damping: 100,
      stiffness: 200,
      mass: 1.5,
    },
  });
  
  const titleOpacity = interpolate(frame, [0, 35], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.19, 1, 0.22, 1), // Apple's signature easing
  });
  
  const titleBlur = interpolate(frame, [0, 25], [15, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.exp),
  });
  
  // Parallax effect - title and subtitle move at different speeds
  const titleY = interpolate(frame, [0, 40], [80, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  
  // Subtitle with dramatic delay and different movement
  const subtitleOpacity = interpolate(frame, [25, 60], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });
  
  const subtitleScale = spring({
    frame: frame - 30,
    fps: 30,
    config: {
      damping: 100,
      stiffness: 180,
      mass: 1.2,
    },
  });
  
  const subtitleY = interpolate(frame, [25, 65], [60, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  
  // Super title - quick fade with tracking animation
  const superTitleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });
  
  const superTitleTracking = interpolate(frame, [0, 25], [8, 6], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });
  
  // Background subtle animation
  const bgOpacity = interpolate(frame, [0, 30], [0, 0.03], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: style.base100,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: style.fontFamily,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Flowing horizontal lines background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(0deg, ${style.baseContent} 0, ${style.baseContent} 1px, transparent 0, transparent 60px)`,
          backgroundPosition: `0 ${frame * 0.2}px`,
          opacity: interpolate(frame, [0, 60, 120], [0.025, 0.04, 0.025], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          zIndex: 0,
        }}
      />
      {/* Multiple animated squares - top left */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          width: 120,
          height: 120,
          border: `3px solid ${style.primary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.06, 0.12, 0.06], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${frame * 0.3}deg) scale(${1 + Math.sin(frame * 0.04) * 0.1})`,
          zIndex: 0,
        }}
      />
      {/* Top right square */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '8%',
          width: 90,
          height: 90,
          border: `3px solid ${style.secondary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.05, 0.10, 0.05], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${45 + frame * 0.35}deg) scale(${1 + Math.sin(frame * 0.05) * 0.12})`,
          zIndex: 0,
        }}
      />
      {/* Bottom left square */}
      <div
        style={{
          position: 'absolute',
          bottom: '18%',
          left: '8%',
          width: 80,
          height: 80,
          border: `3px solid ${style.accent}`,
          opacity: interpolate(frame, [0, 60, 120], [0.05, 0.11, 0.05], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${-frame * 0.28}deg) scale(${1 + Math.cos(frame * 0.045) * 0.11})`,
          zIndex: 0,
        }}
      />
      {/* Bottom right square */}
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '5%',
          width: 100,
          height: 100,
          border: `3px solid ${style.primary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.06, 0.12, 0.06], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${-frame * 0.25}deg) scale(${1 + Math.cos(frame * 0.04) * 0.1})`,
          zIndex: 0,
        }}
      />
      {/* Center top small square */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          width: 70,
          height: 70,
          border: `2px solid ${style.accent}`,
          opacity: interpolate(frame, [0, 60, 120], [0.04, 0.09, 0.04], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `translateX(-50%) rotate(${45 - frame * 0.32}deg) scale(${1 + Math.sin(frame * 0.06) * 0.13})`,
          zIndex: 0,
        }}
      />
      {/* Center bottom small square */}
      <div
        style={{
          position: 'absolute',
          bottom: '12%',
          left: '50%',
          width: 65,
          height: 65,
          border: `2px solid ${style.secondary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.04, 0.08, 0.04], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `translateX(-50%) rotate(${frame * 0.27}deg) scale(${1 + Math.cos(frame * 0.055) * 0.12})`,
          zIndex: 0,
        }}
      />
      
      <div
        style={{
          textAlign: 'center',
          maxWidth: '95%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Super title - minimal and refined */}
        {content.superTitle && (
          <div
            style={{
              fontSize: superTitleSize,
              letterSpacing: superTitleTracking,
              textTransform: 'uppercase',
              color: style.accent,
              marginBottom: 40,
              fontWeight: 700,
              opacity: superTitleOpacity,
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            }}
          >
            {content.superTitle}
          </div>
        )}
        
        {/* Main title - DRAMATIC and BOLD */}
        <h1
          style={{
            fontSize: titleSize,
            fontWeight: content.fontWeight || 900, // Even bolder
            color: style.baseContent,
            margin: 0,
            letterSpacing: -4, // Tighter for dramatic effect
            lineHeight: 0.95,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px) scale(${titleScale})`,
            filter: `blur(${titleBlur}px)`,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility',
          }}
        >
          {content.title}
        </h1>
        
        {/* Subtitle - elegant and supportive */}
        {content.subtitle && (
          <p
            style={{
              fontSize: subtitleSize,
              color: style.neutral,
              marginTop: 50,
              fontWeight: 500,
              letterSpacing: -1,
              lineHeight: 1.3,
              opacity: subtitleOpacity,
              transform: `translateY(${subtitleY}px) scale(${subtitleScale})`,
              maxWidth: '80%',
              margin: '50px auto 0',
            }}
          >
            {content.subtitle}
          </p>
        )}
      </div>
    </AbsoluteFill>
  );
};

// 2. Split Screen Scene - Cinematic Wipe Reveal
export const SplitScreenScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  
  // Responsive sizing - BOLD typography
  const baseFontSize = width >= 3840 ? 1 : width >= 1920 ? 0.8 : 0.6;
  const titleSize = 90 * baseFontSize; // Increased from 64
  const textSize = 40 * baseFontSize; // Increased from 32
  const padding = 100 * baseFontSize; // More generous
  
  // Dramatic wipe reveal - starts from center
  const leftReveal = interpolate(frame, [0, 45], [50, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.87, 0, 0.13, 1), // Power4.inOut for drama
  });
  
  const rightReveal = interpolate(frame, [0, 45], [50, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.87, 0, 0.13, 1),
  });
  
  // Image zoom effect - Ken Burns style
  const imageScale = interpolate(frame, [0, 120], [1.15, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  
  // Content animations - staggered entrance
  const titleOpacity = interpolate(frame, [30, 55], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });
  
  const titleY = interpolate(frame, [30, 60], [50, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  
  const textOpacity = interpolate(frame, [45, 70], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });
  
  const textY = interpolate(frame, [45, 75], [40, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  
  // Divider line animation
  const dividerHeight = interpolate(frame, [35, 50], [0, 100], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill 
      style={{
        flexDirection: 'row', 
        fontFamily: style.fontFamily,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Left Panel - Dramatic wipe from center */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '50%',
          background: style.primary,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          clipPath: `inset(0 ${leftReveal}% 0 0)`,
          overflow: 'hidden',
        }}
      >
        {content.leftImage ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              transform: `scale(${imageScale})`,
              transformOrigin: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: style.base200 || '#f5f5f5',
            }}
          >
            <Img 
              src={content.leftImage} 
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
              }} 
            />
          </div>
        ) : (
          <div style={{
            padding: padding, 
            color: style.primaryContent,
            maxWidth: '80%',
            position: 'relative',
          }}>
            <h2 style={{
              fontSize: titleSize, 
              marginBottom: 35,
              fontWeight: 900, // Bolder
              letterSpacing: -3,
              lineHeight: 0.95,
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            }}>
              {content.leftTitle}
            </h2>
            <p style={{
              fontSize: textSize, 
              opacity: textOpacity * 0.95,
              lineHeight: 1.4,
              fontWeight: 500,
              letterSpacing: -0.5,
              transform: `translateY(${textY}px)`,
            }}>
              {content.leftText}
            </p>
          </div>
        )}
      </div>
      
      {/* Center divider - animated line */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 2,
          height: `${dividerHeight}%`,
          background: style.accent,
          opacity: 0.4,
          zIndex: 10,
        }}
      />
      
      {/* Right Panel - Dramatic wipe from center */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '50%',
          background: style.base100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          clipPath: `inset(0 0 0 ${rightReveal}%)`,
          overflow: 'hidden',
        }}
      >
        {content.rightImage ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              transform: `scale(${imageScale})`,
              transformOrigin: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: style.base200 || '#f5f5f5',
            }}
          >
            <Img 
              src={content.rightImage} 
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
              }} 
            />
          </div>
        ) : (
          <div style={{
            padding: padding,
            maxWidth: '80%',
            position: 'relative',
          }}>
            <h2 style={{
              fontSize: titleSize, 
              color: style.baseContent, 
              marginBottom: 35,
              fontWeight: 900, // Bolder
              letterSpacing: -3,
              lineHeight: 0.95,
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            }}>
              {content.rightTitle}
            </h2>
            <p style={{
              fontSize: textSize, 
              color: style.neutral,
              lineHeight: 1.4,
              fontWeight: 500,
              letterSpacing: -0.5,
              opacity: textOpacity,
              transform: `translateY(${textY}px)`,
            }}>
              {content.rightText}
            </p>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// 3. Statistics Dashboard Scene - Cinematic Impact
export const StatsDashboardScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {fps, width} = useVideoConfig();
  const stats = content.stats || [];
  
  // Responsive sizing
  const baseFontSize = width >= 3840 ? 1 : width >= 1920 ? 0.8 : 0.6;
  const titleSize = 80 * baseFontSize;
  const valueSize = 96 * baseFontSize; // For stat values
  const labelSize = 28 * baseFontSize; // For stat labels
  const iconSize = 60 * baseFontSize; // For stat icons
  
  // Title entrance
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });
  
  const titleY = interpolate(frame, [0, 35], [40, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        background: style.base100,
        padding: 80,
        fontFamily: style.fontFamily,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Flowing horizontal lines background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(0deg, ${style.baseContent} 0, ${style.baseContent} 1px, transparent 0, transparent 60px)`,
          backgroundPosition: `0 ${frame * 0.2}px`,
          opacity: interpolate(frame, [0, 60, 120], [0.025, 0.04, 0.025], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          zIndex: 0,
        }}
      />
      {/* Multiple animated squares - top left */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          width: 120,
          height: 120,
          border: `3px solid ${style.primary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.06, 0.12, 0.06], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${frame * 0.3}deg) scale(${1 + Math.sin(frame * 0.04) * 0.1})`,
          zIndex: 0,
        }}
      />
      {/* Top right square */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '8%',
          width: 90,
          height: 90,
          border: `3px solid ${style.secondary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.05, 0.10, 0.05], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${45 + frame * 0.35}deg) scale(${1 + Math.sin(frame * 0.05) * 0.12})`,
          zIndex: 0,
        }}
      />
      {/* Bottom left square */}
      <div
        style={{
          position: 'absolute',
          bottom: '18%',
          left: '8%',
          width: 80,
          height: 80,
          border: `3px solid ${style.accent}`,
          opacity: interpolate(frame, [0, 60, 120], [0.05, 0.11, 0.05], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${-frame * 0.28}deg) scale(${1 + Math.cos(frame * 0.045) * 0.11})`,
          zIndex: 0,
        }}
      />
      {/* Bottom right square */}
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '5%',
          width: 100,
          height: 100,
          border: `3px solid ${style.primary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.06, 0.12, 0.06], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${-frame * 0.25}deg) scale(${1 + Math.cos(frame * 0.04) * 0.1})`,
          zIndex: 0,
        }}
      />
      {/* Center top small square */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          width: 70,
          height: 70,
          border: `2px solid ${style.accent}`,
          opacity: interpolate(frame, [0, 60, 120], [0.04, 0.09, 0.04], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `translateX(-50%) rotate(${45 - frame * 0.32}deg) scale(${1 + Math.sin(frame * 0.06) * 0.13})`,
          zIndex: 0,
        }}
      />
      {/* Center bottom small square */}
      <div
        style={{
          position: 'absolute',
          bottom: '12%',
          left: '50%',
          width: 65,
          height: 65,
          border: `2px solid ${style.secondary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.04, 0.08, 0.04], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `translateX(-50%) rotate(${frame * 0.27}deg) scale(${1 + Math.cos(frame * 0.055) * 0.12})`,
          zIndex: 0,
        }}
      />
      
      {content.title && (
        <h2
          style={{
            fontSize: titleSize,
            color: style.baseContent,
            textAlign: 'center',
            marginBottom: 100,
            fontWeight: 900, // Bolder
            letterSpacing: -3,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {content.title}
        </h2>
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 80,
          maxWidth: '1200px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {stats.map((stat: any, i: number) => {
          const delay = 20 + i * 15; // Start after title
          
          // Dramatic spring entrance
          const scale = spring({
            fps,
            frame: frame - delay,
            config: {
              damping: 100,
              stiffness: 180,
              mass: 1.2,
            },
          });
          
          // Opacity fade
          const opacity = interpolate(
            frame,
            [delay, delay + 25],
            [0, 1],
            {
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.19, 1, 0.22, 1),
            }
          );
          
          // Blur reveal for numbers
          const blur = interpolate(
            frame,
            [delay, delay + 20],
            [8, 0],
            {
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.exp),
            }
          );
          
          // Display value directly if it's a string, otherwise animate count-up
          const displayValue = typeof stat.value === 'string' 
            ? stat.value 
            : Math.floor(interpolate(
                frame,
                [delay, delay + 40],
                [0, stat.value || 100],
                { 
                  extrapolateRight: 'clamp',
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                }
              ));
          
          const y = interpolate(frame, [delay, delay + 20], [20, 0], {
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          
          return (
            <div
              key={i}
              style={{
                transform: `scale(${scale})`,
                textAlign: 'center',
                opacity,
                background: style.base200,
                borderRadius: 24,
                padding: '50px 40px', // Increased padding to fit text
                border: `3px solid ${style.base300}`,
                position: 'relative',
                overflow: 'visible', // Changed to visible to prevent text cutoff
                minWidth: '280px', // Ensure minimum width for text
              }}
            >
              {/* Removed gradient glow effect per DESIGN.md */}
              
              <div
                style={{
                  fontSize: iconSize,
                  marginBottom: 25,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: iconSize,
                }}
              >
                {stat.icon}
              </div>
              <div
                style={{
                  fontSize: valueSize,
                  fontWeight: 900, // Maximum boldness
                  color: style.primary,
                  marginBottom: 15,
                  letterSpacing: -2,
                  filter: `blur(${blur}px)`,
                  transform: `translateY(${-y}px)`,
                  textShadow: `0 0 20px ${style.primary}30`,
                }}
              >
                {displayValue}
              </div>
              <div
                style={{
                  fontSize: labelSize,
                  color: style.baseContent,
                  fontWeight: 700,
                  letterSpacing: -0.5,
                  opacity: 0.9,
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// 4. Testimonial Scene - Cinematic Design
export const TestimonialScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {width} = useVideoConfig();
  
  // Responsive sizing
  const baseFontSize = width >= 3840 ? 1 : width >= 1920 ? 0.8 : 0.6;
  const quoteSize = 48 * baseFontSize;
  const authorSize = 32 * baseFontSize;
  const roleSize = 24 * baseFontSize;
  const avatarSize = 120 * baseFontSize;
  
  // Quote mark entrance with rotation
  const quoteMarkOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });
  
  const quoteMarkScale = spring({
    frame: frame,
    fps: 30,
    config: {
      damping: 100,
      stiffness: 150,
      mass: 1.5,
    },
  });
  
  // Add rotation effect
  const quoteRotation = interpolate(frame, [0, 30], [-180, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });
  
  // Quote text entrance with blur
  const quoteOpacity = interpolate(frame, [10, 40], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });
  
  const quoteBlur = interpolate(frame, [10, 35], [10, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.exp),
  });
  
  const quoteY = interpolate(frame, [10, 45], [50, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  
  // Avatar entrance
  const avatarScale = spring({
    frame: frame - 35,
    fps: 30,
    config: {
      damping: 100,
      stiffness: 180,
      mass: 1.2,
    },
  });
  
  const avatarOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });
  
  // Author info entrance
  const authorOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });
  
  const authorY = interpolate(frame, [50, 75], [30, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        background: style.base100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
        fontFamily: style.fontFamily,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Flowing horizontal lines background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(0deg, ${style.baseContent} 0, ${style.baseContent} 1px, transparent 0, transparent 60px)`,
          backgroundPosition: `0 ${frame * 0.2}px`,
          opacity: interpolate(frame, [0, 60, 120], [0.025, 0.04, 0.025], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          zIndex: 0,
        }}
      />
      {/* Elegant quote-themed background with subtle rotation */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: interpolate(frame, [0, 60, 120], [0.015, 0.025, 0.015], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          fontSize: 400,
          color: style.accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 900,
          transform: `rotate(${Math.sin(frame * 0.02) * 3}deg) scale(${1 + Math.sin(frame * 0.03) * 0.05})`,
          zIndex: 0,
        }}
      >
        &ldquo;
      </div>
      {/* Multiple animated squares - top left */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          width: 120,
          height: 120,
          border: `3px solid ${style.primary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.06, 0.12, 0.06], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${frame * 0.3}deg) scale(${1 + Math.sin(frame * 0.04) * 0.1})`,
          zIndex: 0,
        }}
      />
      {/* Top right square */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '8%',
          width: 90,
          height: 90,
          border: `3px solid ${style.secondary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.05, 0.10, 0.05], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${45 + frame * 0.35}deg) scale(${1 + Math.sin(frame * 0.05) * 0.12})`,
          zIndex: 0,
        }}
      />
      {/* Bottom left square */}
      <div
        style={{
          position: 'absolute',
          bottom: '18%',
          left: '8%',
          width: 80,
          height: 80,
          border: `3px solid ${style.accent}`,
          opacity: interpolate(frame, [0, 60, 120], [0.05, 0.11, 0.05], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${-frame * 0.28}deg) scale(${1 + Math.cos(frame * 0.045) * 0.11})`,
          zIndex: 0,
        }}
      />
      {/* Bottom right square */}
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '5%',
          width: 100,
          height: 100,
          border: `3px solid ${style.primary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.06, 0.12, 0.06], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${-frame * 0.25}deg) scale(${1 + Math.cos(frame * 0.04) * 0.1})`,
          zIndex: 0,
        }}
      />
      {/* Center top small square */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          width: 70,
          height: 70,
          border: `2px solid ${style.accent}`,
          opacity: interpolate(frame, [0, 60, 120], [0.04, 0.09, 0.04], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `translateX(-50%) rotate(${45 - frame * 0.32}deg) scale(${1 + Math.sin(frame * 0.06) * 0.13})`,
          zIndex: 0,
        }}
      />
      {/* Center bottom small square */}
      <div
        style={{
          position: 'absolute',
          bottom: '12%',
          left: '50%',
          width: 65,
          height: 65,
          border: `2px solid ${style.secondary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.04, 0.08, 0.04], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `translateX(-50%) rotate(${frame * 0.27}deg) scale(${1 + Math.cos(frame * 0.055) * 0.12})`,
          zIndex: 0,
        }}
      />
      
      <div
        style={{
          maxWidth: 1000,
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Dramatic opening quote mark with rotation and glow */}
        <div
          style={{
            fontSize: 140,
            color: style.accent,
            marginBottom: -20,
            opacity: quoteMarkOpacity,
            transform: `scale(${quoteMarkScale}) rotate(${quoteRotation}deg)`,
            lineHeight: 1,
            textShadow: `0 0 30px ${style.accent}60, 0 0 60px ${style.accent}30`,
            display: 'inline-block',
          }}
        >
          &ldquo;
        </div>
        {/* Quote text with blur reveal */}
        <p
          style={{
            fontSize: quoteSize,
            color: style.baseContent,
            lineHeight: 1.5,
            fontWeight: 500,
            fontStyle: 'italic',
            marginBottom: 60,
            opacity: quoteOpacity,
            transform: `translateY(${quoteY}px)`,
            filter: `blur(${quoteBlur}px)`,
            letterSpacing: -0.5,
          }}
        >
          {content.quote}
        </p>
        {/* Avatar with dramatic spring entrance */}
        {content.avatar && (
          <Img
            src={content.avatar}
            style={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: '50%',
              marginBottom: 30,
              opacity: avatarOpacity,
              transform: `scale(${avatarScale})`,
              border: `4px solid ${style.base300}`,
            }}
          />
        )}
        {/* Author name with staggered entrance */}
        <div
          style={{
            fontSize: authorSize,
            color: style.baseContent,
            fontWeight: 700,
            letterSpacing: -1,
            opacity: authorOpacity,
            transform: `translateY(${authorY}px)`,
          }}
        >
          {content.author}
        </div>
        {/* Role with animation */}
        {content.role && (
          <div
            style={{
              fontSize: roleSize,
              color: style.neutral,
              marginTop: 12,
              fontWeight: 500,
              letterSpacing: -0.3,
              opacity: authorOpacity,
              transform: `translateY(${authorY}px)`,
            }}
          >
            {content.role}
          </div>
        )}
        {/* Rating stars with staggered animation */}
        {content.rating && (
          <div
            style={{
              marginTop: 30,
              fontSize: 36,
              opacity: authorOpacity,
            }}
          >
            {'⭐'.repeat(content.rating)}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// 5. Timeline Scene - Cinematic Journey
export const TimelineScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {width} = useVideoConfig();
  const events = content.events || [];
  
  // Responsive sizing
  const baseFontSize = width >= 3840 ? 1 : width >= 1920 ? 0.8 : 0.6;
  const titleSize = 80 * baseFontSize;
  const dateSize = 24 * baseFontSize;
  const eventTitleSize = 36 * baseFontSize;
  const dotSize = 28 * baseFontSize;
  
  // Title entrance
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });
  
  const titleY = interpolate(frame, [0, 35], [40, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  
  // Central line reveal
  const lineHeight = interpolate(frame, [20, 60], [0, 100], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        background: style.base100,
        padding: 60,
        fontFamily: style.fontFamily,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Flowing horizontal lines background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(0deg, ${style.baseContent} 0, ${style.baseContent} 1px, transparent 0, transparent 60px)`,
          backgroundPosition: `0 ${frame * 0.2}px`,
          opacity: interpolate(frame, [0, 60, 120], [0.025, 0.04, 0.025], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          zIndex: 0,
        }}
      />
      {/* Multiple animated squares - top left */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          width: 120,
          height: 120,
          border: `3px solid ${style.primary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.06, 0.12, 0.06], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${frame * 0.3}deg) scale(${1 + Math.sin(frame * 0.04) * 0.1})`,
          zIndex: 0,
        }}
      />
      {/* Top right square */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '8%',
          width: 90,
          height: 90,
          border: `3px solid ${style.secondary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.05, 0.10, 0.05], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${45 + frame * 0.35}deg) scale(${1 + Math.sin(frame * 0.05) * 0.12})`,
          zIndex: 0,
        }}
      />
      {/* Bottom left square */}
      <div
        style={{
          position: 'absolute',
          bottom: '18%',
          left: '8%',
          width: 80,
          height: 80,
          border: `3px solid ${style.accent}`,
          opacity: interpolate(frame, [0, 60, 120], [0.05, 0.11, 0.05], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${-frame * 0.28}deg) scale(${1 + Math.cos(frame * 0.045) * 0.11})`,
          zIndex: 0,
        }}
      />
      {/* Bottom right square */}
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '5%',
          width: 100,
          height: 100,
          border: `3px solid ${style.primary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.06, 0.12, 0.06], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${-frame * 0.25}deg) scale(${1 + Math.cos(frame * 0.04) * 0.1})`,
          zIndex: 0,
        }}
      />
      {/* Center top small square */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          width: 70,
          height: 70,
          border: `2px solid ${style.accent}`,
          opacity: interpolate(frame, [0, 60, 120], [0.04, 0.09, 0.04], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `translateX(-50%) rotate(${45 - frame * 0.32}deg) scale(${1 + Math.sin(frame * 0.06) * 0.13})`,
          zIndex: 0,
        }}
      />
      {/* Center bottom small square */}
      <div
        style={{
          position: 'absolute',
          bottom: '12%',
          left: '50%',
          width: 65,
          height: 65,
          border: `2px solid ${style.secondary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.04, 0.08, 0.04], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `translateX(-50%) rotate(${frame * 0.27}deg) scale(${1 + Math.cos(frame * 0.055) * 0.12})`,
          zIndex: 0,
        }}
      />
      
      {content.title && (
        <h2
          style={{
            fontSize: titleSize,
            color: style.baseContent,
            textAlign: 'center',
            marginBottom: 80,
            fontWeight: 900,
            letterSpacing: -3,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {content.title}
        </h2>
      )}
      <div style={{position: 'relative', maxWidth: 1200, margin: '0 auto', width: '100%'}}>
        {/* Animated central timeline line */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            height: `${lineHeight}%`,
            width: 4,
            background: style.primary,
            transform: 'translateX(-50%)',
            borderRadius: 2,
          }}
        />
        {events.map((event: any, i: number) => {
          const delay = 30 + i * 25; // Start after line reveal
          
          // Dramatic slide with better easing
          const slideIn = interpolate(
            frame,
            [delay, delay + 30],
            [80, 0],
            {
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }
          );
          
          const opacity = interpolate(
            frame,
            [delay, delay + 30],
            [0, 1],
            {
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.19, 1, 0.22, 1),
            }
          );
          
          // Blur reveal effect
          const blur = interpolate(
            frame,
            [delay, delay + 25],
            [6, 0],
            {
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.exp),
            }
          );
          
          // Dot scale animation
          const dotScale = spring({
            frame: frame - delay,
            fps: 30,
            config: {
              damping: 100,
              stiffness: 200,
              mass: 1,
            },
          });
          
          const isLeft = i % 2 === 0;
          
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 80,
                opacity,
                transform: `translateX(${isLeft ? -slideIn : slideIn}px)`,
                filter: `blur(${blur}px)`,
              }}
            >
              <div
                style={{
                  flex: 1,
                  textAlign: isLeft ? 'right' : 'left',
                  paddingRight: isLeft ? 40 : 0,
                  paddingLeft: isLeft ? 0 : 40,
                }}
              >
                {isLeft && (
                  <>
                    <div style={{
                      fontSize: dateSize, 
                      color: style.primary, 
                      fontWeight: 700,
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                    }}>
                      {event.date}
                    </div>
                    <div style={{
                      fontSize: eventTitleSize, 
                      color: style.baseContent, 
                      marginTop: 12,
                      fontWeight: 700,
                      letterSpacing: -1,
                      lineHeight: 1.2,
                    }}>
                      {event.title}
                    </div>
                  </>
                )}
              </div>
              {/* Animated center dot */}
              <div
                style={{
                  width: dotSize,
                  height: dotSize,
                  borderRadius: '50%',
                  background: style.primary,
                  border: `6px solid ${style.base100}`,
                  zIndex: 1,
                  transform: `scale(${dotScale})`,
                  boxShadow: `0 0 0 4px ${style.base200}`,
                }}
              />
              <div
                style={{
                  flex: 1,
                  textAlign: isLeft ? 'left' : 'right',
                  paddingLeft: isLeft ? 40 : 0,
                  paddingRight: isLeft ? 0 : 40,
                }}
              >
                {!isLeft && (
                  <>
                    <div style={{
                      fontSize: dateSize, 
                      color: style.primary, 
                      fontWeight: 700,
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                    }}>
                      {event.date}
                    </div>
                    <div style={{
                      fontSize: eventTitleSize, 
                      color: style.baseContent, 
                      marginTop: 12,
                      fontWeight: 700,
                      letterSpacing: -1,
                      lineHeight: 1.2,
                    }}>
                      {event.title}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// 6. Pricing Cards Scene - Cinematic Pricing
export const PricingCardsScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {fps, width} = useVideoConfig();
  const plans = content.plans || [];
  
  // Responsive sizing - EVEN LARGER for better readability
  const baseFontSize = width >= 3840 ? 1 : width >= 1920 ? 0.8 : 0.6;
  const singleCardMultiplier = plans.length === 1 ? 1.25 : 1;
  const titleSize = 96 * baseFontSize;
  const planNameSize = 64 * baseFontSize * singleCardMultiplier; // Increased from 48
  const priceSize = 140 * baseFontSize * singleCardMultiplier; // Increased from 120
  const periodSize = 32 * baseFontSize * singleCardMultiplier; // Increased from 28
  const featureSize = 28 * baseFontSize * singleCardMultiplier; // Increased from 24
  const badgeSize = 20 * baseFontSize * singleCardMultiplier; // Increased from 16
  const cardWidth = plans.length === 1 ? 650 * baseFontSize : 420 * baseFontSize;
  const cardPadding = plans.length === 1 ? 80 * baseFontSize : 60 * baseFontSize;
  
  // Title entrance
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });
  
  const titleY = interpolate(frame, [0, 35], [40, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        background: style.base100,
        padding: 60,
        fontFamily: style.fontFamily,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Flowing horizontal lines background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(0deg, ${style.baseContent} 0, ${style.baseContent} 1px, transparent 0, transparent 60px)`,
          backgroundPosition: `0 ${frame * 0.2}px`,
          opacity: interpolate(frame, [0, 60, 120], [0.025, 0.04, 0.025], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          zIndex: 0,
        }}
      />
      {/* Multiple animated squares - top left */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          width: 120,
          height: 120,
          border: `3px solid ${style.primary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.06, 0.12, 0.06], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${frame * 0.3}deg) scale(${1 + Math.sin(frame * 0.04) * 0.1})`,
          zIndex: 0,
        }}
      />
      {/* Top right square */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '8%',
          width: 90,
          height: 90,
          border: `3px solid ${style.secondary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.05, 0.10, 0.05], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${45 + frame * 0.35}deg) scale(${1 + Math.sin(frame * 0.05) * 0.12})`,
          zIndex: 0,
        }}
      />
      {/* Bottom left square */}
      <div
        style={{
          position: 'absolute',
          bottom: '18%',
          left: '8%',
          width: 80,
          height: 80,
          border: `3px solid ${style.accent}`,
          opacity: interpolate(frame, [0, 60, 120], [0.05, 0.11, 0.05], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${-frame * 0.28}deg) scale(${1 + Math.cos(frame * 0.045) * 0.11})`,
          zIndex: 0,
        }}
      />
      {/* Bottom right square */}
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '5%',
          width: 100,
          height: 100,
          border: `3px solid ${style.primary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.06, 0.12, 0.06], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${-frame * 0.25}deg) scale(${1 + Math.cos(frame * 0.04) * 0.1})`,
          zIndex: 0,
        }}
      />
      {/* Center top small square */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          width: 70,
          height: 70,
          border: `2px solid ${style.accent}`,
          opacity: interpolate(frame, [0, 60, 120], [0.04, 0.09, 0.04], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `translateX(-50%) rotate(${45 - frame * 0.32}deg) scale(${1 + Math.sin(frame * 0.06) * 0.13})`,
          zIndex: 0,
        }}
      />
      {/* Center bottom small square */}
      <div
        style={{
          position: 'absolute',
          bottom: '12%',
          left: '50%',
          width: 65,
          height: 65,
          border: `2px solid ${style.secondary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.04, 0.08, 0.04], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `translateX(-50%) rotate(${frame * 0.27}deg) scale(${1 + Math.cos(frame * 0.055) * 0.12})`,
          zIndex: 0,
        }}
      />
      
      {content.title && (
        <h2
          style={{
            fontSize: titleSize,
            color: style.baseContent,
            textAlign: 'center',
            marginBottom: 80,
            fontWeight: 900,
            letterSpacing: -3,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {content.title}
        </h2>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 60,
          alignItems: 'stretch',
          width: '100%',
          maxWidth: plans.length === 1 ? '1100px' : '1600px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {plans.map((plan: any, i: number) => {
          const delay = 25 + i * 15; // Start after title
          
          // Dramatic spring entrance
          const scale = spring({
            fps,
            frame: frame - delay,
            config: {
              damping: 100,
              stiffness: 180,
              mass: 1.3,
            },
          });
          
          // Opacity fade
          const opacity = interpolate(
            frame,
            [delay, delay + 30],
            [0, 1],
            {
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.19, 1, 0.22, 1),
            }
          );
          
          // Blur reveal
          const blur = interpolate(
            frame,
            [delay, delay + 25],
            [8, 0],
            {
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.exp),
            }
          );
          
          // Y movement
          const cardY = interpolate(
            frame,
            [delay, delay + 35],
            [60, 0],
            {
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }
          );
          
          const featured = plan.featured;
          
          // Featured card gets extra scale and glow effect
          const featuredScale = featured ? interpolate(
            frame,
            [delay + 35, delay + 50],
            [1, 1.08],
            {
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }
          ) : 1;
          
          // Glow intensity for featured card
          const glowIntensity = featured ? interpolate(
            frame,
            [delay + 40, delay + 60],
            [0, 1],
            {
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.ease),
            }
          ) : 0;
          
          // Subtle continuous pulse for featured card
          const pulse = featured ? Math.sin((frame - delay) * 0.08) * 0.02 + 1 : 1;
          
          return (
            <div
              key={i}
              style={{
                width: cardWidth,
                minHeight: '700px', // Increased from 600px
                background: featured ? style.primary : style.base200,
                borderRadius: 32, // Slightly larger radius
                padding: cardPadding,
                border: featured ? 'none' : `3px solid ${style.base300}`,
                transform: `scale(${scale * featuredScale}) translateY(${cardY}px)`,
                opacity,
                filter: `blur(${blur}px)`,
                boxShadow: featured ? `0 0 ${30 * glowIntensity}px ${style.primary}40, 0 30px 60px rgba(0,0,0,0.3)` : 'none',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Popular ribbon for featured cards */}
              {featured && (
                <div
                  style={{
                    position: 'absolute',
                    top: 20,
                    right: -10,
                    background: style.accent,
                    color: style.accentContent,
                    padding: '8px 20px',
                    fontSize: 14,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    transform: 'rotate(3deg)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  }}
                >
                  Most Popular
                </div>
              )}
              
              {plan.badge && !featured && (
                <div
                  style={{
                    background: style.accent,
                    color: style.accentContent,
                    padding: '8px 16px',
                    borderRadius: 20,
                    fontSize: badgeSize,
                    fontWeight: 700,
                    display: 'inline-block',
                    marginBottom: 25,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    alignSelf: 'flex-start',
                  }}
                >
                  {plan.badge}
                </div>
              )}
              
              {/* Plan name with proper spacing */}
              <div
                style={{
                  fontSize: planNameSize,
                  color: featured ? style.primaryContent : style.baseContent,
                  fontWeight: 900,
                  marginBottom: 15,
                  marginTop: featured ? 50 : 20, // Extra space for ribbon
                  letterSpacing: -1.5,
                  lineHeight: 1.1,
                  textAlign: 'center',
                }}
              >
                {plan.name}
              </div>
              {/* Price with center alignment */}
              <div
                style={{
                  fontSize: priceSize,
                  color: featured ? style.primaryContent : style.primary,
                  fontWeight: 900,
                  marginBottom: 8,
                  letterSpacing: -4,
                  lineHeight: 0.9,
                  textAlign: 'center',
                }}
              >
                {plan.price}
              </div>
              
              {/* Period with center alignment */}
              <div
                style={{
                  fontSize: periodSize,
                  color: featured ? style.primaryContent : style.neutral,
                  opacity: featured ? 0.85 : 0.7,
                  marginBottom: 40,
                  fontWeight: 500,
                  letterSpacing: -0.5,
                  textAlign: 'center',
                }}
              >
                {plan.period}
              </div>
              
              {/* Separator line */}
              <div
                style={{
                  width: '100%',
                  height: 1,
                  background: featured ? style.primaryContent : style.base300,
                  opacity: 0.3,
                  marginBottom: 30,
                }}
              />
              
              {/* Feature list */}
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  flex: 1,
                }}
              >
                {plan.features?.map((feature: string, j: number) => (
                  <li
                    key={j}
                    style={{
                      fontSize: featureSize,
                      color: featured ? style.primaryContent : style.baseContent,
                      opacity: featured ? 0.95 : 0.9,
                      marginBottom: 22,
                      display: 'flex',
                      alignItems: 'flex-start',
                      lineHeight: 1.5,
                      fontWeight: 500,
                    }}
                  >
                    <span style={{
                      marginRight: 14, 
                      color: featured ? style.primaryContent : style.primary,
                      fontSize: 28,
                      fontWeight: 800,
                      lineHeight: 1,
                    }}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* Call-to-action button */}
              <div
                style={{
                  marginTop: 30,
                  padding: '16px 32px',
                  background: featured ? style.primaryContent : style.primary,
                  color: featured ? style.primary : style.primaryContent,
                  borderRadius: 12,
                  fontSize: 18,
                  fontWeight: 700,
                  textAlign: 'center',
                  cursor: 'pointer',
                  border: `2px solid ${featured ? style.primaryContent : style.primary}`,
                }}
              >
                {featured ? 'Start Free Trial' : 'Get Started'}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// 7. Icon Grid Scene - Cinematic Grid
export const IconGridScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {fps, width} = useVideoConfig();
  const items = content.items || [];
  
  // Responsive sizing
  const baseFontSize = width >= 3840 ? 1 : width >= 1920 ? 0.8 : 0.6;
  const titleSize = 96 * baseFontSize;
  const iconSize = 120 * baseFontSize; // Much larger icons
  const itemTitleSize = 32 * baseFontSize; // Larger titles
  const descSize = 20 * baseFontSize; // Larger descriptions
  const iconFontSize = 64 * baseFontSize; // Larger icon fonts
  
  // Title entrance
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });
  
  const titleY = interpolate(frame, [0, 35], [40, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        background: style.base100,
        padding: 80,
        fontFamily: style.fontFamily,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated square grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(0deg, ${style.baseContent} 0, ${style.baseContent} 1px, transparent 0, transparent 50px),
            repeating-linear-gradient(90deg, ${style.baseContent} 0, ${style.baseContent} 1px, transparent 0, transparent 50px)
          `,
          backgroundPosition: `${Math.sin(frame * 0.02) * 10}px ${Math.cos(frame * 0.02) * 10}px`,
          opacity: interpolate(frame, [0, 60, 120], [0.025, 0.04, 0.025], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          zIndex: 0,
        }}
      />
      {/* Animated corner triangles */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          borderLeft: '150px solid transparent',
          borderRight: '150px solid transparent',
          borderTop: `150px solid ${style.primary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.05, 0.10, 0.05], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${frame * 0.2}deg) scale(${1 + Math.sin(frame * 0.04) * 0.1})`,
          transformOrigin: 'center',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 0,
          height: 0,
          borderLeft: '120px solid transparent',
          borderRight: '120px solid transparent',
          borderBottom: `120px solid ${style.accent}`,
          opacity: interpolate(frame, [0, 60, 120], [0.05, 0.10, 0.05], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${-frame * 0.15}deg) scale(${1 + Math.cos(frame * 0.04) * 0.1})`,
          transformOrigin: 'center',
          zIndex: 0,
        }}
      />
      
      {content.title && (
        <h2
          style={{
            fontSize: titleSize,
            color: style.baseContent,
            textAlign: 'center',
            marginBottom: 100,
            fontWeight: 900,
            letterSpacing: -3,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {content.title}
        </h2>
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(content.columns || 4, 4)}, 1fr)`,
          gap: 60,
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {items.map((item: any, i: number) => {
          const delay = 25 + i * 12; // Start after title
          
          // Dramatic spring entrance
          const scale = spring({
            fps,
            frame: frame - delay,
            config: {
              damping: 100,
              stiffness: 180,
              mass: 1.2,
            },
          });
          
          // Opacity fade
          const opacity = interpolate(
            frame,
            [delay, delay + 25],
            [0, 1],
            {
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.19, 1, 0.22, 1),
            }
          );
          
          // Blur reveal
          const blur = interpolate(
            frame,
            [delay, delay + 20],
            [8, 0],
            {
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.exp),
            }
          );
          
          // Y movement
          const itemY = interpolate(
            frame,
            [delay, delay + 30],
            [50, 0],
            {
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }
          );
          
          // Icon glow effect
          const iconGlow = interpolate(
            frame,
            [delay + 10, delay + 30],
            [0, 1],
            {
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.ease),
            }
          );
          
          return (
            <div
              key={i}
              style={{
                transform: `scale(${scale}) translateY(${itemY}px)`,
                textAlign: 'center',
                opacity,
                filter: `blur(${blur}px)`,
              }}
            >
              {/* Enhanced icon container */}
              <div
                style={{
                  width: iconSize,
                  height: iconSize,
                  background: style.primary,
                  borderRadius: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 30px',
                  fontSize: iconFontSize,
                  color: style.primaryContent,
                  border: `4px solid ${style.base100}`,
                  boxShadow: `0 0 0 8px ${style.base200}, 0 20px 40px rgba(0,0,0,0.15), 0 0 ${30 * iconGlow}px ${style.primary}30`,
                  position: 'relative',
                }}
              >
                {/* Inner glow effect */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 8,
                    borderRadius: 16,
                    background: style.primaryContent,
                    opacity: iconGlow * 0.1,
                    filter: `blur(${10 * iconGlow}px)`,
                  }}
                />
                
                {/* Icon */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  {item.icon}
                </div>
              </div>
              
              {/* Item title */}
              <div
                style={{
                  fontSize: itemTitleSize,
                  color: style.baseContent,
                  fontWeight: 800,
                  marginBottom: 15,
                  letterSpacing: -1,
                  lineHeight: 1.2,
                }}
              >
                {item.title}
              </div>
              
              {/* Item description */}
              {item.description && (
                <div
                  style={{
                    fontSize: descSize,
                    color: style.neutral,
                    lineHeight: 1.5,
                    maxWidth: 250,
                    margin: '0 auto',
                    fontWeight: 500,
                    opacity: 0.9,
                  }}
                >
                  {item.description}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// 8. Product Matrix Scene - Cinematic Showcase
export const ProductMatrixScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {fps, width} = useVideoConfig();
  const products = content.products || [];
  
  // Responsive sizing
  const baseFontSize = width >= 3840 ? 1 : width >= 1920 ? 0.8 : 0.6;
  const titleSize = 96 * baseFontSize;
  const productNameSize = 36 * baseFontSize; // Much larger
  const descSize = 20 * baseFontSize; // Larger descriptions
  const priceSize = 48 * baseFontSize; // Larger prices
  const badgeSize = 16 * baseFontSize;
  
  // Title entrance
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });
  
  const titleY = interpolate(frame, [0, 35], [40, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        background: style.base100,
        padding: 80,
        fontFamily: style.fontFamily,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated hexagonal dots background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle, ${style.baseContent} 2px, transparent 2px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: `${Math.sin(frame * 0.015) * 8}px ${Math.cos(frame * 0.015) * 8}px`,
          opacity: interpolate(frame, [0, 60, 120], [0.025, 0.04, 0.025], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          zIndex: 0,
        }}
      />
      {/* Animated diagonal corner lines */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 250,
          height: 250,
          borderBottom: `3px solid ${style.primary}`,
          borderLeft: `3px solid ${style.primary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.06, 0.12, 0.06], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${frame * 0.2}deg) scale(${1 + Math.sin(frame * 0.04) * 0.08})`,
          transformOrigin: 'bottom left',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 200,
          height: 200,
          borderTop: `3px solid ${style.accent}`,
          borderRight: `3px solid ${style.accent}`,
          opacity: interpolate(frame, [0, 60, 120], [0.06, 0.12, 0.06], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${-frame * 0.18}deg) scale(${1 + Math.cos(frame * 0.04) * 0.08})`,
          transformOrigin: 'top right',
          zIndex: 0,
        }}
      />
      
      {content.title && (
        <h2
          style={{
            fontSize: titleSize,
            color: style.baseContent,
            textAlign: 'center',
            marginBottom: 100,
            fontWeight: 900,
            letterSpacing: -3,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {content.title}
        </h2>
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(content.columns || 3, 4)}, 1fr)`,
          gap: 50,
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {products.map((product: any, i: number) => {
          const delay = 25 + i * 15; // Start after title
          
          // Dramatic spring entrance
          const scale = spring({
            fps,
            frame: frame - delay,
            config: {
              damping: 100,
              stiffness: 180,
              mass: 1.3,
            },
          });
          
          // Opacity fade
          const opacity = interpolate(
            frame,
            [delay, delay + 30],
            [0, 1],
            {
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.19, 1, 0.22, 1),
            }
          );
          
          // Blur reveal
          const blur = interpolate(
            frame,
            [delay, delay + 25],
            [8, 0],
            {
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.exp),
            }
          );
          
          // Y movement
          const cardY = interpolate(
            frame,
            [delay, delay + 35],
            [60, 0],
            {
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }
          );
          
          // Image scale effect
          const imageScale = interpolate(
            frame,
            [delay + 10, delay + 40],
            [1.1, 1],
            {
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.cubic),
            }
          );
          
          return (
            <div
              key={i}
              style={{
                transform: `scale(${scale}) translateY(${cardY}px)`,
                background: style.base200,
                borderRadius: 24,
                overflow: 'hidden',
                opacity,
                filter: `blur(${blur}px)`,
                border: `3px solid ${style.base300}`,
              }}
            >
              {product.image && (
                <div style={{position: 'relative', paddingBottom: '60%', overflow: 'hidden'}}>
                  <Img
                    src={product.image}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: `scale(${imageScale})`,
                      transformOrigin: 'center',
                    }}
                  />
                  {product.badge && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        background: style.accent,
                        color: style.accentContent,
                        padding: '8px 16px',
                        borderRadius: 20,
                        fontSize: badgeSize,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                      }}
                    >
                      {product.badge}
                    </div>
                  )}
                </div>
              )}
              
              {/* Content section */}
              <div style={{padding: 40}}>
                {/* Product name */}
                <div
                  style={{
                    fontSize: productNameSize,
                    color: style.baseContent,
                    fontWeight: 800,
                    marginBottom: 15,
                    letterSpacing: -1,
                    lineHeight: 1.2,
                  }}
                >
                  {product.name}
                </div>
                
                {/* Description */}
                {product.description && (
                  <div
                    style={{
                      fontSize: descSize,
                      color: style.neutral,
                      marginBottom: 20,
                      lineHeight: 1.5,
                      fontWeight: 500,
                      opacity: 0.9,
                    }}
                  >
                    {product.description}
                  </div>
                )}
                
                {/* Price */}
                {product.price && (
                  <div
                    style={{
                      fontSize: priceSize,
                      color: style.primary,
                      fontWeight: 900,
                      letterSpacing: -1,
                      lineHeight: 1,
                    }}
                  >
                    {product.price}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// 9. Process Flow Scene - Cinematic Journey
export const ProcessFlowScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {width} = useVideoConfig();
  const steps = content.steps || [];
  
  // Responsive sizing - Optimized for readability
  const baseFontSize = width >= 3840 ? 1 : width >= 1920 ? 0.8 : 0.6;
  const titleSize = 96 * baseFontSize;
  const stepNumberSize = 56 * baseFontSize;
  const stepTitleSize = 36 * baseFontSize;
  const stepDescSize = 20 * baseFontSize;
  const circleSize = 140 * baseFontSize;
  const connectorWidth = 80 * baseFontSize;
  
  // Title entrance
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });
  
  const titleY = interpolate(frame, [0, 35], [40, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        background: style.base100,
        padding: 80,
        fontFamily: style.fontFamily,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Flowing horizontal lines background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(0deg, ${style.baseContent} 0, ${style.baseContent} 1px, transparent 0, transparent 60px)`,
          backgroundPosition: `0 ${frame * 0.2}px`,
          opacity: interpolate(frame, [0, 60, 120], [0.025, 0.04, 0.025], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          zIndex: 0,
        }}
      />
      {/* Multiple animated squares - top left */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          width: 120,
          height: 120,
          border: `3px solid ${style.primary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.06, 0.12, 0.06], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${frame * 0.3}deg) scale(${1 + Math.sin(frame * 0.04) * 0.1})`,
          zIndex: 0,
        }}
      />
      {/* Top right square */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '8%',
          width: 90,
          height: 90,
          border: `3px solid ${style.secondary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.05, 0.10, 0.05], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${45 + frame * 0.35}deg) scale(${1 + Math.sin(frame * 0.05) * 0.12})`,
          zIndex: 0,
        }}
      />
      {/* Bottom left square */}
      <div
        style={{
          position: 'absolute',
          bottom: '18%',
          left: '8%',
          width: 80,
          height: 80,
          border: `3px solid ${style.accent}`,
          opacity: interpolate(frame, [0, 60, 120], [0.05, 0.11, 0.05], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${-frame * 0.28}deg) scale(${1 + Math.cos(frame * 0.045) * 0.11})`,
          zIndex: 0,
        }}
      />
      {/* Bottom right square */}
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '5%',
          width: 100,
          height: 100,
          border: `3px solid ${style.primary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.06, 0.12, 0.06], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `rotate(${-frame * 0.25}deg) scale(${1 + Math.cos(frame * 0.04) * 0.1})`,
          zIndex: 0,
        }}
      />
      {/* Center top small square */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          width: 70,
          height: 70,
          border: `2px solid ${style.accent}`,
          opacity: interpolate(frame, [0, 60, 120], [0.04, 0.09, 0.04], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `translateX(-50%) rotate(${45 - frame * 0.32}deg) scale(${1 + Math.sin(frame * 0.06) * 0.13})`,
          zIndex: 0,
        }}
      />
      {/* Center bottom small square */}
      <div
        style={{
          position: 'absolute',
          bottom: '12%',
          left: '50%',
          width: 65,
          height: 65,
          border: `2px solid ${style.secondary}`,
          opacity: interpolate(frame, [0, 60, 120], [0.04, 0.08, 0.04], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.ease),
          }),
          transform: `translateX(-50%) rotate(${frame * 0.27}deg) scale(${1 + Math.cos(frame * 0.055) * 0.12})`,
          zIndex: 0,
        }}
      />
      
      {content.title && (
        <h2
          style={{
            fontSize: titleSize,
            color: style.baseContent,
            textAlign: 'center',
            marginBottom: 100,
            fontWeight: 900,
            letterSpacing: -3,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {content.title}
        </h2>
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 120,
          maxWidth: '1600px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {steps.map((step: any, i: number) => {
          const delay = 25 + i * 20; // Start after title
          
          // Dramatic spring entrance
          const scale = spring({
            frame: frame - delay,
            fps: 30,
            config: {
              damping: 100,
              stiffness: 180,
              mass: 1.2,
            },
          });
          
          // Opacity fade
          const opacity = interpolate(
            frame,
            [delay, delay + 25],
            [0, 1],
            {
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.19, 1, 0.22, 1),
            }
          );
          
          // Blur reveal
          const blur = interpolate(
            frame,
            [delay, delay + 20],
            [8, 0],
            {
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.exp),
            }
          );
          
          // Y movement
          const stepY = interpolate(
            frame,
            [delay, delay + 30],
            [50, 0],
            {
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }
          );
          
          // Connector line animation
          const connectorOpacity = interpolate(
            frame,
            [delay + 15, delay + 35],
            [0, 1],
            {
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.19, 1, 0.22, 1),
            }
          );
          
          const connectorWidth = interpolate(
            frame,
            [delay + 15, delay + 40],
            [0, 100],
            {
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }
          );
          
          return (
            <React.Fragment key={i}>
              <div
                style={{
                  opacity,
                  transform: `scale(${scale}) translateY(${stepY}px)`,
                  textAlign: 'center',
                  filter: `blur(${blur}px)`,
                  position: 'relative',
                }}
              >
                {/* Enhanced circle with glow effect */}
                <div
                  style={{
                    width: circleSize,
                    height: circleSize,
                    borderRadius: '50%',
                    background: style.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 30px',
                    border: `4px solid ${style.base100}`,
                    boxShadow: `0 0 0 8px ${style.base200}, 0 20px 40px rgba(0,0,0,0.15)`,
                    position: 'relative',
                  }}
                >
                  {/* Inner glow effect */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 8,
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${style.primary}20 0%, transparent 70%)`,
                    }}
                  />
                  
                  {/* Step number */}
                  <div
                    style={{
                      fontSize: stepNumberSize,
                      color: style.primaryContent,
                      fontWeight: 900,
                      letterSpacing: -2,
                      zIndex: 1,
                    }}
                  >
                    {step.number || i + 1}
                  </div>
                </div>
                
                {/* Step title */}
                <div
                  style={{
                    fontSize: stepTitleSize,
                    color: style.baseContent,
                    fontWeight: 800,
                    maxWidth: 380,
                    lineHeight: 1.3,
                    letterSpacing: -0.5,
                    marginBottom: 18,
                  }}
                >
                  {step.title}
                </div>
                
                {/* Step description */}
                {step.description && (
                  <div
                    style={{
                      fontSize: stepDescSize,
                      color: style.neutral,
                      maxWidth: 380,
                      lineHeight: 1.5,
                      opacity: 0.85,
                      fontWeight: 400,
                    }}
                  >
                    {step.description}
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// 10. Countdown Timer Scene - Cinematic Countdown
export const CountdownScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {fps, width} = useVideoConfig();
  
  // Responsive sizing
  const baseFontSize = width >= 3840 ? 1 : width >= 1920 ? 0.8 : 0.6;
  const titleSize = 72 * baseFontSize;
  const countdownSize = 280 * baseFontSize; // MASSIVE countdown
  const subtitleSize = 36 * baseFontSize;
  
  const totalSeconds = content.duration || 5; // Use exact duration
  const currentSecond = Math.max(0, totalSeconds - Math.floor(frame / fps));
  const previousSecond = Math.max(0, totalSeconds - Math.floor((frame - 1) / fps));
  
  // Detect number change for dramatic effect
  const numberChanged = currentSecond !== previousSecond;
  const changeFrame = numberChanged ? frame : frame - (frame % fps);
  
  // Dramatic scale pulse on each second
  const scale = spring({
    frame: changeFrame,
    fps,
    config: {
      damping: 80,
      stiffness: 300,
      mass: 1,
    },
  });
  
  // Additional scale for dramatic effect
  const pulseScale = interpolate(
    frame % fps,
    [0, fps / 2, fps],
    [1, 1.05, 1],
    {
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.ease),
    }
  );
  
  // Glow intensity animation
  const glowIntensity = interpolate(
    frame % fps,
    [0, fps * 0.2, fps],
    [0.3, 1, 0.3],
    {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    }
  );
  
  // Background pulse
  const bgPulse = interpolate(
    frame % fps,
    [0, fps * 0.5, fps],
    [1, 1.02, 1],
    {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    }
  );
  
  // Title entrance
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });
  
  const titleY = interpolate(frame, [0, 35], [40, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        background: style.primary,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: style.fontFamily,
        transform: `scale(${bgPulse})`,
        overflow: 'hidden',
      }}
    >
      {/* Removed animated background circles that were causing visual artifacts */}
      
      <div style={{textAlign: 'center', position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        {content.title && (
          <h2
            style={{
              fontSize: titleSize,
              color: style.primaryContent,
              marginBottom: 150, // Much more space
              fontWeight: 900,
              letterSpacing: -2,
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            }}
          >
            {content.title}
          </h2>
        )}
        
        {/* Countdown number - clean and simple */}
        <div
          style={{
            position: 'relative',
            display: 'inline-block',
          }}
        >
          {/* Main countdown number */}
          <div
            style={{
              fontSize: countdownSize,
              fontWeight: 900,
              color: style.primaryContent,
              fontVariantNumeric: 'tabular-nums',
              transform: `scale(${scale * pulseScale})`,
              textShadow: `0 0 ${30 * glowIntensity}px ${style.primaryContent}60, 0 10px 30px rgba(0,0,0,0.3)`,
              letterSpacing: -8,
              lineHeight: 0.8,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {currentSecond}
          </div>
        </div>
        
        {content.subtitle && (
          <p
            style={{
              fontSize: subtitleSize,
              color: style.primaryContent,
              opacity: 0.9,
              marginTop: 150, // Much more space
              fontWeight: 600,
              letterSpacing: -1,
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }}
          >
            {content.subtitle}
          </p>
        )}
        
        {/* Urgency indicator for ONLY last second */}
        {currentSecond === 1 && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: countdownSize * 0.6,
              height: countdownSize * 0.6,
              border: `4px solid ${style.error}`,
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.4,
            }}
          />
        )}
      </div>
    </AbsoluteFill>
  );
};
