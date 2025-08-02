'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Navbar = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <nav className="bg-[#1F241F] shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-100">
            ShopEase
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-400 hover:text-gray-100">
              Home
            </Link>
            <Link href="/checkout" className="text-gray-400 hover:text-gray-100 flex items-center">
              Cart ({cartItems.length})
            </Link>
            <Link href="/order" className="text-gray-400 hover:text-gray-100">
              Orders
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;