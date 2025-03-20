'use client';

import React, { useState } from 'react';

const TaskUpload: React.FC = () => {
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const removeImage = (setImage: React.Dispatch<React.SetStateAction<File | null>>) => {
    setImage(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Upload Your Task Images</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4 relative">
          <label className="block text-gray-700 font-medium mb-2">Upload Image 1</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => handleImageChange(e, setImage1)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {image1 && (
            <div className="relative mt-2">
              <img src={URL.createObjectURL(image1)} alt="Preview" className="w-full h-40 object-cover rounded-md" />
              <button 
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs" 
                onClick={() => removeImage(setImage1)}
              >❌</button>
            </div>
          )}
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-700 font-medium mb-2">Upload Image 2</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => handleImageChange(e, setImage2)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {image2 && (
            <div className="relative mt-2">
              <button 
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs" 
                onClick={() => removeImage(setImage2)}
              >❌</button>
              <img src={URL.createObjectURL(image2)} alt="Preview" className="w-full h-40 object-cover rounded-md" />
            </div>
          )}
        </div>

        <button 
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TaskUpload;