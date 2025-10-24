import React from 'react';
import { useTranslation } from 'react-i18next';

const OrderSummary = ({ 
  orderId, 
  paymentMethod, 
  total, 
  discount, 
  shipping, 
  grandTotal,
}) => {
  const { t } = useTranslation();

  return (
    <div className="border border-gray-200 col-span-1 rounded-sm">
      <div className="">
        {/* Order ID and Payment Method */}
        <div className="flex justify-between items-center p-4 border-b !border-b-gray-200">
          <div className="flex flex-col text-sm">
            <span className="text-gray-600">
              {t('orderDetails.orderSummary.orderId')}
            </span>
            <span className="text-gray-900">{orderId}</span>
          </div>
          <div className="flex flex-col text-sm gap-0">
            <span className="text-gray-600">
              {t('orderDetails.orderSummary.paymentMethod')}
            </span>
            <span className="text-gray-900">{paymentMethod}</span>
          </div>
        </div>

        {/* Order Totals */}
        <div className="p-4 text-md space-y-2">
          <div className="flex justify-between border-b border-b-gray-200 items-center">
            <span className="text-gray-600">
              {t('orderDetails.orderSummary.totalOrder')}
            </span>
            <span className="text-gray-900 ">${total}</span>
          </div>
          
          <div className="flex justify-between items-center border-b border-b-gray-200">
            <span className="text-gray-600">
              {t('orderDetails.orderSummary.discount')}
            </span>
            <span className="text-gray-900 ">{discount}</span>
          </div>
          
          <div className="flex justify-between items-center border-b border-b-gray-200">
            <span className="text-gray-600">
              {t('orderDetails.orderSummary.shipping')}
            </span>
            <span className="text-gray-900 ">{shipping}</span>
          </div>
        </div>

        {/* Grand Total */}
        <div className="p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 ">
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

