import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Import Common Components
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Import Page Components
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './components/products/ProductDetail';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';

// Import Error Boundary (optional but recommended)
import ErrorBoundary from './components/common/ErrorBoundary';

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <CartProvider>
//           <div className="flex flex-col min-h-screen">
//             <Header />
//             <Navbar />
            
//             <ErrorBoundary>
//               <main className="flex-grow container mx-auto px-4 py-6">
//                 <Routes>
//                   {/* Public Routes */}
//                   <Route path="/" element={<HomePage />} />
//                   <Route path="/login" element={<LoginPage />} />
//                   <Route path="/register" element={<RegisterPage />} />
                  
//                   {/* Product Routes */}
//                   <Route path="/products" element={<ProductsPage />} />
//                   <Route path="/products/:category" element={<ProductsPage />} />
//                   <Route path="/product/:id" element={<ProductDetail />} />
                  
//                   {/* Cart and Checkout Routes */}
//                   <Route path="/cart" element={<CartPage />} />
//                   <Route path="/checkout" element={<CheckoutPage />} />
//                   <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
                  
//                   {/* Protected Routes */}
//                   <Route 
//                     path="/account" 
//                     element={
//                       <PrivateRoute>
//                         <AccountPage />
//                       </PrivateRoute>
//                     } 
//                   />
//                 </Routes>
//               </main>
//             </ErrorBoundary>
            
//             <Footer />
//           </div>
//         </CartProvider>
//       </AuthProvider>
//     </Router>
//   );
// }

// // Private Route Component for authenticated routes
// const PrivateRoute = ({ children }) => {
//   const { user } = useAuth();
//   const location = useLocation();

//   if (!user) {
//     // Redirect to login if not authenticated
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// };

// export default App;