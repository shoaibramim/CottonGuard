import React from 'react';
import { ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 py-8 border-t border-gray-200 text-center text-gray-500 bg-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
        <p className="flex items-center gap-2 text-sm font-medium">
          Built with React, FastAPI & TensorFlow
        </p>
        <a 
          href="https://huggingface.co/spaces/shoaibramim/CLDD_ResNet50" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-brand-600 hover:text-brand-700 transition-colors text-sm"
        >
          Hosted on HuggingFace Spaces <ExternalLink size={14} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;