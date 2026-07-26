import Gamme from '../models/Gamme.js';
import { deleteFromCloudinary } from '../middleware/upload.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// @desc    Upload images pour une gamme
// @route   POST /api/upload/gamme/:id
// @access  Private/Admin
export const uploadGammeImages = async (req, res) => {
  try {
    const gamme = await Gamme.findById(req.params.id);

    if (!gamme) {
      return res.status(404).json({
        success: false,
        message: 'Gamme non trouvée'
      });
    }

    // Récupérer les images uploadées
    const images = req.files.map(file => ({
      url: `/uploads/${file.filename}`,
      public_id: file.filename
    }));

    // Ajouter les nouvelles images
    gamme.images.push(...images);
    await gamme.save();

    res.json({
      success: true,
      message: `${images.length} image(s) uploadée(s)`,
      data: gamme
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'upload',
      error: error.message
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

    // Supprimer le fichier physique
    const image = gamme.images[imageIndex];
    if (image.public_id) {
      const filePath = path.join(__dirname, '../uploads', image.public_id);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
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
      url: `/uploads/${beforeFile.filename}`,
      public_id: beforeFile.filename
    };

    beforeAfter.afterImage = {
      url: `/uploads/${afterFile.filename}`,
      public_id: afterFile.filename
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
