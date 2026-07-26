import { useState, useEffect } from 'react';
import { FaStar, FaCheck, FaTimes, FaTrash, FaEye } from 'react-icons/fa';
import { testimonialService } from '../../services/api';
import { toast } from 'react-toastify';

const TestimonialsManagePage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, approved, pending

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await testimonialService.getAll();
      setTestimonials(response.data.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des témoignages');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await testimonialService.approve(id);
      toast.success('Statut d\'approbation modifié');
      fetchTestimonials();
    } catch (error) {
      toast.error('Erreur lors de la modification');
      console.error(error);
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      await testimonialService.toggleFeatured(id);
      toast.success('Mise en avant modifiée');
      fetchTestimonials();
    } catch (error) {
      toast.error('Erreur lors de la modification');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) return;

    try {
      await testimonialService.delete(id);
      toast.success('Témoignage supprimé');
      fetchTestimonials();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
      console.error(error);
    }
  };

  const filteredTestimonials = testimonials.filter(t => {
    if (filter === 'approved') return t.isApproved;
    if (filter === 'pending') return !t.isApproved;
    return true;
  });

  const stats = {
    total: testimonials.length,
    approved: testimonials.filter(t => t.isApproved).length,
    pending: testimonials.filter(t => !t.isApproved).length,
    featured: testimonials.filter(t => t.isFeatured).length
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-fuchsia-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-fuchsia-primary">
          Gestion des Témoignages
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-3 md:p-4">
          <p className="text-gray-600 text-xs md:text-sm">Total</p>
          <p className="text-xl md:text-2xl font-bold text-fuchsia-primary">{stats.total}</p>
        </div>
        <div className="bg-green-50 rounded-lg shadow p-3 md:p-4">
          <p className="text-gray-600 text-xs md:text-sm">Approuvés</p>
          <p className="text-xl md:text-2xl font-bold text-green-600">{stats.approved}</p>
        </div>
        <div className="bg-orange-50 rounded-lg shadow p-3 md:p-4">
          <p className="text-gray-600 text-xs md:text-sm">En attente</p>
          <p className="text-xl md:text-2xl font-bold text-orange-600">{stats.pending}</p>
        </div>
        <div className="bg-gold-primary/20 rounded-lg shadow p-3 md:p-4">
          <p className="text-gray-600 text-xs md:text-sm">Mis en avant</p>
          <p className="text-xl md:text-2xl font-bold text-fuchsia-primary">{stats.featured}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-3 md:p-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 md:px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              filter === 'all'
                ? 'bg-fuchsia-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tous ({stats.total})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-3 md:px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              filter === 'approved'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Approuvés ({stats.approved})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 md:px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              filter === 'pending'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            En attente ({stats.pending})
          </button>
        </div>
      </div>

      {/* Testimonials List */}
      {filteredTestimonials.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">Aucun témoignage dans cette catégorie</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="bg-white rounded-lg shadow p-4 md:p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  {/* Rating */}
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm md:text-base ${
                          i < testimonial.rating ? 'text-gold-primary' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Author */}
                  <h3 className="font-bold text-base md:text-lg text-fuchsia-primary mb-1">
                    {testimonial.name}
                    {testimonial.location && (
                      <span className="text-gray-500 text-xs md:text-sm font-normal ml-2">
                        ({testimonial.location})
                      </span>
                    )}
                  </h3>

                  {/* Comment */}
                  <p className="text-sm md:text-base text-gray-700 mb-3 italic">"{testimonial.comment}"</p>

                  {/* Gamme */}
                  {testimonial.gamme && (
                    <p className="text-xs md:text-sm text-gray-600">
                      <span className="font-semibold">Gamme:</span> {testimonial.gamme.name}
                    </p>
                  )}

                  {/* Date */}
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(testimonial.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col gap-2">
                  {/* Status Badges */}
                  <div className="flex flex-wrap md:flex-col gap-2 mb-2">
                    {testimonial.isApproved && (
                      <span className="bg-green-100 text-green-700 px-2 md:px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 whitespace-nowrap">
                        <FaCheck /> Approuvé
                      </span>
                    )}
                    {!testimonial.isApproved && (
                      <span className="bg-orange-100 text-orange-700 px-2 md:px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 whitespace-nowrap">
                        <FaEye /> En attente
                      </span>
                    )}
                    {testimonial.isFeatured && (
                      <span className="bg-gold-primary/20 text-fuchsia-primary px-2 md:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                        ⭐ Vedette
                      </span>
                    )}
                  </div>

                  {/* Buttons */}
                  <button
                    onClick={() => handleApprove(testimonial._id)}
                    className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold text-white transition-colors whitespace-nowrap ${
                      testimonial.isApproved
                        ? 'bg-orange-500 hover:bg-orange-600'
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {testimonial.isApproved ? 'Désapprouver' : 'Approuver'}
                  </button>
                  
                  <button
                    onClick={() => handleToggleFeatured(testimonial._id)}
                    className="px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold bg-gold-primary text-white hover:bg-yellow-500 transition-colors whitespace-nowrap"
                  >
                    {testimonial.isFeatured ? 'Retirer' : 'Vedette'}
                  </button>
                  
                  <button
                    onClick={() => handleDelete(testimonial._id)}
                    className="px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center gap-2 justify-center whitespace-nowrap"
                  >
                    <FaTrash /> Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsManagePage;
