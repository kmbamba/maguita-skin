import Testimonial from '../models/Testimonial.js';
import Gamme from '../models/Gamme.js';

// @desc    Créer un nouveau témoignage
// @route   POST /api/testimonials
// @access  Public
export const createTestimonial = async (req, res) => {
  try {
    const { name, location, rating, comment, gamme } = req.body;

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

    const testimonial = await Testimonial.create({
      name,
      location,
      rating,
      comment,
      gamme,
      isApproved: false // Par défaut non approuvé
    });

    res.status(201).json({
      success: true,
      message: 'Témoignage soumis avec succès. Il sera publié après validation.',
      data: testimonial
    });
  } catch (error) {
    console.error('Erreur création témoignage:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du témoignage',
      error: error.message
    });
  }
};

// @desc    Obtenir tous les témoignages approuvés
// @route   GET /api/testimonials
// @access  Public
export const getApprovedTestimonials = async (req, res) => {
  try {
    const { gamme, featured, limit = 10 } = req.query;

    const filter = { isApproved: true };
    
    if (gamme) filter.gamme = gamme;
    if (featured === 'true') filter.isFeatured = true;

    const testimonials = await Testimonial.find(filter)
      .populate('gamme', 'name slug')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (error) {
    console.error('Erreur récupération témoignages:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des témoignages',
      error: error.message
    });
  }
};

// @desc    Obtenir tous les témoignages (Admin)
// @route   GET /api/testimonials/admin/all
// @access  Private/Admin
export const getAllTestimonials = async (req, res) => {
  try {
    console.log('💬 Récupération témoignages');
    
    const testimonials = await Testimonial.find()
      .populate('gamme', 'name slug')
      .sort({ createdAt: -1 });

    console.log('✅ Témoignages récupérés:', testimonials.length);

    res.json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (error) {
    console.error('❌ Erreur récupération tous témoignages:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des témoignages',
      error: error.message
    });
  }
};

// @desc    Approuver un témoignage
// @route   PATCH /api/testimonials/:id/approve
// @access  Private/Admin
export const approveTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Témoignage non trouvé'
      });
    }

    testimonial.isApproved = true;
    await testimonial.save();

    res.json({
      success: true,
      message: 'Témoignage approuvé',
      data: testimonial
    });
  } catch (error) {
    console.error('Erreur approbation témoignage:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'approbation du témoignage',
      error: error.message
    });
  }
};

// @desc    Marquer un témoignage comme mis en avant
// @route   PATCH /api/testimonials/:id/feature
// @access  Private/Admin
export const toggleFeaturedTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Témoignage non trouvé'
      });
    }

    testimonial.isFeatured = !testimonial.isFeatured;
    await testimonial.save();

    res.json({
      success: true,
      message: testimonial.isFeatured ? 'Témoignage mis en avant' : 'Témoignage retiré de la mise en avant',
      data: testimonial
    });
  } catch (error) {
    console.error('Erreur mise en avant témoignage:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise en avant du témoignage',
      error: error.message
    });
  }
};

// @desc    Supprimer un témoignage
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Témoignage non trouvé'
      });
    }

    await testimonial.deleteOne();

    res.json({
      success: true,
      message: 'Témoignage supprimé'
    });
  } catch (error) {
    console.error('Erreur suppression témoignage:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du témoignage',
      error: error.message
    });
  }
};
