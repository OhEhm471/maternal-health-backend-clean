import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import { checkSymptoms } from '../controllers/symptomController.js';

const router = express.Router();

router.post('/check', auth, checkSymptoms);

export default router;

