import React from 'react';
import { Audio, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface BackgroundMusicProps {
  src: string;
  volume?: number;
  fadeInDuration?: number;  // Duration in seconds
  fadeOutDuration?: number; // Duration in seconds
  startFrom?: number;
  totalDurationInFrames: number;
}

/**
 * BackgroundMusic component with automatic fade-in and fade-out
 * 
 * This component ensures music smoothly fades in at the start and fades out
 * at the end of the video, preventing abrupt cuts that confuse viewers.
 */
export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
  src,
  volume = 0.3,
  fadeInDuration = 2,
  fadeOutDuration = 3,
  startFrom = 0,
  totalDurationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Convert fade durations from seconds to frames
  const fadeInFrames = Math.floor(fadeInDuration * fps);
  const fadeOutFrames = Math.floor(fadeOutDuration * fps);
  const fadeOutStartFrame = totalDurationInFrames - fadeOutFrames;

  // Calculate volume with fade effects
  let currentVolume = volume;

  // Fade in at the start
  if (frame < fadeInFrames) {
    const fadeInProgress = interpolate(
      frame,
      [0, fadeInFrames],
      [0, 1],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }
    );
    currentVolume = volume * fadeInProgress;
  }
  // Fade out at the end
  else if (frame >= fadeOutStartFrame) {
    const fadeOutProgress = interpolate(
      frame,
      [fadeOutStartFrame, totalDurationInFrames],
      [1, 0],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }
    );
    currentVolume = volume * fadeOutProgress;
  }

  return (
    <Audio
      src={src}
      volume={currentVolume}
      startFrom={startFrom}
    />
  );
};
