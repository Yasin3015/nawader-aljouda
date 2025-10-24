import React from 'react';
import { useTranslation } from 'react-i18next';
import ProductRow from './ProductRow';
import SocialShare from './SocialShare';
import { useWishlist } from '../../contexts/WishlistContext';
import { Heart } from 'lucide-react';

const WishlistTable = () => {
  const { t } = useTranslation();
  const { items, removeFromWishlist } = useWishlist();

  const handleRemove = (id) => {
    removeFromWishlist(id);
  };

  const handleAddToCart = (id) => {
    console.log('تمت إضافة المنتج للسلة:', id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white" dir="rtl">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        {t('wishlist.title', 'قائمة المفضلة')}
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Heart className="w-32 h-32 text-gray-300 mb-6" strokeWidth={1.5} />
          <p className="text-gray-600 text-2xl font-bold">
            {t('wishlist.empty', 'قائمة المفضلة فارغة')}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto md:overflow-x-visible -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide">
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
          <div className="inline-block min-w-full align-middle border-1 border-gray-300 rounded-md">
            <table className="min-w-full border border-gray-300 !border-t-1 rounded-lg overflow-hidden">
              <thead className="border-1 border-gray-300">
                <tr>
                  <th className="py-4 px-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    {t('wishlist.product', 'PRODUCT')}
                  </th>
                  <th className="py-4 px-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    {t('wishlist.price', 'PRICE')}
                  </th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    {t('wishlist.stockStatus', 'STOCK STATUS')}
                  </th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map(product => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    onRemove={handleRemove}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </tbody>
              <tfoot>
                <SocialShare />
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistTable;