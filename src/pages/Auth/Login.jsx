import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Pic from '../../images/image 9 (1).png';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is included

const Verification = ({ goBack, goCreateNew }) => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    if (otp.some((digit) => digit === '')) {
      alert('You need to enter the 6 numbers!');
      return;
    }
    alert('Entered Code: ' + otp.join(''));
    setOtp(Array(6).fill(''));
    inputsRef.current[0].focus();
    goCreateNew();
  };

  return (
    <div className="d-flex flex-column flex-md-row min-vh-100">
      <div className="col-12 col-md-6 d-flex flex-column justify-content-center p-4">
        <h1 className="fw-bold mb-3">Enter Verification Code</h1>
        <p className="text-muted mb-4">
          We've sent a 6-digit verification code to your email address. <br />
          Please enter it below
        </p>

        <div className="d-flex gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              maxLength={1}
              className="form-control text-center"
              style={{ width: '50px' }}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputsRef.current[index] = el)}
            />
          ))}
        </div>

        <button onClick={handleSubmit} className="btn btn-primary w-100 mb-3">
          Send Verification Code
        </button>

        <div className="text-center">
          <p className="mb-2">
            Didn't receive the code?{' '}
            <a href="#" className="text-primary">
              Resend code
            </a>
          </p>
          <p
            className="text-muted mb-0"
            style={{ cursor: 'pointer' }}
            onClick={goBack}
          >
            ← Back to email entry
          </p>
        </div>
      </div>
      <div className="d-none d-md-flex col-md-6 align-items-center justify-content-center bg-light">
        <img
          src={Pic}
          alt="Doctors"
          className="img-fluid"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
    </div>
  );
};

const CreateNewPassword = ({ goBack, goLogin }) => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || !confirm) {
      setError('Both fields are required!');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match!');
      return;
    }
    if (password.length < 6) {
      setError('Password is weak!');
      return;
    }
    setError('');
    toast.success('Password created successfully!');
    goLogin();
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-grow-1">
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center p-4">
          <h3 className="fw-bold mb-3">Create new password</h3>
          <p className="text-muted mb-4">
            Please create a new password for your account, make sure it's strong
            and secure
          </p>

          <form className="d-flex flex-column gap-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="createpass" className="form-label">
                New password
              </label>
              <input
                id="createpass"
                type="password"
                placeholder="Create new Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirm" className="form-label">
                Confirm New password
              </label>
              <input
                id="confirm"
                type="password"
                placeholder="Confirm new Password"
                className="form-control"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>

            {error && <p className="text-danger">{error}</p>}

            <button type="submit" className="btn btn-primary w-100 mt-3">
              Reset Password
            </button>
            <p className="text-muted text-center mt-2" onClick={goLogin}>
              Back to login?
            </p>
          </form>
        </div>
        <div className="d-none d-md-flex col-md-6 align-items-center justify-content-center bg-light">
          <img
            src={Pic}
            alt="Doctors"
            className="img-fluid"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </div>
    </div>
  );
};

const ForgotPass = ({ goBack, goVerification }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address!');
      return;
    }
    setError('');
    goVerification();
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-grow-1">
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center p-4">
          <h3 className="fw-bold mb-3">Forgot password?</h3>
          <p className="text-muted mb-4">
            Enter your email address and we'll send you a verification code to
            reset your password
          </p>

          <form className="d-flex flex-column gap-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                className="form-control"
              />
            </div>
            {error && <p className="text-danger">{error}</p>}

            <button type="submit" className="btn btn-primary w-100 mt-3">
              Send verification code
            </button>
            <p className="text-muted text-center mt-2" onClick={goBack}>
              Back to login
            </p>
          </form>
        </div>
        <div className="d-none d-md-flex col-md-6 align-items-center justify-content-center bg-light">
          <img
            src={Pic}
            alt="Doctors"
            className="img-fluid"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [page, setPage] = useState('Login');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both fields!');
      return;
    }
    setError('');
    // Add login logic here
  };

  if (page === 'ForgotPass') {
    return (
      <ForgotPass
        goBack={() => setPage('Login')}
        goVerification={() => setPage('Verification')}
      />
    );
  }

  if (page === 'Verification') {
    return (
      <Verification
        goBack={() => setPage('ForgotPass')}
        goCreateNew={() => setPage('CreateNewPassword')}
      />
    );
  }

  if (page === 'CreateNewPassword') {
    return (
      <CreateNewPassword
        goBack={() => setPage('Login')}
        goLogin={() => setPage('Login')}
      />
    );
  }

  return (
    <div className="d-flex flex-column flex-md-row min-vh-100">
      <div className="col-12 col-md-6 d-flex flex-column justify-content-center p-4">
        <h1 className="fw-bold mb-3">Welcome back</h1>
        <p className="text-muted mb-4">Please enter your credentials</p>

        <form className="d-flex flex-column gap-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              type="email"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              type="password"
              className="form-control"
            />
          </div>

          {error && <p className="text-danger">{error}</p>}

          <button type="submit" className="btn btn-info text-white w-100 mt-3">
            Log in
          </button>
          <button
            type="button"
            className="btn btn-link text-info p-0"
            onClick={() => setPage('ForgotPass')}
          >
            Forgot your password?
          </button>

          <p className="text-muted text-center mt-2">
            Don't have an account?{' '}
            <span
              className="text-info fw-bold"
              onClick={() => navigate('/register')}
              style={{ cursor: 'pointer' }}
            >
              Sign up here
            </span>
          </p>
        </form>
      </div>
      <div className="d-none d-md-flex col-md-6 align-items-center justify-content-center bg-light">
        <img
          src={Pic}
          alt="Doctors"
          className="img-fluid"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
    </div>
  );
};

export default Login;
