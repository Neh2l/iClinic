import React, { useState, useEffect } from 'react';
import style from '../../../styles/DoctorProfile.module.css';
import PatientLayout from '../PatientLayout';
import { useLocation, useNavigate } from 'react-router-dom';

const plans = [
  { id: 1, name: 'Basic Plan', price: 10, serviceFees: 2, total: 12 },
  { id: 2, name: 'Standard Plan', price: 20, serviceFees: 3, total: 23 },
  { id: 3, name: 'Premium Plan', price: 30, serviceFees: 4, total: 34 }
];

// Available time slots - every 30 minutes from 9 AM to 6 PM
const timeSlots = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
  '05:30 PM',
  '06:00 PM'
];

function DoctorProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const doctor = location.state?.doctor || location.state;

  // Subscription state
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [checkingSubscription, setCheckingSubscription] = useState(true);

  // Booking modal state
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState('');

  // Check subscription from backend API
  useEffect(() => {
    const checkSubscription = async () => {
      if (!doctor?._id) {
        setCheckingSubscription(false);
        return;
      }

      setCheckingSubscription(true);
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(
          `https://iclinc-back.onrender.com/api/v1/subscriptions/check-access/${doctor._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (response.ok && data.data) {
          setIsSubscribed(data.data.hasAccess);
        } else {
          setIsSubscribed(false);
        }
      } catch (err) {
        console.error('Error checking subscription:', err);
        setIsSubscribed(false);
      } finally {
        setCheckingSubscription(false);
      }
    };

    checkSubscription();
  }, [doctor?._id, location.state?.subscribed]);

  if (!doctor) return <p>No doctor data found.</p>;

  // Get today's date in YYYY-MM-DD format for min date
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const selectPlan = (plan) => {
    navigate('/checkout', {
      state: { plan, doctor }
    });
  };

  const handleMessage = () => {
    if (isSubscribed) {
      navigate('/patient/messages', {
        state: { selectedDoctor: doctor }
      });
    }
  };

  // Handle appointment booking
  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      setBookingError('Please select both date and time');
      return;
    }

    setBookingLoading(true);
    setBookingError('');
    setBookingSuccess('');

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(
        'https://iclinc-back.onrender.com/api/v1/appointments/book',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            doctorId: doctor._id,
            date: selectedDate,
            time: selectedTime
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to book appointment');
      }

      setBookingSuccess('Appointment booked successfully! ✓');

      // Reset form and close modal after 2 seconds
      setTimeout(() => {
        setShowBookingModal(false);
        setSelectedDate('');
        setSelectedTime('');
        setBookingSuccess('');
      }, 2000);
    } catch (err) {
      setBookingError(err.message || 'Failed to book appointment');
    } finally {
      setBookingLoading(false);
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

              {checkingSubscription ? (
                <p
                  style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}
                >
                  Checking subscription...
                </p>
              ) : (
                <>
                  {/* Buttons Container */}
                  <div
                    style={{ display: 'flex', gap: '10px', marginTop: '10px' }}
                  >
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

                    <button
                      className={style.btnPrimary}
                      disabled={!isSubscribed}
                      onClick={() => setShowBookingModal(true)}
                      style={{
                        opacity: isSubscribed ? 1 : 0.5,
                        cursor: isSubscribed ? 'pointer' : 'not-allowed',
                        backgroundColor: isSubscribed ? '#28a745' : undefined
                      }}
                      title={
                        !isSubscribed
                          ? 'Subscribe to a plan to book appointments'
                          : ''
                      }
                    >
                      Book Appointment
                    </button>
                  </div>

                  {!isSubscribed && (
                    <p
                      style={{
                        fontSize: '12px',
                        color: '#666',
                        marginTop: '8px'
                      }}
                    >
                      Subscribe to message and book appointments
                    </p>
                  )}
                </>
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
          {isSubscribed && !checkingSubscription && (
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
                  disabled={isSubscribed || checkingSubscription}
                  style={{
                    opacity: isSubscribed || checkingSubscription ? 0.5 : 1,
                    cursor:
                      isSubscribed || checkingSubscription
                        ? 'not-allowed'
                        : 'pointer'
                  }}
                >
                  {checkingSubscription
                    ? 'Loading...'
                    : isSubscribed
                    ? 'Subscribed'
                    : `Choose ${plan.name}`}
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

      {/* Booking Modal */}
      {showBookingModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowBookingModal(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '30px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '90vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginTop: 0 }}>
              Book Appointment with Dr. {doctor.fullName}
            </h3>

            {bookingError && (
              <div
                style={{
                  padding: '10px',
                  backgroundColor: '#f8d7da',
                  color: '#721c24',
                  borderRadius: '4px',
                  marginBottom: '15px'
                }}
              >
                {bookingError}
              </div>
            )}

            {bookingSuccess && (
              <div
                style={{
                  padding: '10px',
                  backgroundColor: '#d4edda',
                  color: '#155724',
                  borderRadius: '4px',
                  marginBottom: '15px'
                }}
              >
                {bookingSuccess}
              </div>
            )}

            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 'bold'
                }}
              >
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={getTodayDate()}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 'bold'
                }}
              >
                Select Time
              </label>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px',
                  maxHeight: '300px',
                  overflow: 'auto',
                  padding: '5px'
                }}
              >
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    style={{
                      padding: '8px',
                      border:
                        selectedTime === time
                          ? '2px solid #007bff'
                          : '1px solid #ddd',
                      backgroundColor:
                        selectedTime === time ? '#e3f2fd' : '#fff',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: selectedTime === time ? 'bold' : 'normal'
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                onClick={handleBookAppointment}
                disabled={bookingLoading || !selectedDate || !selectedTime}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor:
                    bookingLoading || !selectedDate || !selectedTime
                      ? '#ccc'
                      : '#28a745',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor:
                    bookingLoading || !selectedDate || !selectedTime
                      ? 'not-allowed'
                      : 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {bookingLoading ? 'Booking...' : 'Confirm Booking'}
              </button>
              <button
                onClick={() => {
                  setShowBookingModal(false);
                  setSelectedDate('');
                  setSelectedTime('');
                  setBookingError('');
                  setBookingSuccess('');
                }}
                disabled={bookingLoading}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#6c757d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: bookingLoading ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </PatientLayout>
  );
}

export default DoctorProfile;
