# CottonGuard: Cotton Leaf Disease Detector

A modern web application for detecting and classifying cotton leaf diseases using a fine-tuned ResNet50 deep learning model. The application features real-time AI-powered disease detection with 97.89% validation accuracy, deployed with a React frontend that communicates directly with a HuggingFace Space model.

**Live Demo**: [https://cottonguard.vercel.app/](https://cottonguard.vercel.app/)

## Features

- Real-time cotton leaf disease detection and classification
- Support for 7 disease classes including healthy leaves
- Interactive drag-and-drop image upload
- Example images for quick testing
- Detailed probability distribution visualization
- Dark mode support with responsive design
- Comprehensive model information and training details
- Direct integration with HuggingFace Space (no backend server required)

## Supported Disease Classes

1. Healthy Leaf
2. Bacterial Blight
3. Curl Virus
4. Herbicide Damage
5. Leaf Hopper Jassids
6. Leaf Reddening
7. Leaf Variegation

## Project Structure

```
CottonGuard/
├── components/              # React components
│   ├── Header.tsx          # App header with dark mode toggle
│   ├── UploadSection.tsx   # Image upload and analysis interface
│   ├── ResultsSection.tsx  # Disease diagnosis and probability display
│   ├── ExamplesSection.tsx # Example images gallery
│   ├── ModelInfo.tsx       # Model specifications and abstract
│   └── Footer.tsx          # Footer with links
├── assets/                 # Example leaf disease images
├── App.tsx                 # Main application component
├── index.tsx               # Application entry point
├── types.ts                # TypeScript type definitions
├── diseaseInfo.ts          # Disease metadata and treatment info
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## Technology Stack

### Frontend
- **React 19.2.3**: Modern UI library with hooks
- **TypeScript 5.8.2**: Type-safe development
- **Vite 6.2.0**: Fast build tool and dev server
- **Tailwind CSS (CDN)**: Utility-first CSS framework
- **Lucide React**: Icon library
- **@gradio/client 2.0.2**: Direct HuggingFace Space integration

### Model
- **Architecture**: ResNet50 (fine-tuned, last 40 layers)
- **Validation Accuracy**: 97.89%
- **Precision**: 0.9762
- **Recall**: 0.9769
- **F1-Score**: 0.9766
- **Input Size**: 224×224 RGB images
- **Training Dataset**: CLD-B (2,137 images, 7 classes)
- **Hosting**: HuggingFace Spaces

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/shoaibramim/CottonGuard.git
cd CottonGuard
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy

The application requires no environment variables and works out of the box.

### Other Platforms

The app can be deployed on any static hosting service (Netlify, GitHub Pages, etc.) as it's a client-side only application.

## Model Training Details

The ResNet50 model was trained with the following specifications:

- **Transfer Learning**: ImageNet pre-trained weights
- **Fine-tuning Strategy**: Last 40 layers unfrozen
- **Augmentation**: Dual augmentation (zoom, contrast, flip, rotation)
- **Class Imbalance Handling**: Class weighting
- **Optimizer**: Adam
- **Learning Rate**: Staged (0.001 → 1e-4)
- **Dropout**: 0.4
- **Batch Size**: 32
- **Epochs**: 30 (10 frozen + 20 fine-tuned)
- **Dataset Source**: [CLD-B Dataset](https://www.sciencedirect.com/science/article/pii/S235234092400876X)

## Usage

1. **Upload Image**: Drag and drop or click to upload a cotton leaf image
2. **Analyze**: Click the "Analyze Leaf" button to get predictions
3. **View Results**: See the predicted disease class, confidence level, severity, and treatment recommendations
4. **Try Examples**: Click on example images to quickly test the model

## Features in Detail

### Dark Mode
Toggle between light and dark themes for comfortable viewing in any lighting condition.

### Real-time Analysis
Displays elapsed time during analysis and informs users about HuggingFace Space wake-up time.

### Probability Distribution
Shows top 3 disease probabilities with visual bar charts and percentage values.

### Responsive Design
Optimized for all screen sizes from mobile to ultra-wide displays (up to 1920px).

## Model Performance

The fine-tuned ResNet50 model achieves state-of-the-art performance on the CLD-B dataset, outperforming baseline Inception V3 architecture. The model demonstrates:

- Consistent high performance across all 7 disease classes
- Balanced precision and recall metrics
- Effective handling of class imbalance through weighted training
- Robust generalization through dual augmentation strategies

For complete research details, refer to the Model Information section in the application.

## Research Paper

This application is based on research investigating deep learning architectures for cotton leaf disease detection. The employed ResNet50 architecture demonstrates superior performance through:

1. Residual connections enabling stable deep network optimization
2. Dual augmentation pipeline simulating real-world field conditions
3. Class weighting for balanced learning across imbalanced categories
4. Two-stage training strategy for effective transfer learning

## Code Repository

Complete implementation code, including preprocessing, augmentation, model training, and evaluation scripts: [https://github.com/shoaibramim/CLDD](https://github.com/shoaibramim/CLDD)

## Contributing

Contributions are welcome. Please open an issue or submit a pull request for any improvements.

## License

MIT

## Contact

For questions or collaboration opportunities, please open an issue on GitHub.

## Acknowledgments

- HuggingFace for model hosting infrastructure
- CLD-B dataset contributors
- Open source community for tools and libraries used in this project
