import React from "react";
import { Heart, Eye, ShoppingBag } from "lucide-react";

const ProductCard = ({ product }) => {
  const { image, name, price, rating = 0, flag } = product;

  // ⭐ دالة النجوم
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {"★".repeat(fullStars)}
        {hasHalfStar && "☆"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  // 🎯 إعدادات الألوان للفلاج
  const badgeStyles = {
    "out of stock": "bg-black text-white",
    sale: "bg-[#EA4B48] text-white",
    "best sale": "bg-[#2388FF] text-white",
  };

  const badgeText =
    flag === "out of stock"
      ? "Out of Stock"
      : flag === "sale"
      ? "Sale"
      : flag === "best sale"
      ? "Best Sale"
      : null;

  return (
    <div className="relative group bg-[var(--color-white)] rounded-[var(--radius-md)] overflow-hidden border border-transparent hover:border-[var(--color-primary)] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.08)]">
      
      {/* Image */}
      <div className="w-full h-48 bg-gray-300 flex items-center justify-center relative">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="text-gray-500">No Image</div>
        )}

        {/* 🔖 Badge */}
        {badgeText && (
          <span
            className={`absolute top-3 left-3 text-xs font-medium px-1.5 py-1 rounded-sm capitalize ${badgeStyles[flag]}`}
          >
            {badgeText}
          </span>
        )}

        {/* Hover Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="cursor-pointer bg-[var(--color-white)] p-2 rounded-full shadow-md hover:text-[var(--color-primary)] transition">
            <Heart className="w-4 h-4" />
          </button>
          <button className="cursor-pointer bg-[var(--color-white)] p-2 rounded-full shadow-md hover:text-[var(--color-primary)] transition">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-700">{name}</p>
          <p className="text-[15px] font-semibold text-gray-900 text-start !px-0 mt-1">${price}</p>
          <div className="flex mt-1 text-yellow-400 text-sm">
            {renderStars(rating)}
          </div>
        </div>

        <button
          className={`border cursor-pointer border-gray-200 p-2 transition rounded-full ${
            flag === "out of stock"
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-[var(--color-white)] hover:bg-[var(--color-primary)] hover:text-white"
          }`}
          disabled={flag === "out of stock"}
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
