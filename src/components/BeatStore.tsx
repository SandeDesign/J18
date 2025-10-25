import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Beat } from '../lib/types';
import { database } from '../lib/database';
import BeatCard from './BeatCard';

interface BeatStoreProps {
  onAddToCart: (beat: Beat, license: 'basic' | 'premium' | 'exclusive') => void;
}

export default function BeatStore({ onAddToCart }: BeatStoreProps) {
  const [beats, setBeats] = useState<Beat[]>([]);
  const [filteredBeats, setFilteredBeats] = useState<Beat[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBeats();
  }, []);

  useEffect(() => {
    const applyFilters = async () => {
      await filterBeats();
    };
    applyFilters();
  }, [searchTerm, selectedGenre, beats]);

  const loadBeats = async () => {
    try {
      const data = await database.beats.getAll();
      // Sort by featured first, then by creation date
      const sortedData = data.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      
      setBeats(sortedData);
      setFilteredBeats(sortedData);
    } catch (error) {
      console.error('Error loading beats:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterBeats = async () => {
    let filtered = [...beats];

    if (searchTerm) {
      filtered = await database.beats.search(searchTerm);
    }

    if (selectedGenre !== 'All') {
      filtered = await database.beats.getByGenre(selectedGenre);
      
      // If we also have a search term, filter the genre results
      if (searchTerm) {
        const searchResults = await database.beats.search(searchTerm);
        filtered = filtered.filter(beat => 
          searchResults.some(searchBeat => searchBeat.id === beat.id)
        );
      }
    }

    setFilteredBeats(filtered);
  };

  const genres = ['All', ...database.utils.getGenres()];

  return (
    <section id="beats" className="py-24 px-4 bg-gradient-to-b from-black to-purple-950/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold mb-4 neon-glow">Beat Store</h2>
          <p className="text-xl text-gray-400">Premium beats ready for your next hit</p>
        </div>

        <div className="mb-12 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
            <input
              type="text"
              placeholder="Search beats, tags, or genres..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 glass rounded-xl text-white placeholder-gray-500 focus:outline-none focus:neon-border transition-all"
            />
          </div>

          <div className="relative w-full md:w-auto">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full md:w-48 pl-12 pr-4 py-4 glass rounded-xl text-white focus:outline-none focus:neon-border transition-all appearance-none cursor-pointer"
            >
              {genres.map((genre) => (
                <option key={genre} value={genre} className="bg-gray-900">
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin neon-border"></div>
          </div>
        ) : filteredBeats.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No beats found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBeats.map((beat) => (
              <BeatCard key={beat.id} beat={beat} onAddToCart={onAddToCart} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}