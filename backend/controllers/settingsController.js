import Settings from '../models/Settings.js';

// Récupérer les paramètres (publique - accessible sans auth)
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne({ settingsId: 'global' });
    
    // Si pas de settings, créer avec valeurs par défaut
    if (!settings) {
      settings = await Settings.create({
        settingsId: 'global',
        promo: {
          name: 'PROMO MAGAL',
          nameFull: 'MEGA PROMO MAGAL',
          emoji: '🔥'
        }
      });
    }
    
    res.json(settings);
  } catch (error) {
    console.error('Erreur récupération settings:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Mettre à jour les paramètres (admin seulement)
export const updateSettings = async (req, res) => {
  try {
    const { promo } = req.body;
    
    let settings = await Settings.findOne({ settingsId: 'global' });
    
    if (!settings) {
      // Créer si n'existe pas
      settings = await Settings.create({
        settingsId: 'global',
        promo
      });
    } else {
      // Mettre à jour
      settings.promo = {
        name: promo.name || settings.promo.name,
        nameFull: promo.nameFull || settings.promo.nameFull,
        emoji: promo.emoji || settings.promo.emoji
      };
      await settings.save();
    }
    
    res.json({ 
      message: 'Paramètres mis à jour avec succès',
      settings 
    });
  } catch (error) {
    console.error('Erreur mise à jour settings:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
