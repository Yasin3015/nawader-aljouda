import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ProductCard from '../Common/Products/ProductCard';

const RelatedProductsSection = ({ products = [] }) => {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);

  const defaultProducts = [
    { id: 1, name: 'Plastic', price: 14.99, image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop', rating: 5, flag: 'sale' },
    { id: 2, name: 'Cabbage', price: 14.99, image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=300&h=300&fit=crop', rating: 5, flag: 'new' },
    { id: 3, name: 'Capsicum', price: 14.99, image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=300&h=300&fit=crop', rating: 4, flag: 'new' },
    { id: 4, name: 'Ladies Finger', price: 12.99, image: 'https://images.unsplash.com/photo-1565958011705-44e211f3739c?w=300&h=300&fit=crop', rating: 4, flag: 'new' },
    { id: 5, name: 'Tomato', price: 9.99, image: 'https://images.unsplash.com/photo-1590080875832-43d87f0c7d1a?w=300&h=300&fit=crop', rating: 5, flag: 'new' },
    { id: 6, name: 'Carrot', price: 10.5, image: 'https://images.unsplash.com/photo-1547516508-4e31d6d6b6d8?w=300&h=300&fit=crop', rating: 5, flag: 'new' },
    { id: 7, name: 'Cucumber', price: 8.49, image: 'https://images.unsplash.com/photo-1572448862528-9b4b0fd20baf?w=300&h=300&fit=crop', rating: 4, flag: 'new' },
  ];

  const relatedProducts = products.length > 0 ? products : defaultProducts;

  const displayedProducts = showAll
    ? relatedProducts
    : relatedProducts.slice(0, 5); // أول 5 كروت فقط

  return (
    <div className="mt-12">
      {/* ====== Header ====== */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {t('productInfo.relatedProducts')}
        </h2>
        {relatedProducts.length > 5 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition"
          >
            {showAll ? (
              <>
                Show less <ChevronUp className="w-5 h-5" />
              </>
            ) : (
              <>
                Show more <ChevronDown className="w-5 h-5" />
              </>
            )}
          </button>
        )}
      </div>

      {/* ====== Products Container ====== */}
      <div
        className={`transition-all duration-300 ${
          showAll
            ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6'
            : 'flex overflow-x-auto justify-between gap-2 scrollbar-hide'
        }`}
      >
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className={`${showAll ? '' : 'min-w-[240px] flex-shrink-0'}`}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* ====== Hide scrollbar ====== */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default RelatedProductsSection;
