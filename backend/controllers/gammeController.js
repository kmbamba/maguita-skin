import Gamme from '../models/Gamme.js';

// @desc    Récupérer toutes les gammes
// @route   GET /api/gammes
// @access  Public
export const getGammes = async (req, res) => {
  try {
    const { featured, inStock, category } = req.query;
    
    let filter = {};
    if (featured) filter.featured = featured === 'true';
    if (inStock) filter.inStock = inStock === 'true';
    if (category) filter.category = category;

    const gammes = await Gamme.find(filter).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: gammes.length,
      data: gammes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des gammes',
      error: error.message
    });
  }
};

// @desc    Récupérer une gamme par slug
// @route   GET /api/gammes/:slug
// @access  Public
export const getGammeBySlug = async (req, res) => {
  try {
    const gamme = await Gamme.findOne({ slug: req.params.slug });
    
    if (!gamme) {
      return res.status(404).json({
        success: false,
        message: 'Gamme non trouvée'
      });
    }

    res.json({
      success: true,
      data: gamme
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la gamme',
      error: error.message
    });
  }
};

// @desc    Créer une nouvelle gamme
// @route   POST /api/gammes
// @access  Private/Admin
export const createGamme = async (req, res) => {
  try {
    console.log('🎨 Tentative création gamme');
    console.log('Body reçu:', JSON.stringify(req.body, null, 2));
    
    const gammeData = { ...req.body };
    
    // Gérer includedItems (peut être string ou array après sanitization)
    if (typeof gammeData.includedItems === 'string') {
      gammeData.includedItems = gammeData.includedItems
        .split('\n')
        .map(item => item.trim())
        .filter(item => item.length > 0);
    }
    
    // Valider que includedItems est bien un array avec au moins un élément
    if (!Array.isArray(gammeData.includedItems) || gammeData.includedItems.length === 0) {
      console.error('❌ includedItems invalide ou vide');
      return res.status(400).json({
        success: false,
        message: 'Les articles inclus sont requis (au moins un)'
      });
    }
    
    // Convertir les prix en nombres si ce sont des strings
    if (typeof gammeData.regularPrice === 'string') {
      gammeData.regularPrice = parseFloat(gammeData.regularPrice);
    }
    if (typeof gammeData.promoPrice === 'string') {
      gammeData.promoPrice = parseFloat(gammeData.promoPrice);
    }
    
    // Convertir les booleans si ce sont des strings
    if (typeof gammeData.isPromoActive === 'string') {
      gammeData.isPromoActive = gammeData.isPromoActive === 'true';
    }
    if (typeof gammeData.inStock === 'string') {
      gammeData.inStock = gammeData.inStock === 'true';
    }
    if (typeof gammeData.featured === 'string') {
      gammeData.featured = gammeData.featured === 'true';
    }
    
    // Les images seront uploadées séparément via /upload/gamme/:id
    console.log('Données à sauvegarder:', JSON.stringify(gammeData, null, 2));
    
    const gamme = await Gamme.create(gammeData);
    
    console.log('✅ Gamme créée:', gamme._id);
    
    res.status(201).json({
      success: true,
      message: 'Gamme créée avec succès',
      data: gamme
    });
  } catch (error) {
    console.error('❌ Erreur création gamme:', error.message);
    console.error('Stack:', error.stack);
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la création de la gamme',
      error: error.message
    });
  }
};

// @desc    Mettre à jour une gamme
// @route   PUT /api/gammes/:id
// @access  Private/Admin
export const updateGamme = async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // Les images sont uploadées séparément via /upload/gamme/:id
    
    const gamme = await Gamme.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!gamme) {
      return res.status(404).json({
        success: false,
        message: 'Gamme non trouvée'
      });
    }

    res.json({
      success: true,
      message: 'Gamme mise à jour avec succès',
      data: gamme
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la mise à jour',
      error: error.message
    });
  }
};

// @desc    Supprimer une gamme
// @route   DELETE /api/gammes/:id
// @access  Private/Admin
export const deleteGamme = async (req, res) => {
  try {
    const gamme = await Gamme.findByIdAndDelete(req.params.id);

    if (!gamme) {
      return res.status(404).json({
        success: false,
        message: 'Gamme non trouvée'
      });
    }

    res.json({
      success: true,
      message: 'Gamme supprimée avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression',
      error: error.message
    });
  }
};

// @desc    Basculer le mode promo d'une gamme
// @route   PATCH /api/gammes/:id/toggle-promo
// @access  Private/Admin
export const togglePromo = async (req, res) => {
  try {
    const gamme = await Gamme.findById(req.params.id);

    if (!gamme) {
      return res.status(404).json({
        success: false,
        message: 'Gamme non trouvée'
      });
    }

    gamme.isPromoActive = !gamme.isPromoActive;
    await gamme.save();

    res.json({
      success: true,
      message: `Mode promo ${gamme.isPromoActive ? 'activé' : 'désactivé'}`,
      data: gamme
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors du basculement du mode promo',
      error: error.message
    });
  }
};

// @desc    Activer/Désactiver promo globale
// @route   PATCH /api/gammes/toggle-global-promo
// @access  Private/Admin
export const toggleGlobalPromo = async (req, res) => {
  try {
    const { isActive } = req.body;
    
    await Gamme.updateMany({}, { isPromoActive: isActive });
    
    const count = await Gamme.countDocuments();

    res.json({
      success: true,
      message: `Promo ${isActive ? 'activée' : 'désactivée'} pour toutes les gammes`,
      count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors du basculement global',
      error: error.message
    });
  }
};
