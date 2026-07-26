import express from 'express';
import {
  subscribe,
  unsubscribe,
  getAllSubscribers,
  deleteSubscriber
} from '../controllers/newsletterController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Routes publiques
router.post('/subscribe', subscribe);
router.post('/unsubscribe', unsubscribe);

// Routes admin
router.get('/subscribers', protect, adminOnly, getAllSubscribers);
router.delete('/:id', protect, adminOnly, deleteSubscriber);

export default router;
