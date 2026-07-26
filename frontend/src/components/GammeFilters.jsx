import { FaFilter, FaSortAmountDown } from 'react-icons/fa';

const GammeFilters = ({ filters, onFilterChange }) => {
  const categories = [
    { value: 'all', label: 'Toutes les catégories' },
    { value: 'collagene', label: 'Collagène' },
    { value: 'teint-noir', label: 'Teint Noir' },
    { value: 'urgence', label: 'Urgence' },
    { value: 'eclat', label: 'Éclat' },
    { value: 'autre', label: 'Autre' }
  ];

  const sortOptions = [
    { value: 'name-asc', label: 'Nom (A-Z)' },
    { value: 'name-desc', label: 'Nom (Z-A)' },
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix décroissant' },
    { value: 'newest', label: 'Plus récentes' }
  ];

  const promoOptions = [
    { value: 'all', label: 'Toutes' },
    { value: 'promo', label: 'En promo uniquement' },
    { value: 'regular', label: 'Prix normal uniquement' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category Filter */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <FaFilter className="text-fuchsia-primary" />
            Catégorie
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-primary"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        {/* Promo Filter */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <FaFilter className="text-fuchsia-primary" />
            Promotions
          </label>
          <select
            value={filters.promo}
            onChange={(e) => onFilterChange({ ...filters, promo: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-primary"
          >
            {promoOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <FaSortAmountDown className="text-fuchsia-primary" />
            Trier par
          </label>
          <select
            value={filters.sort}
            onChange={(e) => onFilterChange({ ...filters, sort: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-primary"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Reset Filters Button */}
      {(filters.category !== 'all' || filters.promo !== 'all' || filters.sort !== 'name-asc') && (
        <button
          onClick={() => onFilterChange({ category: 'all', promo: 'all', sort: 'name-asc' })}
          className="mt-4 text-sm text-fuchsia-primary hover:text-pink-700 font-semibold"
        >
          Réinitialiser les filtres
        </button>
      )}
    </div>
  );
};

export default GammeFilters;
