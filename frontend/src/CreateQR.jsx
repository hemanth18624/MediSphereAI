import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './CreateQR.css';

export default function CreateQR() {
  const [formData, setFormData] = useState({
    personName: '',
    age: '',
    gender: '',
    healthConditions: '',
    weight: '',
    bloodPressure: '',
    sugarLevels: '',
    lifestyle: '',
    bmi: '',
    cholesterolLevel: ''
  });

  const [qrCodeData, setQrCodeData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = `
      Name: ${formData.personName}
      Age: ${formData.age} years
      Gender: ${formData.gender}
      Health Conditions: ${formData.healthConditions || 'None'}
      Weight: ${formData.weight} kg
      Blood Pressure: ${formData.bloodPressure} mmHg
      Sugar Levels: ${formData.sugarLevels} mg/dL
      Lifestyle: ${formData.lifestyle}
      BMI: ${formData.bmi} kg/m²
      Cholesterol Level: ${formData.cholesterolLevel} mg/dL
    `.trim();
    
    setQrCodeData(formattedData);
  };

  const handleDownload = () => {
    const canvas = document.getElementById('qr-code');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${formData.personName}_health_qr.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="qr-container">
      <div className="qr-header">
        <h1>Generate Health QR Code</h1>
        <p className="qr-tagline">Enter your health information to generate a QR code</p>
      </div>

      <div className="qr-content">
        <form onSubmit={handleSubmit} className="qr-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="personName">Person Name</label>
              <input type="text" id="personName" name="personName" value={formData.personName} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input type="number" id="age" name="age" value={formData.age} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="healthConditions">Previous Health Conditions</label>
              <input type="text" id="healthConditions" name="healthConditions" value={formData.healthConditions} onChange={handleInputChange} placeholder="Separate conditions with commas" />
            </div>

            <div className="form-group">
              <label htmlFor="weight">Weight (kg)</label>
              <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="bloodPressure">Blood Pressure (mmHg)</label>
              <input type="text" id="bloodPressure" name="bloodPressure" value={formData.bloodPressure} onChange={handleInputChange} placeholder="e.g., 120/80" required />
            </div>

            <div className="form-group">
              <label htmlFor="sugarLevels">Sugar Levels (mg/dL)</label>
              <input type="text" id="sugarLevels" name="sugarLevels" value={formData.sugarLevels} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="lifestyle">Lifestyle</label>
              <select id="lifestyle" name="lifestyle" value={formData.lifestyle} onChange={handleInputChange} required>
                <option value="">Select Lifestyle</option>
                <option value="Sedentary">Sedentary</option>
                <option value="Medium">Medium</option>
                <option value="Active">Active</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="bmi">BMI (kg/m²)</label>
              <input type="number" id="bmi" name="bmi" value={formData.bmi} onChange={handleInputChange} step="0.01" required />
            </div>

            <div className="form-group">
              <label htmlFor="cholesterolLevel">Cholesterol Level (mg/dL)</label>
              <input type="number" id="cholesterolLevel" name="cholesterolLevel" value={formData.cholesterolLevel} onChange={handleInputChange} required />
            </div>
          </div>

          <button type="submit" className="submit-button">Generate QR Code</button>
        </form>

        {qrCodeData && (
          <div className="qr-result">
            <QRCodeCanvas id="qr-code" value={qrCodeData} size={256} level="H" includeMargin={true} />
            <button onClick={handleDownload} className="download-button">Download QR Code</button>
          </div>
        )}
      </div>
    </div>
  );
};
