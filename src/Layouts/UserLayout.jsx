import React from "react";
import { Outlet } from "react-router-dom";
import ResponsiveNavbar from "../components/Layout/Navbar/ResponsiveNavbar";
import HeroSection from "../components/Common/Hero/HeroSection";
import ProductListSection from "../components/Common/Products/ProductsHomeList";
import BestSaleCard from "../components/Common/Products/BestSaleCard";
import Container from "../components/UI/Container";
import ProductCard from "../components/Common/Products/ProductCard";
import { products } from "../FakeData/Products";

const UserLayout = () => {
  const limitedProducts = products.slice(0, 4);

  return (
    <div className="bg-amber-50 min-h-screen">
      <ResponsiveNavbar />
      <HeroSection />
      <ProductListSection />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-8">
          {/* ===== Best Sale Card ===== */}
          <div className="lg:col-span-2">
            <BestSaleCard
              product={{
                image: "/assets/products/cabbage.jpg",
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

          {/* ===== Product List ===== */}
          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((p, i) => (
                <div
                  key={p.id}
                  className={`${
                    i >= 4 ? "hidden sm:block" : ""
                  }`}
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <Outlet />
    </div>
  );
};
export default UserLayout;
