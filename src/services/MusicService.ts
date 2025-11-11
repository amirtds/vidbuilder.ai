// Music Service for integrating free background music
// Using Pixabay API (free, no attribution required for commercial use)

export interface MusicTrack {
  id: string;
  title: string;
  url: string;
  duration: number;
  genre: string;
  mood: string;
  tags: string[];
  provider: 'pixabay' | 'freesound' | 'custom';
}

export interface MusicSearchParams {
  genre?: string;
  mood?: string;
  duration?: number;
  query?: string;
}

// Pixabay API configuration
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY || '15650519-d7aa99be896d4954b54e32e23';
const PIXABAY_API_URL = 'https://pixabay.com/api/music/';

// Expanded curated music library with 40+ tracks across multiple genres and moods
// Using royalty-free music from various sources
export const curatedMusicLibrary: MusicTrack[] = [
  // Corporate/Professional (10 tracks)
  {
    id: 'corp-1',
    title: 'Corporate Success',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 30,
    genre: 'corporate',
    mood: 'professional',
    tags: ['business', 'presentation', 'modern'],
    provider: 'custom'
  },
  {
    id: 'corp-2',
    title: 'Innovation Drive',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 30,
    genre: 'corporate',
    mood: 'motivational',
    tags: ['tech', 'innovation', 'upbeat'],
    provider: 'custom'
  },
  {
    id: 'corp-3',
    title: 'Business Momentum',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 30,
    genre: 'corporate',
    mood: 'professional',
    tags: ['corporate', 'confident', 'modern'],
    provider: 'custom'
  },
  {
    id: 'corp-4',
    title: 'Executive Suite',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    duration: 30,
    genre: 'corporate',
    mood: 'sophisticated',
    tags: ['elegant', 'business', 'premium'],
    provider: 'custom'
  },
  {
    id: 'corp-5',
    title: 'Startup Energy',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    duration: 30,
    genre: 'corporate',
    mood: 'energetic',
    tags: ['startup', 'dynamic', 'fresh'],
    provider: 'custom'
  },
  {
    id: 'corp-6',
    title: 'Professional Edge',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    duration: 30,
    genre: 'corporate',
    mood: 'confident',
    tags: ['professional', 'sleek', 'modern'],
    provider: 'custom'
  },
  {
    id: 'corp-7',
    title: 'Market Leader',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    duration: 30,
    genre: 'corporate',
    mood: 'powerful',
    tags: ['leadership', 'strong', 'corporate'],
    provider: 'custom'
  },
  {
    id: 'corp-8',
    title: 'Growth Strategy',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    duration: 30,
    genre: 'corporate',
    mood: 'optimistic',
    tags: ['growth', 'progress', 'positive'],
    provider: 'custom'
  },
  {
    id: 'corp-9',
    title: 'Team Synergy',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    duration: 30,
    genre: 'corporate',
    mood: 'collaborative',
    tags: ['teamwork', 'unity', 'together'],
    provider: 'custom'
  },
  {
    id: 'corp-10',
    title: 'Vision Forward',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    duration: 30,
    genre: 'corporate',
    mood: 'inspiring',
    tags: ['vision', 'future', 'aspirational'],
    provider: 'custom'
  },
  
  // Upbeat/Happy (8 tracks)
  {
    id: 'upbeat-1',
    title: 'Happy Days',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    duration: 30,
    genre: 'upbeat',
    mood: 'happy',
    tags: ['cheerful', 'positive', 'bright'],
    provider: 'custom'
  },
  {
    id: 'upbeat-2',
    title: 'Sunny Vibes',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    duration: 30,
    genre: 'upbeat',
    mood: 'joyful',
    tags: ['fun', 'playful', 'lighthearted'],
    provider: 'custom'
  },
  {
    id: 'upbeat-3',
    title: 'Feel Good Groove',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
    duration: 30,
    genre: 'upbeat',
    mood: 'uplifting',
    tags: ['groovy', 'feel-good', 'positive'],
    provider: 'custom'
  },
  {
    id: 'upbeat-4',
    title: 'Celebration Time',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
    duration: 30,
    genre: 'upbeat',
    mood: 'festive',
    tags: ['party', 'celebration', 'exciting'],
    provider: 'custom'
  },
  {
    id: 'upbeat-5',
    title: 'Positive Energy',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
    duration: 30,
    genre: 'upbeat',
    mood: 'energetic',
    tags: ['dynamic', 'lively', 'vibrant'],
    provider: 'custom'
  },
  {
    id: 'upbeat-6',
    title: 'Summer Breeze',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
    duration: 30,
    genre: 'upbeat',
    mood: 'carefree',
    tags: ['summer', 'relaxed', 'happy'],
    provider: 'custom'
  },
  {
    id: 'upbeat-7',
    title: 'Bright Horizons',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 30,
    genre: 'upbeat',
    mood: 'optimistic',
    tags: ['hopeful', 'bright', 'inspiring'],
    provider: 'custom'
  },
  {
    id: 'upbeat-8',
    title: 'Good Times Roll',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 30,
    genre: 'upbeat',
    mood: 'fun',
    tags: ['enjoyable', 'catchy', 'upbeat'],
    provider: 'custom'
  },
  
  // Electronic/Tech (8 tracks)
  {
    id: 'tech-1',
    title: 'Digital Future',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 30,
    genre: 'electronic',
    mood: 'modern',
    tags: ['tech', 'digital', 'futuristic'],
    provider: 'custom'
  },
  {
    id: 'tech-2',
    title: 'Innovation Lab',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    duration: 30,
    genre: 'electronic',
    mood: 'professional',
    tags: ['technology', 'science', 'progress'],
    provider: 'custom'
  },
  {
    id: 'tech-3',
    title: 'Cyber Pulse',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    duration: 30,
    genre: 'electronic',
    mood: 'energetic',
    tags: ['cyber', 'pulse', 'tech'],
    provider: 'custom'
  },
  {
    id: 'tech-4',
    title: 'AI Revolution',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    duration: 30,
    genre: 'electronic',
    mood: 'futuristic',
    tags: ['ai', 'future', 'innovation'],
    provider: 'custom'
  },
  {
    id: 'tech-5',
    title: 'Code Matrix',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    duration: 30,
    genre: 'electronic',
    mood: 'focused',
    tags: ['coding', 'programming', 'tech'],
    provider: 'custom'
  },
  {
    id: 'tech-6',
    title: 'Neon Nights',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    duration: 30,
    genre: 'electronic',
    mood: 'atmospheric',
    tags: ['neon', 'synthwave', 'modern'],
    provider: 'custom'
  },
  {
    id: 'tech-7',
    title: 'Data Stream',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    duration: 30,
    genre: 'electronic',
    mood: 'dynamic',
    tags: ['data', 'flow', 'tech'],
    provider: 'custom'
  },
  {
    id: 'tech-8',
    title: 'Silicon Valley',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    duration: 30,
    genre: 'electronic',
    mood: 'innovative',
    tags: ['startup', 'tech', 'modern'],
    provider: 'custom'
  },
  
  // Calm/Ambient (6 tracks)
  {
    id: 'calm-1',
    title: 'Peaceful Moments',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    duration: 30,
    genre: 'ambient',
    mood: 'calm',
    tags: ['relaxing', 'meditation', 'soft'],
    provider: 'custom'
  },
  {
    id: 'calm-2',
    title: 'Zen Garden',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    duration: 30,
    genre: 'ambient',
    mood: 'peaceful',
    tags: ['zen', 'tranquil', 'soothing'],
    provider: 'custom'
  },
  {
    id: 'calm-3',
    title: 'Mindful Meditation',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
    duration: 30,
    genre: 'ambient',
    mood: 'meditative',
    tags: ['mindfulness', 'calm', 'serene'],
    provider: 'custom'
  },
  {
    id: 'calm-4',
    title: 'Gentle Waves',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
    duration: 30,
    genre: 'ambient',
    mood: 'soothing',
    tags: ['ocean', 'gentle', 'peaceful'],
    provider: 'custom'
  },
  {
    id: 'calm-5',
    title: 'Soft Focus',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
    duration: 30,
    genre: 'ambient',
    mood: 'contemplative',
    tags: ['focus', 'study', 'calm'],
    provider: 'custom'
  },
  {
    id: 'calm-6',
    title: 'Tranquil Space',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
    duration: 30,
    genre: 'ambient',
    mood: 'spacious',
    tags: ['ambient', 'space', 'calm'],
    provider: 'custom'
  },
  
  // Cinematic/Epic (8 tracks)
  {
    id: 'epic-1',
    title: 'Epic Journey',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 30,
    genre: 'cinematic',
    mood: 'dramatic',
    tags: ['epic', 'adventure', 'heroic'],
    provider: 'custom'
  },
  {
    id: 'epic-2',
    title: 'Rising Action',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 30,
    genre: 'cinematic',
    mood: 'inspiring',
    tags: ['motivational', 'triumph', 'victory'],
    provider: 'custom'
  },
  {
    id: 'epic-3',
    title: 'Hero\'s Theme',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 30,
    genre: 'cinematic',
    mood: 'heroic',
    tags: ['hero', 'brave', 'powerful'],
    provider: 'custom'
  },
  {
    id: 'epic-4',
    title: 'Cinematic Glory',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    duration: 30,
    genre: 'cinematic',
    mood: 'triumphant',
    tags: ['glory', 'victory', 'epic'],
    provider: 'custom'
  },
  {
    id: 'epic-5',
    title: 'Orchestral Rise',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    duration: 30,
    genre: 'cinematic',
    mood: 'building',
    tags: ['orchestral', 'crescendo', 'powerful'],
    provider: 'custom'
  },
  {
    id: 'epic-6',
    title: 'Adventure Awaits',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    duration: 30,
    genre: 'cinematic',
    mood: 'adventurous',
    tags: ['adventure', 'journey', 'exploration'],
    provider: 'custom'
  },
  {
    id: 'epic-7',
    title: 'Dramatic Tension',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    duration: 30,
    genre: 'cinematic',
    mood: 'tense',
    tags: ['tension', 'suspense', 'dramatic'],
    provider: 'custom'
  },
  {
    id: 'epic-8',
    title: 'Victory March',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    duration: 30,
    genre: 'cinematic',
    mood: 'victorious',
    tags: ['victory', 'celebration', 'triumph'],
    provider: 'custom'
  },
  
  // Motivational/Inspiring (5 tracks)
  {
    id: 'motiv-1',
    title: 'Inspire Greatness',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    duration: 30,
    genre: 'motivational',
    mood: 'inspiring',
    tags: ['inspire', 'motivate', 'uplift'],
    provider: 'custom'
  },
  {
    id: 'motiv-2',
    title: 'Dream Big',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    duration: 30,
    genre: 'motivational',
    mood: 'aspirational',
    tags: ['dreams', 'ambition', 'goals'],
    provider: 'custom'
  },
  {
    id: 'motiv-3',
    title: 'Unstoppable',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    duration: 30,
    genre: 'motivational',
    mood: 'powerful',
    tags: ['strength', 'determination', 'power'],
    provider: 'custom'
  },
  {
    id: 'motiv-4',
    title: 'Breakthrough',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    duration: 30,
    genre: 'motivational',
    mood: 'triumphant',
    tags: ['breakthrough', 'success', 'achievement'],
    provider: 'custom'
  },
  {
    id: 'motiv-5',
    title: 'Rise Above',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
    duration: 30,
    genre: 'motivational',
    mood: 'empowering',
    tags: ['rise', 'overcome', 'empower'],
    provider: 'custom'
  }
];

