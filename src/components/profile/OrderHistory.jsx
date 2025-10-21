import React, { useState } from 'react';
import Pagination from '../Browse/Pagination';

const OrderHistory = ({ title = "Order History", orders = [], ordersPerPage = 12, onViewDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const currentOrders = orders.slice(startIndex, startIndex + ordersPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>
      <div className="bg-white rounded-sm overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 ">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3">
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Order ID</span>
            </div>
            <div className="col-span-2">
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Date</span>
            </div>
            <div className="col-span-3">
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Total</span>
            </div>
            <div className="col-span-2">
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Status</span>
            </div>
            <div className="col-span-2">
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Action</span>
            </div>
          </div>
        </div>
        <div className="">
          {currentOrders.length > 0 ? (
            currentOrders.map((order) => (
              <div key={order.id} className="px-6 py-2.5 hover:bg-[var(--color-green-gray-1)] transition-colors">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-3">
                    <span className="text-sm font-medium text-gray-900">{order.id}</span>
                  </div>

                  <div className="col-span-2">
                    <span className="text-sm text-gray-900">{order.date}</span>
                  </div>

                  <div className="col-span-3">
                    <span className="text-sm text-gray-900">{order.total}</span>
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          order.statusColor ? `bg-${order.statusColor}-500` : 'bg-green-500'
                        }`}
                      ></div>
                      <span className="text-sm text-gray-900 capitalize">{order.status}</span>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <button
                      onClick={() => onViewDetails && onViewDetails(order)}
                      className="text-green-600 hover:text-green-700 underline font-medium transition-colors text-sm"
                    >
                      View Details
                    </button>
                  </div>
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

      {/* 📑 Pagination */}
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
