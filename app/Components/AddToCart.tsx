'use client';

import { useDispatch } from 'react-redux';
import { addItem } from '../slices/cartSlice';
import { Product } from '../type/productType';
import { useState } from 'react';

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Adding to cart:', product);
    dispatch(addItem(product));
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`bg-[#d9ee1b] text-[#020402] px-6 py-2 w-60 justify-center items-center rounded hover:bg-[#7a8047d4] transition ${
        isClicked ? 'scale-95' : ''
      }`}
    >
      {isClicked ? 'Added!' : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;