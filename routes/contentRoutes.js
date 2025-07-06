import express from 'express';
import { body } from 'express-validator';

import auth from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdmin.js';
import validateRequest from '../middlewares/validateRequest.js';

import {
  createContent,
  getAllContent,
  getContentById,
  updateContent,
  deleteContent,
  getLatestContent,
} from '../controllers/contentController.js';

const router = express.Router();

// 🟢 Public: Get all content
router.get('/', getAllContent);

// 🟢 Public: Get latest content
router.get('/latest', getLatestContent);

// 🟢 Public: Get content by ID
router.get('/:id', getContentById);

// 🔒 Admin: Create content
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

// 🔒 Admin: Update content
router.put(
  '/:id',
  auth,
  isAdmin,
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('body').optional().notEmpty().withMessage('Content body cannot be empty')
  ],
  validateRequest,
  updateContent
);

// 🔒 Admin: Delete content
router.delete('/:id', auth, isAdmin, deleteContent);

export default router;
