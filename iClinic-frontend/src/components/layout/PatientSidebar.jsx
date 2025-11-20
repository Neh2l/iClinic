import React from 'react';
import styles from '../../styles/Sidebar.module.css';
import { Link } from 'react-router-dom';
const PatientSidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <p className={`${styles.logo} primary-text`}>IClinic</p>
        <ul>
       
          <li>
            <Link to="/patient/patientProfile" className={styles}>
              Overview
            </Link>
          </li>
          {/* <li>
            <Link to="/patient/appointments">Appointments</Link>
          </li> */}
          <li>
            <Link to="/patient/doctorslist">Doctors</Link>
          </li>
          <li>
            <Link to="/patient/messages">Messages</Link>
          </li>
          <li>
            <Link to="/patient/settings">Settings</Link>
          </li>
          <li>
            <Link to="..." className={styles.logout}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PatientSidebar;
