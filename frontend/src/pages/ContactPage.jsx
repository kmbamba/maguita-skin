import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import SEO from '../components/SEO';
import TestimonialForm from '../components/TestimonialForm';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Créer le message WhatsApp
    const whatsappMessage = `
*Nouveau message de contact*

*Nom:* ${formData.name}
*Email:* ${formData.email}
*Téléphone:* ${formData.phone}
*Sujet:* ${formData.subject}

*Message:*
${formData.message}
    `.trim();

    // Ouvrir WhatsApp
    window.open(`https://wa.me/221710469241?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    
    toast.success('Redirection vers WhatsApp...');
    setLoading(false);
    
    // Réinitialiser le formulaire
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Contactez-Nous - Maguita Skin | Support Client"
        description="Contactez Maguita Skin pour vos questions, commandes et informations produits. WhatsApp +221 71 046 92 41. Support 7j/7 - Réponse sous 2h."
        keywords="contact maguita skin, service client, whatsapp, dakar, sénégal, support cosmétiques"
        url="/contact"
      />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-fuchsia-primary to-pink-600 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-Nous</h1>
          <p className="text-xl md:text-2xl opacity-90">
            Nous sommes à votre écoute
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulaire de contact */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-fuchsia-primary mb-6">
              Envoyez-nous un message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nom complet *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-primary focus:border-transparent"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-primary focus:border-transparent"
                  placeholder="votre@email.com"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-primary focus:border-transparent"
                  placeholder="+221 XX XXX XX XX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Sujet *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-primary focus:border-transparent"
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="Commande">Question sur une commande</option>
                  <option value="Produit">Information produit</option>
                  <option value="Livraison">Livraison</option>
                  <option value="Retour">Retour / Échange</option>
                  <option value="Partenariat">Partenariat</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-primary focus:border-transparent"
                  placeholder="Votre message..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-whatsapp-green text-white py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <FaWhatsapp size={24} />
                {loading ? 'Envoi en cours...' : 'Envoyer via WhatsApp'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Votre message sera envoyé via WhatsApp pour une réponse rapide
              </p>
            </form>
          </div>

          {/* Informations de contact */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-fuchsia-primary mb-6">
                Nos Coordonnées
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-fuchsia-100 p-3 rounded-lg flex-shrink-0">
                    <FaPhone className="text-fuchsia-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Téléphone</h3>
                    <a href="tel:+221710469241" className="text-gray-600 hover:text-fuchsia-primary">
                      +221 71 046 92 41
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-fuchsia-100 p-3 rounded-lg flex-shrink-0">
                    <FaWhatsapp className="text-fuchsia-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">WhatsApp</h3>
                    <a 
                      href="https://wa.me/221710469241" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-fuchsia-primary"
                    >
                      +221 71 046 92 41
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-fuchsia-100 p-3 rounded-lg flex-shrink-0">
                    <FaEnvelope className="text-fuchsia-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:dakar2026@gmail.com" className="text-gray-600 hover:text-fuchsia-primary">
                      dakar2026@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-fuchsia-100 p-3 rounded-lg flex-shrink-0">
                    <FaMapMarkerAlt className="text-fuchsia-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Adresse</h3>
                    <p className="text-gray-600">
                      Dakar, Sénégal<br />
                      (Livraison dans toute la région)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-fuchsia-primary mb-4 flex items-center gap-2">
                <FaClock />
                Horaires d'ouverture
              </h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span className="font-medium">Lundi - Vendredi</span>
                  <span>9h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Samedi</span>
                  <span>10h00 - 16h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Dimanche</span>
                  <span className="text-red-500">Fermé</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                💬 WhatsApp disponible 24h/24 - Réponse sous 2h en journée
              </p>
            </div>

            <div className="bg-gradient-to-r from-fuchsia-primary to-pink-600 text-white rounded-xl shadow-lg p-8 text-center">
              <h3 className="text-xl font-bold mb-2">Besoin d'aide immédiate ?</h3>
              <p className="mb-4 opacity-90">Contactez-nous directement sur WhatsApp</p>
              <a
                href="https://wa.me/221710469241"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-fuchsia-primary px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                <FaWhatsapp size={20} />
                Ouvrir WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Section Témoignages */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-fuchsia-primary mb-4">
              Partagez votre expérience
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Vous avez utilisé nos produits ? Laissez un témoignage pour aider d'autres clients à faire leur choix.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <TestimonialForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
