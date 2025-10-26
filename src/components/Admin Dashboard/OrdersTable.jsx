import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';

const OrdersTable = ({ orders, selectedOrders, onSelectOrder, onSelectAll, onViewDetails }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const getPaymentStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'failed':
        return 'text-red-600';
      case 'refunded':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-600';
      case 'processing':
        return 'text-yellow-600';
      case 'canceled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusDotColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500';
      case 'processing':
        return 'bg-yellow-500';
      case 'canceled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="w-full overflow-x-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[var(--color-green-gray-1)]">
              <tr>
                <th className="px-4 py-3 text-start">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === orders.length && orders.length > 0}
                    onChange={onSelectAll}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                </th>
                <th className={`px-4 py-3 text-sm font-semibold text-gray-700 ${isRTL ? 'text-right' : 'text-start'}`}>
                  {t('orders.orderId')}
                </th>
                <th className={`px-4 py-3 text-sm font-semibold text-gray-700 ${isRTL ? 'text-right' : 'text-start'}`}>
                  {t('orders.date')}
                </th>
                <th className={`px-4 py-3 text-sm font-semibold text-gray-700 ${isRTL ? 'text-right' : 'text-start'}`}>
                  {t('orders.total')}
                </th>
                <th className={`px-4 py-3 text-sm font-semibold text-gray-700 ${isRTL ? 'text-right' : 'text-start'}`}>
                  {t('orders.payment')}
                </th>
                <th className={`px-4 py-3 text-sm font-semibold text-gray-700 ${isRTL ? 'text-right' : 'text-start'}`}>
                  {t('orders.items')}
                </th>
                <th className={`px-4 py-3 text-sm font-semibold text-gray-700 ${isRTL ? 'text-right' : 'text-start'}`}>
                  {t('orders.customerName')}
                </th>
                <th className={`px-4 py-3 text-sm font-semibold text-gray-700 ${isRTL ? 'text-right' : 'text-start'}`}>
                  {t('orders.status')}
                </th>
                <th className={`px-4 py-3 text-sm font-semibold text-gray-700 ${isRTL ? 'text-right' : 'text-start'}`}>
                  {t('orders.details')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y ">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 rounded-sm transition-colors">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => onSelectOrder(order.id)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                  </td>
                  <td className={`px-4 py-3 text-sm text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                    #{order.orderId}
                  </td>
                  <td className={`px-4 py-3 text-sm text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {order.date}
                  </td>
                  <td className={`px-4 py-3 text-sm font-medium text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                    ${order.total}
                  </td>
                  <td className={`px-4 py-3 text-sm font-medium ${getPaymentStatusColor(order.payment)} ${isRTL ? 'text-right' : 'text-left'}`}>
                    {order.payment}
                  </td>
                  <td className={`px-4 py-3 text-sm text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {order.items}
                  </td>
                  <td className={`px-4 py-3 text-sm text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {order.customerName}
                  </td>
                  <td className={`px-4 py-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className={`flex items-center gap-2 text-sm font-medium ${getOrderStatusColor(order.status)} ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className={`w-2 h-2 rounded-full ${getStatusDotColor(order.status)}`}></span>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onViewDetails(order.id)}
                      className="text-green-600 hover:text-green-700 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;