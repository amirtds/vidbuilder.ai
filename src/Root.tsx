import React from 'react';
import { Composition } from 'remotion';
import { PromoVideo } from './PromoVideo';
import { FlexibleVideo, examplePromoConfig, exampleEducationalConfig } from './FlexibleVideo';
import { EnhancedFlexibleVideo } from './EnhancedFlexibleVideo';
import { appleColorScheme } from './scenes/types';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Legacy promotional video for backward compatibility */}
      <Composition
        id="PromoVideo"
        component={PromoVideo}
        durationInFrames={30 * 30} // 30 seconds at 30 fps
        fps={30}
        width={1920}
        height={1080}
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
        width={1920}
        height={1080}
        defaultProps={examplePromoConfig}
      />
      
      {/* Promotional video template */}
      <Composition
        id="PromoTemplate"
        component={FlexibleVideo}
        durationInFrames={17 * 30} // 17 seconds total
        fps={30}
        width={1920}
        height={1080}
        defaultProps={examplePromoConfig}
      />
      
      {/* Educational video template */}
      <Composition
        id="EducationalTemplate"
        component={FlexibleVideo}
        durationInFrames={27 * 30} // 27 seconds total
        fps={30}
        width={1920}
        height={1080}
        defaultProps={exampleEducationalConfig}
      />
      
      {/* Enhanced Flexible Video with all new features */}
      <Composition
        id="EnhancedFlexibleVideo"
        component={EnhancedFlexibleVideo}
        durationInFrames={30 * 30} // Dynamic duration
        fps={30}
        width={1920}
        height={1080}
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
