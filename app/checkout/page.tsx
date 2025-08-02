'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useState } from 'react';
import Link from 'next/link';
import { placeOrder } from '../slices/cartSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Define validation schema
const checkoutSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  phone: z.string()
    .min(10, "Phone must be at least 10 digits")
    .regex(/^[0-9]+$/, "Only numbers allowed")
});

type FormData = z.infer<typeof checkoutSchema>;

const CheckoutPage = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId] = useState(Math.floor(Math.random() * 1000000));

  const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(checkoutSchema)
  });

  const dispatch = useDispatch();

  const onSubmit = (data: FormData) => {
    dispatch(placeOrder({
      customerName: data.fullName,
      address: data.address,
      phone: data.phone,
      email: data.email
    }));
    setOrderPlaced(true);
    reset();
  };

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
          <p>Your order #{orderId} has been placed successfully.</p>
        </div>
        <Link href="/" className="text-blue-600 hover:underline">
          ← Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Order Summary */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                    </div>
                  </div>
                  <p className="font-medium text-gray-900">${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between py-2 font-bold text-lg">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Shipping Form */}
          <div className="bg-[#080808] rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-200">
              Shipping Information
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-100 mb-1">Full Name</label>
                <input
                  {...register('fullName')}
                  className={`w-full px-4 py-2 border text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-400">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-100 mb-1">Email</label>
                <input
                  {...register('email')}
                  className={`w-full px-4 py-2 border text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-100 mb-1">Shipping Address</label>
                <input
                  {...register('address')}
                  className={`w-full px-4 py-2 border text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-400">{errors.address.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-100 mb-1">Phone Number</label>
                <input
                  {...register('phone')}
                  className={`w-full px-4 py-2 border text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={items.length === 0}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-sm ${items.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                  }`}
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;