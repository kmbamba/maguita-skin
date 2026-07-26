import express from 'express';
import {
  createTestimonial,
  getApprovedTestimonials,
  getAllTestimonials,
  approveTestimonial,
  toggleFeaturedTestimonial,
  deleteTestimonial
} from '../controllers/testimonialController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Routes publiques
router.post('/', createTestimonial);
router.get('/', getApprovedTestimonials);

// Routes admin
router.get('/admin/all', protect, adminOnly, getAllTestimonials);
router.patch('/:id/approve', protect, adminOnly, approveTestimonial);
router.patch('/:id/feature', protect, adminOnly, toggleFeaturedTestimonial);
router.delete('/:id', protect, adminOnly, deleteTestimonial);

export default router;
