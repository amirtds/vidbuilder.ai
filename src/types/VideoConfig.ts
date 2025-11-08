/**
 * Video Configuration Types
 * Using DaisyUI themes following DESIGN.md principles
 */

import { DaisyUITheme, ThemeColors } from '../services/DaisyUIThemeService';
import { MusicConfig } from '../scenes/types';

export interface VideoScene {
  type: string;
  duration: number;
  content: any;
  transition?: 'fade' | 'slide' | 'zoom' | 'rotate' | 'blur';
  animation?: 'spring' | 'ease' | 'bounce' | 'elastic';
}

export interface EnhancedVideoConfig {
  title: string;
  type: 'promotional' | 'educational' | 'custom';
  theme: DaisyUITheme; // DaisyUI theme name (e.g., 'corporate', 'lofi', 'winter')
  colorScheme?: ThemeColors; // Will be computed from theme
  scenes: VideoScene[];
  music?: MusicConfig;
  fontFamily?: string; // Will use system font if not specified
}

/**
 * Legacy support for old color scheme format
 */
export interface LegacyColorScheme {
  primary: string;
  secondary: string;
  accent?: string;
  text: string;
  textLight: string;
  background: string;
  backgroundGradient?: string; // Deprecated per DESIGN.md
  borderRadius: number;
}

export interface LegacyVideoConfig {
  title: string;
  type: string;
  colorScheme: LegacyColorScheme;
  scenes: VideoScene[];
}
