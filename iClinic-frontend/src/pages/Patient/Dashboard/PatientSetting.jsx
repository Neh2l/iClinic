import React, { useState, useEffect } from 'react';
import PatientLayout from '../PatientLayout';
import styles from '../../../styles/setting.module.css';
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaIdCard
} from 'react-icons/fa';
import axios from 'axios';
import img from '../../../images/Patient.png';

const API_BASE_URL = 'https://iclinc-backend-gs97.onrender.com/api/v1';

const PatientSetting = () => {
  const [tab, setTab] = useState('Profile');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [patient, setPatient] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    nationalID: ''
  });

  const [profileInfo, setProfileInfo] = useState({
    about: '',
    medicalHistory: '',
    allergies: '',
    bloodType: '',
    emergencyContact: '',
    insurance: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchPatient();
    const savedProfile = localStorage.getItem('patientProfileInfo');
    if (savedProfile) setProfileInfo(JSON.parse(savedProfile));
  }, []);

  const fetchPatient = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await axios.get(`${API_BASE_URL}/patients/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const pat = res.data.data.patient;
      setPatient({
        name: pat.name || '',
        email: pat.email || '',
        phone: pat.phone || '',
        address: pat.address || '',
        dateOfBirth: pat.dateOfBirth || '',
        nationalID: pat.nationalID || ''
      });
    } catch (err) {
      console.log('Error fetching patient:', err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  const handleProfileSave = () => {
    setShowProfileModal(false);
    localStorage.setItem('patientProfileInfo', JSON.stringify(profileInfo));
    alert('Profile info updated locally!');
  };

  const handlePatientUpdate = async () => {
    try {
      setIsSaving(true);
      const token = localStorage.getItem('token');

      const res = await axios.patch(
        `${API_BASE_URL}/patients/updateMe`,
        {
          name: patient.name,
          email: patient.email,
          phone: patient.phone,
          address: patient.address,
          dateOfBirth: patient.dateOfBirth
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.status === 'success') {
        const updatedPatient = res.data.data.patient;
        setPatient({
          name: updatedPatient.name || '',
          email: updatedPatient.email || '',
          phone: updatedPatient.phone || '',
          address: updatedPatient.address || '',
          dateOfBirth: updatedPatient.dateOfBirth || '',
          nationalID: updatedPatient.nationalID || ''
        });
        alert('Profile updated successfully!');
        setShowModal(false);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirm) return setError('Passwords do not match!');
    if (newPassword.length < 6)
      return setError('Password must be at least 6 characters!');

    try {
      const token = localStorage.getItem('token');

      await axios.patch(
        `${API_BASE_URL}/patients/updateMyPassword`,
        {
          passwordCurrent: password,
          password: newPassword,
          passwordConfirm: confirm
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPassword('');
      setNewPassword('');
      setConfirm('');
      setError('');
      alert('Password changed successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Error changing password');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <PatientLayout>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: '400px' }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout>
      <div className={styles.cards}>
        {/* Left side patient card */}
        <div className={styles.doctor}>
          <img src={img} alt="patient" className={styles.pic} />
          <h4 className={styles.cardName}>{patient.name || 'Patient Name'}</h4>
          <p className={styles.cardTitle}>Patient</p>
          <p>
            <FaPhone className={styles.icons} /> Phone: {patient.phone || '-'}{' '}
            <br />
            <FaEnvelope className={styles.icons} /> Email:{' '}
            {patient.email || '-'} <br />
            <FaMapMarkerAlt className={styles.icons} /> Address:{' '}
            {patient.address || '-'} <br />
            <FaCalendar className={styles.icons} /> DOB:{' '}
            {formatDate(patient.dateOfBirth)} <br />
            <FaIdCard className={styles.icons} /> National ID:{' '}
            {patient.nationalID || '-'}
          </p>
          <button onClick={() => setShowModal(true)} className={styles.edit}>
            Edit
          </button>
        </div>

        {/* Right side content */}
        <div className={styles.contentCard}>
          <div className={styles.contentButtons}>
            <button
              className={`${styles.btn} ${
                tab === 'Profile' ? styles.active : ''
              }`}
              onClick={() => setTab('Profile')}
            >
              My Profile
            </button>
            <button
              className={`${styles.btn} ${
                tab === 'password' ? styles.active : ''
              }`}
              onClick={() => setTab('password')}
            >
              Change Password
            </button>
            <button
              className={`${styles.btn} ${
                tab === 'privacy' ? styles.active : ''
              }`}
              onClick={() => setTab('privacy')}
            >
              Privacy & Security
            </button>
          </div>

          <div className={styles.content}>
            {/* Profile Tab */}
            {tab === 'Profile' && (
              <div className={styles.profileContent}>
                <h5>About Me</h5>
                <p>{profileInfo.about || 'No information provided'}</p>
                <h5>Medical History</h5>
                <p>
                  {profileInfo.medicalHistory || 'No medical history recorded'}
                </p>
                <h5>Allergies</h5>
                <ul>
                  {profileInfo.allergies ? (
                    profileInfo.allergies
                      .split(',')
                      .map((item, i) => <li key={i}>{item.trim()}</li>)
                  ) : (
                    <li>No allergies recorded</li>
                  )}
                </ul>
                <h5>Blood Type</h5>
                <p>{profileInfo.bloodType || 'Not specified'}</p>
                <h5>Emergency Contact</h5>
                <p>
                  {profileInfo.emergencyContact ||
                    'No emergency contact provided'}
                </p>
                <h5>Insurance Information</h5>
                <p>
                  {profileInfo.insurance || 'No insurance information provided'}
                </p>
                <button
                  onClick={() => setShowProfileModal(true)}
                  className={styles.editProfile}
                >
                  Edit Profile Info
                </button>
              </div>
            )}

            {/* Edit Profile Info Modal */}
            {showProfileModal && (
              <div className={styles.profileOverlay}>
                <div className={styles.modalProfile}>
                  <h3>Edit Profile Information</h3>
                  <div className={styles.modalGrid}>
                    <div className={styles.modalField}>
                      <label>About Me</label>
                      <textarea
                        name="about"
                        value={profileInfo.about}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className={styles.modalField}>
                      <label>Medical History</label>
                      <textarea
                        name="medicalHistory"
                        value={profileInfo.medicalHistory}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className={styles.modalField}>
                      <label>Allergies (comma separated)</label>
                      <input
                        name="allergies"
                        value={profileInfo.allergies}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className={styles.modalField}>
                      <label>Blood Type</label>
                      <input
                        name="bloodType"
                        value={profileInfo.bloodType}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className={styles.modalField}>
                      <label>Emergency Contact</label>
                      <input
                        name="emergencyContact"
                        value={profileInfo.emergencyContact}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className={styles.modalField}>
                      <label>Insurance Information</label>
                      <textarea
                        name="insurance"
                        value={profileInfo.insurance}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>
                  <div className={styles.modalButtons}>
                    <button onClick={handleProfileSave}>Save</button>
                    <button onClick={() => setShowProfileModal(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Password Tab */}
            {tab === 'password' && (
              <div className={styles.pass}>
                <h4>Change Password</h4>
                <form onSubmit={handlePasswordChange}>
                  <label>Current Password</label>
                  <br />
                  <input
                    type="password"
                    value={password}
                    placeholder="Enter current password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <br />
                  <label>New Password</label>
                  <br />
                  <input
                    type="password"
                    value={newPassword}
                    placeholder="Enter new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <br />
                  <label>Confirm Password</label>
                  <br />
                  <input
                    type="password"
                    value={confirm}
                    placeholder="Confirm new password"
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  <button type="submit">Save</button>
                </form>
              </div>
            )}

            {/* Privacy Tab */}
            {tab === 'privacy' && (
              <div className={styles.privacy}>
                <h3>Privacy Policy</h3>
                <p>
                  Welcome to iClinic, your trusted platform for digital
                  healthcare services. This Privacy Policy explains how we
                  collect, use, and protect your personal and medical
                  information when you use our website.
                </p>
                <h5>1. Information We Collect</h5>
                <p>We may collect the following types of information:</p>
                <ul>
                  <li>
                    <b>Personal Details:</b> Full name, date of birth, gender,
                    and national ID.
                  </li>
                  <li>
                    <b>Contact Information:</b> Email address, phone number, and
                    home address.
                  </li>
                  <li>
                    <b>Medical Information:</b> Health history, allergies,
                    prescriptions, and consultation records.
                  </li>
                  <li>
                    <b>Account Information:</b> Login credentials, security
                    questions, and preferences.
                  </li>
                  <li>
                    <b>Usage Data:</b> Activity logs, appointment history, and
                    device information.
                  </li>
                </ul>
                <h5>2. How We Use Your Information</h5>
                <p>We use your data to:</p>
                <ul>
                  <li>Verify your identity and create your patient profile.</li>
                  <li>Schedule and manage your appointments with doctors.</li>
                  <li>
                    Enable secure communication with healthcare providers.
                  </li>
                  <li>Store and provide access to your medical records.</li>
                  <li>
                    Send important notifications about appointments and health
                    updates.
                  </li>
                  <li>Improve platform performance and service quality.</li>
                </ul>
                <p>
                  We <b>do not sell</b> or rent your personal data to third
                  parties.
                </p>
                <h5>3. Sharing of Information</h5>
                <p>
                  Your information may be shared only in the following cases:
                </p>
                <ul>
                  <li>
                    <b>With Healthcare Providers:</b> Doctors you consult with
                    can access relevant medical information.
                  </li>
                  <li>
                    <b>With Service Providers:</b> For data hosting, payment
                    processing, and support — all under confidentiality
                    agreements.
                  </li>
                  <li>
                    <b>Legal Requirements:</b> If required by law, regulation,
                    or government request.
                  </li>
                  <li>
                    <b>With Your Consent:</b> When you explicitly approve
                    sharing of additional data.
                  </li>
                </ul>
                <h5>4. Updates to This Policy</h5>
                <p>
                  We may update this Privacy Policy to reflect new features,
                  security improvements, or legal changes. All updates will be
                  posted on the platform with the revised "Effective Date."
                  Patients will be notified of major updates via email or
                  dashboard alert.
                </p>
                <br />
                <p>
                  If you have any questions or concerns about our Privacy
                  Policy, please contact:
                  <br /> iClinic Support Team
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Patient Modal */}
      {showModal && (
        <div className={styles.profileOverlay}>
          <div className={styles.modalProfile}>
            <h3>Edit Patient Information</h3>
            <div className={styles.modalGrid}>
              <div className={styles.modalField}>
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={patient.name}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.modalField}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={patient.email}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.modalField}>
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={patient.phone}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.modalField}>
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={patient.address}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.modalField}>
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={patient.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.modalField}>
                <label>National ID (Read Only)</label>
                <input
                  type="text"
                  name="nationalID"
                  value={patient.nationalID}
                  readOnly
                  disabled
                />
              </div>
            </div>
            <div className={styles.modalButtons}>
              <button onClick={handlePatientUpdate} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button onClick={() => setShowModal(false)} disabled={isSaving}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </PatientLayout>
  );
};

export default PatientSetting;
