// src/pages/doctor/dashboard/DoctorMessages.jsx
import React, { useState, useEffect, useRef } from 'react';
import DoctorLayout from '../DoctorLayout';
import img from '../../../images/Face.png';

const doctorsData = [
  {
    id: 1,
    name: 'Dr. Jessica Venkata',
    specialty: 'Cardiologist',
    isOnline: true,
    lastMessage: 'Experienced surgeon',
    isTyping: true,
    messages: [
      { id: 1, text: 'nice to meet u', time: '12:00AM', isSent: false },
      { id: 2, text: 'okey', time: '12:00AM', isSent: false },
      { id: 3, text: 'send me at 12 am', time: '12:00AM', isSent: false },
      { id: 4, text: 'Experienced surgeon', time: '12:00AM', isSent: false },
      {
        id: 5,
        text: 'Cardiologist with 12 years of experience in preventive cardiology and interventional procedures.',
        time: '12:00AM',
        isSent: true
      }
    ]
  },
  {
    id: 2,
    name: 'Dr. Ahmed Ali',
    specialty: 'Neurologist',
    isOnline: true,
    lastMessage: 'See you tomorrow',
    isTyping: false,
    messages: [
      { id: 1, text: 'Hello Doctor', time: '11:30AM', isSent: false },
      { id: 2, text: 'How can I help you?', time: '11:32AM', isSent: true },
      { id: 3, text: 'I have headache', time: '11:33AM', isSent: false }
    ]
  },
  {
    id: 3,
    name: 'Dr. Sarah Mohamed',
    specialty: 'Pediatrician',
    isOnline: false,
    lastMessage: 'Thanks for the advice',
    isTyping: false,
    messages: [
      { id: 1, text: 'My child has fever', time: '09:15AM', isSent: false },
      {
        id: 2,
        text: 'Give paracetamol every 6 hours',
        time: '09:17AM',
        isSent: true
      }
    ]
  }
];

