import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

const CartPage = () => {
  const { cart, total, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="mb-6">Looks like you haven't added any items to your cart yet.</p>
        <Link 
          to="/products" 
          className="bg-primary text-white px-6 py-3 rounded hover:bg-primary-dark"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">
        Your Cart ({cartCount} items)
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>

        {/* Cart Summary */}
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;