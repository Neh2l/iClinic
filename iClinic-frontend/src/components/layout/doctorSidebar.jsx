import React from 'react';
import styles from '../../styles/Sidebar.module.css';
import { Link } from 'react-router-dom';
const doctorSidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <p className={`${styles.logo} primary-text`}>IClinic</p>
        <ul>
          <li>
            <Link to="/doctor/overview" className={styles}>
              Overview
            </Link>
          </li>
          <li>
            <Link to="/doctor/appointments">Appointments</Link>
          </li>
          <li>
            <Link to="/doctor/patients">Patients</Link>
          </li>
          <li>
            <Link to="/doctor/messages">Messages</Link>
          </li>
          <li>
            <Link to="/doctor/settings">Settings</Link>
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

export default doctorSidebar;
