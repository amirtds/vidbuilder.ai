import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, Easing } from 'remotion';
import { parseFormattedText } from './utils/textFormatting';
import { getTypedText, getTypingProgress, TypingCursor } from './utils/typingEffect';

// Color scheme interface - compatible with DaisyUI ThemeColors
export interface ColorScheme {
  primary: string;
  secondary: string;
  accent?: string;
  text?: string; // Legacy
  textLight?: string; // Legacy
  background?: string; // Legacy
  backgroundGradient?: string; // Deprecated per DESIGN.md
  
  // DaisyUI semantic colors
  primaryContent?: string;
  secondaryContent?: string;
  accentContent?: string;
  neutral?: string;
  neutralContent?: string;
  base100?: string;
  base200?: string;
  base300?: string;
  baseContent?: string;
  
  borderRadius: number;
  fontFamily?: string;
}

// Scene configuration interface
export interface SceneConfig {
  type: string;
  duration: number;
  content: any;
  style?: ColorScheme;
}

// Default color schemes
export const defaultColorScheme: ColorScheme = {
  primary: '#667eea',
  primaryContent: '#ffffff',
  secondary: '#764ba2',
  secondaryContent: '#ffffff',
  accent: '#f093fb',
  accentContent: '#000000',
  neutral: '#3d4451',
  neutralContent: '#ffffff',
  base100: '#000000',
  base200: '#1a1a1a',
  base300: '#2a2a2a',
  baseContent: '#ffffff',
  borderRadius: 20
};

export const educationalColorScheme: ColorScheme = {
  primary: '#4CAF50',
  primaryContent: '#ffffff',
  secondary: '#2196F3',
  secondaryContent: '#ffffff',
  accent: '#FF9800',
  accentContent: '#000000',
  neutral: '#757575',
  neutralContent: '#ffffff',
  base100: '#ffffff',
  base200: '#f5f5f5',
  base300: '#e0e0e0',
  baseContent: '#212121',
  borderRadius: 12
};

// =============== PROMOTIONAL TEMPLATES ===============

