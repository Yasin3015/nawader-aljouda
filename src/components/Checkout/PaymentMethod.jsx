import React from 'react';
import Button from '../UI/Button';

const PaymentMethod = ({ paymentMethod, setPaymentMethod, onPlaceOrder, isSubmitting = false, errors = {} }) => {
  const paymentOptions = [
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay when your order is delivered',
      icon: '💵'
    },
    {
      id: 'paypal',
      name: 'Paypal',
      description: 'Pay securely with PayPal',
      icon: '💳'
    },
    {
      id: 'amazon',
      name: 'Amazon Pay',
      description: 'Pay with your Amazon account',
      icon: '🛒'
    }
  ];

  return (
    <div className="py-0">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Payment Method</h2>
      
      {/* Payment Options */}
      <div className="space-y-2 mb-6">
        {paymentOptions.map((option) => (
          <label
            key={option.id}
            className={`flex items-center p-1 border rounded-sm cursor-pointer transition-colors ${
              paymentMethod === option.id
                ? 'border-[var(--color-primary)] bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={option.id}
              checked={paymentMethod === option.id}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="sr-only"
            />
            
            {/* Custom Radio Button */}
            <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
              paymentMethod === option.id
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]'
                : 'border-gray-300'
            }`}>
              {paymentMethod === option.id && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </div>
            
            {/* Payment Option Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{option.name}</span>
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Payment Method Error */}
      {errors['paymentMethod'] && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{errors['paymentMethod']}</p>
        </div>
      )}

      {/* Place Order Button */}
      <Button 
        variant="primary" 
        className="w-full text-lg py-3 rounded-full"
        onClick={onPlaceOrder}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Placing Order...' : 'Place Order'}
      </Button>
    </div>
  );
};

export default PaymentMethod;
