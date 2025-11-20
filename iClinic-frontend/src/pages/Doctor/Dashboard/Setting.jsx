import React, { useState, useEffect } from "react";
import DoctorLayout from "../DoctorLayout";
import styles from "../../../styles/setting.module.css";
import dr from "../../../images/dr.png";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import axios from "axios";

const Setting = () => {
  const [tab, setTab] = useState("Profile");

  // Password states
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  // Doctor info
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

  // Local profile info
  const [profileInfo, setProfileInfo] = useState({
    about: "",
    specialties: "",
    designation: "",
    experienceDate: "",
    experience: "",
    experienceDetails: "",
    education: "",
  });

  // Modals
  const [showEditModal, setShowEditModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // FETCH DOCTOR DATA FROM BACKEND
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

    const savedProfile = localStorage.getItem("profileInfo");
    if (savedProfile) setProfileInfo(JSON.parse(savedProfile));
  }, []);

  // Update doctor inputs
  const handleDoctorChange = (e) => {
    const { name, value } = e.target;

    // For location
    if (name === "location") {
      return setDoctor({
        ...doctor,
        location: { coordinates: value.split(",").map(Number) },
      });
    }

    setDoctor({ ...doctor, [name]: value });
  };

  // Save doctor info (local for now)
  const handleSaveDoctor = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return alert("No token found");

    const res = await axios.patch(
      "https://iclinc-backend-gs97.onrender.com/api/v1/doctors/updateMe",
      {
        fullName: doctor.fullName,
        title: doctor.title,
        phone: doctor.phone,
        email: doctor.email,
        location: doctor.location,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setDoctor(res.data.data.doctor); 
    setShowEditModal(false);
    alert("Profile updated successfully!");
  } catch (err) {
    console.log("Error updating doctor:", err.response?.data || err);
    alert("Failed to update profile!");
  }
};


  // Update profile inputs
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  // Save profile info locally
  const handleProfileSave = () => {
    localStorage.setItem("profileInfo", JSON.stringify(profileInfo));
    setShowProfileModal(false);
    alert("Profile info updated!");
  };

  // Change password backend
  const handlePasswordSubmit = async (e) => {
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

        {/* LEFT CARD */}
        <div className={styles.doctor}>
          <img src={dr} alt="doctor" className={styles.pic} />

          <h4 className={styles.cardName}>{doctor.fullName}</h4>
          <p className={styles.cardTitle}>{doctor.title}</p>

          <p>
            <FaPhone className={styles.icons} /> {doctor.phone || "-"} <br />
            <FaEnvelope className={styles.icons} /> {doctor.email} <br />
            <FaMapMarkerAlt className={styles.icons} />{" "}
            {doctor.location?.coordinates?.join(", ") || "-"}
          </p>

          <button
            onClick={() => setShowEditModal(true)}
            className={styles.edit}
          >
            Edit
          </button>
        </div>

        {/* EDIT MODAL */}
        {showEditModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h3>Edit Profile</h3>

              <label>Name</label>
              <input
                name="fullName"
                value={doctor.fullName}
                onChange={handleDoctorChange}
              />

              <label>Title</label>
              <input
                name="title"
                value={doctor.title}
                onChange={handleDoctorChange}
              />

              <label>Phone</label>
              <input
                name="phone"
                value={doctor.phone}
                onChange={handleDoctorChange}
              />

              <label>Email</label>
              <input
                name="email"
                value={doctor.email}
                onChange={handleDoctorChange}
              />

              <label>Location (lng,lat)</label>
              <input
                name="location"
                value={doctor.location.coordinates.join(",")}
                onChange={handleDoctorChange}
              />

              <div className={styles.modalButtons}>
                <button onClick={handleSaveDoctor}>Save</button>
                <button onClick={() => setShowEditModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* RIGHT MAIN CONTENT */}
        <div className={styles.contentCard}>
          <div className={styles.contentButtons}>
            <button
              className={`${styles.btn} ${
                tab === "Profile" ? styles.active : ""
              }`}
              onClick={() => setTab("Profile")}
            >
              My profile
            </button>

            <button
              className={`${styles.btn} ${
                tab === "password" ? styles.active : ""
              }`}
              onClick={() => setTab("password")}
            >
              Change password
            </button>

            <button
              className={`${styles.btn} ${
                tab === "privacy" ? styles.active : ""
              }`}
              onClick={() => setTab("privacy")}
            >
              Privacy & Security
            </button>
          </div>

          {/* PROFILE TAB */}
          <div className={styles.content}>
            {tab === "Profile" && (
              <div className={styles.profileContent}>
                <h5>About Me</h5>
                <p>{profileInfo.about}</p>

                <h5>Specialities</h5>
                <ul>
                  {profileInfo.specialties
                    .split(",")
                    .map((item, i) => <li key={i}>{item.trim()}</li>)}
                </ul>

                <h5>Designation</h5>
                <ul>
                  <li>{profileInfo.designation}</li>
                </ul>

                <h5>Experience</h5>
                <p>{profileInfo.experienceDate} - {profileInfo.experience}</p>
                <ul>
                  {profileInfo.experienceDetails
                    .split(",")
                    .map((item, i) => <li key={i}>{item.trim()}</li>)}
                </ul>

                <h5>Education</h5>
                <ul>
                  {profileInfo.education
                    .split(",")
                    .map((item, i) => <li key={i}>{item.trim()}</li>)}
                </ul>

                <button
                  onClick={() => setShowProfileModal(true)}
                  className={styles.editProfile}
                >
                  Edit Profile
                </button>
              </div>
            )}

            {/* PROFILE EDIT MODAL */}
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
                      <label>Experience</label>
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

            {/* PASSWORD TAB */}
            {tab === "password" && (
              <div className={styles.pass}>
                <h4>Change password</h4>
                <br />
                <form onSubmit={handlePasswordSubmit}>
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

            {/* PRIVACY TAB */}
            {tab === "privacy" && (
              <div className={styles.privacy}>
                <h3>Privacy policy</h3>

                <p>
                  Welcome to iClinic, your trusted platform for digital
                  healthcare services...
                </p>

                <h5>1. Information We Collect</h5>
                <ul>
                  <li><b>Professional Details:</b> Name, license ID, specialization...</li>
                  <li><b>Contact Information:</b> Phone, email, clinic address...</li>
                  <li><b>Account Information:</b> Login credentials...</li>
                  <li><b>Consultation Data:</b> Notes, prescriptions...</li>
                </ul>

                <h5>2. How We Use Your Information</h5>
                <ul>
                  <li>Verify your identity</li>
                  <li>Build your professional profile</li>
                  <li>Manage appointments</li>
                  <li>Improve platform performance</li>
                </ul>

                <h5>3. Sharing of Information</h5>
                <ul>
                  <li>With patients</li>
                  <li>With service providers</li>
                  <li>Legal compliance</li>
                </ul>

                <h5>4. Updates</h5>
                <p>
                  We may update this policy based on legal or system upgrades.
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
