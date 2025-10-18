import React, { useState, useEffect } from 'react';
import CategorySlider from '../../components/Browse/CategorySlider';
import FilterSidebar from '../../components/Browse/FilterSidebar';
import ProductGrid from '../../components/Browse/ProductGrid';

const Browse = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 1000 },
    ratings: [],
    tags: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sample categories data
  const categories = [
    { id: 'all', title: 'All', image: null, count: 52 },
    { id: 'plastic', title: 'Plastic', image: null, count: 123 },
    { id: 'metal', title: 'Metal', image: null, count: 89 },
    { id: 'electronics', title: 'Electronics', image: null, count: 67 },
    { id: 'textiles', title: 'Textiles', image: null, count: 45 },
    { id: 'paper', title: 'Paper', image: null, count: 34 },
    { id: 'glass', title: 'Glass', image: null, count: 23 },
    { id: 'wood', title: 'Wood', image: null, count: 56 }
  ];

  // Sample products data - updated to match existing ProductCard component props
  const allProducts = [
    {
      id: 1,
      name: 'Industrial Plastic Waste',
      price: 14.99,
      rating: 4.5,
      image: null,
      flag: null,
      category: 'plastic',
      tags: ['high-quality', 'discounts']
    },
    {
      id: 2,
      name: 'Metal Scrap Collection',
      price: 25.50,
      rating: 4.8,
      image: null,
      flag: 'best sale',
      category: 'metal',
      tags: ['newest', 'high-quality']
    },
    {
      id: 3,
      name: 'Electronic Components',
      price: 45.00,
      rating: 3.2,
      image: null,
      flag: 'sale',
      category: 'electronics',
      tags: ['sale', 'discounts']
    },
    {
      id: 4,
      name: 'Textile Waste Bundle',
      price: 12.99,
      rating: 4.0,
      image: null,
      flag: null,
      category: 'textiles',
      tags: ['low-cost']
    },
    {
      id: 5,
      name: 'Paper Waste Package',
      price: 8.75,
      rating: 4.2,
      image: null,
      flag: 'out of stock',
      category: 'paper',
      tags: ['high-sale']
    },
    {
      id: 6,
      name: 'Glass Bottle Collection',
      price: 18.25,
      rating: 4.6,
      image: null,
      flag: null,
      category: 'glass',
      tags: ['high-quality']
    },
    {
      id: 7,
      name: 'Wood Scrap Bundle',
      price: 22.99,
      rating: 4.3,
      image: null,
      flag: null,
      category: 'wood',
      tags: ['best-deal']
    },
    {
      id: 8,
      name: 'Mixed Plastic Waste',
      price: 16.50,
      rating: 3.8,
      image: null,
      flag: null,
      category: 'plastic',
      tags: ['emergencies']
    },
    {
      id: 9,
      name: 'Steel Scrap Collection',
      price: 35.00,
      rating: 4.7,
      image: null,
      flag: 'best sale',
      category: 'metal',
      tags: ['high-quality', 'newest']
    },
    {
      id: 10,
      name: 'Circuit Board Waste',
      price: 28.75,
      rating: 4.1,
      image: null,
      flag: null,
      category: 'electronics',
      tags: ['high-sale']
    },
    {
      id: 11,
      name: 'Fabric Waste Bundle',
      price: 11.25,
      rating: 3.9,
      image: null,
      flag: null,
      category: 'textiles',
      tags: ['low-cost']
    },
    {
      id: 12,
      name: 'Cardboard Collection',
      price: 7.99,
      rating: 4.4,
      image: null,
      flag: 'sale',
      category: 'paper',
      tags: ['best-deal']
    }
  ];

  // Filter products based on selected category and filters
  const filteredProducts = allProducts.filter(product => {
    // Category filter
    if (selectedCategory !== 'All' && product.category !== selectedCategory.toLowerCase()) {
      return false;
    }

    // Price filter
    if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
      return false;
    }

    // Rating filter
    if (filters.ratings.length > 0 && !filters.ratings.some(rating => product.rating >= rating)) {
      return false;
    }

    // Tag filter
    if (filters.tags.length > 0 && !filters.tags.some(tag => product.tags.includes(tag))) {
      return false;
    }

    return true;
  });

  // Pagination
  const productsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, filters]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Select Categories</h1>
        
        {/* Category Slider */}
        <CategorySlider
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 mt-8">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen(!isFilterOpen)}
          />

          {/* Product Grid */}
          <div className="flex-1">
            <ProductGrid
              products={paginatedProducts}
              totalProducts={filteredProducts.length}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
