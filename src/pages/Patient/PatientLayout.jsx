import React from 'react';
import PatientHeader from '../../components/layout/patientHeader';

const PatientLayout = ({ children }) => {
  return (
    <>
      <PatientHeader />
      <main
        style={{
          marginTop: '64px', // Height of the fixed header
          minHeight: 'calc(100vh - 64px)',
          backgroundColor: '#f8f9fa'
        }}
      >
        <div className="container-fluid p-4 p-md-5">
          {children}
        </div>
      </main>
    </>
  );
};

export default PatientLayout;