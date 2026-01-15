import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import forget from '../../images/forget.png';
import CNP from '../../images/verificationimg.png';

const darkColor = '#015D82';

const API = axios.create({
  baseURL: 'https://iclinc-back.onrender.com/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ===== Reset Password with Token Component =====
const ResetPasswordWithToken = ({ token, userType, goLogin }) => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      return setError('Passwords do not match');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);

    try {
      await API.patch(`/${userType}s/resetPassword/${token}`, {
        password,
        passwordConfirm: confirm
      });

      toast.success('Password changed successfully!');
      setTimeout(() => goLogin(), 1500);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Reset failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
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
              placeholder="New Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              disabled={loading}
              required
            />
            {error && <p className="text-danger mb-0">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="btn w-100"
              style={{
                backgroundColor: loading ? '#ccc' : darkColor,
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Saving...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// ===== Forgot Password Component =====
const ForgotPass = ({ goBack, goResetPassword, userType }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post(`/${userType}s/forgotPassword`, {
        email
      });

      // Backend returns resetToken directly
      if (response.data.resetToken) {
        toast.success('Reset link generated! Redirecting...');
        setTimeout(() => goResetPassword(response.data.resetToken), 1000);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Email not found';
      toast.error(errorMessage);
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
          <p className="text-muted mb-4">
            Enter your email to reset your password
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="btn w-100 mb-3"
              style={{
                backgroundColor: loading ? '#ccc' : darkColor,
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Processing...' : 'Reset Password'}
            </button>
            <p
              onClick={loading ? null : goBack}
              style={{
                cursor: loading ? 'not-allowed' : 'pointer',
                color: darkColor,
                fontWeight: 'bold',
                textAlign: 'center',
                opacity: loading ? 0.5 : 1
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

// ===== Login Form Component =====
const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  userType,
  setPage,
  handleLogin,
  loading
}) => (
  <div className="container py-5">
    <div className="row align-items-center">
      <div className="col-lg-6 mb-4 mb-lg-0">
        <div className="text-center text-lg-start">
          <button
            onClick={() => setPage('Login')}
            className="btn btn-link mb-4"
            style={{ color: darkColor }}
            disabled={loading}
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
            disabled={loading}
            required
          />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
          <button
            type="submit"
            className="btn w-100"
            disabled={loading}
            style={{
              backgroundColor: loading ? '#ccc' : darkColor,
              color: 'white',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Logging in...' : 'LogIn'}
          </button>
          <button
            type="button"
            className="btn btn-link"
            style={{ color: darkColor }}
            onClick={() => setPage('ForgotPass')}
            disabled={loading}
          >
            Forgot Password?
          </button>
        </form>
      </div>
      <div className="col-lg-6 text-center">
        <img
          src="/log3.jpeg"
          alt="Welcome"
          className="img-fluid d-none d-lg-block"
        />
      </div>
    </div>
  </div>
);

// ===== Main Login Component =====
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [page, setPage] = useState('Login');
  const [userType, setUserType] = useState(null);
  const [resetToken, setResetToken] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userType) {
      toast.error('Please select your role first');
      return;
    }

    setLoading(true);

    try {
      const res = await API.post(`/${userType}s/login`, { email, password });

      toast.success(`Welcome back!`);

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
      const errorMessage = err.response?.data?.message || 'Login failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
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
                  className="card h-100 text-center border-0 shadow-sm"
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
                  className="card h-100 text-center border-0 shadow-sm"
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

  if (page === 'DoctorLogin' || page === 'PatientLogin') {
    return (
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        userType={userType}
        setPage={setPage}
        handleLogin={handleLogin}
        loading={loading}
      />
    );
  }

  if (page === 'ForgotPass') {
    return (
      <ForgotPass
        userType={userType}
        goBack={() =>
          setPage(userType === 'doctor' ? 'DoctorLogin' : 'PatientLogin')
        }
        goResetPassword={(token) => {
          setResetToken(token);
          setPage('ResetPassword');
        }}
      />
    );
  }

  if (page === 'ResetPassword') {
    return (
      <ResetPasswordWithToken
        userType={userType}
        token={resetToken}
        goLogin={() =>
          setPage(userType === 'doctor' ? 'DoctorLogin' : 'PatientLogin')
        }
      />
    );
  }

  return null;
};

export default Login;
