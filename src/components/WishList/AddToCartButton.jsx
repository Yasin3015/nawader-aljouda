import React from 'react';
import { useTranslation } from 'react-i18next';

const AddToCartButton = ({ disabled, onClick }) => {
  const { t } = useTranslation();
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`px-6 py-2 rounded-full text-white text-sm font-medium transition-colors ${
        disabled 
          ? 'bg-gray-300 cursor-not-allowed' 
          : 'bg-green-600 hover:bg-green-700'
      }`}
    >
      {t('wishlist.addToCart', 'أضف إلى السلة')}
    </button>
  );
};

export default AddToCartButton;