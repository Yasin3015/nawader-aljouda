import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { Minus, Plus, X } from 'lucide-react';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      {/* Product */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-4">
          {/* Product Image */}
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{item.name}</h3>
            {item.unit && (
              <p className="text-sm text-gray-500">{item.unit}</p>
            )}
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="py-4 px-4 text-gray-700 font-medium">
        ${item.price.toFixed(2)}
      </td>

      {/* Quantity Controls */}
      <td className="py-4 px-4">
        <div className="flex items-center border border-gray-200 rounded-full w-fit p-1">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="w-9 h-9 rounded-full cursor-pointer bg-[var(--color-gray-1)] flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <Minus className="w-4 h-4 text-[var(--color-gray-7)]" />
          </button>

          <span className="w-10 text-center font-semibold text-[var(--color-gray-7)]">
            {item.quantity}
          </span>

          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-8 h-8 rounded-full bg-[var(--color-gray-1)] flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-4 h-4 text-[var(--color-gray-7)]" />
          </button>
        </div>
      </td>

      {/* Subtotal */}
      <td className="py-4 px-4 text-gray-900 font-semibold">
        ${(item.price * item.quantity).toFixed(2)}
      </td>

      {/* Remove */}
      <td className="py-4 px-4 text-center">
        <button
          onClick={handleRemove}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors"
        >
          <X className="w-4 h-4 text-gray-600 hover:text-red-600" />
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
