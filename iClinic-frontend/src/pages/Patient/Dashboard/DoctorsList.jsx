import styles from '../../../styles/list.module.css';
import { useState, useEffect } from 'react';
import { FaMedal } from 'react-icons/fa';
import PatientLayout from '../PatientLayout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorsList = () => {
  const [tab, setTab] = useState('All doctors');
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const baseURL = 'https://iclinc-back.onrender.com/api/v1/patients/doctors';

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return console.log('No token found');

        const res = await axios.get(baseURL, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setDoctors(res.data.data.doctors || []);
      } catch (error) {
        console.error('Error fetching doctors:', error.response?.data || error);
      }
    };

    fetchDoctors();
  }, []);

  const filterDoctors =
    tab === 'All doctors'
      ? doctors
      : doctors.filter((doc) => doc.speciality === tab);

  return (
    <PatientLayout>
      <div>
        <div className={styles.buttons}>
          {[
            'All doctors',
            'Neurology',
            'Cardiology',
            'Dermatology',
            'Pediatrics'
          ].map((item) => (
            <button
              key={item}
              className={`${styles.btn} ${tab === item ? styles.active : ''}`}
              onClick={() => setTab(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <select
          className={styles.dropdown}
          value={tab}
          onChange={(e) => setTab(e.target.value)}
        >
          <option value="All doctors">All doctors</option>
          <option value="Neurology">Neurology</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Pediatrics">Pediatrics</option>
        </select>

        <div className={styles.container}>
          {filterDoctors.length > 0 ? (
            filterDoctors.map((doctor, index) => (
              <div key={doctor._id || index} className={styles.cards}>
                <div className={styles.cardTop}>
                  <span className={styles.exp}>
                    <FaMedal className={styles.badgeIcon} />{' '}
                    {doctor.experience || '6.5 k'}
                  </span>
                  <img
                    src={
                      doctor.image || doctor.profileImage || '/image 1 (1).png'
                    }
                    alt={doctor.fullName || doctor.name}
                    className={styles.pic}
                  />
                </div>

                <div className={styles.cardBottom}>
                  <h4 className={styles.drName}>
                    {doctor.fullName || doctor.name}
                  </h4>
                  <p className={styles.speciality}>
                    {doctor.speciality || 'General'}
                  </p>
                  <p className={styles.rate}>{doctor.rate || '★★★★★'}</p>
                  <p className={styles.clinicName}>
                    {typeof doctor.clinicName === 'object'
                      ? JSON.stringify(doctor.clinicName)
                      : doctor.clinicName || ''}
                  </p>

                  <button
                    className={styles.btn2}
                    onClick={() =>
                      navigate('/patient/doctorProfile', { state: doctor })
                    }
                  >
                    View details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No doctors available.</p>
          )}
        </div>
      </div>
    </PatientLayout>
  );
};

export default DoctorsList;
