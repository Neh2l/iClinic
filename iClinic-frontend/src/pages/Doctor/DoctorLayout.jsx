import React, { useState } from 'react';
import DoctorHeader from '../../components/layout/doctorHeader';
import DoctorSidebar from '../../components/layout/doctorSidebar';
import { FaBars } from 'react-icons/fa';

const DoctorLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DoctorHeader />

      <button
        className="d-lg-none"
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 2000,
          color: '#000',
          padding: '8px 10px',
          borderRadius: '8px',
          border: 'none'
        }}
        onClick={() => setIsOpen(true)}
      >
        <FaBars size={6} />
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.4)',
            zIndex: 1500
          }}
        ></div>
      )}

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

        <div
          className="d-lg-none"
          style={{
            position: 'fixed',
            top: 0,
            left: isOpen ? '0' : '-260px',
            width: '240px',
            height: '100vh',
            background: '#fff',
            zIndex: 2001,
            transition: 'left 0.3s ease'
          }}
        >
          <DoctorSidebar closeSidebar={() => setIsOpen(false)} />
        </div>

        <main
          className="flex-grow-1 p-4 p-md-5"
          style={{
            backgroundColor: '#f8f9fa',
            marginTop: '60px',
            minHeight: 'calc(100vh - 60px)'
          }}
        >
          <div className="container-fluid">{children}</div>
        </main>
      </div>
    </>
  );
};

export default DoctorLayout;
