import React from 'react';
import { Calendar, Printer } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const OrderHeader = ({ orderId, status, dateRange, onStatusChange, onPrint }) => {
  const { t } = useTranslation();
  
  const statusOptions = [
    { value: 'pending', label: t('orderDetails.status.pending') },
    { value: 'processing', label: t('orderDetails.status.processing') },
    { value: 'shipped', label: t('orderDetails.status.shipped') },
    { value: 'delivered', label: t('orderDetails.status.delivered') },
    { value: 'cancelled', label: t('orderDetails.status.cancelled') }
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="div">
          <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-900">
            {t('orderDetails.header.orderId')}: {orderId}
          </h1>
          <span className="px-3 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">
            {status}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{dateRange}</span>
        </div>
        </div>
        <div className="flex items-center gap-3">
          <select 
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">{t('orderDetails.header.changeStatus')}</option>
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button 
            onClick={onPrint}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Printer className="w-5 h-5 text-gray-600" />
          </button>
          <button className="px-6 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600">
            {t('orderDetails.header.save')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;