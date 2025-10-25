// src/components/Dashboard/RecentOrders.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { recentOrders } from '../../FakeData/ordersData';
import userPhoto from '../../assets/images/user-dash.png'

const RecentOrders = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold text-gray-900">{t('recentOrders')}</h3>
      </div>

      <div className="overflow-x-auto" style={{ maxWidth: '100%' }}>
        <div style={{ minWidth: '600px' }}>
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--color-green-gray-2)]">
                <th className="text-start py-3 px-2">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="text-start py-3 px-2 text-sm font-semibold text-emerald-600">{t('product')}</th>
                <th className="text-start py-3 px-2 text-sm font-semibold text-emerald-600">{t('orderId')}</th>
                <th className="text-start py-3 px-2 text-sm font-semibold text-emerald-600">{t('date')}</th>
                <th className="text-start py-3 px-2 text-sm font-semibold text-emerald-600">{t('customerName')}</th>
                <th className="text-start py-3 px-2 text-sm font-semibold text-emerald-600">{t('status')}</th>
                <th className="text-start py-3 px-2 text-sm font-semibold text-emerald-600">{t('amount')}</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, idx) => (
                <tr key={idx} className="border-t border-t-[var(--color-green-gray-2)] hover:bg-gray-50">
                  <td className="py-3 px-2">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="py-3 px-2 text-sm">{t(order.productKey)}</td>
                  <td className="py-3 px-2 text-sm">{order.id}</td>
                  <td className="py-3 px-2 text-sm">{order.date}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <div className='w-8 h-8 rounded-full bg-[var(--color-green-gray-4)]'>
                        <img 
                        src={userPhoto}
                        alt={"user name"}
                        className='w-8 h-8 rounded-full object-cover'
                      />
                      </div>
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
