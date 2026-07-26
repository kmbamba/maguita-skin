import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Route publique - accessible sans auth (pour le frontend)
router.get('/', getSettings);

// Route protégée - admin seulement
router.put('/', protect, updateSettings);

export default router;
