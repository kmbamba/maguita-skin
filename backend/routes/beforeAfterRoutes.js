import express from 'express';
import {
  getApprovedBeforeAfter,
  getAllBeforeAfter,
  createBeforeAfter,
  updateBeforeAfter,
  approveBeforeAfter,
  toggleFeaturedBeforeAfter,
  deleteBeforeAfter
} from '../controllers/beforeAfterController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Routes publiques
router.get('/', getApprovedBeforeAfter);

// Routes admin
router.get('/admin/all', protect, adminOnly, getAllBeforeAfter);
router.post('/', protect, adminOnly, createBeforeAfter);
router.put('/:id', protect, adminOnly, updateBeforeAfter);
router.patch('/:id/approve', protect, adminOnly, approveBeforeAfter);
router.patch('/:id/feature', protect, adminOnly, toggleFeaturedBeforeAfter);
router.delete('/:id', protect, adminOnly, deleteBeforeAfter);

export default router;
