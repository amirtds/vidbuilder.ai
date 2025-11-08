import { DaisyUITheme, ThemeColors } from '../services/DaisyUIThemeService';

// Re-export for backward compatibility
export type EnhancedColorScheme = ThemeColors;

// Music configuration
export interface MusicConfig {
  url?: string;
  volume?: number;
  fadeIn?: number;
  fadeOut?: number;
  startFrom?: number;
  provider?: 'pixabay' | 'freesound' | 'custom';
  genre?: string;
  mood?: string;
}

// Enhanced scene config with music and DaisyUI theme
export interface EnhancedSceneConfig {
  type: string;
  duration: number;
  content: any;
  theme?: DaisyUITheme; // DaisyUI theme name
  style?: ThemeColors; // Computed theme colors (will be derived from theme)
  music?: MusicConfig;
  transition?: 'fade' | 'slide' | 'zoom' | 'rotate' | 'blur';
  animation?: 'spring' | 'ease' | 'bounce' | 'elastic';
}

// Google Fonts collection
export const googleFonts = {
  'Inter': "'Inter', -apple-system, sans-serif",
  'SF Pro': "-apple-system, BlinkMacSystemFont, sans-serif",
  'Helvetica Neue': "'Helvetica Neue', Helvetica, sans-serif",
  'Roboto': "'Roboto', sans-serif",
  'Open Sans': "'Open Sans', sans-serif",
  'Montserrat': "'Montserrat', sans-serif",
  'Playfair Display': "'Playfair Display', serif",
  'Poppins': "'Poppins', sans-serif",
  'Raleway': "'Raleway', sans-serif",
  'Lato': "'Lato', sans-serif"
};

// Default Apple-inspired color scheme (using DaisyUI corporate theme as base)
export const appleColorScheme: EnhancedColorScheme = {
  primary: '#0071E3',
  primaryContent: '#ffffff',
  secondary: '#000000',
  secondaryContent: '#ffffff',
  accent: '#FF3B30',
  accentContent: '#ffffff',
  neutral: '#3d4451',
  neutralContent: '#ffffff',
  base100: '#FBFBFD',
  base200: '#F5F5F7',
  base300: '#E8E8EA',
  baseContent: '#1D1D1F',
  info: '#3abff8',
  infoContent: '#ffffff',
  success: '#36d399',
  successContent: '#ffffff',
  warning: '#fbbd23',
  warningContent: '#000000',
  error: '#f87272',
  errorContent: '#ffffff',
  borderRadius: 16,
  fontFamily: googleFonts['SF Pro']
};

// Dark mode Apple-inspired color scheme (using DaisyUI business theme as base)
export const appleDarkColorScheme: EnhancedColorScheme = {
  primary: '#0A84FF',
  primaryContent: '#ffffff',
  secondary: '#FFFFFF',
  secondaryContent: '#000000',
  accent: '#FF453A',
  accentContent: '#ffffff',
  neutral: '#23282e',
  neutralContent: '#ffffff',
  base100: '#000000',
  base200: '#1C1C1E',
  base300: '#2C2C2E',
  baseContent: '#FFFFFF',
  info: '#3abff8',
  infoContent: '#ffffff',
  success: '#36d399',
  successContent: '#ffffff',
  warning: '#fbbd23',
  warningContent: '#000000',
  error: '#f87272',
  errorContent: '#ffffff',
  borderRadius: 16,
  fontFamily: googleFonts['SF Pro']
};

// Music genres for selection
export const musicGenres = [
  'ambient',
  'electronic',
  'corporate',
  'upbeat',
  'cinematic',
  'inspiring',
  'calm',
  'energetic',
  'modern',
  'tech'
];

// Music moods for selection
export const musicMoods = [
  'happy',
  'exciting',
  'relaxing',
  'motivational',
  'dramatic',
  'peaceful',
  'uplifting',
  'professional',
  'playful',
  'serious'
];
