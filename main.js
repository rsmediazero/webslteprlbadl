// DramaBox Streaming Platform - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initializeTypedText();
    loadDramaData();
    setupEventListeners();
}

function initializeTypedText() {
    if (document.getElementById('hero-typed')) {
        new Typed('#hero-typed', {
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
    }
}

function loadDramaData() {
    loadTrendingDramas();
    loadLatestDramas();
}

function loadTrendingDramas() {
    const trendingDramas = [
        { id: '41000104064', title: 'Legenda Biru', rating: 9.0, year: 2024, genre: 'Fantasi', episodes: 22 },
        { id: '41000104065', title: 'Keluarga Besar', rating: 8.7, year: 2024, genre: 'Family', episodes: 50 },
        { id: '41000104066', title: 'Agen Rahasia', rating: 8.9, year: 2024, genre: 'Action', episodes: 18 },
        { id: '41000104067', title: 'Sekolah Idola', rating: 8.6, year: 2024, genre: 'Comedy', episodes: 30 },
        { id: '41000104068', title: 'Cinta Abadi', rating: 8.8, year: 2024, genre: 'Romance', episodes: 24 },
        { id: '41000104069', title: 'Pahlawan Kecil', rating: 8.4, year: 2024, genre: 'Drama', episodes: 28 }
    ];

    const container = document.getElementById('trendingDramas');
    if (container) {
        container.innerHTML = trendingDramas.map(drama => createDramaCard(drama)).join('');
    }
}

function loadLatestDramas() {
    const latestDramas = [
        { id: '41000104070', title: 'Drama Terbaru 1', rating: 8.5, year: 2024, genre: 'Thriller', episodes: 16, description: 'Drama thriller terbaru dengan plot yang menegangkan.' },
        { id: '41000104071', title: 'Drama Terbaru 2', rating: 8.3, year: 2024, genre: 'Comedy', episodes: 20, description: 'Komedi ringan yang akan membuat Anda tertawa.' },
        { id: '41000104072', title: 'Drama Terbaru 3', rating: 8.7, year: 2024, genre: 'Romance', episodes: 18, description: 'Kisah cinta yang menghangatkan hati.' },
        { id: '41000104073', title: 'Drama Terbaru 4', rating: 8.6, year: 2024, genre: 'Action', episodes: 22, description: 'Aksi seru dengan efek spesialis yang memukau.' }
    ];

    const container = document.getElementById('latestDramas');
    if (container) {
        container.innerHTML = latestDramas.map(drama => createDramaCard(drama, true)).join('');
    }
}

function createDramaCard(drama, isLarge = false) {
    const cardClass = isLarge ? 'drama-card bg-gray-800 rounded-lg overflow-hidden cursor-pointer group' : 'drama-card bg-gray-800 rounded-lg overflow-hidden cursor-pointer group';
    
    return `
        <div class="${cardClass}" onclick="goToStream('${drama.id}')">
            <div class="relative overflow-hidden">
                <div class="h-64 bg-gray-700 shimmer">
                    <img src="https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000000)}?w=400&h=600&fit=crop" 
                         alt="${drama.title}" 
                         class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                         onerror="this.style.display='none'">
                </div>
                
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="absolute bottom-4 left-4 right-4">
                        <button class="bg-dramabox-amber hover:bg-amber-600 text-white rounded-full p-3 transform hover:scale-110 transition-all duration-300 mb-2">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        </button>
                    </div>
                </div>

                ${drama.rating ? `
                    <div class="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
                        <span class="text-dramabox-amber text-sm font-semibold">⭐ ${drama.rating}</span>
                    </div>
                ` : ''}

                ${drama.episodes ? `
                    <div class="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
                        <span class="text-white text-xs font-medium">${drama.episodes} eps</span>
                    </div>
                ` : ''}
            </div>

            <div class="p-4">
                <h3 class="font-semibold text-white mb-2 line-clamp-2 group-hover:text-dramabox-amber transition-colors">
                    ${drama.title}
                </h3>
                
                ${drama.description ? `
                    <p class="text-gray-400 text-sm mb-3 line-clamp-2">
                        ${drama.description}
                    </p>
                ` : ''}

                <div class="flex items-center justify-between text-sm text-gray-500">
                    ${drama.year ? `<span>${drama.year}</span>` : ''}
                    ${drama.genre ? `<span class="bg-gray-700 px-2 py-1 rounded">${drama.genre}</span>` : ''}
                </div>
            </div>
        </div>
    `;
}

function setupEventListeners() {
    // Search functionality
    const searchInputs = document.querySelectorAll('#searchInput, #mobileSearchInput');
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    });

    // Mobile menu toggle
    window.toggleMobileMenu = function() {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
        }
    };
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const mobileSearchInput = document.getElementById('mobileSearchInput');
    const query = searchInput?.value || mobileSearchInput?.value;
    
    if (query && query.trim()) {
        window.location.href = `search.html?q=${encodeURIComponent(query.trim())}`;
    }
}

function goToStream(bookId = '41000104061') {
    window.location.href = `stream.html?bookid=${bookId}&episode=1`;
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
    
    if (type === 'error') {
        notification.classList.add('bg-red-600', 'text-white');
    } else if (type === 'success') {
        notification.classList.add('bg-green-600', 'text-white');
    } else {
        notification.classList.add('bg-dramabox-amber', 'text-white');
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showNotification('Terjadi kesalahan. Silakan refresh halaman.', 'error');
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Export functions for global access
window.performSearch = performSearch;
window.goToStream = goToStream;
window.toggleMobileMenu = window.toggleMobileMenu;
window.showNotification = showNotification;