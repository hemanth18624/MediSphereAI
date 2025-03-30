import { useLocation, useNavigate } from 'react-router-dom';
import './DiagnosisResult.css';

export default function DiagnosisResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const diagnosis = location.state?.diagnosis || {}; // Ensure it's an object

  return (
    <div className='container'>
      <div className='result-box'>
        <h2 className='title'>Diagnosis Result</h2>
        
        {/* Possible Conditions Section */}
        {diagnosis.possibleConditions && diagnosis.possibleConditions.length > 0 ? (
          <div className='section'>
            <h3 className='section-title'>Possible Conditions</h3>
            <table className='table'>
              <thead>
                <tr>
                  <th>Condition Name</th>
                  <th>Severity</th>
                </tr>
              </thead>
              <tbody>
                {diagnosis.possibleConditions.map((condition, index) => (
                  <tr key={index}>
                    <td>{condition.conditionName}</td>
                    <td className={`severity ${condition.severity.toLowerCase()}`}>
                      {condition.severity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className='no-data'>No possible conditions found.</p>
        )}
        
        {/* Recommended Actions Section */}
        {diagnosis.recommendedActions && diagnosis.recommendedActions.length > 0 ? (
          <div className='section'>
            <h3 className='section-title'>Recommended Actions</h3>
            <ul className='actions-list'>
              {diagnosis.recommendedActions.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className='no-data'>No recommended actions available.</p>
        )}
        
        {/* Go Home Button */}
        <div className='button-container'>
          <button className='home-button' onClick={() => navigate('/')}>Go Home</button>
        </div>
      </div>
    </div>
  );
}
