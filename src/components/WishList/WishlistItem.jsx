import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Eye, ShoppingBag, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useToast } from '../UI/ToastProvider';

const WishlistItem = ({ item }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { removeFromWishlist } = useWishlist();
  const { addToast } = useToast();

  const handleAddToCart = () => {
    const cartProduct = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      unit: "piece",
      rating: item.rating
    };
    
    addToCart(cartProduct);
    addToast(`${item.name} ${t('wishlist.actions.addToCart')}`, "success");
  };

  const handleRemoveFromWishlist = () => {
    removeFromWishlist(item.id);
  };

  const handleViewDetails = () => {
    navigate(`/product/${item.id}`);
  };

  const renderStars = (rating) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {item.name}
          </h3>
          
          <div className="flex items-center gap-2 mt-1">
            <div className="flex text-yellow-400 text-sm">
              {renderStars(item.rating)}
            </div>
            <span className="text-sm text-gray-500">
              ({item.rating})
            </span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-xl font-bold text-green-600">
              ${item.price}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            {t('wishlist.actions.addToCart')}
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleViewDetails}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              <Eye className="w-4 h-4" />
              {t('wishlist.actions.viewDetails')}
            </button>

            <button
              onClick={handleRemoveFromWishlist}
              className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors text-sm"
            >
              <X className="w-4 h-4" />
              {t('wishlist.actions.remove')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;

