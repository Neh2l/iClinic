import React from 'react';
import DoctorLayout from '../DoctorLayout';
import styles from '../../../styles/overView.module.css';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

const DoctorOverview = () => {
  return (
    <DoctorLayout>
      <div className={styles.profilePage}>
        <div className={styles.profileCard}>
          <img
            src="/image 1 (1).png"
            alt="doctor"
            className={styles.profileImage}
          />
          <h2>Dr. Jessica Venkata</h2>

          <div className={styles.info}>
            <p>
              <FaPhone className={styles.icon} /> <span>+ (555) 765-1098</span>
            </p>
            <p>
              <FaEnvelope className={styles.icon} />{' '}
              <span>jessica212@gmail.com</span>
            </p>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.experienceCard}>
            <img src="/image 6.png" alt="graph" className={styles.graphImg} />
            <ul>
              <li>Over 10 years of surgical practice in leading hospitals.</li>
              <li>Specialized in advanced minimally invasive procedures.</li>
              <li>Experience in mentoring and training junior surgeons.</li>
            </ul>
          </div>

          <div className={styles.scheduleCard}>
            <h3>Today's schedule</h3>
            <div className={styles.days}>
              <span>
                sun
                <br />
                12
              </span>
              <span className={styles.active}>
                mon
                <br />
                13
              </span>
              <span>
                tue
                <br />
                14
              </span>
              <span>
                wed
                <br />
                15
              </span>
              <span>
                thurs
                <br />
                16
              </span>
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
                    <p>
                      <strong>Jessica Venkata</strong>
                    </p>
                    <p>Monday 9:00 AM</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorOverview;
