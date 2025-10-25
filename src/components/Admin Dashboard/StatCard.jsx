// src/components/Dashboard/StatCard.jsx
import React from 'react';
import { Package, ShoppingCart, ShoppingBag, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const iconMap = {
  Package: Package,
  ShoppingCart: ShoppingCart,
  ShoppingBag: ShoppingBag,
  AlertCircle: AlertCircle
};

const StatCard = ({ titleKey, amount, percentage, isPositive, comparedTextKey, iconName }) => {
  const { t } = useTranslation();
  const Icon = iconMap[iconName] || null;

  return (
    <div className="bg-white rounded-lg p-5 shadow-sm relative">
      <div className="flex justify-between items-start mb-3">
        <span className="text-gray-600 text-sm font-medium">{t(titleKey)}</span>
      </div>
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-emerald-100 rounded-full p-2">
          {Icon && <Icon className="w-5 h-5 text-emerald-700" />}
        </div>
        <span className="text-2xl font-bold text-gray-900">{amount}</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className={`flex items-center ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isPositive ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"} />
          </svg>
          {percentage}
        </span>
        <span className="text-gray-500">{t(comparedTextKey)}</span>
      </div>
    </div>
  );
};

export default StatCard;
