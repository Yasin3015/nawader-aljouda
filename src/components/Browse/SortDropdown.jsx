import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const sortOptions = [
  { id: "latest", label: "Latest" },
  { id: "priceLowHigh", label: "Price: Low to High" },
  { id: "priceHighLow", label: "Price: High to Low" },
  { id: "rating", label: "Rating" },
  { id: "nameAZ", label: "Name A-Z" },
];

const SortDropdown = ({ selectedSort, onSortChange }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    onSortChange(option.id);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-sm text-sm hover:bg-gray-50 focus:outline-none"
      >
        Sort by:{" "}
        <span className="font-medium text-gray-800">
          {sortOptions.find((opt) => opt.id === selectedSort)?.label || "Latest"}
        </span>
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-sm shadow-lg">
          {sortOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                option.id === selectedSort ? "bg-gray-50 font-semibold" : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(SortDropdown);
