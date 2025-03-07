# Patient Dashboard

A React-based healthcare patient dashboard application that displays patient medical information, vital signs, and diagnostic history.

## Overview

This application serves as a patient management dashboard for healthcare providers, displaying comprehensive patient information with a focus on vital health metrics. The interface is designed to provide clear visualization of health data trends and current patient status.

## Features

- **Patient Information Display**: View detailed patient profile information
- **Blood Pressure Tracking**: Interactive chart showing blood pressure history
- **Vital Signs Monitoring**: Real-time display of respiratory rate, temperature, and heart rate
- **Diagnostic List**: Complete listing of patient diagnoses with status indicators
- **Lab Results Access**: Quick access to patient lab documents

## Technologies Used

- React.js
- Chart.js for data visualization
- CSS3 with Flexbox layout
- Fetch API for data retrieval

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/patient-dashboard.git
   cd patient-dashboard
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your API credentials:
   ```
   REACT_APP_API_USERNAME=your_api_username
   REACT_APP_API_PASSWORD=your_api_password
   REACT_APP_API_ENDPOINT=https://api-endpoint-url/patients
   ```

4. Start the development server:
   ```
   npm start
   ```

5. The application will open in your browser at `http://localhost:3000`

## Project Structure

```
├── public/               # Public assets
├── src/                  # Source files
│   ├── api/              # API service modules
│   ├── components/       # React components
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── styles/           # CSS files
│   ├── App.js            # Main app component
│   └── index.js          # App entry point
└── README.md             # Project documentation
```

## API Integration

This project integrates with the Coalition Technologies Patient Data API to fetch and display patient information. The dashboard is configured to display data for a specific patient (Jessica Taylor) but can be extended to support multiple patients.

## Usage

The application provides a sidebar for patient navigation, with Jessica Taylor selected by default. The main content area displays vital signs and diagnostic information for the selected patient.

The top navigation bar allows quick access to other sections of the healthcare application (Overview, Schedule, Messages, Transactions).

## Acknowledgments

- Design inspired by modern healthcare dashboards
- UI layout based on Adobe XD template created by Coalition Technologies
- Chart implementation powered by Chart.js
