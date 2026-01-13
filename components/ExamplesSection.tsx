import React from 'react';
import { EXAMPLE_IMAGES } from '../types';

interface ExamplesSectionProps {
  onSelectExample: (url: string) => void;
}

const ExamplesSection: React.FC<ExamplesSectionProps> = ({ onSelectExample }) => {
  const handleExampleClick = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], "example.jpg", { type: "image/jpeg" });
      
    } catch (e) {
      console.error("Failed to load example", e);
    }
  };

  
  return (
    <div className="mt-12 mb-12">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px bg-gray-200 flex-1"></div>
        <h2 className="text-xl font-bold text-gray-500">Or try an example</h2>
        <div className="h-px bg-gray-200 flex-1"></div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {EXAMPLE_IMAGES.map((img, idx) => (
          <button
            key={idx}
            onClick={() => onSelectExample(img.url)}
            className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <img 
              src={img.url} 
              alt={img.name} 
              className="w-full h-24 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] p-1 truncate text-center">
              {img.name.replace('.jpg', '').replace(/_/g, ' ')}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExamplesSection;