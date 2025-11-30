import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PatientLayout from './Patient/PatientLayout';

function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const plan = state?.plan || {
    name: 'Monthly Plan',
    price: 500,
    serviceFees: 50,
    total: 550
  };
  const doctor = state?.doctor;

  // Form state
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvcCode, setCvcCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if form is valid
  const isFormValid = cardNumber.trim() && expiryDate.trim() && cvcCode.trim();

  // Map plan names to backend plan types
  const getPlanType = (planName) => {
    if (planName.toLowerCase().includes('basic')) return 'basic';
    if (planName.toLowerCase().includes('standard')) return 'standard';
    if (planName.toLowerCase().includes('premium')) return 'premium';
    return 'basic'; // default
  };

  const handleCheckout = async () => {
    if (!isFormValid) {
      setError('Please fill in all card details');
      return;
    }

    if (!doctor?._id) {
      setError('Doctor information is missing');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');

      // استخدم الـ subscription checkout endpoint الصحيح
      const response = await fetch(
        'https://iclinc-back.onrender.com/api/v1/subscriptions/checkout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            doctorId: doctor._id,
            plan: getPlanType(plan.name) // 'basic', 'standard', or 'premium'
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to subscribe');
      }
      alert(
        'Subscription successful! You can now message and book appointments with this doctor.'
      );

      navigate('/patient/doctorProfile', {
        state: {
          doctor: doctor,
          subscribed: true
        }
      });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <PatientLayout>
      <div className="container py-5">
        <h3 className="primary-text fw-bold mb-4">Subscription</h3>

        {error && (
          <div className="alert alert-danger mb-4" role="alert">
            {error}
          </div>
        )}

        <div className="row g-4">
          <div className="shadow col-lg-8">
            <div className="rounded p-5">
              <h5 className="fw-bold mb-3">Select payment method</h5>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  defaultChecked
                />
                <label className="form-check-label">visa card</label>
              </div>
              <h6 className="fw-bold mb-3">Card details</h6>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Card number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength="19"
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Expiry date (MM/YY)"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    maxLength="5"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="CVC code"
                    value={cvcCode}
                    onChange={(e) => setCvcCode(e.target.value)}
                    maxLength="4"
                  />
                </div>
              </div>
              <button
                className="btn btn-outline-secondary mt-2"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="border rounded p-5 text-center">
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

              {doctor && (
                <p className="text-muted small mb-2">
                  Subscribing to: Dr. {doctor.fullName}
                </p>
              )}

              <button
                className="primary-btn w-100 mt-3"
                onClick={handleCheckout}
                disabled={!isFormValid || loading}
                style={{
                  opacity: !isFormValid || loading ? 0.6 : 1,
                  cursor: !isFormValid || loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Processing...' : 'Checkout'}
              </button>

              {!isFormValid && (
                <p className="text-muted small mt-2">
                  Fill all card details to checkout
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}

export default Checkout;
