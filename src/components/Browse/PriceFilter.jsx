import React, { useState } from "react";

const PriceFilter = ({ min = 0, max = 1000, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [localMin, setLocalMin] = useState(min);
  const [localMax, setLocalMax] = useState(max);

  const handleMinChange = (e) => {
    const value = Math.min(parseInt(e.target.value), localMax - 10);
    setLocalMin(value);
    onChange?.({ min: value, max: localMax });
  };

  const handleMaxChange = (e) => {
    const value = Math.max(parseInt(e.target.value), localMin + 10);
    setLocalMax(value);
    onChange?.({ min: localMin, max: value });
  };

  return (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-sm font-medium text-gray-900">Price</h3>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-4">
          {/* Range Slider Wrapper */}
          <div className="relative w-full h-2 mt-3 rounded-lg bg-gray-200">
            {/* Progress bar */}
            <div
              className="absolute h-2 bg-green-500 rounded-lg"
              style={{
                left: `${(localMin / 1000) * 100}%`,
                width: `${((localMax - localMin) / 1000) * 100}%`,
              }}
            ></div>

            {/* Min Thumb */}
            <input
              type="range"
              min="0"
              max="1000"
              value={localMin}
              onChange={handleMinChange}
              className="absolute w-full appearance-none bg-transparent cursor-pointer slider-thumb"
            />

            {/* Max Thumb */}
            <input
              type="range"
              min="0"
              max="1000"
              value={localMax}
              onChange={handleMaxChange}
              className="absolute w-full appearance-none bg-transparent cursor-pointer slider-thumb"
            />
          </div>

          {/* Price Display */}
          <div className="mt-3 text-center">
            <span className="text-sm text-gray-600">
              ${localMin} - ${localMax}
            </span>
          </div>

          {/* Manual Input */}
          {/* <div className="mt-3 flex gap-2">
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
          </div> */}
        </div>
      )}

      {/* Custom thumb styling */}
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #10b981;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          position: relative;
          z-index: 3;
          transform: translateY(-5px); /* ✅ This centers the thumb vertically */
        }

        .slider-thumb::-moz-range-thumb {
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #10b981;
          border: 2px solid white;
          cursor: pointer;
          position: relative;
          z-index: 3;
          transform: translateY(-3px); /* ✅ same fix for Firefox */
        }
      `}</style>
    </div>
  );
};

export default PriceFilter;