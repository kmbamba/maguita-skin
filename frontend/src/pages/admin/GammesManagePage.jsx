import { useState, useEffect } from 'react';
import { gammeService } from '../../services/api';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { API_URL } from '../../config/constants';

const GammesManagePage = () => {
  const [gammes, setGammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingGamme, setEditingGamme] = useState(null);
  const [globalPromoActive, setGlobalPromoActive] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    includedItems: '',
    category: 'autre',
    regularPrice: 20000,
    promoPrice: 15000,
    isPromoActive: true,
    inStock: true,
    featured: false
  });

  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    fetchGammes();
  }, []);

  const fetchGammes = async () => {
    try {
      const response = await gammeService.getAll();
      setGammes(response.data.data);
      // Vérifier si au moins une gamme a promo active
      const hasActivePromo = response.data.data.some(g => g.isPromoActive);
      setGlobalPromoActive(hasActivePromo);
    } catch (error) {
      toast.error('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleGlobalPromo = async (isActive) => {
    if (window.confirm(`${isActive ? 'Activer' : 'Désactiver'} la promo pour TOUTES les gammes ?`)) {
      try {
        await gammeService.toggleGlobalPromo(isActive);
        toast.success(`Promo ${isActive ? 'activée' : 'désactivée'} pour toutes les gammes !`);
        fetchGammes();
      } catch (error) {
        toast.error('Erreur lors du basculement');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = {
        ...formData,
        includedItems: formData.includedItems.split('\n').filter(item => item.trim())
      };

      let gammeId;

      if (editingGamme) {
        await gammeService.update(editingGamme._id, data);
        gammeId = editingGamme._id;
        toast.success('Gamme mise à jour');
      } else {
        const response = await gammeService.create(data);
        gammeId = response.data.data._id;
        toast.success('Gamme créée');
      }

      // Upload des images si présentes
      if (imageFiles.length > 0) {
        console.log('📤 Upload de', imageFiles.length, 'image(s) pour gamme ID:', gammeId);
        console.log('📝 Mode:', editingGamme ? 'MODIFICATION (remplacement)' : 'CRÉATION (ajout)');
        
        const formDataImages = new FormData();
        imageFiles.forEach((file, index) => {
          console.log(`  ${index + 1}. ${file.name} (${file.size} bytes)`);
          formDataImages.append('images', file);
        });

        try {
          // Si on modifie, remplacer les images, sinon ajouter
          const replaceParam = editingGamme ? '?replace=true' : '';
          const uploadUrl = `${API_URL}/upload/gamme/${gammeId}${replaceParam}`;
          console.log('📡 URL upload:', uploadUrl);
          
          const uploadResponse = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('admin-token')}`
            },
            body: formDataImages
          });
          
          console.log('📥 Réponse status:', uploadResponse.status);
          const responseData = await uploadResponse.json();
          console.log('📥 Réponse data:', responseData);
          
          if (uploadResponse.ok) {
            toast.success('Images uploadées avec succès');
          } else {
            console.error('❌ Erreur upload:', responseData);
            toast.warning('Gamme sauvegardée mais erreur lors de l\'upload des images');
          }
        } catch (error) {
          console.error('❌ Erreur upload images:', error);
          toast.warning('Gamme sauvegardée mais erreur lors de l\'upload des images');
        }
      } else {
        console.log('⚠️ Aucune image à uploader');
      }

      setShowModal(false);
      resetForm();
      fetchGammes();
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleEdit = (gamme) => {
    setEditingGamme(gamme);
    setFormData({
      ...gamme,
      includedItems: gamme.includedItems.join('\n')
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette gamme ?')) {
      try {
        await gammeService.delete(id);
        toast.success('Gamme supprimée');
        fetchGammes();
      } catch (error) {
        toast.error('Erreur de suppression');
      }
    }
  };

  const handleTogglePromo = async (id) => {
    try {
      await gammeService.togglePromo(id);
      toast.success('Promo basculée');
      fetchGammes();
    } catch (error) {
      toast.error('Erreur');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      includedItems: '',
      category: 'autre',
      regularPrice: 20000,
      promoPrice: 15000,
      isPromoActive: true,
      inStock: true,
      featured: false
    });
    setImageFiles([]);
    setEditingGamme(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-fuchsia-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-fuchsia-primary">Gestion des Gammes</h1>
        
        <div className="flex gap-3">
          {/* Toggle Promo Globale */}
          <button
            onClick={() => handleGlobalPromo(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
            title="Activer la promo pour toutes les gammes"
          >
            ✅ Activer Promo Globale
          </button>
          <button
            onClick={() => handleGlobalPromo(false)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
            title="Désactiver la promo pour toutes les gammes"
          >
            ❌ Désactiver Promo Globale
          </button>
          
          {/* Nouvelle Gamme */}
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-fuchsia-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-pink-700 transition-colors"
          >
            <FaPlus /> Nouvelle Gamme
          </button>
        </div>
      </div>

      {/* Info badge */}
      <div className={`mb-6 p-4 rounded-lg ${globalPromoActive ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
        <p className="text-sm">
          {globalPromoActive ? (
            <>🟢 <strong>Mode Promo Actif</strong> : Au moins une gamme est en promo</>
          ) : (
            <>🔴 <strong>Mode Normal</strong> : Aucune promo active</>
          )}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-fuchsia-primary text-white">
            <tr>
              <th className="px-6 py-4 text-left">Nom</th>
              <th className="px-6 py-4 text-left">Catégorie</th>
              <th className="px-6 py-4 text-left">Prix</th>
              <th className="px-6 py-4 text-center">Promo</th>
              <th className="px-6 py-4 text-center">Stock</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {gammes.map((gamme) => (
              <tr key={gamme._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{gamme.name}</td>
                <td className="px-6 py-4">{gamme.category}</td>
                <td className="px-6 py-4">
                  <div>
                    <span className={gamme.isPromoActive ? 'line-through text-gray-400 text-sm' : 'font-bold'}>
                      {gamme.regularPrice.toLocaleString()} F
                    </span>
                    {gamme.isPromoActive && (
                      <div className="font-bold text-red-600">
                        {gamme.promoPrice.toLocaleString()} F
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => handleTogglePromo(gamme._id)}>
                    {gamme.isPromoActive ? (
                      <FaToggleOn className="text-green-500 text-2xl" />
                    ) : (
                      <FaToggleOff className="text-gray-400 text-2xl" />
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-sm ${gamme.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {gamme.inStock ? 'En stock' : 'Rupture'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(gamme)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(gamme._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-fuchsia-primary">
              {editingGamme ? 'Modifier la Gamme' : 'Nouvelle Gamme'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-2">Nom *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-fuchsia-primary"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-fuchsia-primary"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Articles inclus (un par ligne) *</label>
                <textarea
                  name="includedItems"
                  value={formData.includedItems}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Gel Douche 500ml&#10;Lait Corporel 400ml&#10;Savon 200g"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-fuchsia-primary"
                />
              </div>

              {/* Upload d'images */}
              <div>
                <label className="block font-medium mb-2">Images de la gamme</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-fuchsia-primary"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Vous pouvez sélectionner plusieurs images (jpg, png, etc.)
                </p>
                {imageFiles.length > 0 && (
                  <p className="text-sm text-green-600 mt-2">
                    ✅ {imageFiles.length} image{imageFiles.length > 1 ? 's' : ''} sélectionnée{imageFiles.length > 1 ? 's' : ''}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-2">Catégorie</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-fuchsia-primary"
                  >
                    <option value="collagene">Collagène</option>
                    <option value="teint-noir">Teint Noir</option>
                    <option value="urgence">Urgence</option>
                    <option value="eclat">Éclat</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-2">Prix Normal (FCFA)</label>
                  <input
                    type="number"
                    name="regularPrice"
                    value={formData.regularPrice}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-fuchsia-primary"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Prix Promo (FCFA)</label>
                  <input
                    type="number"
                    name="promoPrice"
                    value={formData.promoPrice}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-fuchsia-primary"
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isPromoActive"
                    checked={formData.isPromoActive}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span>Promo active</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span>En stock</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span>À la une</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-fuchsia-primary text-white py-3 rounded-lg font-semibold hover:bg-pink-700"
                >
                  {editingGamme ? 'Mettre à jour' : 'Créer'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GammesManagePage;
