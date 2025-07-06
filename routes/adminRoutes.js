import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdmin.js';
import {
  getAllUsers,
  toggleUserBlock,
  getMetrics,
  getAllClinics,
  updateClinic,
  getAllAppointments,
  getAllSOSAlerts,
} from '../controllers/adminController.js';

const router = express.Router();

// 🔐 Admin Guard for All Routes
router.use(auth, isAdmin);

// 📊 Platform Metrics
router.get('/metrics', getMetrics);

// 👤 Users Management
router.get('/users', getAllUsers);
router.put('/users/:id/block', toggleUserBlock);

// 🏥 Clinics
router.get('/clinics', getAllClinics);
router.put('/clinics/:id', updateClinic);

// 📅 Appointments
router.get('/appointments', getAllAppointments);

// 🚨 SOS Alerts
router.get('/sos-alerts', getAllSOSAlerts);

export default router;
