import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import forget from '../../images/forget.png';
import CNP from '../../images/verificationimg.png';
import Pic from '../../images/image 9 (1).png';

const theFuckinColorShit = '#015D82';

const Verification = ({ goBack, goCreateNew }) => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputsRef.current[index + 1].focus();
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
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-lg-6 mb-4 mb-lg-0 text-center text-lg-start">
          <h2 className="fw-bold mb-3" style={{ color: theFuckinColorShit }}>
            Enter Verification Code
          </h2>
          <p className="text-muted mb-4">
            We've sent a 6-digit verification code to your email address.
            <br />
            Please enter it below.
          </p>

          <div className="d-flex justify-content-center justify-content-lg-start gap-2 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="form-control text-center fs-4 border-2"
                style={{
                  width: '50px',
                  height: '50px',
                  borderColor: theFuckinColorShit
                }}
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="btn w-100 mb-3"
            style={{
              backgroundColor: theFuckinColorShit,
              color: 'white',
              border: 'none'
            }}
          >
            Send Verification Code
          </button>

          <p className="mt-3 mb-1">
            Didn't receive the code?{' '}
            <a
              href="..."
              style={{ color: theFuckinColorShit, fontWeight: 'bold' }}
            >
              Resend code
            </a>
          </p>
          <p
            onClick={goBack}
            className="fw-bold"
            style={{ cursor: 'pointer', color: theFuckinColorShit }}
          >
            ← Back to email entry
          </p>
        </div>

        <div className="col-lg-6 text-center">
          <img src={CNP} alt="Verification" className="img-fluid" />
        </div>
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
    if (!password || !confirm) return setError('Both fields are required!');
    if (password !== confirm) return setError('Passwords do not match!');
    if (password.length < 6) return setError('Password is weak!');
    setError('');
    toast.success('Password created successfully!');
    goLogin();
  };

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-lg-6 text-center mb-4 mb-lg-0">
          <img src={CNP} alt="Create Password" className="img-fluid" />
        </div>

        <div className="col-lg-6">
          <h3 className="fw-bold mb-3" style={{ color: theFuckinColorShit }}>
            Create New Password
          </h3>
          <p className="text-muted mb-4">
            Please create a new password for your account. Make sure it's strong
            and secure.
          </p>

          <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="createpass" className="form-label">
                New Password
              </label>
              <input
                id="createpass"
                type="password"
                placeholder="Enter new password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="confirm" className="form-label">
                Confirm New Password
              </label>
              <input
                id="confirm"
                type="password"
                placeholder="Confirm new password"
                className="form-control"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>

            {error && <p className="text-danger">{error}</p>}

            <button
              type="submit"
              className="btn w-100 mt-2"
              style={{
                backgroundColor: theFuckinColorShit,
                color: 'white',
                border: 'none'
              }}
            >
              Reset Password
            </button>

            <p
              className="text-center mt-3"
              style={{ cursor: 'pointer', color: theFuckinColorShit }}
              onClick={goLogin}
            >
              Back to login
            </p>
          </form>
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
    if (!email) return setError('Please enter your email address!');
    setError('');
    goVerification();
  };

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-lg-6 text-center mb-4 mb-lg-0">
          <img src={forget} alt="Forgot Password" className="img-fluid" />
        </div>

        <div className="col-lg-6">
          <h3 className="fw-bold mb-3" style={{ color: theFuckinColorShit }}>
            Forgot Password?
          </h3>
          <p className="text-muted mb-4">
            Enter your email and we'll send you a verification code to reset
            your password.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter your registered email"
              />
            </div>
            {error && <p className="text-danger">{error}</p>}

            <button
              type="submit"
              className="btn w-100 mb-3"
              style={{
                backgroundColor: theFuckinColorShit,
                color: 'white',
                border: 'none'
              }}
            >
              Send Verification Code
            </button>

            <p
              onClick={goBack}
              className="fw-bold text-center"
              style={{ cursor: 'pointer', color: theFuckinColorShit }}
            >
              Back to login
            </p>
          </form>
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
    if (!email || !password) return setError('Please fill in both fields!');
    setError('');
    // Add login logic here
  };

  if (page === 'ForgotPass')
    return (
      <ForgotPass
        goBack={() => setPage('Login')}
        goVerification={() => setPage('Verification')}
      />
    );

  if (page === 'Verification')
    return (
      <Verification
        goBack={() => setPage('ForgotPass')}
        goCreateNew={() => setPage('CreateNewPassword')}
      />
    );

  if (page === 'CreateNewPassword')
    return (
      <CreateNewPassword
        goBack={() => setPage('Login')}
        goLogin={() => setPage('Login')}
      />
    );

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <h2 className="fw-bold mb-3" style={{ color: theFuckinColorShit }}>
            Welcome Back
          </h2>
          <p className="text-muted mb-4">Please enter your credentials</p>

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <div>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-danger">{error}</p>}

            <button
              className="btn w-100"
              type="submit"
              style={{
                backgroundColor: theFuckinColorShit,
                color: 'white',
                border: 'none'
              }}
            >
              Log In
            </button>

            <button
              type="button"
              className="btn btn-link"
              style={{ color: theFuckinColorShit, textDecoration: 'none' }}
              onClick={() => setPage('ForgotPass')}
            >
              Forgot your password?
            </button>

            <p className="text-center">
              Don't have an account?{' '}
              <span
                className="fw-bold"
                style={{ cursor: 'pointer', color: theFuckinColorShit }}
                onClick={() => navigate('/register')}
              >
                Sign up here
              </span>
            </p>
          </form>
        </div>

        <div className="col-lg-6 text-center">
          <img src={Pic} alt="Doctors" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default Login;
