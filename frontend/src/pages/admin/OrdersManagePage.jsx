import { useState, useEffect } from 'react';
import { orderService } from '../../services/api';
import { toast } from 'react-toastify';
import { FaEye, FaWhatsapp } from 'react-icons/fa';

const OrdersManagePage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await orderService.getAll(params);
      setOrders(response.data.data);
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
    <div className="p-6">
      <h1 className="text-3xl font-bold text-fuchsia-primary mb-8">
        Gestion des Commandes
      </h1>

      {/* Filtres */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {['all', 'pending', 'confirmed', 'delivered'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === status
                ? 'bg-fuchsia-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {status === 'all' ? 'Toutes' : statusLabels[status]}
          </button>
        ))}
      </div>

      {/* Liste commandes */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-fuchsia-primary text-white">
            <tr>
              <th className="px-6 py-4 text-left">N° Commande</th>
              <th className="px-6 py-4 text-left">Client</th>
              <th className="px-6 py-4 text-left">Téléphone</th>
              <th className="px-6 py-4 text-right">Montant</th>
              <th className="px-6 py-4 text-center">Statut Commande</th>
              <th className="px-6 py-4 text-center">Paiement</th>
              <th className="px-6 py-4 text-center">Actions</th>
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
                  <td className="px-6 py-4 font-mono font-medium">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4">{order.customer.name}</td>
                  <td className="px-6 py-4">
                    <a
                      href={`tel:${order.customer.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {order.customer.phone}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-right font-bold">
                    {order.totalAmount.toLocaleString()} F
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(order.orderStatus)} border-0 cursor-pointer`}
                    >
                      {Object.keys(statusLabels).map(status => (
                        <option key={status} value={status}>
                          {statusLabels[status]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.paymentStatus}
                      onChange={(e) => updatePaymentStatus(order._id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentBadge(order.paymentStatus)} border-0 cursor-pointer`}
                    >
                      {Object.keys(paymentStatusLabels).map(status => (
                        <option key={status} value={status}>
                          {paymentStatusLabels[status]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
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
    </div>
  );
};

export default OrdersManagePage;
