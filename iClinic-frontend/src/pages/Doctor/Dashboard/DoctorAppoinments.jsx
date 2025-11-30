import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import DoctorLayout from '../DoctorLayout';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'confirmed'

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

      // Sort: pending first, then confirmed
      const sortedApps = apps.sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        return 0;
      });

      setAppointments(sortedApps);
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

      const status = action === 'accepted' ? 'confirmed' : 'cancelled';

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
        // Update and re-sort
        setAppointments((prev) => {
          const updated = prev.map((app) =>
            app._id === id ? { ...app, status: 'confirmed' } : app
          );
          // Re-sort after update
          return updated.sort((a, b) => {
            if (a.status === 'pending' && b.status !== 'pending') return -1;
            if (a.status !== 'pending' && b.status === 'pending') return 1;
            return 0;
          });
        });
      } else if (res.ok && status === 'cancelled') {
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
    const isPending = app.status === 'pending';
    const isConfirmed = app.status === 'confirmed';

    return (
      <div
        className={`d-flex align-items-center justify-content-between p-3 mb-2 rounded ${
          isPending
            ? 'bg-warning bg-opacity-10 border border-warning'
            : isConfirmed
            ? 'bg-success bg-opacity-10 border border-success'
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
            <div className="text-muted small">Type: {app.type || 'Clinic'}</div>
            <div className="text-muted small">
              Date: {new Date(app.date).toLocaleDateString()} - {app.time}
            </div>
            <div>
              <span
                className={`badge ${
                  isPending
                    ? 'bg-warning text-dark'
                    : isConfirmed
                    ? 'bg-success'
                    : 'bg-secondary'
                }`}
              >
                {app.status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {isPending && (
          <div>
            <button
              className="btn btn-success btn-sm me-2"
              onClick={() => updateStatus(app._id, 'accepted')}
            >
              Accept
            </button>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => updateStatus(app._id, 'declined')}
            >
              Decline
            </button>
          </div>
        )}
      </div>
    );
  };

  // Filter appointments based on selected filter
  const filteredAppointments = appointments.filter((app) => {
    if (filter === 'all') return true;
    if (filter === 'pending') return app.status === 'pending';
    if (filter === 'confirmed') return app.status === 'confirmed';
    if (filter === 'cancelled') return app.status === 'cancelled';
    return true;
  });

  const pendingCount = appointments.filter(
    (app) => app.status === 'pending'
  ).length;
  const confirmedCount = appointments.filter(
    (app) => app.status === 'confirmed'
  ).length;
  const declinedCount = appointments.filter(
    (app) => app.status === 'cancelled'
  ).length;

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <DoctorLayout>
      <ToastContainer />
      <h2 className="fw-bold">Appointments</h2>
      <p className="text-muted">
        View and manage appointment requests from your patients
      </p>

      {/* Filter Buttons */}
      <div className="mb-4 d-flex gap-2 flex-wrap">
        <button
          className={`btn ${
            filter === 'all' ? 'btn-primary' : 'btn-outline-primary'
          }`}
          onClick={() => setFilter('all')}
        >
          All ({appointments.length})
        </button>
        <button
          className={`btn ${
            filter === 'pending' ? 'btn-warning' : 'btn-outline-warning'
          }`}
          onClick={() => setFilter('pending')}
        >
          Pending ({pendingCount})
        </button>
        <button
          className={`btn ${
            filter === 'confirmed' ? 'btn-success' : 'btn-outline-success'
          }`}
          onClick={() => setFilter('confirmed')}
        >
          Confirmed ({confirmedCount})
        </button>
        <button
          className={`btn ${
            filter === 'cancelled' ? 'btn-danger' : 'btn-outline-danger'
          }`}
          onClick={() => setFilter('cancelled')}
        >
          Declined ({declinedCount})
        </button>
      </div>

      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: '70vh' }}
        >
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : appointments.length === 0 ? (
        <div className="alert alert-info">No appointments available</div>
      ) : filteredAppointments.length === 0 ? (
        <div className="alert alert-warning">
          No {filter} appointments found
        </div>
      ) : (
        <>
          {/* Pending Section */}
          {filteredAppointments.some((app) => app.status === 'pending') && (
            <div className="mb-4">
              <h5 className="text-warning mb-3">
                ⏳ Pending Requests (
                {
                  filteredAppointments.filter((app) => app.status === 'pending')
                    .length
                }
                )
              </h5>
              {filteredAppointments
                .filter((app) => app.status === 'pending')
                .map((app) => (
                  <SinglePatient key={app._id} app={app} />
                ))}
            </div>
          )}

          {/* Confirmed Section */}
          {filteredAppointments.some((app) => app.status === 'confirmed') && (
            <div className="mb-4">
              <h5 className="text-success mb-3">
                ✓ Confirmed Appointments (
                {
                  filteredAppointments.filter(
                    (app) => app.status === 'confirmed'
                  ).length
                }
                )
              </h5>
              {filteredAppointments
                .filter((app) => app.status === 'confirmed')
                .map((app) => (
                  <SinglePatient key={app._id} app={app} />
                ))}
            </div>
          )}

          {filteredAppointments.some((app) => app.status === 'cancelled') && (
            <div className="mb-4">
              <h5 className="text-danger mb-3">
                Declined Appointments (
                {
                  filteredAppointments.filter(
                    (app) => app.status === 'cancelled'
                  ).length
                }
                )
              </h5>
              {filteredAppointments
                .filter((app) => app.status === 'cancelled')
                .map((app) => (
                  <SinglePatient key={app._id} app={app} />
                ))}
            </div>
          )}
        </>
      )}
    </DoctorLayout>
  );
};

export default DoctorAppointments;
