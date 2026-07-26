import { FaTruck, FaMapMarkedAlt, FaClock, FaMoneyBillWave, FaBoxOpen } from 'react-icons/fa';
import SEO from '../components/SEO';

const ShippingPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Politique de Livraison - Maguita Skin | Délais & Frais"
        description="Informations complètes sur la livraison Maguita Skin : délais 24-72h à Dakar, frais de livraison, zones couvertes, processus de livraison au Sénégal."
        keywords="livraison maguita skin, frais livraison dakar, délais livraison sénégal, zones livraison"
        url="/shipping"
      />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-fuchsia-primary to-pink-600 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <FaTruck className="text-6xl mx-auto mb-4 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Politique de Livraison</h1>
          <p className="text-xl md:text-2xl opacity-90">
            Toutes les informations sur nos modalités de livraison
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Zones de livraison */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <FaMapMarkedAlt className="text-fuchsia-primary text-3xl" />
              <h2 className="text-2xl font-bold text-fuchsia-primary">Zones de Livraison</h2>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-fuchsia-primary pl-4">
                <h3 className="font-bold text-lg mb-2">🇸🇳 Sénégal</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Dakar et banlieue</li>
                  <li>✅ Thiès, Mbour, Saly</li>
                  <li>✅ Saint-Louis, Louga</li>
                  <li>✅ Kaolack, Fatick, Diourbel</li>
                  <li>✅ Ziguinchor, Kolda, Sédhiou</li>
                  <li>✅ Toutes les régions du Sénégal</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-400 pl-4">
                <h3 className="font-bold text-lg mb-2">🌍 International</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Mali, Mauritanie, Guinée, Gambie</li>
                  <li>✅ Autres pays : nous contacter</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Délais de livraison */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <FaClock className="text-fuchsia-primary text-3xl" />
              <h2 className="text-2xl font-bold text-fuchsia-primary">Délais de Livraison</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-fuchsia-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-fuchsia-primary">Zone</th>
                    <th className="px-4 py-3 text-left font-semibold text-fuchsia-primary">Délai</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-3">Dakar Centre</td>
                    <td className="px-4 py-3">24h - 48h</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Banlieue de Dakar</td>
                    <td className="px-4 py-3">48h - 72h</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Thiès, Mbour, Saly</td>
                    <td className="px-4 py-3">2 - 3 jours</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Autres régions du Sénégal</td>
                    <td className="px-4 py-3">3 - 5 jours</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Pays limitrophes</td>
                    <td className="px-4 py-3">5 - 7 jours</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Les délais peuvent varier selon les conditions météorologiques, 
                les jours fériés ou la période de forte demande (promotions spéciales).
              </p>
            </div>
          </section>

          {/* Frais de livraison */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <FaMoneyBillWave className="text-fuchsia-primary text-3xl" />
              <h2 className="text-2xl font-bold text-fuchsia-primary">Frais de Livraison</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-fuchsia-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-fuchsia-primary">Zone</th>
                    <th className="px-4 py-3 text-right font-semibold text-fuchsia-primary">Frais</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-3">Dakar Centre</td>
                    <td className="px-4 py-3 text-right">1 000 FCFA</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Banlieue proche</td>
                    <td className="px-4 py-3 text-right">1 500 FCFA</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Banlieue éloignée</td>
                    <td className="px-4 py-3 text-right">2 000 FCFA</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Thiès, Mbour, Saly</td>
                    <td className="px-4 py-3 text-right">2 500 FCFA</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Autres régions</td>
                    <td className="px-4 py-3 text-right">3 000 - 5 000 FCFA</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">International</td>
                    <td className="px-4 py-3 text-right">Sur devis</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 font-semibold mb-2">
                🎁 Livraison Gratuite:
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Commande de 3 gammes ou plus à Dakar</li>
                <li>• Commande de 5 gammes ou plus en banlieue</li>
                <li>• Promotions spéciales (voir conditions)</li>
              </ul>
            </div>
          </section>

          {/* Processus de livraison */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <FaBoxOpen className="text-fuchsia-primary text-3xl" />
              <h2 className="text-2xl font-bold text-fuchsia-primary">Comment ça marche ?</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-fuchsia-primary text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold mb-1">Commande Validée</h3>
                  <p className="text-gray-600">
                    Vous recevez une confirmation de commande avec un numéro de suivi par WhatsApp.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-fuchsia-primary text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold mb-1">Préparation</h3>
                  <p className="text-gray-600">
                    Votre commande est soigneusement préparée et emballée (généralement sous 24h).
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-fuchsia-primary text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold mb-1">Expédition</h3>
                  <p className="text-gray-600">
                    Votre colis est confié à notre transporteur. Vous recevez une notification d'expédition.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-fuchsia-primary text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-bold mb-1">Livraison</h3>
                  <p className="text-gray-600">
                    Le livreur vous contacte avant de passer. Vous payez et récupérez votre colis.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold mb-1">Confirmation</h3>
                  <p className="text-gray-600">
                    Nous vous contactons pour confirmer la bonne réception et votre satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Informations importantes */}
          <section className="bg-gradient-to-r from-fuchsia-primary to-pink-600 text-white rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">📌 Informations Importantes</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Vérifiez toujours l'état du colis avant de signer le bon de livraison</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>En cas de colis endommagé, refusez la livraison et contactez-nous immédiatement</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Assurez-vous d'être disponible à l'adresse indiquée pendant la période de livraison</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Les livraisons se font du lundi au samedi, de 9h à 18h</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Après 3 tentatives de livraison infructueuses, le colis retourne à notre entrepôt</span>
              </li>
            </ul>
          </section>

          {/* Contact */}
          <section className="text-center">
            <p className="text-gray-600 mb-4">
              Des questions sur votre livraison ?
            </p>
            <a
              href="https://wa.me/221710469241"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-whatsapp-green text-white px-8 py-3 rounded-lg font-bold hover:bg-green-600 transition-colors"
            >
              Contactez-nous sur WhatsApp
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;
