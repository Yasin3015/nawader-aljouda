import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar } from 'lucide-react';
import Button from '../UI/Button';
import FormInput from '../auth/FormInput';

const OrdersFilter = ({ isOpen, onClose, onApply, initialFilters, anchorRef }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const dropdownRef = useRef(null);

  const [filters, setFilters] = useState({
    startDate: initialFilters?.startDate || '',
    endDate: initialFilters?.endDate || '',
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        anchorRef?.current &&
        !anchorRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, anchorRef]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({ startDate: '', endDate: '' });
    onApply({ startDate: '', endDate: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className={`absolute z-50 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 w-80 ${
        isRTL ? 'left-0' : 'right-0'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-green-600" />
          {t('orders.filterByDate')}
        </h3>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Start Date */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            {t('orders.startDate')}
          </label>
          <FormInput
            name="startDate"
            type="date"
            value={filters.startDate}
            onChange={handleChange}
            className="text-sm"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            {t('orders.endDate')}
          </label>
          <FormInput
            name="endDate"
            type="date"
            value={filters.endDate}
            onChange={handleChange}
            className="text-sm"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 p-4 border-t border-gray-200">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          fullWidth
          onClick={handleReset}
        >
          {t('common.reset')}
        </Button>
        <Button
          type="button"
          variant="primary"
          size="sm"
          fullWidth
          onClick={handleApply}
        >
          {t('common.apply')}
        </Button>
      </div>
    </div>
  );
};

export default OrdersFilter;