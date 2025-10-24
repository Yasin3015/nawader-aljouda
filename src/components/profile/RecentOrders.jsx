import React from 'react';
import OrderHistory from './OrderHistory';

const RecentOrders = ({ 
  title = "Recent Order History",
  orders = [],
  onViewAll,
  onViewDetails,
  columns = [
    { key: 'id', label: 'Order ID', span: 3 },
    { key: 'date', label: 'Date', span: 2 },
    { key: 'total', label: 'Total', span: 3 },
    { key: 'status', label: 'Status', span: 2 },
    { key: 'action', label: 'Action', span: 2 }
  ],
  defaultOrders = [
    { id: '#738', date: '8 Sep, 2020', total: '$135.00 (5 Products)', status: 'Processing', statusColor: 'gray' },
    { id: '#739', date: '10 Sep, 2020', total: '$89.50 (3 Products)', status: 'On the way', statusColor: 'yellow' },
    { id: '#740', date: '12 Sep, 2020', total: '$245.00 (8 Products)', status: 'Completed', statusColor: 'green' },
    { id: '#741', date: '15 Sep, 2020', total: '$67.25 (2 Products)', status: 'Processing', statusColor: 'gray' },
    { id: '#742', date: '18 Sep, 2020', total: '$156.80 (4 Products)', status: 'On the way', statusColor: 'yellow' },
    { id: '#743', date: '20 Sep, 2020', total: '$98.40 (3 Products)', status: 'Completed', statusColor: 'green' }
  ]
}) => {
  const ordersData = orders.length > 0 ? orders : defaultOrders;

  return (
    <div className="bg-white rounded-sm border border-gray-200 p-3">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">
          {title}
        </h3>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            View All
          </button>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <OrderHistory
          title={null}
          orders={ordersData}
          ordersPerPage={ordersData.length}
          onViewDetails={onViewDetails}
          columns={columns}
        />
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {ordersData.map((order) => (
          <div
            key={order.id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-gray-800">{order.id}</h4>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  order.statusColor === 'green'
                    ? 'bg-green-100 text-green-700'
                    : order.statusColor === 'yellow'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Date: </span>{order.date}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Total: </span>{order.total}
            </p>
            <button
              onClick={() => onViewDetails?.(order)}
              className="text-green-600 text-sm font-medium hover:underline"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
