import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import '../styles/MainContent.css';
Chart.register(...registerables);

export default function MainContent({ patient }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    // Clean up previous chart instance
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (!patient || !chartRef.current) {
      return;
    }

    // Transform the diagnosis_history data for the chart
    const bloodPressureData = patient.diagnosis_history.map(item => ({
      month: `${item.month} ${item.year}`,
      systolic: item.blood_pressure.systolic.value,
      diastolic: item.blood_pressure.diastolic.value
    }));
    
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
          
      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: bloodPressureData.map(entry => entry.month),
          datasets: [
            {
              label: 'Systolic',
              data: bloodPressureData.map(entry => entry.systolic),
              borderColor: '#E74C8C',
              backgroundColor: '#E74C8C',
              borderWidth: 2,
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: '#fff',
            },
            {
              label: 'Diastolic',
              data: bloodPressureData.map(entry => entry.diastolic),
              borderColor: '#9370DB',
              backgroundColor: '#9370DB', 
              borderWidth: 2,
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: '#fff',
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            },
          },
          scales: {
            y: {
              beginAtZero: false,
              min: 20,
              max: 200,
              grid: {
                drawBorder: false,
              },
              ticks: {
                stepSize: 20,
              }
            },
            x: {
              grid: {
                display: false,
              }
            }
          },
        }
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [patient]);

  // If patient data is not loaded yet, show loading state
  if (!patient) {
    return <div className="main-content">Loading patient data...</div>;
  }

  // Get latest diagnosis data (assuming first entry is the most recent)
  const latestDiagnosis = patient.diagnosis_history[0];

  return (
    <div className="main-content">
      <div className="diagnosis-container">
        <div className="diagnosis-content">
          <h2 className="section-title">Diagnosis History</h2>
          <br />
          <div className="chart-section">
            <div className="chart-header">
              <h3><b>Blood Pressure</b></h3>
              <div className="time-selector">
                <span><b>Last 6 months</b></span>
                <span className="dropdown-icon">▼</span>
              </div>
            </div>
            
            <div className="bp-chart">
              <canvas ref={chartRef} id="bpChart"></canvas>
            </div>
            
            <div className="bp-readings">
              <div className="systolic-info">
                <span className="dot systolic"></span>
                <span className="label">Systolic</span>
                <span className="value">{latestDiagnosis.blood_pressure.systolic.value}</span>
                <span className="trend">{latestDiagnosis.blood_pressure.systolic.levels}</span>
              </div>
              
              <div className="diastolic-info">
                <span className="dot diastolic"></span>
                <span className="label">Diastolic</span>
                <span className="value">{latestDiagnosis.blood_pressure.diastolic.value}</span>
                <span className="trend">{latestDiagnosis.blood_pressure.diastolic.levels}</span>
              </div>
            </div>
          </div>
          
          <div className="stats-cards">
            <div className="stats-card">
              <div className="icon-container respiratory">
                <img src="https://img.icons8.com/color/64/000000/lungs.png" alt="Respiratory Rate" />
              </div>
              <div className="stat-content">
                <h3><b>Respiratory Rate</b></h3>
                <p className="stat-value">{latestDiagnosis.respiratory_rate.value} bpm</p>
                <span className="stat-status normal">{latestDiagnosis.respiratory_rate.levels}</span>
              </div>
            </div>
            
            <div className="stats-card">
              <div className="icon-container temperature">
                <img src="https://img.icons8.com/color/64/000000/temperature.png" alt="Temperature" />
              </div>
              <div className="stat-content">
                <h3><b>Temperature</b></h3>
                <p className="stat-value">{latestDiagnosis.temperature.value}°F</p>
                <span className="stat-status normal">{latestDiagnosis.temperature.levels}</span>
              </div>
            </div>
            
            <div className="stats-card">
              <div className="icon-container heart-rate">
                <img src="https://img.icons8.com/color/64/000000/heart-with-pulse.png" alt="Heart Rate" />
              </div>
              <div className="stat-content">
                <h3><b>Heart Rate</b></h3>
                <p className="stat-value">{latestDiagnosis.heart_rate.value} bpm</p>
                <span className={`stat-status ${latestDiagnosis.heart_rate.levels.toLowerCase().includes('lower') ? 'lower' : 'normal'}`}>
                  {latestDiagnosis.heart_rate.levels}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="diagnostic-section">
        <h2 className="section-title">Diagnostic List</h2>
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th><b>Problem/Diagnosis</b></th>
              <th><b>Description</b></th>
              <th><b>Status</b></th>
            </tr>
          </thead>
          <tbody>
            {patient.diagnostic_list.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <span className={`status-badge ${item.status.toLowerCase().replace(/\s/g, '-')}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}