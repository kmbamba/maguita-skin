import { useState, useEffect } from 'react';
import { orderService } from '../../services/api';
import { FaBox, FaShoppingCart, FaMoneyBillWave, FaClock } from 'react-icons/fa';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await orderService.getStats();
        setStats(response.data.data);
      } catch (error) {
        console.error('Erreur stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-fuchsia-primary border-t-transparent"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Commandes',
      value: stats?.totalOrders || 0,
      icon: FaShoppingCart,
      color: 'bg-blue-500',
      description: 'Toutes les commandes'
    },
    {
      title: 'En Attente',
      value: stats?.pendingOrders || 0,
      icon: FaClock,
      color: 'bg-yellow-500',
      description: 'Nouvelles commandes'
    },
    {
      title: 'Confirmées',
      value: stats?.confirmedOrders || 0,
      icon: FaBox,
      color: 'bg-blue-400',
      description: 'Commandes confirmées'
    },
    {
      title: 'Livrées',
      value: stats?.deliveredOrders || 0,
      icon: FaBox,
      color: 'bg-green-500',
      description: 'Livraison terminée'
    },
    {
      title: 'Revenu Total',
      value: `${(stats?.totalRevenue || 0).toLocaleString()} F`,
      icon: FaMoneyBillWave,
      color: 'bg-fuchsia-primary',
      description: 'Chiffre d\'affaires total'
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-fuchsia-primary mb-8">
        Tableau de Bord
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">
                <p className="text-gray-500 text-sm mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                {card.description && (
                  <p className="text-xs text-gray-400 mt-1">{card.description}</p>
                )}
              </div>
              <div className={`${card.color} p-4 rounded-lg flex-shrink-0`}>
                <card.icon className="text-white text-2xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-fuchsia-primary mb-4">
          Activité Récente
        </h2>
        <p className="text-gray-600">
          Les dernières commandes et activités apparaîtront ici.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
