// src/components/Dashboard/SearchBar.jsx
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SearchComponent from '../UI/SearchComponent'

const SearchBar = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t animate-slideDown">
      <div className="max-w-3xl mx-auto p-4">
        <SearchComponent />
      </div>
    </div>
  );
};

export default SearchBar;
