import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import { triggerSOS } from '../controllers/sosController.js';

const router = express.Router();

router.post('/trigger', auth, triggerSOS);

export default router;
