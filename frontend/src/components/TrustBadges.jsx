import { FaShieldAlt, FaUndo, FaTruck, FaCheckCircle, FaWhatsapp, FaStar } from 'react-icons/fa';

const TrustBadges = ({ variant = 'full' }) => {
  const badges = [
    {
      icon: FaShieldAlt,
      title: 'Paiement Sécurisé',
      description: 'Transactions 100% sécurisées',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      icon: FaUndo,
      title: 'Retour Gratuit',
      description: 'Satisfait ou remboursé 14 jours',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: FaTruck,
      title: 'Livraison Rapide',
      description: '24-72h à Dakar',
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      icon: FaCheckCircle,
      title: 'Produits Certifiés',
      description: 'Made in Senegal 🇸🇳',
      color: 'text-fuchsia-600',
      bg: 'bg-fuchsia-50'
    },
    {
      icon: FaWhatsapp,
      title: 'Support 7j/7',
      description: 'Service client réactif',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      icon: FaStar,
      title: '500+ Clients',
      description: 'Satisfaits depuis 2020',
      color: 'text-gold-primary',
      bg: 'bg-yellow-50'
    }
  ];

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap justify-center gap-4 py-6">
        {badges.slice(0, 4).map((badge, index) => (
          <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
            <badge.icon className={`${badge.color} text-lg`} />
            <span className="text-sm font-semibold text-gray-700">{badge.title}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-fuchsia-primary mb-8">
          Pourquoi Choisir Maguita Skin ?
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {badges.map((badge, index) => (
            <div
              key={index}
              className={`${badge.bg} rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-default`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`${badge.color} text-4xl mb-4`}>
                  <badge.icon />
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  {badge.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats supplémentaires */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-fuchsia-primary mb-2">500+</div>
            <div className="text-gray-600 text-sm">Clients Satisfaits</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-fuchsia-primary mb-2">4.8/5</div>
            <div className="text-gray-600 text-sm">Note Moyenne</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-fuchsia-primary mb-2">98%</div>
            <div className="text-gray-600 text-sm">Clients Recommandent</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-fuchsia-primary mb-2">24-72h</div>
            <div className="text-gray-600 text-sm">Livraison Dakar</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
