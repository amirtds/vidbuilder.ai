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

// 1. Minimal Title Scene - Apple Style
export const MinimalTitleScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  
  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const slideUp = interpolate(frame, [0, 30], [20, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: style.background,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: style.fontFamily,
      }}
    >
      <div
        style={{
          textAlign: 'center',
          opacity: fadeIn,
          transform: `translateY(${slideUp}px)`,
          padding: '0 60px',
        }}
      >
        {content.superTitle && (
          <div
            style={{
              fontSize: 18,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: style.accent,
              marginBottom: 20,
              fontWeight: 600,
            }}
          >
            {content.superTitle}
          </div>
        )}
        <h1
          style={{
            fontSize: content.fontSize || 72,
            fontWeight: content.fontWeight || 700,
            color: style.text,
            margin: 0,
            letterSpacing: -2,
            lineHeight: 1.1,
          }}
        >
          {content.title}
        </h1>
        {content.subtitle && (
          <p
            style={{
              fontSize: 28,
              color: style.textLight,
              marginTop: 20,
              fontWeight: 400,
              letterSpacing: 0.5,
            }}
          >
            {content.subtitle}
          </p>
        )}
      </div>
    </AbsoluteFill>
  );
};

// 2. Split Screen Scene
export const SplitScreenScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  
  const leftSlide = interpolate(frame, [0, 30], [-100, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  
  const rightSlide = interpolate(frame, [0, 30], [100, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{flexDirection: 'row', fontFamily: style.fontFamily}}>
      <div
        style={{
          flex: 1,
          background: style.primary,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `translateX(${leftSlide}%)`,
        }}
      >
        {content.leftImage ? (
          <Img src={content.leftImage} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        ) : (
          <div style={{padding: 60, color: '#fff'}}>
            <h2 style={{fontSize: 48, marginBottom: 20}}>{content.leftTitle}</h2>
            <p style={{fontSize: 24, opacity: 0.9}}>{content.leftText}</p>
          </div>
        )}
      </div>
      <div
        style={{
          flex: 1,
          background: style.background,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `translateX(${rightSlide}%)`,
        }}
      >
        <div style={{padding: 60}}>
          <h2 style={{fontSize: 48, color: style.text, marginBottom: 20}}>{content.rightTitle}</h2>
          <p style={{fontSize: 24, color: style.textLight}}>{content.rightText}</p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 3. Statistics Dashboard Scene
export const StatsDashboardScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const stats = content.stats || [];

  return (
    <AbsoluteFill
      style={{
        background: style.background,
        padding: 80,
        fontFamily: style.fontFamily,
      }}
    >
      {content.title && (
        <h2
          style={{
            fontSize: 56,
            color: style.text,
            textAlign: 'center',
            marginBottom: 80,
            fontWeight: 700,
          }}
        >
          {content.title}
        </h2>
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`,
          gap: 40,
        }}
      >
        {stats.map((stat: any, i: number) => {
          const delay = i * 10;
          const scale = spring({
            fps,
            frame: frame - delay,
            config: {
              damping: 12,
              stiffness: 200,
            },
          });
          
          const countUp = interpolate(
            frame,
            [delay, delay + 30],
            [0, stat.value || 100],
            {
              extrapolateRight: 'clamp',
            }
          );
          
          return (
            <div
              key={i}
              style={{
                transform: `scale(${scale})`,
                background: '#fff',
                borderRadius: style.borderRadius,
                padding: 40,
                textAlign: 'center',
                boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
              }}
            >
              <div
                style={{
                  fontSize: 64,
                  fontWeight: 700,
                  color: style.primary,
                  marginBottom: 10,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {Math.floor(countUp)}{stat.suffix || ''}
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: style.textLight,
                  fontWeight: 500,
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

// 4. Testimonial Scene
export const TestimonialScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  
  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: style.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
        fontFamily: style.fontFamily,
      }}
    >
      <div
        style={{
          maxWidth: 800,
          textAlign: 'center',
          opacity: fadeIn,
        }}
      >
        <div
          style={{
            fontSize: 72,
            color: style.primary,
            marginBottom: 40,
          }}
        >
          "
        </div>
        <p
          style={{
            fontSize: 32,
            color: style.text,
            lineHeight: 1.6,
            fontWeight: 400,
            fontStyle: 'italic',
            marginBottom: 40,
          }}
        >
          {content.quote}
        </p>
        {content.avatar && (
          <Img
            src={content.avatar}
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              marginBottom: 20,
            }}
          />
        )}
        <div
          style={{
            fontSize: 24,
            color: style.text,
            fontWeight: 600,
          }}
        >
          {content.author}
        </div>
        {content.role && (
          <div
            style={{
              fontSize: 18,
              color: style.textLight,
              marginTop: 8,
            }}
          >
            {content.role}
          </div>
        )}
        {content.rating && (
          <div
            style={{
              marginTop: 20,
              fontSize: 28,
            }}
          >
            {'⭐'.repeat(content.rating)}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// 5. Timeline Scene
export const TimelineScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const events = content.events || [];

  return (
    <AbsoluteFill
      style={{
        background: style.background,
        padding: 60,
        fontFamily: style.fontFamily,
      }}
    >
      {content.title && (
        <h2
          style={{
            fontSize: 48,
            color: style.text,
            textAlign: 'center',
            marginBottom: 60,
            fontWeight: 700,
          }}
        >
          {content.title}
        </h2>
      )}
      <div style={{position: 'relative', maxWidth: 1000, margin: '0 auto'}}>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 2,
            background: style.primary,
            transform: 'translateX(-50%)',
          }}
        />
        {events.map((event: any, i: number) => {
          const delay = i * 20;
          const slideIn = interpolate(
            frame,
            [delay, delay + 20],
            [50, 0],
            {
              extrapolateRight: 'clamp',
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
          
          const isLeft = i % 2 === 0;
          
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 60,
                opacity,
                transform: `translateX(${isLeft ? -slideIn : slideIn}px)`,
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
                    <div style={{fontSize: 18, color: style.primary, fontWeight: 600}}>
                      {event.date}
                    </div>
                    <div style={{fontSize: 24, color: style.text, marginTop: 8}}>
                      {event.title}
                    </div>
                  </>
                )}
              </div>
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: style.primary,
                  border: `4px solid ${style.background}`,
                  zIndex: 1,
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
                    <div style={{fontSize: 18, color: style.primary, fontWeight: 600}}>
                      {event.date}
                    </div>
                    <div style={{fontSize: 24, color: style.text, marginTop: 8}}>
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

// 6. Pricing Cards Scene
export const PricingCardsScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const plans = content.plans || [];

  return (
    <AbsoluteFill
      style={{
        background: style.backgroundGradient || style.background,
        padding: 60,
        fontFamily: style.fontFamily,
      }}
    >
      {content.title && (
        <h2
          style={{
            fontSize: 48,
            color: style.text,
            textAlign: 'center',
            marginBottom: 60,
            fontWeight: 700,
          }}
        >
          {content.title}
        </h2>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 30,
          alignItems: 'stretch',
        }}
      >
        {plans.map((plan: any, i: number) => {
          const delay = i * 10;
          const scale = spring({
            fps,
            frame: frame - delay,
            config: {
              damping: 10,
              stiffness: 100,
            },
          });
          
          const featured = plan.featured;
          
          return (
            <div
              key={i}
              style={{
                transform: `scale(${scale})`,
                background: featured ? style.primary : '#fff',
                borderRadius: style.borderRadius,
                padding: 40,
                width: 280,
                boxShadow: featured 
                  ? '0 20px 60px rgba(0,0,0,0.2)' 
                  : '0 10px 40px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {plan.badge && (
                <div
                  style={{
                    background: featured ? '#fff' : style.accent,
                    color: featured ? style.primary : '#fff',
                    padding: '6px 12px',
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                    display: 'inline-block',
                    marginBottom: 20,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    alignSelf: 'flex-start',
                  }}
                >
                  {plan.badge}
                </div>
              )}
              <div
                style={{
                  fontSize: 24,
                  color: featured ? '#fff' : style.text,
                  fontWeight: 600,
                  marginBottom: 10,
                }}
              >
                {plan.name}
              </div>
              <div
                style={{
                  fontSize: 48,
                  color: featured ? '#fff' : style.primary,
                  fontWeight: 700,
                  marginBottom: 5,
                }}
              >
                {plan.price}
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: featured ? 'rgba(255,255,255,0.8)' : style.textLight,
                  marginBottom: 30,
                }}
              >
                {plan.period}
              </div>
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
                      fontSize: 16,
                      color: featured ? 'rgba(255,255,255,0.9)' : style.textLight,
                      marginBottom: 15,
                      display: 'flex',
                      alignItems: 'flex-start',
                    }}
                  >
                    <span style={{marginRight: 10, color: featured ? '#fff' : style.primary}}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// 7. Icon Grid Scene
export const IconGridScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const items = content.items || [];

  return (
    <AbsoluteFill
      style={{
        background: style.backgroundGradient || style.background,
        padding: 80,
        fontFamily: style.fontFamily,
      }}
    >
      {content.title && (
        <h2
          style={{
            fontSize: 48,
            color: style.text,
            textAlign: 'center',
            marginBottom: 60,
            fontWeight: 700,
          }}
        >
          {content.title}
        </h2>
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${content.columns || 4}, 1fr)`,
          gap: 40,
          maxWidth: 1000,
          margin: '0 auto',
        }}
      >
        {items.map((item: any, i: number) => {
          const delay = i * 5;
          const scale = spring({
            fps,
            frame: frame - delay,
            config: {
              damping: 15,
              stiffness: 100,
            },
          });
          
          return (
            <div
              key={i}
              style={{
                transform: `scale(${scale})`,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  background: `${style.primary}20`,
                  borderRadius: style.borderRadius,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: 40,
                }}
              >
                {item.icon}
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: style.text,
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                {item.title}
              </div>
              {item.description && (
                <div
                  style={{
                    fontSize: 14,
                    color: style.textLight,
                    lineHeight: 1.4,
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

// 8. Product Matrix Scene
export const ProductMatrixScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const products = content.products || [];

  return (
    <AbsoluteFill
      style={{
        background: style.backgroundGradient || style.background,
        padding: 60,
        fontFamily: style.fontFamily,
      }}
    >
      {content.title && (
        <h2
          style={{
            fontSize: 48,
            color: style.text,
            textAlign: 'center',
            marginBottom: 60,
            fontWeight: 700,
          }}
        >
          {content.title}
        </h2>
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${content.columns || 3}, 1fr)`,
          gap: 30,
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {products.map((product: any, i: number) => {
          const delay = i * 8;
          const scale = spring({
            fps,
            frame: frame - delay,
            config: {
              damping: 12,
              stiffness: 100,
            },
          });
          
          return (
            <div
              key={i}
              style={{
                transform: `scale(${scale})`,
                background: '#fff',
                borderRadius: style.borderRadius,
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
              }}
            >
              {product.image && (
                <div style={{position: 'relative', paddingBottom: '75%'}}>
                  <Img
                    src={product.image}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  {product.badge && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 15,
                        right: 15,
                        background: style.accent,
                        color: '#fff',
                        padding: '4px 12px',
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {product.badge}
                    </div>
                  )}
                </div>
              )}
              <div style={{padding: 25}}>
                <div
                  style={{
                    fontSize: 20,
                    color: style.text,
                    fontWeight: 600,
                    marginBottom: 8,
                  }}
                >
                  {product.name}
                </div>
                {product.description && (
                  <div
                    style={{
                      fontSize: 14,
                      color: style.textLight,
                      marginBottom: 12,
                      lineHeight: 1.4,
                    }}
                  >
                    {product.description}
                  </div>
                )}
                {product.price && (
                  <div
                    style={{
                      fontSize: 24,
                      color: style.primary,
                      fontWeight: 700,
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

// 9. Process Flow Scene
export const ProcessFlowScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const steps = content.steps || [];

  return (
    <AbsoluteFill
      style={{
        background: style.backgroundGradient || style.background,
        padding: 80,
        fontFamily: style.fontFamily,
      }}
    >
      {content.title && (
        <h2
          style={{
            fontSize: 48,
            color: style.text,
            textAlign: 'center',
            marginBottom: 80,
            fontWeight: 700,
          }}
        >
          {content.title}
        </h2>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {steps.map((step: any, i: number) => {
          const delay = i * 15;
          const opacity = interpolate(
            frame,
            [delay, delay + 15],
            [0, 1],
            {
              extrapolateRight: 'clamp',
            }
          );
          const scale = interpolate(
            frame,
            [delay, delay + 15],
            [0.5, 1],
            {
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.back()),
            }
          );
          
          return (
            <React.Fragment key={i}>
              <div
                style={{
                  opacity,
                  transform: `scale(${scale})`,
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${style.primary}, ${style.secondary})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 48,
                      color: '#fff',
                      fontWeight: 700,
                    }}
                  >
                    {step.number || i + 1}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 20,
                    color: style.text,
                    fontWeight: 600,
                    maxWidth: 150,
                  }}
                >
                  {step.title}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div
                  style={{
                    width: 60,
                    height: 2,
                    background: style.primary,
                    opacity: opacity * 0.5,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// 10. Countdown Timer Scene
export const CountdownScene: React.FC<{content: any; style: EnhancedColorScheme}> = ({content, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const totalSeconds = content.duration || 10;
  const currentSecond = Math.max(0, totalSeconds - Math.floor(frame / fps));
  
  const scale = interpolate(
    frame % fps,
    [0, fps * 0.1],
    [1, 1.2],
    {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
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
      <div style={{textAlign: 'center'}}>
        {content.title && (
          <h2
            style={{
              fontSize: 48,
              color: '#fff',
              marginBottom: 60,
              fontWeight: 700,
            }}
          >
            {content.title}
          </h2>
        )}
        <div
          style={{
            fontSize: 180,
            fontWeight: 700,
            color: '#fff',
            fontVariantNumeric: 'tabular-nums',
            transform: `scale(${scale})`,
            textShadow: '0 10px 40px rgba(0,0,0,0.3)',
          }}
        >
          {currentSecond}
        </div>
        {content.subtitle && (
          <p
            style={{
              fontSize: 32,
              color: 'rgba(255,255,255,0.9)',
              marginTop: 40,
            }}
          >
            {content.subtitle}
          </p>
        )}
      </div>
    </AbsoluteFill>
  );
};
