import React from 'react';
import { useTranslation } from 'react-i18next';

const StockBadge = ({ inStock }) => {
  const { t } = useTranslation();
  return (
    <span className={`px-3 py-1 rounded text-sm ${
      inStock 
        ? 'bg-green-100 text-green-700' 
        : 'bg-red-100 text-red-700'
    }`}>
      {inStock ? t('wishlist.inStock', 'متوفر') : t('wishlist.outOfStock', 'غير متوفر')}
    </span>
  );
};

export default StockBadge;
