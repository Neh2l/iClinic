import React from 'react';
import DoctorHeader from '../../components/layout/doctorHeader';
import DoctorSidebar from '../../components/layout/doctorSidebar';

const DoctorLayout = ({ children }) => {
  return (
    <>
      <DoctorHeader />
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        <div
          className="d-none d-lg-block"
          style={{
            width: '240px',
            position: 'sticky',
            top: '60px',
            height: 'calc(100vh - 60px)',
            overflowY: 'auto',
            backgroundColor: '#fff',
            boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
          }}
        >
          <DoctorSidebar />
        </div>

        <main
          className="flex-grow-1 p-4 p-md-5"
          style={{
            backgroundColor: '#f8f9fa',
            marginTop: '60px'
          }}
        >
          <div className="container-fluid">{children}</div>
        </main>
      </div>
    </>
  );
};

export default DoctorLayout;
