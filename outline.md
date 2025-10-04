# Project Outline - DramaBox Streaming Website

## File Structure
```
/mnt/okcomputer/output/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── DramaCard.js
│   │   ├── EpisodeSelector.js
│   │   ├── VideoPlayer.js
│   │   ├── SearchBar.js
│   │   └── LoadingSpinner.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Latest.js
│   │   ├── Popular.js
│   │   ├── Ranked.js
│   │   ├── Search.js
│   │   └── Stream.js
│   ├── api/
│   │   └── dramabox.js
│   ├── App.js
│   ├── index.js
│   └── styles/
│       └── globals.css
├── package.json
├── package-lock.json
└── README.md
```

## Page Breakdown

### 1. Home Page (index.html)
- **Hero Section**: Featured drama carousel with auto-play
- **Categories**: Drama categories with horizontal scroll
- **Trending Now**: Grid of popular dramas
- **New Releases**: Latest drama additions
- **Continue Watching**: User's watch history

### 2. Latest Dramas (latest.html)
- **Filter Bar**: Genre, year, rating filters
- **Drama Grid**: Responsive card layout
- **Pagination**: Load more functionality
- **Sort Options**: By date, rating, popularity

### 3. Popular Dramas (popular.html)
- **Ranking Display**: Numbered drama list
- **View Metrics**: Play counts and ratings
- **Time Period Filter**: Weekly, monthly, all-time
- **Quick Play**: Direct streaming access

### 4. Ranked Dramas (ranked.html)
- **Rank Type Tabs**: Trending, Popular Search, Newest
- **Dynamic Lists**: Real-time ranking updates
- **Comparison View**: Side-by-side drama stats
- **Prediction Indicators**: Rising/falling trends

### 5. Search Results (search.html)
- **Search Interface**: Advanced search with filters
- **Results Grid**: Drama cards with relevance scoring
- **No Results**: Helpful suggestions and alternatives
- **Search History**: Recent searches quick access

### 6. Streaming Page (stream.html)
- **Video Player**: Custom controls with quality options
- **Episode Navigation**: Horizontal episode selector
- **Drama Info**: Synopsis, cast, ratings
- **Related Content**: Similar drama recommendations

## Component Architecture

### Core Components
- **Header**: Navigation, search, user menu
- **DramaCard**: Reusable card with hover effects
- **VideoPlayer**: Custom HTML5 video player
- **EpisodeSelector**: Grid-based episode picker
- **SearchBar**: Real-time search with suggestions

### Utility Components
- **LoadingSpinner**: Skeleton screens and loading states
- **ErrorBoundary**: Graceful error handling
- **ResponsiveGrid**: Adaptive layout container
- **Modal**: Reusable modal for details and trailers

## API Integration
- **Home Data**: Fetch featured and trending dramas
- **Search API**: Real-time search with filtering
- **Streaming API**: Video source and metadata
- **Episode Data**: Episode lists and progress tracking