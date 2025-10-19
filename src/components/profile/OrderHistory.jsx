import React, { useState } from 'react';
import Pagination from '../Browse/Pagination';

const OrderHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 12;

  // Sample order data matching the design
  const allOrders = [
    {
      id: '#3933',
      date: '4 April, 2021',
      total: '$135.00 (5 Products)',
      status: 'Processing',
      statusColor: 'green'
    },
    {
      id: '#5045',
      date: '27 Mar, 2021',
      total: '$25.00 (1 Product)',
      status: 'on the way',
      statusColor: 'green'
    },
    {
      id: '#5046',
      date: '25 Mar, 2021',
      total: '$89.50 (3 Products)',
      status: 'Completed',
      statusColor: 'green'
    },
    {
      id: '#5047',
      date: '22 Mar, 2021',
      total: '$245.00 (8 Products)',
      status: 'Processing',
      statusColor: 'green'
    },
    {
      id: '#5048',
      date: '20 Mar, 2021',
      total: '$67.25 (2 Products)',
      status: 'on the way',
      statusColor: 'green'
    },
    {
      id: '#5049',
      date: '18 Mar, 2021',
      total: '$156.80 (4 Products)',
      status: 'Completed',
      statusColor: 'green'
    },
    {
      id: '#5050',
      date: '15 Mar, 2021',
      total: '$98.40 (3 Products)',
      status: 'Processing',
      statusColor: 'green'
    },
    {
      id: '#5051',
      date: '12 Mar, 2021',
      total: '$178.90 (6 Products)',
      status: 'on the way',
      statusColor: 'green'
    },
    {
      id: '#5052',
      date: '10 Mar, 2021',
      total: '$45.60 (2 Products)',
      status: 'Completed',
      statusColor: 'green'
    },
    {
      id: '#5053',
      date: '8 Mar, 2021',
      total: '$123.75 (4 Products)',
      status: 'Processing',
      statusColor: 'green'
    },
    {
      id: '#5054',
      date: '5 Mar, 2021',
      total: '$89.30 (3 Products)',
      status: 'on the way',
      statusColor: 'green'
    },
    {
      id: '#5055',
      date: '2 Mar, 2021',
      total: '$67.45 (2 Products)',
      status: 'Completed',
      statusColor: 'green'
    },
    {
      id: '#5056',
      date: '28 Feb, 2021',
      total: '$234.80 (7 Products)',
      status: 'Processing',
      statusColor: 'green'
    },
    {
      id: '#5057',
      date: '25 Feb, 2021',
      total: '$156.20 (5 Products)',
      status: 'on the way',
      statusColor: 'green'
    },
    {
      id: '#5058',
      date: '22 Feb, 2021',
      total: '$78.90 (3 Products)',
      status: 'Completed',
      statusColor: 'green'
    },
    {
      id: '#5059',
      date: '20 Feb, 2021',
      total: '$198.50 (6 Products)',
      status: 'Processing',
      statusColor: 'green'
    },
    {
      id: '#5060',
      date: '18 Feb, 2021',
      total: '$112.30 (4 Products)',
      status: 'on the way',
      statusColor: 'green'
    },
    {
      id: '#5061',
      date: '15 Feb, 2021',
      total: '$89.75 (3 Products)',
      status: 'Completed',
      statusColor: 'green'
    },
    {
      id: '#5062',
      date: '12 Feb, 2021',
      total: '$145.60 (5 Products)',
      status: 'Processing',
      statusColor: 'green'
    },
    {
      id: '#5063',
      date: '10 Feb, 2021',
      total: '$67.80 (2 Products)',
      status: 'on the way',
      statusColor: 'green'
    }
  ];

  // Calculate pagination
  const totalPages = Math.ceil(allOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const currentOrders = allOrders.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (order) => {
    console.log('Viewing order details:', order);
    // Handle view order details logic
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Order History
        </h1>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3">
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Order ID
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Date
              </span>
            </div>
            <div className="col-span-3">
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Total
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Status
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Action
              </span>
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {currentOrders.map((order, index) => (
            <div key={order.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Order ID */}
                <div className="col-span-3">
                  <span className="text-sm font-medium text-gray-900">
                    {order.id}
                  </span>
                </div>

                {/* Date */}
                <div className="col-span-2">
                  <span className="text-sm text-gray-900">
                    {order.date}
                  </span>
                </div>

                {/* Total */}
                <div className="col-span-3">
                  <span className="text-sm text-gray-900">
                    {order.total}
                  </span>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-900">
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Action */}
                <div className="col-span-2">
                  <button
                    onClick={() => handleViewDetails(order)}
                    className="text-green-600 hover:text-green-700 underline font-medium transition-colors text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
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
    </div>
  );
};

export default OrderHistory;
