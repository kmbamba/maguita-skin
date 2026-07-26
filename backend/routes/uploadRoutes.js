import express from 'express';
import upload from '../middleware/upload.js';
import { uploadGammeImages, deleteGammeImage, uploadBeforeAfterImages } from '../controllers/uploadController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post(
  '/gamme/:id',
  protect,
  adminOnly,
  upload.array('images', 5),
  uploadGammeImages
);

router.delete(
  '/gamme/:gammeId/image/:imageId',
  protect,
  adminOnly,
  deleteGammeImage
);

router.post(
  '/before-after/:id',
  protect,
  adminOnly,
  upload.array('images', 2),
  uploadBeforeAfterImages
);

export default router;
