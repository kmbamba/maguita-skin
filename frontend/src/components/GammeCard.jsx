import { Link } from 'react-router-dom';
import { FaWhatsapp, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import LazyImage from './LazyImage';
import { getImageUrl, getWhatsAppUrl } from '../config/constants';
import { usePromoConfig } from '../hooks/usePromoConfig';

const GammeCard = ({ gamme }) => {
  const { addToCart } = useCart();
  const { promoConfig } = usePromoConfig();
  const currentPrice = gamme.isPromoActive ? gamme.promoPrice : gamme.regularPrice;
  const discount = gamme.regularPrice - gamme.promoPrice;
  const hasPromo = gamme.isPromoActive && gamme.regularPrice !== gamme.promoPrice;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(gamme);
    toast.success('Gamme ajoutée au panier !', {
      position: 'bottom-right',
      autoClose: 2000
    });
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const message = `Bonjour, je suis intéressé(e) par la ${gamme.name} à ${currentPrice.toLocaleString()} FCFA`;
    window.open(getWhatsAppUrl(message), '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image */}
      <Link to={`/gamme/${gamme.slug}`} className="block relative">
        <LazyImage
          src={getImageUrl(gamme.images[0]?.url) || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=800&fit=crop'}
          alt={gamme.name}
          className="w-full h-64 object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=800&fit=crop';
          }}
        />
        {hasPromo && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
            {promoConfig.emoji} {promoConfig.name}
          </div>
        )}
      </Link>

      {/* Contenu */}
      <div className="p-6">
        <Link to={`/gamme/${gamme.slug}`}>
          <h3 className="text-xl font-bold text-fuchsia-primary mb-2 hover:text-pink-600 transition-colors">
            {gamme.name}
          </h3>
        </Link>

        {/* Items inclus */}
        <ul className="text-sm text-gray-600 mb-4 space-y-1">
          {gamme.includedItems.slice(0, 3).map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-gold-accent">•</span>
              <span>{item}</span>
            </li>
          ))}
          {gamme.includedItems.length > 3 && (
            <li className="text-gold-accent font-medium">
              + {gamme.includedItems.length - 3} autres...
            </li>
          )}
        </ul>

        {/* Prix */}
        <div className="mb-4">
          {hasPromo && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-gray-400 line-through text-sm">
                {gamme.regularPrice.toLocaleString()} FCFA
              </span>
              <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-bold">
                -{discount.toLocaleString()} FCFA
              </span>
            </div>
          )}
          <div className="text-3xl font-bold text-fuchsia-primary">
            {currentPrice.toLocaleString()} <span className="text-xl">FCFA</span>
          </div>
        </div>

        {/* Boutons */}
        <div className="flex gap-2">
          <button
            onClick={handleWhatsApp}
            className="flex-1 bg-whatsapp-green text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
          >
            <FaWhatsapp size={18} />
            <span>WhatsApp</span>
          </button>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-gold-accent text-white py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
          >
            <FaShoppingCart size={18} />
            <span>Panier</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GammeCard;
