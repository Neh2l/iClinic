import styles from "../../../styles/list.module.css";
import dr from "../../../images/dr.png";
import { useState } from "react";
import dr2 from "../../../images/dr2.png";
import { FaMedal } from "react-icons/fa";

const DoctorsList = () => {
  const [tab, setTab] = useState("All doctors");

  const doctors = [
    {
      name: "Dr. Jessica Venkata",
      speciality: "Neurology",
      rating: "★★★★",
      Image: dr,
      experience: " 12+ years",
    },
    {
      name: "Dr. Nick Willford",
      speciality: "Cardiology",
      rating: "★★★★★",
      Image: dr2,
      experience: "10+ years",
    },
    {
      name: "Dr. Jessica Venkata",
      speciality: "Dermatology",
      rating: "★★★★★",
      Image: dr,
      experience: " 9+ years",
    },
    {
      name: "Dr. Nick Willford",
      speciality: "Pediatrics",
      rating: "★★★★",
      Image: dr2,
      experience: " 15+ years",
    },
    {
      name: "Dr. Nick Willford",
      speciality: "Neurology",
      rating: "★★★★★",
      Image: dr2,
      experience: "7+ years",
    },
    {
      name: "Dr. Jessica Venkata",
      speciality: "Cardiology",
      rating: "★★★★",
      Image: dr,
      experience: "10+ years",
    },
    {
      name: "Dr. Nick Willford",
      speciality: "Dermatology",
      rating: "★★★★",
      Image: dr2,
      experience: "8+ years",
    },
    {
      name: "Dr. Jessica Venkata",
      speciality: "Pediatrics",
      rating: "★★★★★",
      Image: dr,
      experience: "14+ years",
    },
  ];

  const filterDoctors =
    tab === "All doctors"
      ? doctors
      : doctors.filter((doc) => doc.speciality === tab);

  return (
    <div>
      <div className={styles.buttons}>
        <button
          className={`${styles.btn} ${
            tab === "All doctors" ? styles.active : ""
          }`}
          onClick={() => setTab("All doctors")}
        >
          All doctors
        </button>
        <button
          className={`${styles.btn} ${
            tab === "Neurology" ? styles.active : ""
          }`}
          onClick={() => setTab("Neurology")}
        >
          Neurology
        </button>
        <button
          className={`${styles.btn} ${
            tab === "Cardiology" ? styles.active : ""
          }`}
          onClick={() => setTab("Cardiology")}
        >
          Cardiology
        </button>
        <button
          className={`${styles.btn} ${
            tab === "Dermatology" ? styles.active : ""
          }`}
          onClick={() => setTab("Dermatology")}
        >
          Dermatology
        </button>
        <button
          className={`${styles.btn} ${
            tab === "Pediatrics" ? styles.active : ""
          }`}
          onClick={() => setTab("Pediatrics")}
        >
          Pediatrics
        </button>
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
      </select>

      <div className={styles.container}>
        {filterDoctors.map((doctor, index) => (
          <div key={index} className={styles.cards}>
            <div className={styles.cardTop}>
              <span className={styles.exp}>
                <FaMedal className={styles.badgeIcon} /> {doctor.experience}
              </span>

              <img
                src={doctor.Image}
                alt={doctor.name}
                className={styles.pic}
              />
            </div>
            <div className={styles.cardBottom}>
              <h4 className={styles.drName}>{doctor.name}</h4>
              <p className={styles.speciality}>{doctor.speciality}</p>
              <p className={styles.rate}> {doctor.rating} </p>
              <a
                href="/patient/doctorProfile"
                style={{ textDecoration: "none" }}
              >
                <button className={styles.btn2}>View details</button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
