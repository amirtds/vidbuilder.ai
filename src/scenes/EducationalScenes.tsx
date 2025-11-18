import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing
} from 'remotion';
import { EnhancedColorScheme } from './types';
import { SafeImage } from '../components/SafeImage';

// 1. Chapter Introduction Scene
export const ChapterIntroScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  
  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const lineProgress = interpolate(frame, [15, 45], [0, 100], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: style.base100 || style.base100,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: style.fontFamily,
      }}
    >
      <div
        style={{
          textAlign: 'center',
          opacity: fadeIn,
        }}
      >
        {content.chapterNumber && (
          <div
            style={{
              fontSize: 24,
              color: style.primary,
              fontWeight: 600,
              marginBottom: 30,
              letterSpacing: 2,
            }}
          >
            CHAPTER {content.chapterNumber}
          </div>
        )}
        <h1
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: style.baseContent,
            marginBottom: 20,
            letterSpacing: -1,
          }}
        >
          {content.title}
        </h1>
        <div
          style={{
            width: 120,
            height: 3,
            background: style.primary,
            margin: '30px auto',
            clipPath: `inset(0 ${100 - lineProgress}% 0 0)`,
          }}
        />
        {content.duration && (
          <div
            style={{
              fontSize: 18,
              color: style.neutralContent,
              marginTop: 20,
            }}
          >
            {content.duration} min
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// 2. Learning Objectives Scene
export const LearningObjectivesScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const objectives = content.objectives || [];

  return (
    <AbsoluteFill
      style={{
        background: style.base100,
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
        }}
      >
        {content.title || 'Learning Objectives'}
      </h2>
      <div style={{maxWidth: 800}}>
        {objectives.map((obj: any, i: number) => {
          const delay = i * 15;
          const slideIn = interpolate(
            frame,
            [delay, delay + 20],
            [-50, 0],
            {
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.cubic),
            }
          );
          const opacity = interpolate(
            frame,
            [delay, delay + 20],
            [0, 1],
            {
              extrapolateRight: 'clamp',
            }
          );
          
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: 30,
                opacity,
                transform: `translateX(${slideIn}px)`,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: style.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 20,
                  flexShrink: 0,
                }}
              >
                <span style={{color: style.primaryContent, fontWeight: 600}}>
                  {i + 1}
                </span>
              </div>
              <div style={{flex: 1}}>
                <div
                  style={{
                    fontSize: 24,
                    color: style.baseContent,
                    fontWeight: 500,
                    marginBottom: 8,
                  }}
                >
                  {obj.title || obj}
                </div>
                {obj.description && (
                  <div
                    style={{
                      fontSize: 18,
                      color: style.neutralContent,
                      lineHeight: 1.5,
                    }}
                  >
                    {obj.description}
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

// 3. Concept Explanation Scene
export const ConceptExplanationScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const diagramScale = spring({
    fps,
    frame: frame - 30,
    config: {
      damping: 10,
      stiffness: 100,
    },
  });

  return (
    <AbsoluteFill
      style={{
        background: style.base100,
        padding: 60,
        fontFamily: style.fontFamily,
      }}
    >
      <div
        style={{
          display: 'flex',
          height: '100%',
          gap: 60,
          alignItems: 'center',
        }}
      >
        <div style={{flex: 1, opacity: fadeIn}}>
          <h2
            style={{
              fontSize: 48,
              color: style.baseContent,
              marginBottom: 30,
              fontWeight: 700,
            }}
          >
            {content.title}
          </h2>
          <p
            style={{
              fontSize: 22,
              color: style.neutralContent,
              lineHeight: 1.6,
              marginBottom: 30,
            }}
          >
            {content.explanation}
          </p>
          {content.points && (
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
              }}
            >
              {content.points.map((point: string, i: number) => (
                <li
                  key={i}
                  style={{
                    fontSize: 18,
                    color: style.baseContent,
                    marginBottom: 15,
                    paddingLeft: 30,
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      color: style.primary,
                    }}
                  >
                    •
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>
        {content.diagram && (
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transform: `scale(${diagramScale})`,
            }}
          >
            <SafeImage
              src={content.diagram}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                borderRadius: style.borderRadius,
              }}
              fallbackColor={style.base200 || '#f5f5f5'}
            />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// 4. Interactive Quiz Scene
export const InteractiveQuizScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const questionFade = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const revealDelay = fps * (content.revealDelay || 3);
  const showAnswer = frame > revealDelay;

  return (
    <AbsoluteFill
      style={{
        background: style.base100 || style.base100,
        padding: 80,
        fontFamily: style.fontFamily,
      }}
    >
      <div style={{maxWidth: 900, margin: '0 auto'}}>
        <div
          style={{
            fontSize: 42,
            color: style.baseContent,
            fontWeight: 700,
            marginBottom: 50,
            opacity: questionFade,
          }}
        >
          {content.question}
        </div>
        
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20}}>
          {content.options?.map((option: any, i: number) => {
            const delay = 20 + (i * 10);
            const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
              extrapolateRight: 'clamp',
            });
            
            const isCorrect = option.correct;
            const revealed = showAnswer;
            
            return (
              <div
                key={i}
                style={{
                  opacity,
                  padding: 25,
                  background: revealed && isCorrect 
                    ? `${style.primary}15`
                    : '#fff',
                  border: `2px solid ${
                    revealed && isCorrect ? style.primary : '#E5E5E7'
                  }`,
                  borderRadius: style.borderRadius,
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transform: revealed && isCorrect ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.3s',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    border: `2px solid ${style.primary}`,
                    marginRight: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    color: style.primary,
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </div>
                <div
                  style={{
                    flex: 1,
                    fontSize: 20,
                    color: style.baseContent,
                  }}
                >
                  {option.text || option}
                </div>
                {revealed && isCorrect && (
                  <div
                    style={{
                      fontSize: 28,
                      color: style.primary,
                    }}
                  >
                    ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {showAnswer && content.explanation && (
          <div
            style={{
              marginTop: 40,
              padding: 30,
              background: `${style.primary}10`,
              borderRadius: style.borderRadius,
              opacity: interpolate(frame, [revealDelay, revealDelay + 20], [0, 1]),
            }}
          >
            <div
              style={{
                fontSize: 18,
                color: style.primary,
                fontWeight: 600,
                marginBottom: 10,
              }}
            >
              💡 Explanation
            </div>
            <div
              style={{
                fontSize: 20,
                color: style.baseContent,
                lineHeight: 1.5,
              }}
            >
              {content.explanation}
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// 5. Code Demonstration Scene
export const CodeDemoScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const lines = content.code?.split('\n') || [];
  
  return (
    <AbsoluteFill
      style={{
        background: '#1E1E1E',
        padding: 60,
        fontFamily: "'Monaco', 'Menlo', monospace",
      }}
    >
      <div
        style={{
          background: '#2D2D30',
          borderRadius: style.borderRadius,
          padding: 40,
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {content.title && (
          <div
            style={{
              fontSize: 24,
              color: style.neutralContent,
              marginBottom: 30,
              fontFamily: style.fontFamily,
            }}
          >
            {content.title}
          </div>
        )}
        <div
          style={{
            fontSize: 18,
            lineHeight: 1.8,
          }}
        >
          {lines.map((line: string, i: number) => {
            const delay = i * 5;
            const opacity = interpolate(
              frame,
              [delay, delay + 10],
              [0, 1],
              {
                extrapolateRight: 'clamp',
              }
            );
            
            return (
              <div
                key={i}
                style={{
                  opacity,
                  display: 'flex',
                }}
              >
                <span
                  style={{
                    color: style.neutralContent,
                    marginRight: 20,
                    minWidth: 30,
                    textAlign: 'right',
                  }}
                >
                  {i + 1}
                </span>
                <span
                  style={{
                    color: style.baseContent,
                    flex: 1,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: content.highlighted 
                      ? line 
                      : line.replace(/(\b(?:const|let|var|function|return|if|else|for|while)\b)/g, '<span style="color: ${style.primary};">$1</span>')
                          .replace(/(['"])([^'"]*)\1/g, '<span style="color: ${style.warning};">$1$2$1</span>')
                          .replace(/(\d+)/g, '<span style="color: ${style.success};">$1</span>')
                  }}
                />
              </div>
            );
          })}
        </div>
        {content.output && (
          <div
            style={{
              marginTop: 40,
              padding: 20,
              background: '#1E1E1E',
              borderRadius: 8,
              borderLeft: `3px solid ${style.primary}`,
            }}
          >
            <div
              style={{
                fontSize: 14,
                color: style.neutralContent,
                marginBottom: 10,
                fontFamily: style.fontFamily,
              }}
            >
              Output:
            </div>
            <div
              style={{
                fontSize: 16,
                color: style.info,
              }}
            >
              {content.output}
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// 6-9. Mind Map, Progress Tracker, Definition Card, and Case Study scenes
// These scenes require more complex implementations
// They are available in EducationalScenes2.tsx

// Placeholder exports for complex scenes
export const MindMapScene = ConceptExplanationScene; // Use ConceptExplanationScene as fallback
export const ProgressTrackerScene = LearningObjectivesScene; // Use LearningObjectivesScene as fallback
export const DefinitionCardScene = ChapterIntroScene; // Use ChapterIntroScene as fallback
export const CaseStudyScene = ConceptExplanationScene; // Use ConceptExplanationScene as fallback
