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
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.json({ message: `User ${user.isBlocked ? 'blocked' : 'unblocked'}` });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user status' });
  }
};

// Platform stats
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

// View all clinics
export const getAllClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find().populate('providerId', 'fullName email');
    res.json(clinics);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch clinics' });
  }
};

// Update clinic info
export const updateClinic = async (req, res) => {
  try {
    const clinic = await Clinic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Clinic updated', clinic });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update clinic' });
  }
};
