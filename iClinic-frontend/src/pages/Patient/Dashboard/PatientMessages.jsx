import React, { useState, useEffect, useRef } from 'react';
import PatientLayout from '../PatientLayout';
import axios from 'axios';
import img from '../../../images/Face.png';

const PatientMessages = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showChatList, setShowChatList] = useState(true);
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem('token');
  const API_BASE = 'https://iclinc-backend-gs97.onrender.com/api/v1';

  // Fetch patient's doctors
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(`${API_BASE}/patients/myDoctors`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDoctors(res.data.data.doctors || []);
    } catch (err) {
      console.error('Failed to fetch doctors', err);
    }
  };

  // Select doctor and fetch conversation
  const selectDoctor = async (doctor) => {
    setSelectedDoctor(doctor);
    setShowChatList(false);

    try {
      const res = await axios.get(`${API_BASE}/messages/conv/${doctor._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(res.data.data.messages || []);
    } catch (err) {
      console.error('Failed to fetch messages', err);
      setMessages([]);
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedDoctor) return;

    try {
      const res = await axios.post(
        `${API_BASE}/messages/send`,
        {
          message: newMessage,
          receiverId: selectedDoctor._id
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages((prev) => [...prev, res.data.data.message]);
      setNewMessage('');
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <PatientLayout>
      <div
        className="d-flex h-100"
        style={{ minHeight: 'calc(100vh - 140px)' }}
      >
        {/* === Doctors List === */}
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
            <h5 className="mb-3 fw-bold text-white">Doctors</h5>
            <input
              type="text"
              className="form-control form-control-sm rounded-pill"
              placeholder="Search..."
              style={{ backgroundColor: '#f1f3f4' }}
            />
          </div>

          <div style={{ height: 'calc(100% - 90px)', overflowY: 'auto' }}>
            {doctors.length === 0 ? (
              <div className="text-center p-4 text-muted">No doctors found</div>
            ) : (
              doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  onClick={() => selectDoctor(doctor)}
                  className={`p-3 border-bottom d-flex align-items-center cursor-pointer transition-all ${
                    selectedDoctor?._id === doctor._id
                      ? 'bg-primary bg-opacity-10'
                      : 'hover-bg-light'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={doctor.photo || img}
                    alt={doctor.fullName}
                    className="rounded-circle me-3"
                    style={{ width: 48, height: 48, objectFit: 'cover' }}
                  />

                  <div className="flex-grow-1">
                    <strong className="d-block text-truncate">
                      DR. {doctor.fullName}
                    </strong>
                    <small className="d-block text-muted text-truncate">
                      {doctor.specialization || 'Doctor'}
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
          {selectedDoctor ? (
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
                  src={selectedDoctor.photo || img}
                  alt={selectedDoctor.fullName}
                  className="rounded-circle me-3"
                  style={{ width: 50, height: 50, objectFit: 'cover' }}
                />

                <div>
                  <strong className="d-block text-white">
                    {selectedDoctor.fullName}
                  </strong>
                  <small className="text-white fw-medium">
                    {selectedDoctor.active ? 'Online' : 'Offline'}
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
                        msg.sender === selectedDoctor._id
                          ? 'justify-content-start'
                          : 'justify-content-end'
                      }`}
                    >
                      <div
                        className={`p-3 rounded-3 shadow-sm ${
                          msg.sender === selectedDoctor._id
                            ? 'bg-white'
                            : 'text-white'
                        }`}
                        style={{
                          maxWidth: '70%',
                          borderRadius: '18px',
                          borderTopLeftRadius:
                            msg.sender === selectedDoctor._id ? '4px' : '18px',
                          borderTopRightRadius:
                            msg.sender === selectedDoctor._id ? '18px' : '4px',
                          backgroundColor:
                            msg.sender === selectedDoctor._id
                              ? '#ffffff'
                              : '#015D82'
                        }}
                      >
                        <p className="mb-1 text-break">
                          {msg.message || msg.text}
                        </p>
                        <small
                          className={
                            msg.sender === selectedDoctor._id
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
                No doctor selected
              </h4>
              <p className="text-muted">
                Choose a doctor from the list to start chatting
              </p>
            </div>
          )}
        </div>
      </div>
    </PatientLayout>
  );
};

export default PatientMessages;
