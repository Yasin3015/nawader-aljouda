import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';

const ProductImageGallery = ({ images = [], productName = "Product" }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Default images if none provided
  const defaultImages = [
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop'
  ];

  const galleryImages = images.length > 0 ? images : defaultImages;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative">
        <img
          src={galleryImages[selectedImage]}
          alt={productName}
          className="w-full h-96 lg:h-[500px] object-cover rounded-lg bg-gray-200"
        />
        {/* Scroll up arrow */}
        <button className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors">
          <ChevronUp className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex flex-col gap-2">
        {galleryImages.slice(0, 4).map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === index
                ? 'border-green-500 ring-2 ring-green-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <img
              src={image}
              alt={`${productName} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;

