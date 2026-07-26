import { FaStar } from 'react-icons/fa';

const HeroNormal = () => {
  return (
    <div className="bg-gradient-to-r from-fuchsia-primary to-pink-600 text-white py-12 px-4">
      <div className="container mx-auto text-center">
        <div className="inline-block bg-gold-accent text-fuchsia-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
          ✨ MAGUITA SKIN
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          DES GAMMES COMPLÈTES POUR VOTRE BEAUTÉ
        </h1>
        
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          Découvrez nos gammes de produits cosmétiques de qualité supérieure, 
          spécialement conçues pour sublimer votre peau
        </p>

        <div className="flex items-center justify-center gap-2 text-xl md:text-2xl font-bold">
          <FaStar className="text-gold-accent" />
          <span className="text-gold-accent">20 000 FCFA</span>
          <span className="text-sm font-normal opacity-90">par gamme complète</span>
        </div>
      </div>
    </div>
  );
};

export default HeroNormal;
