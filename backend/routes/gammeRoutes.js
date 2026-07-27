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
router.post('/', protect, adminOnly, createGamme); // Pas d'upload ici, images uploadées séparément
router.put('/:id', protect, adminOnly, updateGamme); // Pas d'upload ici non plus
router.delete('/:id', protect, adminOnly, deleteGamme);
router.patch('/:id/toggle-promo', protect, adminOnly, togglePromo);
router.patch('/toggle-global-promo', protect, adminOnly, toggleGlobalPromo);

export default router;
