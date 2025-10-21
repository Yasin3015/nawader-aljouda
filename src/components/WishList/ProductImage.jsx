import React from 'react';

const ProductImage = ({ src, alt }) => (
  <div className="w-20 h-20 bg-gray-300 rounded flex-shrink-0">
    {src ? (
      <img src={src} alt={alt} className="w-full h-full object-cover rounded" />
    ) : null}
  </div>
);

export default ProductImage;