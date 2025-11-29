import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import DoctorLayout from '../DoctorLayout';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        'https://iclinc-back.onrender.com/api/v1/appointments/doctorAppointments',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();

      const apps = Array.isArray(data.data?.appointments)
        ? data.data.appointments
        : [];

      setAppointments(apps);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error('Failed to load appointments');
      setLoading(false);
    }
  };

  const updateStatus = async (id, action) => {
    try {
      const token = localStorage.getItem('token');

      const status = action === 'accepted' ? 'confirmed' : 'canceled';

      const res = await fetch(
        `https://iclinc-back.onrender.com/api/v1/appointments/${id}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ status })
        }
      );

      const data = await res.json();

      if (res.ok && status === 'confirmed') {
        toast.success('Appointment Accepted');
        setAppointments((prev) =>
          prev.map((app) =>
            app._id === id ? { ...app, status: 'confirmed' } : app
          )
        );
      } else if (res.ok && status === 'canceled') {
        toast.success('Appointment Declined');
        setAppointments((prev) => prev.filter((app) => app._id !== id));
      } else {
        toast.error(data.message || 'Failed to update status');
      }
    } catch (err) {
      console.log(err);
      toast.error('Error updating appointment');
    }
  };

  const SinglePatient = ({ app }) => {
    const isConfirmed = app.status === 'confirmed';

    return (
      <div
        className={`d-flex align-items-center justify-content-between p-3 mb-2 rounded ${
          isConfirmed
            ? 'bg-primary bg-opacity-25 border-success'
            : 'bg-white border'
        }`}
      >
        <div className="d-flex align-items-center">
          <img
            src={app.patient?.profileImg || '/profile.jpg'}
            width="50"
            height="50"
            className="rounded-circle me-3 border"
            alt={app.patient?.name || 'patient'}
          />
          <div>
            <div className="fw-bold">{app.patient?.name || 'Unknown'}</div>
            <div>Type: {app.type || 'Clinic'}</div>
            <div>
              Date: {new Date(app.date).toLocaleDateString()} - {app.time}
            </div>
            <div>Status: {app.status}</div>
          </div>
        </div>

        {!isConfirmed && (
          <div>
            <button
              className="accept-btn me-2"
              onClick={() => updateStatus(app._id, 'accepted')}
            >
              Accept
            </button>

            <button
              className="decline-btn"
              onClick={() => updateStatus(app._id, 'declined')}
            >
              Decline
            </button>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <DoctorLayout>
      <ToastContainer />
      <h2 className="fw-bold">Appointments</h2>
      <p>View and manage appointment requests from your patients</p>

      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: '70vh' }}
        >
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-muted">No appointments available</div>
      ) : (
        appointments.map((app) => <SinglePatient key={app._id} app={app} />)
      )}
    </DoctorLayout>
  );
};

export default DoctorAppointments;
