import React, { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

interface UploadSectionProps {
  onAnalyze: (file: File) => void;
  isLoading: boolean;
  elapsedTime: number;
  selectedFile: File | null;
  preview: string | null;
  onFileSelect: (file: File | null) => void;
  darkMode: boolean;
}

const UploadSection: React.FC<UploadSectionProps> = ({ 
  onAnalyze, 
  isLoading, 
  elapsedTime,
  selectedFile,
  preview,
  onFileSelect,
  darkMode
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert("Please upload an image file");
        return;
      }
      onFileSelect(file);
    }
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const clearImage = () => {
    onFileSelect(null);
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onAnalyze(selectedFile);
    }
  };

  return (
    <div className={`rounded-3xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
      <h3 className={`text-2xl font-bold mb-6 flex items-center gap-2 transition-colors duration-300 ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>
        <ImageIcon className="text-brand-600" />
        Upload Leaf Image
      </h3>

      <div
        className={`relative border-4 border-dashed rounded-2xl text-center transition-all duration-300 h-[320px] flex flex-col items-center justify-center overflow-hidden ${
          isDragging
            ? 'border-brand-500 bg-brand-50 scale-[1.02]'
            : darkMode ? 'border-slate-600 hover:border-brand-500 hover:bg-slate-700/50' : 'border-gray-200 hover:border-brand-300 hover:bg-gray-50'
        }`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        {preview ? (
          <div className="absolute inset-0">
             <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-full object-cover" 
             />
             {/* <button
               onClick={(e) => { e.stopPropagation(); clearImage(); }}
               className="absolute -top-4 -right-4 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
             >
               <X size={20} />
             </button> */}
          </div>
        ) : (
          <div className="space-y-4 pointer-events-none">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${darkMode ? 'bg-brand-900/30' : 'bg-brand-100'}`}>
              <Upload size={32} className="text-brand-600" />
            </div>
            <p className={`text-xl font-semibold transition-colors duration-300 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>Drag & Drop or Click to Upload</p>
            <p className={`text-sm transition-colors duration-300 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Supports JPG, PNG, JPEG</p>
          </div>
        )}

        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
          disabled={!!preview}
          accept="image/*"
        />
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={clearImage}
          disabled={!preview || isLoading}
          className={`flex-1 py-3 px-6 rounded-xl border-2 font-semibold transition-all disabled:opacity-50 ${darkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500' : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'}`}
        >
          Clear
        </button>
        <button
          onClick={handleAnalyze}
          disabled={!preview || isLoading}
          className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 text-white font-bold text-lg shadow-lg hover:shadow-brand-500/30 hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
              Analyzing... {elapsedTime}s
            </>
          ) : (
            'Analyze Leaf'
          )}
        </button>
      </div>
      
      {isLoading && (
        <div className={`mt-4 p-4 border rounded-xl text-sm transition-colors duration-300 ${darkMode ? 'bg-blue-900/30 border-blue-700 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-800'}`}>
          <p className="font-semibold">⏳ This may take a moment...</p>
          <p className={`mt-1 transition-colors duration-300 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>If the HuggingFace Space is inactive, it needs time to wake up (~30-60 seconds). Thank you for your patience!</p>
        </div>
      )}
    </div>
  );
};

export default UploadSection;