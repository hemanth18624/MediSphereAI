import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MedicationOption.css'; // We can reuse the existing CSS since the layout is similar

const HealthRiskPredictor = () => {
  const navigate = useNavigate();

  const handleCreateQR = () => {
    navigate('/create-qr');
  };

  const handleAnalyzeRisk = () => {
    navigate('/analyze-health-risk');
  };

  return (
    <div className="option-container">
      <div className="option-header">
        <h1>AI Based Smart QR Integration</h1>
        <p className="option-tagline">Select your Choice</p>
      </div>

      <div className="options-section">
        <div className="option-card" onClick={handleCreateQR}>
          <div className="option-icon">📱</div>
          <h3>Create a QR Code</h3>
          <p>Generate a QR code containing your health information</p>
          <button className="option-button">Create QR Code</button>
        </div>

        <div className="option-card" onClick={handleAnalyzeRisk}>
          <div className="option-icon">🔍</div>
          <h3>Analyze Health Risk</h3>
          <p>Get AI-powered analysis of your health risks</p>
          <button className="option-button">Analyze Risk</button>
        </div>
      </div>

      <div className="footer">
        <p>© 2024 MediSphere AI. All rights reserved.</p>
      </div>
    </div>
  );
};

export default HealthRiskPredictor;
