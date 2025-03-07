// src/hooks/useFetchPatient.js

import { useEffect, useState } from 'react';
import { fetchAllPatients } from '../api/patientApi';

export default function useFetchPatient() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllPatients()
      .then(data => {
        const jessica = data.find(p => p.name === 'Jessica Taylor');
        setPatient(jessica);
      })
      .catch(err => {
        console.error(err);
        setError(err.message || 'Error fetching patient data.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { patient, loading, error };
}