import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import EmergencyAssistanceForm from "./EmergencyAssistanceForm.jsx";
import DiagnosisResult from "./DiagnosisResult.jsx";
import MedicationResult from "./MedicationResult.jsx";
import MedicationForm from "./MedicationForm.jsx";
import App1 from "./test.jsx";
import ImageMedication from "./ImageMedication.jsx";
import ImageMedicationResult from "./ImageMedicationResult.jsx";
import MedicationOption from "./MedicationOption.jsx";
import HealthRiskPredictor from "./HealthRiskPredictor.jsx";
import CreateQR from "./CreateQR.jsx";
import AnalyzeHealthRisk from "./AnalyzeHealthRisk.jsx";
import HealthRiskResult from "./HealthRiskResult.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path = "/hospitalfinder" element = {<App1 />} />
        <Route path="/emergencyassistance" element={<EmergencyAssistanceForm />} />
        <Route path="/diagnosis-result" element={<DiagnosisResult />} />
        <Route path="/medicationform" element={<MedicationForm />} />
        <Route path="/medication-result" element={<MedicationResult />} />
        <Route path = "/imagemedication" element ={<ImageMedication />} />
        <Route path = "/medication-result-image" element = {<ImageMedicationResult />} />
        <Route path = "/medication-option" element = {<MedicationOption />} />
        <Route path = "/health-risk-predictor" element = {<HealthRiskPredictor />} />
        <Route path = "/create-qr" element = {<CreateQR />} />
        <Route path = "/analyze-health-risk" element = {<AnalyzeHealthRisk />} />
        <Route path = "health-risk-result" element = {<HealthRiskResult />} />
      </Routes>
    </Router>
  );
}

export default App;
