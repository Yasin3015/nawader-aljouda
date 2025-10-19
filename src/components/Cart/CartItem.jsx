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
    <div className="p-4">
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
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500">
            {item.unit && `${item.unit}`}
          </p>
        </div>

        {/* Price - Hidden on mobile */}
        <div className="hidden md:block w-20 text-right">
          <span className="text-lg font-semibold text-gray-900">
            ${item.price.toFixed(2)}
          </span>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Minus className="w-4 h-4 text-gray-600" />
          </button>
          
          <span className="w-12 text-center font-semibold text-gray-900">
            {item.quantity}
          </span>
          
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Subtotal */}
        <div className="w-20 text-right">
          <span className="text-lg font-semibold text-gray-900">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors"
        >
          <X className="w-4 h-4 text-gray-600 hover:text-red-600" />
        </button>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden mt-4 flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-500">Price: </span>
          <span className="font-semibold text-gray-900">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <div>
          <span className="text-sm text-gray-500">Subtotal: </span>
          <span className="font-semibold text-gray-900">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
