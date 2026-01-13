import React, { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

interface UploadSectionProps {
  onAnalyze: (file: File) => void;
  isLoading: boolean;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onAnalyze, isLoading }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert("Please upload an image file");
        return;
      }
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setSelectedFile(file);
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
    setPreview(null);
    setSelectedFile(null);
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onAnalyze(selectedFile);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <ImageIcon className="text-brand-600" />
        Upload Leaf Image
      </h3>

      <div
        className={`relative border-4 border-dashed rounded-2xl p-8 text-center transition-all duration-300 min-h-[300px] flex flex-col items-center justify-center ${
          isDragging
            ? 'border-brand-500 bg-brand-50 scale-[1.02]'
            : 'border-gray-200 hover:border-brand-300 hover:bg-gray-50'
        }`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        {preview ? (
          <div className="relative w-full h-full flex items-center justify-center">
             <img 
                src={preview} 
                alt="Preview" 
                className="max-h-[300px] w-auto object-contain rounded-lg shadow-md" 
             />
             <button
               onClick={(e) => { e.stopPropagation(); clearImage(); }}
               className="absolute -top-4 -right-4 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
             >
               <X size={20} />
             </button>
          </div>
        ) : (
          <div className="space-y-4 pointer-events-none">
            <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload size={32} className="text-brand-600" />
            </div>
            <p className="text-xl font-semibold text-gray-700">Drag & Drop or Click to Upload</p>
            <p className="text-sm text-gray-500">Supports JPG, PNG, JPEG</p>
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
          className="flex-1 py-3 px-6 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50"
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
              Analyzing...
            </>
          ) : (
            'Analyze Leaf'
          )}
        </button>
      </div>
    </div>
  );
};

export default UploadSection;