import React, { useState } from 'react';
import Pagination from '../Browse/Pagination';

const OrderHistory = ({ 
  title = "Order History", 
  orders = [], 
  ordersPerPage = 12, 
  onViewDetails,
  columns = [
    { key: 'id', label: 'Order ID', span: 2 },
    { key: 'date', label: 'Date', span: 2 },
    { key: 'total', label: 'Total', span: 3 },
    { key: 'status', label: 'Status', span: 3 },
    { key: 'action', label: 'Action', span: 2 }
  ]
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const currentOrders = orders.slice(startIndex, startIndex + ordersPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  // ✅ هنا خريطة الكلاسات الثابتة
  const spanClasses = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12',
  };

  const renderCellContent = (order, column) => {
    switch (column.key) {
      case 'status':
        return (
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                order.statusColor === 'green'
                  ? 'bg-green-500'
                  : order.statusColor === 'yellow'
                  ? 'bg-yellow-500'
                  : 'bg-gray-500'
              }`}
            ></div>
            <span className="text-sm text-gray-900 capitalize">{order.status}</span>
          </div>
        );
      case 'action':
        return (
          <button
            onClick={() => onViewDetails && onViewDetails(order)}
            className="text-green-600 hover:text-green-700 underline font-medium transition-colors text-sm whitespace-nowrap"
          >
            View Details
          </button>
        );
      default:
        return <span className="text-sm text-gray-900">{order[column.key]}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* العنوان */}
      {title && (
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>
      )}

      <div className="bg-white rounded-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <div style={{ minWidth: '700px' }}>
            {/* الـ Header */}
            <div className="bg-gray-50 px-6 py-3">
              <div className="grid grid-cols-12 gap-4">
                {columns.map((column) => (
                  <div key={column.key} className={spanClasses[column.span]}>
                    <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                      {column.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* الـ Body */}
            <div>
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <div 
                    key={order.id} 
                    className="px-6 py-2.5 hover:bg-[var(--color-green-gray-1)] transition-colors"
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {columns.map((column) => (
                        <div key={column.key} className={spanClasses[column.span]}>
                          {renderCellContent(order, column)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-8 text-center text-gray-500 text-sm">
                  No orders found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Scrollbar Style */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #c1c1c1 #f1f1f1;
        }
      `}</style>
    </div>
  );
};

export default OrderHistory;
