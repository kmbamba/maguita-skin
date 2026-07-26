import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getOrderStats
} from '../controllers/orderController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Routes publiques
router.post('/', createOrder);

// Routes protégées (Admin)
router.get('/', protect, adminOnly, getOrders);
router.get('/stats', protect, adminOnly, getOrderStats);
router.get('/:id', protect, adminOnly, getOrderById);
router.patch('/:id/status', protect, adminOnly, updateOrderStatus);

export default router;
