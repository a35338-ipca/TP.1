
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Attacks from './pages/Attacks';
import Guides from './pages/Guides';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <Home onNavigate={setCurrentPage} />;
      case Page.Attacks:
        return <Attacks />;
      case Page.Guides:
        return <Guides />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 selection:bg-cyan-500/30">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="transition-opacity duration-300 ease-in-out">
          {renderPage()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
