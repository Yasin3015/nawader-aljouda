// src/components/Dashboard/BestSellers.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { bestSellers } from '../../FakeData/bestSellersData';

const BestSellers = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold text-gray-900">{t('bestSellers')}</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <circle cx="8" cy="3" r="1.5"/>
            <circle cx="8" cy="8" r="1.5"/>
            <circle cx="8" cy="13" r="1.5"/>
          </svg>
        </button>
      </div>

      <div className="space-y-3 mb-4">
        {bestSellers.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded"></div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{t(item.nameKey)}</p>
              <p className="text-sm text-gray-500">{item.oldPrice}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{item.price}</p>
              <p className="text-sm text-gray-500">{item.sales}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-2 border-2 border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition">
        {t('showAll')}
      </button>
    </div>
  );
};

export default BestSellers;
