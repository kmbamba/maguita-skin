import { useState } from 'react';
import { FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import { newsletterService } from '../services/api';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await newsletterService.subscribe(email);
      setSuccess(true);
      setEmail('');
      
      // Réinitialiser après 5 secondes
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-fuchsia-primary to-pink-600 p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <FaEnvelope className="text-white text-xl" />
        <h3 className="text-white font-bold text-lg">Newsletter</h3>
      </div>
      
      <p className="text-white/90 text-sm mb-4">
        Recevez nos nouveautés et promotions exclusives
      </p>

      {success ? (
        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg flex items-center gap-2 text-white">
          <FaCheckCircle className="text-xl" />
          <span className="text-sm font-medium">Merci de votre inscription! 🎉</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
            required
            className="flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-accent"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gold-accent text-fuchsia-primary px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? 'Envoi...' : 'S\'inscrire'}
          </button>
        </form>
      )}

      {error && (
        <p className="text-white/90 text-sm mt-2 bg-red-500/30 p-2 rounded">
          {error}
        </p>
      )}
    </div>
  );
};

export default NewsletterForm;
