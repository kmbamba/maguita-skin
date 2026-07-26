import BeforeAfter from '../models/BeforeAfter.js';
import Gamme from '../models/Gamme.js';

// @desc    Obtenir toutes les photos approuvées
// @route   GET /api/before-after
// @access  Public
export const getApprovedBeforeAfter = async (req, res) => {
  try {
    const { gamme, featured, limit = 20 } = req.query;

    const filter = { isApproved: true };
    
    if (gamme) filter.gamme = gamme;
    if (featured === 'true') filter.isFeatured = true;

    const beforeAfters = await BeforeAfter.find(filter)
      .populate('gamme', 'name slug')
      .sort({ order: 1, createdAt: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: beforeAfters.length,
      data: beforeAfters
    });
  } catch (error) {
    console.error('Erreur récupération before/after:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des photos',
      error: error.message
    });
  }
};

// @desc    Obtenir toutes les photos (Admin)
// @route   GET /api/before-after/admin/all
// @access  Private/Admin
export const getAllBeforeAfter = async (req, res) => {
  try {
    const beforeAfters = await BeforeAfter.find()
      .populate('gamme', 'name slug')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: beforeAfters.length,
      data: beforeAfters
    });
  } catch (error) {
    console.error('Erreur récupération toutes before/after:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des photos',
      error: error.message
    });
  }
};

// @desc    Créer une photo before/after (Admin)
// @route   POST /api/before-after
// @access  Private/Admin
export const createBeforeAfter = async (req, res) => {
  try {
    const { title, description, gamme, duration, customerName } = req.body;

    // Vérifier que la gamme existe si fournie
    if (gamme) {
      const gammeExists = await Gamme.findById(gamme);
      if (!gammeExists) {
        return res.status(404).json({
          success: false,
          message: 'Gamme non trouvée'
        });
      }
    }

    const beforeAfter = await BeforeAfter.create({
      title,
      description,
      gamme,
      duration,
      customerName,
      beforeImage: { url: '' }, // Sera mis à jour via upload
      afterImage: { url: '' }, // Sera mis à jour via upload
      isApproved: false
    });

    res.status(201).json({
      success: true,
      message: 'Before/After créé. Uploadez maintenant les images.',
      data: beforeAfter
    });
  } catch (error) {
    console.error('Erreur création before/after:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création',
      error: error.message
    });
  }
};

// @desc    Mettre à jour une photo before/after (Admin)
// @route   PUT /api/before-after/:id
// @access  Private/Admin
export const updateBeforeAfter = async (req, res) => {
  try {
    const beforeAfter = await BeforeAfter.findById(req.params.id);

    if (!beforeAfter) {
      return res.status(404).json({
        success: false,
        message: 'Before/After non trouvé'
      });
    }

    const { title, description, gamme, duration, customerName, order } = req.body;

    if (title) beforeAfter.title = title;
    if (description !== undefined) beforeAfter.description = description;
    if (gamme) beforeAfter.gamme = gamme;
    if (duration !== undefined) beforeAfter.duration = duration;
    if (customerName !== undefined) beforeAfter.customerName = customerName;
    if (order !== undefined) beforeAfter.order = order;

    await beforeAfter.save();

    res.json({
      success: true,
      message: 'Before/After mis à jour',
      data: beforeAfter
    });
  } catch (error) {
    console.error('Erreur mise à jour before/after:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour',
      error: error.message
    });
  }
};

// @desc    Approuver une photo before/after
// @route   PATCH /api/before-after/:id/approve
// @access  Private/Admin
export const approveBeforeAfter = async (req, res) => {
  try {
    const beforeAfter = await BeforeAfter.findById(req.params.id);

    if (!beforeAfter) {
      return res.status(404).json({
        success: false,
        message: 'Before/After non trouvé'
      });
    }

    beforeAfter.isApproved = !beforeAfter.isApproved;
    await beforeAfter.save();

    res.json({
      success: true,
      message: beforeAfter.isApproved ? 'Before/After approuvé' : 'Approbation retirée',
      data: beforeAfter
    });
  } catch (error) {
    console.error('Erreur approbation before/after:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'approbation',
      error: error.message
    });
  }
};

// @desc    Marquer comme mis en avant
// @route   PATCH /api/before-after/:id/feature
// @access  Private/Admin
export const toggleFeaturedBeforeAfter = async (req, res) => {
  try {
    const beforeAfter = await BeforeAfter.findById(req.params.id);

    if (!beforeAfter) {
      return res.status(404).json({
        success: false,
        message: 'Before/After non trouvé'
      });
    }

    beforeAfter.isFeatured = !beforeAfter.isFeatured;
    await beforeAfter.save();

    res.json({
      success: true,
      message: beforeAfter.isFeatured ? 'Before/After mis en avant' : 'Mise en avant retirée',
      data: beforeAfter
    });
  } catch (error) {
    console.error('Erreur mise en avant before/after:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise en avant',
      error: error.message
    });
  }
};

// @desc    Supprimer une photo before/after
// @route   DELETE /api/before-after/:id
// @access  Private/Admin
export const deleteBeforeAfter = async (req, res) => {
  try {
    const beforeAfter = await BeforeAfter.findById(req.params.id);

    if (!beforeAfter) {
      return res.status(404).json({
        success: false,
        message: 'Before/After non trouvé'
      });
    }

    await beforeAfter.deleteOne();

    res.json({
      success: true,
      message: 'Before/After supprimé'
    });
  } catch (error) {
    console.error('Erreur suppression before/after:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression',
      error: error.message
    });
  }
};
