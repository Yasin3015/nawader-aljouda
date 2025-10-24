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
    {
      id: '#738',
      date: '8 Sep, 2020',
      total: '$135.00 (5 Products)',
      status: 'Processing',
      statusColor: 'gray'
    },
    {
      id: '#739',
      date: '10 Sep, 2020',
      total: '$89.50 (3 Products)',
      status: 'on the way',
      statusColor: 'yellow'
    },
    {
      id: '#740',
      date: '12 Sep, 2020',
      total: '$245.00 (8 Products)',
      status: 'Completed',
      statusColor: 'green'
    },
    {
      id: '#741',
      date: '15 Sep, 2020',
      total: '$67.25 (2 Products)',
      status: 'Processing',
      statusColor: 'gray'
    },
    {
      id: '#742',
      date: '18 Sep, 2020',
      total: '$156.80 (4 Products)',
      status: 'on the way',
      statusColor: 'yellow'
    },
    {
      id: '#743',
      date: '20 Sep, 2020',
      total: '$98.40 (3 Products)',
      status: 'Completed',
      statusColor: 'green'
    }
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

      {/* استخدام OrderHistory Component */}
      <OrderHistory
        title={null} // مش محتاجين التايتل لأننا عاملينه فوق
        orders={ordersData}
        ordersPerPage={ordersData.length} // عرض كل الأوردرات بدون pagination
        onViewDetails={onViewDetails}
        columns={columns}
      />
    </div>
  );
};

export default RecentOrders;