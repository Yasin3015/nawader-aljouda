import { useMemo, useEffect, useState } from "react";

export default function useFilteredProducts(allProducts, selectedCategory, filters) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const filteredProducts = useMemo(() => {
    if (!filters) return allProducts; // تأمين في حالة undefined

    return allProducts.filter((product) => {
      // فلترة حسب التصنيف
      if (selectedCategory !== "All" && product.category !== selectedCategory.toLowerCase()) return false;

      // فلترة حسب السعر مع تحقق آمن
      const minPrice = filters?.priceRange?.min ?? 0;
      const maxPrice = filters?.priceRange?.max ?? Infinity;
      if (product.price < minPrice || product.price > maxPrice) return false;

      if (filters.ratings?.length > 0 && !filters.ratings.some((r) => product.rating >= r)) return false;

      if (filters.tags?.length > 0 && !filters.tags.some((tag) => product.tags.includes(tag))) return false;

      return true;
    });
  }, [allProducts, selectedCategory, filters]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, filters]);

  return { filteredProducts, paginatedProducts, currentPage, totalPages, setCurrentPage };
}
