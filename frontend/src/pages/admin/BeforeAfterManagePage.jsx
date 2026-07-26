import { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaCheck, FaTimes, FaStar, FaUpload } from 'react-icons/fa';
import { beforeAfterService, gammeService } from '../../services/api';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_URL, getImageUrl } from '../../config/constants';

const BeforeAfterManagePage = () => {
  const [beforeAfters, setBeforeAfters] = useState([]);
  const [gammes, setGammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    gamme: '',
    duration: '',
    customerName: ''
  });
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [beforeAfterRes, gammesRes] = await Promise.all([
        beforeAfterService.getAll(),
        gammeService.getAll()
      ]);
      setBeforeAfters(beforeAfterRes.data.data);
      setGammes(gammesRes.data.data);
    } catch (error) {
      toast.error('Erreur lors du chargement');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!beforeImage || !afterImage) {
      toast.error('Veuillez sélectionner les 2 images (avant et après)');
      return;
    }

    setUploading(true);

    try {
      // 1. Créer l'entrée Before/After
      const response = await beforeAfterService.create(formData);
      const beforeAfterId = response.data.data._id;

      // 2. Upload les images
      const formDataUpload = new FormData();
      formDataUpload.append('images', beforeImage);
      formDataUpload.append('images', afterImage);

      const token = localStorage.getItem('admin-token');
      await axios.post(
        `${API_URL}/upload/before-after/${beforeAfterId}`,
        formDataUpload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success('Before/After créé avec succès!');
      setShowModal(false);
      resetForm();
      fetchData();
    } catch (error) {
      toast.error('Erreur lors de la création');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      gamme: '',
      duration: '',
      customerName: ''
    });
    setBeforeImage(null);
    setAfterImage(null);
  };

  const handleApprove = async (id) => {
    try {
      await beforeAfterService.approve(id);
      toast.success('Statut d\'approbation modifié');
      fetchData();
    } catch (error) {
      toast.error('Erreur');
      console.error(error);
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      await beforeAfterService.toggleFeatured(id);
      toast.success('Mise en avant modifiée');
      fetchData();
    } catch (error) {
      toast.error('Erreur');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce Before/After ?')) return;

    try {
      await beforeAfterService.delete(id);
      toast.success('Before/After supprimé');
      fetchData();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
      console.error(error);
    }
  };

  const stats = {
    total: beforeAfters.length,
    approved: beforeAfters.filter(b => b.isApproved).length,
    featured: beforeAfters.filter(b => b.isFeatured).length
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-fuchsia-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-fuchsia-primary">
          Gestion Avant/Après
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-fuchsia-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors flex items-center gap-2"
        >
          <FaPlus />
          Ajouter Before/After
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Total</p>
          <p className="text-2xl font-bold text-fuchsia-primary">{stats.total}</p>
        </div>
        <div className="bg-green-50 rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Approuvés</p>
          <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
        </div>
        <div className="bg-gold-primary/20 rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Mis en avant</p>
          <p className="text-2xl font-bold text-fuchsia-primary">{stats.featured}</p>
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beforeAfters.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow">
            {/* Images */}
            <div className="grid grid-cols-2 h-48">
              <div className="relative">
                <img
                  src={getImageUrl(item.beforeImage.url)}
                  alt="Avant"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-bold">
                  AVANT
                </span>
              </div>
              <div className="relative">
                <img
                  src={getImageUrl(item.afterImage.url)}
                  alt="Après"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 right-2 bg-fuchsia-primary text-white px-2 py-1 rounded text-xs font-bold">
                  APRÈS
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-bold text-lg text-fuchsia-primary mb-2">{item.title}</h3>
              
              {item.description && (
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
              )}

              <div className="flex flex-wrap gap-2 mb-3 text-xs">
                {item.duration && (
                  <span className="bg-gray-100 px-2 py-1 rounded">⏱️ {item.duration}</span>
                )}
                {item.customerName && (
                  <span className="bg-gray-100 px-2 py-1 rounded">👤 {item.customerName}</span>
                )}
                {item.gamme && (
                  <span className="bg-fuchsia-50 text-fuchsia-primary px-2 py-1 rounded font-semibold">
                    {item.gamme.name}
                  </span>
                )}
              </div>

              {/* Status */}
              <div className="flex gap-2 mb-3">
                {item.isApproved && (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                    <FaCheck /> Approuvé
                  </span>
                )}
                {item.isFeatured && (
                  <span className="bg-gold-primary/20 text-fuchsia-primary px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                    <FaStar /> Vedette
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleApprove(item._id)}
                  className={`px-3 py-2 rounded text-sm font-semibold text-white ${
                    item.isApproved ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {item.isApproved ? 'Désapprouver' : 'Approuver'}
                </button>
                <button
                  onClick={() => handleToggleFeatured(item._id)}
                  className="px-3 py-2 rounded text-sm font-semibold bg-gold-primary text-white hover:bg-yellow-500"
                >
                  {item.isFeatured ? 'Retirer vedette' : 'Mettre en vedette'}
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-3 py-2 rounded text-sm font-semibold bg-red-500 text-white hover:bg-red-600 flex items-center justify-center gap-2"
                >
                  <FaTrash /> Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Create */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-fuchsia-primary">Nouveau Before/After</h2>
                <button onClick={() => { setShowModal(false); resetForm(); }} className="text-gray-500 hover:text-gray-700">
                  <FaTimes size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Titre *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-fuchsia-primary"
                    placeholder="Ex: Transformation teint éclatant"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-fuchsia-primary"
                    rows="3"
                    placeholder="Description optionnelle"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Gamme
                    </label>
                    <select
                      value={formData.gamme}
                      onChange={(e) => setFormData({ ...formData, gamme: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-fuchsia-primary"
                    >
                      <option value="">Sélectionner une gamme</option>
                      {gammes.map(g => (
                        <option key={g._id} value={g._id}>{g.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Durée du traitement
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-fuchsia-primary"
                      placeholder="Ex: 4 semaines"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom du client (optionnel)
                  </label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-fuchsia-primary"
                    placeholder="Ex: Fatou D."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Image AVANT *
                    </label>
                    <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-fuchsia-primary transition-colors">
                      <FaUpload className="text-3xl text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">
                        {beforeImage ? beforeImage.name : 'Choisir une image'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={(e) => setBeforeImage(e.target.files[0])}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Image APRÈS *
                    </label>
                    <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-fuchsia-primary transition-colors">
                      <FaUpload className="text-3xl text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">
                        {afterImage ? afterImage.name : 'Choisir une image'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={(e) => setAfterImage(e.target.files[0])}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 bg-fuchsia-primary text-white py-3 rounded-lg font-semibold hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? 'Création en cours...' : 'Créer Before/After'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); resetForm(); }}
                    className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-100"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeforeAfterManagePage;
