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

// Curated music library for different moods and genres
export const curatedMusicLibrary: MusicTrack[] = [
  // Corporate/Professional
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
  // Upbeat/Energetic
  {
    id: 'upbeat-1',
    title: 'Happy Days',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 30,
    genre: 'upbeat',
    mood: 'happy',
    tags: ['cheerful', 'positive', 'bright'],
    provider: 'custom'
  },
  {
    id: 'upbeat-2',
    title: 'Energy Burst',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    duration: 30,
    genre: 'electronic',
    mood: 'energetic',
    tags: ['dynamic', 'powerful', 'exciting'],
    provider: 'custom'
  },
  // Calm/Ambient
  {
    id: 'calm-1',
    title: 'Peaceful Moments',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    duration: 30,
    genre: 'ambient',
    mood: 'calm',
    tags: ['relaxing', 'meditation', 'soft'],
    provider: 'custom'
  },
  {
    id: 'calm-2',
    title: 'Zen Garden',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    duration: 30,
    genre: 'ambient',
    mood: 'peaceful',
    tags: ['zen', 'tranquil', 'soothing'],
    provider: 'custom'
  },
  // Cinematic/Epic
  {
    id: 'epic-1',
    title: 'Epic Journey',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    duration: 30,
    genre: 'cinematic',
    mood: 'dramatic',
    tags: ['epic', 'adventure', 'heroic'],
    provider: 'custom'
  },
  {
    id: 'epic-2',
    title: 'Rising Action',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    duration: 30,
    genre: 'cinematic',
    mood: 'inspiring',
    tags: ['motivational', 'triumph', 'victory'],
    provider: 'custom'
  },
  // Tech/Modern
  {
    id: 'tech-1',
    title: 'Digital Future',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    duration: 30,
    genre: 'electronic',
    mood: 'modern',
    tags: ['tech', 'digital', 'futuristic'],
    provider: 'custom'
  },
  {
    id: 'tech-2',
    title: 'Innovation Lab',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    duration: 30,
    genre: 'electronic',
    mood: 'professional',
    tags: ['technology', 'science', 'progress'],
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
