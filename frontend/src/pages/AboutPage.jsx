import { FaHeart, FaStar, FaLeaf, FaAward } from 'react-icons/fa';
import SEO from '../components/SEO';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="À Propos - Maguita Skin | Notre Histoire & Valeurs"
        description="Découvrez l'histoire de Maguita Skin, marque sénégalaise de cosmétiques. Notre passion pour la beauté naturelle et le bien-être de la peau africaine depuis 2020."
        keywords="maguita skin, à propos, histoire, valeurs, cosmétiques sénégal, made in senegal, beauté africaine"
        url="/about"
      />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-fuchsia-primary to-pink-600 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">À Propos de Maguita Skin</h1>
          <p className="text-xl md:text-2xl opacity-90">
            La beauté naturelle au cœur de nos valeurs
          </p>
        </div>
      </div>

      {/* Notre Histoire */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-fuchsia-primary mb-6 text-center">
            Notre Histoire
          </h2>
          <div className="prose prose-lg mx-auto text-gray-700">
            <p className="mb-4">
              Maguita Skin est née d'une passion profonde pour la beauté authentique et le bien-être de la peau africaine. 
              Fondée au Sénégal, notre marque s'est donnée pour mission de révéler la beauté naturelle de chaque femme 
              à travers des gammes de produits cosmétiques soigneusement élaborés.
            </p>
            <p className="mb-4">
              Notre nom, <strong>Maguita</strong>, signifie "celle qui illumine" en wolof, reflétant parfaitement notre 
              engagement à faire rayonner la beauté de nos clientes. Chaque produit est conçu avec amour et rigueur, 
              en tenant compte des spécificités de la peau africaine.
            </p>
            <p>
              Depuis nos débuts, nous avons su conquérir le cœur de milliers de femmes au Sénégal et en Afrique de l'Ouest, 
              grâce à l'efficacité de nos formules et la qualité de nos gammes complètes.
            </p>
          </div>
        </div>
      </div>

      {/* Nos Valeurs */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-fuchsia-primary mb-12 text-center">
            Nos Valeurs
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-fuchsia-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-fuchsia-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Authenticité</h3>
              <p className="text-gray-600">
                Des produits authentiques pour une beauté naturelle et respectueuse de votre peau
              </p>
            </div>

            <div className="text-center">
              <div className="bg-fuchsia-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-fuchsia-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Qualité</h3>
              <p className="text-gray-600">
                Une sélection rigoureuse d'ingrédients pour des résultats visibles et durables
              </p>
            </div>

            <div className="text-center">
              <div className="bg-fuchsia-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLeaf className="text-fuchsia-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Naturalité</h3>
              <p className="text-gray-600">
                Des formules respectueuses de la nature et de votre santé
              </p>
            </div>

            <div className="text-center">
              <div className="bg-fuchsia-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward className="text-fuchsia-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-gray-600">
                Un engagement constant vers l'excellence dans chaque produit que nous créons
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* La Fondatrice */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-fuchsia-primary mb-8 text-center">
            La Fondatrice
          </h2>
          
          <div className="bg-white rounded-xl shadow-lg p-8 md:flex gap-8 items-center">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-fuchsia-primary to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-white text-6xl font-bold">M</span>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold mb-2">Maguita Diop</h3>
              <p className="text-fuchsia-primary font-semibold mb-4">Fondatrice & CEO</p>
              <p className="text-gray-700 mb-4">
                Passionnée de cosmétique et de beauté depuis son plus jeune âge, Maguita a transformé sa passion 
                en une mission : offrir aux femmes africaines des produits de qualité qui célèbrent et subliment 
                leur beauté naturelle.
              </p>
              <p className="text-gray-700">
                Avec plus de 10 ans d'expérience dans le domaine de la beauté et du bien-être, elle a créé Maguita Skin 
                pour répondre aux besoins spécifiques de la peau africaine, en proposant des gammes complètes et efficaces.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notre Engagement */}
      <div className="bg-fuchsia-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-fuchsia-primary mb-6">
              Notre Engagement
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Chez Maguita Skin, nous nous engageons à vous offrir des produits de haute qualité, 
              testés et approuvés, pour sublimer votre beauté au quotidien.
            </p>
            <p className="text-lg text-gray-700">
              Chaque gamme est conçue pour offrir une routine complète et harmonieuse, 
              garantissant des résultats visibles et une satisfaction totale.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
