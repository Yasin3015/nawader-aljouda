import React from 'react';
import { useTranslation } from 'react-i18next';

const OrderSummary = ({ subtotal, taxRate, discount, shippingRate }) => {
  const { t } = useTranslation();
  
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount - discount + shippingRate;

  return (
    <div className="p-6 mt-6">
      <div className="flex justify-end">
        <div className="w-full max-w-sm space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t('orderDetails.summary.subtotal')}</span>
            <span className="text-sm text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              {t('orderDetails.summary.tax')} ({taxRate}%)
            </span>
            <span className="text-sm text-gray-900 font-medium">${taxAmount.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t('orderDetails.summary.discount')}</span>
            <span className="text-sm text-gray-900 font-medium">${discount.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t('orderDetails.summary.shippingRate')}</span>
            <span className="text-sm text-gray-900 font-medium">${shippingRate.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center pt-3 border-t border-gray-200">
            <span className="text-base font-semibold text-gray-900">{t('orderDetails.summary.total')}</span>
            <span className="text-base font-semibold text-gray-900">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;