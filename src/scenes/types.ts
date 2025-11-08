// DaisyUI Theme-based color scheme (DESIGN.md compliant: no gradients, solid colors only)
export interface EnhancedColorScheme {
  primary: string;
  primaryContent: string;
  secondary: string;
  secondaryContent: string;
  accent: string;
  accentContent: string;
  neutral: string;
  neutralContent: string;
  base100: string;
  base200: string;
  base300: string;
  baseContent: string;
  info: string;
  success: string;
  warning: string;
  error: string;
  borderRadius: number;
  fontFamily: string;
}

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

// Enhanced scene config with music
export interface EnhancedSceneConfig {
  type: string;
  duration: number;
  content: any;
  style?: EnhancedColorScheme;
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

// Default DaisyUI-inspired color scheme (light theme)
export const appleColorScheme: EnhancedColorScheme = {
  primary: '#0071E3',
  primaryContent: '#FFFFFF',
  secondary: '#000000',
  secondaryContent: '#FFFFFF',
  accent: '#FF3B30',
  accentContent: '#FFFFFF',
  neutral: '#3D4451',
  neutralContent: '#FFFFFF',
  base100: '#FBFBFD',
  base200: '#F2F2F2',
  base300: '#E5E6E6',
  baseContent: '#1D1D1F',
  info: '#3ABFF8',
  success: '#36D399',
  warning: '#FBBD23',
  error: '#F87272',
  borderRadius: 16,
  fontFamily: googleFonts['SF Pro']
};

// Dark mode DaisyUI-inspired color scheme
export const appleDarkColorScheme: EnhancedColorScheme = {
  primary: '#0A84FF',
  primaryContent: '#FFFFFF',
  secondary: '#FFFFFF',
  secondaryContent: '#000000',
  accent: '#FF453A',
  accentContent: '#FFFFFF',
  neutral: '#191D24',
  neutralContent: '#A6ADBB',
  base100: '#000000',
  base200: '#0D0D0D',
  base300: '#1A1A1A',
  baseContent: '#FFFFFF',
  info: '#3ABFF8',
  success: '#36D399',
  warning: '#FBBD23',
  error: '#F87272',
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
