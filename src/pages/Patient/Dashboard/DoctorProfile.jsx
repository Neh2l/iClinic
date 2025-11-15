import React from "react";
import style from "../../../styles/DoctorProfile.module.css";
import PatientLayout from "../PatientLayout";

function DoctorProfile() {
  return (
    <div>
      <PatientLayout>
        <div className={style.doctorProfile}>
          <a href="...">
            <button className={style.backBtn}>← Back</button>
          </a>

          <div className={style.profileHeader}>
            <div className={style.profileLeft}>
              <img src="/image 1 (1).png" alt="Doctor" className={style.doctorImg} />
              <div>
                <span className={style.stars}>★★★★★</span>

                <p>
                  <b>Dr. Nick Willford </b>
                </p>
                <p>+(949) 678-8706</p>
                <button className={style.btnPrimary}>Message</button>
              </div>
            </div>

            <div className={style.profileInfo}>
              <h2>
                
                <b>Dr. Nick Willford </b>
              </h2>
              <p className={style.subtitle}>
                Licensed Professional Counselor, MEd, LPC, NCC
              </p>

              <div className={style.location}>
                <p>
                  
                  <i className="bi bi-geo-alt"></i> Maadi, Cairo{" "}
                </p>
              </div>

              <div className={style.specialties}>
                <h5>Specialties</h5>
                <div className={style.tags}>
                  <span>Cardiology</span>
                  <span>Neurology</span>
                  <span>Pediatrics</span>
                </div>
              </div>

              <div className={style.qualifications}>
                <h5>Qualifications</h5>
                <p>License: Colorado / 0024790</p>
              </div>

              <div className={style.experience}>
                <h5>Experience</h5>
                <p>10 years / 1000+ consultations</p>
              </div>
            </div>
          </div>
          {/*  about Section */}
          <div className={style.aboutSection}>
            <h4>About</h4>
            <p>
              When you’re feeling overwhelmed or stressed about life, how often do
              you wish you could have some work-life balance? I want all of my
              clients to experience life at its fullest. If work has you drained and
              burned out, it’s likely causing other problems in life. I can help you
              manage this.
            </p>
          </div>

          {/*  plans Section */}
          <div className={style.plansSection}>
            <h4>Consultation Plans</h4>
            <div className={style.plans}>
              <div className={style.planCard}>
                <h5>Basic Plan</h5>
                <p className={style.priceText}>10$ / month</p>
                <button className={style.btnPlan}>Choose Basic</button>
              </div>

              <div className={style.planCard}>
                <h5>Standard Plan</h5>
                <p className={style.priceText}>20$ / month</p>
                <button className={style.btnPlan}>Upgrade to Standard</button>
              </div>

              <div className={style.planCard}>
                <h5>Premium Plan</h5>
                <p className={style.priceText}>30$ / month</p>
                <button className={style.btnPlan}>Go Premium</button>
              </div>
            </div>
          </div>

          {/* reviews Section */}
          <div className={style.reviewsSection}>
            <h4 className={style.reviewsTitle}>Patient Testimonials</h4>
            <div className={style.reviewsContainer}>
              <div className={style.reviewCard}>
                <div className={style.stars}>★★★★★</div>
                <h5>Quick & Helpful</h5>
                <p>
                  I got medical advice within minutes. The online chat made me feel
                  safe and supported.
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
                  clearly. I’ll definitely use it again!
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
    </div>
  );
}

export default DoctorProfile;
