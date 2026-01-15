import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Auth/Register';
import Layout from './components/layout/Layout';
import Login from './pages/Auth/Login';
import Chat from './pages/Chat';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Error from './pages/Error';
import { ToastContainer } from 'react-toastify';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import DoctorAppointments from './pages/Doctor/Dashboard/DoctorAppoinments';
import DoctorOverview from './pages/Doctor/Dashboard/DoctorOverview';
import DoctorPatients from './pages/Doctor/Dashboard/DoctorPatients';
import DoctorMessages from './pages/Doctor/Dashboard/DoctorMessages';
import Setting from './pages/Doctor/Dashboard/Setting';
import PatientProfile from './pages/Patient/Dashboard/PatientProfile';
import DoctorProfile from './pages/Patient/Dashboard/DoctorProfile';
import DoctorsList from './pages/Patient/Dashboard/DoctorsList';
import Checkout from './pages/Checkout';
import PatientSetting from './pages/Patient/Dashboard/PatientSetting';
import PatientMessages from './pages/Patient/Dashboard/PatientMessages';

function App() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={3000} />
      <div style={{ backgroundColor: '#F5F5F5' }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* Common Routes */}
            <Route path="chat" element={<Chat />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="checkout" element={<Checkout />} />

            {/* Doctor Routes */}
            <Route path="doctor">
              <Route path="overview" element={<DoctorOverview />} />
              <Route path="appointments" element={<DoctorAppointments />} />
              <Route path="patients" element={<DoctorPatients />} />
              <Route path="messages" element={<DoctorMessages />} />
              <Route path="settings" element={<Setting />} />
            </Route>

            {/* Patient Routes */}
            <Route path="patient">
              <Route path="patientProfile" element={<PatientProfile />} />
              <Route path="doctorProfile" element={<DoctorProfile />} />
              <Route path="doctorslist" element={<DoctorsList />} />
              <Route path="settings" element={<PatientSetting />} />
              <Route path="messages" element={<PatientMessages />} />
            </Route>

            {/* Error Route */}
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
