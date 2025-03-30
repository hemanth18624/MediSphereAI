import { useLocation } from 'react-router-dom';
import React from 'react';
import "./ImageMedicationResult.css";

export default function ImageMedicationResult() {
  const location = useLocation();
  const { diagnosis } = location.state || {};

  if (!diagnosis) {
    return <div className="bubble-rainbow">No diagnosis available.</div>;
  }

  return (
    <div className="sparkle-container">
      <h2 className="stormy-title">Medication Result</h2>
      <div className="cloudy-box">
        <h3 className="thunder-subtitle">Recommended Medicines</h3>
        {diagnosis.medicinesSuggested && diagnosis.medicinesSuggested.length > 0 ? (
          <ul className="rainfall-list">
            {diagnosis.medicinesSuggested.map((medicine, index) => (
              <li key={index} className="snowflake-item">
                <strong className="sunshine-label">Medicine Name:</strong> {medicine.medicineName} <br />
                <strong className="sunshine-label">Type:</strong> {medicine.medicineType} <br />
                <strong className="sunshine-label">Dosage:</strong> {medicine.dosage} <br />
                <strong className="sunshine-label">Side Effects:</strong> {medicine.sideEffects.length > 0 ? medicine.sideEffects.join(", ") : "None"}
              </li>
            ))}
          </ul>
        ) : (
          <p className="windy-message">No medicines suggested.</p>
        )}
      </div>
    </div>
  );
}
