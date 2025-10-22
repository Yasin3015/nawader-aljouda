import React from 'react';

const ProductRow = ({ label, value, className = "" }) => {
  return (
    <div className={`flex !w-full md:w-fit lg:max-w-1/2 !justify-between items-start py-2 ${className}`}>
      <span className="text-gray-600 font-medium min-w-0 flex-1">
        {label}:
      </span>
      <span className="text-gray-900 text-right ml-4">
        {value}
      </span>
    </div>
  );
};

export default ProductRow;

