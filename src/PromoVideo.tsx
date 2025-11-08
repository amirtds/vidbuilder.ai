import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  Video,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile
} from 'remotion';

// Scene 1: Dynamic Title Intro
const TitleScene: React.FC<{title: string}> = ({title}) => {
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

  const letterSpacing = interpolate(frame, [0, 30], [20, 2], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: '#667eea',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontSize: 80,
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          transform: `scale(${scale})`,
          opacity,
          letterSpacing: `${letterSpacing}px`,
          textShadow: '0 4px 20px rgba(0,0,0,0.3)',
          fontFamily: 'SF Pro Display, Arial, sans-serif',
        }}
      >
        {title}
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Product Screenshots Showcase
const ScreenshotScene: React.FC<{screenshots: string[]}> = ({screenshots}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  if (screenshots.length === 0) {
    return (
      <AbsoluteFill
        style={{
          background: '#f093fb',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{
          fontSize: 60,
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
          fontFamily: 'SF Pro Display, Arial, sans-serif',
        }}>
          Amazing Product Showcase
        </div>
      </AbsoluteFill>
    );
  }

  const currentIndex = Math.floor(frame / 30) % screenshots.length;
  const slideProgress = (frame % 30) / 30;
  
  const translateX = interpolate(slideProgress, [0, 0.5, 1], [100, 0, -100]);
  const scale = interpolate(slideProgress, [0, 0.5, 1], [0.8, 1, 0.8], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '80%',
          height: '80%',
          transform: `translateX(${translateX}px) scale(${scale})`,
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        <Img
          src={screenshots[currentIndex]}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Feature Highlights with Animation
const FeaturesScene: React.FC<{description: string}> = ({description}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const features = description.split('.').filter(f => f.trim()).slice(0, 3);
  
  return (
    <AbsoluteFill
      style={{
        background: '#fa709a',
        padding: 100,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{textAlign: 'center'}}>
        <h2
          style={{
            fontSize: 60,
            color: 'white',
            marginBottom: 60,
            fontWeight: 'bold',
            textShadow: '0 4px 20px rgba(0,0,0,0.2)',
            fontFamily: 'SF Pro Display, Arial, sans-serif',
          }}
        >
          Key Features
        </h2>
        {features.map((feature, i) => {
          const delay = i * 10;
          const opacity = interpolate(
            frame,
            [delay, delay + 15],
            [0, 1],
            {extrapolateRight: 'clamp'}
          );
          const translateY = interpolate(
            frame,
            [delay, delay + 15],
            [50, 0],
            {extrapolateRight: 'clamp'}
          );
          
          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateY(${translateY}px)`,
                fontSize: 36,
                color: 'white',
                margin: '30px 0',
                padding: '20px 40px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: 15,
                backdropFilter: 'blur(10px)',
                fontFamily: 'SF Pro Display, Arial, sans-serif',
              }}
            >
              ✨ {feature.trim()}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Call to Action
const CTAScene: React.FC<{title: string}> = ({title}) => {
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
        background: '#667eea',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          fontSize: 70,
          color: 'white',
          marginBottom: 50,
          fontWeight: 'bold',
          textAlign: 'center',
          fontFamily: 'SF Pro Display, Arial, sans-serif',
        }}
      >
        Get {title} Now!
      </div>
      <div
        style={{
          transform: `scale(${buttonScale * pulse})`,
          background: 'white',
          color: '#667eea',
          padding: '30px 60px',
          fontSize: 40,
          fontWeight: 'bold',
          borderRadius: 50,
          cursor: 'pointer',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
          fontFamily: 'SF Pro Display, Arial, sans-serif',
        }}
      >
        Shop Now
      </div>
      <div
        style={{
          marginTop: 40,
          fontSize: 24,
          color: 'white',
          opacity: 0.9,
          fontFamily: 'SF Pro Display, Arial, sans-serif',
        }}
      >
        Limited Time Offer
      </div>
    </AbsoluteFill>
  );
};

// Main Composition
export const PromoVideo: React.FC<{
  title: string;
  description: string;
  screenshots: string[];
  duration: number;
}> = ({title, description, screenshots, duration = 30}) => {
  const {fps} = useVideoConfig();
  const sceneDuration = Math.floor((duration * fps) / 4);

  return (
    <>
      <Sequence from={0} durationInFrames={sceneDuration}>
        <TitleScene title={title} />
      </Sequence>
      
      <Sequence from={sceneDuration} durationInFrames={sceneDuration}>
        <ScreenshotScene screenshots={screenshots} />
      </Sequence>
      
      <Sequence from={sceneDuration * 2} durationInFrames={sceneDuration}>
        <FeaturesScene description={description} />
      </Sequence>
      
      <Sequence from={sceneDuration * 3} durationInFrames={sceneDuration}>
        <CTAScene title={title} />
      </Sequence>
    </>
  );
};
