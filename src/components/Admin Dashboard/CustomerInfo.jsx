import React from 'react';
import { User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CustomerInfo = ({ customer }) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            {t('orderDetails.customer.title')}
          </h3>
          <p className="text-sm font-medium text-gray-900 mb-1">
            {t('orderDetails.customer.fullName')}: {customer.fullName}
          </p>
          <p className="text-sm text-gray-600 mb-1 break-all">
            {t('orderDetails.customer.email')}: {customer.email}
          </p>
          <p className="text-sm text-gray-600">
            {t('orderDetails.customer.phone')}: {customer.phone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
