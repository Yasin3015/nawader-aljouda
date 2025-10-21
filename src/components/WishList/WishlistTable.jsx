import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProductRow from './ProductRow';
import SocialShare from './SocialShare';

const WishlistTable = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'plastic',
      price: 14.99,
      originalPrice: 20.00,
      inStock: true,
      image: null
    },
    {
      id: 2,
      name: 'plastic',
      price: 45.00,
      originalPrice: null,
      inStock: true,
      image: null
    },
    {
      id: 3,
      name: 'plastic',
      price: 9.00,
      originalPrice: null,
      inStock: false,
      image: null
    }
  ]);

  const handleRemove = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleAddToCart = (id) => {
    console.log('تمت إضافة المنتج للسلة:', id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white" dir="rtl">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        {t('wishlist.title', 'قائمة المفضلة')}
      </h1>

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
              {products.map(product => (
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
    </div>
  );
};

export default WishlistTable;

