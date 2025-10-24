import React from 'react';
import { useTranslation } from 'react-i18next';

const ProductList = ({ items = [
  { name: 'Product 1', price: 29.99, quantity: 2 },
  { name: 'Product 2', price: 49.99, quantity: 1 },
  { name: 'Product 3', price: 19.99, quantity: 3 }
] }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-start text-sm font-medium text-gray-900">
                {t('orderDetails.productList.product')}
              </th>
              <th className="px-6 py-4 text-start text-sm font-medium text-gray-900">
                {t('orderDetails.productList.price')}
              </th>
              <th className="px-6 py-4 text-start text-sm font-medium text-gray-900">
                {t('orderDetails.productList.quantity')}
              </th>
              <th className="px-6 py-4 text-start text-sm font-medium text-gray-900">
                {t('orderDetails.productList.total')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items?.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3 max-sm:flex-col max-sm:items-start">
                    <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0"></div>
                    <span className="text-gray-900">{item.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-900">
                  ${item.price}
                </td>
                <td className="px-6 py-4 text-gray-900">
                  x{item.quantity}
                </td>
                <td className="px-6 py-4 text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;