import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa';
import SEO from '../components/SEO';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      category: "Commandes",
      questions: [
        {
          question: "Comment passer une commande ?",
          answer: "Pour passer commande, parcourez nos gammes sur la page d'accueil, sélectionnez la gamme souhaitée, ajoutez-la au panier, puis cliquez sur le panier et suivez les étapes pour finaliser votre commande. Vous serez redirigé vers WhatsApp pour confirmer."
        },
        {
          question: "Puis-je acheter un produit seul ?",
          answer: "Non, nous vendons uniquement des gammes complètes. Chaque gamme contient tous les produits nécessaires pour une routine de soin complète et efficace."
        },
        {
          question: "Puis-je modifier ou annuler ma commande ?",
          answer: "Vous pouvez modifier ou annuler votre commande tant qu'elle n'a pas été confirmée par notre équipe. Contactez-nous immédiatement via WhatsApp au +221 71 046 92 41."
        }
      ]
    },
    {
      category: "Livraison",
      questions: [
        {
          question: "Quels sont les délais de livraison ?",
          answer: "Les délais varient selon votre localisation :\n• Dakar et banlieue : 24-48h\n• Régions du Sénégal : 3-5 jours\n• Pays limitrophes : 5-7 jours"
        },
        {
          question: "Quels sont les frais de livraison ?",
          answer: "Les frais de livraison dépendent de votre localisation :\n• Dakar : 1 000 FCFA\n• Banlieue : 1 500 FCFA\n• Régions : 2 000 - 3 000 FCFA\n• Livraison gratuite pour les commandes de 3 gammes ou plus à Dakar"
        },
        {
          question: "Comment suivre ma commande ?",
          answer: "Après confirmation de votre commande, vous recevrez un numéro de suivi via WhatsApp. Vous pouvez également nous contacter à tout moment pour connaître l'état de votre livraison."
        },
        {
          question: "Livrez-vous à l'international ?",
          answer: "Actuellement, nous livrons principalement au Sénégal et dans certains pays d'Afrique de l'Ouest. Pour les livraisons internationales, contactez-nous via WhatsApp pour vérifier la disponibilité."
        }
      ]
    },
    {
      category: "Paiement",
      questions: [
        {
          question: "Quels modes de paiement acceptez-vous ?",
          answer: "Nous acceptons :\n• Wave\n• Orange Money\n• Paiement à la livraison (cash)\n• Virement bancaire (pour grosses commandes)"
        },
        {
          question: "Est-ce sécurisé de payer en ligne ?",
          answer: "Oui, tous nos partenaires de paiement (Wave, Orange Money) utilisent des systèmes sécurisés. Nous ne stockons aucune information de paiement sensible."
        },
        {
          question: "Puis-je payer à la livraison ?",
          answer: "Oui, le paiement à la livraison est disponible pour Dakar et sa banlieue. Un acompte de 30% peut être demandé pour les grosses commandes."
        }
      ]
    },
    {
      category: "Produits",
      questions: [
        {
          question: "Vos produits sont-ils adaptés à tous les types de peau ?",
          answer: "Oui, nos gammes sont spécialement formulées pour la peau africaine et conviennent à tous les types de peau. Chaque gamme cible des besoins spécifiques (éclat, hydratation, anti-taches, etc.)."
        },
        {
          question: "Les produits sont-ils testés dermatologiquement ?",
          answer: "Oui, tous nos produits sont testés dermatologiquement et approuvés pour garantir leur efficacité et leur sécurité."
        },
        {
          question: "Combien de temps dure une gamme ?",
          answer: "Une gamme complète dure en moyenne 1 à 2 mois selon l'utilisation. Nous recommandons une utilisation régulière matin et soir pour des résultats optimaux."
        },
        {
          question: "Quand voit-on les premiers résultats ?",
          answer: "Les premiers résultats sont visibles après 7 à 14 jours d'utilisation régulière. Pour des résultats optimaux, nous recommandons une utilisation continue pendant au moins 1 mois."
        }
      ]
    },
    {
      category: "Retours & Échanges",
      questions: [
        {
          question: "Quelle est votre politique de retour ?",
          answer: "Vous pouvez retourner un produit non ouvert dans les 7 jours suivant la réception, à condition que l'emballage soit intact. Les frais de retour sont à votre charge."
        },
        {
          question: "Puis-je échanger un produit ?",
          answer: "Oui, les échanges sont possibles dans les 7 jours si le produit est non ouvert et dans son emballage d'origine. Contactez-nous via WhatsApp pour organiser l'échange."
        },
        {
          question: "Que faire si je reçois un produit endommagé ?",
          answer: "Si vous recevez un produit endommagé, prenez des photos et contactez-nous immédiatement via WhatsApp. Nous procéderons au remplacement gratuit dans les 48h."
        },
        {
          question: "Puis-je être remboursé ?",
          answer: "Les remboursements sont possibles uniquement pour les produits défectueux ou endommagés à la livraison. Le remboursement est effectué sous 7-10 jours ouvrés."
        }
      ]
    },
    {
      category: "Promotions",
      questions: [
        {
          question: "Comment savoir quand il y a des promotions ?",
          answer: "Les promotions sont affichées sur notre page d'accueil avec une bannière spéciale. Vous pouvez aussi nous suivre sur WhatsApp ou vous inscrire à notre newsletter pour recevoir les offres en avant-première."
        },
        {
          question: "Les promotions sont-elles valables sur toutes les gammes ?",
          answer: "Cela dépend de la promotion en cours. Généralement, nos promotions spéciales (comme le Magal) s'appliquent à toutes les gammes. Les détails sont toujours clairement indiqués."
        },
        {
          question: "Puis-je cumuler plusieurs promotions ?",
          answer: "Non, les promotions ne sont généralement pas cumulables. Une seule réduction par commande s'applique."
        }
      ]
    }
  ];

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="FAQ - Questions Fréquentes | Maguita Skin"
        description="Trouvez les réponses à vos questions sur les commandes, livraison, paiement, produits et retours. Guide complet FAQ Maguita Skin."
        keywords="faq maguita skin, questions fréquentes, aide, livraison, paiement, retour, cosmétiques"
        url="/faq"
      />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-fuchsia-primary to-pink-600 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <FaQuestionCircle className="text-6xl mx-auto mb-4 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Questions Fréquentes</h1>
          <p className="text-xl md:text-2xl opacity-90">
            Trouvez rapidement les réponses à vos questions
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-fuchsia-primary mb-6 flex items-center gap-3">
                <span className="bg-fuchsia-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                  {categoryIndex + 1}
                </span>
                {category.category}
              </h2>

              <div className="space-y-4">
                {category.questions.map((item, questionIndex) => {
                  const index = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openIndex === index;

                  return (
                    <div
                      key={questionIndex}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-800 pr-4">
                          {item.question}
                        </span>
                        {isOpen ? (
                          <FaChevronUp className="text-fuchsia-primary flex-shrink-0" />
                        ) : (
                          <FaChevronDown className="text-gray-400 flex-shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-4 text-gray-600 whitespace-pre-line">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-fuchsia-primary to-pink-600 text-white rounded-xl p-8 text-center mt-12">
            <h3 className="text-2xl font-bold mb-3">Vous ne trouvez pas votre réponse ?</h3>
            <p className="mb-6 opacity-90">
              Notre équipe est là pour vous aider !
            </p>
            <a
              href="https://wa.me/221710469241"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-fuchsia-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Contactez-nous sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
