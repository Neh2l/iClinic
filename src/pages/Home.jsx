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

const Testimonies = () => {
  const reviews = [
  {
    title: "Great medical platform!",
    text: "I’ve been using this medical website for a few months now and I can honestly say it has made my life so much easier. The booking system is straightforward, I can easily choose the doctor I want, and the reminders they send help me stay on track with my appointments. What I love the most is the articles section, where I find reliable information about different conditions and treatments. It really feels like the website cares about both patients and doctors, making communication smooth and professional.",
    name: "Sarah M",
    place: "London, UK",
  },
  {
    title: "Very professional and helpful",
    text: "The doctors listed on this website are very professional and easy to reach. I had an issue that required urgent attention and through the site I managed to book an appointment the same day. The interface is clean and I never felt lost while using it. The reviews and ratings also gave me confidence when choosing the right doctor. I also appreciate that the website offers both online consultations and physical visits, so I can choose what works best for me. It really gives me peace of mind knowing I can always find support here find support here.",
    name: "Ahmed K",
    place: "Cairo, Egypt",
  },
  {
    title: "Excellent patient experience",
    text: "From the very first time I logged in, I noticed how simple yet effective the website is. The design is user-friendly, with all the important features placed clearly. I was able to upload my medical history, share it with my doctor, and even access prescriptions online without any difficulty. Another thing I really value is the follow-up system — the website actually reminds me to check in with my doctor and keeps track of my health progress. I honestly think this is one of the best medical platforms available right now, and I’ve already recommended it to my friends and family.",
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
    <div data-aos='fade-up' id='carouselExample' className="container ">
       <div className="services-titles text-start mb-4">
                <h1 className="title-one w-50 "> <span className="our-word text"> Check some of our </span> <span className="services-word primary-text"> Reviews </span> down here ...</h1>
                
            </div>
      
      <div className="d-flex justify-content-center align-items-center">
        <button
          onClick={prevReview}
          className="btn btn-light shadow rounded-circle me-3 d-flex justify-content-center align-items-center"
          style={{ width: "50px", height: "50px" }}
        >
          <BiChevronLeft size={28} />
        </button>

        <div
          className="card border-0 shadow-sm p-4 text-center shadow-lg"
          style={{
            width: "100%",
            maxWidth: "900px",
            minHeight: "450px",
            backgroundColor:"#f1ededb7 "
          }}
        >
          <h4 className="secondary-text mb-3">
            <i className="bi bi-quote"></i> {reviews[current].title}
          </h4>
          <p className="text-muted" style={{ lineHeight: "1.6" }}>
            {reviews[current].text}
          </p>

          <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
            <img
              src={Person}
              alt="Person"
              className="rounded-circle"
              style={{ width: "3rem", height: "3rem", objectFit: "cover" }}
            />
            <div>
              <h6 className="mb-0 fw-bold">{reviews[current].name}</h6>
              <p className="mb-0 text-muted" style={{ fontSize: "0.9rem" }}>
                {reviews[current].place}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={nextReview}
          className="btn btn-light shadow rounded-circle ms-3 d-flex justify-content-center align-items-center"
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
                </div> 

                <div className="carousel-inner">
                  <div className="carousel-item active d-flex justify-content-center align-items-center" data-bs-interval="3000">
                    <div className="card rounded-4 text-start p-4 card-field w-50">
                      <div className="card-icon primary-text  d-flex justify-content-center align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-droplet" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"/>
                          <path fill-rule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z"/>
                        </svg>
                      </div>
                        <div className="card-body text">
                          <div className="card-title">
                            <h4>
                               Diabetes
                            </h4>
                          </div>
                            <div className="card-text">
                               <p>
                                  Our doctors are specialized in Diabetes with wide
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
                       <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M3 12L6 8L9 16L12 4L15 12L18 8L21 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                       </svg>
                      </div>
                        <div className="card-body text">
                          <div className="card-title">
                            <h4>
                               Blood Pressure
                            </h4>
                          </div>
                            <div className="card-text">
                               <p>
                                  Our doctors are specialized in Blood Pressure with wide
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
        <div aos id="home">
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
    return (
        <header>
            <nav className={styles.nav}>
                <div className={styles.logo}>IClinic</div>
                <div className={styles.navLinks}>
                       <a href="#home">Home</a>
                    <a href="#features">Features</a>
                    <a href="#how-it-works">How it works</a>
                    <a href="#carouselExample">Testimonies</a>
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
   
       
</>
  );
} 

export default Home;