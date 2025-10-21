import React from 'react';
import ProductImage from './ProductImage';
import PriceDisplay from './PriceDisplay';
import StockBadge from './StockBadge';
import AddToCartButton from './AddToCartButton';
import RemoveButton from './RemoveButton';


const ProductRow = ({ product, onRemove, onAddToCart }) => (
  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
    <td className="py-4 px-4">
      <div className="flex items-center gap-4">
        <ProductImage src={product.image} alt={product.name} />
        <span className="text-gray-800 font-medium whitespace-nowrap">{product.name}</span>
      </div>
    </td>
    <td className="py-4 px-4">
      <PriceDisplay 
        currentPrice={product.price} 
        originalPrice={product.originalPrice} 
      />
    </td>
    <td className="py-4 px-4 text-center">
      <StockBadge inStock={product.inStock} />
    </td>
    <td className="py-4 px-4">
      <div className="flex items-center justify-center gap-3">
        <AddToCartButton 
          disabled={!product.inStock}
          onClick={() => onAddToCart(product.id)}
        />
        <RemoveButton onClick={() => onRemove(product.id)} />
      </div>
    </td>
  </tr>
);

export default ProductRow;