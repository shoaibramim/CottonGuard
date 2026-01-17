import React, { useState } from 'react';
import { Client } from '@gradio/client';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import ResultsSection from './components/ResultsSection';
import ExamplesSection from './components/ExamplesSection';
import ModelInfo from './components/ModelInfo';
import Footer from './components/Footer';
import { PredictionResponse } from './types';
import { DISEASE_INFO } from './diseaseInfo';

function App() {
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileSelect = (file: File | null) => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setSelectedFile(file);
    } else {
      setPreview(null);
      setSelectedFile(null);
    }
  };

  const parseHTMLResponse = (diagnosisHtml: string, probabilityHtml: string): PredictionResponse => {
    const probabilities: Record<string, number> = {};
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(probabilityHtml, 'text/html');
    
    const allDivs = doc.querySelectorAll('div');
    
    for (let i = 0; i < allDivs.length; i++) {
      const div = allDivs[i];
      const style = div.getAttribute('style') || '';
      
      if (style.includes('display: flex') && style.includes('justify-content: space-between')) {
        const spans = div.querySelectorAll('span');
        if (spans.length === 2) {
          const className = spans[0].textContent?.trim() || '';
          const percentText = spans[1].textContent?.trim().replace('%', '') || '';
          const percentValue = parseFloat(percentText);
          
          if (className && !isNaN(percentValue) && percentValue >= 0 && percentValue <= 100) {
            probabilities[className] = percentValue / 100;
          }
        }
      }
    }

    const sortedEntries = Object.entries(probabilities).sort((a, b) => b[1] - a[1]);
    const sortedProbabilities = Object.fromEntries(sortedEntries);

    const predictedClass = sortedEntries[0]?.[0] || 'Unknown';
    const confidence = sortedEntries[0]?.[1] || 0;

    const diseaseInfo = DISEASE_INFO[predictedClass] || {
      severity: 'Unknown',
      treatment: 'Consult agricultural expert for proper diagnosis.'
    };

    return {
      predicted_class: predictedClass,
      confidence: confidence,
      severity: diseaseInfo.severity,
      treatment: diseaseInfo.treatment,
      probabilities: sortedProbabilities
    };
  };

  const handleAnalyze = async (file: File) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setElapsedTime(0);

    const startTime = Date.now();
    const timerInterval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    try {
      const client = await Client.connect("shoaibramim/CLDD_ResNet50");
      
      const result = await client.predict("/predict", {
        image: file
      });

      const [diagnosisHtml, probabilityHtml] = result.data as [string, string];
      
      const predictionResult = parseHTMLResponse(diagnosisHtml, probabilityHtml);
      setResult(predictionResult);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze image. Please try again.');
    } finally {
      clearInterval(timerInterval);
      setLoading(false);
    }
  };

  const handleExampleSelect = async (file: File, url: string) => {
    handleFileSelect(file);
  };

  return (
    <div className={`min-h-screen pb-12 transition-colors duration-300 ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />
      
      <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 xl:gap-12 2xl:gap-16 items-start">
          
          <div className="space-y-8">
            <UploadSection 
              onAnalyze={handleAnalyze} 
              isLoading={loading} 
              elapsedTime={elapsedTime}
              selectedFile={selectedFile}
              preview={preview}
              onFileSelect={handleFileSelect}
              darkMode={darkMode}
            />
            
            <div className={`rounded-3xl p-8 shadow-md border hidden lg:block transition-colors duration-300 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
              <h1 className={`text-2xl font-bold mb-6 text-center transition-colors duration-300 ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>Supported Disease Classes</h1>
              <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-4 text-base transition-colors duration-300 ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
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

          <div className="space-y-8">
            {error && (
              <div className={`border px-6 py-4 rounded-2xl flex items-center gap-3 transition-colors duration-300 ${darkMode ? 'bg-red-900/30 border-red-700 text-red-300' : 'bg-red-50 border-red-200 text-red-700'}`}>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                {error}
              </div>
            )}
            
            {result ? (
              <ResultsSection result={result} darkMode={darkMode} />
            ) : (
              !loading && (
                <div className={`border-2 border-dashed rounded-3xl h-64 flex items-center justify-center transition-colors duration-300 ${darkMode ? 'bg-slate-800/50 border-slate-700 text-slate-500' : 'bg-white/50 border-gray-200 text-gray-400'}`}>
                  <p>Results will appear here</p>
                </div>
              )
            )}
          </div>
        </div>

        <ExamplesSection onSelectExample={handleExampleSelect} darkMode={darkMode} />
        <ModelInfo darkMode={darkMode} />
      </main>
      
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
