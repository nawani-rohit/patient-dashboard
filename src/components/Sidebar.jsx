import React, { useState, useEffect } from 'react';
import { fetchAllPatients } from '../api/patientApi';
import '../styles/Sidebar.css';

export default function Sidebar() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPatients() {
      try {
        const data = await fetchAllPatients();
        setPatients(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching patients:', err);
      } finally {
        setLoading(false);
      }
    }

    loadPatients();
  }, []);

  if (loading) {
    return (
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Patients</h2>
          <button className="search-icon-button">🔍</button>
        </div>
        <div className="patients-list">
          <div className="loading-message">Loading patients...</div>
        </div>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Patients</h2>
          <button className="search-icon-button">🔍</button>
        </div>
        <div className="patients-list">
          <div className="error-message">Error loading patients: {error}</div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Patients</h2>
        <button className="search-icon-button">🔍</button>
      </div>
      
      <div className="patients-list">
        {patients.map((patient, index) => (
          <div key={index} className={`patient-item ${patient.name === 'Jessica Taylor' ? 'active' : ''}`}>
            <img 
              src={patient.profile_picture || `https://randomuser.me/api/portraits/${patient.gender === 'Female' ? 'women' : 'men'}/${index+50}.jpg`} 
              alt={patient.name} 
              className="patient-avatar" 
            />
            <div className="patient-info">
              <span className="patient-name">{patient.name}</span>
              <span className="patient-details">{patient.gender}, {patient.age}</span>
            </div>
            <button className="patient-menu">⋯</button>
          </div>
        ))}
      </div>
    </aside>
  );
}