import React from 'react';
import styles from '../../styles/Sidebar.module.css';
import { Link, useNavigate } from 'react-router-dom';

const DoctorSidebar = ({ closeSidebar }) => {
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

      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('token');
      navigate('/');
    }
  };
  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <p className={`${styles.logo} primary-text`}>IClinic</p>
        <ul>
          <li>
            <Link to="/doctor/overview" onClick={closeSidebar}>
              Overview
            </Link>
          </li>
          <li>
            <Link to="/doctor/patients" onClick={closeSidebar}>
              Patients
            </Link>
          </li>
          <li>
            <Link to="/doctor/messages" onClick={closeSidebar}>
              Messages
            </Link>
          </li>
          <li>
            <Link to="/doctor/appointments">Appointments</Link>
          </li>
          <li>
            <Link to="/doctor/settings" onClick={closeSidebar}>
              Settings
            </Link>
            <li>
              <Link className={styles.logout} onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DoctorSidebar;
