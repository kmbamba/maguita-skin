import { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import { beforeAfterService } from '../services/api';
import WhatsAppButton from '../components/WhatsAppButton';
import SEO from '../components/SEO';
import LazyImage from '../components/LazyImage';
import { getImageUrl } from '../config/constants';

const BeforeAfterPage = () => {
  const [beforeAfters, setBeforeAfters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showBefore, setShowBefore] = useState(true);

  useEffect(() => {
    const fetchBeforeAfters = async () => {
      try {
        const response = await beforeAfterService.getApproved();
        setBeforeAfters(response.data.data);
      } catch (error) {
        console.error('Erreur chargement before/after:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBeforeAfters();
  }, []);

  const openLightbox = (item) => {
    setSelectedImage(item);
    setShowBefore(true);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-fuchsia-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO 
        title="Avant/Après - Résultats Réels | Maguita Skin"
        description="Découvrez les transformations réelles de nos clientes avec les gammes Maguita Skin. Photos avant/après authentiques et témoignages de résultats visibles."
        keywords="avant après, résultats maguita skin, transformation peau, témoignages, photos réelles, cosmétiques efficaces"
        url="/before-after"
      />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-fuchsia-primary to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Avant / Après
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Les résultats parlent d'eux-mêmes. Découvrez les transformations de nos clientes.
          </p>
        </div>
      </div>

      {/* Gallery */}
      <div className="container mx-auto px-4 py-12">
        {beforeAfters.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Aucune photo avant/après disponible pour le moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beforeAfters.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
                onClick={() => openLightbox(item)}
              >
                {/* Images Comparison */}
                <div className="relative h-64 group">
                  <div className="absolute inset-0 grid grid-cols-2">
                    <div className="relative overflow-hidden">
                      <LazyImage
                        src={getImageUrl(item.beforeImage.url)}
                        alt="Avant"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        AVANT
                      </div>
                    </div>
                    <div className="relative overflow-hidden">
                      <LazyImage
                        src={getImageUrl(item.afterImage.url)}
                        alt="Après"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-fuchsia-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                        APRÈS
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                    <span className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      Cliquer pour agrandir
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-fuchsia-primary mb-2">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                  )}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    {item.duration && (
                      <span className="font-semibold">Durée: {item.duration}</span>
                    )}
                    {item.gamme && (
                      <span className="text-fuchsia-primary font-semibold">
                        {item.gamme.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 z-10"
          >
            <FaTimes />
          </button>

          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* Toggle Button */}
            <div className="flex justify-center mb-4">
              <button
                onClick={() => setShowBefore(!showBefore)}
                className="bg-white px-6 py-3 rounded-full font-bold text-fuchsia-primary flex items-center gap-3 hover:bg-gray-100 transition-colors"
              >
                {showBefore ? (
                  <>
                    <span>Voir APRÈS</span>
                    <FaArrowRight />
                  </>
                ) : (
                  <>
                    <FaArrowLeft />
                    <span>Voir AVANT</span>
                  </>
                )}
              </button>
            </div>

            {/* Image Display */}
            <div className="relative">
              <LazyImage
                src={getImageUrl(showBefore ? selectedImage.beforeImage.url : selectedImage.afterImage.url)}
                alt={showBefore ? 'Avant' : 'Après'}
                className="w-full max-h-[70vh] object-contain rounded-lg"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-fuchsia-primary">
                {showBefore ? 'AVANT' : 'APRÈS'}
              </div>
            </div>

            {/* Info */}
            <div className="bg-white rounded-lg p-6 mt-4">
              <h3 className="font-bold text-2xl text-fuchsia-primary mb-3">
                {selectedImage.title}
              </h3>
              {selectedImage.description && (
                <p className="text-gray-700 mb-3">{selectedImage.description}</p>
              )}
              <div className="flex flex-wrap gap-4 text-sm">
                {selectedImage.duration && (
                  <span className="bg-fuchsia-50 text-fuchsia-primary px-4 py-2 rounded-full font-semibold">
                    ⏱️ Durée: {selectedImage.duration}
                  </span>
                )}
                {selectedImage.gamme && (
                  <span className="bg-gold-primary/20 text-fuchsia-primary px-4 py-2 rounded-full font-semibold">
                    💄 {selectedImage.gamme.name}
                  </span>
                )}
                {selectedImage.customerName && (
                  <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-semibold">
                    👤 {selectedImage.customerName}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <WhatsAppButton />
    </div>
  );
};

export default BeforeAfterPage;
