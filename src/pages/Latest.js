import React, { useState, useEffect } from 'react';
import DramaCard from '../components/DramaCard';
import { LoadingSpinner, DramaCardSkeleton } from '../components/LoadingSpinner';
import { dramaboxAPI } from '../api/dramabox';

const Latest = () => {
  const [dramas, setDramas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchLatestDramas();
  }, [page]);

  const fetchLatestDramas = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      const mockData = [
        { id: '41000104070', title: 'Drama Terbaru 1', rating: 8.5, year: 2024, genre: 'Thriller', episodes: 16, description: 'Drama thriller terbaru dengan plot yang menegangkan.' },
        { id: '41000104071', title: 'Drama Terbaru 2', rating: 8.3, year: 2024, genre: 'Comedy', episodes: 20, description: 'Komedi ringan yang akan membuat Anda tertawa.' },
        { id: '41000104072', title: 'Drama Terbaru 3', rating: 8.7, year: 2024, genre: 'Romance', episodes: 18, description: 'Kisah cinta yang menghangatkan hati.' },
        { id: '41000104073', title: 'Drama Terbaru 4', rating: 8.6, year: 2024, genre: 'Action', episodes: 22, description: 'Aksi seru dengan efek spesialis yang memukau.' },
        { id: '41000104074', title: 'Drama Terbaru 5', rating: 8.4, year: 2024, genre: 'Fantasi', episodes: 24, description: 'Petualangan fantasi di dunia sihir.' },
        { id: '41000104075', title: 'Drama Terbaru 6', rating: 8.8, year: 2024, genre: 'Drama', episodes: 26, description: 'Drama keluarga yang menyentuh hati.' },
        { id: '41000104076', title: 'Drama Terbaru 7', rating: 8.2, year: 2024, genre: 'Mystery', episodes: 20, description: 'Misteri yang penuh teka-teki.' },
        { id: '41000104077', title: 'Drama Terbaru 8', rating: 8.9, year: 2024, genre: 'Historical', episodes: 30, description: 'Kisah sejarah yang epik.' },
        { id: '41000104078', title: 'Drama Terbaru 9', rating: 8.1, year: 2024, genre: 'Horror', episodes: 12, description: 'Horor yang akan membuat Anda merinding.' },
        { id: '41000104079', title: 'Drama Terbaru 10', rating: 8.6, year: 2024, genre: 'Sci-Fi', episodes: 16, description: 'Fiksi ilmiah dengan teknologi masa depan.' },
        { id: '41000104080', title: 'Drama Terbaru 11', rating: 8.3, year: 2024, genre: 'Musical', episodes: 14, description: 'Musikal dengan lagu-lagu yang merdu.' },
        { id: '41000104081', title: 'Drama Terbaru 12', rating: 8.7, year: 2024, genre: 'Crime', episodes: 18, description: 'Kejahatan yang penuh intrik.' }
      ];

      if (page === 1) {
        setDramas(mockData);
      } else {
        setDramas(prev => [...prev, ...mockData]);
      }

      // Simulate pagination
      if (page >= 3) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching latest dramas:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  };

  const filteredDramas = filter === 'all' 
    ? dramas 
    : dramas.filter(drama => drama.genre.toLowerCase() === filter.toLowerCase());

  const genres = ['all', 'Thriller', 'Comedy', 'Romance', 'Action', 'Fantasi', 'Drama', 'Mystery', 'Historical'];

  return (
    <div className="min-h-screen pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-white mb-4">Drama Terbaru</h1>
          <p className="text-gray-400 text-lg">
            Temukan drama-drama terbaru yang baru saja rilis dan jangan ketinggalan episode terbaru.
          </p>
        </div>

        {/* Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setFilter(genre)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === genre
                    ? 'bg-dramabox-amber text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {genre === 'all' ? 'Semua' : genre}
              </button>
            ))}
          </div>
        </div>

        {/* Drama Grid */}
        {loading && page === 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DramaCardSkeleton count={12} />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {filteredDramas.map((drama) => (
                <DramaCard key={drama.id} drama={drama} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="btn-primary px-8 py-3"
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span className="ml-2">Loading...</span>
                    </>
                  ) : (
                    'Muat Lebih Banyak'
                  )}
                </button>
              </div>
            )}

            {!hasMore && filteredDramas.length > 0 && (
              <div className="text-center text-gray-400">
                <p>Anda telah mencapai akhir daftar drama terbaru.</p>
              </div>
            )}

            {filteredDramas.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">
                  Tidak ada drama yang sesuai dengan filter yang dipilih.
                </div>
                <button
                  onClick={() => setFilter('all')}
                  className="btn-primary"
                >
                  Tampilkan Semua
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Latest;