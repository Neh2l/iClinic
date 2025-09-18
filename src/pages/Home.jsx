import React from 'react'
import Card from '../components/ui/Card'
import { BiSolidSkipNextCircle } from 'react-icons/bi';
import { BiSolidSkipPreviousCircle } from 'react-icons/bi';

const Carousel = () => {
  return (
    <div className='d-block  justify-content-center align-items-center' >
    
    <div 
      id="carouselExample" 
      className="carousel slide d-flex justify-content-center align-items-center"
      data-bs-ride="carousel"
      style={{ height: "100vh" }}
    >
      
      <div className="carousel-inner" style={{ width: "80%" }}>
        
        
        <div className="carousel-item active">
          <div className="d-flex justify-content-center gap-3">
            <Card />
            <Card />
             <Card />
            <Card />
          </div>
        </div>

      
        <div className="carousel-item">
          <div className="d-flex justify-content-center gap-3">
            <Card />
            <Card />
            <Card />
             <Card />
          </div>
        </div>

        
        <div className="carousel-item">
          <div className="d-flex justify-content-center gap-3">
            <Card />
            <Card />
            <Card />
             <Card />
          </div>
        </div>

      </div>

     
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="">
          <BiSolidSkipPreviousCircle style={{color:"black",fontSize:"3rem"}}/>
        </span>
      </button>

      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="">
          <BiSolidSkipNextCircle style={{color:"black",fontSize:"3rem"}}/>
        </span>
      </button>
    </div>
    </div>
  )
}

const Home = () => {
  return (
    <>
      <Carousel />
    </>
  )
}

export default Home
