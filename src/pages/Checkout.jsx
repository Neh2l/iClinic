import React from "react";
import { useLocation } from "react-router-dom";

function Checkout() {
  const { state } = useLocation();
  const plan = state || {
    name: "Monthly Plan",
    price: 500,
    serviceFees: 50,
    total: 550,
  };

  return (
    <div className="container py-5">

      <h3 className="primary-text fw-bold mb-4">Subscription</h3>

      <div className="row g-4">

        <div className="col-lg-8 shadow">
          <div className=" rounded p-4">

            <h5 className="fw-bold mb-3">Select payment method</h5>

            <div className="form-check mb-2">
              <input className="form-check-input" type="radio" name="payment" defaultChecked />
              <label className="form-check-label">visa card</label>
            </div>

            <div className="form-check mb-2">
              <input className="form-check-input" type="radio" name="payment" />
              <label className="form-check-label">vodafone cash</label>
            </div>

            <div className="form-check mb-4">
              <input className="form-check-input" type="radio" name="payment" />
              <label className="form-check-label">fawry</label>
            </div>

            <h6 className="fw-bold mb-3">Card details</h6>

            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Card number" />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <input type="text" className="form-control" placeholder="Expiry date" />
              </div>
              <div className="col-md-6 mb-3">
                <input type="text" className="form-control" placeholder="CVC code" />
              </div>
            </div>

            <button className="btn btn-outline-secondary mt-2">Cancel</button>
          </div>
        </div>

        <div className="col-lg-4">
          <div className=" border rounded p-5 text-center">

            <h5 className="fw-bold">{plan.name}</h5>
            <h2 className="fw-bold my-2">{plan.price} L.E</h2>

            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
              width="90"
              alt="icon"
              className="my-3"
            />

            <ul className="list-unstyled text-start">
              <li>✔ Monthly plan</li>
              <li>✔ Price {plan.price} L.E</li>
              <li>✔ Service fees {plan.serviceFees} L.E</li>
              <li className="fw-bold mt-2">
                Total : {plan.total} L.E / month
              </li>
            </ul>

            <button className="primary-btn w-100 mt-3">Checkout</button>
          </div>
        </div>
      </div>

    
    </div>
  );
}

export default Checkout;