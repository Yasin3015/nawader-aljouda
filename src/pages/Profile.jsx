import React, { useState } from 'react';
import Sidebar from '../components/profile/Sidebar';
import ProfileInfo from '../components/profile/ProfileInfo';
import BillingAddress from '../components/profile/BillingAddress';
import RecentOrders from '../components/profile/RecentOrders';
import OrderHistory from '../components/profile/OrderHistory';
import WishlistTable from '../components/WishList/WishlistTable';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample user data
  const userData = {
    name: 'Dianne Russell',
    role: 'Customer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  };

  // Sample address data
  

  // Sample orders data
  const ordersData = [
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

  // Event handlers
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    console.log('Tab changed to:', tabId);
  };

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
    // Handle edit profile logic
  };

  

  const handleViewAllOrders = () => {
    console.log('View all orders clicked');
    // Handle view all orders logic
  };

  const handleViewOrderDetails = (order) => {
    console.log('View order details:', order);
    // Handle view order details logic
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <ProfileInfo 
              user={userData}
              onEditProfile={handleEditProfile}
            />
            <RecentOrders 
              orders={ordersData}
              onViewAll={handleViewAllOrders}
              onViewDetails={handleViewOrderDetails}
            />
          </div>
        );
      case 'order-history':
        return <OrderHistory />;
      case 'wishlist':
        return (
          <WishlistTable />
        );
      case 'shopping-cart':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Shopping Cart</h2>
            <p className="text-gray-500">Your cart is empty.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-500">Settings page coming soon.</p>
          </div>
        );
      case 'logout':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Logout</h2>
            <p className="text-gray-500">Are you sure you want to logout?</p>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <ProfileInfo 
              user={userData}
              onEditProfile={handleEditProfile}
            />
            <RecentOrders 
              orders={ordersData}
              onViewAll={handleViewAllOrders}
              onViewDetails={handleViewOrderDetails}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Sidebar */}
          <div className="lg:col-span-3">
            <Sidebar 
              activeTab={activeTab} 
              onTabChange={handleTabChange}
            />
          </div>

          {/* Middle Column - Dynamic Content */}
          <div className="lg:col-span-9">
            {renderContent()}
          </div>

          {/* Right Column - Billing Address (only show on dashboard) */}
          {/* {activeTab === 'dashboard' && (
            
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
