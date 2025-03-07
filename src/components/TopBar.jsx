import React from 'react';
import '../styles/TopBar.css';

export default function TopBar() {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="logo-container">
          <div className="logo-icon">
            <div className="logo-triangle"></div>
            <div className="logo-square"></div>
          </div>
          <span className="logo-text"></span>
        </div>
      </div>
      <nav className="main-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span className="nav-icon">🏠</span>
              Overview
            </a>
          </li>
          <li className="nav-item active">
            <a href="#" className="nav-link">
              <span className="nav-icon">👥</span>
              Patients
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span className="nav-icon">📅</span>
              Schedule
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span className="nav-icon">✉️</span>
              Message
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span className="nav-icon">💰</span>
              Transactions
            </a>
          </li>
        </ul>
      </nav>
      <div className="topbar-right">
        <div className="user-profile">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="User Avatar"
            className="user-avatar"
          />
          <div className="user-info">
            <span className="user-name">Dr. Jose Simmons</span>
            <span className="user-role">General Practitioner</span>
          </div>
        </div>
        <div className="user-controls">
          <button className="settings-button">⚙️</button>
          <button className="menu-button">⋮</button>
        </div>
      </div>
    </header>
  );
}