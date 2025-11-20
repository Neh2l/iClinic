import React, { useState, useEffect } from "react";
import DoctorLayout from "../PatientLayout";
import styles from "../../../styles/setting.module.css";
// import dr from "../../../images/dr.png";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import axios from "axios";
import img from '../../../images/Patient.png';


const PatientSetting = () => {
  const [tab, setTab] = useState("Profile");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const [doctor, setDoctor] = useState({
    fullName: "",
    clinicName: "",
    email: "",
    licenseID: "",
    nationalID: "",
    phone: "",
    title: "",
    location: { coordinates: [] },
  });

  const [profileInfo, setProfileInfo] = useState({
    about: "",
    specialties: "",
    designation: "",
    experienceDate: "",
    experience: "",
    experienceDetails: "",
    education: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Fetch doctor data from API (excluding profile info)
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          "https://iclinc-backend-gs97.onrender.com/api/v1/doctors/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const doc = res.data.data.doctor;

        setDoctor({
          fullName: doc.fullName || "",
          clinicName: doc.clinicName || "",
          email: doc.email || "",
          licenseID: doc.licenseID || "",
          nationalID: doc.nationalID || "",
          phone: doc.phone || "",
          title: doc.title || "",
          location: doc.location || { coordinates: [] },
        });
      } catch (err) {
        console.log("Error fetching doctor:", err.response?.data || err);
      }
    };

    fetchDoctor();

    // Load profile info from localStorage
    const savedProfile = localStorage.getItem("profileInfo");
    if (savedProfile) setProfileInfo(JSON.parse(savedProfile));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  // Save profile info to localStorage only
  const handleProfileSave = () => {
    setShowProfileModal(false);
    localStorage.setItem("profileInfo", JSON.stringify(profileInfo));
    alert("Profile info updated locally!");
  };

  // Change password through backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirm) return setError("Passwords do not match!");
    if (newPassword.length < 6) return setError("Password is weak!");

    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        "https://iclinc-backend-gs97.onrender.com/api/v1/doctors/updateMyPassword",
        {
          passwordCurrent: password,
          password: newPassword,
          passwordConfirm: confirm,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPassword("");
      setNewPassword("");
      setConfirm("");
      setError("");
      alert("Password changed successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Error changing password");
    }
  };

  return (
    <DoctorLayout>
      <div className={styles.cards}>
        {/* Left side doctor card */}
        <div className={styles.doctor}>
          <img src={img} alt="doctor" className={styles.pic} />
          <h4 className={styles.cardName}>{doctor.fullName}</h4>
          <p className={styles.cardTitle}>{doctor.title}</p>
          <p>
            <FaPhone className={styles.icons} /> Phone: {doctor.phone || "-"} <br />
            <FaEnvelope className={styles.icons} /> Email: {doctor.email} <br />
            <FaMapMarkerAlt className={styles.icons} /> Location:{" "}
            {doctor.location?.coordinates?.join(", ") || "-"}
          </p>
          <button onClick={() => setShowModal(true)} className={styles.edit}>
            Edit
          </button>
        </div>

        {/* Right side content */}
        <div className={styles.contentCard}>
          <div className={styles.contentButtons}>
            <button
              className={`${styles.btn} ${tab === "Profile" ? styles.active : ""}`}
              onClick={() => setTab("Profile")}
            >
              My profile
            </button>
            <button
              className={`${styles.btn} ${tab === "password" ? styles.active : ""}`}
              onClick={() => setTab("password")}
            >
              Change password
            </button>
            <button
              className={`${styles.btn} ${tab === "privacy" ? styles.active : ""}`}
              onClick={() => setTab("privacy")}
            >
              Privacy & Security
            </button>
          </div>

          <div className={styles.content}>
            {/* Profile Tab */}
            {tab === "Profile" && (
              <div className={styles.profileContent}>
                <h5>About Me</h5>
                <p>{profileInfo.about}</p>
                <h5>Specialities</h5>
                <ul>
                  {profileInfo.specialties.split(",").map((item, i) => (
                    <li key={i}>{item.trim()}</li>
                  ))}
                </ul>
                <h5>Designation</h5>
                <ul>
                  <li>{profileInfo.designation}</li>
                </ul>
                <h5>Experience</h5>
                <p>{profileInfo.experienceDate} - {profileInfo.experience}</p>
                <ul>
                  {profileInfo.experienceDetails.split(",").map((item, i) => (
                    <li key={i}>{item.trim()}</li>
                  ))}
                </ul>
                <h5>Education</h5>
                <ul>
                  {profileInfo.education.split(",").map((item, i) => (
                    <li key={i}>{item.trim()}</li>
                  ))}
                </ul>
                <button
                  onClick={() => setShowProfileModal(true)}
                  className={styles.editProfile}
                >
                  Edit Profile
                </button>
              </div>
            )}

            {/* Edit Profile Modal */}
            {showProfileModal && (
              <div className={styles.profileOverlay}>
                <div className={styles.modalProfile}>
                  <h3>Edit Profile Information</h3>
                  <div className={styles.modalGrid}>
                    <div className={styles.modalField}>
                      <label>About Me</label>
                      <textarea name="about" value={profileInfo.about} onChange={handleProfileChange} />
                    </div>
                    <div className={styles.modalField}>
                      <label>Specialities</label>
                      <input name="specialties" value={profileInfo.specialties} onChange={handleProfileChange} />
                    </div>
                    <div className={styles.modalField}>
                      <label>Designation</label>
                      <input name="designation" value={profileInfo.designation} onChange={handleProfileChange} />
                    </div>
                    <div className={styles.modalField}>
                      <label>Experience</label>
                      <textarea name="experienceDate" value={profileInfo.experienceDate} onChange={handleProfileChange} />
                      <textarea name="experience" value={profileInfo.experience} onChange={handleProfileChange} />
                      <textarea name="experienceDetails" value={profileInfo.experienceDetails} onChange={handleProfileChange} />
                    </div>
                    <div className={styles.modalField}>
                      <label>Education</label>
                      <textarea name="education" value={profileInfo.education} onChange={handleProfileChange} />
                    </div>
                  </div>
                  <div className={styles.modalButtons}>
                    <button onClick={handleProfileSave}>Save</button>
                    <button onClick={() => setShowProfileModal(false)}>Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {/* Password Tab */}
            {tab === "password" && (
              <div className={styles.pass}>
                <h4>Change password</h4>
                <form onSubmit={handleSubmit}>
                  <label>Current password</label>
                  <br />
                  <input
                    type="password"
                    value={password}
                    placeholder="current password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <br />
                  <label>New password</label>
                  <br />
                  <input
                    type="password"
                    value={newPassword}
                    placeholder="new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <br />
                  <label>Confirm password</label>
                  <br />
                  <input
                    type="password"
                    value={confirm}
                    placeholder="confirm password"
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                  <p style={{ color: "red" }}>{error}</p>
                  <button type="submit">Save</button>
                </form>
              </div>
            )}

            {/* Privacy Tab */}
              {tab === "privacy" && (
              <div className={styles.privacy}>
                <h3>Privacy policy</h3>
                <p>
                  Welcome to iClinic, your trusted platform for digital
                  healthcare services. This Privacy Policy explains how we
                  collect, use, and protect your personal and medical
                  information when you use our website
                </p>
                <h5>1. Information We Collect</h5>
                <p>We may collect the following types of information:</p>
                <ul>
                  <li>
                    <b>Professional Details:</b> Full name, medical license
                    number, specialization, qualifications, and years of
                    experience.
                  </li>
                  <li>
                    <b>Contact Information:</b> Email address, phone number,
                    clinic address, and working hours.
                  </li>
                  <li>
                    <b>Account Information:</b> Login credentials, security
                    questions, and settings preferences.
                  </li>
                  <li>
                    <b>Consultation Data:</b> Notes, prescriptions, and messages
                    exchanged with patients through the app.
                  </li>
                  <li>
                    <b>Usage Data:</b>Activity logs, appointment history, and
                    device or browser details used to access iClinic.
                  </li>
                </ul>
                <h5>2. How We Use Your Information</h5>
                <p>We use your data to:</p>
                <ul>
                  <li>Verify your identity and medical credentials.</li>
                  <li>
                    Build and display your professional profile for patients
                  </li>
                  <li>Schedule and manage consultations and follow-ups.</li>
                  <li>Enable secure communication with patients.</li>
                  <li>Process payments and manage financial records.</li>
                  <li>Improve platform performance and service quality.</li>
                  <li>
                    Send important notifications about account activity or
                    policy changes.
                  </li>
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
                    <b>With Patients:</b> Basic professional details (e.g.,
                    name, specialty, clinic info) are visible to users for
                    appointment booking.
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
                    sharing of additional data (e.g., collaborations, external
                    integrations).
                  </li>
                </ul>
                <h5>4. Updates to This Policy</h5>
                <p>
                  We may update this Privacy Policy to reflect new features,
                  security improvements, or legal changes. All updates will be
                  posted on the platform with the revised “Effective Date.”
                  Doctors will be notified of major updates via email or
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
    </DoctorLayout>
  );
};

export default PatientSetting;
