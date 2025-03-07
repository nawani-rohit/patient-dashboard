// src/pages/PatientDashboard.jsx

import React from 'react';
import useFetchPatient from '../hooks/useFetchPatient';
// OR import { fetchAllPatients } from '../api/patientApi';
// Then fetch in useEffect if not using the custom hook

import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import MainContent from '../components/MainContent';
import RightPanel from '../components/RightPanel';
import '../styles/main.css'; // global or page-specific styles

export default function PatientDashboard() {
  const { patient, loading, error } = useFetchPatient();

  if (loading) return <div>Loading patient data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!patient) return <div>No data found for Jessica Taylor.</div>;

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <TopBar />
        <div className="dashboard-content">
          <MainContent patient={patient} />
          <RightPanel patient={patient} />
        </div>
      </div>
    </div>
  );
}