import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { gammeService } from '../services/api';
import HeroPromo from '../components/HeroPromo';
import HeroNormal from '../components/HeroNormal';
import GammeCard from '../components/GammeCard';
import WhatsAppButton from '../components/WhatsAppButton';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import NewsletterForm from '../components/NewsletterForm';
import GammeFilters from '../components/GammeFilters';
import SEO from '../components/SEO';
import TrustBadges from '../components/TrustBadges';

const HomePage = () => {
  const [gammes, setGammes] = useState([]);
  const [filteredGammes, setFilteredGammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const [filters, setFilters] = useState({
    category: 'all',
    promo: 'all',
    sort: 'name-asc'
  });

  useEffect(() => {
    const fetchGammes = async () => {
      try {
        const response = await gammeService.getAll({ inStock: true });
        setGammes(response.data.data);
        setFilteredGammes(response.data.data);
      } catch (err) {
        setError('Erreur lors du chargement des gammes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGammes();
  }, []);

  // Filtrer et trier les gammes
  useEffect(() => {
    let result = [...gammes];

    // Filtre de recherche
    if (searchQuery) {
      result = result.filter(gamme =>
        gamme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gamme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gamme.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtre par catégorie
    if (filters.category !== 'all') {
      result = result.filter(gamme => gamme.category === filters.category);
    }

    // Filtre par promo
    if (filters.promo === 'promo') {
      result = result.filter(gamme => gamme.isPromoActive);
    } else if (filters.promo === 'regular') {
      result = result.filter(gamme => !gamme.isPromoActive);
    }

    // Tri
    switch (filters.sort) {
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        result.sort((a, b) => {
          const priceA = a.isPromoActive ? a.promoPrice : a.regularPrice;
          const priceB = b.isPromoActive ? b.promoPrice : b.regularPrice;
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        result.sort((a, b) => {
          const priceA = a.isPromoActive ? a.promoPrice : a.regularPrice;
          const priceB = b.isPromoActive ? b.promoPrice : b.regularPrice;
          return priceB - priceA;
        });
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    setFilteredGammes(result);
  }, [searchQuery, gammes, filters]);

  // Vérifier si au moins une gamme est en promo
  const hasActivePromo = filteredGammes.some(gamme => gamme.isPromoActive);
  const promoCount = filteredGammes.filter(gamme => gamme.isPromoActive).length;
  const totalCount = filteredGammes.length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-fuchsia-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-fuchsia-primary text-white px-6 py-2 rounded-lg"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SEO 
        title="Accueil - Gammes Complètes de Cosmétiques Sénégalais"
        description="Découvrez nos gammes complètes de produits cosmétiques Made in Senegal. Teint éclatant, peau nourrie. Livraison Dakar et partout au Sénégal. Promo jusqu'à 15,000 FCFA."
        keywords="cosmétiques sénégal, produits beauté dakar, teint éclatant, gamme collagène, teint noir, maguita skin"
        url="/"
      />
      
      {/* Afficher la bannière promo si au moins une gamme est en promo, sinon la bannière normale */}
      {hasActivePromo ? (
        <HeroPromo 
          isPromoActive={true} 
          promoCount={promoCount} 
          totalCount={totalCount} 
        />
      ) : (
        <HeroNormal />
      )}

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      <div className="container mx-auto px-4 py-12">
        {searchQuery && (
          <div className="mb-6">
            <p className="text-gray-600">
              Résultats pour "<strong>{searchQuery}</strong>" : {filteredGammes.length} gamme(s)
            </p>
          </div>
        )}

        <h2 className="text-3xl md:text-4xl font-bold text-fuchsia-primary text-center mb-8">
          NOS GAMMES COMPLÈTES
        </h2>

        {/* Filters */}
        <GammeFilters filters={filters} onFilterChange={setFilters} />

        {filteredGammes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              {searchQuery ? 'Aucune gamme trouvée pour votre recherche.' : 'Aucune gamme disponible pour le moment.'}
            </p>
            {searchQuery && (
              <button
                onClick={() => window.location.href = '/'}
                className="bg-fuchsia-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
              >
                Voir toutes les gammes
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGammes.map((gamme) => (
              <GammeCard key={gamme._id} gamme={gamme} />
            ))}
          </div>
        )}
      </div>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-12">
        <NewsletterForm />
      </div>

      <WhatsAppButton />
    </div>
  );
};

export default HomePage;
