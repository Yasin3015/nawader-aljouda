import React from 'react';

const PriceDisplay = ({ currentPrice, originalPrice }) => (
  <div className="flex items-center gap-2">
    <span className="font-semibold text-gray-900">${currentPrice}</span>
    {originalPrice && (
      <span className="text-sm text-gray-400 line-through">${originalPrice}</span>
    )}
  </div>
);

export default PriceDisplay;