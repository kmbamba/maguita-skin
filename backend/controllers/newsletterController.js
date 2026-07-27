import Newsletter from '../models/Newsletter.js';

// @desc    S'inscrire à la newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'L\'email est requis'
      });
    }

    // Vérifier si l'email existe déjà
    let subscriber = await Newsletter.findOne({ email });

    if (subscriber) {
      if (subscriber.isActive) {
        return res.status(400).json({
          success: false,
          message: 'Cet email est déjà inscrit à la newsletter'
        });
      } else {
        // Réactiver l'inscription
        subscriber.isActive = true;
        subscriber.subscribedAt = Date.now();
        subscriber.unsubscribedAt = undefined;
        await subscriber.save();

        return res.json({
          success: true,
          message: 'Votre inscription a été réactivée avec succès!'
        });
      }
    }

    // Créer nouvelle inscription
    subscriber = await Newsletter.create({ email });

    res.status(201).json({
      success: true,
      message: 'Merci de vous être inscrit à notre newsletter! 🎉',
      data: subscriber
    });
  } catch (error) {
    console.error('Erreur inscription newsletter:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'inscription',
      error: error.message
    });
  }
};

// @desc    Se désinscrire de la newsletter
// @route   POST /api/newsletter/unsubscribe
// @access  Public
export const unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'L\'email est requis'
      });
    }

    const subscriber = await Newsletter.findOne({ email });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Email non trouvé dans notre liste'
      });
    }

    if (!subscriber.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Cet email est déjà désinscrit'
      });
    }

    subscriber.isActive = false;
    subscriber.unsubscribedAt = Date.now();
    await subscriber.save();

    res.json({
      success: true,
      message: 'Vous avez été désinscrit de notre newsletter'
    });
  } catch (error) {
    console.error('Erreur désinscription newsletter:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la désinscription',
      error: error.message
    });
  }
};

// @desc    Obtenir tous les inscrits (Admin)
// @route   GET /api/newsletter/subscribers
// @access  Private/Admin
export const getAllSubscribers = async (req, res) => {
  try {
    console.log('📧 Récupération newsletters');
    const { active } = req.query;

    const filter = {};
    if (active === 'true') filter.isActive = true;
    if (active === 'false') filter.isActive = false;

    const subscribers = await Newsletter.find(filter).sort({ createdAt: -1 });

    const stats = {
      total: await Newsletter.countDocuments(),
      active: await Newsletter.countDocuments({ isActive: true }),
      inactive: await Newsletter.countDocuments({ isActive: false })
    };

    console.log('✅ Newsletters récupérées:', subscribers.length);

    res.json({
      success: true,
      count: subscribers.length,
      stats,
      data: subscribers
    });
  } catch (error) {
    console.error('❌ Erreur récupération inscrits:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des inscrits',
      error: error.message
    });
  }
};

// @desc    Supprimer un inscrit (Admin)
// @route   DELETE /api/newsletter/:id
// @access  Private/Admin
export const deleteSubscriber = async (req, res) => {
  try {
    const subscriber = await Newsletter.findById(req.params.id);

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Inscrit non trouvé'
      });
    }

    await subscriber.deleteOne();

    res.json({
      success: true,
      message: 'Inscrit supprimé'
    });
  } catch (error) {
    console.error('Erreur suppression inscrit:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression',
      error: error.message
    });
  }
};
