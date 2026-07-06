import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Checkout } from './pages/Checkout';
import { Tracking } from './pages/Tracking';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { ChangePasswordModal } from './components/ChangePasswordModal';
import type { Product } from './components/ProductCard';
import { useAuth } from './context/AuthContext';
import { AdminLogin } from './pages/AdminLogin';

const MainAppContent: React.FC = () => {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [trackedOrderId, setTrackedOrderId] = useState<string>('');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState<boolean>(false);

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <Home setCurrentTab={setCurrentTab} />;
      case 'shop':
        return <Shop setSelectedProduct={setSelectedProduct} setCurrentTab={setCurrentTab} />;
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetail product={selectedProduct} setCurrentTab={setCurrentTab} />
        ) : (
          <Shop setSelectedProduct={setSelectedProduct} setCurrentTab={setCurrentTab} />
        );
      case 'cart':
        return <Checkout setCurrentTab={setCurrentTab} setTrackedOrderId={setTrackedOrderId} />;
      case 'track':
        return <Tracking trackedOrderId={trackedOrderId} setTrackedOrderId={setTrackedOrderId} />;
      case 'admin':
        return user && user.role === 'ADMIN' ? <AdminDashboard /> : <AdminLogin setCurrentTab={setCurrentTab} />;
      default:
        return <Home setCurrentTab={setCurrentTab} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navigation Header */}
      <Header 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        openAuthModal={() => setAuthModalOpen(true)} 
        openChangePasswordModal={() => setChangePasswordOpen(true)} 
      />

      {/* Main Content Area */}
      <main style={{ flexGrow: 1, paddingTop: 'calc(var(--header-height) + 20px)', paddingBottom: '40px' }}>
        {renderContent()}
      </main>

      {/* Footer Branding */}
      <Footer />

      {/* Auth Signin Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />

      {/* Change Password Modal */}
      <ChangePasswordModal 
        isOpen={changePasswordOpen} 
        onClose={() => setChangePasswordOpen(false)} 
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <CartProvider>
          <MainAppContent />
        </CartProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