// Professional Hero Title Scene - Apple/Nike inspired design
export const HeroTitleScene: React.FC<{content: any; style: ColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const {width, height} = useVideoConfig();
  
  // DYNAMIC typing timing based on scene duration
  const totalFrames = durationInFrames;
  
  // Calculate dynamic timing
  const titleEndFrame = content.subtitle 
    ? Math.floor(totalFrames * 0.50) // If subtitle exists, title takes 50% of time
    : Math.floor(totalFrames * 0.85); // If no subtitle, title takes 85% of time
  
  const titleTypingDuration = Math.min(titleEndFrame, (content.title || '').length * 2.5);
  const titleTypingProgress = getTypingProgress(frame, 0, titleTypingDuration, 'linear');
  
  const subtitleStartFrame = titleTypingDuration + 5; // Small delay after title finishes
  const subtitleAvailableFrames = totalFrames - subtitleStartFrame;
  const subtitleTypingDuration = content.subtitle 
    ? Math.min(subtitleAvailableFrames, content.subtitle.length * 2.5) 
    : 0;
  const subtitleTypingProgress = getTypingProgress(frame, subtitleStartFrame, subtitleTypingDuration, 'linear');

  // Fade in animation (subtle, quick)
  const titleOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const subtitleOpacity = interpolate(
    frame,
    [subtitleStartFrame, subtitleStartFrame + 10],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  // Parse formatted text with color markers
  const titleParts = parseFormattedText(content.title || '', {
    primaryColor: style.primary || '#667eea',
    secondaryColor: style.secondary || '#764ba2',
    accentColor: style.accent || '#f093fb',
    defaultColor: style.baseContent || '#000',
  });

  const subtitleParts = content.subtitle ? parseFormattedText(content.subtitle, {
    primaryColor: style.primary || '#667eea',
    secondaryColor: style.secondary || '#764ba2',
    accentColor: style.accent || '#f093fb',
    defaultColor: style.neutral || '#666',
  }) : null;

  // Responsive font sizing based on resolution
  const baseFontSize = width >= 3840 ? 1 : width >= 1920 ? 0.8 : 0.6;
  const titleFontSize = (content.fontSize || 120) * baseFontSize;
  const subtitleFontSize = (content.subtitleSize || 44) * baseFontSize;

  return (
    <AbsoluteFill
      style={{
        background: style.base100 || '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: style.fontFamily || 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
        padding: '0 5%',
      }}
    >
      {/* Main Title Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '1600px',
          width: '100%',
        }}
      >
        {/* Title with Typing Effect */}
        <div
          style={{
            fontSize: titleFontSize,
            fontWeight: content.fontWeight || 900,
            textAlign: 'center',
            opacity: titleOpacity,
            letterSpacing: content.letterSpacing || -3.5,
            lineHeight: content.lineHeight || 1.05,
            maxWidth: '95%',
            wordWrap: 'break-word',
            hyphens: 'none',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          }}
        >
          {getTypedText({
            text: content.title || '',
            progress: titleTypingProgress,
            formattedParts: titleParts,
          })}
        </div>

        {/* Subtitle with Typing Effect */}
        {content.subtitle && (
          <div
            style={{
              fontSize: subtitleFontSize,
              fontWeight: content.subtitleWeight || 500,
              textAlign: 'center',
              opacity: subtitleOpacity,
              marginTop: height >= 2160 ? 48 : 36,
              letterSpacing: 0.3,
              lineHeight: 1.5,
              maxWidth: '90%',
              wordWrap: 'break-word',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            }}
          >
            {getTypedText({
              text: content.subtitle,
              progress: subtitleTypingProgress,
              formattedParts: subtitleParts || [],
            })}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// Product Showcase Scene
export const ProductShowcaseScene: React.FC<{content: any; style: ColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const images = content.images || [];
  if (images.length === 0) return null;
  
  const imageDuration = 60; // 2 seconds per image at 30fps
  const currentIndex = Math.floor(frame / imageDuration) % images.length;
  const localFrame = frame % imageDuration;
  
  const scale = interpolate(localFrame, [0, 15, 45, 60], [0.8, 1, 1, 0.8], {
    extrapolateRight: 'clamp',
  });
  
  const opacity = interpolate(localFrame, [0, 10, 50, 60], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: style.base100 || "#fff",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {content.title && (
        <div
          style={{
            fontSize: 48,
            fontWeight: 'bold',
            color: style.baseContent || "#000",
            marginBottom: 40,
            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
          }}
        >
          {content.title}
        </div>
      )}
      <div
        style={{
          width: '80%',
          maxWidth: '800px',
          height: '60%',
          transform: `scale(${scale})`,
          opacity,
          borderRadius: style.borderRadius,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        <Img
          src={images[currentIndex]}
          style={{
            width: '100%',
            height: '100%',
            objectFit: content.fitMode || 'cover',
          }}
        />
      </div>
      {content.captions && content.captions[currentIndex] && (
        <div
          style={{
            fontSize: 24,
            color: style.baseContent || "#000",
            marginTop: 30,
            opacity,
            textAlign: 'center',
            padding: '0 40px',
          }}
        >
          {content.captions[currentIndex]}
        </div>
      )}
    </AbsoluteFill>
  );
};

// Feature List Scene - Clean Apple-style Design (DESIGN.md compliant)
export const FeatureListScene: React.FC<{content: any; style: ColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  
  const features = content.features || [];
  
  // Responsive sizing
  const baseFontSize = width >= 3840 ? 1 : width >= 1920 ? 0.8 : 0.6;
  const titleSize = 96 * baseFontSize;
  const featureTitleSize = 52 * baseFontSize;
  const featureTextSize = 36 * baseFontSize;
  const iconSize = 80 * baseFontSize;
  
  // Title animation - smooth fade in only
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { 
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease)
  });
  
  return (
    <AbsoluteFill
      style={{
        background: style.base100 || '#fff',
        padding: '100px 120px',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
      }}
    >
      {/* Title - Clean and bold */}
      {content.title && (
        <div
          style={{
            fontSize: titleSize,
            color: style.baseContent || '#000',
            marginBottom: 80,
            fontWeight: 900,
            textAlign: 'center',
            letterSpacing: -3.5,
            opacity: titleOpacity,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          }}
        >
          {content.title}
        </div>
      )}
      
      {/* Features List - Clean cards */}
      <div style={{
        display: 'flex', 
        flexDirection: 'column', 
        gap: 32,
        maxWidth: width * 0.8,
        margin: '0 auto',
      }}>
        {features.map((feature: any, i: number) => {
          // Smooth staggered entrance - slide in only (no scale glitch)
          const delay = 25 + (i * 10);
          const animDuration = 20;
          
          const opacity = interpolate(
            frame,
            [delay, delay + animDuration],
            [0, 1],
            {
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.ease)
            }
          );
          
          const translateY = interpolate(
            frame,
            [delay, delay + animDuration],
            [40, 0],
            {
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.ease)
            }
          );
          
          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateY(${translateY}px)`,
                display: 'flex',
                alignItems: 'center',
                gap: 40,
                padding: '48px 56px',
                background: style.base100 || '#fff',
                borderRadius: 16,
                border: `1px solid ${style.base300 || '#e5e5e5'}`,
              }}
            >
              {/* Icon Container - Solid color circle */}
              {feature.icon && (
                <div
                  style={{
                    fontSize: iconSize,
                    width: iconSize + 32,
                    height: iconSize + 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: style.primary || '#4b6bfb',
                    borderRadius: '50%',
                    flexShrink: 0,
                  }}
                >
                  <span style={{
                    fontSize: iconSize * 0.55,
                  }}>
                    {feature.icon}
                  </span>
                </div>
              )}
              
              {/* Text Content */}
              <div style={{ flex: 1 }}>
                {feature.title && (
                  <div style={{
                    fontSize: featureTitleSize,
                    fontWeight: 700,
                    marginBottom: 12,
                    color: style.baseContent || '#000',
                    letterSpacing: -1.2,
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                  }}>
                    {feature.title}
                  </div>
                )}
                <div style={{
                  fontSize: featureTextSize,
                  color: style.neutral || '#666',
                  fontWeight: 400,
                  lineHeight: 1.4,
                  letterSpacing: -0.3,
                }}>
                  {feature.text || feature}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Call to Action Scene
export const CTAScene: React.FC<{content: any; style: ColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const buttonScale = spring({
    fps,
    frame: frame - 10,
    config: {
      damping: 10,
      mass: 0.5,
      stiffness: 100,
    },
  });

  const pulse = Math.sin(frame * 0.1) * 0.05 + 1;

  return (
    <AbsoluteFill
      style={{
        background: style.base100 || "#fff",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '60px',
      }}
    >
      {content.title && (
        <div
          style={{
            fontSize: content.titleSize || 70,
            color: style.baseContent || "#000",
            marginBottom: 30,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {content.title}
        </div>
      )}
      {content.description && (
        <div
          style={{
            fontSize: 28,
            color: style.baseContent || "#000",
            marginBottom: 50,
            textAlign: 'center',
            maxWidth: '80%',
          }}
        >
          {content.description}
        </div>
      )}
      <div
        style={{
          transform: `scale(${buttonScale * pulse})`,
          background: content.buttonColor || style.accent || style.primary,
          color: style.baseContent || "#000",
          padding: '30px 60px',
          fontSize: 36,
          fontWeight: 'bold',
          borderRadius: style.borderRadius * 2,
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
        }}
      >
        {content.buttonText || 'Get Started'}
      </div>
      {content.urgency && (
        <div
          style={{
            marginTop: 30,
            fontSize: 24,
            color: style.baseContent || "#000",
            opacity: 0.9,
          }}
        >
          {content.urgency}
        </div>
      )}
    </AbsoluteFill>
  );
};

// =============== EDUCATIONAL TEMPLATES ===============

// Lesson Title Scene
export const LessonTitleScene: React.FC<{content: any; style: ColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  
  const slideIn = interpolate(frame, [0, 30], [-100, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: style.base100 || "#fff",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {content.lessonNumber && (
        <div
          style={{
            fontSize: 24,
            color: style.primary,
            fontWeight: 'bold',
            marginBottom: 20,
            opacity: interpolate(frame, [10, 25], [0, 1]),
          }}
        >
          Lesson {content.lessonNumber}
        </div>
      )}
      <div
        style={{
          fontSize: 64,
          fontWeight: 'bold',
          color: style.baseContent || "#000",
          textAlign: 'center',
          transform: `translateX(${slideIn}px)`,
          padding: '0 60px',
        }}
      >
        {content.title}
      </div>
      {content.objectives && (
        <div
          style={{
            marginTop: 40,
            fontSize: 24,
            color: style.baseContent || "#000",
            opacity: interpolate(frame, [30, 50], [0, 1]),
          }}
        >
          Learning Objectives: {content.objectives.length}
        </div>
      )}
    </AbsoluteFill>
  );
};

// Step by Step Tutorial Scene
export const StepByStepScene: React.FC<{content: any; style: ColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const steps = content.steps || [];
  const stepDuration = Math.floor((fps * content.stepDuration) || 90); // 3 seconds per step
  const currentStep = Math.min(Math.floor(frame / stepDuration), steps.length - 1);
  const localFrame = frame - (currentStep * stepDuration);
  
  const fadeIn = interpolate(localFrame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: style.base100 || "#fff",
        padding: '60px',
      }}
    >
      <div
        style={{
          fontSize: 36,
          fontWeight: 'bold',
          color: style.primary,
          marginBottom: 20,
        }}
      >
        {content.title || 'Tutorial Steps'}
      </div>
      
      <div style={{display: 'flex', height: '80%', gap: 40}}>
        <div style={{flex: 1}}>
          {steps.map((step: any, i: number) => (
            <div
              key={i}
              style={{
                padding: 20,
                marginBottom: 20,
                background: i === currentStep ? `${style.primary}15` : 'transparent',
                borderLeft: `4px solid ${i === currentStep ? style.primary : style.baseContent || "#000"}`,
                opacity: i <= currentStep ? 1 : 0.3,
                transition: 'all 0.3s',
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  color: style.primary,
                  fontWeight: 'bold',
                  marginBottom: 8,
                }}
              >
                Step {i + 1}
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: style.baseContent || "#000",
                }}
              >
                {step.title}
              </div>
            </div>
          ))}
        </div>
        
        <div
          style={{
            flex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: fadeIn,
          }}
        >
          {steps[currentStep]?.image && (
            <Img
              src={steps[currentStep].image}
              style={{
                width: '100%',
                maxWidth: '600px',
                borderRadius: style.borderRadius,
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              }}
            />
          )}
          {steps[currentStep]?.description && (
            <div
              style={{
                marginTop: 30,
                fontSize: 24,
                color: style.baseContent || "#000",
                textAlign: 'center',
                maxWidth: '600px',
              }}
            >
              {steps[currentStep].description}
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Comparison Scene
export const ComparisonScene: React.FC<{content: any; style: ColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  
  const leftSlide = interpolate(frame, [0, 30], [-100, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  
  const rightSlide = interpolate(frame, [10, 40], [100, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: style.base100 || "#fff",
        padding: '60px',
      }}
    >
      {content.title && (
        <div
          style={{
            fontSize: 48,
            fontWeight: 'bold',
            color: style.baseContent || "#000",
            textAlign: 'center',
            marginBottom: 50,
          }}
        >
          {content.title}
        </div>
      )}
      
      <div style={{display: 'flex', gap: 40, height: '70%'}}>
        <div
          style={{
            flex: 1,
            background: `${style.primary}10`,
            borderRadius: style.borderRadius,
            padding: 40,
            transform: `translateX(${leftSlide}px)`,
          }}
        >
          <h3
            style={{
              fontSize: 32,
              color: style.primary,
              marginBottom: 30,
              textAlign: 'center',
            }}
          >
            {content.left.title}
          </h3>
          <ul style={{fontSize: 24, color: style.baseContent || "#000", lineHeight: 2}}>
            {content.left.points?.map((point: string, i: number) => (
              <li key={i} style={{marginBottom: 15}}>
                {point}
              </li>
            ))}
          </ul>
        </div>
        
        <div
          style={{
            flex: 1,
            background: `${style.secondary}10`,
            borderRadius: style.borderRadius,
            padding: 40,
            transform: `translateX(${rightSlide}px)`,
          }}
        >
          <h3
            style={{
              fontSize: 32,
              color: style.secondary,
              marginBottom: 30,
              textAlign: 'center',
            }}
          >
            {content.right.title}
          </h3>
          <ul style={{fontSize: 24, color: style.baseContent || "#000", lineHeight: 2}}>
            {content.right.points?.map((point: string, i: number) => (
              <li key={i} style={{marginBottom: 15}}>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Key Takeaways Scene
export const KeyTakeawaysScene: React.FC<{content: any; style: ColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  
  const takeaways = content.takeaways || [];

  return (
    <AbsoluteFill
      style={{
        background: style.base100 || "#fff",
        padding: '80px',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          fontSize: 56,
          fontWeight: 'bold',
          color: style.baseContent || "#000",
          marginBottom: 60,
          textAlign: 'center',
        }}
      >
        {content.title || 'Key Takeaways'}
      </div>
      
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30}}>
        {takeaways.map((takeaway: any, i: number) => {
          const delay = i * 20;
          const scale = spring({
            fps: 30,
            frame: frame - delay,
            config: {
              damping: 10,
              stiffness: 100,
            },
          });
          
          return (
            <div
              key={i}
              style={{
                transform: `scale(${scale})`,
                background: `${style.accent || style.primary}15`,
                padding: 30,
                borderRadius: style.borderRadius,
                border: `2px solid ${style.accent || style.primary}`,
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  marginBottom: 15,
                  textAlign: 'center',
                }}
              >
                {takeaway.icon || '💡'}
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: style.baseContent || "#000",
                  textAlign: 'center',
                  fontWeight: '500',
                }}
              >
                {takeaway.text || takeaway}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Quiz/Question Scene
export const QuizScene: React.FC<{content: any; style: ColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const questionFade = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const optionsDelay = 30;
  const revealDelay = fps * (content.revealDelay || 3);

  return (
    <AbsoluteFill
      style={{
        background: style.base100 || "#fff",
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px',
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 'bold',
          color: style.baseContent || "#000",
          marginBottom: 60,
          textAlign: 'center',
          opacity: questionFade,
        }}
      >
        {content.question}
      </div>
      
      <div style={{width: '80%', maxWidth: '800px'}}>
        {content.options?.map((option: any, i: number) => {
          const delay = optionsDelay + (i * 10);
          const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
            extrapolateRight: 'clamp',
          });
          
          const isCorrect = option.correct;
          const isRevealed = frame > revealDelay;
          
          return (
            <div
              key={i}
              style={{
                opacity,
                padding: 25,
                marginBottom: 20,
                background: isRevealed && isCorrect 
                  ? `${style.primary}30`
                  : `${style.baseContent || "#000"}10`,
                border: `2px solid ${
                  isRevealed && isCorrect ? style.primary : 'transparent'
                }`,
                borderRadius: style.borderRadius / 2,
                fontSize: 28,
                color: style.baseContent || "#000",
                display: 'flex',
                alignItems: 'center',
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: style.secondary,
                  color: style.baseContent || "#000",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                }}
              >
                {String.fromCharCode(65 + i)}
              </div>
              <div>{option.text || option}</div>
              {isRevealed && isCorrect && (
                <div style={{marginLeft: 'auto', fontSize: 36}}>✓</div>
              )}
            </div>
          );
        })}
      </div>
      
      {frame > revealDelay && content.explanation && (
        <div
          style={{
            marginTop: 40,
            padding: 30,
            background: `${style.primary}20`,
            borderRadius: style.borderRadius,
            fontSize: 24,
            color: style.baseContent || "#000",
            maxWidth: '80%',
            opacity: interpolate(frame, [revealDelay, revealDelay + 20], [0, 1]),
          }}
        >
          💡 {content.explanation}
        </div>
      )}
    </AbsoluteFill>
  );
};

// Scene type mapping
export const sceneTemplates: {[key: string]: React.FC<any>} = {
  // Promotional
  'hero-title': HeroTitleScene,
  'product-showcase': ProductShowcaseScene,
  'feature-list': FeatureListScene,
  'cta': CTAScene,
  
  // Educational
  'lesson-title': LessonTitleScene,
  'step-by-step': StepByStepScene,
  'comparison': ComparisonScene,
  'key-takeaways': KeyTakeawaysScene,
  'quiz': QuizScene,
};

// Get scene template by type
export const getSceneTemplate = (type: string): React.FC<any> | null => {
  return sceneTemplates[type] || null;
};
