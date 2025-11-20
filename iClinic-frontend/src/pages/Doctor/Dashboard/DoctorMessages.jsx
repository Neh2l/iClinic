import React, { useState, useEffect, useRef } from 'react';
import DoctorLayout from '../DoctorLayout';
import axios from 'axios';
import img from '../../../images/Face.png';

const DoctorMessages = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showChatList, setShowChatList] = useState(true);
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem('token');
  const API_BASE = 'https://iclinc-backend-gs97.onrender.com/api/v1';

  // Fetch doctor's patients
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axios.get(`${API_BASE}/doctors/myPatients`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPatients(res.data.data.patients || []);
    } catch (err) {
      console.error('Failed to fetch patients', err);
    }
  };

  // Select a patient and fetch conversation
  const selectPatient = async (patient) => {
    setSelectedPatient(patient);
    setShowChatList(false);

    try {
      const res = await axios.get(`${API_BASE}/messages/conv/${patient._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(res.data.data.messages || []);
    } catch (err) {
      console.error('Failed to fetch messages', err);
      setMessages([]);
    }
  };

  // Send a message
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedPatient) return;

    try {
      const res = await axios.post(
        `${API_BASE}/messages/send`,
        {
          message: newMessage,
          receiverId: selectedPatient._id
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages((prev) => [...prev, res.data.data.message]);
      setNewMessage('');
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <DoctorLayout>
      <div
        className="d-flex h-100"
        style={{ minHeight: 'calc(100vh - 140px)' }}
      >
        {/* === Patients List === */}
        <div
          className={`border-end bg-white ${
            showChatList ? 'd-block' : 'd-none d-lg-block'
          }`}
          style={{ width: '350px', minWidth: '300px' }}
        >
          <div
            className="p-3 border-bottom"
            style={{ backgroundColor: '#015D82' }}
          >
            <h5 className="mb-3 fw-bold text-white">Patients</h5>
            <input
              type="text"
              className="form-control form-control-sm rounded-pill"
              placeholder="Search..."
              style={{ backgroundColor: '#f1f3f4' }}
            />
          </div>
          <div style={{ height: 'calc(100% - 90px)', overflowY: 'auto' }}>
            {patients.length === 0 ? (
              <div className="text-center p-4 text-muted">
                No patients found
              </div>
            ) : (
              patients.map((patient) => (
                <div
                  key={patient._id}
                  onClick={() => selectPatient(patient)}
                  className={`p-3 border-bottom d-flex align-items-center cursor-pointer transition-all ${
                    selectedPatient?._id === patient._id
                      ? 'bg-primary bg-opacity-10'
                      : 'hover-bg-light'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="position-relative">
                    <img
                      src={patient.photo || img}
                      alt={patient.name}
                      className="rounded-circle me-3"
                      style={{ width: 48, height: 48, objectFit: 'cover' }}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center">
                      <strong
                        className="d-block text-truncate"
                        style={{ maxWidth: '180px' }}
                      >
                        {patient.name}
                      </strong>
                    </div>
                    <small
                      className="d-block text-muted text-truncate"
                      style={{ maxWidth: '180px' }}
                    >
                      {patient.patientDisease || 'No info'}
                    </small>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* === Chat Area === */}
        <div
          className={`flex-grow-1 d-flex flex-column ${
            !showChatList ? 'd-flex' : 'd-none d-lg-flex'
          }`}
        >
          {selectedPatient ? (
            <>
              {/* Header */}
              <div
                className="p-3 border-bottom d-flex align-items-center shadow-sm"
                style={{ backgroundColor: '#015D82' }}
              >
                <button
                  className="btn btn-sm d-lg-none me-2 text-white"
                  onClick={() => setShowChatList(true)}
                >
                  ← Back
                </button>
                <img
                  src={selectedPatient.photo || img}
                  alt={selectedPatient.name}
                  className="rounded-circle me-3"
                  style={{ width: 50, height: 50, objectFit: 'cover' }}
                />
                <div>
                  <strong className="d-block text-white">
                    {selectedPatient.name}
                  </strong>
                  <small className="text-white fw-medium">
                    {selectedPatient.active ? 'Online' : 'Offline'}
                  </small>
                </div>
              </div>

              {/* Messages */}
              <div
                className="flex-grow-1 p-3 overflow-y-auto"
                style={{ backgroundColor: '#f5f5f5' }}
              >
                {messages.length === 0 ? (
                  <div className="text-center text-muted mt-5">
                    No messages yet. Start the conversation!
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={msg._id || index}
                      className={`d-flex mb-3 ${
                        msg.sender === selectedPatient._id
                          ? 'justify-content-start'
                          : 'justify-content-end'
                      }`}
                    >
                      <div
                        className={`p-3 rounded-3 shadow-sm ${
                          msg.sender === selectedPatient._id
                            ? 'bg-white'
                            : 'text-white'
                        }`}
                        style={{
                          maxWidth: '70%',
                          borderRadius: '18px',
                          borderTopLeftRadius:
                            msg.sender === selectedPatient._id ? '4px' : '18px',
                          borderTopRightRadius:
                            msg.sender === selectedPatient._id ? '18px' : '4px',
                          backgroundColor:
                            msg.sender === selectedPatient._id
                              ? '#ffffff'
                              : '#015D82'
                        }}
                      >
                        <p className="mb-1 text-break">
                          {msg.message || msg.text}
                        </p>
                        <small
                          className={
                            msg.sender === selectedPatient._id
                              ? 'text-muted'
                              : 'text-white opacity-75'
                          }
                        >
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </small>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 bg-white border-top">
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="text"
                    className="form-control rounded-pill flex-grow-1"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    style={{ height: '48px', backgroundColor: '#f1f3f4' }}
                  />
                  <div
                    onClick={sendMessage}
                    className="d-flex align-items-center justify-content-center rounded-circle shadow-sm"
                    style={{
                      width: 48,
                      height: 48,
                      backgroundColor: newMessage.trim() ? '#015D82' : '#ccc',
                      cursor: newMessage.trim() ? 'pointer' : 'not-allowed'
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="white"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.407l4.995 3.178 1.531 6.198a.75.75 0 0 0 1.39-.048l1.5-3.5 4.418 4.418a.5.5 0 0 0 .653-.647l-6-6z" />
                    </svg>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center px-4">
              <h4 className="mb-2" style={{ color: '#015D82' }}>
                No patient selected
              </h4>
              <p className="text-muted">
                Choose a patient from the list to start chatting
              </p>
            </div>
          )}
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorMessages;
