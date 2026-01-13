import React from 'react';
import { Leaf } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-br from-brand-800 to-brand-900 text-white shadow-lg rounded-b-3xl mb-8">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 flex flex-col md:flex-row items-center justify-center gap-6">
        <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm shadow-inner shrink-0">
            <Leaf size={40} className="text-white" />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-extrabold mb-2 tracking-tight text-shadow">
            Cotton Leaf Disease Detector
          </h1>
          <p className="text-sm text-brand-100 max-w-xl font-medium opacity-90">
            Advanced AI-powered disease detection using ResNet50 deep learning.
            Upload a leaf image for real-time diagnosis.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;