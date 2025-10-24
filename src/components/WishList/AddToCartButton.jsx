import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../contexts/CartContext';

const AddToCartButton = ({ disabled, product}) => {
  const { t } = useTranslation();
  const {addToCart} = useCart();
   const handleAddToCart = () => {
    if (!disabled && product) {
      addToCart(product, 1);
    }
  };
  return (
    <button
      disabled={disabled}
      onClick={handleAddToCart}
      className={`px-1 min-w-25 rounded-sm md:px-6 py-2 text-white text-sm transition-colors ${
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