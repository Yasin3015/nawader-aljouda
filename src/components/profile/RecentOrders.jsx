import React from 'react';

const RecentOrders = ({ orders, onViewAll, onViewDetails }) => {
  const defaultOrders = [
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
  ];

  const ordersData = orders || defaultOrders;

  const getStatusDotColor = (statusColor) => {
    switch (statusColor) {
      case 'green':
        return 'bg-green-500';
      case 'yellow':
        return 'bg-yellow-500';
      case 'gray':
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">
          Recent Order History
        </h3>
        <button
          onClick={onViewAll}
          className="text-green-600 hover:text-green-700 font-medium transition-colors"
        >
          View All
        </button>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Order ID
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Date
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Total
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Status
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {ordersData.map((order, index) => (
              <tr 
                key={order.id} 
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-4 text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="py-4 px-4 text-sm text-gray-900">
                  {order.date}
                </td>
                <td className="py-4 px-4 text-sm text-gray-900">
                  {order.total}
                </td>
                <td className="py-4 px-4 text-sm text-gray-900">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusDotColor(order.statusColor)}`}></div>
                    <span>{order.status}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm">
                  <button
                    onClick={() => onViewDetails && onViewDetails(order)}
                    className="text-green-600 hover:text-green-700 underline font-medium transition-colors"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
