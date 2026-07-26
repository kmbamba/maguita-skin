import { useState, useEffect } from 'react';
import { settingsService } from '../services/api';
import { DEFAULT_PROMO_CONFIG } from '../config/constants';

// Hook personnalisé pour charger la configuration promo depuis l'API
export const usePromoConfig = () => {
  const [promoConfig, setPromoConfig] = useState(DEFAULT_PROMO_CONFIG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromoConfig = async () => {
      try {
        const response = await settingsService.get();
        if (response.data && response.data.promo) {
          setPromoConfig(response.data.promo);
        }
      } catch (error) {
        console.error('Erreur chargement promo config:', error);
        // Garder les valeurs par défaut en cas d'erreur
      } finally {
        setLoading(false);
      }
    };

    fetchPromoConfig();
  }, []);

  return { promoConfig, loading };
};
