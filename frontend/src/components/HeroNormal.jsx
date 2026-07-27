import { FaStar } from 'react-icons/fa';

const HeroNormal = () => {
  return (
    <div className="bg-gradient-to-r from-fuchsia-primary to-pink-600 text-white py-8 px-4">
      <div className="container mx-auto text-center">
        <div className="inline-block bg-gold-accent text-fuchsia-primary px-3 py-1 rounded-full text-xs md:text-sm font-bold mb-3">
          ✨ MAGUITA SKIN
        </div>
        
        <h1 className="text-2xl md:text-4xl font-bold mb-3">
          DES GAMMES COMPLÈTES POUR VOTRE BEAUTÉ
        </h1>
        
        <p className="text-base md:text-lg mb-4 max-w-2xl mx-auto">
          Découvrez nos gammes de produits cosmétiques de qualité supérieure, 
          spécialement conçues pour sublimer votre peau
        </p>

        <div className="flex items-center justify-center gap-2 text-lg md:text-xl font-bold">
          <FaStar className="text-gold-accent" />
          <span className="text-gold-accent">20 000 FCFA</span>
          <span className="text-xs md:text-sm font-normal opacity-90">par gamme complète</span>
        </div>
      </div>
    </div>
  );
};

export default HeroNormal;
