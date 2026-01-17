import React from 'react';
import { Leaf, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, onToggleDarkMode }) => {
  return (
    <header className="bg-gradient-to-br from-brand-800 to-brand-900 text-white shadow-lg rounded-b-3xl mb-8">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm shadow-inner shrink-0">
              <Leaf size={40} className="text-white" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-extrabold mb-2 tracking-tight text-shadow">
              CottonGuard: Cotton Leaf Disease Detector
            </h1>
            <p className="text-sm text-brand-100 max-w-xl font-medium opacity-90">
              Advanced AI-powered disease detection using fine-tuned ResNet50 Architecture.
            </p>
          </div>
        </div>
        <button
          onClick={onToggleDarkMode}
          className="bg-white/20 hover:bg-white/30 p-3 rounded-xl backdrop-blur-sm transition-all duration-300 shadow-inner"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;