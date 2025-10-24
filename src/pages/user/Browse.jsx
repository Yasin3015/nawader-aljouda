import React, { useState, useMemo } from "react";
import CategorySlider from "../../components/Browse/CategorySlider";
import FilterSidebar from "../../components/Browse/FilterSidebar";
import ProductGrid from "../../components/Browse/ProductGrid";
import { products } from "../../FakeData/Products";
import { categories } from "../../FakeData/Categories";
import useFilteredProducts from "../../hooks/useFilteredProducts";

const Browse = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 1000 },
    ratings: [],
    tags: []
  });
  const [sortOption, setSortOption] = useState("latest");
  
  // ✅ إضافة state للفيلتر sidebar
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // ✅ دالة للتعامل مع تغيير الفلاتر بشكل آمن
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // ✅ دالة لفتح/إغلاق الفيلتر
  const toggleFilter = () => {
    setIsFilterOpen(prev => !prev);
  };

  // 🧩 استخدم الهوك الجديد للفلاتر
  const { filteredProducts, paginatedProducts, currentPage, totalPages, setCurrentPage } =
    useFilteredProducts(products, selectedCategory, filters);

  // 🧮 الترتيب (Sort)
  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];
    switch (sortOption) {
      case "priceLowHigh":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceHighLow":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "nameAZ":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return sorted;
  }, [filteredProducts, sortOption]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Select Categories</h1>

        <CategorySlider
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="flex flex-col lg:flex-row gap-6 mt-8">
          <FilterSidebar 
            filters={filters} 
            onFilterChange={handleFilterChange}
            isOpen={isFilterOpen}
            onToggle={toggleFilter}
          />

          <div className="flex-1">
            <ProductGrid
              products={sortedProducts.slice((currentPage - 1) * 9, currentPage * 9)}
              totalProducts={sortedProducts.length}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              sortOption={sortOption}
              onSortChange={setSortOption}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;