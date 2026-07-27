import { FaHeart, FaStar, FaLeaf, FaShieldAlt } from 'react-icons/fa';
import WhatsAppButton from '../components/WhatsAppButton';
import SEO from '../components/SEO';

const AboutPage = () => {
  return (
    <div>
      <SEO 
        title="À Propos - Maguita Skin, Votre Beauté Notre Passion"
        description="Découvrez l'histoire de Maguita Skin, marque sénégalaise de cosmétiques de qualité. Made in Senegal avec passion pour sublimer votre teint naturel."
        keywords="maguita skin histoire, cosmétiques sénégalais, made in senegal, beauté africaine"
        url="/about"
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-fuchsia-primary to-pink-600 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            À PROPOS DE MAGUITA SKIN
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Votre teint, notre signature. Une marque sénégalaise dédiée à sublimer 
            la beauté naturelle de votre peau.
          </p>
        </div>
      </div>

      {/* Notre Histoire */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-fuchsia-primary mb-4">
              Notre Histoire
            </h2>
            <div className="w-24 h-1 bg-gold-accent mx-auto mb-6"></div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-lg leading-relaxed">
              <strong className="text-fuchsia-primary">Maguita Skin</strong> est née d'une passion : 
              celle de révéler et sublimer la beauté naturelle de chaque femme sénégalaise. 
              Notre mission est simple mais profonde : offrir des gammes complètes de produits 
              cosmétiques de qualité supérieure, conçus spécialement pour les peaux africaines.
            </p>

            <p className="text-lg leading-relaxed">
              Chaque gamme est soigneusement élaborée avec des ingrédients de qualité pour 
              répondre aux besoins spécifiques de votre peau. De la préparation au traitement 
              en passant par l'entretien, nos produits vous accompagnent dans votre routine 
              beauté quotidienne.
            </p>

            <p className="text-lg leading-relaxed">
              <strong className="text-fuchsia-primary">Made in Senegal</strong>, nos produits 
              incarnent l'excellence africaine et notre engagement envers la qualité. Nous croyons 
              que chaque femme mérite d'avoir confiance en sa peau, et c'est cette conviction 
              qui guide chacune de nos actions.
            </p>
          </div>
        </div>
      </div>

      {/* Nos Valeurs */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-fuchsia-primary mb-4">
              Nos Valeurs
            </h2>
            <div className="w-24 h-1 bg-gold-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Qualité */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-fuchsia-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-fuchsia-primary mb-3">
                Qualité Supérieure
              </h3>
              <p className="text-gray-600">
                Des produits cosmétiques de haute qualité, testés et approuvés 
                pour votre peau
              </p>
            </div>

            {/* Authenticité */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-fuchsia-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-fuchsia-primary mb-3">
                Authenticité
              </h3>
              <p className="text-gray-600">
                100% Made in Senegal, nous sommes fiers de nos racines et 
                de notre savoir-faire local
              </p>
            </div>

            {/* Naturel */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-fuchsia-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLeaf className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-fuchsia-primary mb-3">
                Naturel & Sain
              </h3>
              <p className="text-gray-600">
                Des formules respectueuses de votre peau et de l'environnement
              </p>
            </div>

            {/* Passion */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-fuchsia-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-fuchsia-primary mb-3">
                Passion & Dévouement
              </h3>
              <p className="text-gray-600">
                Notre engagement est de sublimer votre beauté naturelle avec passion
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pourquoi Nous Choisir */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-fuchsia-primary mb-4">
              Pourquoi Choisir Maguita Skin ?
            </h2>
            <div className="w-24 h-1 bg-gold-accent mx-auto"></div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-pink-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-fuchsia-primary text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg text-fuchsia-primary mb-2">
                  Gammes Complètes et Cohérentes
                </h3>
                <p className="text-gray-700">
                  Chaque gamme contient tous les produits nécessaires pour une routine beauté 
                  complète : préparation, traitement et entretien. Plus besoin de chercher 
                  des produits compatibles ailleurs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-pink-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-fuchsia-primary text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg text-fuchsia-primary mb-2">
                  Spécialement Conçu pour les Peaux Africaines
                </h3>
                <p className="text-gray-700">
                  Nos formules sont adaptées aux spécificités des peaux noires et métissées, 
                  pour des résultats visibles et durables.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-pink-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-fuchsia-primary text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg text-fuchsia-primary mb-2">
                  Livraison Rapide et Fiable
                </h3>
                <p className="text-gray-700">
                  Commandez facilement via WhatsApp et recevez vos produits rapidement 
                  à Dakar et partout au Sénégal.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-pink-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-fuchsia-primary text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-bold text-lg text-fuchsia-primary mb-2">
                  Prix Transparent et Abordable
                </h3>
                <p className="text-gray-700">
                  20 000 FCFA par gamme complète (ou 15 000 FCFA en promo). 
                  Pas de frais cachés, juste une belle peau à portée de main.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-fuchsia-primary to-pink-600 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prête à Révéler Votre Éclat ?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Découvrez nos gammes complètes et commencez votre transformation beauté dès aujourd'hui
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#gammes"
              className="bg-gold-accent text-fuchsia-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-500 transition-colors inline-block"
            >
              Voir Nos Gammes
            </a>
            <a
              href="https://wa.me/221710469241"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-fuchsia-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Contactez-nous
            </a>
          </div>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
};

export default AboutPage;
