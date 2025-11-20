import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import forget from '../../images/forget.png';
import CNP from '../../images/verificationimg.png';
import Pic from '../../images/image 9 (1).png';

const darkColor = '#015D82';

const API = axios.create({
  baseURL: 'https://iclinc-backend-gs97.onrender.com/api/v1',
  withCredentials: true
});

const Verification = ({ goBack, email, userType, goCreateNew }) => {
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

  const handleSubmit = async () => {
    if (otp.some((d) => d === '')) return toast.error('Enter all 6 digits');

    try {
      const res = await API.post(`/${userType}s/verifyResetCode`, {
        email,
        code: otp.join('')
      });

      toast.success('Code verified!');
      goCreateNew(res.data.resetToken);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid code');
      setOtp(Array(6).fill(''));
      inputsRef.current[0]?.focus();
    }
  };

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-lg-6 mb-4 mb-lg-0 text-center text-lg-start">
          <h2 className="fw-bold mb-3" style={{ color: darkColor }}>
            Enter Verification Code
          </h2>
          <p className="text-muted mb-4">
            We've sent a 6-digit code to <strong>{email}</strong>
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
                  borderColor: darkColor
                }}
              />
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="btn w-100 mb-3"
            style={{ backgroundColor: darkColor, color: 'white' }}
          >
            Verify Code
          </button>
          <p
            onClick={goBack}
            style={{ cursor: 'pointer', color: darkColor, fontWeight: 'bold' }}
          >
            ← Back
          </p>
        </div>
        <div className="col-lg-6 text-center">
          <img src={CNP} alt="Verification" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

const CreateNewPassword = ({ resetToken, userType, goLogin }) => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return setError('Passwords do not match');
    if (password.length_spend < 6) return setError('Password too weak');

    setLoading(true);
    try {
      await API.patch(`/${userType}s/resetPassword/${resetToken}`, {
        password,
        passwordConfirm: confirm
      });
      toast.success('Password changed successfully!');
      goLogin();
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-lg-6 text-center mb-4 mb-lg-0">
          <img src={CNP} alt="New Password" className="img-fluid" />
        </div>
        <div className="col-lg-6">
          <h3 className="fw-bold mb-3" style={{ color: darkColor }}>
            Create New Password
          </h3>
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <input
              type="password"
              className="form-control"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            {error && <p className="text-danger">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="btn w-100"
              style={{ backgroundColor: darkColor, color: 'white' }}
            >
              {loading ? 'Saving...' : 'Reset Password'}
            </button>
            <p
              className="text-center mt-3"
              style={{ cursor: 'pointer', color: darkColor }}
              onClick={goLogin}
            >
              Back to Login
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

const ForgotPass = ({ goBack, goVerification, userType }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post(`/${userType}s/forgotPassword`, { email });
      toast.success('Code sent to your email!');
      goVerification(email);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Email not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-lg-6 text-center mb-4 mb-lg-0">
          <img src={forget} alt="Forgot Password" className="img-fluid" />
        </div>
        <div className="col-lg-6">
          <h3 className="fw-bold mb-3" style={{ color: darkColor }}>
            Forgot Password?
          </h3>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="btn w-100 mb-3"
              style={{ backgroundColor: darkColor, color: 'white' }}
            >
              {loading ? 'Sending...' : 'Send Code'}
            </button>
            <p
              onClick={goBack}
              style={{
                cursor: 'pointer',
                color: darkColor,
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              ← Back to Login
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
  const [page, setPage] = useState('Login');
  const [userType, setUserType] = useState(null);
  const [currentEmail, setCurrentEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userType) {
      toast.error('Please select your role first');
      return;
    }

    try {
      const res = await API.post(`/${userType}s/login`, { email, password });

      toast.success(`Welcome back, ${userType}!`);

      localStorage.setItem('userType', userType);

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }

      if (userType === 'doctor') {
        navigate('/doctor/overview');
      } else {
        navigate('/patient/patientProfile');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  if (page === 'Login') {
    return (
      <div className="container py-5 min-vh-100 d-flex align-items-center">
        <div className="row w-100 justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2
              className="text-center fw-bold mb-5"
              style={{ color: darkColor }}
            >
              Who are you?
            </h2>
            <div className="row g-4">
              <div className="col-12 col-sm-6">
                <div
                  className="card h-100 text-center border-0 shadow-sm hover-shadow"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setUserType('doctor');
                    setPage('DoctorLogin');
                  }}
                >
                  <div className="card-body d-flex flex-column justify-content-center">
                    <i
                      className="fas fa-user-md fa-3x mb-3"
                      style={{ color: darkColor }}
                    ></i>
                    <h4 style={{ color: darkColor }}>I'm a Doctor</h4>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div
                  className="card h-100 text-center border-0 shadow-sm hover-shadow"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setUserType('patient');
                    setPage('PatientLogin');
                  }}
                >
                  <div className="card-body d-flex flex-column justify-content-center">
                    <i
                      className="fas fa-user-injured fa-3x mb-3"
                      style={{ color: darkColor }}
                    ></i>
                    <h4 style={{ color: darkColor }}>I'm a Patient</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const LoginForm = () => (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <div className="text-center text-lg-start">
            <button
              onClick={() => setPage('Login')}
              className="btn btn-link mb-4"
              style={{ color: darkColor }}
            >
              ← Change Role
            </button>
            <h2 className="fw-bold mb-3" style={{ color: darkColor }}>
              Welcome Back {userType === 'doctor' ? 'Doctor' : 'Patient'}
            </h2>
          </div>
          <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn w-100"
              style={{ backgroundColor: darkColor, color: 'white' }}
            >
              Log In as {userType === 'doctor' ? 'Doctor' : 'Patient'}
            </button>
            <button
              type="button"
              className="btn btn-link"
              style={{ color: darkColor }}
              onClick={() => setPage('ForgotPass')}
            >
              Forgot Password?
            </button>
          </form>
        </div>
        <div className="col-lg-6 text-center">
          <img src={Pic} alt="Welcome" className="img-fluid" />
        </div>
      </div>
    </div>
  );

  if (page === 'DoctorLogin' || page === 'PatientLogin') return <LoginForm />;
  if (page === 'ForgotPass')
    return (
      <ForgotPass
        userType={userType}
        goBack={() =>
          setPage(userType === 'doctor' ? 'DoctorLogin' : 'PatientLogin')
        }
        goVerification={(mail) => {
          setCurrentEmail(mail);
          setPage('Verification');
        }}
      />
    );
  if (page === 'Verification')
    return (
      <Verification
        userType={userType}
        email={currentEmail}
        goBack={() => setPage('ForgotPass')}
        goCreateNew={(token) => {
          setResetToken(token);
          setPage('CreateNewPassword');
        }}
      />
    );
  if (page === 'CreateNewPassword')
    return (
      <CreateNewPassword
        userType={userType}
        resetToken={resetToken}
        goLogin={() =>
          setPage(userType === 'doctor' ? 'DoctorLogin' : 'PatientLogin')
        }
      />
    );

  return null;
};

export default Login;
