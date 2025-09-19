import React from 'react'
import { FaStar } from 'react-icons/fa6'
import Person from '../../images/Shape.png'

const Card = () => {
  return (
    <div className="card d-flex flex-column g-3 align-content-center justify-items-center text-start" style={{ width: "18rem",height: "20rem" }}>
      <div className="card-body">
        
        <div className="d-flex mb-2">
          <FaStar className="text-warning" />
          <FaStar className="text-warning" />
          <FaStar className="text-warning" />
          <FaStar className="text-warning" />
        </div>

        <h5 className="card-title">Excellent Service</h5>
        
        <p className="card-text">
          Booking an appointment was super easy and the doctor was very professional. Highly recommended!
        </p>

        <div className="d-flex align-items-center gap-3">
          <img
            src={Person}
            alt="Person"
            className="rounded-circle"
            style={{ width: "3rem", height: "3rem", objectFit: "cover" }}
          />
          
          <div>
            <h6 className="mb-0">Sarah M</h6>
            <p className="mb-0 text-muted" style={{ fontSize: "0.9rem" }}>July 15, 2025</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Card
