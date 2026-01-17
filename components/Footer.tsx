import React from "react";
import { ExternalLink } from "lucide-react";

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer
      className={`mt-16 py-8 border-t text-center transition-colors duration-300 ${
        darkMode
          ? "border-slate-700 bg-slate-800 text-slate-400"
          : "border-gray-200 bg-white text-gray-500"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
        <p className="flex items-center gap-2 text-sm font-medium">
          Built with React & TensorFlow
        </p>
        <div className="flex flex-row items-center gap-4">
          <a
            href="https://huggingface.co/spaces/shoaibramim/CLDD_ResNet50"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-brand-600 hover:text-brand-700 transition-colors text-sm"
          >
            Model hosted on HuggingFace Spaces <ExternalLink size={14} />
          </a>
          <a
            href="https://github.com/shoaibramim/CLDD"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-brand-600 hover:text-brand-700 transition-colors text-sm"
          >
            Model Implementation Code on Github <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
