import { FaUndo, FaCheckCircle, FaTimesCircle, FaWhatsapp } from 'react-icons/fa';
import SEO from '../components/SEO';
import WhatsAppButton from '../components/WhatsAppButton';

const ReturnPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Politique de Retour - Maguita Skin"
        description="Consultez notre politique de retour et d'échange. Satisfait ou remboursé sous 14 jours. Service client disponible 7j/7."
        keywords="retour maguita skin, politique retour, échange produits, remboursement, garantie satisfaction"
      />

      {/* Hero */}
      <div className="bg-gradient-to-r from-fuchsia-primary to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <FaUndo className="text-5xl mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Politique de Retour et d'Échange
          </h1>
          <p className="text-xl opacity-90">
            Votre satisfaction est notre priorité
          </p>
        </div>
      </div>

      {/* Contenu */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        
        {/* Garantie Satisfaction */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 p-3 rounded-full">
              <FaCheckCircle className="text-green-600 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-fuchsia-primary">
              Garantie Satisfait ou Remboursé
            </h2>
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            Chez Maguita Skin, nous sommes convaincus de la qualité de nos produits. 
            C'est pourquoi nous offrons une <strong>garantie satisfait ou remboursé de 14 jours</strong> sur tous nos produits.
          </p>
          
          <div className="bg-gold-primary/10 border-l-4 border-gold-primary p-4 rounded">
            <p className="text-gray-800 font-semibold">
              ✨ Si vous n'êtes pas satisfait(e) de votre achat, nous vous remboursons intégralement ou procédons à un échange.
            </p>
          </div>
        </div>

        {/* Conditions de Retour */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-fuchsia-primary mb-6">
            Conditions de Retour
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-green-500 text-xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-1">Délai de Retour</h3>
                <p className="text-gray-700">
                  Vous disposez de <strong>14 jours</strong> à compter de la réception de votre colis pour demander un retour ou un échange.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-green-500 text-xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-1">État du Produit</h3>
                <p className="text-gray-700">
                  Le produit doit être <strong>non ouvert, non utilisé et dans son emballage d'origine</strong> avec tous les éléments de la gamme.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-green-500 text-xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-1">Preuve d'Achat</h3>
                <p className="text-gray-700">
                  Veuillez conserver votre <strong>numéro de commande</strong> ou votre confirmation de commande par WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Produits Non Retournables */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-100 p-3 rounded-full">
              <FaTimesCircle className="text-red-600 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-fuchsia-primary">
              Produits Non Retournables
            </h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            Pour des raisons d'hygiène et de sécurité, nous ne pouvons accepter le retour de produits cosmétiques dans les cas suivants:
          </p>

          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">✕</span>
              <span>Produits ouverts ou utilisés (même partiellement)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">✕</span>
              <span>Emballage endommagé ou scellé brisé</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">✕</span>
              <span>Produits incomplets (il manque un élément de la gamme)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">✕</span>
              <span>Retours après le délai de 14 jours</span>
            </li>
          </ul>
        </div>

        {/* Procédure de Retour */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-fuchsia-primary mb-6">
            Comment Effectuer un Retour ?
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-fuchsia-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Contactez-nous</h3>
                <p className="text-gray-700 mb-2">
                  Envoyez-nous un message WhatsApp au <strong>+221 71 046 92 41</strong> en indiquant:
                </p>
                <ul className="text-gray-600 text-sm space-y-1 ml-4">
                  <li>• Votre numéro de commande</li>
                  <li>• Le(s) produit(s) concerné(s)</li>
                  <li>• La raison du retour</li>
                  <li>• Des photos du produit si possible</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-fuchsia-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Validation de la Demande</h3>
                <p className="text-gray-700">
                  Notre équipe examine votre demande sous <strong>24h ouvrées</strong> et vous confirme l'acceptation du retour.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-fuchsia-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Retour du Produit</h3>
                <p className="text-gray-700">
                  Nous organisons <strong>la récupération du produit</strong> à votre domicile (Dakar et banlieue) ou vous pouvez le déposer à notre point de collecte.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-fuchsia-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Remboursement ou Échange</h3>
                <p className="text-gray-700">
                  Une fois le produit reçu et vérifié (sous 2-3 jours), nous procédons à:
                </p>
                <ul className="text-gray-600 text-sm space-y-1 ml-4 mt-2">
                  <li>• <strong>Remboursement:</strong> Par virement mobile ou espèces sous 5 jours ouvrés</li>
                  <li>• <strong>Échange:</strong> Envoi immédiat de la nouvelle gamme</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Frais de Retour */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-fuchsia-primary mb-4">
            Frais de Retour
          </h2>

          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-semibold mb-2">
                ✓ Retours GRATUITS dans les cas suivants:
              </p>
              <ul className="text-green-700 text-sm space-y-1 ml-4">
                <li>• Produit défectueux ou endommagé</li>
                <li>• Erreur de notre part (mauvais produit envoyé)</li>
                <li>• Produit ne correspond pas à la description</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 font-semibold mb-2">
                ℹ️ Frais de 2,000 FCFA pour:
              </p>
              <ul className="text-blue-700 text-sm space-y-1 ml-4">
                <li>• Changement d'avis</li>
                <li>• Retour sans raison valable</li>
              </ul>
              <p className="text-blue-600 text-xs mt-2 italic">
                Ces frais couvrent les coûts logistiques de collecte et traitement du retour.
              </p>
            </div>
          </div>
        </div>

        {/* Contact WhatsApp */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            Une Question sur un Retour ?
          </h2>
          <p className="mb-6 opacity-90">
            Notre service client est disponible 7j/7 pour vous accompagner
          </p>
          <a
            href="https://wa.me/221710469241?text=Bonjour, j'ai une question concernant un retour"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            <FaWhatsapp className="text-2xl" />
            Contacter le Service Client
          </a>
        </div>

        {/* Note Importante */}
        <div className="mt-8 bg-fuchsia-50 border-l-4 border-fuchsia-primary p-6 rounded">
          <p className="text-gray-700 leading-relaxed">
            <strong>💡 Conseil:</strong> Avant de retourner un produit, n'hésitez pas à nous contacter. 
            Notre équipe pourra vous conseiller et répondre à toutes vos questions sur l'utilisation des produits. 
            Souvent, une simple explication suffit! 😊
          </p>
        </div>

      </div>

      <WhatsAppButton />
    </div>
  );
};

export default ReturnPolicyPage;
