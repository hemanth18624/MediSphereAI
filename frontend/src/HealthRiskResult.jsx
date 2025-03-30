import { useLocation, useNavigate } from 'react-router-dom';
import './HealthRiskResult.css';

export default function HealthRiskResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const healthData = location.state?.diagnosis || {}; // Ensure it's an object

  return (
    <div className='container'>
      <div className='result-box'>
        <h2 className='title'>Health Risk Analysis</h2>
        
        {/* Potential Health Risks Section */}
        {healthData.potentialRisks && healthData.potentialRisks.length > 0 ? (
          <div className='section'>
            <h3 className='section-title'>Potential Health Risks</h3>
            <table className='table'>
              <thead>
                <tr>
                  <th>Disease Name</th>
                  <th>Risk Factors</th>
                </tr>
              </thead>
              <tbody>
                {healthData.potentialRisks.map((risk, index) => (
                  <tr key={index}>
                    <td>{risk.diseaseName}</td>
                    <td>{risk.riskFactor.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className='no-data'>No health risks detected.</p>
        )}
        
        {/* Lifestyle Recommendations Section */}
        {healthData.lifestyleRecommendations && healthData.lifestyleRecommendations.length > 0 ? (
          <div className='section'>
            <h3 className='section-title'>Lifestyle Recommendations</h3>
            <ul className='recommendations-list'>
              {healthData.lifestyleRecommendations.map((recommendation, index) => (
                <li key={index}>{recommendation}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className='no-data'>No lifestyle recommendations available.</p>
        )}
        
        {/* Go Home Button */}
        <div className='button-container'>
          <button className='home-button' onClick={() => navigate('/')}>Go Home</button>
        </div>
      </div>
    </div>
  );
}
