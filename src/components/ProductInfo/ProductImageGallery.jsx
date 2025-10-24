import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const ProductImageGallery = ({ images = [], productName = "Product" }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Default images if none provided
  const defaultImages = [
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1581291519195-ef11498d1cf5?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1606813907291-3d53b5f6f9a3?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=600&fit=crop",
  ];

  const galleryImages = images.length > 0 ? images : defaultImages;

  const handlePrev = () => {
    setSelectedImage((prev) =>
      prev > 0 ? prev - 1 : galleryImages.length - 1
    );
  };

  const handleNext = () => {
    setSelectedImage((prev) =>
      prev < galleryImages.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <div className="flex flex-row-reverse gap-4">
      {/* الصورة الرئيسية */}
      <div className="relative w-full">
        <img
          src={galleryImages[selectedImage]}
          alt={productName}
          className="w-full h-96 lg:h-[500px] object-cover rounded-lg bg-gray-200"
        />
      </div>

      {/* الصور المصغرة + الأسهم */}
      <div className="flex flex-col items-center gap-2 relative">
        {/* سهم لأعلى */}
        <button
          onClick={handlePrev}
          className="bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors mb-2"
        >
          <ChevronUp className="w-5 h-5 text-gray-600" />
        </button>

        {/* الصور المصغرة */}
        <div className="flex flex-col gap-2 max-h-[440px] overflow-y-auto scrollbar-hide">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? "border-green-500 ring-2 ring-green-200"
                  : "border-gray-200 hover:border-gray-300"
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

        {/* سهم لأسفل */}
        <button
          onClick={handleNext}
          className="bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors mt-2"
        >
          <ChevronDown className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ProductImageGallery;
