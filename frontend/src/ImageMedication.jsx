import React, { useState } from 'react';
import './ImageMedication.css';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'; // ✅ Import axios


const ImageMedication = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (!selectedImage || !description.trim()) {
      alert("Please upload an image and provide a description.");
      setLoading(false);
      return;
    }
  
    const formData = new FormData();
    formData.append("image", selectedImage); // Append image file
    formData.append("description", description); // Append text
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/generateMedicationFromImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure proper header
          },
        }
      );
  
      navigate("/medication-result-image", { state: { diagnosis: response.data.diagnosis } });
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Failed to process the image.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="medication-container">
      <div className="medication-header">
        <h1>Medication Support</h1>
        <p className="medication-tagline">
          Upload a photo of your external injury and get AI-powered medication recommendations
        </p>
      </div>

      <div className="medication-form-container">
        <form onSubmit={handleSubmit} className="medication-form">
          <div className="upload-section">
            <div className="upload-box" onClick={() => document.getElementById('image-input').click()}>
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="image-preview" />
              ) : (
                <div className="upload-placeholder">
                  <span className="upload-icon">📸</span>
                  <p>Click or drag to upload image</p>
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

          <div className="description-section">
            <label htmlFor="injury-description">Describe your injury:</label>
            <textarea
              id="injury-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide details about your injury (e.g., location, type of injury, symptoms)"
              rows="4"
            />
          </div>

          <button type='submit' className='submit-btn' disabled={loading}>
            {loading ? 'Processing...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ImageMedication;