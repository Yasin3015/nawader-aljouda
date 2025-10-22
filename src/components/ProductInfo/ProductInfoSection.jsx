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
  const [quantity, setQuantity] = useState(1);
  const { addToWishlist } = useWishlist();

  const {
    name = "اسم المنتج",
    rating = 5,
    reviewCount = 4,
    originalPrice = 48.00,
    discountedPrice = 17.28,
    discountPercentage = 84,
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category = "بالاستيك",
    tags = "الأكثر مبيعا معدن خطر حديد"
  } = product;

  const handleAddToCart = () => {
    const cartProduct = {
      id: product.id || Date.now(),
      name,
      price: discountedPrice,
      image: product.images?.[0] || '',
      unit: "piece",
      rating,
      quantity
    };
    
    addToCart(cartProduct);
    addToast(`${name} added to cart!`, "success");
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const renderStars = (rating) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
        {name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex text-yellow-400 text-lg">
          {renderStars(rating)}
        </div>
        <span className="text-sm text-gray-500">
          {reviewCount} {t('productInfo.reviews')}
        </span>
      </div>

      {/* Pricing */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-green-600">
            ${discountedPrice}
          </span>
          <span className="text-lg text-gray-400 line-through">
            ${originalPrice}
          </span>
        </div>
        <span className="bg-red-100 text-red-500 px-3 py-1 rounded-full text-sm font-medium">
          {discountPercentage}% {t('productInfo.discount')}
        </span>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
        <button className="text-green-600 hover:text-green-700 font-medium">
          {t('productInfo.moreDetails')}
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-gray-300 rounded-full p-1">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="p-2 hover:bg-gray-50 transition-colors w-8 h-8 border border-gray-300 rounded-full"
          >
            <Minus className="w-4 h-4 " />
          </button>
          <span className="px-4 text-center">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="p-2 hover:bg-gray-50 transition-colors w-8 h-8 border border-gray-300 rounded-full"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
        <button
          onClick={()=>addToCart(product)}
          className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          <ShoppingBag className="w-5 h-5" />
          {t('productInfo.addToCart')}
        </button>
        <button onClick={()=>addToWishlist(product)} className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Heart className="w-5 h-5 text-gray-600" />
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

