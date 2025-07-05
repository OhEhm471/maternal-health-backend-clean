import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdmin.js';
import {
  getAllUsers,
  toggleUserBlock,
  getMetrics,
  getAllClinics,
  updateClinic
} from '../controllers/adminController.js';

const router = express.Router();

// Apply auth + admin guard to all routes
router.use(auth, isAdmin);

router.get('/users', getAllUsers);
router.put('/users/:id/block', toggleUserBlock);

router.get('/metrics', getMetrics);

router.get('/clinics', getAllClinics);
router.put('/clinics/:id', updateClinic);

export default router;
