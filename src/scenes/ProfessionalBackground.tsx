import React from 'react';
import { interpolate, Easing, useCurrentFrame } from 'remotion';
import { EnhancedColorScheme } from './types';

interface ProfessionalBackgroundProps {
  style: EnhancedColorScheme;
}

export const ProfessionalBackground: React.FC<ProfessionalBackgroundProps> = ({ style }) => {
  const frame = useCurrentFrame();

  return (
    <>
      {/* Spacious Grid Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(0deg, ${style.baseContent} 0, ${style.baseContent} 1px, transparent 0, transparent 120px),
            repeating-linear-gradient(90deg, ${style.baseContent} 0, ${style.baseContent} 1px, transparent 0, transparent 120px)
          `,
          opacity: 0.08,
          zIndex: 0,
        }}
      />
      
      {/* Triangle 1 - Top Left Corner */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          left: '5%',
          width: 0,
          height: 0,
          borderLeft: '100px solid transparent',
          borderRight: '100px solid transparent',
          borderBottom: `173px solid ${style.primary}`,
          opacity: interpolate(frame, [0, 20, 100, 120], [0, 0.15, 0.15, 0], {
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          }),
          transform: `rotate(${frame * 0.3}deg) scale(${1 + Math.sin(frame * 0.04) * 0.1})`,
          transformOrigin: 'center center',
          zIndex: 0,
        }}
      />
      
      {/* Triangle 2 - Top Right Corner */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          right: '8%',
          width: 0,
          height: 0,
          borderLeft: '80px solid transparent',
          borderRight: '80px solid transparent',
          borderTop: `138px solid ${style.secondary}`,
          opacity: interpolate(frame, [0, 20, 100, 120], [0, 0.12, 0.12, 0], {
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          }),
          transform: `rotate(${-frame * 0.25}deg) scale(${1 + Math.cos(frame * 0.05) * 0.12})`,
          transformOrigin: 'center center',
          zIndex: 0,
        }}
      />
      
      {/* Triangle 3 - Bottom Right Corner */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '6%',
          width: 0,
          height: 0,
          borderLeft: '90px solid transparent',
          borderRight: '90px solid transparent',
          borderBottom: `156px solid ${style.accent}`,
          opacity: interpolate(frame, [0, 20, 100, 120], [0, 0.18, 0.18, 0], {
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          }),
          transform: `rotate(${frame * 0.35}deg) scale(${1 + Math.sin(frame * 0.045) * 0.15})`,
          transformOrigin: 'center center',
          zIndex: 0,
        }}
      />
    </>
  );
};
