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

// 10. Summary Points Scene
export const SummaryPointsScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const points = content.points || [];

  return (
    <AbsoluteFill
      style={{
        background: style.base100 || style.base100,
        padding: 80,
        fontFamily: style.fontFamily,
      }}
    >
      <h2
        style={{
          fontSize: 48,
          color: style.baseContent,
          marginBottom: 60,
          fontWeight: 700,
          textAlign: 'center',
        }}
      >
        {content.title || 'Key Takeaways'}
      </h2>
      
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 30,
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        {points.map((point: any, i: number) => {
          const delay = i * 15;
          const scale = interpolate(
            frame,
            [delay, delay + 15],
            [0, 1],
            {
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.back()),
            }
          );
          
          return (
            <div
              key={i}
              style={{
                transform: `scale(${scale})`,
                background: '#fff',
                padding: 30,
                borderRadius: style.borderRadius,
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                borderTop: `4px solid ${style.primary}`,
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  marginBottom: 15,
                }}
              >
                {point.icon || '📌'}
              </div>
              <div
                style={{
                  fontSize: 18,
                  color: style.baseContent,
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                {point.text || point}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// 11. Formula Explanation Scene
export const FormulaScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  
  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const highlightProgress = interpolate(frame, [40, 80], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: style.base100,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: style.fontFamily,
        padding: 80,
      }}
    >
      <div style={{textAlign: 'center', opacity: fadeIn}}>
        {content.title && (
          <h2
            style={{
              fontSize: 36,
              color: style.baseContent,
              marginBottom: 40,
              fontWeight: 600,
            }}
          >
            {content.title}
          </h2>
        )}
        
        <div
          style={{
            fontSize: 48,
            color: style.baseContent,
            fontWeight: 500,
            marginBottom: 40,
            fontFamily: "'Times New Roman', serif",
            padding: 40,
            background: `${style.primary}05`,
            borderRadius: style.borderRadius,
            display: 'inline-block',
          }}
        >
          {content.formula}
        </div>
        
        {content.explanation && (
          <div
            style={{
              fontSize: 22,
              color: style.neutralContent,
              maxWidth: 700,
              margin: '0 auto',
              lineHeight: 1.6,
              opacity: highlightProgress,
            }}
          >
            {content.explanation}
          </div>
        )}
        
        {content.example && (
          <div
            style={{
              marginTop: 40,
              padding: 30,
              background: '#fff',
              borderRadius: style.borderRadius,
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              maxWidth: 600,
              margin: '40px auto 0',
              opacity: highlightProgress,
            }}
          >
            <div
              style={{
                fontSize: 18,
                color: style.primary,
                fontWeight: 600,
                marginBottom: 15,
              }}
            >
              Example:
            </div>
            <div
              style={{
                fontSize: 20,
                color: style.baseContent,
                fontFamily: "'Monaco', monospace",
              }}
            >
              {content.example}
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// 12. Vocabulary Builder Scene
export const VocabularyScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const words = content.words || [];
  
  const currentIndex = Math.floor(frame / (fps * 2)) % words.length;
  const currentWord = words[currentIndex] || {};

  return (
    <AbsoluteFill
      style={{
        background: style.base100 || style.base100,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: style.fontFamily,
      }}
    >
      <div style={{textAlign: 'center', maxWidth: 800}}>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: style.baseContent,
            marginBottom: 30,
          }}
        >
          {currentWord.term}
        </div>
        
        {currentWord.pronunciation && (
          <div
            style={{
              fontSize: 28,
              color: style.neutralContent,
              marginBottom: 30,
              fontStyle: 'italic',
            }}
          >
            [{currentWord.pronunciation}]
          </div>
        )}
        
        {currentWord.type && (
          <div
            style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: style.primary,
              color: style.primaryContent,
              borderRadius: 20,
              fontSize: 16,
              fontWeight: 600,
              marginBottom: 30,
            }}
          >
            {currentWord.type}
          </div>
        )}
        
        <div
          style={{
            fontSize: 32,
            color: style.baseContent,
            lineHeight: 1.5,
            marginBottom: 40,
          }}
        >
          {currentWord.definition}
        </div>
        
        {currentWord.example && (
          <div
            style={{
              padding: 30,
              background: '#fff',
              borderRadius: style.borderRadius,
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              fontSize: 24,
              color: style.neutralContent,
              fontStyle: 'italic',
            }}
          >
            "{currentWord.example}"
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// 13. Interactive Timeline Scene  
export const InteractiveTimelineScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const events = content.events || [];
  
  const currentEvent = Math.min(Math.floor(frame / (fps * 2)), events.length - 1);

  return (
    <AbsoluteFill
      style={{
        background: style.base100,
        padding: 60,
        fontFamily: style.fontFamily,
      }}
    >
      {content.title && (
        <h2
          style={{
            fontSize: 42,
            color: style.baseContent,
            textAlign: 'center',
            marginBottom: 60,
            fontWeight: 700,
          }}
        >
          {content.title}
        </h2>
      )}
      
      <div style={{position: 'relative', height: '70%'}}>
        {/* Timeline Line */}
        <div
          style={{
            position: 'absolute',
            left: 100,
            top: 0,
            bottom: 0,
            width: 3,
            background: '#E5E5E7',
          }}
        />
        
        {/* Events */}
        {events.map((event: any, i: number) => {
          const isActive = i <= currentEvent;
          const isCurrent = i === currentEvent;
          
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: `${(i / (events.length - 1)) * 100}%`,
                left: 0,
                display: 'flex',
                alignItems: 'center',
                transform: `translateY(-50%)`,
                opacity: isActive ? 1 : 0.3,
                transition: 'all 0.5s',
              }}
            >
              {/* Date */}
              <div
                style={{
                  width: 80,
                  textAlign: 'right',
                  fontSize: 16,
                  color: style.primary,
                  fontWeight: 600,
                }}
              >
                {event.date}
              </div>
              
              {/* Dot */}
              <div
                style={{
                  width: isCurrent ? 24 : 16,
                  height: isCurrent ? 24 : 16,
                  borderRadius: '50%',
                  background: isActive ? style.primary : '#E5E5E7',
                  margin: '0 20px',
                  border: isCurrent ? `3px solid ${style.secondary}` : 'none',
                  transition: 'all 0.3s',
                }}
              />
              
              {/* Content */}
              <div
                style={{
                  flex: 1,
                  background: isCurrent ? `${style.primary}10` : '#fff',
                  padding: 25,
                  borderRadius: style.borderRadius,
                  boxShadow: isCurrent ? '0 10px 40px rgba(0,0,0,0.1)' : '0 5px 20px rgba(0,0,0,0.05)',
                  transform: isCurrent ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.3s',
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    color: style.baseContent,
                    fontWeight: 600,
                    marginBottom: 10,
                  }}
                >
                  {event.title}
                </div>
                {event.description && (
                  <div
                    style={{
                      fontSize: 16,
                      color: style.neutralContent,
                      lineHeight: 1.4,
                    }}
                  >
                    {event.description}
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

// 14. Achievement Badge Scene
export const AchievementBadgeScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const scale = spring({
    fps,
    frame,
    config: {
      damping: 10,
      stiffness: 100,
    },
  });
  
  const rotate = interpolate(frame, [0, fps], [0, 360], {
    extrapolateRight: 'clamp',
  });
  
  const starBurst = interpolate(
    frame,
    [fps * 0.5, fps * 0.8],
    [0, 1],
    {
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  );

  return (
    <AbsoluteFill
      style={{
        background: style.primary,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: style.fontFamily,
      }}
    >
      {/* Star burst effect */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          opacity: starBurst * 0.3,
        }}
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '100%',
              height: 2,
              background: '#fff',
              top: '50%',
              left: 0,
              transformOrigin: '0 50%',
              transform: `rotate(${i * 30}deg) scaleX(${starBurst})`,
            }}
          />
        ))}
      </div>
      
      {/* Badge */}
      <div
        style={{
          transform: `scale(${scale}) rotate(${rotate}deg)`,
        }}
      >
        <div
          style={{
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            position: 'relative',
          }}
        >
          {/* Inner circle */}
          <div
            style={{
              position: 'absolute',
              width: '90%',
              height: '90%',
              borderRadius: '50%',
              border: `4px solid ${style.primary}`,
            }}
          />
          
          {/* Icon */}
          <div
            style={{
              fontSize: 80,
              marginBottom: 20,
            }}
          >
            {content.icon || '🏆'}
          </div>
          
          {/* Text */}
          <div
            style={{
              fontSize: 24,
              color: style.baseContent,
              fontWeight: 700,
              textAlign: 'center',
              padding: '0 40px',
            }}
          >
            {content.achievement}
          </div>
        </div>
      </div>
      
      {/* Congratulations text */}
      {content.message && (
        <div
          style={{
            position: 'absolute',
            bottom: 100,
            fontSize: 32,
            color: style.primaryContent,
            fontWeight: 600,
            opacity: starBurst,
          }}
        >
          {content.message}
        </div>
      )}
    </AbsoluteFill>
  );
};
