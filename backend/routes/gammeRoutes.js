import express from 'express';
import {
  getGammes,
  getGammeBySlug,
  createGamme,
  updateGamme,
  deleteGamme,
  togglePromo,
  toggleGlobalPromo
} from '../controllers/gammeController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Routes publiques
router.get('/', getGammes);
router.get('/:slug', getGammeBySlug);

// Routes protégées (Admin)
router.post('/', protect, adminOnly, upload.single('image'), createGamme);
router.put('/:id', protect, adminOnly, upload.single('image'), updateGamme);
router.delete('/:id', protect, adminOnly, deleteGamme);
router.patch('/:id/toggle-promo', protect, adminOnly, togglePromo);
router.patch('/toggle-global-promo', protect, adminOnly, toggleGlobalPromo);

export default router;
