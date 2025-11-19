import React from 'react';
import styles from '../../styles/Navbar2.module.css';
const doctorHeader = ({ onMenuClick }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <i
          className={`bi bi-list ${styles.menuIcon}`}
          onClick={onMenuClick}
        ></i>
        <p className={styles.brand}>Doctor profile</p>
      </div>
    </nav>
  );
};

export default doctorHeader;
