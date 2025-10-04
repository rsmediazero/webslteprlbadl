import React, { useState, useEffect } from 'react';
import DramaCard from '../components/DramaCard';
import { LoadingSpinner, DramaCardSkeleton } from '../components/LoadingSpinner';
import { dramaboxAPI } from '../api/dramabox';

const Popular = () => {
  const [dramas, setDramas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [period, setPeriod] = useState('weekly');

  useEffect(() => {
    fetchPopularDramas();
  }, [page, period]);

  const fetchPopularDramas = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      const mockData = [
        { 
          id: '41000104001', 
          title: 'Pewaris Takhta', 
          rating: 9.2, 
          year: 2024, 
          genre: 'Historical', 
          episodes: 24, 
          description: 'Sebuah kisah epik tentang perebutan takhta dan cinta yang melambungkan nama pemerannya ke puncak popularitas.',
          views: '2.5M'
        },
        { 
          id: '41000104002', 
          title: 'Cinta di Musim Dingin', 
          rating: 8.8, 
          year: 2024, 
          genre: 'Romance', 
          episodes: 16, 
          description: 'Kisah romantis yang menghangatkan hati di tengah dinginnya musim salju.',
          views: '2.1M'
        },
        { 
          id: '41000104003', 
          title: 'Misteri Kota Tua', 
          rating: 8.5, 
          year: 2024, 
          genre: 'Thriller', 
          episodes: 20, 
          description: 'Thriller misteri yang mengungkap rahasia gelap di balik sejarah kota.',
          views: '1.8M'
        },
        { 
          id: '41000104004', 
          title: 'Legenda Biru', 
          rating: 9.0, 
          year: 2024, 
          genre: 'Fantasi', 
          episodes: 22, 
          description: 'Petualangan fantasi di dunia bawah laut yang penuh misteri.',
          views: '1.6M'
        },
        { 
          id: '41000104005', 
          title: 'Keluarga Besar', 
          rating: 8.7, 
          year: 2024, 
          genre: 'Family', 
          episodes: 50, 
          description: 'Kisah keluarga besar dengan semua cinta, konflik, dan kehangatan.',
          views: '1.4M'
        },
        { 
          id: '41000104006', 
          title: 'Agen Rahasia', 
          rating: 8.9, 
          year: 2024, 
          genre: 'Action', 
          episodes: 18, 
          description: 'Aksi seru seorang agen rahasia dalam misi penyelamatan dunia.',
          views: '1.2M'
        },
        { 
          id: '41000104007', 
          title: 'Sekolah Idola', 
          rating: 8.6, 
          year: 2024, 
          genre: 'Comedy', 
          episodes: 30, 
          description: 'Komedi tentang kehidupan sekolah idola yang penuh warna.',
          views: '1.1M'
        },
        { 
          id: '41000104008', 
          title: 'Cinta Abadi', 
          rating: 8.8, 
          year: 2024, 
          genre: 'Romance', 
          episodes: 24, 
          description: 'Kisah cinta yang melintasi batas waktu dan ruang.',
          views: '980K'
        },
        { 
          id: '41000104009', 
          title: 'Pahlawan Kecil', 
          rating: 8.4, 
          year: 2024, 
          genre: 'Drama', 
          episodes: 28, 
          description: 'Kisah inspiratif tentang pahlawan dalam kehidupan sehari-hari.',
          views: '850K'
        },
        { 
          id: '41000104010', 
          title: 'Mimpi Besar', 
          rating: 8.5, 
          year: 2024, 
          genre: 'Inspirational', 
          episodes: 20, 
          description: 'Perjalanan menggapai mimpi besar melalui kerja keras dan tekad.',
          views: '720K'
        },
        { 
          id: '41000104011', 
          title: 'Kota Hantu', 
          rating: 8.3, 
          year: 2024, 
          genre: 'Horror', 
          episodes: 12, 
          description: 'Horor supernatural di kota yang terkena kutukan.',
          views: '650K'
        },
        { 
          id: '41000104012', 
          title: 'Cinta di Kantor', 
          rating: 8.7, 
          year: 2024, 
          genre: 'Romance', 
          episodes: 16, 
          description: 'Romansa di tempat kerja yang penuh tantangan dan cinta.',
          views: '580K'
        }
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
      console.error('Error fetching popular dramas:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-white mb-4">Drama Terpopuler</h1>
          <p className="text-gray-400 text-lg">
            Lihat drama-drama paling populer yang banyak ditonton oleh pengguna kami.
          </p>
        </div>

        {/* Period Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'weekly', label: 'Minggu Ini' },
              { value: 'monthly', label: 'Bulan Ini' },
              { value: 'alltime', label: 'Sepanjang Waktu' }
            ].map(periodOption => (
              <button
                key={periodOption.value}
                onClick={() => {
                  setPeriod(periodOption.value);
                  setPage(1);
                  setDramas([]);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  period === periodOption.value
                    ? 'bg-dramabox-amber text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {periodOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Drama Grid with Ranking */}
        {loading && page === 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DramaCardSkeleton count={12} />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {dramas.map((drama, index) => (
                <div key={drama.id} className="relative">
                  {/* Ranking Badge */}
                  <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-dramabox-amber to-dramabox-coral text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {(page - 1) * 12 + index + 1}
                  </div>
                  <DramaCard drama={drama} />
                  
                  {/* View Count */}
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-dramabox-amber text-xs font-semibold">👁 {drama.views}</span>
                  </div>
                </div>
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

            {!hasMore && dramas.length > 0 && (
              <div className="text-center text-gray-400">
                <p>Anda telah mencapai akhir daftar drama terpopuler.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Popular;