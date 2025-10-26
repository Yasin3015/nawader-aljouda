import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import CategoryCard from '../Browse/CategoryCard';
import AddCategoryModal from './AddCategoryModal';
import useDragScroll from '../../hooks/useDragScroll';

const DashboardCategorySlider = ({ categories, selectedCategory, onCategoryChange, onAddCategory }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    sliderRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  } = useDragScroll();

  const handleAddCategory = async (categoryData) => {
    try {
      await onAddCategory(categoryData);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <>
      <div className="relative select-none" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="flex gap-0">
          {/* Add Category Card - Fixed */}
          <div className="flex-shrink-0 w-22 h-22 my-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-22 h-22 flex flex-col items-center justify-center bg-white border-2 border-green-500 rounded-md hover:bg-green-50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Plus className="w-6 h-6 text-green-600" />
              </div>
            </button>
          </div>

          {/* Categories Slider */}
          <div
            ref={sliderRef}
            className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing flex-1"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            <div className="flex justify-start gap-4 pb-4 px-2 min-w-max">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  title={category.title}
                  image={category.image}
                  count={category.count}
                  active={selectedCategory === category.title}
                  onClick={() => onCategoryChange(category.title)}
                />
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCategory}
      />
    </>
  );
};

export default DashboardCategorySlider;