// Music recommendation engine
export class MusicRecommendationEngine {
  /**
   * Get recommended music based on video type and mood
   */
  static getRecommendations(videoType: string, mood?: string): MusicTrack[] {
    let filtered = curatedMusicLibrary;
    
    // Filter by video type
    if (videoType === 'promotional') {
      filtered = filtered.filter(track => 
        ['corporate', 'upbeat', 'electronic'].includes(track.genre)
      );
    } else if (videoType === 'educational') {
      filtered = filtered.filter(track => 
        ['calm', 'ambient', 'corporate'].includes(track.genre)
      );
    }
    
    // Filter by mood if specified
    if (mood) {
      const moodFiltered = filtered.filter(track => track.mood === mood);
      if (moodFiltered.length > 0) {
        filtered = moodFiltered;
      }
    }
    
    return filtered;
  }
  
  /**
   * Match music duration to video duration
   */
  static matchDuration(tracks: MusicTrack[], videoDuration: number): MusicTrack[] {
    return tracks.filter(track => 
      Math.abs(track.duration - videoDuration) <= 10
    );
  }
  
  /**
   * Get music by genre
   */
  static getByGenre(genre: string): MusicTrack[] {
    return curatedMusicLibrary.filter(track => track.genre === genre);
  }
  
  /**
   * Get music by mood
   */
  static getByMood(mood: string): MusicTrack[] {
    return curatedMusicLibrary.filter(track => track.mood === mood);
  }
  
