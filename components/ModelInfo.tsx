import React from 'react';
import { Info, Cpu, Target, Layers, List } from 'lucide-react';

const ModelInfo: React.FC = () => {
  return (
    <div className="mt-12 bg-gray-50 rounded-3xl p-8 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Info className="text-brand-600" />
        Model Information
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2 text-brand-600">
            <Cpu size={20} />
            <span className="font-semibold text-sm uppercase tracking-wider">Architecture</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">ResNet50</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2 text-brand-600">
            <Target size={20} />
            <span className="font-semibold text-sm uppercase tracking-wider">Accuracy</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">~98%</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2 text-brand-600">
            <Layers size={20} />
            <span className="font-semibold text-sm uppercase tracking-wider">Input Size</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">224 × 224</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2 text-brand-600">
            <List size={20} />
            <span className="font-semibold text-sm uppercase tracking-wider">Classes</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">7 Diseases</p>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-600 bg-white p-6 rounded-2xl border border-gray-100">
        <strong className="block text-gray-900 mb-2">Training Details:</strong>
        Model trained on custom Cotton Leaf Disease Dataset (CLDD) with transfer learning from ImageNet pre-trained weights. Suitable for field deployment and real-time diagnosis.
        <br/><br/>
        <em className="text-brand-600">Note: This is a research prototype. Always consult agricultural experts for critical decisions.</em>
      </div>
    </div>
  );
};

export default ModelInfo;