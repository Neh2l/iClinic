import { useState } from 'react';

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
    address: '',
    gender: '',
    password: '',
    passwordConfirm: ''
  });
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 4000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      showToast('Please select your role (Doctor or Patient).', 'error');
      return;
    }

    if (!formData.gender) {
      showToast('Please select your gender.', 'error');
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      showToast('Passwords do not match!', 'error');
      return;
    }

    const url =
      role === 'doctor'
        ? 'https://iclinc-back.onrender.com/api/v1/doctors/signup'
        : 'https://iclinc-back.onrender.com/api/v1/patients/signup';

    const payload =
      role === 'doctor'
        ? {
            fullName: formData.fullName,
            email: formData.email,
            nationalID: formData.nationalID,
            gender: formData.gender,
            phone: formData.phone,
            password: formData.password,
            passwordConfirm: formData.passwordConfirm,
            clinicName: formData.clinicName,
            licenseID: formData.licenseID,
            address: formData.address,
            specialities: formData.specialization
          }
        : {
            name: formData.fullName,
            email: formData.email,
            nationalID: formData.nationalID,
            gender: formData.gender,
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
        showToast(
          `Registration successful! Welcome to IClinic, ${formData.fullName}!`,
          'success'
        );
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          specialization: '',
          licenseID: '',
          clinicName: '',
          nationalID: '',
          address: '',
          gender: '',
          password: '',
          passwordConfirm: ''
        });
        setTimeout(() => {
          setRole(null);
        }, 2000);
      } else {
        showToast(data.message || 'Something went wrong!', 'error');
      }
    } catch (err) {
      console.error('Error:', err);
      showToast('Registration failed! Please try again.', 'error');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Toast Notification */}
      {toast.show && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            minWidth: '300px',
            maxWidth: '500px',
            backgroundColor: toast.type === 'success' ? '#28a745' : '#dc3545',
            color: 'white',
            padding: '16px 24px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            animation: 'slideIn 0.3s ease-out'
          }}
        >
          <span style={{ fontSize: '20px' }}>
            {toast.type === 'success' ? '✓' : '✕'}
          </span>
          <span style={{ flex: 1 }}>{toast.message}</span>
          <button
            onClick={() => setToast({ show: false, message: '', type: '' })}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '0',
              lineHeight: '1'
            }}
          >
            ×
          </button>
        </div>
      )}

      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>

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

              <input
                name="phone"
                type="tel"
                placeholder="Enter your Phone Number"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
                required={role === 'patient'}
              />

              <input
                name="address"
                type="text"
                placeholder="Enter your address"
                className="form-control"
                value={formData.address}
                onChange={handleChange}
              />

              <select
                name="gender"
                className="form-control"
                value={formData.gender}
                onChange={handleChange}
                required
                style={{ color: formData.gender ? '#212529' : '#6c757d' }}
              >
                <option value="" disabled>
                  Select your gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

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

        <div
          className="d-none d-md-flex col-md-6 align-items-center justify-content-center"
          style={{
            height: '100vh',
            overflow: 'hidden',
            padding: '2rem'
          }}
        >
          <img
            src="/log3.jpeg"
            alt="Doctors"
            className="img-fluid"
            style={{
              maxHeight: '90vh',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
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
