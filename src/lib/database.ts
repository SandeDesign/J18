// Bolt Database Setup for Beat Store
import { Beat, Order } from './types';

// In-memory database simulation for Bolt
class BoltDatabase {
  private beats: Beat[] = [];
  private orders: Order[] = [];
  private subscribers: string[] = [];

  constructor() {
    this.initializeBeats();
  }

  private initializeBeats() {
    this.beats = [
      {
        id: '1',
        title: 'Midnight Dreams',
        artist: 'Jonna Rincon',
        bpm: 140,
        key: 'Am',
        genre: 'Trap',
        price: 29.00,
        audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        artwork_url: 'https://images.pexels.com/photos/114820/pexels-photo-114820.jpeg?auto=compress&cs=tinysrgb&w=400',
        tags: ['dark', 'trap', 'atmospheric'],
        license_basic: true,
        license_premium: true,
        license_exclusive: true,
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Purple Haze',
        artist: 'Jonna Rincon',
        bpm: 128,
        key: 'Gm',
        genre: 'Hip Hop',
        price: 39.00,
        audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        artwork_url: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
        tags: ['chill', 'smooth', 'purple'],
        license_basic: true,
        license_premium: true,
        license_exclusive: true,
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Neon Nights',
        artist: 'Jonna Rincon',
        bpm: 150,
        key: 'F#m',
        genre: 'Drill',
        price: 49.00,
        audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        artwork_url: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
        tags: ['hard', 'drill', 'uk'],
        license_basic: true,
        license_premium: true,
        license_exclusive: true,
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '4',
        title: 'Studio Sessions',
        artist: 'Jonna Rincon',
        bpm: 90,
        key: 'Dm',
        genre: 'R&B',
        price: 35.00,
        audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        artwork_url: 'https://images.pexels.com/photos/1933900/pexels-photo-1933900.jpeg?auto=compress&cs=tinysrgb&w=400',
        tags: ['smooth', 'rnb', 'melodic'],
        license_basic: true,
        license_premium: true,
        license_exclusive: true,
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '5',
        title: 'Bassline Theory',
        artist: 'Jonna Rincon',
        bpm: 174,
        key: 'Em',
        genre: 'Drum & Bass',
        price: 45.00,
        audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        artwork_url: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=400',
        tags: ['dnb', 'liquid', 'fast'],
        license_basic: true,
        license_premium: true,
        license_exclusive: true,
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '6',
        title: 'Lost in Tokyo',
        artist: 'Jonna Rincon',
        bpm: 120,
        key: 'Cm',
        genre: 'Lo-Fi',
        price: 25.00,
        audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        artwork_url: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=400',
        tags: ['lofi', 'chill', 'study'],
        license_basic: true,
        license_premium: true,
        license_exclusive: true,
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
  }

  // Beat operations
  async getBeats(): Promise<Beat[]> {
    return [...this.beats];
  }

  async getBeatById(id: string): Promise<Beat | null> {
    return this.beats.find(beat => beat.id === id) || null;
  }

  async getFeaturedBeats(): Promise<Beat[]> {
    return this.beats.filter(beat => beat.featured);
  }

  async searchBeats(query: string): Promise<Beat[]> {
    const lowercaseQuery = query.toLowerCase();
    return this.beats.filter(beat => 
      beat.title.toLowerCase().includes(lowercaseQuery) ||
      beat.genre.toLowerCase().includes(lowercaseQuery) ||
      beat.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  async getBeatsByGenre(genre: string): Promise<Beat[]> {
    if (genre === 'All') return this.beats;
    return this.beats.filter(beat => beat.genre === genre);
  }

  // Order operations
  async createOrder(order: Omit<Order, 'id' | 'created_at'>): Promise<Order> {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  async getOrders(): Promise<Order[]> {
    return [...this.orders];
  }

  // Newsletter operations
  async subscribeToNewsletter(email: string): Promise<boolean> {
    if (!this.subscribers.includes(email)) {
      this.subscribers.push(email);
      return true;
    }
    return false;
  }

  async getSubscribers(): Promise<string[]> {
    return [...this.subscribers];
  }

  // Utility methods
  getGenres(): string[] {
    const genres = new Set(this.beats.map(beat => beat.genre));
    return Array.from(genres);
  }

  getTotalBeats(): number {
    return this.beats.length;
  }

  getFeaturedCount(): number {
    return this.beats.filter(beat => beat.featured).length;
  }
}

// Create singleton instance
export const boltDB = new BoltDatabase();

// Export database methods
export const database = {
  beats: {
    getAll: () => boltDB.getBeats(),
    getById: (id: string) => boltDB.getBeatById(id),
    getFeatured: () => boltDB.getFeaturedBeats(),
    search: (query: string) => boltDB.searchBeats(query),
    getByGenre: (genre: string) => boltDB.getBeatsByGenre(genre),
  },
  orders: {
    create: (order: Omit<Order, 'id' | 'created_at'>) => boltDB.createOrder(order),
    getAll: () => boltDB.getOrders(),
  },
  newsletter: {
    subscribe: (email: string) => boltDB.subscribeToNewsletter(email),
    getSubscribers: () => boltDB.getSubscribers(),
  },
  utils: {
    getGenres: () => boltDB.getGenres(),
    getTotalBeats: () => boltDB.getTotalBeats(),
    getFeaturedCount: () => boltDB.getFeaturedCount(),
  },
};