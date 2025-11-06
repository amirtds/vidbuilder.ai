// Enhanced Color scheme with gradients
export interface EnhancedColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  textLight: string;
  textMuted: string;
  background: string;
  backgroundGradient?: string;
  overlayGradient?: string;
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

// Default Apple-inspired color scheme
export const appleColorScheme: EnhancedColorScheme = {
  primary: '#0071E3',
  secondary: '#000000',
  accent: '#FF3B30',
  text: '#1D1D1F',
  textLight: '#86868B',
  textMuted: '#D2D2D7',
  background: '#FBFBFD',
  backgroundGradient: 'linear-gradient(135deg, #FBFBFD 0%, #F5F5F7 100%)',
  overlayGradient: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)',
  borderRadius: 16,
  fontFamily: googleFonts['SF Pro']
};

// Dark mode Apple-inspired color scheme
export const appleDarkColorScheme: EnhancedColorScheme = {
  primary: '#0A84FF',
  secondary: '#FFFFFF',
  accent: '#FF453A',
  text: '#FFFFFF',
  textLight: '#98989F',
  textMuted: '#48484A',
  background: '#000000',
  backgroundGradient: 'linear-gradient(135deg, #000000 0%, #1C1C1E 100%)',
  overlayGradient: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 100%)',
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
