import React, { useState, useEffect } from 'react';
import DoctorLayout from '../DoctorLayout';
import img from '../../../images/Face.png';


const initialPatients = [
  {
    id: 1,
    patientName: 'Albert Flores',
    patientID: '123445',
    date: 'Des 04.12',
    patientGender: 'Female',
    patientDiseases: 'Diabates',
    image: img
  },
  {
    id: 2,
    patientName: 'Albert Flores',
    patientID: '123445',
    date: 'Des 04.12',
    patientGender: 'Female',
    patientDiseases: 'Diabates',
    image: img
  },
  {
    id: 3,
    patientName: 'Albert Flores',
    patientID: '123445',
    date: 'Des 04.12',
    patientGender: 'Female',
    patientDiseases: 'Diabates',
    image: img
  },
  {
    id: 4,
    patientName: 'Albert Flores',
    patientID: '123445',
    date: 'Des 04.12',
    patientGender: 'Female',
    patientDiseases: 'Diabates',
    image: img
  },
  {
    id: 5,
    patientName: 'Albert Flores',
    patientID: '123445',
    date: 'Des 04.12',
    patientGender: 'Female',
    patientDiseases: 'Diabates',
    image: img
  }
];

function SinglePatient({patient, openDropdown, toggleDropdown, handleMessage, handleReport}) {
  return (
    <>
      {/* Desktop/Tablet Table Row */}
      <tr className="d-none d-md-table-row border-bottom">
        <td className="p-3">
          <div className="d-flex align-items-center">
            <img
              src={patient.image}
              alt={patient.patientName}
              className="rounded-circle me-2"
              style={{ width: '40px', height: '40px' }}/>
            <span>{patient.patientName}</span>
          </div>
        </td>
        <td className="p-3">{patient.patientID}</td>
        <td className="p-3">{patient.date}</td>
        <td className="p-3">{patient.patientGender}</td>
        <td className="p-3">{patient.patientDiseases}</td>
        <td className="p-3 position-relative bg-white">
          <button
            onClick={() => toggleDropdown(patient.id)}
            className="btn btn-sm"
            style={{ fontSize: '20px' }}>
            ⋮
          </button>
          {openDropdown === patient.id && (
            <div
              className="position-absolute bg-white border rounded shadow"
              style={{ right: 0, top: '100%', zIndex: 1000, minWidth: '150px' }}>
              <button
                onClick={() => handleMessage(patient)}
                className="btn btn-sm w-100 text-start px-3 py-2 border-bottom">
                Message
              </button>
              <button
                onClick={() => handleReport(patient)}
                className="btn btn-sm w-100 text-start px-3 py-2">
                Report
              </button>
            </div>
          )}
        </td>
      </tr>

      {/* Mobile Card View */}
      <div className="d-md-none border rounded p-3 mb-3">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="d-flex align-items-center">
            <img
              src={patient.image}
              alt={patient.patientName}
              className="rounded-circle me-2"
              style={{ width: '50px', height: '50px' }}/>
            <div>
              <h6 className="mb-0">{patient.patientName}</h6>
              <small className="text-muted">ID: {patient.patientID}</small>
            </div>
          </div>
          <div className="position-relative">
            <button
              onClick={() => toggleDropdown(patient.id)}
              className="btn btn-sm"
              style={{
                fontSize: '20px',
                backgroundColor: 'white',
                color: 'black',
                border: 'none'
              }}>
              ⋮
            </button>
            {openDropdown === patient.id && (
              <div
                className="position-absolute bg-white border rounded shadow"
                style={{
                  right: 0,
                  top: '100%',
                  zIndex: 1000,
                  minWidth: '150px'
                }}>
                <button
                  onClick={() => handleMessage(patient)}
                  className="btn btn-sm w-100 text-start px-3 py-2 border-bottom">
                  Message
                </button>
                <button
                  onClick={() => handleReport(patient)}
                  className="btn btn-sm w-100 text-start px-3 py-2">
                  Report
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <strong>Date:</strong>
          <span>{patient.date}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <strong>Gender:</strong>
          <span>{patient.patientGender}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <strong>Disease:</strong>
          <span>{patient.patientDiseases}</span>
        </div>
      </div>
    </>
  );
}

const DoctorPatients = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [reportReason, setReportReason] = useState('');

  // Handle click outside to close dropdown
  useEffect(() => {
    if (!openDropdown) return;

    const handleClickOutside = () => setOpenDropdown(null);

    // Delay adding listener to avoid immediate trigger
    setTimeout(() => document.addEventListener('click', handleClickOutside), 0);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [openDropdown]);

  
  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const handleMessage = (patient) => {
    window.location.href = '/doctor/messages';
    setOpenDropdown(null);
  };

  const handleReport = (patient) => {
    setSelectedPatient(patient);
    setShowReportModal(true);
    setOpenDropdown(null);
  };

  const closeReportModal = () => {
    setShowReportModal(false);
    setReportReason('');
    setSelectedPatient(null);
  };

  const submitReport = () => {
    if (reportReason.trim()) {
      alert(
        `Report submitted for ${selectedPatient.patientName}\nReason: ${reportReason}`
      );
      closeReportModal();
    } else {
      alert('Please enter a reason for the report');
    }
  };

  return (
    <DoctorLayout>
      {/* Search */}
      <div className="mb-4 desc">
        <input
          type="text"
          className="form-control rounded-4"
          placeholder="Search"
          style={{ maxWidth: '400px' }}/>
      </div>

      <div>
        <div className="p-3">
          <h3 className="mb-0">patients list</h3>
        </div>

        {/* Desktop Table */}
        <div className="d-none d-md-block overflow-visible">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th className="p-3 text-white" style={{ backgroundColor: '#015D82' }}>Patient name</th>
                <th className="p-3 text-white" style={{ backgroundColor: '#015D82' }}>Patient ID</th>
                <th className="p-3 text-white" style={{ backgroundColor: '#015D82' }}>Date</th>
                <th className="p-3 text-white" style={{ backgroundColor: '#015D82' }}>Gender</th>
                <th className="p-3 text-white" style={{ backgroundColor: '#015D82' }}>Diseases</th>
                <th className="p-3 text-white" style={{ backgroundColor: '#015D82' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {initialPatients.map((patient) => (
                <SinglePatient
                  key={patient.id}
                  patient={patient}
                  openDropdown={openDropdown}
                  toggleDropdown={toggleDropdown}
                  handleMessage={handleMessage}
                  handleReport={handleReport}/>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="d-md-none p-3">
          {initialPatients.map((patient) => (
            <SinglePatient
              key={patient.id}
              patient={patient}
              openDropdown={openDropdown}
              toggleDropdown={toggleDropdown}
              handleMessage={handleMessage}
              handleReport={handleReport}/>
          ))}
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }}>
          <div
            className="bg-white rounded shadow-lg p-4"
            style={{ maxWidth: '500px', width: '90%' }} >
            <h4 className="mb-3">Report Patient</h4>
            <div className="mb-3">
              <label className="form-label fw-bold">Patient Name:</label>
              <p>{selectedPatient?.patientName}</p>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Reason for Report:</label>
              <textarea
                className="form-control"
                rows="5"
                placeholder="Enter the reason for reporting this patient..."
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}>
              </textarea>
            </div>
            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-secondary" onClick={closeReportModal}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={submitReport}>
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </DoctorLayout>
  );
};

export default DoctorPatients;