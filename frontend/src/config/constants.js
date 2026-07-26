// Configuration centralisée de l'application
// VITE_API_URL contient déjà "/api" donc on l'utilise directement
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const API_BASE_URL = API_URL.replace('/api', ''); // Enlever /api pour avoir juste le domaine
export const UPLOADS_URL = `${API_BASE_URL}/uploads`;
export const SITE_URL = import.meta.env.VITE_SITE_URL || 'http://localhost:5173';

// Helper pour construire les URLs d'images
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_BASE_URL}${imagePath}`;
};

// Configuration WhatsApp
export const WHATSAPP_NUMBER = '+221710469241';
export const getWhatsAppUrl = (message) => {
  return `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(message)}`;
};

// Configuration Promo - Valeurs par défaut (seront remplacées par l'API)
// Ces valeurs sont utilisées uniquement comme fallback si l'API ne répond pas
export const DEFAULT_PROMO_CONFIG = {
  name: 'PROMO MAGAL',           
  nameFull: 'MEGA PROMO MAGAL',  
  emoji: '🔥',                    
};

// Le vrai PROMO_CONFIG sera chargé depuis l'API via un hook React
// Voir usePromoConfig dans les composants
export const PROMO_CONFIG = DEFAULT_PROMO_CONFIG;

