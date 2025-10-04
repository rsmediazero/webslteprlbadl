import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DramaCard from '../components/DramaCard';
import { LoadingSpinner, DramaCardSkeleton } from '../components/LoadingSpinner';
import { dramaboxAPI } from '../api/dramabox';

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  const [dramas, setDramas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(query);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    }
  }, [query, filter, sortBy]);

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      // Mock search results based on query
      const allDramas = [
        { id: '41000104001', title: 'Pewaris Takhta', rating: 9.2, year: 2024, genre: 'Historical', episodes: 24, description: 'Sebuah kisah epik tentang perebutan takhta dan cinta.' },
        { id: '41000104002', title: 'Cinta di Musim Dingin', rating: 8.8, year: 2024, genre: 'Romance', episodes: 16, description: 'Kisah romantis yang menghangatkan hati.' },
        { id: '41000104003', title: 'Misteri Kota Tua', rating: 8.5, year: 2024, genre: 'Thriller', episodes: 20, description: 'Thriller misteri yang mengungkap rahasia gelap.' },
        { id: '41000104004', title: 'Legenda Biru', rating: 9.0, year: 2024, genre: 'Fantasi', episodes: 22, description: 'Petualangan fantasi di dunia bawah laut.' },
        { id: '41000104005', title: 'Keluarga Besar', rating: 8.7, year: 2024, genre: 'Family', episodes: 50, description: 'Kisah keluarga besar dengan semua cinta dan konflik.' },
        { id: '41000104006', title: 'Agen Rahasia', rating: 8.9, year: 2024, genre: 'Action', episodes: 18, description: 'Aksi seru seorang agen rahasia.' },
        { id: '41000104007', title: 'Sekolah Idola', rating: 8.6, year: 2024, genre: 'Comedy', episodes: 30, description: 'Komedi tentang kehidupan sekolah idola.' },
        { id: '41000104008', title: 'Cinta Abadi', rating: 8.8, year: 2024, genre: 'Romance', episodes: 24, description: 'Kisah cinta yang melintasi batas waktu.' },
        { id: '41000104009', title: 'Pahlawan Kecil', rating: 8.4, year: 2024, genre: 'Drama', episodes: 28, description: 'Kisah inspiratif tentang pahlawan sehari-hari.' },
        { id: '41000104010', title: 'Mimpi Besar', rating: 8.5, year: 2024, genre: 'Inspirational', episodes: 20, description: 'Perjalanan menggapai mimpi besar.' },
        { id: '41000104011', title: 'Kota Hantu', rating: 8.3, year: 2024, genre: 'Horror', episodes: 12, description: 'Horor supernatural di kota terkutuk.' },
        { id: '41000104012', title: 'Cinta di Kantor', rating: 8.7, year: 2024, genre: 'Romance', episodes: 16, description: 'Romansa di tempat kerja yang penuh tantangan.' }
      ];

      // Filter by search query
      let filtered = allDramas.filter(drama => 
        drama.title.toLowerCase().includes(query.toLowerCase()) ||
        drama.genre.toLowerCase().includes(query.toLowerCase()) ||
        drama.description.toLowerCase().includes(query.toLowerCase())
      );

      // Apply additional filters
      if (filter !== 'all') {
        filtered = filtered.filter(drama => drama.genre.toLowerCase() === filter.toLowerCase());
      }

      // Apply sorting
      switch (sortBy) {
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'year':
          filtered.sort((a, b) => b.year - a.year);
          break;
        case 'title':
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          // relevance - keep original order
          break;
      }

      setDramas(filtered);
    } catch (error) {
      console.error('Error searching dramas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const genres = ['all', 'Historical', 'Romance', 'Thriller', 'Fantasi', 'Family', 'Action', 'Comedy', 'Drama', 'Horror'];
  const sortOptions = [
    { value: 'relevance', label: 'Relevansi' },
    { value: 'rating', label: 'Rating Tertinggi' },
    { value: 'year', label: 'Tahun Terbaru' },
    { value: 'title', label: 'Judul A-Z' }
  ];

  return (
    <div className="min-h-screen pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-white mb-4">Cari Drama</h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative max-w-2xl">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari judul drama, genre, atau kata kunci..."
                className="form-input w-full pr-16 text-lg"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-dramabox-amber hover:bg-amber-600 text-white rounded-lg px-4 py-2 font-medium transition-colors"
              >
                Cari
              </button>
            </div>
          </form>

          {query && (
            <p className="text-gray-400">
              Menampilkan hasil untuk: <span className="text-dramabox-amber font-semibold">"{query}"</span>
              {dramas.length > 0 && ` (${dramas.length} hasil)`}
            </p>
          )}
        </div>

        {/* Filters */}
        {query && (
          <div className="mb-8 space-y-4">
            {/* Genre Filter */}
            <div>
              <h3 className="text-white font-semibold mb-2">Genre</h3>
              <div className="flex flex-wrap gap-2">
                {genres.map(genre => (
                  <button
                    key={genre}
                    onClick={() => setFilter(genre)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      filter === genre
                        ? 'bg-dramabox-amber text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {genre === 'all' ? 'Semua Genre' : genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <h3 className="text-white font-semibold mb-2">Urutkan</h3>
              <div className="flex flex-wrap gap-2">
                {sortOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      sortBy === option.value
                        ? 'bg-dramabox-coral text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DramaCardSkeleton count={12} />
          </div>
        ) : query ? (
          dramas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dramas.map((drama) => (
                <DramaCard key={drama.id} drama={drama} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-xl mb-4">
                😔 Tidak ada hasil yang ditemukan
              </div>
              <p className="text-gray-500 mb-6">
                Coba kata kunci lain atau ubah filter pencarian Anda.
              </p>
              <div className="space-x-4">
                <button
                  onClick={() => {
                    setFilter('all');
                    setSortBy('relevance');
                  }}
                  className="btn-secondary"
                >
                  Hapus Filter
                </button>
                <button
                  onClick={() => navigate('/latest')}
                  className="btn-primary"
                >
                  Lihat Drama Terbaru
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-xl mb-4">
              🔍 Mulai Pencarian Drama Anda
            </div>
            <p className="text-gray-500 mb-8">
              Cari drama berdasarkan judul, genre, atau kata kunci yang Anda inginkan.
            </p>
            
            {/* Popular Searches */}
            <div className="max-w-2xl mx-auto">
              <h3 className="text-white font-semibold mb-4">Pencarian Populer</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {['Pewaris', 'Cinta', 'Drama Korea', 'Aksi', 'Romance', 'Thriller', 'Komedi', 'Fantasi'].map(term => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      navigate(`/search?q=${encodeURIComponent(term)}`);
                    }}
                    className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;