import React, { useState } from 'react';

const RatingFilter = ({ selectedRatings, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);

  const ratings = [
    { value: 5, label: '5 & up', stars: 5 },
    { value: 4, label: '4 & up', stars: 4 },
    { value: 3, label: '3 & up', stars: 3 },
    { value: 2, label: '2 & up', stars: 2 },
    { value: 1, label: '1 & up', stars: 1 }
  ];

  const handleRatingChange = (rating) => {
    const newRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter(r => r !== rating)
      : [...selectedRatings, rating];
    onChange(newRatings);
  };

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-3 h-3 ${index < count ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="border-b border-gray-200 pb-4">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-sm font-medium text-gray-900">Rating</h3>
        <svg 
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="mt-4 space-y-3">
          {ratings.map((rating) => (
            <label
              key={rating.value}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedRatings.includes(rating.value)}
                onChange={() => handleRatingChange(rating.value)}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <div className="flex items-center gap-2">
                <div className="flex">
                  {renderStars(rating.stars)}
                </div>
                <span className="text-sm text-gray-700">{rating.label}</span>
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default RatingFilter;
