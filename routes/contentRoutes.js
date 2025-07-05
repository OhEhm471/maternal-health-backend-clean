import express from 'express';
import { body } from 'express-validator';

import auth from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdmin.js';
import validateRequest from '../middlewares/validateRequest.js';
import {
  createContent,
  getAllContent,
  deleteContent,
} from '../controllers/contentController.js';

const router = express.Router();

// Public: Get all content
router.get('/', getAllContent);

// Admin: Create content
router.post(
  '/',
  auth,
  isAdmin,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('body').notEmpty().withMessage('Content body is required')
  ],
  validateRequest,
  createContent
);

// Admin: Delete content
router.delete('/:id', auth, isAdmin, deleteContent);

export default router;
