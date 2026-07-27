import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { testimonialService } from '../services/api';

const TestimonialForm = ({ gammeId = null, onSuccess = null }) => {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    comment: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.comment) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (rating === 0) {
      toast.error('Veuillez donner une note');
      return;
    }

    setLoading(true);

    try {
      const testimonialData = {
        ...formData,
        rating,
        gamme: gammeId || undefined // Optionnel
      };

      await testimonialService.create(testimonialData);
      
      toast.success('Merci pour votre témoignage ! Il sera publié après validation. 🎉');
      
      // Reset form
      setFormData({ name: '', location: '', comment: '' });
      setRating(0);
      
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors de l\'envoi du témoignage');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-fuchsia-primary mb-4">
        Laissez votre témoignage
      </h3>
      <p className="text-gray-600 mb-6">
        Partagez votre expérience avec nos produits
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nom */}
        <div>
          <label className="block text-sm font-medium mb-2">Nom *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Votre nom"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-primary focus:border-transparent"
          />
        </div>

        {/* Ville */}
        <div>
          <label className="block text-sm font-medium mb-2">Ville</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Ex: Dakar"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-primary focus:border-transparent"
          />
        </div>

        {/* Note avec étoiles */}
        <div>
          <label className="block text-sm font-medium mb-2">Note *</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform hover:scale-110"
              >
                <FaStar
                  size={32}
                  className={
                    star <= (hoverRating || rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              {rating === 5 && '⭐ Excellent !'}
              {rating === 4 && '👍 Très bien !'}
              {rating === 3 && '😊 Bien'}
              {rating === 2 && '😐 Moyen'}
              {rating === 1 && '😞 Décevant'}
            </p>
          )}
        </div>

        {/* Commentaire */}
        <div>
          <label className="block text-sm font-medium mb-2">Votre témoignage *</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Partagez votre expérience avec nos produits..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-primary focus:border-transparent resize-none"
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">
            Votre témoignage sera vérifié avant publication
          </p>
        </div>

        {/* Bouton submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-fuchsia-primary text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Envoi en cours...' : 'Envoyer mon témoignage'}
        </button>
      </form>
    </div>
  );
};

export default TestimonialForm;
