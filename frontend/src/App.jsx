import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages publiques (chargées immédiatement)
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

// Pages admin (chargées à la demande avec code splitting)
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const LoginPage = lazy(() => import('./pages/admin/LoginPage'));
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
const GammesManagePage = lazy(() => import('./pages/admin/GammesManagePage'));
const OrdersManagePage = lazy(() => import('./pages/admin/OrdersManagePage'));
const TestimonialsManagePage = lazy(() => import('./pages/admin/TestimonialsManagePage'));
const BeforeAfterManagePage = lazy(() => import('./pages/admin/BeforeAfterManagePage'));
const NewsletterManagePage = lazy(() => import('./pages/admin/NewsletterManagePage'));
const SettingsPage = lazy(() => import('./pages/admin/SettingsPage'));

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

// Loader pour les pages lazy-loaded
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-fuchsia-primary border-t-transparent"></div>
  </div>
);
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

              {/* Routes Admin - avec Suspense pour lazy loading */}
              <Route path="/admin/login" element={
                <Suspense fallback={<PageLoader />}>
                  <LoginPage />
                </Suspense>
              } />
              <Route path="/admin" element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute><AdminLayout /></ProtectedRoute>
                </Suspense>
              }>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={
                  <Suspense fallback={<PageLoader />}>
                    <DashboardPage />
                  </Suspense>
                } />
                <Route path="gammes" element={
                  <Suspense fallback={<PageLoader />}>
                    <GammesManagePage />
                  </Suspense>
                } />
                <Route path="orders" element={
                  <Suspense fallback={<PageLoader />}>
                    <OrdersManagePage />
                  </Suspense>
                } />
                <Route path="testimonials" element={
                  <Suspense fallback={<PageLoader />}>
                    <TestimonialsManagePage />
                  </Suspense>
                } />
                <Route path="before-after" element={
                  <Suspense fallback={<PageLoader />}>
                    <BeforeAfterManagePage />
                  </Suspense>
                } />
                <Route path="newsletter" element={
                  <Suspense fallback={<PageLoader />}>
                    <NewsletterManagePage />
                  </Suspense>
                } />
                <Route path="settings" element={
                  <Suspense fallback={<PageLoader />}>
                    <SettingsPage />
                  </Suspense>
                } />
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
