import React from "react";
import { Info, Cpu, Target, Layers, List, ExternalLink } from "lucide-react";

interface ModelInfoProps {
  darkMode: boolean;
}

const ModelInfo: React.FC<ModelInfoProps> = ({ darkMode }) => {
  return (
    <div
      className={`mt-12 rounded-3xl p-8 border transition-colors duration-300 ${
        darkMode
          ? "bg-slate-800 border-slate-700"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      <h3
        className={`text-xl font-bold mb-6 flex items-center gap-2 transition-colors duration-300 ${
          darkMode ? "text-slate-100" : "text-gray-800"
        }`}
      >
        <Info className="text-brand-600" />
        Model Information
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 xl:gap-8 2xl:gap-10">
        <div
          className={`p-6 rounded-2xl shadow-sm border transition-colors duration-300 ${
            darkMode
              ? "bg-slate-700 border-slate-600"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="flex items-center gap-3 mb-2 text-brand-600">
            <Cpu size={20} />
            <span className="font-semibold text-sm uppercase tracking-wider">
              Architecture
            </span>
          </div>
          <p
            className={`text-2xl font-bold transition-colors duration-300 ${
              darkMode ? "text-slate-100" : "text-gray-800"
            }`}
          >
            ResNet50
          </p>
        </div>

        <div
          className={`p-6 rounded-2xl shadow-sm border transition-colors duration-300 ${
            darkMode
              ? "bg-slate-700 border-slate-600"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="flex items-center gap-3 mb-2 text-brand-600">
            <Target size={20} />
            <span className="font-semibold text-sm uppercase tracking-wider">
              Validation Accuracy
            </span>
          </div>
          <p
            className={`text-2xl center font-bold transition-colors duration-300 ${
              darkMode ? "text-slate-100" : "text-gray-800"
            }`}
          >
            97.89%
          </p>
        </div>

        <div
          className={`p-6 rounded-2xl shadow-sm border transition-colors duration-300 ${
            darkMode
              ? "bg-slate-700 border-slate-600"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="flex items-center gap-3 mb-2 text-brand-600">
            <Layers size={20} />
            <span className="font-semibold text-sm uppercase tracking-wider">
              Input Size
            </span>
          </div>
          <p
            className={`text-2xl font-bold transition-colors duration-300 ${
              darkMode ? "text-slate-100" : "text-gray-800"
            }`}
          >
            224 × 224
          </p>
        </div>

        <div
          className={`p-6 rounded-2xl shadow-sm border transition-colors duration-300 ${
            darkMode
              ? "bg-slate-700 border-slate-600"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="flex items-center gap-3 mb-2 text-brand-600">
            <List size={20} />
            <span className="font-semibold text-sm uppercase tracking-wider">
              Classes
            </span>
          </div>
          <p
            className={`text-2xl font-bold transition-colors duration-300 ${
              darkMode ? "text-slate-100" : "text-gray-800"
            }`}
          >
            7 Diseases
          </p>
        </div>
      </div>

      <div
        className={`mt-6 text-sm p-6 rounded-2xl border transition-colors duration-300 ${
          darkMode
            ? "text-slate-300 bg-slate-700 border-slate-600"
            : "text-gray-600 bg-white border-gray-100"
        }`}
      >
        <strong
          className={`block mb-3 text-base ${
            darkMode ? "text-slate-100" : "text-gray-900"
          }`}
        >
          Abstract
        </strong>
        <p className="mb-4 leading-relaxed">
          Cotton is a major cash crop with high economic importance, but its
          production is often threatened by leaf diseases that reduce yield and
          cause financial losses. Early and accurate detection is therefore
          essential for sustaining productivity. Traditional manual inspection
          is slow, subjective, and error-prone, making automated solutions
          necessary. This paper investigates several fine-tuned Deep Learning
          (DL) architectures for detecting and classifying cotton leaf diseases
          using the publicly available Cotton Leaf Disease datasets. Several
          state-of-the-art DL architectures such as ResNet50, MobileNetV3, and
          Xception are fine-tuned and evaluated. Each architecture is tested
          under various parameters of augmentation (primary and dual), dropout
          rates, fine-tuning depths, and learning rates. Among the tested
          architectures, the best performance is achieved by the ResNet50 after
          handling class imbalance and applying dual augmentation, yielding an
          accuracy of 97.89%, a precision of 0.9762, a recall of 0.9769, and a
          F1-score of 0.9766. These findings highlight the potential of
          employing fine-tuned ResNet50 architecture in advancing precision
          agriculture as well as developing robust and automated disease
          detection systems.
        </p>

        <strong
          className={`block mb-2 text-base ${
            darkMode ? "text-slate-100" : "text-gray-900"
          }`}
        >
          Training Details
        </strong>
        <p className="leading-relaxed">
          Fine-tuned ResNet50 (last 40 layers) with transfer learning from
          ImageNet. Trained on{" "}
          <a
            href="https://www.sciencedirect.com/science/article/pii/S235234092400876X"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 hover:text-brand-700 transition-colors inline-flex items-center gap-0.5 underline"
          >
            CLD-B dataset
            <ExternalLink size={12} className="inline" />
          </a>{" "}
          (2,137 images, 7 classes) using
          dual augmentation (zoom, contrast, flip, rotation), class weighting
          for imbalance handling, dropout 0.4, and staged learning rates (0.001
          → 1e-4). Adam optimizer, batch size 32, 30 total epochs (10 frozen +
          20 fine-tuned). Input: 224×224 RGB images.
        </p>
        <br />
        <em className="text-brand-600">
          Note: This is a research prototype. Always consult agricultural
          experts for critical decisions.
        </em>
      </div>
    </div>
  );
};

export default ModelInfo;
