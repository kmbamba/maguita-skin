import { useState, useEffect } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import { testimonialService } from '../services/api';

const TestimonialsCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await testimonialService.getApproved({ featured: 'true', limit: 10 });
        setTestimonials(response.data.data);
      } catch (error) {
        console.error('Erreur chargement témoignages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (testimonials.length === 0) return;
    
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="animate-pulse text-center">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const current = testimonials[currentIndex];

  return (
    <div className="py-16 bg-gradient-to-br from-fuchsia-50 to-pink-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-fuchsia-primary text-center mb-12">
          Ce Que Disent Nos Clientes
        </h2>

        <div className="max-w-4xl mx-auto relative">
          {/* Navigation Buttons */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white p-3 rounded-full shadow-lg hover:bg-fuchsia-primary hover:text-white transition-all z-10"
                aria-label="Témoignage précédent"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white p-3 rounded-full shadow-lg hover:bg-fuchsia-primary hover:text-white transition-all z-10"
                aria-label="Témoignage suivant"
              >
                <FaChevronRight />
              </button>
            </>
          )}

          {/* Testimonial Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
            <FaQuoteLeft className="text-5xl text-fuchsia-primary/20 absolute top-6 left-6" />
            
            <div className="relative z-10">
              {/* Rating */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-xl ${
                      i < current.rating ? 'text-gold-primary' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 text-lg md:text-xl text-center mb-8 italic leading-relaxed">
                "{current.comment}"
              </p>

              {/* Author Info */}
              <div className="text-center">
                <p className="font-bold text-fuchsia-primary text-xl mb-1">
                  {current.name}
                </p>
                {current.location && (
                  <p className="text-gray-500 text-sm mb-2">{current.location}</p>
                )}
                {current.gamme && (
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold">Gamme:</span> {current.gamme.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-fuchsia-primary w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
