// src/components/Dashboard/RecentOrders.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { recentOrders } from '../../FakeData/ordersData';

const RecentOrders = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold text-gray-900">{t('recentOrders')}</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <circle cx="8" cy="3" r="1.5"/>
            <circle cx="8" cy="8" r="1.5"/>
            <circle cx="8" cy="13" r="1.5"/>
          </svg>
        </button>
      </div>

      <div className="overflow-x-auto" style={{ maxWidth: '100%' }}>
        <div style={{ minWidth: '600px' }}>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-emerald-600">{t('product')}</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-emerald-600">{t('orderId')}</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-emerald-600">{t('date')}</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-emerald-600">{t('customerName')}</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-emerald-600">{t('status')}</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-emerald-600">{t('amount')}</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="py-3 px-2 text-sm">{t(order.productKey)}</td>
                  <td className="py-3 px-2 text-sm">{order.id}</td>
                  <td className="py-3 px-2 text-sm">{order.date}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                      <span className="text-sm">{order.customer}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <span className={`inline-flex items-center text-xs ${
                      order.status === 'delivered' ? 'text-emerald-700' : 'text-red-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        order.status === 'delivered' ? 'bg-emerald-700' : 'bg-red-700'
                      }`}></span>
                      {order.status === 'delivered' ? t('delivered') : t('canceled')}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-sm">{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
