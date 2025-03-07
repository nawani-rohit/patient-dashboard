import React from 'react';
import '../styles/RightPanel.css';

export default function RightPanel({ patient }) {
  // Display loading state if patient data isn't available yet
  if (!patient) {
    return (
      <aside className="right-panel">
        <div className="loading">Loading patient data...</div>
      </aside>
    );
  }

  // Format date of birth from ISO format to readable format
  const formatDateOfBirth = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <aside className="right-panel">
      <div className="patient-profile">
        <img 
          src={patient.profile_picture || "https://randomuser.me/api/portraits/women/79.jpg"} 
          alt={patient.name} 
          className="profile-image"
        />
        <h2 className="patient-name">{patient.name}</h2>
        
        <div className="patient-details">
          <div className="detail-item">
            <span className="detail-icon">📅</span>
            <div className="detail-content">
              <span className="detail-label">Date Of Birth</span>
              <span className="detail-value">{formatDateOfBirth(patient.date_of_birth)}</span>
            </div>
          </div>
          
          <div className="detail-item">
            <span className="detail-icon">⚧</span>
            <div className="detail-content">
              <span className="detail-label">Gender</span>
              <span className="detail-value">{patient.gender}</span>
            </div>
          </div>
          
          <div className="detail-item">
            <span className="detail-icon">📞</span>
            <div className="detail-content">
              <span className="detail-label">Contact Info</span>
              <span className="detail-value">{patient.phone_number}</span>
            </div>
          </div>
          
          <div className="detail-item">
            <span className="detail-icon">🚨</span>
            <div className="detail-content">
              <span className="detail-label">Emergency Contacts</span>
              <span className="detail-value">{patient.emergency_contact}</span>
            </div>
          </div>
          
          <div className="detail-item">
            <span className="detail-icon">🏥</span>
            <div className="detail-content">
              <span className="detail-label">Insurance Provider</span>
              <span className="detail-value">{patient.insurance_type}</span>
            </div>
          </div>
        </div>
        
        <button className="show-info-button">
          Show All Information
        </button>
      </div>
      
      <div className="lab-results">
        <h2>Lab Results</h2>
        
        {patient.lab_results && patient.lab_results.map((labResult, index) => (
          <div className="lab-item" key={index}>
            <div className="lab-info">
              <span className="lab-name">{labResult}</span>
            </div>
            <button className="download-button">
              <span className="download-icon">⬇️</span>
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}