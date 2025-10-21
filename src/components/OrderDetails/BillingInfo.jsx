import React from 'react';
import { useTranslation } from 'react-i18next';

const BillingInfo = ({ customer }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
        {t('orderDetails.billingAddress.title')}
      </h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            {customer.name}
          </h4>
          <p className="text-gray-600">
            {customer.address}
          </p>
        </div>
        
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              {t('orderDetails.billingAddress.email')}
            </p>
            <p className="text-gray-600">{customer.email}</p>
          </div>
          
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              {t('orderDetails.billingAddress.phone')}
            </p>
            <p className="text-gray-600">{customer.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingInfo;

