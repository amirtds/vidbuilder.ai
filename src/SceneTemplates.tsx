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

// Color scheme interface
export interface ColorScheme {
  primary: string;
  secondary: string;
  accent?: string;
  text: string;
  textLight: string;
  background: string;
  backgroundGradient?: string;
  borderRadius: number;
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
  secondary: '#764ba2',
  accent: '#f093fb',
  text: '#ffffff',
  textLight: '#e0e0e0',
  background: '#000000',
  backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: 20
};

export const educationalColorScheme: ColorScheme = {
  primary: '#4CAF50',
  secondary: '#2196F3',
  accent: '#FF9800',
  text: '#212121',
  textLight: '#757575',
  background: '#ffffff',
  backgroundGradient: 'linear-gradient(135deg, #E3F2FD 0%, #E8F5E9 100%)',
  borderRadius: 12
};

// =============== PROMOTIONAL TEMPLATES ===============

// Hero Title Scene
export const HeroTitleScene: React.FC<{content: any; style: ColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const scale = spring({
    fps,
    frame,
    config: {
      damping: 10,
      mass: 0.5,
      stiffness: 100,
    },
  });

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: style.backgroundGradient || style.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontSize: content.fontSize || 80,
          fontWeight: 'bold',
          color: style.text,
          textAlign: 'center',
          transform: `scale(${scale})`,
          opacity,
          textShadow: '0 4px 20px rgba(0,0,0,0.3)',
          fontFamily: 'SF Pro Display, Arial, sans-serif',
          padding: '0 40px',
        }}
      >
        {content.title}
      </div>
      {content.subtitle && (
        <div
          style={{
            fontSize: 32,
            color: style.textLight,
            marginTop: 30,
            opacity: interpolate(frame, [20, 40], [0, 1], {
              extrapolateRight: 'clamp',
            }),
            textAlign: 'center',
          }}
        >
          {content.subtitle}
        </div>
      )}
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
        background: style.backgroundGradient || style.background,
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
            color: style.text,
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
            color: style.textLight,
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

// Feature List Scene
export const FeatureListScene: React.FC<{content: any; style: ColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  
  const features = content.features || [];
  
  return (
    <AbsoluteFill
      style={{
        background: style.backgroundGradient || style.background,
        padding: '80px',
        justifyContent: 'center',
      }}
    >
      {content.title && (
        <h2
          style={{
            fontSize: 56,
            color: style.text,
            marginBottom: 60,
            fontWeight: 'bold',
            textAlign: 'center',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
          }}
        >
          {content.title}
        </h2>
      )}
      <div style={{display: 'flex', flexDirection: 'column', gap: 30}}>
        {features.map((feature: any, i: number) => {
          const delay = i * 15;
          const opacity = interpolate(
            frame,
            [delay, delay + 15],
            [0, 1],
            {extrapolateRight: 'clamp'}
          );
          const translateX = interpolate(
            frame,
            [delay, delay + 15],
            [-50, 0],
            {extrapolateRight: 'clamp'}
          );
          
          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateX(${translateX}px)`,
                fontSize: 32,
                color: style.text,
                padding: '25px 40px',
                background: `${style.primary}20`,
                borderLeft: `4px solid ${style.primary}`,
                borderRadius: style.borderRadius / 2,
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
              }}
            >
              {feature.icon && <span style={{fontSize: 40}}>{feature.icon}</span>}
              <div>
                {feature.title && (
                  <div style={{fontWeight: 'bold', marginBottom: 5}}>{feature.title}</div>
                )}
                <div style={{color: style.textLight}}>{feature.text || feature}</div>
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
        background: style.backgroundGradient || style.background,
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
            color: style.text,
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
            color: style.textLight,
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
          color: style.text,
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
            color: style.textLight,
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
        background: style.backgroundGradient || style.background,
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
          color: style.text,
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
            color: style.textLight,
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
        background: style.background,
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
                borderLeft: `4px solid ${i === currentStep ? style.primary : style.textLight}`,
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
                  color: style.text,
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
                color: style.textLight,
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
        background: style.backgroundGradient || style.background,
        padding: '60px',
      }}
    >
      {content.title && (
        <div
          style={{
            fontSize: 48,
            fontWeight: 'bold',
            color: style.text,
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
          <ul style={{fontSize: 24, color: style.text, lineHeight: 2}}>
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
          <ul style={{fontSize: 24, color: style.text, lineHeight: 2}}>
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
        background: style.backgroundGradient || style.background,
        padding: '80px',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          fontSize: 56,
          fontWeight: 'bold',
          color: style.text,
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
                  color: style.text,
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
        background: style.backgroundGradient || style.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px',
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 'bold',
          color: style.text,
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
                  : `${style.text}10`,
                border: `2px solid ${
                  isRevealed && isCorrect ? style.primary : 'transparent'
                }`,
                borderRadius: style.borderRadius / 2,
                fontSize: 28,
                color: style.text,
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
                  color: style.text,
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
            color: style.text,
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
