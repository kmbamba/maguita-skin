import Gamme from '../models/Gamme.js';
import { deleteFromCloudinary } from '../middleware/upload.js';

// @desc    Upload images pour une gamme
// @route   POST /api/upload/gamme/:id
// @access  Private/Admin
export const uploadGammeImages = async (req, res) => {
  try {
    console.log('📥 Upload request received for gamme:', req.params.id);
    console.log('📁 Files received:', req.files ? req.files.length : 0);
    console.log('🔄 Replace mode:', req.query.replace === 'true');
    
    const gamme = await Gamme.findById(req.params.id);

    if (!gamme) {
      console.error('❌ Gamme not found:', req.params.id);
      return res.status(404).json({
        success: false,
        message: 'Gamme non trouvée'
      });
    }

    if (!req.files || req.files.length === 0) {
      console.error('❌ No files in request');
      return res.status(400).json({
        success: false,
        message: 'Aucune image reçue'
      });
    }

    // Récupérer les images uploadées sur Cloudinary
    const images = req.files.map(file => {
      console.log('✅ Processing file:', file.originalname, '-> Cloudinary URL:', file.path);
      return {
        url: file.path, // URL Cloudinary
        public_id: file.filename // Public ID Cloudinary
      };
    });

    // Si replace=true, remplacer toutes les images, sinon ajouter
    if (req.query.replace === 'true') {
      console.log('🔄 Replacing all images');
      // TODO: Supprimer les anciennes images de Cloudinary
      gamme.images = images;
    } else {
      console.log('➕ Adding images to existing');
      gamme.images.push(...images);
    }
    
    await gamme.save();

    console.log('✅ Upload successful:', images.length, 'images');

    res.json({
      success: true,
      message: `${images.length} image(s) uploadée(s)`,
      data: gamme
    });
  } catch (error) {
    console.error('❌ Upload error:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'upload',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// @desc    Supprimer une image d'une gamme
// @route   DELETE /api/upload/gamme/:gammeId/image/:imageId
// @access  Private/Admin
export const deleteGammeImage = async (req, res) => {
  try {
    const gamme = await Gamme.findById(req.params.gammeId);

    if (!gamme) {
      return res.status(404).json({
        success: false,
        message: 'Gamme non trouvée'
      });
    }

    const imageIndex = gamme.images.findIndex(
      img => img._id.toString() === req.params.imageId
    );

    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Image non trouvée'
      });
    }

    // Supprimer de Cloudinary
    const image = gamme.images[imageIndex];
    if (image.public_id) {
      await deleteFromCloudinary(image.public_id);
    }

    // Supprimer du tableau
    gamme.images.splice(imageIndex, 1);
    await gamme.save();

    res.json({
      success: true,
      message: 'Image supprimée avec succès',
      data: gamme
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression',
      error: error.message
    });
  }
};

// @desc    Upload images Before/After
// @route   POST /api/upload/before-after/:id
// @access  Private/Admin
export const uploadBeforeAfterImages = async (req, res) => {
  try {
    const BeforeAfter = (await import('../models/BeforeAfter.js')).default;
    const beforeAfter = await BeforeAfter.findById(req.params.id);

    if (!beforeAfter) {
      return res.status(404).json({
        success: false,
        message: 'Before/After non trouvé'
      });
    }

    // Les fichiers doivent être envoyés avec les champs 'before' et 'after'
    if (!req.files || req.files.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez uploader 2 images (avant et après)'
      });
    }

    // On suppose que le premier fichier est "avant" et le deuxième "après"
    const [beforeFile, afterFile] = req.files;

    beforeAfter.beforeImage = {
      url: beforeFile.path, // URL Cloudinary
      public_id: beforeFile.filename // Public ID Cloudinary
    };

    beforeAfter.afterImage = {
      url: afterFile.path, // URL Cloudinary
      public_id: afterFile.filename // Public ID Cloudinary
    };

    await beforeAfter.save();

    res.json({
      success: true,
      message: 'Images Before/After uploadées avec succès',
      data: beforeAfter
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'upload',
      error: error.message
    });
  }
};
