import React from "react";
import { useState ,useRef  } from "react";
import { useNavigate } from "react-router-dom";
import Img from "../../images/forgetpass.jpg";
import { toast } from "react-toastify";
import Pic from "../../images/image 9 (1).png";
import "../../styles/LoginPage.css";
import forget from "../../images/forget.png";
import "../../styles/Forgot.css";
import styles from '../../styles/verification.module.css'


 const Verification = ({ goBack, goCreateNew })=> {
  const [otp, setOtp] = useState(Array(6).fill(""));
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
    if (e.key === "Backspace" && !otp[index] && index > 0) { 
      inputsRef.current[index - 1].focus();
      
    }
  };

   const handleSubmit = () => {
     if (otp.some((digit) => digit === "")) {
       alert("You need to enter the 6 numbers!");
       return;
     }
     alert("Entered Code: " + otp.join(""));
     setOtp(Array(6).fill("")); 
     inputsRef.current[0].focus();  
     goCreateNew();
   };


  return (
    <div className={styles.optContainer}>
      <div className={styles.leftPanel}>
        <h1>Enter Verification Code</h1>
        <p>
          We've sent a 6-digit verification code to your email address.<br />
          Please enter it below
        </p>

        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            maxLength={1}
            className={styles.otpInput}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputsRef.current[index] = el)}
          />
        ))}

        <br /><br />
        <button onClick={handleSubmit} className={styles.verifyBtn}>
          Send Verification Code
        </button>

        <div className={styles.resend}>
          <p>
            Didn't receive the code ? <a href="#">Resend code</a>
          </p>
          <a className={styles.backLink} href="#">
            ← Back to email entry
          </a>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <img
          src="/verificationimg.png"
          alt="Verification"
        />
      </div>
    </div>

  );
};


const CreateNewPassword = ({goBack ,goLogin}) => {
  const [password, setpassword] = useState("");
  const [confirm, setconfirm] = useState("");
  const [error, seterror] = useState("");
  // const navigate = useNavigate();

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
       goLogin();
  };

  return (
    <div className="container text-center p-5ٍ mt-5">
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
              onClick={goLogin}
                          >
              Back to login ?
            </p>
          </form>
        </div>

        <div className="col-12 col-md-6 d-none d-md-block">
          <img src="/verificationimg.png" alt="forgetpass" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};
const ForgotPass = ({ goBack, goVerification }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!email) {
      setError("please enter your email address!");
      return;
    }
    setError("");
    goVerification(); 
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
          <p style={{ color: "red" }}>{error}</p>

          <button type="submit">Send verification code</button>

          <p>
            <span
              style={{ color: "#015D82", cursor: "pointer" }}
              onClick={goBack}
            >
              back to login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [page, setpage] = useState("Login");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (!email || !password) {
      setError("please fill in both fields!");
      return;
    }
    setError("");
  }

  if (page === "ForgotPass") {
    return (
      <ForgotPass
        goBack={() => setpage("Login")}
        goVerification={() => setpage("Verification")}
      />
    );
  }

  if (page === "Verification") {
    return (
      <Verification
        goBack={() => setpage("ForgotPass")}
        goCreateNew={() => setpage("CreateNewPassword")}
      />
    );
  }

  if (page === "CreateNewPassword") {
    return <CreateNewPassword goBack={() => setpage("Login")} goLogin={() => setpage("Login")}  />;
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
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            type="email"
          />

          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            type="password"
          />

          <p style={{ color: "red" }}>{error}</p>

          <button type="submit" className="log">
            Log in
          </button>
          <br />

          <button
            type="button"
            className="forget"
            onClick={() => setpage("ForgotPass")}
          >
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
export default Login;
