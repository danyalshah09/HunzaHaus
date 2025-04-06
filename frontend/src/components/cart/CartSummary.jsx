import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartSummary = () => {
  const { cart, total } = useCart();

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
      <div className="space-y-2 mb-4">
        <p className="flex justify-between">
          <span>Subtotal:</span>
          <span>${total.toFixed(2)}</span>
        </p>
        <p className="flex justify-between">
          <span>Tax (10%):</span>
          <span>${(total * 0.1).toFixed(2)}</span>
        </p>
        <p className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total:</span>
          <span>${(total * 1.1).toFixed(2)}</span>
        </p>
      </div>
      <Link 
        to="/checkout" 
        className={`w-full block text-center py-3 rounded ${
          cart.length > 0 
            ? 'bg-primary text-white hover:bg-primary-dark' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        disabled={cart.length === 0}
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default CartSummary;