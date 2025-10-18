import React from 'react';

const CategoryCard = ({ title, image, count, active, onClick }) => {
  return (
    <div
      className={`
        flex-shrink-0 w-32 h-32 cursor-pointer transition-all duration-200 rounded-lg border-2
        ${active 
          ? 'border-green-500 bg-green-50' 
          : 'border-gray-200 bg-white hover:border-gray-300'
        }
      `}
      onClick={onClick}
    >
      <div className="p-3 h-full flex flex-col">
        {/* Image Placeholder */}
        <div className={`
          w-full h-16 rounded mb-2 flex items-center justify-center
          ${active ? 'bg-gray-300' : 'bg-gray-200'}
        `}>
          {image ? (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
        </div>

        {/* Category Title */}
        <h3 className={`
          text-sm font-medium mb-1
          ${active ? 'text-gray-900' : 'text-gray-700'}
        `}>
          {title}
        </h3>

        {/* Product Count */}
        <p className={`
          text-xs
          ${active ? 'text-green-600 font-medium' : 'text-gray-500'}
        `}>
          {count} Products
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
