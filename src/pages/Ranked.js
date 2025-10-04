import React, { useState, useEffect } from 'react';
import DramaCard from '../components/DramaCard';
import { LoadingSpinner, DramaCardSkeleton } from '../components/LoadingSpinner';
import { dramaboxAPI } from '../api/dramabox';

const Ranked = () => {
  const [dramas, setDramas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rankType, setRankType] = useState(1); // 1 = Trending, 2 = Popular Search, 3 = Newest

  useEffect(() => {
    fetchRankedDramas();
  }, [rankType]);

  const fetchRankedDramas = async () => {
    try {
      setLoading(true);
      // Mock data based on rank type
      let mockData = [];

      if (rankType === 1) {
        // Trending
        mockData = [
          { id: '41000104001', title: 'Pewaris Takhta', rating: 9.2, year: 2024, genre: 'Historical', episodes: 24, trend: 'up', change: '+2' },
          { id: '41000104002', title: 'Cinta di Musim Dingin', rating: 8.8, year: 2024, genre: 'Romance', episodes: 16, trend: 'up', change: '+1' },
          { id: '41000104003', title: 'Misteri Kota Tua', rating: 8.5, year: 2024, genre: 'Thriller', episodes: 20, trend: 'down', change: '-1' },
          { id: '41000104004', title: 'Legenda Biru', rating: 9.0, year: 2024, genre: 'Fantasi', episodes: 22, trend: 'up', change: '+3' },
          { id: '41000104005', title: 'Keluarga Besar', rating: 8.7, year: 2024, genre: 'Family', episodes: 50, trend: 'stable', change: '0' },
          { id: '41000104006', title: 'Agen Rahasia', rating: 8.9, year: 2024, genre: 'Action', episodes: 18, trend: 'up', change: '+1' }
        ];
      } else if (rankType === 2) {
        // Popular Search
        mockData = [
          { id: '41000104007', title: 'Pewaris', rating: 8.6, year: 2024, genre: 'Historical', episodes: 24, searches: '1.2M' },
          { id: '41000104008', title: 'Cinta', rating: 8.4, year: 2024, genre: 'Romance', episodes: 16, searches: '980K' },
          { id: '41000104009', title: 'Drama Korea', rating: 8.8, year: 2024, genre: 'Various', episodes: 20, searches: '850K' },
          { id: '41000104010', title: 'Aksi', rating: 8.5, year: 2024, genre: 'Action', episodes: 18, searches: '720K' },
          { id: '41000104011', title: 'Romance', rating: 8.7, year: 2024, genre: 'Romance', episodes: 22, searches: '650K' },
          { id: '41000104012', title: 'Thriller', rating: 8.3, year: 2024, genre: 'Thriller', episodes: 16, searches: '580K' }
        ];
      } else {
        // Newest
        mockData = [
          { id: '41000104013', title: 'Drama Baru 1', rating: 8.5, year: 2024, genre: 'Thriller', episodes: 16, date: '2024-01-15' },
          { id: '41000104014', title: 'Drama Baru 2', rating: 8.3, year: 2024, genre: 'Comedy', episodes: 20, date: '2024-01-14' },
          { id: '41000104015', title: 'Drama Baru 3', rating: 8.7, year: 2024, genre: 'Romance', episodes: 18, date: '2024-01-13' },
          { id: '41000104016', title: 'Drama Baru 4', rating: 8.6, year: 2024, genre: 'Action', episodes: 22, date: '2024-01-12' },
          { id: '41000104017', title: 'Drama Baru 5', rating: 8.4, year: 2024, genre: 'Fantasi', episodes: 24, date: '2024-01-11' },
          { id: '41000104018', title: 'Drama Baru 6', rating: 8.8, year: 2024, genre: 'Drama', episodes: 26, date: '2024-01-10' }
        ];
      }

      setDramas(mockData);
    } catch (error) {
      console.error('Error fetching ranked dramas:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <span className="text-green-500">↗</span>;
      case 'down':
        return <span className="text-red-500">↘</span>;
      default:
        return <span className="text-gray-500">→</span>;
    }
  };

  const rankTypes = [
    { value: 1, label: 'Sedang Tren', icon: '🔥' },
    { value: 2, label: 'Pencarian Populer', icon: '🔍' },
    { value: 3, label: 'Terbaru', icon: '✨' }
  ];

  return (
    <div className="min-h-screen pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-white mb-4">Ranking Drama</h1>
          <p className="text-gray-400 text-lg">
            Lihat peringkat drama berdasarkan popularitas, tren, dan pencarian.
          </p>
        </div>

        {/* Rank Type Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {rankTypes.map(type => (
              <button
                key={type.value}
                onClick={() => setRankType(type.value)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all transform hover:scale-105 ${
                  rankType === type.value
                    ? 'bg-dramabox-amber text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ranking List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DramaCardSkeleton count={6} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dramas.map((drama, index) => (
              <div key={drama.id} className="relative">
                {/* Ranking Badge with Trend */}
                <div className="absolute top-2 left-2 z-10 flex items-center space-x-1">
                  <div className="bg-gradient-to-r from-dramabox-amber to-dramabox-coral text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  {rankType === 1 && (
                    <div className="bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
                      <span className="text-xs">
                        {getTrendIcon(drama.trend)}
                        <span className="ml-1 text-dramabox-amber">{drama.change}</span>
                      </span>
                    </div>
                  )}
                </div>
                
                <DramaCard drama={drama} />
                
                {/* Additional Info */}
                {rankType === 2 && drama.searches && (
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-dramabox-amber text-xs font-semibold">🔍 {drama.searches}</span>
                  </div>
                )}
                
                {rankType === 3 && drama.date && (
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-dramabox-coral text-xs font-semibold">📅 {new Date(drama.date).toLocaleDateString('id-ID')}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Ranking Info */}
        <div className="mt-12 bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Penjelasan Ranking</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-300">
            <div>
              <span className="text-dramabox-amber font-semibold">🔥 Sedang Tren:</span>
              <p className="mt-1">Drama dengan peningkatan popularitas tercepat dalam 7 hari terakhir.</p>
            </div>
            <div>
              <span className="text-dramabox-amber font-semibold">🔍 Pencarian Populer:</span>
              <p className="mt-1">Drama dengan jumlah pencarian tertinggi di platform kami.</p>
            </div>
            <div>
              <span className="text-dramabox-amber font-semibold">✨ Terbaru:</span>
              <p className="mt-1">Drama terbaru yang baru saja ditambahkan ke koleksi kami.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranked;