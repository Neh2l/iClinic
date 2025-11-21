import React, { useState, useEffect } from 'react';
import style from '../../../styles/DoctorProfile.module.css';
import PatientLayout from '../PatientLayout';
import { useLocation, useNavigate } from 'react-router-dom';

const plans = [
  { id: 1, name: 'Basic Plan', price: 10, serviceFees: 2, total: 12 },
  { id: 2, name: 'Standard Plan', price: 20, serviceFees: 3, total: 23 },
  { id: 3, name: 'Premium Plan', price: 30, serviceFees: 4, total: 34 }
];

function DoctorProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const doctor = location.state?.doctor || location.state;

  // Check if this doctor is already subscribed
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (doctor?._id) {
      // Check localStorage for subscription status
      const subscribedDoctors = JSON.parse(
        localStorage.getItem('subscribedDoctors') || '[]'
      );
      setIsSubscribed(subscribedDoctors.includes(doctor._id));
    }
  }, [doctor?._id, location.state?.subscribed]);

  if (!doctor) return <p>No doctor data found.</p>;

  const selectPlan = (plan) => {
    navigate('/checkout', {
      state: {
        plan,
        doctor
      }
    });
  };

  const handleMessage = () => {
    if (isSubscribed) {
      // Navigate to messages page with selected doctor
      navigate('/patient/messages', {
        state: {
          selectedDoctor: doctor
        }
      });
    }
  };

  return (
    <PatientLayout>
      <div className={style.doctorProfile}>
        <button className={style.backBtn} onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className={style.profileHeader}>
          <div className={style.profileLeft}>
            <img
              src={doctor.image || doctor.profileImage || '/image 1 (1).png'}
              alt={doctor.fullName}
              className={style.doctorImg}
            />
            <div>
              <span className={style.stars}>{doctor.rate || '★★★★★'}</span>
              <p>
                <b>{doctor.fullName}</b>
              </p>
              <p>{doctor.phone || '+(949) 678-8706'}</p>
              <button
                className={style.btnPrimary}
                disabled={!isSubscribed}
                onClick={handleMessage}
                style={{
                  opacity: isSubscribed ? 1 : 0.5,
                  cursor: isSubscribed ? 'pointer' : 'not-allowed'
                }}
                title={
                  !isSubscribed
                    ? 'Subscribe to a plan to message this doctor'
                    : ''
                }
              >
                Message
              </button>
              {!isSubscribed && (
                <p
                  style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}
                >
                  Subscribe to message
                </p>
              )}
            </div>
          </div>

          <div className={style.profileInfo}>
            <h2>
              <b>{doctor.fullName}</b>
            </h2>
            <p className={style.subtitle}>{doctor.speciality || 'General'}</p>

            <div className={style.location}>
              <p>
                <i className="bi bi-geo-alt"></i>{' '}
                {typeof doctor.location === 'object'
                  ? doctor.location.coordinates?.join(', ') || 'Maadi, Cairo'
                  : doctor.location || 'Maadi, Cairo'}
              </p>
            </div>

            <div className={style.specialties}>
              <h5>Specialties</h5>
              <div className={style.tags}>
                {doctor.speciality && <span>{doctor.speciality}</span>}
              </div>
            </div>

            <div className={style.qualifications}>
              <h5>Qualifications</h5>
              <p>{doctor.qualification || 'License: Colorado / 0024790'}</p>
            </div>

            <div className={style.experience}>
              <h5>Experience</h5>
              <p>
                {doctor.experience || '10'} years /{' '}
                {doctor.consultations || '1000+'} consultations
              </p>
            </div>
          </div>
        </div>

        <div className={style.aboutSection}>
          <h4>About</h4>
          <p>{doctor.about || 'No description provided.'}</p>
        </div>

        <div className={style.plansSection}>
          <h4>Consultation Plans</h4>
          {isSubscribed && (
            <p style={{ color: 'green', marginBottom: '10px' }}>
              ✓ You are subscribed to this doctor
            </p>
          )}
          <div className={style.plans}>
            {plans.map((plan) => (
              <div key={plan.id} className={style.planCard}>
                <h5>{plan.name}</h5>
                <p className={style.priceText}>{plan.price}$ / month</p>
                <button
                  className={style.btnPlan}
                  onClick={() => selectPlan(plan)}
                  disabled={isSubscribed}
                  style={{
                    opacity: isSubscribed ? 0.5 : 1,
                    cursor: isSubscribed ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubscribed ? 'Subscribed' : `Choose ${plan.name}`}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={style.reviewsSection}>
          <h4 className={style.reviewsTitle}>Patient Testimonials</h4>
          <div className={style.reviewsContainer}>
            <div className={style.reviewCard}>
              <div className={style.stars}>★★★★★</div>
              <h5>Quick & Helpful</h5>
              <p>
                I got medical advice within minutes. The online chat made me
                feel safe and supported.
              </p>
              <div className={style.reviewer}>
                <img
                  src="/image 4.png"
                  alt="Ahmed R"
                  className={style.reviewerImg}
                />
                <div>
                  <p className={style.reviewerName}>Ahmed R</p>
                  <p className={style.reviewDate}>August 2, 2025</p>
                </div>
              </div>
            </div>

            <div className={style.reviewCard}>
              <div className={style.stars}>★★★★</div>
              <h5>Great Experience</h5>
              <p>
                The consultation was smooth and the doctor explained everything
                clearly. I'll definitely use it again!
              </p>
              <div className={style.reviewer}>
                <img
                  src="/image 4.png"
                  alt="Lina K"
                  className={style.reviewerImg}
                />
                <div>
                  <p className={style.reviewerName}>Lina K</p>
                  <p className={style.reviewDate}>August 10, 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}

export default DoctorProfile;
