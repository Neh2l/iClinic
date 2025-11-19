const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');

dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.error('💥 UNCAUGHT EXCEPTION 💥');
  console.error(err.name, err.message);
  process.exit(1);
});

//////////////////////////////////////////
// 3) DATABASE CONNECTION
//////////////////////////////////////////
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected successfully'))
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

//////////////////////////////////////////
// 4) CREATE SERVER (HTTP + SOCKET.IO)
//////////////////////////////////////////
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  },
});
app.set('io', io);

//////////////////////////////////////////
// 5) SOCKET.IO EVENTS
//////////////////////////////////////////
io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on('driverStatusUpdated', (data) => {
    console.log('Driver status update received:', data);

    io.emit('dashboardUpdate', data);
  });

  socket.on('patientAssigned', (data) => {
    console.log('New patient assigned to doctor:', data);
    io.emit('doctorPatientUpdate', data);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// 6) START SERVER
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

// 7) HANDLE UNHANDLED PROMISE REJECTIONS
process.on('unhandledRejection', (err) => {
  console.error('💥 UNHANDLED REJECTION 💥');
  console.error(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
