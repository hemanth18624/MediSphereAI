import { useLocation } from 'react-router-dom';
import React from 'react';
import "./ImageMedicationResult.css";

export default function ImageMedicationResult() {
  const location = useLocation();
  const { diagnosis } = location.state || {};

  if (!diagnosis) {
    return <div>No diagnosis available.</div>;
  }

  return (
    <div>
      <h2>Medication Result</h2>
      <div>
        <h3>Recommended Medicines</h3>
        {diagnosis.medicinesSuggested && diagnosis.medicinesSuggested.length > 0 ? (
          <ul>
            {diagnosis.medicinesSuggested.map((medicine, index) => (
              <li key={index}>
                <strong>Medicine Name:</strong> {medicine.medicineName} <br />
                <strong>Type:</strong> {medicine.medicineType} <br /> {/* ✅ Added Medicine Type */}
                <strong>Dosage:</strong> {medicine.dosage} <br />
                <strong>Side Effects:</strong> {medicine.sideEffects.length > 0 ? medicine.sideEffects.join(", ") : "None"}
              </li>
            ))}
          </ul>
        ) : (
          <p>No medicines suggested.</p>
        )}
      </div>
    </div>
  );
}
