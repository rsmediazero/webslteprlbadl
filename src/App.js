import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Latest from './pages/Latest';
import Popular from './pages/Popular';
import Ranked from './pages/Ranked';
import Search from './pages/Search';
import Stream from './pages/Stream';

function App() {
  return (
    <div className="min-h-screen bg-dramabox-dark">
      <Header />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/latest" element={<Latest />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/ranked" element={<Ranked />} />
          <Route path="/search" element={<Search />} />
          <Route path="/stream" element={<Stream />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;