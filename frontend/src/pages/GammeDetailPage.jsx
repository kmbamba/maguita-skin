import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaWhatsapp, FaShoppingCart, FaArrowLeft, FaCheck } from 'react-icons/fa';
import { gammeService } from '../services/api';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import SEO from '../components/SEO';
import LazyImage from '../components/LazyImage';
import TrustBadges from '../components/TrustBadges';
import { getImageUrl, getWhatsAppUrl } from '../config/constants';
import { usePromoConfig } from '../hooks/usePromoConfig';

const GammeDetailPage = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const { promoConfig } = usePromoConfig();
  const [gamme, setGamme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchGamme = async () => {
      try {
        const response = await gammeService.getBySlug(slug);
        setGamme(response.data.data);
      } catch (err) {
        console.error(err);
        toast.error('Gamme introuvable');
      } finally {
        setLoading(false);
      }
    };

    fetchGamme();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-fuchsia-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!gamme) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Gamme non trouvée</p>
          <Link to="/" className="text-fuchsia-primary hover:underline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const currentPrice = gamme.isPromoActive ? gamme.promoPrice : gamme.regularPrice;
  const discount = gamme.regularPrice - gamme.promoPrice;
  const hasPromo = gamme.isPromoActive && gamme.regularPrice !== gamme.promoPrice;

  const handleAddToCart = () => {
    addToCart(gamme);
    toast.success('Gamme ajoutée au panier !');
  };

  const handleWhatsApp = () => {
    const message = `Bonjour, je voudrais commander la ${gamme.name} à ${currentPrice.toLocaleString()} FCFA`;
    window.open(getWhatsAppUrl(message), '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO 
        title={gamme?.name || "Gamme"}
        description={gamme?.description || "Découvrez notre gamme complète de produits cosmétiques"}
        keywords={`${gamme?.name}, ${gamme?.category}, cosmétiques, maguita skin, ${gamme?.isPromoActive ? 'promo, réduction' : ''}`}
        url={`/gamme/${slug}`}
        image={getImageUrl(gamme?.images[0]?.url)}
        type="product"
      />
      
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-fuchsia-primary hover:underline mb-6"
      >
        <FaArrowLeft /> Retour
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Galerie d'images */}
        <div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg mb-4">
            <LazyImage
              src={getImageUrl(gamme.images[selectedImage]?.url) || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=800&fit=crop'}
              alt={gamme.name}
              className="w-full h-96 object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=800&fit=crop';
              }}
            />
          </div>
          {gamme.images.length > 1 && (
            <div className="flex gap-2">
              {gamme.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-1 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index
                      ? 'border-fuchsia-primary'
                      : 'border-transparent'
                  }`}
                >
                  <LazyImage
                    src={getImageUrl(image.url) || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=800&fit=crop'}
                    alt={`${gamme.name} ${index + 1}`}
                    className="w-full h-20 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=800&fit=crop';
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Détails */}
        <div>
          {hasPromo && (
            <span className="inline-block bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold mb-4 animate-pulse">
              {promoConfig.emoji} {promoConfig.name}
            </span>
          )}

          <h1 className="text-4xl font-bold text-fuchsia-primary mb-4">{gamme.name}</h1>

          <p className="text-gray-700 mb-6 leading-relaxed">{gamme.description}</p>

          {/* Prix */}
          <div className="mb-6">
            {hasPromo && (
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl text-gray-400 line-through">
                  {gamme.regularPrice.toLocaleString()} FCFA
                </span>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-bold">
                  Économisez {discount.toLocaleString()} FCFA
                </span>
              </div>
            )}
            <div className="text-5xl font-bold text-fuchsia-primary">
              {currentPrice.toLocaleString()} <span className="text-2xl">FCFA</span>
            </div>
          </div>

          {/* Contenu du pack */}
          <div className="bg-soft-bg rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-fuchsia-primary mb-4">Contenu du pack :</h3>
            <ul className="space-y-3">
              {gamme.includedItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleWhatsApp}
              className="flex-1 bg-whatsapp-green text-white py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-3 shadow-lg"
            >
              <FaWhatsapp size={24} />
              Commander sur WhatsApp
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gold-accent text-white py-4 rounded-xl font-bold text-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-3 shadow-lg"
            >
              <FaShoppingCart size={24} />
              Ajouter au Panier
            </button>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <TrustBadges variant="compact" />

      {/* Section Guide d'Utilisation */}
      <div className="mt-16 bg-gradient-to-br from-fuchsia-50 to-pink-50 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-fuchsia-primary mb-6 text-center">
          💡 Comment Utiliser Votre Gamme
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Étape 1 */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="bg-fuchsia-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
              1
            </div>
            <h3 className="font-bold text-lg text-fuchsia-primary mb-3 text-center">
              Nettoyage
            </h3>
            <p className="text-gray-700 text-sm text-center leading-relaxed">
              Commencez par nettoyer votre visage avec le savon inclus. Massez doucement en mouvements circulaires, puis rincez à l'eau tiède.
            </p>
          </div>

          {/* Étape 2 */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="bg-fuchsia-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
              2
            </div>
            <h3 className="font-bold text-lg text-fuchsia-primary mb-3 text-center">
              Application
            </h3>
            <p className="text-gray-700 text-sm text-center leading-relaxed">
              Appliquez le sérum et la crème sur visage sec. Massez délicatement jusqu'à absorption complète. Utilisez matin et soir pour des résultats optimaux.
            </p>
          </div>

          {/* Étape 3 */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="bg-fuchsia-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
              3
            </div>
            <h3 className="font-bold text-lg text-fuchsia-primary mb-3 text-center">
              Régularité
            </h3>
            <p className="text-gray-700 text-sm text-center leading-relaxed">
              Utilisez quotidiennement pendant 4 à 6 semaines pour voir les premiers résultats. La régularité est la clé du succès !
            </p>
          </div>
        </div>

        {/* Conseils supplémentaires */}
        <div className="mt-8 bg-white rounded-xl p-6 max-w-3xl mx-auto">
          <h3 className="font-bold text-lg text-fuchsia-primary mb-4 flex items-center gap-2">
            <span>⭐</span> Conseils pour de Meilleurs Résultats
          </h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-start gap-2">
              <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
              <span>Buvez au moins 1,5L d'eau par jour pour hydrater votre peau de l'intérieur</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
              <span>Évitez l'exposition prolongée au soleil pendant le traitement</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
              <span>Conservez vos produits à l'abri de la chaleur et de la lumière directe</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
              <span>Prenez des photos avant/après pour suivre votre évolution</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GammeDetailPage;
