import React, { useEffect } from 'react';
// import Card from '../components/ui/Card';
import '../styles/OurServices.css';
import '../styles/OverView.css';
import Person from "../images/Shape.png"; 
import { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import styles from '../styles/landing.module.css';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';
import { FaBars } from "react-icons/fa";
import DoctorAppoinments from './Doctor/DoctorAppoinments';



const Testimonies = () => {
  const reviews = [
    {
      title: "Great medical platform!",
      text: "I’ve been using this medical website for a few months now and I can honestly say it has made my life so much easier. The booking system is straightforward, I can easily choose the doctor I want, and the reminders they send help me stay on track with my appointments.",
      name: "Sarah M",
      place: "London, UK",
    },
    {
      title: "Very professional and helpful",
      text: "The doctors listed on this website are very professional and easy to reach. I had an issue that required urgent attention and through the site I managed to book an appointment the same day. The interface is clean and I never felt lost while using it.",
      name: "Ahmed K",
      place: "Cairo, Egypt",
    },
    {
      title: "Excellent patient experience",
      text: "From the very first time I logged in, I noticed how simple yet effective the website is. I was able to upload my medical history, share it with my doctor, and access prescriptions online without difficulty.",
      name: "Mona S",
      place: "Dubai, UAE",
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextReview = () => {
    setCurrent((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div data-aos="fade-up" className="container my-5" id="Testimonies">
      <div className="text-start mb-4">
        <h1 className="w-75">
          <span className="text-dark">Check some of our </span>
          <span className="primary-text fw-bold">Reviews</span> down here ...
        </h1>
      </div>

      <div className="d-flex justify-content-center align-items-center flex-wrap">
        <button
          onClick={prevReview}
          className="btn btn-light shadow rounded-circle me-3 d-none d-md-flex justify-content-center align-items-center"
          style={{ width: "50px", height: "50px" }}
        >
          <BiChevronLeft size={28} />
        </button>

        <div className="card border-0 shadow-lg text-center p-4 flex-grow-1 mx-auto"
          style={{
            maxWidth: "900px",
            backgroundColor: "#f1ededb7",
            minHeight: "450px",
          }}
        >
          {reviews[current] && (
            <>
              <h4 className="primary-text mb-3">
                <i className="bi bi-quote"></i> {reviews[current].title}
              </h4>
              <p className="text-muted lh-base">{reviews[current].text}</p>

              <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                <img
                  src={Person}
                  alt="Person"
                  className="rounded-circle"
                  style={{ width: "3rem", height: "3rem", objectFit: "cover" }}
                />
                <div>
                  <h6 className="mb-0 fw-bold">{reviews[current].name}</h6>
                  <p className="mb-0 text-muted small">
                    {reviews[current].place}
                  </p>
                </div>
              </div>
            </>
          )}

          <div className="d-flex justify-content-center mt-4 d-md-none">
            {reviews.map((review, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`btn rounded-circle mx-1 p-0 ${
                  index === current ? "bg-primary" : "bg-secondary"
                }`}
                style={{
                  width: "10px",
                  height: "10px",
                  opacity: index === current ? 1 : 0.4,
                }}
              ></button>
            ))}
          </div>
        </div>

        <button
          onClick={nextReview}
          className="btn btn-light shadow rounded-circle ms-3 d-none d-md-flex justify-content-center align-items-center"
          style={{ width: "50px", height: "50px" }}
        >
          <BiChevronRight size={28} />
        </button>
      </div>

  
    </div>
  );
};


const OurServices = () =>{
    return (
        <>
        <div data-aos='fade-up' id="features" className="container text-center our-services">

            <div className="services-titles">
                <h1 className="title-one"> <span className="our-word text"> Our </span> <span className="services-word primary-text"> Services </span> </h1>
                <h6 className="title-two ">We do care about you !</h6>
            </div>

            <div className="row g-5 cards-container">
                <div className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center">
                    <div className="card rounded-4 text-start p-4 position-relative">
                        <div className="card-icon primary-text icon-card">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            </svg>
                        </div>
                        <div className="card-body">
                           <h4 className="card-title">Chat with Doctors</h4>
                            <p className="card-text card-paragraph">
                              Get medical advice through secure chat. Ask questions,
                              and receive guidance anytime with our trusted doctors that you choose from our website.
                            </p>
                        </div>
                    </div>
                </div>

                 <div className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center">
                    <div className="card rounded-4 text-start p-4 position-relative ">
                        <div className="card-icon primary-text icon-card">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar4" viewBox="0 0 16 16">
                                 <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                            </svg>
                        </div>
                        <div className="card-body">
                           <h4 className="card-title">Easy Appointment Booking</h4>
                            <p className="card-text card-paragraph">
                              Schedule your doctor visits in just a few clicks. 
                              Choose your preferred specialist and time that works best for you.
                            </p>
                        </div>
                    </div>
                  </div>

                 <div className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center">
                    <div className="card rounded-4 text-start p-4 position-relative">
                        <div className="card-icon primary-text icon-card">
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
                               <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                            </svg>
                        </div> 
                        <div className="card-body">
                           <h4 className="card-title">Instant Online Consultations  </h4>
                            <p className="card-text card-paragraph">
                              Connect with certified doctors immediately via video or voice calls,
                              without the need to wait or travel.
                            </p>
                        </div>
                    </div>
                </div>



            </div>
        </div>
        </>

    );
};

const OverView = () =>{
      return(
       <>
       <div data-aos='fade-up'  id="how-it-works"  className="overview-container container">
        <div className="row g-3">

         <div className="overview-info col-lg-4 col-md-5 col-sm-12 ">
          <div className="overview-title">
            <h2 className="text">Find The <span className="right-medical-word primary-text">Right <br></br> Medical Specialty </span> <br></br>for you !</h2>
          </div>
          <div className="overview-paragraph">
            <p>Browse a wide range of medical fields and connect with experienced doctors in each specialty. From cardiology and dermatology to pediatrics and dentistry, 
              And to be sure you’re in safe hands, check some of our patients’ reviews below !
            </p>
          </div>
         </div> 

          <div className="overview-fields col-lg-8 col-md-7 col-sm-12">
              <div className="fields-word rounded-3 text-center w-100 p-1">
               <p>Medical Fields</p>
              </div>
              <div id="slider" class="carousel slide carousel-fade carousel-dark mt-5" data-bs-ride="carousel">
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#slider" data-bs-slide-to="0" class="active"></button>
                  <button type="button" data-bs-target="#slider" data-bs-slide-to="1"></button>
                  <button type="button" data-bs-target="#slider" data-bs-slide-to="2"></button>
                  <button type="button" data-bs-target="#slider" data-bs-slide-to="3"></button>
                </div> {/*the end of div  carousel-indicators*/}

                <div className="carousel-inner">
                  <div className="carousel-item active d-flex justify-content-center align-items-center" data-bs-interval="3000">
                    <div className="card rounded-4 text-start p-4 card-field w-50">
                      <div className="card-icon primary-text  d-flex justify-content-center align-items-center">
                       <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 2v0.8c0 2.7 0.9 5.3 2.6 7.4c-0.5 2.6-1.9 4.9-4.1 6.4c-1.5 0.8-3.2 1.1-5 0.9l-1.2-0.1c-1.4-0.3-2.8 0.1-3.8 1.1C3.5 19.5 3 20.7 3 21.9V29" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  stroke-width="1.824" 
                                  stroke-linecap="round" 
                                  stroke-linejoin="round"/>
                            <path d="M20 2v0.4C20 7 22 9 22 9h0.9c3.4 0 6.1 2.7 6.1 6.1c0 1.9-0.5 3.8-1.4 5.5c-2.2 3.9-6.6 6.4-11.9 5.8c-2.4-0.2-4.7-1.1-6.5-2.6C8.3 23 7 23.6 7 24.7V29" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  stroke-width="1.824" 
                                  stroke-linecap="round" 
                                  stroke-linejoin="round"/>
                        </svg>
                      </div>
                        <div className="card-body text">
                          <div className="card-title">
                            <h4>
                                Internal Medicine
                            </h4>
                          </div>
                            <div className="card-text">
                               <p>
                                  Our doctors are specialized in Internal Medicine with wide
                                  experience and continuous follow-up.
                               </p>
                            </div>
                        </div>
                    </div>
                  </div>

                  <div class="carousel-item d-flex justify-content-center align-items-center">
                    <div className="card rounded-4 text-start p-4 card-field w-50">
                      <div className="card-icon primary-text  d-flex justify-content-center align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-pulse" viewBox="0 0 16 16">
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053.918 3.995.78 5.323 1.508 7H.43c-2.128-5.697 4.165-8.83 7.394-5.857q.09.083.176.171a3 3 0 0 1 .176-.17c3.23-2.974 9.522.159 7.394 5.856h-1.078c.728-1.677.59-3.005.108-3.947C13.486.878 10.4.28 8.717 2.01zM2.212 10h1.315C4.593 11.183 6.05 12.458 8 13.795c1.949-1.337 3.407-2.612 4.473-3.795h1.315c-1.265 1.566-3.14 3.25-5.788 5-2.648-1.75-4.523-3.434-5.788-5"/>
                          <path d="M10.464 3.314a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.5a.5.5 0 0 0 0 1H4a.5.5 0 0 0 .416-.223l1.473-2.209 1.647 4.118a.5.5 0 0 0 .945-.049l1.598-5.593 1.457 3.642A.5.5 0 0 0 12 9h3.5a.5.5 0 0 0 0-1h-3.162z"/>
                        </svg>
                      </div>
                        <div className="card-body text">
                          <div className="card-title">
                            <h4>
                                Cardiology
                            </h4>
                          </div>
                            <div className="card-text">
                               <p>
                                  Our doctors are specialized in Cardiology with wide
                                  experience and continuous follow-up.
                               </p>
                            </div>
                        </div> 
                    </div>
                  </div>

                  <div class="carousel-item d-flex justify-content-center align-items-center">
                    <div className="card rounded-4 text-start p-4 card-field w-50">
                      <div className="card-icon primary-text  d-flex justify-content-center align-items-center">
                        <svg width="200" height="200" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                          <path d="M496.337,308.978c-7.013-9.271-20.214-11.1-29.484-4.088l-30.076,22.793 c-21.608-48.706-5.19-106.308-5.19-106.308c-43.763,26.641-54.219,73.9-56.469,88.503c-32.274-27.008-73.794-43.366-119.118-43.382 c-63.902,0.03-120.363,32.431-153.814,81.594L45.14,304.89c-9.262-7.012-22.471-5.182-29.483,4.088 c-7.005,9.248-5.19,22.448,4.065,29.476h0.014l223.566,169.294c7.5,5.67,17.902,5.67,25.41,0l223.558-169.294 C501.527,331.426,503.356,318.226,496.337,308.978z M256.016,293.618c27.106,0,49.096,7.274,49.096,16.26 c0,8.977-21.99,16.253-49.096,16.253c-27.113,0-49.104-7.276-49.104-16.253C206.912,300.892,228.903,293.618,256.016,293.618z M256.001,464.576l-120.266-91.067c8.618-13.066,19.283-24.63,31.568-34.276c9.413,18.63,45.511,32.513,88.712,32.513 c43.186,0,79.276-13.883,88.705-32.49c12.262,9.622,22.928,21.187,31.538,34.253L256.001,464.576z" 
                                fill="currentColor"/>
                          <path d="M256.008,185.87c37.194,0,67.344-30.143,67.344-67.344C323.352,81.332,256.383,0,256.008,0 c-0.368,0-67.344,81.332-67.344,118.525C188.664,155.726,218.815,185.87,256.008,185.87z" 
                                fill="currentColor"/>
                        </svg>
                      </div>
                        <div className="card-body text">
                          <div className="card-title">
                            <h4>
                              Eye Department
                            </h4>
                          </div>
                            <div className="card-text">
                               <p>
                                  Our doctors are specialized in Eye Department with wide
                                  experience and continuous follow-up.
                               </p>
                            </div>
                        </div>
                    </div>
                  </div>

                   <div class="carousel-item d-flex justify-content-center align-items-center">
                    <div className="card rounded-4 text-start p-4 card-field w-50">
                      <div className="card-icon primary-text  d-flex justify-content-center align-items-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.19807 4.45825C8.55418 4.22291 7.94427 4 7 4C5 4 4 6 4 8.5C4 10.0985 4.40885 11.0838 4.83441 12.1093C5.0744 12.6877 5.31971 13.2788 5.5 14C5.649 14.596 5.7092 15.4584 5.77321 16.3755C5.92401 18.536 6.096 21 7.5 21C8.39898 21 8.79286 19.5857 9.22652 18.0286C9.75765 16.1214 10.3485 14 12 14C13.6515 14 14.2423 16.1214 14.7735 18.0286C15.2071 19.5857 15.601 21 16.5 21C17.904 21 18.076 18.536 18.2268 16.3755C18.2908 15.4584 18.351 14.596 18.5 14C18.6803 13.2788 18.9256 12.6877 19.1656 12.1093C19.5912 11.0838 20 10.0985 20 8.5C20 6 19 4 17 4C16.0557 4 15.4458 4.22291 14.8019 4.45825C14.082 4.72136 13.3197 5 12 5C10.6803 5 9.91796 4.72136 9.19807 4.45825Z" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="1.5" 
                                stroke-linecap="round" 
                                stroke-linejoin="round"/>
                        </svg>
                      </div>
                        <div className="card-body text">
                          <div className="card-title">
                            <h4>
                                Dental Department
                            </h4>
                          </div>
                            <div className="card-text">
                               <p>
                                  Our doctors are specialized in Dental Department with wide
                                  experience and continuous follow-up.
                               </p>
                            </div>
                        </div> 
                    </div>
                  </div>


                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#slider" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next " type="button" data-bs-target="#slider" data-bs-slide="next">
                  <span className="carousel-control-next-icon "></span>
                  <span className="visually-hidden">Next</span>
                </button>

              </div> 

          </div>
         

        </div> 
      </div> 
       </>
      );
}
const Hero = () =>{
    return (
        <div data-aos="fade-up" id="home">
            <main>
                <section className={styles.hero}>
                    <div className={styles.heroText}>
                        <h1>
                            Your Health,<br />
                            <span className={styles.primary}>Anytime.<br /></span>
                            <span className={styles.secondary}>Anywhere!</span>
                        </h1>
                        <p>
                            Connect instantly with trusted doctors online.<br />
                            Book appointments, chats for consultations,<br />
                            and get medical advice across all specialties <br />
                            - all from the comfort of your home
                        </p>

                        <a href="#" className={styles.exploreContainer}>
                            <button className={styles.exploreBtn}>Explore now</button>
                            <img src="/Arrow right-circle.png" alt="arrow" />
                        </a>
                    </div>

                    <div className={styles.heroImg}>
                        <img src="/image 1.png" alt="Verification" />
                    </div>
                </section>

                <section className={styles.stats}>
                    <div className={styles.stat}><h1>200+</h1><p>Doctors</p></div>
                    <div className={styles.stat}><h1>3.2M+</h1><p>Site users</p></div>
                    <div className={styles.stat}><h1>3.0M+</h1><p>Rating</p></div>
                    <div className={styles.stat}><h1>6.5M+</h1><p>Appointment</p></div>
                </section>
            </main>
        </div>
    );
}
const Nav = () =>{
  const navigate=useNavigate();
  const [isOpen, setIsOpen] = useState(false);
    return (
        <header>
            <nav className={styles.nav}>
                <div className={styles.logo}>IClinic</div>
                <div className={styles.SideIcon} onClick={() => setIsOpen(!isOpen)}>
                    <FaBars />
                </div>
                <div className={`${styles.navLinks} ${isOpen ? styles.show : ""}`}>
                    <a href="#home">Home</a>
                    <a href="#features">Features</a>
                    <a href="#how-it-works">How it works</a>
                    <a href="#Testimonies">Testimonies</a>
                    <div className={styles.navMobilButtons}>
                         <button onClick={()=>{navigate('/login')}} className={styles.login}>Login</button>
                         <button onClick={()=>{navigate('/register')}} className={styles.signup}>Sign up</button>
                    </div>
                </div>
                <div className={styles.navButtons}>
                    <button onClick={()=>{navigate('/login')}} className={styles.login}>Login</button>
                    <button onClick={()=>{navigate('/register')}} className={styles.signup}>Sign up</button>
                </div>
            </nav>
        </header>
    );
}

const Home = () =>{
  useEffect(()=>{
      Aos.refresh();
  },[])
  return(
<>
    <Nav/>
    <Hero/>
    <OurServices /> 
    <OverView />
    <Testimonies/>
    {/* <DoctorAppoinments/> */}
   
       
</>
  );
} 

export default Home;