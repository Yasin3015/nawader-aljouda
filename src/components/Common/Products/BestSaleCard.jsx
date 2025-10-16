import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Star, Heart, Eye, ShoppingBag } from "lucide-react";

const BestSaleCard = ({ product }) => {
  const { t } = useTranslation();
  const {
    image,
    name,
    price,
    oldPrice,
    salePercent,
    rating,
    reviewsCount,
    isBestSale,
    offerEndsAt,
  } = product;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(offerEndsAt).getTime();
      const distance = end - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          mins: Math.floor((distance / (1000 * 60)) % 60),
          secs: Math.floor((distance / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [offerEndsAt]);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      {/* ====== Product Image + Labels ====== */}
      <div className="relative bg-gray-100 aspect-[4/3] flex items-center justify-center overflow-hidden">
        <img src={image} alt={name} className="object-cover w-full h-full" />
        <div className="absolute top-3 left-3 flex gap-2">
          {salePercent && (
            <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
              {t("sale")} {salePercent}%
            </span>
          )}
          {isBestSale && (
            <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
              {t("best_sale")}
            </span>
          )}
        </div>

        {/* ====== Action Buttons ====== */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] flex justify-between items-center">
          <button className="bg-white/90 hover:bg-white rounded-full p-2 transition">
            <Heart size={18} className="text-gray-700" />
          </button>

          <button className="flex-1 mx-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-full py-2 transition flex justify-center items-center gap-2">
            {t("add_to_cart")}
            <ShoppingBag size={16} />
          </button>

          <button className="bg-white/90 hover:bg-white rounded-full p-2 transition">
            <Eye size={18} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* ====== Product Info ====== */}
      <div className="p-4 flex flex-col items-center text-center">
        <h3 className="text-green-700 text-sm font-semibold">{name}</h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">${price}</span>
          {oldPrice && (
            <span className="text-gray-400 line-through text-sm">
              ${oldPrice}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={
                i < Math.round(rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}
          <span className="text-gray-500 text-xs">
            ({reviewsCount} {t("feedback")})
          </span>
        </div>

        {/* Countdown */}
        <div className="mt-3 text-gray-600 text-xs">
          <p className="font-medium mb-1">{t("hurry_up_offer_ends_in")}:</p>
          <div className="flex justify-center gap-4">
            {["days", "hours", "mins", "secs"].map((unit) => (
              <div key={unit} className="text-center">
                <p className="text-lg font-bold text-gray-900">
                  {String(timeLeft[unit]).padStart(2, "0")}
                </p>
                <p className="text-[10px] uppercase tracking-wide">
                  {t(unit)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSaleCard;
