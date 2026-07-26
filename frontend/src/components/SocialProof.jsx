import { FaUsers, FaShoppingBag, FaStar, FaHeart } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { orderService } from '../services/api';

const SocialProof = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    deliveredOrders: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await orderService.getStats();
        setStats({
          totalOrders: response.data.totalOrders || 0,
          deliveredOrders: response.data.deliveredOrders || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const socialStats = [
    {
      icon: FaUsers,
      number: stats.deliveredOrders > 0 ? `${stats.deliveredOrders}+` : "500+",
      label: "Clientes Satisfaites",
      color: "from-fuchsia-primary to-pink-600"
    },
    {
      icon: FaShoppingBag,
      number: stats.totalOrders > 0 ? `${stats.totalOrders}+` : "1200+",
      label: "Commandes Livrées",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: FaStar,
      number: "4.9/5",
      label: "Note Moyenne",
      color: "from-gold-primary to-yellow-600"
    },
    {
      icon: FaHeart,
      number: "98%",
      label: "Taux de Satisfaction",
      color: "from-pink-500 to-red-500"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-fuchsia-primary to-pink-700 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          La Confiance de Milliers de Sénégalaises
        </h2>
        <p className="text-white/90 text-center mb-12 max-w-2xl mx-auto">
          Rejoignez notre communauté de femmes qui ont transformé leur peau avec nos produits
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {socialStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all hover:scale-105"
            >
              <div className={`bg-gradient-to-r ${stat.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="text-white text-2xl" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-white/80 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <FaShoppingBag className="text-gold-primary" />
            <span>Produits 100% Authentiques</span>
          </div>
          <div className="flex items-center gap-2">
            <FaStar className="text-gold-primary" />
            <span>Made in Senegal 🇸🇳</span>
          </div>
          <div className="flex items-center gap-2">
            <FaHeart className="text-gold-primary" />
            <span>Sans Produits Chimiques Dangereux</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProof;
