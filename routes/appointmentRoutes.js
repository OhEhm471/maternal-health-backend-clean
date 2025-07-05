import express from 'express';
import { body } from 'express-validator';
import auth from '../middlewares/authMiddleware.js';
import validateRequest from '../middlewares/validateRequest.js';

import {
  bookAppointment,
  getMyAppointments,
  getAllAppointments
} from '../controllers/appointmentController.js';

const router = express.Router();

// Book appointment (pregnant women)
router.post(
  '/',
  auth,
  [
    body('date').notEmpty().withMessage('Appointment date is required'),
    body('clinicId').notEmpty().withMessage('Clinic ID is required')
  ],
  validateRequest,
  bookAppointment
);

// Get own appointments
router.get('/my', auth, getMyAppointments);

// Admin/provider: view all appointments
router.get('/all', auth, getAllAppointments);

export default router;
