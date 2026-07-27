import { useState, useEffect } from 'react';
import { orderService } from '../../services/api';
import { toast } from 'react-toastify';
import { FaEye, FaWhatsapp } from 'react-icons/fa';

const OrdersManagePage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, [filter, currentPage]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = {
        ...(filter !== 'all' ? { status: filter } : {}),
        page: currentPage,
        limit: 20
      };
      const response = await orderService.getAll(params);
      setOrders(response.data.data);
      setTotalPages(response.data.totalPages || 1);
      setTotal(response.data.total || 0);
    } catch (error) {
      toast.error('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await orderService.updateStatus(orderId, { orderStatus: newStatus });
      toast.success('Statut mis à jour');
      fetchOrders();
    } catch (error) {
      toast.error('Erreur de mise à jour');
    }
  };

  const updatePaymentStatus = async (orderId, newPaymentStatus) => {
    try {
      await orderService.updateStatus(orderId, { paymentStatus: newPaymentStatus });
      toast.success('Statut de paiement mis à jour');
      fetchOrders();
    } catch (error) {
      toast.error('Erreur de mise à jour');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      delivered: 'bg-green-100 text-green-800'
    };
    return badges[status] || badges.pending;
  };

  const statusLabels = {
    pending: 'En attente',
    confirmed: 'Confirmée',
    delivered: 'Livrée'
  };

  const paymentStatusLabels = {
    pending: 'En attente',
    paid: 'Payée',
    failed: 'Échouée',
    refunded: 'Remboursée'
  };

  const getPaymentBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800'
    };
    return badges[status] || badges.pending;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-fuchsia-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-fuchsia-primary mb-6 md:mb-8">
        Gestion des Commandes
      </h1>

      {/* Filtres */}
      <div className="mb-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'confirmed', 'delivered'].map(status => (
              <button
                key={status}
                onClick={() => {
                  setFilter(status);
                  setCurrentPage(1); // Reset page lors du changement de filtre
                }}
                className={`px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-fuchsia-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {status === 'all' ? 'Toutes' : statusLabels[status]}
              </button>
            ))}
          </div>
          
          {/* Compteur */}
          <div className="text-sm text-gray-600">
            <strong>{total}</strong> commande{total > 1 ? 's' : ''} au total
          </div>
        </div>
      </div>

      {/* Liste commandes */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-fuchsia-primary text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm">N° Commande</th>
                <th className="px-4 py-3 text-left text-sm">Client</th>
                <th className="px-4 py-3 text-left text-sm">Téléphone</th>
                <th className="px-4 py-3 text-right text-sm">Montant</th>
                <th className="px-4 py-3 text-center text-sm">Statut Commande</th>
                <th className="px-4 py-3 text-center text-sm">Paiement</th>
                <th className="px-4 py-3 text-center text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    Aucune commande trouvée
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-sm font-medium">
                      {order.orderNumber}
                    </td>
                    <td className="px-4 py-3 text-sm">{order.customer.name}</td>
                    <td className="px-4 py-3 text-sm">
                      <a
                        href={`tel:${order.customer.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {order.customer.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-sm">
                      {order.totalAmount.toLocaleString()} F
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={order.orderStatus}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className={`w-full px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(order.orderStatus)} border-0 cursor-pointer`}
                      >
                        {Object.keys(statusLabels).map(status => (
                          <option key={status} value={status}>
                            {statusLabels[status]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={order.paymentStatus}
                        onChange={(e) => updatePaymentStatus(order._id, e.target.value)}
                        className={`w-full px-2 py-1 rounded-full text-xs font-medium ${getPaymentBadge(order.paymentStatus)} border-0 cursor-pointer`}
                      >
                        {Object.keys(paymentStatusLabels).map(status => (
                          <option key={status} value={status}>
                            {paymentStatusLabels[status]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 justify-center">
                        <a
                          href={`https://wa.me/${order.customer.phone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-800"
                          title="Contacter sur WhatsApp"
                        >
                          <FaWhatsapp size={20} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-4 border-t border-gray-200 flex justify-between items-center flex-wrap gap-4">
            <div className="text-sm text-gray-600">
              Page {currentPage} sur {totalPages}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                Précédent
              </button>
              
              {/* Numéros de page */}
              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNum = index + 1;
                  // Afficher seulement quelques pages autour de la page actuelle
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium ${
                          currentPage === pageNum
                            ? 'bg-fuchsia-primary text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    pageNum === currentPage - 2 ||
                    pageNum === currentPage + 2
                  ) {
                    return <span key={pageNum} className="px-2 py-2">...</span>;
                  }
                  return null;
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                Suivant
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersManagePage;
