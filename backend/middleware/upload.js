import multer from 'multer';
import path from 'path';
import { storage, cloudinary } from '../config/cloudinary.js';

// Configuration Multer avec Cloudinary
const upload = multer({
  storage: storage, // Utilise Cloudinary storage
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Format de fichier non supporté. Utilisez JPG, PNG ou WEBP.'));
    }
  }
});

// Fonction pour supprimer une image de Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  try {
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
      console.log(`✅ Image supprimée de Cloudinary: ${publicId}`);
    }
  } catch (error) {
    console.error('❌ Erreur suppression Cloudinary:', error.message);
  }
};

export default upload;
