import React from 'react';
import { X } from 'lucide-react';

const RemoveButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="p-1 hover:bg-gray-100 rounded transition-colors"
    aria-label="حذف من المفضلة"
  >
    <X className="w-5 h-5 text-gray-600" />
  </button>
);

export default RemoveButton;