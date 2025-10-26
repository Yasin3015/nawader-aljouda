import React, { useState } from "react";

const TagInput = ({ name, value = [], onChange, placeholder, error }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !value.includes(newTag)) {
        onChange({ target: { name, value: [...value, newTag] } });
      }
      setInputValue("");
    }
  };

  const handleRemove = (tagToRemove) => {
    onChange({
      target: { name, value: value.filter((tag) => tag !== tagToRemove) },
    });
  };

  return (
    <div className="border border-gray-300 rounded-md p-2 flex flex-wrap gap-2 min-h-[42px]">
      {value.map((tag, index) => (
        <div
          key={index}
          className="flex items-center bg-green-300 text-white text-sm px-2 py-1 rounded-md"
        >
          {tag}
          <button
            type="button"
            onClick={() => handleRemove(tag)}
            className="ml-1 text-white hover:text-gray-100"
          >
            ×
          </button>
        </div>
      ))}
      <input
        type="text"
        className="flex-grow outline-none text-sm p-1 min-w-[100px]"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {error && <p className="text-red-500 text-xs mt-1 w-full">{error}</p>}
    </div>
  );
};

export default TagInput;
