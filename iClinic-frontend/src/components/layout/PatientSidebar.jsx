import React from 'react';
import styles from '../../styles/Sidebar.module.css';
import { Link } from 'react-router-dom';

const PatientSidebar = ({ closeSidebar }) => {
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
            <Link className={styles.logout} onClick={closeSidebar}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PatientSidebar;
