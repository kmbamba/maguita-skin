import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaWhatsapp, FaSearch, FaTimes } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartItems } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className="bg-fuchsia-primary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <picture>
              <source srcSet="/logo-maguita-skin.webp" type="image/webp" />
              <img 
                src="/logo-maguita-skin.png" 
                alt="Maguita Skin" 
                className="h-20 md:h-24 w-auto"
                loading="eager"
              />
            </picture>
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div style={{ display: 'none' }}>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                MAGUITA SKIN
              </h1>
              <p className="text-xs md:text-sm text-gold-accent italic">
                Votre teint, notre signature
              </p>
            </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Recherche */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-fuchsia-600 rounded-full transition-colors"
              aria-label="Rechercher"
            >
              <FaSearch size={20} />
            </button>

            {/* WhatsApp */}
            <a
              href="https://wa.me/221710469241"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-whatsapp-green px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
            >
              <FaWhatsapp size={20} />
              <span className="font-medium">Contacter</span>
            </a>

            {/* Panier */}
            <Link
              to="/checkout"
              className="relative bg-gold-accent text-fuchsia-primary px-4 py-2 rounded-full font-semibold hover:bg-yellow-500 transition-colors flex items-center gap-2"
            >
              <FaShoppingCart size={20} />
              <span className="hidden md:inline">Panier</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Barre de recherche */}
        {isSearchOpen && (
          <div className="mt-4 animate-fadeIn">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une gamme..."
                className="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gold-accent"
                autoFocus
              />
              <button
                type="submit"
                className="bg-gold-accent text-fuchsia-primary px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
              >
                Rechercher
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="p-2 hover:bg-fuchsia-600 rounded-lg transition-colors"
                aria-label="Fermer"
              >
                <FaTimes size={20} />
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
