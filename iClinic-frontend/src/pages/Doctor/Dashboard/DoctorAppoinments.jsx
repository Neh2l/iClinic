import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import DoctorLayout from '../DoctorLayout';
import img from '../../../images/Shape.png';

const initialAppointments = [
  {
    name: 'Michael James',
    date: '27 Aug 2025, 10:00 AM',
    type: 'Clinic consulting',
    img
  },
  {
    name: 'Emily Rose',
    date: '28 Aug 2025, 2:30 PM',
    type: 'Clinic consulting',
    img
  },
  {
    name: 'Emily Rose',
    date: '28 Aug 2025, 2:30 PM',
    type: 'Clinic consulting',
    img
  },
  {
    name: 'Emily Rose',
    date: '28 Aug 2025, 2:30 PM',
    type: 'Clinic consulting',
    img
  },
  {
    name: 'Emily Rose',
    date: '28 Aug 2025, 2:30 PM',
    type: 'Clinic consulting',
    img
  },
  {
    name: 'Emily Rose',
    date: '28 Aug 2025, 2:30 PM',
    type: 'Clinic consulting',
    img
  },
  {
    name: 'Emily Rose',
    date: '28 Aug 2025, 2:30 PM',
    type: 'Clinic consulting',
    img
  }
];

function SinglePatient({ name, date, type, img, onAccept, onDecline }) {
  return (
    <div className="d-flex align-items-center justify-content-between p-3 border mb-2 rounded bg-white">
      <div className="d-flex align-items-center">
        <img
          src={img}
          alt={name}
          width="50"
          height="50"
          className="rounded-circle me-3 border"
        />
        <div>
          <div className="fw-bold">{name}</div>
          <div>{type}</div>
          <div className="text-secondary">Requested Date: {date}</div>
        </div>
      </div>
      <div>
        <button className="accept-btn me-2" onClick={onAccept}>
          Accept
        </button>
        <button className="decline-btn" onClick={onDecline}>
          Decline
        </button>
      </div>
    </div>
  );
}

function ConfirmToast({ message, onConfirm, onCancel }) {
  return (
    <div>
      <p>{message || 'Are you sure?'}</p>
      <button className="btn btn-sm btn-danger me-2" onClick={onConfirm}>
        Confirm
      </button>
      <button className="btn btn-sm btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
}

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState(initialAppointments);

  const showConfirmToast = (message, onConfirm) => {
    toast.info(
      <ConfirmToast
        message={message}
        onConfirm={() => {
          toast.dismiss();
          onConfirm();
        }}
        onCancel={() => toast.dismiss()}
      />,
      { autoClose: false, closeOnClick: false, draggable: false }
    );
  };

  const handleDecline = (index) => {
    showConfirmToast(
      `Are you sure to remove ${appointments[index].name}?`,
      () => {
        setAppointments((apps) => apps.filter((_, i) => i !== index));
      }
    );
  };

  const handleAccept = (index) => {
    showConfirmToast(
      `Are you sure to accept ${appointments[index].name}?`,
      () => {
        toast.success(`Accepted! ${appointments[index].name}`, {
          position: 'top-right'
        });
        setAppointments((apps) => apps.filter((_, i) => i !== index));
      }
    );
  };

  const handleAcceptAll = () => {
    showConfirmToast('Are you sure to accept all?', () => {
      toast.success('All were Accepted!', { position: 'top-right' });
      setAppointments([]);
    });
  };

  const handleDeclineAll = () => {
    showConfirmToast('Are you sure to remove all?', () => {
      setAppointments([]);
    });
  };

  return (
    <DoctorLayout>
      <ToastContainer />
      <div className="row justify-content-between align-items-center mb-3">
        <div className="col-12 col-lg-8">
          <h2 className="fw-bold">Appointments</h2>
          <p>View and manage appointment requests from your patients</p>
        </div>
        <div className="col-12 col-lg-4 text-lg-end mt-3 mt-lg-0">
          <button className="accept-btn-all me-2" onClick={handleAcceptAll}>
            Accept All
          </button>
          <button className="decline-btn-all" onClick={handleDeclineAll}>
            Decline All
          </button>
        </div>
      </div>

      {appointments.length === 0 ? (
        <div className="text-muted">No appointments available</div>
      ) : (
        appointments.map((app, i) => (
          <SinglePatient
            key={i}
            {...app}
            onAccept={() => handleAccept(i)}
            onDecline={() => handleDecline(i)}
          />
        ))
      )}
    </DoctorLayout>
  );
};

export default DoctorAppointments;
