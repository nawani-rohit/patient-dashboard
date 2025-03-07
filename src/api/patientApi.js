// src/api/patientApi.js

export async function fetchAllPatients() {
  // Read from environment variables
  const username = process.env.REACT_APP_API_USERNAME;
  const password = process.env.REACT_APP_API_PASSWORD;
  const endpoint = process.env.REACT_APP_API_ENDPOINT;

  if (!username || !password || !endpoint) {
    throw new Error('Missing API credentials or endpoint in environment variables.');
  }

  // Dynamically encode credentials at runtime
  const encodedCredentials = btoa(`${username}:${password}`);

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${encodedCredentials}`
    }
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return await response.json();
}

// Function to fetch data
export async function fetchData() {
  try {
    const allPatients = await fetchAllPatients();
    const patientData = allPatients.find(patient => patient.name === 'Jessica Taylor');
    
    if (!patientData) {
      throw new Error("Jessica Taylor's data not found in the API response");
    }
    
    return patientData;
  } catch (error) {
    console.error('Error fetching Jessica Taylor data:', error);
    throw error;
  }
}