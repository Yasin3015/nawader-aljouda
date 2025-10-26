import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MoreVertical, Trash2 } from 'lucide-react';

const BulkActionsMenu = ({ selectedCount, onDeleteSelected, onDeleteAll }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (action) => {
    setIsOpen(false);
    if (action === 'deleteSelected') {
      onDeleteSelected();
    } else if (action === 'deleteAll') {
      onDeleteAll();
    }
  };

  if (selectedCount < 0) return null;

  return (
    <div className="relative top-2" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 bg-gray-200 rounded-lg transition-colors"
      >
        <MoreVertical className="w-5 h-5 text-gray-600" />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 min-w-[200px]
            ${isRTL ? 'left-0' : 'right-0'}`}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <button
            onClick={() => handleAction('deleteSelected')}
            className={`w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors
              ${isRTL ? 'flex-row-reverse text-right' : ''}`}
          >
            <Trash2 className="w-4 h-4" />
            {t('orders.deleteSelected')} ({selectedCount})
          </button>
          <button
            onClick={() => handleAction('deleteAll')}
            className={`w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors
              ${isRTL ? 'flex-row-reverse text-right' : ''}`}
          >
            <Trash2 className="w-4 h-4" />
            {t('orders.deleteAll')}
          </button>
        </div>
      )}
    </div>
  );
};

export default BulkActionsMenu;