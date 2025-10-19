import React from "react";
import CategoryCard from "./CategoryCard";
import useDragScroll from '../../hooks/useDragScroll';

const CategorySlider = ({ categories, selectedCategory, onCategoryChange }) => {
  const {
    sliderRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  } = useDragScroll();

  return (
    <div className="relative select-none">
      <div
        ref={sliderRef}
        className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="flex justify-start gap-4 pb-4 px-4 min-w-max">
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
  );
};

export default CategorySlider;
