import React from 'react';
import { Composition } from 'remotion';
import { PromoVideo } from './PromoVideo';
import { FlexibleVideo, examplePromoConfig, exampleEducationalConfig } from './FlexibleVideo';
import { EnhancedFlexibleVideo } from './EnhancedFlexibleVideo';
import { appleColorScheme } from './scenes/types';

/**
 * Video Quality: 4K Ultra HD (3840x2160)
 * 
 * To change quality preset, edit: video-quality-config.js
 * Available presets: 4K, 1080p, 720p, 4K_60fps, 1080p_60fps
 */

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Legacy promotional video for backward compatibility */}
      <Composition
        id="PromoVideo"
        component={PromoVideo}
        durationInFrames={30 * 30} // 30 seconds at 30 fps
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          title: 'Amazing Product',
          description: 'This product will revolutionize your life. It has amazing features and incredible benefits. Experience the future today with our innovative solution.',
          screenshots: [],
          duration: 30,
        }}
      />
      
      {/* New flexible video system */}
      <Composition
        id="FlexibleVideo"
        component={FlexibleVideo}
        durationInFrames={30 * 30} // Will be dynamically calculated
        fps={30}
        width={3840}
        height={2160}
        defaultProps={examplePromoConfig}
      />
      
      {/* Promotional video template */}
      <Composition
        id="PromoTemplate"
        component={FlexibleVideo}
        durationInFrames={17 * 30} // 17 seconds total
        fps={30}
        width={3840}
        height={2160}
        defaultProps={examplePromoConfig}
      />
      
      {/* Educational video template */}
      <Composition
        id="EducationalTemplate"
        component={FlexibleVideo}
        durationInFrames={27 * 30} // 27 seconds total
        fps={30}
        width={3840}
        height={2160}
        defaultProps={exampleEducationalConfig}
      />
      
      {/* Enhanced Flexible Video with all new features */}
      <Composition
        id="EnhancedFlexibleVideo"
        component={EnhancedFlexibleVideo}
        durationInFrames={30 * 30} // Dynamic duration
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          title: 'Enhanced Video',
          type: 'promotional',
          colorScheme: appleColorScheme,
          scenes: [
            {
              type: 'minimal-title',
              duration: 3,
              content: {
                superTitle: 'INTRODUCING',
                title: 'The Future of Video',
                subtitle: 'Powered by AI'
              }
            }
          ],
          music: {
            enabled: false
          }
        }}
      />
    </>
  );
};
