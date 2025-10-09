import { useState } from "react";
// import Footer from '../../components/layout/Footer';
import RegisterImg from "../../images/image 9 (1).png";

function Auth() {
  const [role, setRole] = useState(null);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-grow-1">
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center px-5">
          <Header />
          <Description />

          {!role ? (
            <RegisterButtons setRole={setRole} />
          ) : (
            <RegisterForm role={role} setRole={setRole} />
          )}
        </div>

        <div className="d-none d-md-flex col-md-6 align-items-center justify-content-center">
          <img src={RegisterImg} alt="Doctors" className="img-fluid" />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

function Header() {
  return (
    <h2 className="fw-bold mb-3" style={{ fontSize: "2rem" }}>
      Join <span style={{ color: "#015D82" }}>IClinic</span>
    </h2>
  );
}

function Description() {
  return (
    <p className="text-muted mb-4">
      Create your account and start your healthcare journey with us.
    </p>
  );
}

function RegisterButtons({ setRole }) {
  return (
    <div className="d-flex gap-3 mb-4">
      <button
        className="btn btn-outline-dark px-4"
        onClick={() => setRole("doctor")}
      >
        Sign Up as Doctor
      </button>
      <button
        className="btn text-white px-4"
        onClick={() => setRole("patient")}
        style={{ backgroundColor: "#015d82", color: "white", border: "none" }}
      >
        Sign Up as Patient
      </button>
    </div>
  );
}

function RegisterForm({ role, setRole }) {
  return (
    <form className="d-flex flex-column gap-3">
      {role === "patient" ? (
        <>
          <input
            type="text"
            placeholder="Enter your Full Name"
            className="form-control"
          />
          <input
            type="tel"
            placeholder="Enter your Phone Number"
            className="form-control"
          />
          <input
            type="email"
            placeholder="Enter your Email"
            className="form-control"
          />
          <input
            type="password"
            placeholder="Create your Password"
            className="form-control"
          />
          <input
            type="password"
            placeholder="Confirm your Password"
            className="form-control"
          />
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter your Full Name"
            className="form-control"
          />
          <input
            type="email"
            placeholder="Enter your Email"
            className="form-control"
          />
          <input
            type="text"
            placeholder="Enter your Specialization"
            className="form-control"
          />
          <input
            type="text"
            placeholder="Enter your License Number"
            className="form-control"
          />
          <input
            type="password"
            placeholder="Create your Password"
            className="form-control"
          />
          <input
            type="password"
            placeholder="Confirm your Password"
            className="form-control"
          />
        </>
      )}

      {/* Register Button */}
      <button
        className="btn text-white w-100 mt-2"
        style={{ backgroundColor: "#015D82" }}
      >
        Register
      </button>

      {/* Back Button */}
      <button
        type="button"
        className="btn btn-outline-secondary w-100"
        onClick={() => setRole(null)}
      >
        ← Back
      </button>

      <p className="small mt-2">
        Already have an account?{" "}
        <a href="..." className="fw-bold" style={{ color: "#015D82" }}>
          Sign in here
        </a>
      </p>
    </form>
  );
}

export default Auth;
