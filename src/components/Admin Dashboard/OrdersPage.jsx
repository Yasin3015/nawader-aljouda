import React, { useState, useMemo, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Filter } from 'lucide-react';
import StatusTabs from './StatusTabs';
import SearchComponent from '../UI/SearchComponent';
import SortDropdown from '../Browse/SortDropdown';
import OrdersFilter from './OrdersFilter';
import BulkActionsMenu from './BulkActionsMenu';
import OrdersTable from './OrdersTable';
import Pagination from '../Browse/Pagination';
import Button from '../UI/Button';
import { ordersData } from '../../FakeData/dashboardOrders';

const ORDERS_PER_PAGE = 10;

const OrdersPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [activeTab, setActiveTab] = useState('all');
  const [selectedSort, setSelectedSort] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [dateFilters, setDateFilters] = useState({ startDate: '', endDate: '' });
  const filterButtonRef = useRef(null);

  // Filter orders by tab, search, and date
  const filteredOrders = useMemo(() => {
    let filtered = ordersData;

    // Filter by tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(order => 
        order.status.toLowerCase() === activeTab.toLowerCase().replace('ontheway', 'on the way')
      );
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(order => 
        order.orderId.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.payment.toLowerCase().includes(query) ||
        order.status.toLowerCase().includes(query)
      );
    }

    // Filter by date range
    if (dateFilters.startDate || dateFilters.endDate) {
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.date);
        const start = dateFilters.startDate ? new Date(dateFilters.startDate) : null;
        const end = dateFilters.endDate ? new Date(dateFilters.endDate) : null;

        if (start && end) {
          return orderDate >= start && orderDate <= end;
        } else if (start) {
          return orderDate >= start;
        } else if (end) {
          return orderDate <= end;
        }
        return true;
      });
    }

    return filtered;
  }, [activeTab, searchQuery, dateFilters]);

  // Sort orders
  const sortedOrders = useMemo(() => {
    const sorted = [...filteredOrders];
    
    switch (selectedSort) {
      case 'priceLowHigh':
        return sorted.sort((a, b) => parseFloat(a.total) - parseFloat(b.total));
      case 'priceHighLow':
        return sorted.sort((a, b) => parseFloat(b.total) - parseFloat(a.total));
      case 'nameAZ':
        return sorted.sort((a, b) => a.customerName.localeCompare(b.customerName));
      case 'latest':
      default:
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  }, [filteredOrders, selectedSort]);

  // Calculate tab counts
  const tabCounts = useMemo(() => {
    return {
      all: ordersData.length,
      completed: ordersData.filter(o => o.status === 'Completed').length,
      onTheWay: ordersData.filter(o => o.status === 'On the Way').length,
      processing: ordersData.filter(o => o.status === 'Processing').length,
      canceled: ordersData.filter(o => o.status === 'Canceled').length,
    };
  }, []);

  // Pagination
  const totalPages = Math.ceil(sortedOrders.length / ORDERS_PER_PAGE);
  const currentOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
    const endIndex = startIndex + ORDERS_PER_PAGE;
    return sortedOrders.slice(startIndex, endIndex);
  }, [sortedOrders, currentPage]);

  // Handlers
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSelectedOrders([]);
  }, []);

  const handleSortChange = useCallback((sortId) => {
    setSelectedSort(sortId);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectOrder = useCallback((orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedOrders.length === currentOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(currentOrders.map(order => order.id));
    }
  }, [selectedOrders, currentOrders]);

  const handleDeleteSelected = useCallback(() => {
    if (window.confirm(t('orders.confirmDeleteSelected', { count: selectedOrders.length }))) {
      console.log('Delete selected orders:', selectedOrders);
      setSelectedOrders([]);
    }
  }, [selectedOrders, t]);

  const handleDeleteAll = useCallback(() => {
    if (window.confirm(t('orders.confirmDeleteAll'))) {
      console.log('Delete all orders');
      setSelectedOrders([]);
    }
  }, [t]);

  const handleApplyFilters = useCallback((filters) => {
    setDateFilters(filters);
    setCurrentPage(1);
  }, []);

  const handleViewDetails = useCallback((orderId) => {
    console.log('View order details:', orderId);
    // Navigate to order details page
  }, []);

  return (
    <div className={`min-h-screen bg-gray-50${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{t('orders.title')}</h1>
          <p className="text-sm text-gray-500 mt-1">{t('orders.description')}</p>
        </div>
        <div className="my-3">
        </div>
        <div className="bg-white my-3">
          <div className="relative p-6 rounded-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex flex-col relative sm:flex-row items-start sm:items-center gap-4 flex-1 w-full">
              <div className="w-fit flex gap-2 items-center">
                <SortDropdown 
                selectedSort={selectedSort} 
                onSortChange={handleSortChange}
              />
              <div className="">
                <Button
                  ref={filterButtonRef}
                  variant="outline"
                  onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                  className="flex items-center !p-1.5 px-4 gap-2 outline-0 rounded-sm border border-gray-300"
                >
                  <Filter className="w-4 h-4" />
                  {t('orders.filter')}
                  {(dateFilters.startDate || dateFilters.endDate) && (
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  )}
                </Button>

                {/* Filter Dropdown */}
                <OrdersFilter
                  isOpen={isFilterDropdownOpen}
                  onClose={() => setIsFilterDropdownOpen(false)}
                  onApply={handleApplyFilters}
                  initialFilters={dateFilters}
                  anchorRef={filterButtonRef}
                />
              </div>
              </div>
              <SearchComponent onSearchChange={handleSearchChange} />

              {/* Filter Button */}
              
            </div>

            {/* Bulk Actions Menu */}
            <StatusTabs
            activeTab={activeTab}
            onTabChange={handleTabChange}
            counts={tabCounts}
          />
            <div className={`absolute top-0 ${!isRTL?'!-right-2':'!-left-2'}`}>
                <BulkActionsMenu
              selectedCount={selectedOrders.length}
              onDeleteSelected={handleDeleteSelected}
              onDeleteAll={handleDeleteAll}
            />
            </div>
          </div>
        </div>

        {/* Selected Items Counter */}
        {selectedOrders.length > 0 && (
          <div className="mb-4 text-sm text-gray-600">
            {t('orders.selectedItems', { count: selectedOrders.length })}
          </div>
        )}

        {/* Orders Table */}
        {currentOrders.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <OrdersTable
              orders={currentOrders}
              selectedOrders={selectedOrders}
              onSelectOrder={handleSelectOrder}
              onSelectAll={handleSelectAll}
              onViewDetails={handleViewDetails}
            />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-16 text-center">
            <p className="text-gray-500 text-lg mb-2">{t('orders.noOrders')}</p>
            <p className="text-gray-400 text-sm">{t('orders.tryDifferentFilter')}</p>
          </div>
        )}

        {/* Pagination */}
        {currentOrders.length > 0 && totalPages > 1 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default OrdersPage;