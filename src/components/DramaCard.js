import React from 'react';
import { useNavigate } from 'react-router-dom';

const DramaCard = ({ drama, size = 'normal' }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (drama.id || drama.bookId) {
      navigate(`/stream?bookid=${drama.id || drama.bookId}&episode=1`);
    }
  };

  const cardSize = size === 'large' ? 'col-span-2 row-span-2' : '';
  const imageHeight = size === 'large' ? 'h-96' : 'h-64';

  return (
    <div 
      className={`drama-card bg-gray-800 rounded-lg overflow-hidden cursor-pointer group ${cardSize}`}
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div className={`${imageHeight} bg-gray-700 shimmer`}>
          {drama.image && (
            <img 
              src={drama.image} 
              alt={drama.title || drama.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <button className="bg-dramabox-amber hover:bg-amber-600 text-white rounded-full p-3 transform hover:scale-110 transition-all duration-300 mb-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Rating Badge */}
        {drama.rating && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-dramabox-amber text-sm font-semibold">⭐ {drama.rating}</span>
          </div>
        )}

        {/* Episode Count */}
        {drama.episodes && (
          <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-white text-xs font-medium">{drama.episodes} eps</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-dramabox-amber transition-colors">
          {drama.title || drama.name || 'Judul Drama'}
        </h3>
        
        {drama.description && (
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {drama.description}
          </p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500">
          {drama.year && <span>{drama.year}</span>}
          {drama.genre && <span className="bg-gray-700 px-2 py-1 rounded">{drama.genre}</span>}
        </div>

        {/* Progress Bar for Continue Watching */}
        {drama.progress && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Episode {drama.currentEpisode}</span>
              <span>{drama.progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1">
              <div 
                className="bg-dramabox-amber h-1 rounded-full transition-all duration-300"
                style={{ width: `${drama.progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DramaCard;