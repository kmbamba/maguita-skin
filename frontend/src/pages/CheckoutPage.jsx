import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/api';
import { toast } from 'react-toastify';
import SEO from '../components/SEO';
import TrustBadges from '../components/TrustBadges';
import LazyImage from '../components/LazyImage';
import { getImageUrl, getWhatsAppUrl } from '../config/constants';

const CheckoutPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotal } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    paymentMethod: 'whatsapp',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast.error('Votre panier est vide');
      return;
    }

    if (!formData.name || !formData.phone || !formData.city) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: {
            city: formData.city,
            details: formData.address
          }
        },
        items: cartItems.map(item => ({
          gamme: item._id,
          quantity: item.quantity
        })),
        paymentMethod: formData.paymentMethod,
        notes: formData.notes
      };

      const response = await orderService.create(orderData);
      
      toast.success('Commande créée avec succès !');
      clearCart();

      // Redirection WhatsApp
      const orderSummary = cartItems.map(item => 
        `- ${item.name} x${item.quantity}`
      ).join('\n');
      
      const message = `Nouvelle commande !\n\nClient: ${formData.name}\nTél: ${formData.phone}\nVille: ${formData.city}\n\nCommande:\n${orderSummary}\n\nTotal: ${getTotal().toLocaleString()} FCFA`;
      
      const whatsappUrl = getWhatsAppUrl(message);
      
      // Sur mobile, redirection directe pour éviter le blocage des popups
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Mobile : redirection directe
        window.location.href = whatsappUrl;
      } else {
        // Desktop : ouvrir dans nouvel onglet
        window.open(whatsappUrl, '_blank');
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors de la création de la commande');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold text-fuchsia-primary mb-4">Votre panier est vide</h2>
        <p className="text-gray-600 mb-6">Ajoutez des gammes pour passer commande</p>
        <button
          onClick={() => navigate('/')}
          className="bg-fuchsia-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
        >
          Voir nos gammes
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO 
        title="Finaliser votre Commande - Maguita Skin"
        description="Finalisez votre commande Maguita Skin. Paiement sécurisé, livraison rapide à Dakar et dans tout le Sénégal. Support WhatsApp 24/7."
        keywords="commande maguita skin, paiement, livraison, checkout, panier, wave, orange money"
        url="/checkout"
      />
      
      <h1 className="text-3xl font-bold text-fuchsia-primary mb-4">Finaliser la commande</h1>
      
      {/* Trust Badges Compact */}
      <TrustBadges variant="compact" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Formulaire */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Informations de livraison</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nom complet *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Téléphone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+221 XX XXX XX XX"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email (optionnel)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Ville *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Adresse de livraison</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-primary focus:border-transparent"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mode de paiement</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-primary focus:border-transparent"
              >
                <option value="whatsapp">WhatsApp (À convenir)</option>
                <option value="wave">Wave</option>
                <option value="orange-money">Orange Money</option>
                <option value="cash">Paiement à la livraison</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Notes (optionnel)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-primary focus:border-transparent"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-whatsapp-green text-white py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? 'En cours...' : (
                <>
                  <FaWhatsapp size={24} />
                  Confirmer la commande
                </>
              )}
            </button>
          </form>
        </div>

        {/* Récapitulatif panier */}
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
            <h2 className="text-2xl font-bold mb-6">Récapitulatif</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => {
                const price = item.isPromoActive ? item.promoPrice : item.regularPrice;
                return (
                  <div key={item._id} className="flex gap-4 pb-4 border-b">
                    <LazyImage
                      src={getImageUrl(item.images[0]?.url) || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop'}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop';
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-fuchsia-primary">{item.name}</h3>
                      <p className="text-sm text-gray-600">{price.toLocaleString()} FCFA</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{(price * item.quantity).toLocaleString()} FCFA</p>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:text-red-700 mt-2"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-2xl font-bold text-fuchsia-primary">
                <span>Total</span>
                <span>{getTotal().toLocaleString()} FCFA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
