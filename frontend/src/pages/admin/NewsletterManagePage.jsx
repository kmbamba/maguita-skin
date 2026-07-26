import { useState, useEffect } from 'react';
import { FaEnvelope, FaTrash, FaDownload, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { newsletterService } from '../../services/api';
import { toast } from 'react-toastify';

const NewsletterManagePage = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, inactive
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await newsletterService.getSubscribers();
      setSubscribers(response.data.data);
      setStats(response.data.stats);
    } catch (error) {
      toast.error('Erreur lors du chargement des inscrits');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet inscrit ?')) return;

    try {
      await newsletterService.deleteSubscriber(id);
      toast.success('Inscrit supprimé');
      fetchSubscribers();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
      console.error(error);
    }
  };

  const handleExportEmails = () => {
    const activeEmails = subscribers
      .filter(s => s.isActive)
      .map(s => s.email)
      .join('\n');

    const blob = new Blob([activeEmails], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-emails-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success(`${subscribers.filter(s => s.isActive).length} emails exportés`);
  };

  const filteredSubscribers = subscribers.filter(s => {
    if (filter === 'active') return s.isActive;
    if (filter === 'inactive') return !s.isActive;
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-fuchsia-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-fuchsia-primary flex items-center gap-3">
          <FaEnvelope />
          Gestion Newsletter
        </h1>
        <button
          onClick={handleExportEmails}
          className="bg-fuchsia-primary text-white px-4 md:px-6 py-3 rounded-lg text-sm font-semibold hover:bg-pink-700 transition-colors flex items-center gap-2 justify-center"
        >
          <FaDownload />
          Exporter Emails
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm mb-2">Total Inscrits</p>
          <p className="text-3xl font-bold text-fuchsia-primary">{stats.total}</p>
        </div>
        <div className="bg-green-50 rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm mb-2">Actifs</p>
          <p className="text-3xl font-bold text-green-600">{stats.active}</p>
        </div>
        <div className="bg-red-50 rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm mb-2">Inactifs</p>
          <p className="text-3xl font-bold text-red-600">{stats.inactive}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'all'
                ? 'bg-fuchsia-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tous ({stats.total})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'active'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Actifs ({stats.active})
          </button>
          <button
            onClick={() => setFilter('inactive')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'inactive'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Inactifs ({stats.inactive})
          </button>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-fuchsia-primary text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Statut</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Date Inscription</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                    Aucun inscrit dans cette catégorie
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-gray-400 flex-shrink-0" />
                        <span className="font-medium text-gray-900 text-sm break-all">{subscriber.email}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {subscriber.isActive ? (
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                          <FaCheckCircle />
                          Actif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                          <FaTimesCircle />
                          Inactif
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">
                      {new Date(subscriber.subscribedAt).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(subscriber._id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 text-xs font-semibold"
                      >
                        <FaTrash />
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <p className="text-blue-900 text-sm">
          <strong>💡 Astuce:</strong> Utilisez le bouton "Exporter Emails" pour obtenir une liste de tous les emails actifs. 
          Vous pouvez ensuite les importer dans votre service d'emailing (MailChimp, SendinBlue, etc.)
        </p>
      </div>
    </div>
  );
};

export default NewsletterManagePage;
