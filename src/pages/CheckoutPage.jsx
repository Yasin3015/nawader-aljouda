import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../components/UI/ToastProvider';
import BillingInformation from '../components/Checkout/BillingInformation';
import OrderSummary from '../components/Checkout/OrderSummary';
import PaymentMethod from '../components/Checkout/PaymentMethod';
import { checkoutSchema } from '../validation/authSchemas';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CheckoutPage = () => {
  const { t } = useTranslation();
  const { items, totalPrice } = useCart();
  const { addToast } = useToast();
  const [billingData, setBillingData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    streetAddress: '',
    country: '',
    state: '',
    zipCode: '',
    email: '',
    phone: '',
    shipToDifferent: false
  });
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate the form data
      const formData = {
        billingData,
        orderNotes,
        paymentMethod
      };

      const validatedData = checkoutSchema.parse(formData);
      
      // If validation passes, proceed with order placement
      console.log('Validated order data:', validatedData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addToast('Order placed successfully!', 'success');
      
      // You can add order processing logic here
      // For example: navigate to order confirmation page
      
    } catch (error) {
      if (error.errors) {
        // Zod validation errors
        const fieldErrors = {};
        error.errors.forEach((err) => {
          const fieldPath = err.path.join('.');
          fieldErrors[fieldPath] = err.message;
        });
        setErrors(fieldErrors);
        addToast('Please fix the form errors', 'error');
      } else {
        // Other errors
        console.error('Order placement error:', error);
        addToast('Failed to place order. Please try again.', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some products to proceed to checkout!</p>
            <Link 
              to="/browse" 
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-hard-primary)] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <Link 
            to="/cart"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Billing Information */}
          <div className="lg:col-span-2 space-y-8">
            <BillingInformation 
              billingData={billingData}
              setBillingData={setBillingData}
              errors={errors}
            />
            
            {/* Additional Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Info</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Notes (Optional)
                </label>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Notes about your order, e.g. special notes for delivery"
                  className={`w-full h-32 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none ${
                    errors['orderNotes'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors['orderNotes'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['orderNotes']}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <OrderSummary items={items} totalPrice={totalPrice} />
              <PaymentMethod 
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                onPlaceOrder={handlePlaceOrder}
                isSubmitting={isSubmitting}
                errors={errors}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
