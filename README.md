# DramaBox - Streaming Drama Platform

A modern, elegant streaming platform for Asian dramas built with React, featuring a Netflix-like interface with smooth animations and responsive design.

## Features

### 🎬 Core Functionality
- **Home Page**: Featured dramas carousel with auto-play and trending content
- **Latest Dramas**: Browse newest releases with genre filtering and pagination
- **Popular Dramas**: View most-watched dramas with ranking system
- **Ranked Dramas**: Multiple ranking categories (Trending, Popular Search, Newest)
- **Search**: Advanced search with filters and real-time suggestions
- **Streaming**: Full-featured video player with episode selection

### 🎨 Design Features
- **Modern UI**: Netflix-inspired dark theme with premium feel
- **Smooth Animations**: Anime.js powered transitions and effects
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Elements**: Hover effects, 3D transforms, and micro-interactions
- **Loading States**: Skeleton screens and shimmer effects

### 🛠 Technical Features
- **React Router**: Client-side routing with smooth navigation
- **API Integration**: Connected to DramaBox API for real data
- **Video Player**: Custom controls with quality and speed options
- **Episode Management**: Complete episode selection and navigation
- **Search Suggestions**: Intelligent search with popular terms

## Technology Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: Tailwind CSS, Custom CSS Variables
- **Animations**: Anime.js, Typed.js, Splitting.js
- **UI Components**: Splide.js (Carousels), ECharts.js (Data Viz)
- **HTTP Client**: Axios
- **Development**: React Scripts, PostCSS, Autoprefixer

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dramabox-streaming.git
cd dramabox-streaming
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Navigation header
│   ├── Footer.js       # Footer component
│   ├── DramaCard.js    # Drama card component
│   ├── SearchBar.js    # Search functionality
│   ├── VideoPlayer.js  # Custom video player
│   ├── EpisodeSelector.js # Episode selection modal
│   └── LoadingSpinner.js # Loading states
├── pages/              # Page components
│   ├── Home.js         # Home page
│   ├── Latest.js       # Latest dramas
│   ├── Popular.js      # Popular dramas
│   ├── Ranked.js       # Ranked dramas
│   ├── Search.js       # Search results
│   └── Stream.js       # Streaming page
├── api/                # API utilities
│   └── dramabox.js     # DramaBox API client
├── styles/             # Global styles
│   └── globals.css     # Tailwind and custom CSS
└── App.js              # Main App component
```

## API Endpoints

The application connects to DramaBox API with the following endpoints:

- `GET /api/dramabox/home` - Get featured dramas
- `GET /api/dramabox/latest?page={page}` - Get latest dramas
- `GET /api/dramabox/populer?page={page}` - Get popular dramas
- `GET /api/dramabox/rankdrama?ranktype={type}` - Get ranked dramas
- `GET /api/dramabox/search?query={query}` - Search dramas
- `GET /api/dramabox/stream?bookid={id}&episode={ep}` - Get streaming data

## Key Components

### DramaCard Component
- Responsive card design with hover effects
- Rating, genre, and episode information
- Click navigation to streaming page
- Loading skeleton states

### VideoPlayer Component
- Custom HTML5 video controls
- Quality selection (480p, 720p, 1080p)
- Playback speed control (0.5x - 2x)
- Volume control and mute functionality
- Progress bar with seeking
- Fullscreen support

### SearchBar Component
- Real-time search suggestions
- Popular search terms
- Mobile-responsive design
- Keyboard navigation support

### EpisodeSelector Component
- Grid-based episode selection
- Current episode highlighting
- Episode duration display
- Modal overlay design

## Design Philosophy

### Color Palette
- **Primary Background**: Deep charcoal (#1a1a1a)
- **Accent Colors**: Warm amber (#f59e0b) and soft coral (#fb7185)
- **Text Colors**: Pure white for primary, gray for secondary

### Typography
- **Display Font**: Playfair Display (serif) for headings
- **Body Font**: Inter (sans-serif) for readability
- **Monospace**: JetBrains Mono for technical details

### Visual Effects
- **Gradient Backgrounds**: Animated aurora effects
- **Card Animations**: 3D tilt and elevation on hover
- **Text Effects**: Typewriter animation for hero text
- **Loading States**: Shimmer effects and skeleton screens

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- **Lazy Loading**: Images and components loaded on demand
- **Code Splitting**: Route-based code splitting with React Router
- **Optimized Images**: Responsive images with proper sizing
- **Smooth Animations**: Hardware-accelerated CSS animations
- **Efficient Re-renders**: React hooks for optimal performance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- DramaBox API for providing drama data
- Tailwind CSS for the utility-first styling framework
- Anime.js for smooth animations
- React community for excellent documentation and support

---

Built with ❤️ for drama lovers around the world.