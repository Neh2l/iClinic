import React from 'react';
import { Link } from 'react-router-dom';

const PatientHeader = () => {
  return (
    <nav className="bg-white shadow-sm border-bottom" style={{ height: '64px' }}>
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center" style={{ height: '64px' }}>
          {/* Logo */}
          <div className="WebsiteName">
            <h1 className="mb-0 fs-3 fw-bold" style={{color:'#015D82'}}>IClinic</h1>
          </div>

          {/* Profile Button */}
          <div className="d-flex align-items-center">
            <Link to="/patient/patientProfile" className="btn rounded-pill d-flex align-items-center gap-2 px-4" style={{ textDecoration: 'none', backgroundColor:'#015D82' }}>
              <i className="bi bi-person-circle" style={{color:'white'}}></i>
              <span style={{color:'white'}}>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PatientHeader;