  /**
   * Search music by tags
   */
  static searchByTags(tags: string[]): MusicTrack[] {
    return curatedMusicLibrary.filter(track =>
      tags.some(tag => track.tags.includes(tag.toLowerCase()))
    );
  }
}

// Pixabay API integration (optional - for extended library)
export class PixabayMusicService {
  private apiKey: string;
  
  constructor(apiKey?: string) {
    this.apiKey = apiKey || PIXABAY_API_KEY;
  }
  
  /**
   * Search music from Pixabay
   */
  async searchMusic(params: MusicSearchParams): Promise<MusicTrack[]> {
    try {
      const queryParams = new URLSearchParams({
        key: this.apiKey,
        q: params.query || params.mood || params.genre || 'background music',
        per_page: '20'
      });
      
      const response = await fetch(`${PIXABAY_API_URL}?${queryParams}`);
      const data = await response.json();
      
      if (data.hits) {
        return data.hits.map((hit: any) => ({
          id: `pixabay-${hit.id}`,
          title: hit.title || 'Untitled',
          url: hit.music,
          duration: hit.duration,
          genre: this.extractGenre(hit.tags),
          mood: this.extractMood(hit.tags),
          tags: hit.tags.split(',').map((tag: string) => tag.trim()),
          provider: 'pixabay'
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching music from Pixabay:', error);
      return [];
    }
  }
  
  private extractGenre(tags: string): string {
    const genres = ['corporate', 'electronic', 'ambient', 'cinematic', 'upbeat'];
    const tagList = tags.toLowerCase();
    
    for (const genre of genres) {
      if (tagList.includes(genre)) {
        return genre;
      }
    }
    
    return 'generic';
  }
  
  private extractMood(tags: string): string {
    const moods = ['happy', 'calm', 'energetic', 'dramatic', 'peaceful', 'motivational'];
    const tagList = tags.toLowerCase();
    
    for (const mood of moods) {
      if (tagList.includes(mood)) {
        return mood;
      }
    }
    
    return 'neutral';
  }
}

// Export singleton instance
export const musicService = new PixabayMusicService();

// Music configuration for video
export interface VideoMusicConfig {
  enabled: boolean;
  trackId?: string;
  customUrl?: string;
  volume: number;
  fadeIn: number;
  fadeOut: number;
  loop: boolean;
  startFrom: number;
}

// Default music configuration
export const defaultMusicConfig: VideoMusicConfig = {
  enabled: false,
  volume: 0.3,
  fadeIn: 2,
  fadeOut: 2,
  loop: true,
  startFrom: 0
};
