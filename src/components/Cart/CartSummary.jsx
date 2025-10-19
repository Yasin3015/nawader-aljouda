import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button';

const CartSummary = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, totalPrice } = useCart();

  const subtotal = totalPrice;
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Cart Total</h2>
      
      {/* Summary Items */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Shipping:</span>
          <span className="font-semibold text-green-600">Free</span>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total:</span>
            <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <Button 
        variant="primary" 
        className="w-full"
        onClick={() => navigate('/checkout')}
      >
        Proceed to checkout
      </Button>

      {/* Additional Info */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          {items.length} {items.length === 1 ? 'item' : 'items'} in cart
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
