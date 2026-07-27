import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaWhatsapp, FaSearch, FaTimes, FaBars } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartItems } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Nos Gammes', path: '/#gammes' },
    { name: 'Témoignages', path: '/#temoignages' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path;
  };

  return (
    <nav className="bg-fuchsia-primary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <picture>
              <source srcSet="/logo-maguita-skin.webp" type="image/webp" />
              <img 
                src="/logo-maguita-skin.png" 
                alt="Maguita Skin" 
                className="h-16 md:h-20 w-auto"
                loading="eager"
              />
            </picture>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-all hover:text-gold-accent ${
                  isActive(link.path) ? 'text-gold-accent border-b-2 border-gold-accent' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Recherche */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-fuchsia-600 rounded-full transition-colors"
              aria-label="Rechercher"
            >
              <FaSearch size={18} />
            </button>

            {/* WhatsApp */}
            <a
              href="https://wa.me/221710469241"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-whatsapp-green px-3 py-2 rounded-full hover:bg-green-600 transition-colors text-sm"
            >
              <FaWhatsapp size={18} />
              <span className="font-medium">Contacter</span>
            </a>

            {/* Panier */}
            <Link
              to="/checkout"
              className="relative bg-gold-accent text-fuchsia-primary px-3 py-2 rounded-full font-semibold hover:bg-yellow-500 transition-colors flex items-center gap-2 text-sm"
            >
              <FaShoppingCart size={18} />
              <span className="hidden md:inline">Panier</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-fuchsia-600 rounded-full transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-fuchsia-400 pt-4 animate-fadeIn">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-medium py-2 px-4 rounded-lg transition-all hover:bg-fuchsia-600 ${
                    isActive(link.path) ? 'bg-fuchsia-600 text-gold-accent' : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {/* WhatsApp mobile */}
              <a
                href="https://wa.me/221710469241"
                target="_blank"
                rel="noopener noreferrer"
                className="flex md:hidden items-center gap-2 bg-whatsapp-green px-4 py-2 rounded-lg hover:bg-green-600 transition-colors justify-center"
              >
                <FaWhatsapp size={18} />
                <span className="font-medium">Contacter sur WhatsApp</span>
              </a>
            </div>
          </div>
        )}


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
