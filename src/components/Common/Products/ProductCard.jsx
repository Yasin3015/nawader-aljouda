import React, { useState } from "react";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../contexts/CartContext";
import { useWishlist } from "../../../contexts/WishlistContext";
import { useToast } from "../../UI/ToastProvider";

const ProductCard = ({ product }) => {
  const { image, name, price, rating = 0, flag, id } = product;
  const { addToCart, removeFromCart, items } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [isTapped, setIsTapped] = useState(false);

  const isInCart = items.some((cartItem) => cartItem.id === id);
  const isInWishlistItem = isInWishlist(id); // ⬅️ خليها هنا قبل أي استخدام ليها

  const handleViewDetails = () => navigate(`/product/${id || '1'}`);

  const handleWishlistToggle = () => {
    if (isInWishlistItem) removeFromWishlist(id);
    else addToWishlist(product);
  };

  const toggleButtons = () => {
    setIsTapped((prev) => !prev);
  };

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
    <div
      className="relative group bg-[var(--color-white)] rounded-[var(--radius-md)] overflow-hidden border border-transparent hover:border-[var(--color-primary)] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.08)]"
      onClick={toggleButtons}
    >
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

        {badgeText && (
          <span
            className={`absolute top-3 left-3 text-xs font-medium px-1.5 py-1 rounded-sm capitalize ${badgeStyles[flag]}`}
          >
            {badgeText}
          </span>
        )}

        <div
          className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
            isTapped ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleWishlistToggle();
            }}
            className={`cursor-pointer bg-[var(--color-white)] p-2 rounded-full shadow-md transition ${
              isInWishlistItem
                ? "text-red-500 hover:text-red-600"
                : "hover:text-[var(--color-primary)]"
            }`}
          >
            <Heart className={`w-4 h-4 ${isInWishlistItem ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="cursor-pointer bg-[var(--color-white)] p-2 rounded-full shadow-md hover:text-[var(--color-primary)] transition"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-3 flex !flex-wrap  cursor-pointer items-center justify-between">
        <p onClick={()=>{navigate(`/product/${product.id}`)}} className="text-start text-md flex-1 !min-w-full text-gray-700">{name}</p>
        <div>
          <p className="text-[15px] font-semibold text-gray-900 text-start !px-0 mt-1">${price}</p>
          <div className="flex mt-1 text-yellow-400 text-sm">
            {"★".repeat(rating)}{"☆".repeat(5 - rating)}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className={`border cursor-pointer border-gray-200 p-2 transition rounded-full ${
            flag === "out of stock"
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : isInCart
              ? "bg-[var(--color-primary)] text-[var(--color-hard-primary)] hover:bg-[var(--color-primary)]"
              : "bg-gray-500 text-white hover:bg-[var(--color-primary)] hover:text-[var(--color-hard-primary)]"
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
