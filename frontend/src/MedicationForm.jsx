import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import axios from "axios";
import "./MedicationForm.css";

export default function MedicationForm() {
  const [symptoms, setSymptoms] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [medicalAllergy, setMedicalAllergy] = useState('');
  const [lifestyle, setLifestyle] = useState('');
  const [medicationType, setMedicationType] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/generateMedication', {
        symptoms,
        age,
        weight,
        medicalAllergy,
        lifestyle,
        medicationType
      });
      navigate('/medication-result', { state: { diagnosis: response.data.diagnosis } });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    setLoading(false);
  };

  return (
    <div className="med-form-container">
      <motion.h2 
        className="med-form-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Medication Form
      </motion.h2>

      <motion.form 
        onSubmit={handleSubmit} 
        className="med-form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="med-form-group">
          <label htmlFor="symptoms">Symptoms:</label>
          <input id="symptoms" type="text" required value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="Enter comma-separated values" />
        </div>

        <div className="med-form-group">
          <label htmlFor="age">Age:</label>
          <input id="age" type="number" required value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter your age" />
        </div>

        <div className="med-form-group">
          <label htmlFor="weight">Weight (kg):</label>
          <input id="weight" type="number" required value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Enter your weight" />
        </div>

        <div className="med-form-group">
          <label htmlFor="medicalAllergy">Medical Allergy:</label>
          <input id="medicalAllergy" type="text" required value={medicalAllergy} onChange={(e) => setMedicalAllergy(e.target.value)} placeholder="Any allergies?" />
        </div>

        <div className="med-form-group">
          <label htmlFor="lifestyle">Lifestyle:</label>
          <select id="lifestyle" required value={lifestyle} onChange={(e) => setLifestyle(e.target.value)}>
            <option value="">Select</option>
            <option value="sedentary">Sedentary</option>
            <option value="medium">Medium</option>
            <option value="active">Active</option>
          </select>
        </div>

        <div className="med-form-group">
          <label htmlFor="medicationType">Medication Type:</label>
          <select id="medicationType" required value={medicationType} onChange={(e) => setMedicationType(e.target.value)}>
            <option value="">Select</option>
            <option value="English Medicine">English Medicine</option>
            <option value="Homeopathy">Homeopathy</option>
            <option value="Ayurvedic">Ayurvedic</option>
          </select>
        </div>

        <motion.button 
          type="submit" 
          className="med-submit-btn" 
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? 'Processing...' : 'Submit'}
        </motion.button>
      </motion.form>
    </div>
  );
}
