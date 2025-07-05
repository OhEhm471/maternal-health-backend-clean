import express from 'express';
import { body } from 'express-validator';

import { register, login, getProfile } from '../controllers/authController.js';
import auth from '../middlewares/authMiddleware.js';
import validateRequest from '../middlewares/validateRequest.js';

const router = express.Router();

// Register route
router.post(
  '/register',
  [
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').isIn(['pregnant_woman', 'provider', 'admin']).withMessage('Invalid role')
  ],
  validateRequest,
  register
);

// Login route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validateRequest,
  login
);

// Get profile
router.get('/me', auth, getProfile);

export default router;
