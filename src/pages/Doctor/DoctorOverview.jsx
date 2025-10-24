import React from 'react';
import DoctorHeader from "../../components/layout/doctorHeader";
import DoctorSidebar from "../../components/layout/doctorSidebar";
import styles from "../../styles/overView.module.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const DoctorOverview = () => {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <DoctorSidebar />
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <DoctorHeader />

        {/*  Content */}
        <div className={styles.profilePage}>
          <div className={styles.profileCard}>
            <img
              src="/image 1 (1).png"
              alt="doctor"
              className={styles.profileImage}
            />
            <h2>Dr. Jessica Venkata</h2>

            <div className={styles.info}>
              <p><FaPhone /> <span>+ (555) 765-1098</span></p>
              <p><FaEnvelope /> <span>jessica212@gmail.com</span></p>
              <p><FaMapMarkerAlt /> <span>23 Maples Street, Springfield USA</span></p>
            </div>

            <div className={styles.profileButtons}>
              <button className={styles.editBtn}>Edit</button>
              <button className={styles.msgBtn}>Profile</button>
            </div>
          </div>

          <div className={styles.bottomSection}>
            <div className={styles.experienceCard}>
              <img
                src="/image 6.png"
                alt="graph"
                className={styles.graphImg}
              />
              <ul>
                <li>Over 10 years of surgical practice in leading hospitals.</li>
                <li>Specialized in advanced minimally invasive procedures.</li>
                <li>Experience in mentoring and training junior surgeons.</li>
              </ul>
            </div>

            <div className={styles.scheduleCard}>
              <h3>Today's schedule</h3>
              <div className={styles.days}>
                <span>sun<br />12</span>
                <span className={styles.active}>mon<br />13</span>
                <span>tue<br />14</span>
                <span>wed<br />15</span>
                <span>thurs<br />16</span>
              </div>

              <div className={styles.appointments}>
                {[...Array(4)].map((_, i) => (
                  <div className={styles.appointment} key={i}>
                    <img
                      src="/image 4.png"
                      alt="person"
                      className={styles.smallAvatar}
                    />
                    <div>
                      <p><strong>Jessica Venkata</strong></p>
                      <p>Monday 9:00 AM</p>
                    </div>
                    <FaPhone className={styles.callIcon} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorOverview;
