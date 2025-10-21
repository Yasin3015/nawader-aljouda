import React from 'react';
import { useTranslation } from 'react-i18next';
import ProductCard from '../Common/Products/ProductCard';

const RelatedProductsSection = ({ products = [] }) => {
  const { t } = useTranslation();

  // Default related products if none provided
  const defaultProducts = [
    {
      id: 1,
      name: 'plastic',
      price: 14.99,
      originalPrice: 20.09,
      discountPercentage: 50,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop',
      rating: 5,
      flag: 'sale'
    },
    {
      id: 2,
      name: 'Chanise Cabbage',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop',
      rating: 5,
      flag: 'new'
    },
    {
      id: 3,
      name: 'Green Capsicum',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop',
      rating: 5,
      flag: 'new'
    },
    {
      id: 4,
      name: 'Ladies Finger',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop',
      rating: 5,
      flag: 'new'
    }
  ];

  const relatedProducts = products.length > 0 ? products : defaultProducts;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {t('productInfo.relatedProducts')}
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProductsSection;

