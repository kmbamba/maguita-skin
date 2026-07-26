import { FaFileContract, FaShieldAlt } from 'react-icons/fa';
import SEO from '../components/SEO';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Conditions Générales de Vente - Maguita Skin | CGV"
        description="Consultez les Conditions Générales de Vente Maguita Skin : commande, paiement, livraison, garanties, droit de rétractation. Dernière mise à jour Juillet 2026."
        keywords="cgv maguita skin, conditions générales vente, garantie, retour, politique commerciale"
        url="/terms"
      />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-fuchsia-primary to-pink-600 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <FaFileContract className="text-6xl mx-auto mb-4 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Conditions Générales de Vente</h1>
          <p className="text-xl md:text-2xl opacity-90">
            Dernière mise à jour : Juillet 2026
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
          
          <div className="prose prose-lg max-w-none">
            
            {/* Article 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-fuchsia-primary mb-4">1. Objet</h2>
              <p className="text-gray-700 leading-relaxed">
                Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre 
                Maguita Skin (ci-après "le Vendeur") et toute personne physique ou morale souhaitant effectuer 
                un achat via le site internet maguitaskin.com (ci-après "l'Acheteur" ou "le Client").
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                Le fait de passer commande implique l'adhésion entière et sans réserve de l'Acheteur aux présentes 
                CGV.
              </p>
            </section>

            {/* Article 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-fuchsia-primary mb-4">2. Produits</h2>
              <p className="text-gray-700 leading-relaxed">
                Maguita Skin commercialise exclusivement des gammes complètes de produits cosmétiques. 
                Les produits ne sont pas vendus à l'unité. Chaque gamme contient l'ensemble des produits 
                nécessaires pour une routine de soin complète.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                Les produits sont décrits et présentés avec la plus grande exactitude possible. Toutefois, 
                les photographies ne sont pas contractuelles et peuvent présenter de légères différences 
                avec le produit réel.
              </p>
            </section>

            {/* Article 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-fuchsia-primary mb-4">3. Prix</h2>
              <p className="text-gray-700 leading-relaxed">
                Les prix sont indiqués en Francs CFA (FCFA), toutes taxes comprises. Le Vendeur se réserve 
                le droit de modifier ses prix à tout moment, étant toutefois entendu que le prix figurant 
                au catalogue le jour de la commande sera le seul applicable à l'Acheteur.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                Les prix indiqués ne comprennent pas les frais de livraison, facturés en supplément et 
                indiqués avant la validation définitive de la commande.
              </p>
            </section>

            {/* Article 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-fuchsia-primary mb-4">4. Commande</h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                Pour passer commande, le Client doit :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Sélectionner les produits souhaités</li>
                <li>Vérifier le contenu de son panier</li>
                <li>Remplir le formulaire de commande avec ses coordonnées exactes</li>
                <li>Valider sa commande</li>
                <li>Confirmer via WhatsApp</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-2">
                La commande n'est définitive qu'après confirmation par le Vendeur et réception du paiement 
                (pour les paiements en ligne) ou confirmation de la commande (pour les paiements à la livraison).
              </p>
            </section>

            {/* Article 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-fuchsia-primary mb-4">5. Paiement</h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                Les modes de paiement acceptés sont :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Wave</li>
                <li>Orange Money</li>
                <li>Paiement à la livraison (espèces)</li>
                <li>Virement bancaire (pour les grosses commandes)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-2">
                Le paiement à la livraison peut nécessiter un acompte de 30% pour les commandes importantes.
              </p>
            </section>

            {/* Article 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-fuchsia-primary mb-4">6. Livraison</h2>
              <p className="text-gray-700 leading-relaxed">
                Les délais de livraison varient selon la zone géographique (voir notre Politique de Livraison). 
                Le Vendeur s'engage à livrer les produits dans les délais annoncés, sauf cas de force majeure.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                Les risques liés au transport sont transférés au Client dès la réception des produits. 
                Il appartient au Client de vérifier l'état du colis en présence du livreur et de refuser 
                le colis en cas de dommage apparent.
              </p>
            </section>

            {/* Article 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-fuchsia-primary mb-4">7. Droit de Rétractation</h2>
              <p className="text-gray-700 leading-relaxed">
                Conformément aux dispositions légales, le Client dispose d'un délai de 7 jours à compter 
                de la réception de sa commande pour exercer son droit de rétractation, sans avoir à justifier 
                de motifs ni à payer de pénalités.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                <strong>Conditions:</strong> Les produits doivent être retournés dans leur emballage d'origine, 
                non ouverts, non utilisés et en parfait état de revente. Les frais de retour sont à la charge 
                du Client.
              </p>
            </section>

            {/* Article 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-fuchsia-primary mb-4">8. Garanties</h2>
              <p className="text-gray-700 leading-relaxed">
                Tous nos produits sont garantis conformes et exempts de vices cachés. En cas de produit 
                défectueux ou non conforme, le Client peut demander le remplacement ou le remboursement 
                dans un délai de 7 jours suivant la réception.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                Les produits bénéficient de la garantie légale de conformité et de la garantie des vices cachés.
              </p>
            </section>

            {/* Article 9 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-fuchsia-primary mb-4">9. Réclamations</h2>
              <p className="text-gray-700 leading-relaxed">
                Toute réclamation doit être adressée au Service Client via WhatsApp au +221 71 046 92 41 
                ou par email à contact@maguitaskin.com dans un délai de 7 jours suivant la livraison.
              </p>
            </section>

            {/* Article 10 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-fuchsia-primary mb-4">10. Données Personnelles</h2>
              <p className="text-gray-700 leading-relaxed">
                Les informations recueillies font l'objet d'un traitement informatique destiné à la gestion 
                des commandes et à l'amélioration de nos services. Conformément à la loi, le Client dispose 
                d'un droit d'accès, de modification et de suppression de ses données personnelles.
              </p>
            </section>

            {/* Article 11 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-fuchsia-primary mb-4">11. Propriété Intellectuelle</h2>
              <p className="text-gray-700 leading-relaxed">
                Tous les éléments du site maguitaskin.com sont et restent la propriété intellectuelle et 
                exclusive de Maguita Skin. Toute reproduction, exploitation, rediffusion ou utilisation, 
                même partielle, est strictement interdite sans autorisation préalable écrite.
              </p>
            </section>

            {/* Article 12 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-fuchsia-primary mb-4">12. Loi Applicable</h2>
              <p className="text-gray-700 leading-relaxed">
                Les présentes CGV sont soumises à la loi sénégalaise. Tout litige relatif à leur interprétation 
                et/ou à leur exécution relève des tribunaux compétents de Dakar.
              </p>
            </section>

            {/* Contact */}
            <section className="mt-12 p-6 bg-fuchsia-50 rounded-lg border border-fuchsia-200">
              <div className="flex items-center gap-3 mb-3">
                <FaShieldAlt className="text-fuchsia-primary text-2xl" />
                <h3 className="text-xl font-bold text-fuchsia-primary">Nous Contacter</h3>
              </div>
              <p className="text-gray-700 mb-2">
                <strong>Maguita Skin</strong><br />
                Dakar, Sénégal
              </p>
              <p className="text-gray-700">
                WhatsApp: +221 71 046 92 41<br />
                Email: contact@maguitaskin.com
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
