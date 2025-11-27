
import React from 'react';
import styles from '../../styles/Sidebar.module.css';
import { Link } from 'react-router-dom';

const DoctorSidebar = ({ closeSidebar }) => {
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

export default DoctorSidebar;
