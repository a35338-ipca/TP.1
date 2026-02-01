
import React, { useState } from 'react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: Page.Home, label: 'Início', icon: '🏠' },
    { id: Page.Attacks, label: 'Ataques', icon: '⚔️' },
    { id: Page.Guides, label: 'Guias', icon: '📖' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => onNavigate(Page.Home)}
          >
            <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-900/20 group-hover:bg-cyan-500 transition-colors">
              <span className="text-xl">🛡️</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">CyberGuard<span className="text-cyan-500">PT</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  currentPage === item.id 
                  ? 'text-cyan-400 bg-slate-800' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-400 hover:text-white p-2"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 animate-in slide-in-from-top duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium ${
                  currentPage === item.id 
                  ? 'text-cyan-400 bg-slate-800' 
                  : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
