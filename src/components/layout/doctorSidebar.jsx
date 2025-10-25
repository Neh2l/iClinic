import React from 'react';
import styles from "../../styles/Sidebar.module.css";
const doctorSidebar = () => {
  return (
     <div className={styles.sidebar}>
      <div className={styles.top}>
        <p className={`${styles.logo} primary-text`}>IClinic</p>
        <ul>
          <li><a href="..." className={styles.active}> Overview</a></li>
          <li><a href="..."> Appointments</a></li>
          <li><a href="..."> Patients</a></li>
          <li><a href="..."> Messages</a></li>
          <li><a href="..."> Setting</a></li>
          <li><a href="..." className={styles.logout}> Logout</a></li>
        </ul>
      </div>
    </div>
  );
};

export default doctorSidebar;
