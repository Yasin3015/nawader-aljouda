import React from 'react';
import { CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PaymentInfo = ({ payment }) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        {t('orderDetails.paymentInfo.title')}
      </h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-red-500" />
          <span className="text-sm text-gray-600">
            {payment.cardType} **** **** **** {payment.lastFour}
          </span>
        </div>
        <p className="text-sm text-gray-600 pl-6">
          {t('orderDetails.paymentInfo.businessName')}: {payment.businessName}
        </p>
        <p className="text-sm text-gray-600 pl-6">
          {t('orderDetails.paymentInfo.phone')}: {payment.phone}
        </p>
      </div>
    </div>
  );
};

export default PaymentInfo;