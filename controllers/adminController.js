import User from '../models/User.js';
import Clinic from '../models/Clinic.js';
import Appointment from '../models/Appointment.js';
import SOS from '../models/SOS.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// Block/unblock user
export const toggleUserBlock = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isBlocked = !user.isBlocked;
    await user.save();
    res.json({ message: `User ${user.isBlocked ? 'blocked' : 'unblocked'}` });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user status' });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

// Platform metrics
export const getMetrics = async (req, res) => {
  try {
    const [users, providers, appointments, sos] = await Promise.all([
      User.countDocuments({ role: 'pregnant_woman' }),
      User.countDocuments({ role: 'provider' }),
      Appointment.countDocuments(),
      SOS.countDocuments(),
    ]);

    res.json({
      totalUsers: users,
      totalProviders: providers,
      totalAppointments: appointments,
      totalSOSRequests: sos,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch metrics' });
  }
};

// Get all clinics
export const getAllClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find().populate('providerId', 'fullName email');
    res.json(clinics);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch clinics' });
  }
};

// Update a clinic
export const updateClinic = async (req, res) => {
  try {
    const clinic = await Clinic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Clinic updated', clinic });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update clinic' });
  }
};

// Delete a clinic
export const deleteClinic = async (req, res) => {
  try {
    const deleted = await Clinic.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Clinic not found' });
    res.json({ message: 'Clinic deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete clinic' });
  }
};

// Get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('userId', 'fullName phoneNumber');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch appointments' });
  }
};

// Delete an appointment
export const deleteAppointment = async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete appointment' });
  }
};

// Get all SOS alerts
export const getAllSOSAlerts = async (req, res) => {
  try {
    const sosAlerts = await SOS.find().populate('userId', 'fullName phoneNumber location');
    res.json(sosAlerts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch SOS alerts' });
  }
};

// Delete an SOS alert
export const deleteSOSAlert = async (req, res) => {
  try {
    const deleted = await SOS.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'SOS alert not found' });
    res.json({ message: 'SOS alert deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete SOS alert' });
  }
};
