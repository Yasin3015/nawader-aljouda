import React from 'react';
import PriceFilter from './PriceFilter';
import RatingFilter from './RatingFilter';
import TagFilter from './TagFilter';
import { useTranslation } from 'react-i18next';

const FilterSidebar = ({ filters, onFilterChange, isOpen, onToggle }) => {
  const popularTags = [
    'Sale',
    'Discounts',
    'High-sale',
    'Newest',
    'High-quality',
    'Low cost',
    'Emergencies',
    'Best-deal',
  ];
  const { t } = useTranslation();

  return (
    <>
      {/* زرار الفتح في الموبايل */}
      <div className="lg:hidden mb-4">
        <button
          onClick={onToggle}
          className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-2 rounded-sm hover:bg-[var(--color-hard-primary)] transition-colors"
        >
          {t('filter')}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar الفيلتر */}
      <div
        className={`
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          fixed lg:relative top-0 left-0 h-full lg:h-auto w-64 lg:w-64 bg-white z-50 p-4 shadow-lg lg:shadow-none 
          transition-transform duration-300 ease-in-out
        `}
      >
        {/* Header المودال في الموبايل */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{t('filters')}</h2>
          <button onClick={onToggle} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* محتوى الفيلتر */}
        <div className="space-y-6 overflow-y-auto lg:overflow-visible max-h-[calc(100vh-100px)] lg:max-h-none">
          <PriceFilter
            min={filters?.priceRange?.min ?? 0}
            max={filters?.priceRange?.max ?? 1000}
            onChange={(priceRange) => onFilterChange('priceRange', priceRange)}
          />
          <RatingFilter
            selectedRatings={filters?.ratings || []}
            onChange={(ratings) => onFilterChange('ratings', ratings)}
          />
          <TagFilter
            tags={popularTags}
            selectedTags={filters?.tags || []}
            onChange={(tags) => onFilterChange('tags', tags)}
          />
        </div>
      </div>

      {/* خلفية شفافة لما المودال مفتوح */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default FilterSidebar;