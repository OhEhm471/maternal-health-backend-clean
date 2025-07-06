import express from 'express';
import { body } from 'express-validator';

import auth from '../middlewares/authMiddleware.js';
import validateRequest from '../middlewares/validateRequest.js';

import {
  bookAppointment,
  getMyAppointments,
  getAllAppointments,
  updateAppointment,
  deleteAppointment
} from '../controllers/appointmentController.js';

const router = express.Router();

// 👩 Pregnant Woman: Book appointment
router.post(
  '/',
  auth,
  [
    body('appointmentDate').notEmpty().withMessage('Appointment date is required'),
    body('clinicName').notEmpty().withMessage('Clinic name is required'),
  ],
  validateRequest,
  bookAppointment
);

// 👤 Pregnant Woman: View her appointments
router.get('/my', auth, getMyAppointments);

// 🧑‍⚕️ Admin/Provider: View all appointments
router.get('/all', auth, getAllAppointments);

// 📝 Update an appointment
router.put('/:id', auth, updateAppointment);

// ❌ Delete an appointment
router.delete('/:id', auth, deleteAppointment);

export default router;
