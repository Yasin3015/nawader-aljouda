import React from 'react';
import PriceFilter from './PriceFilter';
import RatingFilter from './RatingFilter';
import TagFilter from './TagFilter';

const FilterSidebar = ({ filters, onFilterChange, isOpen, onToggle }) => {
  const popularTags = [
    'Sale',
    'Discounts', 
    'High-sale',
    'Newest',
    'High-quality',
    'Low cost',
    'Emergencies',
    'Best-deal'
  ];

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={onToggle}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter
        </button>
      </div>

      {/* Filter Sidebar */}
      <div className={`
        ${isOpen ? 'block' : 'hidden'} lg:block
        w-full lg:w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-4
        ${isOpen ? 'absolute z-50 top-0 left-0 right-0 lg:relative lg:z-auto' : ''}
      `}>
        {/* Desktop Close Button */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            onClick={onToggle}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Filter Components */}
        <div className="space-y-6">
          <PriceFilter
            min={filters.priceRange.min}
            max={filters.priceRange.max}
            onChange={(priceRange) => onFilterChange('priceRange', priceRange)}
          />

          <RatingFilter
            selectedRatings={filters.ratings}
            onChange={(ratings) => onFilterChange('ratings', ratings)}
          />

          <TagFilter
            tags={popularTags}
            selectedTags={filters.tags}
            onChange={(tags) => onFilterChange('tags', tags)}
          />
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default FilterSidebar;
