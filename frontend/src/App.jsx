import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { useAuth } from './context/AuthContext';

// Common Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Navbar from './components/common/Navbar';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './components/products/ProductDetail';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AccountPage from './pages/AccountPage';

// Auth Components
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';

function App() {
  // Protected Route Component moved inside App function
  const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen w-full" style={{backgroundColor: "#f3f4f6"}}>
            <div className="bg-primary text-white shadow-md">
              <Header />
              <Navbar />
            </div>
    
            <main className="flex-grow container mx-auto px-4 py-6" style={{maxWidth: "80rem"}}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<SignupForm />} />
                
                {/* Product Routes */}
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:category" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                
                {/* Cart and Checkout Routes */}
                <Route path="/cart" element={<CartPage />} />
                <Route 
                  path="/checkout" 
                  element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/order-confirmation/:orderId" 
                  element={
                    <ProtectedRoute>
                      <OrderConfirmationPage />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Account Routes */}
                <Route 
                  path="/account" 
                  element={
                    <ProtectedRoute>
                      <AccountPage />
                    </ProtectedRoute>
                  } 
                />
                
                {/* 404 Route */}
                <Route 
                  path="*" 
                  element={
                    <div className="text-center py-12">
                      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
                      <p className="mt-4">The page you are looking for does not exist.</p>
                    </div>
                  } 
                />
              </Routes>
            </main>
            
            <Footer className="bg-gray-800 text-white py-8" />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;