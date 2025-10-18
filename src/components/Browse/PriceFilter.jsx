import React, { useState } from 'react';

const PriceFilter = ({ min, max, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [localMin, setLocalMin] = useState(min);
  const [localMax, setLocalMax] = useState(max);

  const handleMinChange = (e) => {
    const value = parseInt(e.target.value);
    setLocalMin(value);
    onChange({ min: value, max: localMax });
  };

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value);
    setLocalMax(value);
    onChange({ min: localMin, max: value });
  };

  return (
    <div className="border-b border-gray-200 pb-4">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-sm font-medium text-gray-900">Price</h3>
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
        <div className="mt-4">
          {/* Range Slider */}
          <div className="relative">
            <input
              type="range"
              min="0"
              max="1000"
              value={localMin}
              onChange={handleMinChange}
              className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #10b981 0%, #10b981 ${(localMin / 1000) * 100}%, #e5e7eb ${(localMin / 1000) * 100}%, #e5e7eb 100%)`
              }}
            />
            <input
              type="range"
              min="0"
              max="1000"
              value={localMax}
              onChange={handleMaxChange}
              className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #e5e7eb 0%, #e5e7eb ${(localMax / 1000) * 100}%, #10b981 ${(localMax / 1000) * 100}%, #10b981 100%)`
              }}
            />
          </div>

          {/* Price Display */}
          <div className="mt-3 text-center">
            <span className="text-sm text-gray-600">
              ${localMin} - ${localMax}
            </span>
          </div>

          {/* Manual Input */}
          <div className="mt-3 flex gap-2">
            <input
              type="number"
              min="0"
              max="1000"
              value={localMin}
              onChange={handleMinChange}
              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Min"
            />
            <input
              type="number"
              min="0"
              max="1000"
              value={localMax}
              onChange={handleMaxChange}
              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Max"
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default PriceFilter;
