import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DramaCard from '../components/DramaCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { dramaboxAPI } from '../api/dramabox';

const Stream = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const bookId = searchParams.get('bookid');
  const currentEpisode = parseInt(searchParams.get('episode')) || 1;
  
  const [drama, setDrama] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(currentEpisode);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [showEpisodeSelector, setShowEpisodeSelector] = useState(false);
  const [videoQuality, setVideoQuality] = useState('720p');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    if (bookId) {
      fetchStreamData();
    }
  }, [bookId, selectedEpisode]);

  useEffect(() => {
    // Update URL when episode changes
    if (selectedEpisode !== currentEpisode) {
      navigate(`/stream?bookid=${bookId}&episode=${selectedEpisode}`, { replace: true });
    }
  }, [selectedEpisode]);

  const fetchStreamData = async () => {
    try {
      setLoading(true);
      // Mock drama data
      const mockDrama = {
        id: bookId,
        title: 'Pewaris Takhta',
        description: 'Sebuah kisah epik tentang perebutan takhta dan cinta yang melambungkan nama pemerannya ke puncak popularitas. Drama ini mengisahkan perjuangan seorang pewaris muda dalam mempertahankan tahta kerajaan yang menjadi haknya.',
        image: 'https://images.unsplash.com/photo-1543536448-d209a7620b95?w=800&h=600&fit=crop',
        rating: 9.2,
        year: 2024,
        genre: 'Historical',
        episodes: 24,
        cast: ['Kim Soo Hyun', 'Song Hye Kyo', 'Lee Min Ho', 'Park Shin Hye'],
        director: 'Lee Joon Ik',
        duration: '60 menit per episode'
      };

      // Mock episodes
      const mockEpisodes = Array.from({ length: mockDrama.episodes }, (_, i) => ({
        episode: i + 1,
        title: `Episode ${i + 1}`,
        duration: '60:00',
        description: `Deskripsi episode ${i + 1} dari drama ${mockDrama.title}`,
        thumbnail: mockDrama.image
      }));

      // Mock video URL (using a sample video)
      const mockVideoUrl = 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4';

      setDrama(mockDrama);
      setEpisodes(mockEpisodes);
      setVideoUrl(mockVideoUrl);
    } catch (error) {
      console.error('Error fetching stream data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEpisodeSelect = (episode) => {
    setSelectedEpisode(episode);
    setShowEpisodeSelector(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (!drama) {
    return (
      <div className="min-h-screen pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-gray-400 text-xl mb-4">😔 Drama tidak ditemukan</div>
          <button 
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Video Player Section */}
      <section className="relative bg-black">
        <div 
          className="relative aspect-video max-h-screen overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setShowControls(false)}
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            playbackRate={playbackSpeed}
            volume={volume}
          />

          {/* Video Controls */}
          <div className={`absolute bottom-0 left-0 right-0 video-controls p-4 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}>
            {/* Progress Bar */}
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max="100"
                value={duration ? (currentTime / duration) * 100 : 0}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Play/Pause */}
                <button
                  onClick={togglePlayPause}
                  className="text-white hover:text-dramabox-amber transition-colors"
                >
                  {isPlaying ? (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>

                {/* Time Display */}
                <div className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>

                {/* Volume */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setVolume(volume === 0 ? 1 : 0)}
                    className="text-white hover:text-dramabox-amber transition-colors"
                  >
                    {volume === 0 ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                      </svg>
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Quality Selector */}
                <select
                  value={videoQuality}
                  onChange={(e) => setVideoQuality(e.target.value)}
                  className="bg-gray-800 text-white text-sm rounded px-2 py-1"
                >
                  <option value="480p">480p</option>
                  <option value="720p">720p</option>
                  <option value="1080p">1080p</option>
                </select>

                {/* Speed Selector */}
                <select
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                  className="bg-gray-800 text-white text-sm rounded px-2 py-1"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={1}>1x</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                </select>

                {/* Episode Selector Toggle */}
                <button
                  onClick={() => setShowEpisodeSelector(!showEpisodeSelector)}
                  className="text-white hover:text-dramabox-amber transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>

                {/* Fullscreen */}
                <button
                  onClick={() => {
                    if (videoRef.current?.requestFullscreen) {
                      videoRef.current.requestFullscreen();
                    }
                  }}
                  className="text-white hover:text-dramabox-amber transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Episode Selector Modal */}
      {showEpisodeSelector && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Pilih Episode</h3>
                <button
                  onClick={() => setShowEpisodeSelector(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {episodes.map((episode) => (
                  <button
                    key={episode.episode}
                    onClick={() => handleEpisodeSelect(episode.episode)}
                    className={`p-3 rounded-lg text-center transition-all transform hover:scale-105 ${
                      selectedEpisode === episode.episode
                        ? 'bg-dramabox-amber text-white shadow-lg'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-semibold">{episode.episode}</div>
                    <div className="text-xs mt-1 opacity-75">{episode.duration}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Drama Info Section */}
      <section className="py-8 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Drama Details */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-display font-bold text-white mb-4">{drama.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-dramabox-amber text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ⭐ {drama.rating}
                </span>
                <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                  {drama.year}
                </span>
                <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                  {drama.genre}
                </span>
                <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                  {drama.episodes} Episode
                </span>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {drama.description}
              </p>

              {/* Cast & Crew */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-3">Pemeran</h3>
                  <div className="space-y-2">
                    {drama.cast?.map((actor, index) => (
                      <span key={index} className="inline-block bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3">Informasi</h3>
                  <div className="space-y-2 text-gray-300">
                    <p><span className="text-gray-400">Sutradara:</span> {drama.director}</p>
                    <p><span className="text-gray-400">Durasi:</span> {drama.duration}</p>
                    <p><span className="text-gray-400">Episode Saat Ini:</span> {selectedEpisode}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Episode List */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Daftar Episode</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {episodes.map((episode) => (
                  <button
                    key={episode.episode}
                    onClick={() => handleEpisodeSelect(episode.episode)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedEpisode === episode.episode
                        ? 'bg-dramabox-amber text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{episode.title}</div>
                        <div className="text-sm opacity-75">{episode.description}</div>
                      </div>
                      <div className="text-sm opacity-75">{episode.duration}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Dramas */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-white mb-8">Rekomendasi Serupa</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: '41000104020', title: 'Kerajaan Cinta', rating: 8.9, year: 2024, genre: 'Historical', episodes: 20 },
              { id: '41000104021', title: 'Takhta dan Hati', rating: 8.6, year: 2024, genre: 'Romance', episodes: 18 },
              { id: '41000104022', title: 'Perjuangan Tahta', rating: 8.8, year: 2024, genre: 'Drama', episodes: 22 },
              { id: '41000104023', title: 'Cinta Sejati', rating: 8.5, year: 2024, genre: 'Historical', episodes: 16 }
            ].map((drama) => (
              <DramaCard key={drama.id} drama={drama} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stream;