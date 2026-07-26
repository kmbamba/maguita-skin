import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import GammeDetailPage from './pages/GammeDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import TermsPage from './pages/TermsPage';
import ReturnPolicyPage from './pages/ReturnPolicyPage';
import BeforeAfterPage from './pages/BeforeAfterPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminLayout from './layouts/AdminLayout';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import GammesManagePage from './pages/admin/GammesManagePage';
import OrdersManagePage from './pages/admin/OrdersManagePage';
import TestimonialsManagePage from './pages/admin/TestimonialsManagePage';
import BeforeAfterManagePage from './pages/admin/BeforeAfterManagePage';
import NewsletterManagePage from './pages/admin/NewsletterManagePage';
import SettingsPage from './pages/admin/SettingsPage';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

// Composant Layout pour les pages publiques
const PublicLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <CartProvider>
            <Routes>
              {/* Routes publiques */}
              <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
              <Route path="/gamme/:slug" element={<PublicLayout><GammeDetailPage /></PublicLayout>} />
              <Route path="/checkout" element={<PublicLayout><CheckoutPage /></PublicLayout>} />
              <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
              <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
              <Route path="/faq" element={<PublicLayout><FAQPage /></PublicLayout>} />
              <Route path="/shipping" element={<PublicLayout><ShippingPolicyPage /></PublicLayout>} />
              <Route path="/terms" element={<PublicLayout><TermsPage /></PublicLayout>} />
              <Route path="/return-policy" element={<PublicLayout><ReturnPolicyPage /></PublicLayout>} />
              <Route path="/before-after" element={<PublicLayout><BeforeAfterPage /></PublicLayout>} />

              {/* Routes Admin */}
              <Route path="/admin/login" element={<LoginPage />} />
              <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="gammes" element={<GammesManagePage />} />
                <Route path="orders" element={<OrdersManagePage />} />
                <Route path="testimonials" element={<TestimonialsManagePage />} />
                <Route path="before-after" element={<BeforeAfterManagePage />} />
                <Route path="newsletter" element={<NewsletterManagePage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
              
              {/* 404 Page */}
              <Route path="*" element={<PublicLayout><NotFoundPage /></PublicLayout>} />
            </Routes>
            
            <ToastContainer 
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              closeOnClick
              pauseOnHover
            />
          </CartProvider>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
