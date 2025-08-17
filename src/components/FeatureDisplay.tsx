import React from 'react';
import { TrendingUp, Activity, Eye, Zap, BarChart3, Contrast, Grid3x3 } from 'lucide-react';

interface FeatureDisplayProps {
  features: Record<string, number>;
  isLoading: boolean;
}

const featureIcons = {
  'Entropy': TrendingUp,
  'MSE': Activity,
  'SSIM': Eye,
  'DC': Zap,
  'Skewness': BarChart3,
  'Contrast': Contrast,
  'Dissimilarity': Grid3x3
};

const featureDescriptions = {
  'Entropy': 'Information content measure',
  'MSE': 'Mean Squared Error',
  'SSIM': 'Structural Similarity Index',
  'DC': 'Dice Coefficient',
  'Skewness': 'Distribution asymmetry',
  'Contrast': 'Texture contrast measure',
  'Dissimilarity': 'Texture dissimilarity'
};

export default function FeatureDisplay({ features, isLoading }: FeatureDisplayProps) {
  const selectedFeatures = [
    'Entropy',
    'MSE',
    'SSIM',
    'DC',
    'Skewness',
    'Contrast',
    'Dissimilarity'
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Selected Features for Prediction
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedFeatures.map((feature) => {
          const IconComponent = featureIcons[feature as keyof typeof featureIcons];
          const value = features[feature];
          
          return (
            <div
              key={feature}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center mb-2">
                <IconComponent className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-medium text-gray-800">{feature}</span>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">
                {featureDescriptions[feature as keyof typeof featureDescriptions]}
              </p>
              
              <div className="text-lg font-semibold text-blue-600">
                {isLoading ? (
                  <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
                ) : (
                  value?.toFixed(4) || 'N/A'
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}