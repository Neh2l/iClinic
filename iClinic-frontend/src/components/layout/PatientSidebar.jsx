import React from 'react';
import styles from '../../styles/Sidebar.module.css';
import { Link, useNavigate } from 'react-router-dom';

const PatientSidebar = ({ closeSidebar }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await fetch('https://iclinc-back.onrender.com/api/v1/doctors/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      localStorage.removeItem('token');

      if (closeSidebar) closeSidebar();

      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('token');
      navigate('/login');
    }
  };
  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <p className={`${styles.logo} primary-text`}>IClinic</p>
        <ul>
          <li>
            <Link to="/patient/patientProfile" onClick={closeSidebar}>
              Overview
            </Link>
          </li>
          <li>
            <Link to="/patient/doctorslist" onClick={closeSidebar}>
              Doctors
            </Link>
          </li>
          <li>
            <Link to="/patient/messages" onClick={closeSidebar}>
              Messages
            </Link>
          </li>
          <li>
            <Link to="/patient/settings" onClick={closeSidebar}>
              Settings
            </Link>
          </li>
          <li>
            <Link className={styles.logout} onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PatientSidebar;
