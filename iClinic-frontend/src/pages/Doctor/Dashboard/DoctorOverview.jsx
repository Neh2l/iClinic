import React, { useEffect, useState } from 'react';
import DoctorLayout from '../DoctorLayout';
import styles from '../../../styles/overView.module.css';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';

const DoctorOverview = () => {
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          'https://iclinc-backend-gs97.onrender.com/api/v1/doctors/me',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setDoctor(res.data.data.doctor);
      } catch (err) {
        console.log('Error fetching doctor:', err);
      }
    };

    fetchDoctor();
  }, []);

  if (!doctor) return <p>Loading...</p>;

  return (
    <DoctorLayout>
      <div className={styles.profilePage}>
        <div className={styles.profileCard}>
          <img
            src={doctor.photo || '/image 1 (1).png'}
            alt="doctor"
            className={styles.profileImage}
          />

          <h2>{doctor.fullName}</h2>

          <div className={styles.info}>
            <p>
              <FaPhone className={styles.icon} />
              <span>{doctor.phone || 'No phone provided'}</span>
            </p>
            <p>
              <FaEnvelope className={styles.icon} />
              <span>{doctor.email}</span>
            </p>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.experienceCard}>
            <img src="/image 6.png" alt="graph" className={styles.graphImg} />
            <ul>
              <li>Clinic: {doctor.clinicName}</li>
              <li>Rating: ⭐ {doctor.rate}</li>
              <li>Patients count: {doctor.patients?.length}</li>
            </ul>
          </div>

          {/* Example appointments UI stays same */}
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
              {doctor.patients?.slice(0, 4).map((p, i) => (
                <div className={styles.appointment} key={i}>
                  <img
                    src={p.photo || '/image 4.png'}
                    alt="person"
                    className={styles.smallAvatar}
                  />
                  <div>
                    <p>
                      <strong>{p.name}</strong>
                    </p>
                    <p>{p.email}</p>
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
