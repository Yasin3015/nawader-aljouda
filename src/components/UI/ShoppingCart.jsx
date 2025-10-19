import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button';

const ShoppingCart = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { 
    items, 
    totalItems, 
    totalPrice, 
    isOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity 
  } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={closeCart}
      />
      
      {/* Cart Side Panel */}
      <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {t("cart")} ({totalItems})
          </h2>
          <button
            onClick={closeCart}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
              </div>
              <p className="text-gray-500">{t("cartEmpty")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                  {/* Product Image Placeholder */}
                  <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.quantity} {item.unit} × ${item.price.toFixed(2)}
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4">
            {/* Cart Summary */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600">
                {totalItems} {totalItems !== 1 ? t("products") : t("product")}
              </span>
              <span className="text-lg font-semibold text-gray-900">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button 
                variant="primary" 
                className="w-full"
                onClick={() => {
                  navigate('/checkout');
                  closeCart();
                }}
              >
                {t("checkout")}
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  navigate('/cart');
                  closeCart();
                }}
              >
                {t("goToCart")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;
