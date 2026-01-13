import React, { useState } from 'react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import ResultsSection from './components/ResultsSection';
import ExamplesSection from './components/ExamplesSection';
import ModelInfo from './components/ModelInfo';
import Footer from './components/Footer';
import { PredictionResponse } from './types';

function App() {
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (file: File) => {
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Use environment variable for API URL in production
      const API_URL = (import.meta as any).env.VITE_API_BASE_URL 
        ? `${(import.meta as any).env.VITE_API_BASE_URL}/predict` 
        : 'http://localhost:8000/predict';

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed. Please try again.');
      }

      const data: PredictionResponse = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('Failed to connect to the analysis server. Ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleExampleSelect = async (url: string) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], "example_image.jpg", { type: "image/jpeg" });
      await handleAnalyze(file);
    } catch (err) {
      console.error(err);
      setError("Could not load example image.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-12">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Upload & Context */}
          <div className="space-y-8">
            <UploadSection onAnalyze={handleAnalyze} isLoading={loading} />
            
            <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-100 hidden lg:block">
              <h3 className="font-bold text-gray-800 mb-4">Supported Disease Classes</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-brand-500 rounded-full"></span>Healthy Leaf</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-brand-500 rounded-full"></span>Bacterial Blight</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-brand-500 rounded-full"></span>Curl Virus</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-brand-500 rounded-full"></span>Herbicide Damage</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-brand-500 rounded-full"></span>Leaf Hopper Jassids</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-brand-500 rounded-full"></span>Leaf Reddening</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-brand-500 rounded-full"></span>Leaf Variegation</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                {error}
              </div>
            )}
            
            {result ? (
              <ResultsSection result={result} />
            ) : (
              !loading && (
                <div className="bg-white/50 border-2 border-dashed border-gray-200 rounded-3xl h-64 flex items-center justify-center text-gray-400">
                  <p>Results will appear here</p>
                </div>
              )
            )}
          </div>
        </div>

        <ExamplesSection onSelectExample={handleExampleSelect} />
        <ModelInfo />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;