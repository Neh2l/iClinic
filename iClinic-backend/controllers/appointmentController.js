const Appointment = require('../models/appointmentModel');
const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Create new appointment (booking)
exports.bookAppointment = catchAsync(async (req, res, next) => {
  const { doctorId, date, time } = req.body;

  const doctor = await Doctor.findById(doctorId);
  if (!doctor) return next(new AppError('Doctor not found', 404));

  const appointment = await Appointment.create({
    doctor: doctorId,
    patient: req.user.id,
    date,
    time,
  });

  res.status(201).json({
    status: 'success',
    message: 'Appointment booked successfully!',
    data: { appointment },
  });
});

// Get all appointments for a patient
exports.getMyAppointments = catchAsync(async (req, res, next) => {
  const appointments = await Appointment.find({ patient: req.user.id })
    .populate('doctor', 'fullName email specialty')
    .sort({ date: 1 });

  res.status(200).json({
    status: 'success',
    results: appointments.length,
    data: { appointments },
  });
});

// Get all appointments for a doctor
exports.getDoctorAppointments = catchAsync(async (req, res, next) => {
  const appointments = await Appointment.find({ doctor: req.user.id })
    .populate('patient', 'name email phone')
    .sort({ date: 1 });

  res.status(200).json({
    status: 'success',
    results: appointments.length,
    data: { appointments },
  });
});

// Update appointment status (doctor/admin)
exports.updateAppointmentStatus = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true },
  );

  if (!appointment) return next(new AppError('Appointment not found', 404));

  res.status(200).json({
    status: 'success',
    message: 'Status updated successfully',
    data: { appointment },
  });
});
