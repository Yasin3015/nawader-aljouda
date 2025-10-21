import React from 'react';
import { useTranslation } from 'react-i18next';

const OrderSummary = ({ 
  orderId, 
  paymentMethod, 
  total, 
  discount, 
  shipping, 
  grandTotal 
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="space-y-6">
        {/* Order ID and Payment Method */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {t('orderDetails.orderSummary.orderId')}
            </span>
            <span className="text-gray-900 font-medium">{orderId}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {t('orderDetails.orderSummary.paymentMethod')}
            </span>
            <span className="text-gray-900 font-medium">{paymentMethod}</span>
          </div>
        </div>

        {/* Order Totals */}
        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {t('orderDetails.orderSummary.totalOrder')}
            </span>
            <span className="text-gray-900 font-medium">${total}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {t('orderDetails.orderSummary.discount')}
            </span>
            <span className="text-gray-900 font-medium">{discount}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {t('orderDetails.orderSummary.shipping')}
            </span>
            <span className="text-gray-900 font-medium">{shipping}</span>
          </div>
        </div>

        {/* Grand Total */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">
              {t('orderDetails.orderSummary.grandTotal')}
            </span>
            <span className="text-green-600 font-bold text-lg">${grandTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