const DoctorMessages = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null); // null في البداية
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showChatList, setShowChatList] = useState(true);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Typing animation
  useEffect(() => {
    if (!selectedDoctor?.isTyping) {
      setTyping(false);
      return;
    }
    const interval = setInterval(() => setTyping((t) => !t), 1500);
    return () => clearInterval(interval);
  }, [selectedDoctor?.isTyping]);

  const selectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setMessages(doctor.messages);
    setShowChatList(false); // إخفاء القايمة على الموبايل
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      isSent: true
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage('');

    // Update last message
    doctorsData.forEach((d) => {
      if (d.id === selectedDoctor.id) {
        d.lastMessage = newMessage;
        d.isTyping = false;
      }
    });
    setSelectedDoctor((prev) => ({
      ...prev,
      lastMessage: newMessage,
      isTyping: false
    }));
  };

  return (
    <DoctorLayout>
      <div
        className="d-flex h-100"
        style={{ minHeight: 'calc(100vh - 140px)' }}
      >
        {/* === Chat List === */}
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
            <h5 className="mb-3 fw-bold text-white">Messages</h5>
            <input
              type="text"
              className="form-control form-control-sm rounded-pill"
              placeholder="Search..."
              style={{ backgroundColor: '#f1f3f4' }}
            />
          </div>
          <div style={{ height: 'calc(100% - 90px)', overflowY: 'auto' }}>
            {doctorsData.map((doctor) => (
              <div
                key={doctor.id}
                onClick={() => selectDoctor(doctor)}
                className={`p-3 border-bottom d-flex align-items-center cursor-pointer transition-all ${
                  selectedDoctor?.id === doctor.id
                    ? 'bg-primary bg-opacity-10'
                    : 'hover-bg-light'
                }`}
              >
                <div className="position-relative">
                  <img
                    src={img}
                    alt={doctor.name}
                    className="rounded-circle me-3"
                    style={{ width: 48, height: 48, objectFit: 'cover' }}
                  />
                  {doctor.isOnline && (
                    <span
                      className="position-absolute bottom-0 end-0 rounded-circle border border-3 border-white"
                      style={{
                        width: 14,
                        height: 14,
                        backgroundColor: '#015D82'
                      }}
                    />
                  )}
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <strong
                      className="d-block text-truncate"
                      style={{ maxWidth: '180px' }}
                    >
                      {doctor.name}
                    </strong>
                    <small className="text-muted">now</small>
                  </div>
                  <small
                    className={`d-block text-truncate ${
                      doctor.isTyping ? 'text-primary' : 'text-muted'
                    }`}
                    style={{ maxWidth: '180px' }}
                  >
                    {doctor.isTyping ? 'Typing...' : doctor.lastMessage}
                  </small>
                </div>
              </div>
            ))}
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
                  Back
                </button>
                <img
                  src={img}
                  alt={selectedDoctor.name}
                  className="rounded-circle me-3"
                  style={{ width: 50, height: 50, objectFit: 'cover' }}
                />
                <div>
                  <strong className="d-block text-white">
                    {selectedDoctor.name}
                  </strong>
                  <small className="text-white fw-medium">
                    {selectedDoctor.isOnline ? 'Online' : 'Offline'}
                  </small>
                </div>
              </div>

              {/* Messages */}
              <div
                className="flex-grow-1 p-3 overflow-y-auto"
                style={{
                  backgroundColor: '#f5f5f5',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='chatBg' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Crect width='100' height='100' fill='%23f5f5f5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23chatBg)'/%3E%3C/svg%3E")`
                }}
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`d-flex mb-3 ${
                      msg.isSent
                        ? 'justify-content-end'
                        : 'justify-content-start'
                    }`}
                  >
                    <div
                      className={`p-3 rounded-3 shadow-sm ${
                        msg.isSent ? 'text-white' : 'bg-white'
                      }`}
                      style={{
                        maxWidth: '70%',
                        borderRadius: '18px',
                        borderTopLeftRadius: msg.isSent ? '18px' : '4px',
                        borderTopRightRadius: msg.isSent ? '4px' : '18px',
                        backgroundColor: msg.isSent ? '#015D82' : '#ffffff'
                      }}
                    >
                      <p className="mb-1 text-break">{msg.text}</p>
                      <small
                        className={
                          msg.isSent ? 'text-white opacity-75' : 'text-muted'
                        }
                      >
                        Today, {msg.time}
                      </small>
                    </div>
                  </div>
                ))}

                {typing && (
                  <div className="d-flex mb-3">
                    <div
                      className="p-3 rounded-3 bg-white shadow-sm"
                      style={{
                        maxWidth: '70%',
                        borderRadius: '18px',
                        borderTopLeftRadius: '4px'
                      }}
                    >
                      <small
                        className="text-primary"
                        style={{ color: '#015D82' }}
                      >
                        {selectedDoctor.name.split(' ')[1]} is typing
                        <span className="typing-dots ms-1">
                          <span>.</span>
                          <span>.</span>
                          <span>.</span>
                        </span>
                      </small>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input + Send Icon */}
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
                    className="d-flex align-items-center justify-content-center rounded-circle cursor-pointer transition-all shadow-sm"
                    style={{
                      width: 48,
                      height: 48,
                      backgroundColor: newMessage.trim() ? '#015D82' : '#ccc',
                      pointerEvents: newMessage.trim() ? 'auto' : 'none'
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
            /* === No Chat Selected === */
            <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center px-4">
              <div className="mb-4">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#015D82"
                  strokeWidth="1.5"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h4 className="mb-2" style={{ color: '#015D82' }}>
                No conversation selected
              </h4>
              <p className="text-muted">
                Choose a doctor from the list to start chatting
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .cursor-pointer {
          cursor: pointer;
        }
        .transition-all {
          transition: all 0.2s ease;
        }
        .hover-bg-light:hover {
          background-color: #f0f0f0 !important;
        }
        .typing-dots span {
          animation: blink 1.4s infinite both;
          font-weight: bold;
          color: #015d82;
        }
        .typing-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 0.3;
          }
          20% {
            opacity: 1;
          }
        }
        @media (max-width: 992px) {
          .border-end {
            border-right: none !important;
            border-bottom: 1px solid #dee2e6;
          }
        }
      `}</style>
    </DoctorLayout>
  );
};

export default DoctorMessages;
