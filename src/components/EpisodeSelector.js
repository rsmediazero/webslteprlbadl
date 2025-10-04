import React from 'react';

const EpisodeSelector = ({ episodes, currentEpisode, onEpisodeSelect, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Pilih Episode</h3>
            <button
              onClick={onClose}
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
                onClick={() => {
                  onEpisodeSelect(episode.episode);
                  onClose();
                }}
                className={`p-3 rounded-lg text-center transition-all transform hover:scale-105 ${
                  currentEpisode === episode.episode
                    ? 'bg-dramabox-amber text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <div className="font-semibold">{episode.episode}</div>
                {episode.duration && (
                  <div className="text-xs mt-1 opacity-75">{episode.duration}</div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeSelector;