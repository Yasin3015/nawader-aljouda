import React, { useState } from "react";
import ProductCard from "./Products/ProductCard";
import BestSaleCard from "./Products/BestSaleCard";
import product1 from '../../assets/images/product1.jpg'

const ProductsSection = ({ products }) => {
  const [showAll, setShowAll] = useState(false);
  const firstSix = products.slice(0, 6);
  const remaining = products.slice(6);

  return (
    <section className="py-10 bg-[var(--color-white)] container">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[var(--color-gray-9)]">
          Best Deals
        </h2>
        {remaining.length > 0 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-[var(--color-primary)] font-medium hover:underline transition"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
        <div className="lg:col-span-2">
          <BestSaleCard
            product={{
                image: product1,
                id: 123344,
                name: "Chinese cabbage",
                price: 12.0,
                oldPrice: 24.0,
                salePercent: 50,
                rating: 4.5,
                reviewsCount: 524,
                isBestSale: true,
                offerEndsAt: "2025-11-18T00:00:00",
              }}
          />
        </div>

        {/* أول 6 منتجات */}
        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {firstSix.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* المنتجات الإضافية */}
      {showAll && remaining.length > 0 && (
        <div
          className="mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fadeIn"
          style={{
            animation: "fadeIn 0.6s ease-in-out",
          }}
        >
          {remaining.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* أنيميشن بسيطة */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default ProductsSection;
