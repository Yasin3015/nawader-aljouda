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
  const categories = [
    { id: 'all', title: 'All', image: null, count: 52 },
    { id: 'vegetables', title: 'Vegetables', image: null, count: 25 },
    { id: 'fruits', title: 'Fruits', image: null, count: 18 },
    { id: 'dairy', title: 'Dairy', image: null, count: 12 },
    { id: 'meat', title: 'Meat', image: null, count: 8 },
    { id: 'grains', title: 'Grains', image: null, count: 15 },
    { id: 'beverages', title: 'Beverages', image: null, count: 10 },
    { id: 'snacks', title: 'Snacks', image: null, count: 20 },
    { id: 'condiments', title: 'Condiments', image: null, count: 12 },
    { id: 'frozen', title: 'Frozen', image: null, count: 8 }
  ];
  const allProducts = [
    {
      id: 1,
      name: 'Green Capsicum',
      price: 14.00,
      rating: 4.5,
      image: null,
      flag: null,
      category: 'vegetables',
      tags: ['fresh', 'organic']
    },
    {
      id: 2,
      name: 'Red Capsicum',
      price: 14.00,
      rating: 4.8,
      image: null,
      flag: 'sale',
      category: 'vegetables',
      tags: ['fresh', 'organic']
    },
    {
      id: 3,
      name: 'Fresh Tomatoes',
      price: 8.50,
      rating: 4.2,
      image: null,
      flag: 'best sale',
      category: 'vegetables',
      tags: ['fresh', 'local']
    },
    {
      id: 4,
      name: 'Organic Lettuce',
      price: 6.99,
      rating: 4.6,
      image: null,
      flag: null,
      category: 'vegetables',
      tags: ['organic', 'fresh']
    },
    {
      id: 5,
      name: 'Sweet Potatoes',
      price: 12.00,
      rating: 4.4,
      image: null,
      flag: 'out of stock',
      category: 'vegetables',
      tags: ['organic', 'nutritious']
    },
    {
      id: 6,
      name: 'Fresh Carrots',
      price: 9.99,
      rating: 4.7,
      image: null,
      flag: null,
      category: 'vegetables',
      tags: ['fresh', 'vitamin-rich']
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

  const filteredProducts = allProducts.filter(product => {
    if (selectedCategory !== 'All' && product.category !== selectedCategory.toLowerCase()) {
      return false;
    }

    if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
      return false;
    }

    if (filters.ratings.length > 0 && !filters.ratings.some(rating => product.rating >= rating)) {
      return false;
    }

    if (filters.tags.length > 0 && !filters.tags.some(tag => product.tags.includes(tag))) {
      return false;
    }

    return true;
  });

  const productsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

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
        
        <CategorySlider
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="flex flex-col lg:flex-row gap-6 mt-8">
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
