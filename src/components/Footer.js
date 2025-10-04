import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-dramabox-amber to-dramabox-coral rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-xl font-display font-bold gradient-text">DramaBox</span>
            </Link>
            <p className="text-gray-400 max-w-md">
              Platform streaming drama terlengkap dengan koleksi drama terbaru dan terpopuler dari berbagai genre.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Menu Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/latest" className="text-gray-400 hover:text-dramabox-amber transition-colors">
                  Drama Terbaru
                </Link>
              </li>
              <li>
                <Link to="/popular" className="text-gray-400 hover:text-dramabox-amber transition-colors">
                  Drama Populer
                </Link>
              </li>
              <li>
                <Link to="/ranked" className="text-gray-400 hover:text-dramabox-amber transition-colors">
                  Ranking Drama
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kategori</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400">Romance</span>
              </li>
              <li>
                <span className="text-gray-400">Aksi</span>
              </li>
              <li>
                <span className="text-gray-400">Komedi</span>
              </li>
              <li>
                <span className="text-gray-400">Thriller</span>
              </li>
              <li>
                <span className="text-gray-400">Fantasi</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} DramaBox. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Made with ❤️ for drama lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;