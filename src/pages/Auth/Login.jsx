import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Img from "../../images/forgetpass.jpg";
import { toast } from "react-toastify";
import Pic from "../../images/image 9 (1).png";
import "../../styles/LoginPage.css";
import forget from "../../images/forget.png";
import "../../styles/Forgot.css";

const CreateNewPassword = () => {
  const [password, setpassword] = useState("");
  const [confirm, setconfirm] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!password || !confirm) {
      seterror("Both fields are required!");
      return;
    }
    if (password !== confirm) {
      seterror("Passwords do not match!");
      return;
    }
    if (password.length < 6) {
      seterror("Password is weak!");
      return;
    }
    seterror("");
    toast.success("Password created successfully!");
    navigate("/login");
  };

  return (
    <div className="container text-center p-5ٍ">
      <div className="row align-items-center">
        <div className="col-12 col-md-6  ">
          <h3>Create new password</h3>
          <p>
            Please create new password for your account, make sure it's strong
            and secure
          </p>

          <form className="d-flex flex-column gap-4" onSubmit={handlesubmit}>
            <div className="text-start d-flex flex-column gap-2">
              <label htmlFor="createpass">New password</label>
              <input
                id="createpass"
                type="password"
                placeholder="Create new Password"
                className="form-control"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            <div className="text-start d-flex flex-column gap-2">
              <label htmlFor="confirm">Confirm New password</label>
              <input
                id="confirm"
                type="password"
                placeholder="Confirm new Password"
                className="form-control"
                value={confirm}
                onChange={(e) => setconfirm(e.target.value)}
              />
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit" className="primary-btn w-100 mt-3 p-2">
              Reset Password
            </button>
            <p
              className="secondary-text mt-2"
              onClick={() => navigate("/login")}
            >
              Back to login ?
            </p>
          </form>
        </div>

        <div className="col-12 col-md-6 d-none d-md-block">
          <img src={Img} alt="forgetpass" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!email || !password) {
      setError("please fill in both fields!");
      return;
    }
  }

  return (
    <div className="login-page">
      <div className="form-container">
        <h1>Welcome back</h1>
        <p>Please enter your credentials </p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            type="email"
          />

          <label>Password</label>
          <input
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            type="password"
          />

          <p style={{ color: "red" }}>{error}</p>

          <button type="submit" className="log">
            Log in
          </button>
          <br />
          <button onClick={() => navigate()} type="button" className="forget">
            Forgot your password?
          </button>

          <h5>
            Don't have an account?
            <span
              style={{ color: "#015D82", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              sign up here
            </span>
          </h5>
        </form>
      </div>
      <div className="pic">
        <img src={Pic} alt="doctors" />
      </div>
    </div>
  );
};

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!email) {
      setError("please enter your email address!");
      return;
    }
  }
  return (
    <div className="forget-page">
      <div>
        <img src={forget} alt="forget password pic" />
      </div>
      <div>
        <h3> Forgot password?</h3>
        <p>
          Enter your email address and we'll send you a verification code to
          reset your password
        </p>
        <form onSubmit={handleSubmit}>
          <label>Email address</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your registered email"
          />

          <p style={{ color: "red" }}> {error}</p>
          <button onClick={() => navigate()}> Send verification code</button>

          <p>
            <span
              style={{ color: "#015D82", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              back to login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
