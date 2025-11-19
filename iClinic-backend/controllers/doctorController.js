const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const mapFullName = (body) => {
  if (body.fullName) body.name = body.fullName;
  return body;
};

// Get all doctors
exports.getAllDoctors = catchAsync(async (req, res, next) => {
  const doctors = await Doctor.find().populate(
    'patients',
    'name email phone patientDisease'
  );

  res.status(200).json({
    status: 'success',
    results: doctors.length,
    data: { doctors }
  });
});

// Get current doctor
exports.getMe = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findById(req.user._id).populate({
    path: 'patients',
    select: 'name email phone patientDisease photo'
  });

  if (!doctor) return next(new AppError('Doctor not found', 404));

  res.status(200).json({
    status: 'success',
    data: { doctor }
  });
});

// Update doctor profile (except password)
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  mapFullName(req.body);

  const filteredBody = filterObj(
    req.body,
    'name',
    'clinicName',
    'email',
    'phone',
    'photo',
    'location',
    'rate'
  );

  const updatedDoctor = await Doctor.findByIdAndUpdate(
    req.user._id,
    filteredBody,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: 'success',
    data: { doctor: updatedDoctor }
  });
});

// Soft delete doctor
exports.deleteMe = catchAsync(async (req, res, next) => {
  await Doctor.findByIdAndUpdate(req.user._id, { active: false });
  res.status(204).json({ status: 'success', data: null });
});

// Add patient to doctor (fixed: no passwordConfirm issue)
exports.addPatientToDoctor = catchAsync(async (req, res, next) => {
  const { patientId } = req.body;

  const doctor = await Doctor.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { patients: patientId } }, // ensures no duplicates
    { new: true }
  );

  const patient = await Patient.findByIdAndUpdate(
    patientId,
    { $addToSet: { doctors: req.user._id } },
    { new: true }
  );

  if (!doctor || !patient)
    return next(new AppError('Doctor or Patient not found', 404));

  res.status(200).json({
    status: 'success',
    message: 'Patient added successfully',
    data: { doctor }
  });
});

// Remove patient from doctor
exports.removePatientFromDoctor = catchAsync(async (req, res, next) => {
  const { patientId } = req.body;

  const doctor = await Doctor.findByIdAndUpdate(
    req.user._id,
    { $pull: { patients: patientId } },
    { new: true }
  );

  const patient = await Patient.findByIdAndUpdate(
    patientId,
    { $pull: { doctors: req.user._id } },
    { new: true }
  );

  if (!doctor || !patient)
    return next(new AppError('Doctor or Patient not found', 404));

  res.status(200).json({
    status: 'success',
    message: 'Patient removed successfully'
  });
});

// Get all patients of the doctor
exports.getMyPatients = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findById(req.user._id).populate(
    'patients',
    'name email phone patientDisease'
  );

  if (!doctor) return next(new AppError('Doctor not found', 404));

  res.status(200).json({
    status: 'success',
    results: doctor.patients.length,
    data: { patients: doctor.patients }
  });
});
