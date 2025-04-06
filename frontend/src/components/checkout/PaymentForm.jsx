import React from 'react';
import { useForm } from 'react-hook-form';

const PaymentForm = ({ onPaymentSubmit, shippingAddress, total }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitPayment = (data) => {
    onPaymentSubmit(data);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded">
        <h3 className="font-bold mb-2">Order Summary</h3>
        <p className="text-gray-600">Total: ${total.toFixed(2)}</p>
        
        <h3 className="font-bold mt-4 mb-2">Shipping Address</h3>
        <p className="text-gray-600">
          {shippingAddress.firstName} {shippingAddress.lastName}<br/>
          {shippingAddress.address}<br/>
          {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
        </p>
      </div>
      
      <form onSubmit={handleSubmit(submitPayment)} className="space-y-4">
        <div>
          <label className="block mb-2">Card Number</label>
          <input 
            {...register('cardNumber', { 
              required: 'Card number is required',
              pattern: {
                value: /^[0-9]{16}$/,
                message: 'Card number must be 16 digits'
              }
            })}
            className="w-full border rounded px-3 py-2"
            placeholder="1234 5678 9012 3456"
          />
          {errors.cardNumber && <p className="text-red-500">{errors.cardNumber.message}</p>}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Expiry Date</label>
            <input 
              {...register('expiryDate', { 
                required: 'Expiry date is required',
                pattern: {
                  value: /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
                  message: 'Expiry date must be in MM/YY format'
                }
              })}
              className="w-full border rounded px-3 py-2"
              placeholder="MM/YY"
            />
            {errors.expiryDate && <p className="text-red-500">{errors.expiryDate.message}</p>}
          </div>
          <div>
            <label className="block mb-2">CVV</label>
            <input 
              {...register('cvv', { 
                required: 'CVV is required',
                pattern: {
                  value: /^[0-9]{3,4}$/,
                  message: 'CVV must be 3 or 4 digits'
                }
              })}
              className="w-full border rounded px-3 py-2"
              placeholder="123"
            />
            {errors.cvv && <p className="text-red-500">{errors.cvv.message}</p>}
          </div>
        </div>
        <div>
          <label className="block mb-2">Name on Card</label>
          <input 
            {...register('cardName', { required: 'Name on card is required' })}
            className="w-full border rounded px-3 py-2"
            placeholder="John Doe"
          />
          {errors.cardName && <p className="text-red-500">{errors.cardName.message}</p>}
        </div>
        <button 
          type="submit" 
          className="w-full bg-primary text-white py-3 rounded hover:bg-primary-dark"
        >
          Complete Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;