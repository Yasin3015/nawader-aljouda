import React, { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ProductCard } from './ProductCard';
import SearchComponent from '../UI/SearchComponent';
import SortDropdown from '../Browse/SortDropdown';
import Pagination from '../Browse/Pagination';
import DashboardCategorySlider from './DashboardCategorySlider';
import Button from '../UI/Button';
import { Plus } from 'lucide-react';
import { dashboardProducts } from '../../FakeData/DashboardProducts';

const PRODUCTS_PER_PAGE = 9;

// Sample categories - replace with your actual categories data
const sampleCategories = [
  { id: '1', title: 'All', image: null, count: 25 },
  { id: '2', title: 'Plastic', image: null, count: 8 },
  { id: '3', title: 'Metal', image: null, count: 6 },
  { id: '4', title: 'Wood', image: null, count: 3 },
  { id: '5', title: 'Glass', image: null, count: 2 },
  { id: '6', title: 'Electronic', image: null, count: 3 },
  { id: '7', title: 'Fabric', image: null, count: 2 },
];

export const ProductsList = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [selectedSort, setSelectedSort] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(sampleCategories);

  // Filter products based on search query and category
  const filteredProducts = useMemo(() => {
    let filtered = dashboardProducts;

    // Filter by category
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    
    switch (selectedSort) {
      case 'priceLowHigh':
        return sorted.sort((a, b) => a.price - b.price);
      case 'priceHighLow':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.sales - a.sales);
      case 'nameAZ':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'latest':
      default:
        return sorted;
    }
  }, [filteredProducts, selectedSort]);

  // Calculate total pages dynamically
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);

  // Get current page products
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage]);

  // Reset to page 1 when filters change
  const handleSortChange = useCallback((sortId) => {
    setSelectedSort(sortId);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAddProduct = useCallback(() => {
    console.log('Add product clicked');
  }, []);

  const handleAddToBestSeller = useCallback((id) => {
    console.log('Add to best seller:', id);
  }, []);

  const handleEditProduct = useCallback((id) => {
    console.log('Edit product:', id);
  }, []);

  const handleDeleteProduct = useCallback((id) => {
    console.log('Delete product:', id);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, []);

  const handleAddCategory = useCallback(async (categoryData) => {
    // Add new category to the list
    const newCategory = {
      id: `cat-${Date.now()}`,
      title: categoryData.name,
      image: categoryData.image,
      count: 0,
    };
    
    setCategories(prev => [...prev, newCategory]);
    console.log('New category added:', newCategory);
  }, []);

  return (
    <div className={`min-h-screen bg-gray-50 p-6 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        {/* Category Slider */}
        <div className="mb-6">
          <DashboardCategorySlider
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            onAddCategory={handleAddCategory}
          />
        </div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1 w-full">
            {/* Sort Dropdown */}
            <SortDropdown 
              selectedSort={selectedSort} 
              onSortChange={handleSortChange}
            />

            {/* Search Component */}
            <SearchComponent onSearchChange={handleSearchChange} />
          </div>

          {/* Add Product Button */}
          <Button 
            variant="primary" 
            onClick={handleAddProduct}
            className="whitespace-nowrap flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            {t('products.addProduct')}
          </Button>
        </div>

        {/* Products Count */}
        {searchQuery && (
          <div className="mb-4 text-sm text-gray-600">
            {t('products.showing')} {sortedProducts.length} {t('products.results')}
          </div>
        )}

        {/* Products Grid */}
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToBestSeller={handleAddToBestSeller}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-gray-500 text-lg mb-2">{t('products.noProducts')}</p>
            <p className="text-gray-400 text-sm">{t('products.tryDifferentSearch')}</p>
          </div>
        )}

        {/* Pagination - Only show if there are products and multiple pages */}
        {currentProducts.length > 0 && totalPages > 1 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};