import { useState, useEffect } from 'react';
import { settingsService } from '../../services/api';
import { toast } from 'react-toastify';
import { FaSave, FaSync } from 'react-icons/fa';

const SettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    nameFull: '',
    emoji: ''
  });

  // Charger les paramètres actuels
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await settingsService.get();
      const { promo } = response.data;
      setFormData({
        name: promo.name,
        nameFull: promo.nameFull,
        emoji: promo.emoji
      });
    } catch (error) {
      console.error('Erreur chargement paramètres:', error);
      toast.error('Erreur lors du chargement des paramètres');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.error('Le nom court est obligatoire');
      return;
    }
    if (!formData.nameFull.trim()) {
      toast.error('Le nom complet est obligatoire');
      return;
    }

    try {
      setSaving(true);
      await settingsService.update({
        promo: {
          name: formData.name.trim(),
          nameFull: formData.nameFull.trim(),
          emoji: formData.emoji.trim()
        }
      });
      
      toast.success('✅ Paramètres enregistrés ! Le site va se mettre à jour automatiquement.');
      
      // Recharger pour confirmer
      setTimeout(() => {
        fetchSettings();
      }, 1000);
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const emojiSuggestions = [
    { emoji: '🔥', label: 'Feu (urgence)' },
    { emoji: '⚡', label: 'Éclair (flash)' },
    { emoji: '🎁', label: 'Cadeau (offre)' },
    { emoji: '💥', label: 'Explosion (impact)' },
    { emoji: '✨', label: 'Étoiles (nouveauté)' },
    { emoji: '🎉', label: 'Fête (célébration)' },
    { emoji: '🌟', label: 'Étoile (exclusif)' },
    { emoji: '💜', label: 'Cœur violet' },
    { emoji: '🐑', label: 'Mouton (Tabaski)' },
    { emoji: '🌙', label: 'Lune (Ramadan)' },
    { emoji: '☀️', label: 'Soleil (été)' },
    { emoji: '🇸🇳', label: 'Sénégal' }
  ];

  const promoExamples = [
    { name: 'PROMO MAGAL', nameFull: 'MEGA PROMO MAGAL', emoji: '🔥' },
    { name: 'PROMO TABASKI', nameFull: 'MEGA PROMO TABASKI', emoji: '🐑' },
    { name: 'PROMO RAMADAN', nameFull: 'MEGA PROMO RAMADAN', emoji: '🌙' },
    { name: 'SOLDES D\'ÉTÉ', nameFull: 'MEGA SOLDES D\'ÉTÉ', emoji: '☀️' },
    { name: 'BLACK FRIDAY', nameFull: 'MEGA BLACK FRIDAY', emoji: '⚡' }
  ];

  const applyExample = (example) => {
    setFormData(example);
    toast.info(`Exemple "${example.name}" appliqué. N'oubliez pas d'enregistrer !`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">⚙️ Paramètres du Site</h1>
        <p className="text-gray-600">
          Gérez facilement le nom de vos promotions. Les changements s'appliquent instantanément sur tout le site.
        </p>
      </div>

      {/* Formulaire Principal */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🔥 Configuration de la Promo</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Nom Court */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom Court <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: PROMO MAGAL"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-primary focus:border-transparent"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                📍 Apparaît sur les badges des produits (cards)
              </p>
            </div>

            {/* Nom Complet */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom Complet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nameFull"
                value={formData.nameFull}
                onChange={handleChange}
                placeholder="Ex: MEGA PROMO MAGAL"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-primary focus:border-transparent"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                📍 Apparaît dans la grande bannière en haut de la page d'accueil
              </p>
            </div>

            {/* Emoji */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emoji (optionnel)
              </label>
              <input
                type="text"
                name="emoji"
                value={formData.emoji}
                onChange={handleChange}
                placeholder="Ex: 🔥"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-primary focus:border-transparent"
                maxLength="2"
              />
              <p className="text-sm text-gray-500 mt-1">
                📍 Emoji qui apparaît avant le texte de la promo
              </p>

              {/* Suggestions d'emojis */}
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-sm text-gray-600 mr-2">Suggestions :</span>
                {emojiSuggestions.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setFormData({ ...formData, emoji: item.emoji })}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                    title={item.label}
                  >
                    {item.emoji} {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Aperçu */}
            <div className="bg-gradient-to-r from-fuchsia-primary to-pink-600 text-white p-6 rounded-lg">
              <p className="text-sm font-medium mb-3">👁️ Aperçu</p>
              <div className="space-y-3">
                <div className="bg-white/10 backdrop-blur rounded p-3">
                  <p className="text-xs text-white/70 mb-1">Bannière Hero :</p>
                  <p className="text-xl font-bold">
                    {formData.emoji} MEGA {formData.name || 'PROMO'}
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded p-3">
                  <p className="text-xs text-white/70 mb-1">Badge Produit :</p>
                  <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {formData.emoji} {formData.name || 'PROMO'}
                  </span>
                </div>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-fuchsia-primary text-white py-3 px-6 rounded-lg hover:bg-fuchsia-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <FaSync className="animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <FaSave />
                    Enregistrer
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={fetchSettings}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Annuler
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Exemples Prédéfinis */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">💡 Exemples Prédéfinis</h2>
        <p className="text-gray-600 mb-4">
          Cliquez sur un exemple pour l'appliquer rapidement :
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {promoExamples.map((example, index) => (
            <button
              key={index}
              type="button"
              onClick={() => applyExample(example)}
              className="text-left p-4 border-2 border-gray-200 rounded-lg hover:border-fuchsia-primary hover:bg-fuchsia-50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{example.emoji}</span>
                <div>
                  <p className="font-bold text-gray-900 group-hover:text-fuchsia-primary">
                    {example.name}
                  </p>
                  <p className="text-sm text-gray-500">{example.nameFull}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Aide */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-bold text-blue-900 mb-2">ℹ️ Aide</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Les changements s'appliquent immédiatement sur tout le site</li>
          <li>• Le <strong>nom court</strong> apparaît sur les badges des produits</li>
          <li>• Le <strong>nom complet</strong> apparaît dans la bannière principale</li>
          <li>• L'<strong>emoji</strong> est optionnel mais recommandé pour attirer l'attention</li>
          <li>• N'oubliez pas de cliquer "Enregistrer" après vos modifications</li>
        </ul>
      </div>
    </div>
  );
};

export default SettingsPage;
