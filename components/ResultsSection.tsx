import React from 'react';
import { PredictionResponse } from '../types';
import { AlertTriangle, CheckCircle, Activity } from 'lucide-react';

interface ResultsSectionProps {
  result: PredictionResponse;
  darkMode: boolean;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ result, darkMode }) => {
  const isHealthy = result.predicted_class === 'Healthy Leaf';
  
  // Transform probabilities object to array and get top 3
  const chartData = Object.entries(result.probabilities)
    .map(([name, value]) => ({ name, value: (value as number) * 100 }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 3); // Only top 3

  const colors = ['#166534', '#15803d', '#16a34a'];

  const getSeverityColor = (severity: string) => {
    switch(severity.toLowerCase()) {
      case 'high': return 'bg-red-600 text-white';
      case 'medium': return 'bg-orange-500 text-white';
      case 'low': return 'bg-brand-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getIcon = () => {
    if (isHealthy) return <CheckCircle size={48} className="text-white" />;
    return <AlertTriangle size={48} className="text-white" />;
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Main Result Card - Match Upload Card Height */}
      <div className="bg-gradient-to-br from-brand-800 to-brand-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden h-[525px] flex flex-col">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 flex-1 flex flex-col">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner">
              {getIcon()}
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">Diagnosis Result</h2>
              <p className="text-brand-200 text-sm">AI-Powered Analysis</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 mb-5 border border-white/10">
            <h3 className="text-2xl font-bold mb-3">{result.predicted_class}</h3>
            
            <div className="relative h-7 bg-black/20 rounded-full overflow-hidden mb-2">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-emerald-600 flex items-center justify-center text-sm font-bold text-white shadow-lg transition-all duration-1000 ease-out"
                style={{ width: `${result.confidence * 100}%` }}
              >
                {(result.confidence * 100).toFixed(1)}% Confidence
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 mb-5 border border-white/10 flex-1">
            <div className="mb-3 flex items-center gap-3">
              <span className="font-semibold">Severity Level:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${getSeverityColor(result.severity)}`}>
                {result.severity}
              </span>
            </div>
            
            <div className="space-y-2">
              <strong className="block mb-1">Recommended Treatment:</strong>
              <p className="leading-relaxed text-sm opacity-90 bg-black/10 p-4 rounded-xl">
                {result.treatment}
              </p>
            </div>
          </div>
          
          <div className="mt-auto pt-5 border-t border-white/20 text-center text-xs text-brand-200">
            Powered by ResNet50 DL Model • Validation Accuracy: ~98%
          </div>
        </div>
      </div>

      {/* Probability Distribution Chart - Top 3 Only */}
      <div className={`bg-white rounded-3xl shadow-xl p-8 border transition-colors duration-300 ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-gray-100'}`}>
        <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>
          <Activity className="text-brand-600" />
          Top 3 Probability Distribution
        </h3>
        
        <div className="space-y-4">
          {chartData.map((item, index) => (
            <div key={item.name} className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className={`font-semibold ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>{item.name}</span>
                
              </div>
              <div className="relative h-10 bg-gray-100 rounded-full overflow-hidden">
                {item.value > 0 && (
                  <div 
                    className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                    style={{ 
                      width: `${item.value}%`,
                      background: `linear-gradient(90deg, ${colors[index]}, ${colors[index]}dd)`
                    }}
                  >
                    <span className="text-white text-xs font-bold">{item.value.toFixed(2)}%</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;