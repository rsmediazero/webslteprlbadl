import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dramabox-dark/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-dramabox-amber to-dramabox-coral rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-xl font-display font-bold gradient-text">DramaBox</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              Beranda
            </Link>
            <Link to="/latest" className={`nav-link ${isActive('/latest')}`}>
              Terbaru
            </Link>
            <Link to="/popular" className={`nav-link ${isActive('/popular')}`}>
              Populer
            </Link>
            <Link to="/ranked" className={`nav-link ${isActive('/ranked')}`}>
              Ranking
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className={`nav-link ${isActive('/')}`} onClick={() => setIsMenuOpen(false)}>
                Beranda
              </Link>
              <Link to="/latest" className={`nav-link ${isActive('/latest')}`} onClick={() => setIsMenuOpen(false)}>
                Terbaru
              </Link>
              <Link to="/popular" className={`nav-link ${isActive('/popular')}`} onClick={() => setIsMenuOpen(false)}>
                Populer
              </Link>
              <Link to="/ranked" className={`nav-link ${isActive('/ranked')}`} onClick={() => setIsMenuOpen(false)}>
                Ranking
              </Link>
              <div className="pt-4">
                <SearchBar mobile />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;