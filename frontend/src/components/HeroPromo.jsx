import { FaClock } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { usePromoConfig } from '../hooks/usePromoConfig';

const HeroPromo = ({ isPromoActive = false, promoCount = 0, totalCount = 0 }) => {
  const { promoConfig } = usePromoConfig();
  // Ne pas afficher la bannière si la promo n'est pas active
  if (!isPromoActive) {
    return null;
  }

  // Déterminer le texte selon si toutes les gammes ou seulement certaines sont en promo
  const allInPromo = promoCount === totalCount;
  const promoTitle = allInPromo 
    ? "TOUTES LES GAMMES EN PROMO" 
    : `${promoCount} GAMME${promoCount > 1 ? 'S' : ''} EN PROMO`;

  return (
    <div className="bg-gradient-to-r from-fuchsia-primary to-pink-600 text-white py-8 px-4">
      <div className="container mx-auto text-center">
        <div className="inline-block bg-gold-accent text-fuchsia-primary px-4 py-1 rounded-full text-sm font-bold mb-4 animate-pulse">
          {promoConfig.emoji} MEGA {promoConfig.name}
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          {promoTitle}
        </h2>
        
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-2xl md:text-3xl line-through opacity-70">
            20 000 FCFA
          </span>
          <span className="text-4xl md:text-6xl font-bold text-gold-accent">
            15 000 FCFA
          </span>
        </div>

        <p className="text-lg md:text-xl mb-6">
          Économisez <span className="font-bold text-gold-accent">5 000 FCFA</span> sur {allInPromo ? 'chaque gamme' : 'les gammes en promo'} !
        </p>

        <div className="flex items-center justify-center gap-2 text-sm md:text-base">
          <FaClock className="animate-pulse" />
          <span>Offre limitée - Profitez-en maintenant !</span>
        </div>
      </div>
    </div>
  );
};

HeroPromo.propTypes = {
  isPromoActive: PropTypes.bool,
  promoCount: PropTypes.number,
  totalCount: PropTypes.number
};

export default HeroPromo;
