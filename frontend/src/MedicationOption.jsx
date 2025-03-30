import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MedicationOption.css';

const MedicationOption = () => {
  const navigate = useNavigate();

  const handleTextInput = () => {
    navigate('/medicationform');
  };

  const handleImageUpload = () => {
    navigate('/imagemedication');
  };

  return (
    <div className="option-container">
      <div className="option-header">
        <h1>Choose an Option</h1>
        <p className="option-tagline">Select either Text or Image Upload</p>
      </div>

      <div className="options-section">
        <div className="option-card" onClick={handleTextInput}>
          <div className="option-icon">📝</div>
          <h3>Text Input</h3>
          <p>Enter your symptoms and details manually</p>
          <button className="option-button">Continue with Text</button>
        </div>

        <div className="option-card" onClick={handleImageUpload}>
          <div className="option-icon">📸</div>
          <h3>Image Upload</h3>
          <p>Upload an image of your external injury</p>
          <button className="option-button">Continue with Image</button>
        </div>
      </div>
    </div>
  );
};

export default MedicationOption; 