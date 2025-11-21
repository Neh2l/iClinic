import { useState } from 'react';
import RegisterImg from '../../images/image 9 (1).png';

function Auth() {
  const [role, setRole] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialization: '',
    licenseID: '',
    clinicName: '',
    nationalID: '',
    password: '',
    passwordConfirm: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      alert('Please select your role (Doctor or Patient).');
      return;
    }

    const url =
      role === 'doctor'
        ? 'https://iclinc-backend-gs97.onrender.com/api/v1/doctors/signup'
        : 'https://iclinc-backend-gs97.onrender.com/api/v1/patients/signup';

    const payload =
      role === 'doctor'
        ? {
            fullName: formData.fullName,
            email: formData.email,
            nationalID: formData.nationalID,
            password: formData.password,
            passwordConfirm: formData.passwordConfirm,
            clinicName: formData.clinicName,
            licenseID: formData.licenseID,
            address: formData.address,
            specialization: formData.specialization
          }
        : {
            name: formData.fullName,
            email: formData.email,
            nationalID: formData.nationalID,
            phone: formData.phone,
            address: formData.address,
            password: formData.password,
            passwordConfirm: formData.passwordConfirm
          };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      console.log('Response:', data);

      if (data.status === 'success') {
        alert(`${role} registered successfully!`);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          specialization: '',
          licenseID: '',
          clinicName: '',
          nationalID: '',
          address: '',
          password: '',
          passwordConfirm: ''
        });
        setRole(null);
      } else {
        alert(data.message || 'Something went wrong!');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Registration failed!');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-grow-1">
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center px-5">
          <Header />
          <Description />

          {!role ? (
            <RegisterButtons setRole={setRole} />
          ) : (
            <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
              <input
                name="fullName"
                type="text"
                placeholder="Enter your Full Name"
                className="form-control"
                value={formData.fullName}
                onChange={handleChange}
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Enter your Email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                name="nationalID"
                type="text"
                placeholder="Enter your National ID (14 digits)"
                className="form-control"
                value={formData.nationalID}
                onChange={handleChange}
                required
              />

              {role === 'doctor' && (
                <>
                  <input
                    name="clinicName"
                    type="text"
                    placeholder="Enter your Clinic Name"
                    className="form-control"
                    value={formData.clinicName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="licenseID"
                    type="text"
                    placeholder="Enter your License Number"
                    className="form-control"
                    value={formData.licenseID}
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="specialization"
                    type="text"
                    placeholder="Enter your Specialization"
                    className="form-control"
                    value={formData.specialization}
                    onChange={handleChange}
                  />
                </>
              )}

              {role === 'patient' && (
                <div>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Enter your Phone Number"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <input
                    name="address"
                    type="address"
                    placeholder="Enter your address"
                    className="form-control"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              )}

              <select
                name="Gender"
                className="form-control"
                value={formData.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <input
                name="password"
                type="password"
                placeholder="Create your Password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <input
                name="passwordConfirm"
                type="password"
                placeholder="Confirm your Password"
                className="form-control"
                value={formData.passwordConfirm}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="btn text-white w-100 mt-2"
                style={{ backgroundColor: '#015D82' }}
              >
                Register as {role === 'doctor' ? 'Doctor' : 'Patient'}
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary w-100"
                onClick={() => setRole(null)}
              >
                ← Back
              </button>

              <p className="small mt-2">
                Already have an account?{' '}
                <a
                  href="/login"
                  className="fw-bold"
                  style={{ color: '#015D82' }}
                >
                  Sign in here
                </a>
              </p>
            </form>
          )}
        </div>

        <div className="d-none d-md-flex col-md-6 align-items-center justify-content-center">
          <img src={RegisterImg} alt="Doctors" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <h2 className="fw-bold mb-3" style={{ fontSize: '2rem' }}>
      Join <span style={{ color: '#015D82' }}>IClinic</span>
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
        onClick={() => setRole('doctor')}
      >
        Sign Up as Doctor
      </button>
      <button
        className="btn text-white px-4"
        onClick={() => setRole('patient')}
        style={{ backgroundColor: '#015d82', color: 'white', border: 'none' }}
      >
        Sign Up as Patient
      </button>
    </div>
  );
}

export default Auth;
