import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { BrowserQRCodeReader } from '@zxing/browser';
import './AnalyzeHealthRisk.css';

const AnalyzeHealthRisk = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [qrText, setQrText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    
    // Decode QR Code
    try {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = async () => {
        try {
          const codeReader = new BrowserQRCodeReader();
          const result = await codeReader.decodeFromImageElement(image);
          setQrText(result.text);
        } catch (error) {
          console.error("Error decoding QR Code:", error);
          setQrText("Failed to decode QR Code");
        }
      };
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (!qrText) {
      alert("Please upload an image with a valid QR code.");
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/generateHealthRisk",
        { qrText },
        { headers: { "Content-Type": "application/json" } }
      );
  
      navigate("/health-risk-result", { state: { diagnosis: response.data.diagnosis } });
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Failed to process the QR code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analyze-container">
      <div className="analyze-header">
        <h1>Analyze Health Risk</h1>
        <p className="analyze-tagline">Upload your QR code for AI-powered health risk analysis</p>
      </div>

      <div className="analyze-content">
        <form onSubmit={handleSubmit} className="analyze-form">
          <div className="upload-section">
            <div className="upload-box" onClick={() => document.getElementById('image-input').click()}>
              {previewUrl ? (
                <div className="preview-container">
                  <img src={previewUrl} alt="Preview" className="image-preview" />
                  <div className="preview-overlay">
                    <span>Click to change image</span>
                  </div>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <div className="upload-icon">📄</div>
                  <h3>Upload QR Code Image</h3>
                  <p>Click or drag and drop a QR code image here</p>
                  <span className="upload-hint">Supported formats: JPG, PNG</span>
                </div>
              )}
              <input
                type="file"
                id="image-input"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>
          <button type="submit" className={`submit-button ${loading ? 'loading' : ''}`} disabled={loading || !qrText}>
            {loading ? 'Analyzing...' : 'Analyze QR Code'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnalyzeHealthRisk;
