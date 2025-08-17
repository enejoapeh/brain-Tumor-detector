import React, { useState } from 'react';
import { Brain, FileText, Github } from 'lucide-react';
import FileUpload from './components/FileUpload';
import FeatureDisplay from './components/FeatureDisplay';
import PredictionResults from './components/PredictionResults';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [features, setFeatures] = useState<Record<string, number>>({});
  const [prediction, setPrediction] = useState<{
    class: string;
    confidence: number;
    probability: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setIsLoading(true);
    setError(null);

    try {
      // Simulate feature extraction and prediction
      // In a real application, this would be API calls to your backend
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock feature extraction results
      const mockFeatures = {
        'Entropy': Math.random() * 8 + 1,
        'MSE': Math.random() * 0.1 + 0.001,
        'SSIM': Math.random() * 0.3 + 0.7,
        'DC': Math.random() * 0.2 + 0.8,
        'Skewness': (Math.random() - 0.5) * 4,
        'Contrast': Math.random() * 100 + 20,
        'Dissimilarity': Math.random() * 2 + 0.5
      };

      // Mock prediction results
      const mockPrediction = {
        class: Math.random() > 0.5 ? 'Tumor Detected' : 'No Tumor',
        confidence: Math.random() * 0.4 + 0.6,
        probability: Math.random()
      };

      setFeatures(mockFeatures);
      setPrediction(mockPrediction);
    } catch (err) {
      setError('Failed to process image. Please try again.');
      console.error('Processing error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setFeatures({});
    setPrediction(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                Brain Tumor Detection System
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                <FileText className="w-4 h-4 mr-1" />
                Documentation
              </button>
              <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                <Github className="w-4 h-4 mr-1" />
                GitHub
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Medical Image Analysis for Brain Tumor Detection
          </h2>
          <p className="text-gray-600 mb-4">
            This system uses advanced machine learning techniques to analyze medical images and detect potential brain tumors. 
            Upload a medical image to extract key features and get a prediction based on our trained model.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Feature Extraction
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Machine Learning
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              Medical Imaging
            </span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
              Computer Vision
            </span>
          </div>
        </div>

        {/* Upload Section */}
        <div className="mb-8">
          <FileUpload
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
            onClearFile={handleClearFile}
            isLoading={isLoading}
          />
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Features */}
          <div className="xl:col-span-1">
            <FeatureDisplay features={features} isLoading={isLoading} />
          </div>

          {/* Prediction */}
          <div className="xl:col-span-1">
            <PredictionResults 
              prediction={prediction} 
              isLoading={isLoading} 
              error={error} 
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              <strong>Disclaimer:</strong> This system is for educational and research purposes only. 
              It should not be used as a substitute for professional medical diagnosis.
            </p>
            <p className="text-sm">
              Always consult with qualified healthcare professionals for medical decisions.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;