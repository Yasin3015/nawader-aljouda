import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, ShoppingBag, Minus, Plus } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../UI/ToastProvider';
import { useWishlist } from '../../contexts/WishlistContext';

const ProductInfoSection = ({ product }) => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const { addToWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false); // 👈 للتحكم في عرض الوصف

  const {
    name = "اسم المنتج",
    rating = 5,
    reviewCount = 4,
    originalPrice = 48.0,
    discountedPrice = 17.28,
    discountPercentage = 84,
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    category = "بلاستيك",
    tags = "الأكثر مبيعا معدن خطر حديد",
  } = product;

  const handleAddToCart = () => {
    const cartProduct = {
      id: product.id || Date.now(),
      name,
      price: discountedPrice,
      image: product.images?.[0] || '',
      unit: 'piece',
      rating,
      quantity,
    };

    addToCart(cartProduct);
    addToast(`${name} ${t('productInfo.addedToCart') || 'added to cart!'}`, 'success');
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  const renderStars = (rating) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{name}</h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex text-yellow-400 text-lg">{renderStars(rating)}</div>
        <span className="text-sm text-gray-500">
          {reviewCount} {t('productInfo.reviews')}
        </span>
      </div>

      {/* Pricing */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="text-2xl md:text-3xl font-bold text-green-600">${discountedPrice}</span>
          <span className="text-base md:text-lg text-gray-400 line-through">${originalPrice}</span>
        </div>
        <span className="bg-red-100 text-red-500 px-2.5 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
          {discountPercentage}% {t('productInfo.discount')}
        </span>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <p
          className={`text-gray-600 leading-relaxed transition-all duration-300 ${
            isExpanded ? 'line-clamp-none' : 'line-clamp-3'
          }`}
        >
          {description}
        </p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-green-600 hover:text-green-700 font-medium text-sm md:text-base"
        >
          {isExpanded ? t('productInfo.showLess') || 'Show Less' : t('productInfo.moreDetails') || 'See More'}
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {/* Quantity Selector */}
        <div className="flex items-center border border-gray-300 rounded-full p-1">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="p-2 hover:bg-gray-50 transition-colors w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 text-center text-sm md:text-base">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="p-2 hover:bg-gray-50 transition-colors w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
          {/* Wishlist */}
        <button
          onClick={() => addToWishlist(product)}
          className="p-2.5 md:p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Heart className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
        </button>
        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 md:px-8 py-2.5 md:py-3 rounded-lg hover:bg-green-700 transition-colors text-sm md:text-base w-full sm:w-auto"
        >
          <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
          {t('productInfo.addToCart')}
        </button>
      </div>

      {/* Product Attributes */}
      <div className="space-y-2 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          <span className="font-medium">{t('productInfo.category')}:</span> {category}
        </div>
        <div className="text-sm text-gray-500">
          <span className="font-medium">{t('productInfo.tags')}:</span> {tags}
        </div>
      </div>
    </div>
  );
};

export default ProductInfoSection;
