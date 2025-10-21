import React, { useState } from 'react';
import Sidebar from '../components/profile/Sidebar';
import ProfileInfo from '../components/profile/ProfileInfo';
import BillingAddress from '../components/profile/BillingAddress';
import RecentOrders from '../components/profile/RecentOrders';
import OrderHistory from '../components/profile/OrderHistory';
import OrderDetails from '../components/OrderDetails/OrderDetails';
import SettingsSidebar from '../components/Settings/SettingsSidebar';
import AccountSettings from '../components/Settings/AccountSettings';
import BillingAddressSettings from '../components/Settings/BillingAddressSettings';
import ChangePassword from '../components/Settings/ChangePassword';
import WishlistTable from '../components/WishList/WishlistTable';
import WishlistItem from '../components/WishList/WishlistItem';
import { useWishlist } from '../contexts/WishlistContext';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { allOrders } from '../FakeData/AllOrders';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { items: wishlistItems, totalItems: wishlistTotalItems, clearWishlist } = useWishlist();
  const { t } = useTranslation();
  const navigate = useNavigate()

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

  // Sample detailed order data for OrderDetails component
  const sampleOrderDetails = {
    id: '#4152',
    date: '8 سبتمبر 2020',
    payment: 'Paypal',
    total: 365.00,
    discount: '20%',
    shipping: 'مجاني',
    grandTotal: 84.00,
    statusStep: 2,
    customer: {
      name: 'Dainne Russell',
      address: '4140 Parker Rd. Allentown, New Mexico 31134',
      email: 'dainne.ressell@gmail.com',
      phone: '(671) 555-0110'
    },
    items: [
      {
        name: 'اسم المنتج',
        price: 14.00,
        quantity: 5
      },
      {
        name: 'اسم المنتج',
        price: 25.00,
        quantity: 2
      },
      {
        name: 'اسم المنتج',
        price: 18.50,
        quantity: 3
      }
    ]
  };

  // Event handlers
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    console.log('Tab changed to:', tabId);
  };

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
    // Handle edit profile logic
  };


  const handleViewOrderDetails = (order) => {
    setSelectedOrder(sampleOrderDetails);
    setActiveTab('order-details');
  };

  const handleBackToOrders = () => {
    setSelectedOrder(null);
    setActiveTab('order-history');
  };

  const handleViewAllOrders = (order) => {
    setActiveTab('order-history');
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
        return (
          <OrderHistory
            title="My Recent Orders"
            orders={allOrders}
            ordersPerPage={10}
            onViewDetails={handleViewOrderDetails}
          />
        );
      case 'order-details':
        return selectedOrder ? (
          <OrderDetails 
            orderData={selectedOrder}
            onBack={handleBackToOrders}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-gray-500">No order selected</p>
          </div>
        );
      case 'wishlist':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {t('wishlist.title')}
                </h2>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    {wishlistTotalItems} {t('wishlist.totalItems')}
                  </span>
                  {wishlistTotalItems > 0 && (
                    <button
                      onClick={clearWishlist}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      {t('wishlist.clearWishlist')}
                    </button>
                  )}
                </div>
              </div>

              {wishlistItems.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {t('wishlist.empty')}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Add items to your wishlist by clicking the heart icon on any product.
                  </p>
                  <button
                    onClick={() => navigate('/browse')}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlistItems.map((item) => (
                    <WishlistItem key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case 'shopping-cart':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Shopping Cart</h2>
            <p className="text-gray-500">Your cart items will appear here.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <AccountSettings />
            <BillingAddressSettings />
            <ChangePassword />
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
