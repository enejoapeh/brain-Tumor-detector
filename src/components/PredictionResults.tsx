import React from 'react';
import { AlertTriangle, CheckCircle, Clock, Brain } from 'lucide-react';

interface PredictionResultsProps {
  prediction: {
    class: string;
    confidence: number;
    probability: number;
  } | null;
  isLoading: boolean;
  error: string | null;
}

export default function PredictionResults({ prediction, isLoading, error }: PredictionResultsProps) {
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600 mr-2" />
          <h3 className="text-lg font-semibold text-red-800">Error</h3>
        </div>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <Clock className="w-6 h-6 text-blue-600 mr-2 animate-spin" />
          <h3 className="text-lg font-semibold text-gray-800">Processing...</h3>
        </div>
        <div className="space-y-3">
          <div className="w-full bg-gray-200 rounded-full h-2 animate-pulse">
            <div className="bg-blue-600 h-2 rounded-full w-3/4 animate-pulse"></div>
          </div>
          <p className="text-gray-600">Analyzing image features and making prediction...</p>
        </div>
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <Brain className="w-6 h-6 text-gray-400 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Prediction Results</h3>
        </div>
        <p className="text-gray-500">Upload an image to see prediction results</p>
      </div>
    );
  }

  const isTumor = prediction.class.toLowerCase().includes('tumor');
  const confidenceColor = prediction.confidence > 0.8 ? 'text-green-600' : 
                         prediction.confidence > 0.6 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        {isTumor ? (
          <AlertTriangle className="w-6 h-6 text-red-600 mr-2" />
        ) : (
          <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
        )}
        <h3 className="text-lg font-semibold text-gray-800">Prediction Results</h3>
      </div>

      <div className="space-y-4">
        <div className={`p-4 rounded-lg ${isTumor ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-800">Classification:</span>
            <span className={`font-semibold ${isTumor ? 'text-red-800' : 'text-green-800'}`}>
              {prediction.class}
            </span>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-800">Confidence:</span>
            <span className={`font-semibold ${confidenceColor}`}>
              {(prediction.confidence * 100).toFixed(1)}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                prediction.confidence > 0.8 ? 'bg-green-600' : 
                prediction.confidence > 0.6 ? 'bg-yellow-600' : 'bg-red-600'
              }`}
              style={{ width: `${prediction.confidence * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">Interpretation:</h4>
          <p className="text-sm text-gray-600">
            {prediction.confidence > 0.8 ? 
              'High confidence prediction. The model is very certain about this classification.' :
              prediction.confidence > 0.6 ?
              'Moderate confidence prediction. Consider additional clinical evaluation.' :
              'Low confidence prediction. Recommend further analysis and clinical review.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}