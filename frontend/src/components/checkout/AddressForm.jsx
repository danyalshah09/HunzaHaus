import React from 'react';
import { useForm } from 'react-hook-form';

const AddressForm = ({ onAddressSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitAddress = (data) => {
    onAddressSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitAddress)} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">First Name</label>
          <input 
            {...register('firstName', { required: 'First name is required' })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="block mb-2">Last Name</label>
          <input 
            {...register('lastName', { required: 'Last name is required' })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
        </div>
      </div>
      <div>
        <label className="block mb-2">Address</label>
        <input 
          {...register('address', { required: 'Address is required' })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.address && <p className="text-red-500">{errors.address.message}</p>}
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-2">City</label>
          <input 
            {...register('city', { required: 'City is required' })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}
        </div>
        <div>
          <label className="block mb-2">State</label>
          <input 
            {...register('state')}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-2">Postal Code</label>
          <input 
            {...register('postalCode', { required: 'Postal code is required' })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.postalCode && <p className="text-red-500">{errors.postalCode.message}</p>}
        </div>
      </div>
      <button 
        type="submit" 
        className="w-full bg-black text-white py-3 rounded hover:bg-gray-500"
      >
        Continue to Payment
      </button>
    </form>
  );
};

export default AddressForm;