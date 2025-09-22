import React from 'react';
import Card from '../components/ui/Card';
import '../styles/OurServices.css';
import '../styles/OverView.css';
import { BiSolidSkipNextCircle, BiSolidSkipPreviousCircle } from 'react-icons/bi';

const Carousel = () => {
  return (
    <div className="container text-center my-5">
      <h3 className="mb-4 w-75 mx-auto">
        check some of our <span className="primary-text">reviews</span> down here...
      </h3>

      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">

          <div className="carousel-item active">
            <div className="d-flex justify-content-center flex-nowrap gap-3">

              <div className="d-none d-lg-block col-lg-3"><Card /></div>
              <div className="d-none d-lg-block col-lg-3"><Card /></div>
              <div className="d-none d-lg-block col-lg-3"><Card /></div>
              <div className="d-none d-lg-block col-lg-3"><Card /></div>


              <div className="d-none d-md-flex d-lg-none col-md-6"><Card /></div>
              <div className="d-none d-md-flex d-lg-none col-md-6"><Card /></div>


              <div className="d-flex d-md-none justify-content-center col-10 mx-2"><Card /></div>
            </div>
          </div>


          <div className="carousel-item">
            <div className="d-flex justify-content-center flex-nowrap gap-3">
              <div className="d-none d-lg-block col-lg-3"><Card /></div>
              <div className="d-none d-lg-block col-lg-3"><Card /></div>
              <div className="d-none d-lg-block col-lg-3"><Card /></div>
              <div className="d-none d-lg-block col-lg-3"><Card /></div>

              <div className="d-none d-md-flex d-lg-none col-md-6"><Card /></div>
              <div className="d-none d-md-flex d-lg-none col-md-6"><Card /></div>

              <div className="d-flex d-md-none justify-content-center col-10 mx-2"><Card /></div>
            </div>
          </div>

          <div className="carousel-item">
            <div className="d-flex justify-content-center flex-nowrap gap-3">
              <div className="d-none d-lg-block col-lg-3"><Card /></div>
              <div className="d-none d-lg-block col-lg-3"><Card /></div>
              <div className="d-none d-lg-block col-lg-3"><Card /></div>
              <div className="d-none d-lg-block col-lg-3"><Card /></div>

              <div className="d-none d-md-flex d-lg-none col-md-6"><Card /></div>
              <div className="d-none d-md-flex d-lg-none col-md-6"><Card /></div>

              <div className="d-flex d-md-none justify-content-center col-10 mx-2"><Card /></div>
            </div>
          </div>

        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span><BiSolidSkipPreviousCircle className='text' style={{ fontSize: "3rem" }} /></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span><BiSolidSkipNextCircle className='text' style={{ fontSize: "3rem" }} /></span>
        </button>

      </div>
    </div>
  );
};
const OurServices = () =>{
    return (
        <>
        <div className="container text-center our-services">

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
       <div className="overview-container container">
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
         </div> {/*the end of div overview-info*/}

          <div className="overview-fields col-lg-8 col-md-7 col-sm-12">
              <div className="fields-word rounded-3 text-center w-100">
               <p>Medical Fields</p>
              </div>
              <div id="slider" class="carousel slide carousel-fade carousel-dark mt-5" data-bs-ride="carousel">
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#slider" data-bs-slide-to="0" class="active"></button>
                  <button type="button" data-bs-target="#slider" data-bs-slide-to="1"></button>
                  <button type="button" data-bs-target="#slider" data-bs-slide-to="2"></button>
                </div> {/*the end of div  carousel-indicators*/}

                <div class="carousel-inner">
                  <div class="carousel-item active d-flex justify-content-center align-items-center" data-bs-interval="3000">
                    <div className="card rounded-4 text-start p-4 card-field w-50">
                      <div className="card-icon primary-text  d-flex justify-content-center align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-droplet" viewBox="0 0 16 16">
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

                </div> {/*the end of div  carousel-inner*/}
                <button class="carousel-control-prev" type="button" data-bs-target="#slider" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next " type="button" data-bs-target="#slider" data-bs-slide="next">
                  <span class="carousel-control-next-icon "></span>
                  <span class="visually-hidden">Next</span>
                </button>

              </div> {/*the end of div slider*/}

          </div> {/*the end of div overview-fields*/}
         

        </div> {/*the end of div row*/}
      </div> {/*the end of div overview-container*/}
       </>
      );
}

const Home = () =>{
  return(
<>
    <OurServices /> 
    <OverView />
    <Carousel />
       
</>
  );
} 

export default Home;