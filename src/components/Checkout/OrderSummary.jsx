import React from 'react';

const OrderSummary = ({ items, totalPrice }) => {
  const subtotal = totalPrice;
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
      
      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            {/* Product Image */}
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                x{item.quantity}
              </p>
            </div>

            {/* Price */}
            <div className="text-sm font-semibold text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Order Totals */}
      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Shipping:</span>
          <span className="font-semibold text-green-600">Free</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total:</span>
            <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
