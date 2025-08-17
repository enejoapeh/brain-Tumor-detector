import React, { useCallback } from 'react';
import { Upload, FileImage, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClearFile: () => void;
  isLoading: boolean;
}

export default function FileUpload({ onFileSelect, selectedFile, onClearFile, isLoading }: FileUploadProps) {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    if (imageFile) {
      onFileSelect(imageFile);
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Upload Medical Image
      </h3>
      
      {selectedFile ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <FileImage className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="font-medium text-green-800">{selectedFile.name}</p>
                <p className="text-sm text-green-600">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={onClearFile}
              disabled={isLoading}
              className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-full transition-colors disabled:opacity-50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="w-full max-w-md mx-auto">
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Uploaded medical image"
              className="w-full h-auto rounded-lg shadow-sm border border-gray-200"
            />
          </div>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">
            Drag and drop your medical image here, or click to browse
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Supports: JPG, PNG, TIFF, DICOM
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            id="file-input"
          />
          <label
            htmlFor="file-input"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <FileImage className="w-4 h-4 mr-2" />
            Select Image
          </label>
        </div>
      )}
    </div>
  );
}