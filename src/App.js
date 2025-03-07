import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import MainContent from './components/MainContent';
import RightPanel from './components/RightPanel';
import { fetchData } from './api/patientApi';
import './styles/App.css';

function App() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getPatientData() {
      try {
        setLoading(true);
        const data = await fetchData();
        setPatient(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getPatientData();
  }, []);

  if (loading) return <div className="loading">Loading patient data...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app">
      <div className="main-container">
        <TopBar />
        <div className="content-container">
          <Sidebar />
          <MainContent patient={patient} />
          <RightPanel patient={patient} />
        </div>
      </div>
    </div>
  );
}

export default App;