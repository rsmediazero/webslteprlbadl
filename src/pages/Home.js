import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import DramaCard from '../components/DramaCard';
import { LoadingSpinner, HeroSkeleton, DramaCardSkeleton } from '../components/LoadingSpinner';
import { dramaboxAPI } from '../api/dramabox';
import Typed from 'typed.js';

const Home = () => {
  const [featuredDramas, setFeaturedDramas] = useState([]);
  const [trendingDramas, setTrendingDramas] = useState([]);
  const [latestDramas, setLatestDramas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    fetchHomeData();
  }, []);

  useEffect(() => {
    // Initialize typed.js for hero text
    if (!loading && featuredDramas.length > 0) {
      const typed = new Typed('#hero-typed', {
        strings: [
          'Streaming Drama Terlengkap',
          'Koleksi Drama Terbaru',
          'Pengalaman Nonton Terbaik'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
      });

      return () => {
        typed.destroy();
      };
    }
  }, [loading, featuredDramas]);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const homeData = await dramaboxAPI.getHomeDramas();
      
      // Mock data for demonstration
      const mockFeatured = [
        {
          id: '41000104061',
          title: 'Pewaris Takhta',
          description: 'Sebuah kisah epik tentang perebutan takhta dan cinta yang melambungkan nama pemerannya ke puncak popularitas.',
          image: 'https://images.unsplash.com/photo-1543536448-d209a7620b95?w=1200&h=600&fit=crop',
          rating: 9.2,
          year: 2024,
          genre: 'Historical',
          episodes: 24
        },
        {
          id: '41000104062',
          title: 'Cinta di Musim Dingin',
          description: 'Kisah romantis yang menghangatkan hati di tengah dinginnya musim salju.',
          image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&h=600&fit=crop',
          rating: 8.8,
          year: 2024,
          genre: 'Romance',
          episodes: 16
        },
        {
          id: '41000104063',
          title: 'Misteri Kota Tua',
          description: 'Thriller misteri yang mengungkap rahasia gelap di balik sejarah kota.',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop',
          rating: 8.5,
          year: 2024,
          genre: 'Thriller',
          episodes: 20
        }
      ];

      const mockTrending = [
        { id: '41000104064', title: 'Legenda Biru', rating: 9.0, year: 2024, genre: 'Fantasi', episodes: 22 },
        { id: '41000104065', title: 'Keluarga Besar', rating: 8.7, year: 2024, genre: 'Family', episodes: 50 },
        { id: '41000104066', title: 'Agen Rahasia', rating: 8.9, year: 2024, genre: 'Action', episodes: 18 },
        { id: '41000104067', title: 'Sekolah Idola', rating: 8.6, year: 2024, genre: 'Comedy', episodes: 30 },
        { id: '41000104068', title: 'Cinta Abadi', rating: 8.8, year: 2024, genre: 'Romance', episodes: 24 },
        { id: '41000104069', title: 'Pahlawan Kecil', rating: 8.4, year: 2024, genre: 'Drama', episodes: 28 }
      ];

      const mockLatest = [
        { id: '41000104070', title: 'Episode Terbaru 1', rating: 8.5, year: 2024, genre: 'Thriller', episodes: 16 },
        { id: '41000104071', title: 'Episode Terbaru 2', rating: 8.3, year: 2024, genre: 'Comedy', episodes: 20 },
        { id: '41000104072', title: 'Episode Terbaru 3', rating: 8.7, year: 2024, genre: 'Romance', episodes: 18 },
        { id: '41000104073', title: 'Episode Terbaru 4', rating: 8.6, year: 2024, genre: 'Action', episodes: 22 },
        { id: '41000104074', title: 'Episode Terbaru 5', rating: 8.4, year: 2024, genre: 'Fantasi', episodes: 24 },
        { id: '41000104075', title: 'Episode Terbaru 6', rating: 8.8, year: 2024, genre: 'Drama', episodes: 26 },
        { id: '41000104076', title: 'Episode Terbaru 7', rating: 8.2, year: 2024, genre: 'Mystery', episodes: 20 },
        { id: '41000104077', title: 'Episode Terbaru 8', rating: 8.9, year: 2024, genre: 'Historical', episodes: 30 }
      ];

      setFeaturedDramas(mockFeatured);
      setTrendingDramas(mockTrending);
      setLatestDramas(mockLatest);
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <HeroSkeleton />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-12">
            <Skeleton width={200} height={32} className="mb-6" />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <DramaCardSkeleton count={6} />
            </div>
          </div>
          <div>
            <Skeleton width={200} height={32} className="mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DramaCardSkeleton count={4} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <Splide
          options={{
            type: 'loop',
            autoplay: true,
            interval: 5000,
            pauseOnHover: false,
            arrows: false,
            pagination: true,
            speed: 1000,
          }}
          onMoved={(splide, newIndex) => setHeroIndex(newIndex)}
        >
          {featuredDramas.map((drama, index) => (
            <SplideSlide key={drama.id}>
              <div className="relative h-screen">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 ken-burns"
                  style={{
                    backgroundImage: `url(${drama.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 hero-gradient" />
                
                {/* Content */}
                <div className="relative h-full flex items-center justify-center text-center px-4">
                  <div className="max-w-4xl">
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                      {drama.title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                      {drama.description}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                      <span className="bg-dramabox-amber text-white px-4 py-2 rounded-full text-sm font-semibold">
                        ⭐ {drama.rating}
                      </span>
                      <span className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm">
                        {drama.year}
                      </span>
                      <span className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm">
                        {drama.genre}
                      </span>
                      <span className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm">
                        {drama.episodes} Episode
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        if (drama.id) {
                          window.location.href = `/stream?bookid=${drama.id}&episode=1`;
                        }
                      }}
                      className="btn-primary text-lg px-8 py-4 glow-amber"
                    >
                      <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      Tonton Sekarang
                    </button>
                  </div>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>

        {/* Hero Typed Text */}
        <div className="absolute bottom-8 left-8 right-8 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
            <span id="hero-typed"></span>
          </h2>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-display font-bold text-white">Sedang Tren</h2>
            <Link to="/popular" className="text-dramabox-amber hover:text-amber-400 transition-colors font-semibold">
              Lihat Semua →
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trendingDramas.map((drama) => (
              <DramaCard key={drama.id} drama={drama} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Releases Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-dramabox-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-display font-bold text-white">Rilis Terbaru</h2>
            <Link to="/latest" className="text-dramabox-amber hover:text-amber-400 transition-colors font-semibold">
              Lihat Semua →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestDramas.map((drama) => (
              <DramaCard key={drama.id} drama={drama} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-white text-center mb-12">
            Jelajahi Genre Favorit Anda
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Romance', 'Aksi', 'Komedi', 'Thriller', 'Fantasi', 'Historical'].map((genre) => (
              <Link
                key={genre}
                to={`/search?q=${genre}`}
                className="group relative overflow-hidden rounded-lg bg-gray-800 p-6 text-center hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-dramabox-amber/20 to-dramabox-coral/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative text-white font-semibold">{genre}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;