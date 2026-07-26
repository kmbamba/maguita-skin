import { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaBox, FaShoppingCart, FaSignOutAlt, FaChartBar, FaStar, FaEnvelope, FaImage, FaCog, FaBars, FaTimes } from 'react-icons/fa';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-user');
    navigate('/admin/login');
  };

  const isActive = (path) => location.pathname === path;

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: FaChartBar },
    { path: '/admin/gammes', label: 'Gammes', icon: FaBox },
    { path: '/admin/orders', label: 'Commandes', icon: FaShoppingCart },
    { path: '/admin/testimonials', label: 'Témoignages', icon: FaStar },
    { path: '/admin/before-after', label: 'Avant/Après', icon: FaImage },
    { path: '/admin/newsletter', label: 'Newsletter', icon: FaEnvelope },
    { path: '/admin/settings', label: 'Paramètres', icon: FaCog },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-fuchsia-primary text-white z-50 px-4 py-3 flex items-center justify-between shadow-lg">
        <div>
          <h2 className="text-lg font-bold">MAGUITA SKIN</h2>
          <p className="text-xs text-pink-200">Administration</p>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white p-2 hover:bg-pink-600 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Overlay pour mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-fuchsia-primary text-white flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-pink-600 hidden lg:block">
          <h2 className="text-2xl font-bold">MAGUITA SKIN</h2>
          <p className="text-sm text-pink-200">Administration</p>
        </div>

        {/* Spacer pour mobile (à cause du header fixe) */}
        <div className="h-16 lg:hidden" />

        <nav className="flex-1 p-4 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive(item.path)
                  ? 'bg-pink-600'
                  : 'hover:bg-pink-600/50'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-pink-600">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-pink-600/50 transition-colors mb-2"
          >
            <FaHome size={20} />
            <span>Voir le site</span>
          </Link>
          <button
            onClick={() => {
              handleLogout();
              closeMobileMenu();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-pink-600/50 transition-colors"
          >
            <FaSignOutAlt size={20} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
