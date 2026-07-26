import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaBox, FaShoppingCart, FaSignOutAlt, FaChartBar, FaStar, FaEnvelope, FaImage, FaCog } from 'react-icons/fa';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-user');
    navigate('/admin/login');
  };

  const isActive = (path) => location.pathname === path;

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
      {/* Sidebar */}
      <aside className="w-64 bg-fuchsia-primary text-white flex flex-col">
        <div className="p-6 border-b border-pink-600">
          <h2 className="text-2xl font-bold">MAGUITA SKIN</h2>
          <p className="text-sm text-pink-200">Administration</p>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
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
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-pink-600/50 transition-colors mb-2"
          >
            <FaHome size={20} />
            <span>Voir le site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-pink-600/50 transition-colors"
          >
            <FaSignOutAlt size={20} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
