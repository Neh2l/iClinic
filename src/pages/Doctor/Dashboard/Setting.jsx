import React from "react";
import DoctorLayout from "../DoctorLayout";
import styles from "../../../styles/setting.module.css";
import dr from "../../../images/dr.png";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { useState } from "react";

const Setting = () => {
  const [tab, setTab] = useState("Profile");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirm) return setError("Passwords do not match!");
    if (newPassword.length < 6) return setError("Password is weak!");
    setError("");
    alert("Password changed successfully!!");
    setPassword("");
    setNewPassword("");
    setConfirm("");
  };

  const [doctor, setDoctor] = useState({
    name: "Dr. Jessica Venkata",
    title: "Experienced surgeon",
    phone: "+(555) 765-1098",
    email: "jessica212@gmail.com",
    location: "23 Maple Street, Springfield USA",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleSave = () => {
    setShowModal(false);
    alert("Profile updated!");
  };

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    about:
      "Cardiologist with 12 years of experience in preventive cardiology and interventional procedures. Passionate about patient-centered care and digital health solutions.",
    specialties:
      "Preventive Cardiology, Interventional Cardiology, Cardiac Imaging, Heart Failure Management",
    designation: "Senior Consultant Cardiologist",
    experienceDate: "2013-2018",
    experience: "New York Heart Institute,",
    experienceDetails:
      "Senior consultant institute, Performed more than 1500 successful angioplasty and stent procedures, Specialized in preventive cardiology and advanced cardiac imaging,  Leading a research team on digital health solutions for heart patients ",
    education:
      "MD - Harvard Medical School (2008-2012), Fellowship in Cardiology - Johns Hopkins (2012-2013)",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  const handleProfileSave = () => {
    setShowProfileModal(false);
    alert("Profile info updated successfully!");
  };

  return (
    <DoctorLayout>
      <div className={styles.cards}>
        {/*left side dr card*/}

        <div className={styles.doctor}>
          <img src={dr} alt="doctor" className={styles.pic} />
          <h4 className={styles.cardName}> {doctor.name} </h4>
          <p className={styles.cardTitle}> {doctor.title} </p>
          <p>
            <FaPhone
              style={{
                marginRight: "8px",
                color: "white",
                stroke: "black",
                strokeWidth: "40px",
              }}
            />
            Phone number <br />
            {doctor.phone}
            <br />
            <FaEnvelope
              style={{
                marginRight: "8px",
                color: "white",
                stroke: "black",
                strokeWidth: "40px",
              }}
            />
            Email Address <br /> {doctor.email}
            <br />{" "}
            <FaMapMarkerAlt
              style={{
                marginRight: "8px",
                color: "white",
                stroke: "black",
                strokeWidth: "40px",
              }}
            />
            Location <br /> {doctor.location}
          </p>
          <button onClick={() => setShowModal(true)} className={styles.edit}>
            Edit{" "}
          </button>
        </div>

        {/*edit dr card modal*/}

        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h3>Edit Profile</h3>
              <label>Name</label>
              <input name="name" value={doctor.name} onChange={handleChange} />
              <label>Title</label>
              <input
                name="title"
                value={doctor.title}
                onChange={handleChange}
              />
              <label>Phone</label>
              <input
                name="phone"
                value={doctor.phone}
                onChange={handleChange}
              />
              <label>Email</label>
              <input
                name="email"
                value={doctor.email}
                onChange={handleChange}
              />
              <label>Location</label>
              <input
                name="location"
                value={doctor.location}
                onChange={handleChange}
              />
              <div className={styles.modalButtons}>
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/*right side info card*/}

        <div className={styles.contentCard}>
          <div className={styles.contentButtons}>
            <button
              className={`${styles.btn} ${
                tab === "Profile" ? styles.active : ""
              }`}
              onClick={() => setTab("Profile")}
            >
              {" "}
              My profile
            </button>
            <button
              className={`${styles.btn} ${
                tab === "password" ? styles.active : ""
              }`}
              onClick={() => setTab("password")}
            >
              Change password{" "}
            </button>
            <button
              className={`${styles.btn} ${
                tab === "privacy" ? styles.active : ""
              }`}
              onClick={() => setTab("privacy")}
            >
              {" "}
              Privacy & Security{" "}
            </button>
          </div>
          <div className={styles.content}>
            {/*profile tab*/}

            {tab === "Profile" && (
              <div className={styles.profileContent}>
                <h5> About me </h5>
                <p>{profileInfo.about}</p>

                <h5> Specialities</h5>
                <ul>
                  {profileInfo.specialties.split(",").map((item, i) => (
                    <li key={i}>{item.trim()}</li>
                  ))}
                </ul>

                <h5> Designation </h5>
                <ul>
                  <li>{profileInfo.designation}</li>
                </ul>

                <h5> Professional Experience</h5>
                <ul>
                  <li>{profileInfo.experienceDate}</li>
                </ul>
                <p className={styles.ex}>{profileInfo.experience}</p>
                <ul className={styles.exp}>
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

            {/*edit profile info modal*/}

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
                      <label>Specialities</label>
                      <input
                        name="specialties"
                        value={profileInfo.specialties}
                        onChange={handleProfileChange}
                      />
                    </div>

                    <div className={styles.modalField}>
                      <label>Designation</label>
                      <input
                        name="designation"
                        value={profileInfo.designation}
                        onChange={handleProfileChange}
                      />
                    </div>

                    <div className={styles.modalField}>
                      <label>Professional Experience</label>
                      <textarea
                        name="experienceDate"
                        value={profileInfo.experienceDate}
                        onChange={handleProfileChange}
                      />
                      <textarea
                        name="experience"
                        value={profileInfo.experience}
                        onChange={handleProfileChange}
                      />
                      <textarea
                        name="experienceDetails"
                        value={profileInfo.experienceDetails}
                        onChange={handleProfileChange}
                      />
                    </div>

                    <div className={styles.modalField}>
                      <label>Education</label>
                      <textarea
                        name="education"
                        value={profileInfo.education}
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

            {/*password tab*/}

            {tab === "password" && (
              <div className={styles.pass}>
                <h4> Change password </h4>
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
                  <label> New password</label>
                  <br />
                  <input
                    type="password"
                    value={newPassword}
                    placeholder="new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />{" "}
                  <br />
                  <label> Confirm password</label>
                  <br />
                  <input
                    type="password"
                    value={confirm}
                    placeholder="confirm password"
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                  <p style={{ color: "red" }}> {error}</p>
                  <button type="submit"> Save</button>
                </form>
              </div>
            )}

            {/*privacy tab*/}

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

export default Setting;
