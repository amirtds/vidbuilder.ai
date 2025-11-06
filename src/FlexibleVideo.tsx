import React from 'react';
import { Sequence, useVideoConfig } from 'remotion';
import {
  getSceneTemplate,
  defaultColorScheme,
  educationalColorScheme,
  ColorScheme,
  SceneConfig
} from './SceneTemplates';

export interface VideoConfig {
  title: string;
  type: 'promotional' | 'educational' | 'custom';
  colorScheme?: ColorScheme;
  scenes: SceneConfig[];
  fps?: number;
  resolution?: {
    width: number;
    height: number;
  };
}

export const FlexibleVideo: React.FC<VideoConfig> = ({
  title,
  type,
  colorScheme,
  scenes,
}) => {
  const {fps} = useVideoConfig();
  
  // Choose default color scheme based on video type
  const defaultScheme = type === 'educational' ? educationalColorScheme : defaultColorScheme;
  const activeColorScheme = colorScheme || defaultScheme;
  
  let currentFrame = 0;
  
  return (
    <>
      {scenes.map((scene, index) => {
        const SceneComponent = getSceneTemplate(scene.type);
        
        if (!SceneComponent) {
          console.warn(`Unknown scene type: ${scene.type}`);
          return null;
        }
        
        const sceneDuration = Math.floor(scene.duration * fps);
        const sceneStyle = scene.style || activeColorScheme;
        
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

// Example promotional video configuration
export const examplePromoConfig: VideoConfig = {
  title: "Product Promo Video",
  type: "promotional",
  colorScheme: {
    primary: "#FF6B6B",
    secondary: "#4ECDC4",
    accent: "#95E77E",
    text: "#FFFFFF",
    textLight: "#F7F7F7",
    background: "#1A1A1A",
    backgroundGradient: "linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)",
    borderRadius: 20
  },
  scenes: [
    {
      type: "hero-title",
      duration: 3,
      content: {
        title: "Amazing Product",
        subtitle: "Transform Your Experience",
        fontSize: 90
      }
    },
    {
      type: "product-showcase",
      duration: 6,
      content: {
        title: "See It In Action",
        images: [],
        captions: [],
        fitMode: "contain"
      }
    },
    {
      type: "feature-list",
      duration: 5,
      content: {
        title: "Key Features",
        features: [
          {
            icon: "⚡",
            title: "Lightning Fast",
            text: "Process data 10x faster than competitors"
          },
          {
            icon: "🔒",
            title: "Secure",
            text: "Enterprise-grade security built in"
          },
          {
            icon: "🌐",
            title: "Global Scale",
            text: "Works seamlessly across the world"
          }
        ]
      }
    },
    {
      type: "cta",
      duration: 3,
      content: {
        title: "Get Started Today",
        description: "Join thousands of happy customers",
        buttonText: "Try It Free",
        urgency: "Limited time offer - 30% off",
        titleSize: 70
      }
    }
  ]
};

// Example educational video configuration
export const exampleEducationalConfig: VideoConfig = {
  title: "Educational Video",
  type: "educational",
  scenes: [
    {
      type: "lesson-title",
      duration: 3,
      content: {
        lessonNumber: "1",
        title: "Introduction to Our Product",
        objectives: ["Understand basics", "Learn features", "Master usage"]
      }
    },
    {
      type: "step-by-step",
      duration: 9,
      content: {
        title: "Getting Started",
        stepDuration: 3,
        steps: [
          {
            title: "Create Your Account",
            description: "Sign up with your email and choose a password",
            image: ""
          },
          {
            title: "Configure Settings",
            description: "Customize the platform to your needs",
            image: ""
          },
          {
            title: "Start Using",
            description: "You're ready to explore all features",
            image: ""
          }
        ]
      }
    },
    {
      type: "comparison",
      duration: 5,
      content: {
        title: "Before vs After",
        left: {
          title: "Traditional Way",
          points: [
            "Time consuming",
            "Error prone",
            "Limited features"
          ]
        },
        right: {
          title: "With Our Product",
          points: [
            "Fast and efficient",
            "Accurate results",
            "Advanced capabilities"
          ]
        }
      }
    },
    {
      type: "key-takeaways",
      duration: 4,
      content: {
        title: "What You've Learned",
        takeaways: [
          {
            icon: "🎯",
            text: "Core product features"
          },
          {
            icon: "🚀",
            text: "How to get started"
          },
          {
            icon: "💡",
            text: "Best practices"
          },
          {
            icon: "🔧",
            text: "Configuration tips"
          }
        ]
      }
    },
    {
      type: "quiz",
      duration: 6,
      content: {
        question: "What is the main benefit of our product?",
        options: [
          { text: "It's free", correct: false },
          { text: "Increases productivity by 10x", correct: true },
          { text: "Works offline only", correct: false },
          { text: "Requires no setup", correct: false }
        ],
        explanation: "Our product's main benefit is the dramatic increase in productivity through automation and intelligent features.",
        revealDelay: 3
      }
    }
  ]
};
