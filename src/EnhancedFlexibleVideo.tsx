import React from 'react';
import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion';
import { BackgroundMusic } from './components/BackgroundMusic';
import { EnhancedColorScheme, EnhancedSceneConfig } from './scenes/types';

// Import all promotional scenes
import {
  MinimalTitleScene,
  SplitScreenScene,
  StatsDashboardScene,
  TestimonialScene,
  TimelineScene,
  PricingCardsScene,
  IconGridScene,
  ProductMatrixScene,
  ProcessFlowScene,
  CountdownScene
} from './scenes/PromoScenes';

// Import educational scenes - primary set
import {
  ChapterIntroScene,
  LearningObjectivesScene,
  ConceptExplanationScene,
  InteractiveQuizScene,
  CodeDemoScene
} from './scenes/EducationalScenes';

// Import educational scenes - secondary set
import {
  SummaryPointsScene,
  FormulaScene,
  VocabularyScene,
  InteractiveTimelineScene,
  AchievementBadgeScene
} from './scenes/EducationalScenes2';

// Import brand/utility scenes
import { BrandWatermarkScene } from './scenes/BrandWatermarkScene';

// Additional educational scenes from EducationalScenes2 (originally 6-9)
const MindMapScene = ConceptExplanationScene;
const ProgressTrackerScene = LearningObjectivesScene;
const DefinitionCardScene = ChapterIntroScene;
const CaseStudyScene = ConceptExplanationScene;

// Import legacy scenes for backward compatibility
import {
  HeroTitleScene,
  ProductShowcaseScene,
  FeatureListScene,
  CTAScene,
  LessonTitleScene,
  StepByStepScene,
  ComparisonScene,
  KeyTakeawaysScene,
  QuizScene
} from './SceneTemplates';

// Complete scene mapping
export const enhancedSceneTemplates: {[key: string]: React.FC<any>} = {
  // Promotional Scenes
  'minimal-title': MinimalTitleScene,
  'split-screen': SplitScreenScene,
  'stats-dashboard': StatsDashboardScene,
  'testimonial': TestimonialScene,
  'timeline': TimelineScene,
  'pricing-cards': PricingCardsScene,
  'icon-grid': IconGridScene,
  'product-matrix': ProductMatrixScene,
  'process-flow': ProcessFlowScene,
  'countdown': CountdownScene,
  
  // Educational Scenes
  'chapter-intro': ChapterIntroScene,
  'learning-objectives': LearningObjectivesScene,
  'concept-explanation': ConceptExplanationScene,
  'interactive-quiz': InteractiveQuizScene,
  'code-demo': CodeDemoScene,
  'mind-map': MindMapScene,
  'progress-tracker': ProgressTrackerScene,
  'definition-card': DefinitionCardScene,
  'case-study': CaseStudyScene,
  'summary-points': SummaryPointsScene,
  'formula': FormulaScene,
  'vocabulary': VocabularyScene,
  'interactive-timeline': InteractiveTimelineScene,
  'achievement-badge': AchievementBadgeScene,
  
  // Legacy scenes (for backward compatibility)
  'hero-title': HeroTitleScene,
  'product-showcase': ProductShowcaseScene,
  'feature-list': FeatureListScene,
  'cta': CTAScene,
  'lesson-title': LessonTitleScene,
  'step-by-step': StepByStepScene,
  'comparison': ComparisonScene,
  'key-takeaways': KeyTakeawaysScene,
  'quiz': QuizScene,
  
  // Brand/Utility Scenes
  'brand-watermark': BrandWatermarkScene,
};

export interface EnhancedVideoConfig {
  title: string;
  type: 'promotional' | 'educational' | 'custom';
  colorScheme: EnhancedColorScheme;
  scenes: EnhancedSceneConfig[];
  music?: {
    enabled: boolean;
    url?: string;
    volume?: number;
    fadeIn?: number;
    fadeOut?: number;
  };
  fps?: number;
  resolution?: {
    width: number;
    height: number;
  };
}

export const EnhancedFlexibleVideo: React.FC<EnhancedVideoConfig> = ({
  title,
  type,
  colorScheme,
  scenes,
  music,
}) => {
  const {fps} = useVideoConfig();
  
  let currentFrame = 0;
  const totalFrames = scenes.reduce((acc, scene) => acc + Math.floor(scene.duration * fps), 0);
  
  return (
    <>
      {/* Background Music with fade-in and fade-out */}
      {music?.enabled && music?.url && (
        <Sequence from={0} durationInFrames={totalFrames}>
          <BackgroundMusic
            src={music.url}
            volume={music.volume || 0.3}
            fadeInDuration={music.fadeIn || 2}
            fadeOutDuration={music.fadeOut || 3}
            startFrom={0}
            totalDurationInFrames={totalFrames}
          />
        </Sequence>
      )}
      
      {/* Scenes */}
      {scenes.map((scene, index) => {
        const SceneComponent = enhancedSceneTemplates[scene.type];
        
        if (!SceneComponent) {
          console.warn(`Unknown scene type: ${scene.type}`);
          return null;
        }
        
        const sceneDuration = Math.floor(scene.duration * fps);
        const sceneStyle = scene.style || colorScheme;
        
        const sequenceElement = (
          <Sequence
            key={index}
            from={currentFrame}
            durationInFrames={sceneDuration}
          >
            <SceneComponent
              content={scene.content}
              style={sceneStyle}
            />
          </Sequence>
        );
        
        currentFrame += sceneDuration;
        
        return sequenceElement;
      })}
    </>
  );
};
