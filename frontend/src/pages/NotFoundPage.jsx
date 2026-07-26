import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';
import SEO from '../components/SEO';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-50 to-pink-50 px-4">
      <SEO 
        title="Page Non Trouvée - 404 | Maguita Skin"
        description="La page que vous recherchez n'existe pas. Retournez à l'accueil pour découvrir nos gammes de produits cosmétiques."
        url="/404"
      />
      
      <div className="text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-fuchsia-primary animate-bounce">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Page Non Trouvée
          </h2>
          <p className="text-gray-600 text-lg mb-2">
            Désolé, la page que vous recherchez n'existe pas.
          </p>
          <p className="text-gray-500">
            Elle a peut-être été déplacée ou supprimée.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-fuchsia-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-pink-700 transition-colors shadow-lg"
          >
            <FaHome size={20} />
            Retour à l'Accueil
          </Link>
          
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-white text-fuchsia-primary border-2 border-fuchsia-primary px-8 py-4 rounded-xl font-bold hover:bg-fuchsia-50 transition-colors"
          >
            <FaSearch size={20} />
            Voir Nos Gammes
          </Link>
        </div>

        {/* Links Rapides */}
        <div className="mt-12 text-sm text-gray-600">
          <p className="mb-3">Liens rapides :</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/about" className="hover:text-fuchsia-primary transition-colors">
              À Propos
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-fuchsia-primary transition-colors">
              Contact
            </Link>
            <span>•</span>
            <Link to="/faq" className="hover:text-fuchsia-primary transition-colors">
              FAQ
            </Link>
            <span>•</span>
            <Link to="/before-after" className="hover:text-fuchsia-primary transition-colors">
              Avant/Après
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
