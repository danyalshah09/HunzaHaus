import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import AddressForm from '../components/checkout/AddressForm';
import PaymentForm from '../components/checkout/PaymentForm';
import { createOrder } from '../utils/api';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, total, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState(null);

  const handleAddressSubmit = (address) => {
    setShippingAddress(address);
    setStep(2);
  };

  const handlePaymentSubmit = async (paymentDetails) => {
    try {
      const orderData = {
        items: cart,
        shippingAddress,
        paymentDetails,
        total
      };

      const order = await createOrder(orderData);
      
      // Clear cart after successful order
      clearCart();

      // Navigate to order confirmation
      navigate(`/order-confirmation/${order._id}`);
    } catch (error) {
      console.error('Order creation failed', error);
      // Handle error (show message to user)
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="max-w-2xl mx-auto">
        {step === 1 && (
          <AddressForm onAddressSubmit={handleAddressSubmit} />
        )}

        {step === 2 && (
          <PaymentForm 
            onPaymentSubmit={handlePaymentSubmit}
            shippingAddress={shippingAddress}
            total={total}
          />
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;