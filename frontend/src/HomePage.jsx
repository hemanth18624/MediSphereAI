import React from 'react';
import './HomePage.css';
import { useNavigate } from "react-router-dom";


const HomePage = () => {


  const navigate = useNavigate();
  const handleHospitalFinder = () => {
    navigate("/hospitalfinder");
  };

  const handleAssistance = () => {
    navigate("/emergencyassistance");
  };

  const handleMedication = () => {
    navigate("/medication-option");
  };

  const handleHealthRiskPredictor = () => {
    navigate("/health-risk-predictor");
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="main-title">MediSphere AI</h1>
        <p className="tagline">
          Revolutionizing Healthcare with Artificial Intelligence
        </p>
      </div>

      <div className="services-section">
        <div className="service-card">
          <div className="card-icon">🏥</div>
          <h3>Nearby Hospital Finder</h3>
          <p>Locate the nearest medical facilities instantly</p>
          <button className="service-button" onClick={handleHospitalFinder}>Find Hospitals</button>
        </div>

        <div className="service-card">
          <div className="card-icon">🚑</div>
          <h3>AI Based Emergency Assistance</h3>
          <p>Get immediate AI-powered emergency guidance</p>
          <button className="service-button" onClick={handleAssistance}>Emergency Help</button>
        </div>

        <div className="service-card">
          <div className="card-icon">💊</div>
          <h3>AI Based Medication</h3>
          <p>Smart medication recommendations and analysis</p>
          <button className="service-button" onClick={handleMedication}>Medication Guide</button>
        </div>
        <div className="service-card">
          <div className="card-icon">🩺</div>
          <h3>AI Based Health Risk Predictor</h3>
          <p>Leveraging AI for Health Risk Prediction </p>
          <button className="service-button" onClick={handleHealthRiskPredictor}>Analyze Risk</button>
        </div>
      </div>

      <div className="footer">
        <p>© 2024 MediSphere AI. All rights reserved.</p>
      </div>
    </div>
  );
};

export default HomePage; 