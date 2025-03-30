import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import "./EmergencyAssistanceForm.css";

export default function EmergencyAssistanceForm() {
  const [symptoms, setSymptoms] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [healthConditions, setHealthConditions] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/generate', {
        symptoms,
        gender,
        age,
        healthConditions
      });

      navigate('/diagnosis-result', { state: { diagnosis: response.data.diagnosis } });
    } catch (error) {
      console.error('Error submitting form:', error);
    }

    setLoading(false);
  };

  return (
    <div className="emergency-container">
      <motion.div 
        className="emergency-header" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        <h2>Emergency Assistance</h2>
      </motion.div>
      
      <motion.div 
        className="emergency-box" 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <form onSubmit={handleSubmit}>
          <div className="emergency-group">
            <input id="symptoms" type="text" required value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="How May I Help You?" />
          </div>

          <div className="emergency-group">
            <select id="gender" required value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="emergency-group">
            <input id="age" type="number" required value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter your age" min="1" max="120" />
          </div>

          <div className="emergency-group">
            <input id="healthConditions" type="text" required value={healthConditions} onChange={(e) => setHealthConditions(e.target.value)} placeholder="Any Previous Health Conditions?" />
          </div>

          <motion.button 
            type="submit" 
            className="emergency-submit-btn" 
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? 'Processing...' : 'Submit'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
