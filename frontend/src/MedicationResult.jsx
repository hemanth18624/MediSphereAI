import { useLocation } from 'react-router-dom';
import './MedicationResult.css';

export default function MedicationResult() {
  const location = useLocation();
  const { diagnosis } = location.state || {};

  if (!diagnosis) {
    return <div>No diagnosis available.</div>;
  }

  return (
    <div className="medication-result-container">
      <h2 className="medication-title">Medication Result</h2>
      <div className="medication-section">
        <h3 className="section-title">Recommended Medicines</h3>
        {diagnosis.medicinesSuggested && diagnosis.medicinesSuggested.length > 0 ? (
          <ul className="medicine-list">
            {diagnosis.medicinesSuggested.map((medicine, index) => (
              <li key={index} className="medicine-item">
                <strong>Medicine Name:</strong> {medicine.medicineName} <br />
                <strong>Dosage:</strong> {medicine.dosage} <br />
                <strong>Side Effects:</strong> {medicine.sideEffects.join(", ")}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-medicines">No medicines suggested.</p>
        )}
      </div>
      <div className="medication-section">
        <h3 className="section-title">Medication Type Suggestion</h3>
        <p className="suggestion-text"><strong>Recommended Type:</strong> {diagnosis.medicationTypeSuggestion.recommendedType}</p>
        <p className="suggestion-text"><strong>Explanation:</strong> {diagnosis.medicationTypeSuggestion.explanation}</p>
      </div>
    </div>
  );
}
