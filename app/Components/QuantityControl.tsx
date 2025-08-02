'use client';

import { useDispatch } from 'react-redux';
import { decrementQuantity, incrementQuantity } from '../slices/cartSlice';

interface QuantityControlProps {
  productId: number;
  quantity: number;
}

const QuantityControl = ({ productId, quantity }: QuantityControlProps) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center border rounded-md">
      <button
        onClick={() => dispatch(decrementQuantity(productId))}
        className="px-3 py-1 text-lg font-medium"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="px-3 py-1 border-x">{quantity}</span>
      <button
        onClick={() => dispatch(incrementQuantity(productId))}
        className="px-3 py-1 text-lg font-medium"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;