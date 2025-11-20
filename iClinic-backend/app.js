const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// Utils & Controllers
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// Routers
const patientRouter = require('./routers/patientRouter');
const doctorRouter = require('./routers/doctorRouter');
const adminRouter = require('./routers/adminRouter');
const appointmentRoutes = require('./routers/appointmentRoutes');
const msgRouter = require('./routers/msgRouter');

const app = express();

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same IP
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.options('*', cors());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS attacks
app.use(xss());

// Serve static files (optional)
app.use(express.static(`${__dirname}/public`));

// Add request timestamp
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

////////////////////////////////////////
// 2) ROUTES
////////////////////////////////////////

app.use('/api/v1/patients', patientRouter);
app.use('/api/v1/doctors', doctorRouter);
app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/messages', msgRouter);

////////////////////////////////////////
// 3) UNHANDLED ROUTES
////////////////////////////////////////

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

////////////////////////////////////////
// 4) GLOBAL ERROR HANDLER
////////////////////////////////////////

app.use(globalErrorHandler);

module.exports = app;
