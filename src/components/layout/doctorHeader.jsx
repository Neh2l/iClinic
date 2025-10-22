import React from 'react';
import styles from "../Navbar.module.css"; 
const doctorHeader = ({onMenuClick}) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <i className={`bi bi-list ${styles.menuIcon}`} onClick={onMenuClick}></i>
        <p className={styles.brand}>Doctor profile</p>
      </div>
      <div className={styles.user}>
        <span>Lina K</span>
        <i className="bi bi-person-circle"></i>
      </div>
    </nav>
  );
};

export default doctorHeader;
