import React from 'react';
import Card from '../components/ui/Card';
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
          <span><BiSolidSkipPreviousCircle style={{ color: "black", fontSize: "3rem" }} /></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span><BiSolidSkipNextCircle style={{ color: "black", fontSize: "3rem" }} /></span>
        </button>

      </div>
    </div>
  );
};

const Home = () =>{
  return(

    <Carousel />
  );
} 

export default Home;