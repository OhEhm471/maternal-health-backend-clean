import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import { saveClinic, findNearbyClinics } from '../controllers/clinicController.js';

const router = express.Router();

// Provider creates or updates their clinic
router.post('/', auth, saveClinic);

// Users find clinics near them
router.get('/nearby', findNearbyClinics);

export default router;
