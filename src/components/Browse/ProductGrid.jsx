import React from 'react';
import ProductCard from '../Common/Products/ProductCard';
import Pagination from './Pagination';
import SortDropdown from './SortDropdown';

const ProductGrid = ({ products, totalProducts, currentPage, totalPages, onPageChange, sortOption, onSortChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-row items-center justify-between gap-4">
        <SortDropdown selectedSort={sortOption} onSortChange={onSortChange} />
        <div className="text-sm text-gray-600">{totalProducts} Results Found</div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No products found</div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default React.memo(ProductGrid);
