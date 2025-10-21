import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import BillingInfo from './BillingInfo';
import OrderSummary from './OrderSummary';
import OrderProgress from './OrderProgress';
import ProductList from './ProductList';

const OrderDetails = ({ orderData, onBack }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 py-6">
      <div className="w-full">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-3">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              {t('orderDetails.title')}
            </h1>
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors self-start sm:self-auto"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium">
                {t('orderDetails.backToOrders')}
              </span>
            </button>
          </div>
          <p className="text-gray-600 text-base lg:text-lg">
            {t('orderDetails.subtitle', { 
              count: orderData.items?.length || 0, 
              date: orderData.date 
            })}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 mb-6">
          {/* Billing Information */}
          <BillingInfo customer={orderData.customer} />
          
          {/* Order Summary */}
          <OrderSummary 
            orderId={orderData.id}
            paymentMethod={orderData.payment}
            total={orderData.total}
            discount={orderData.discount}
            shipping={orderData.shipping}
            grandTotal={orderData.grandTotal}
          />
        </div>

        {/* Order Progress */}
        <div className="mb-6">
          <OrderProgress currentStep={orderData.statusStep} />
        </div>

        {/* Product List */}
        <div>
          <ProductList items={orderData.items} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
