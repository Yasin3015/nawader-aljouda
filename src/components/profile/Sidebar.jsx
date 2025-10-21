import React from 'react';
import { 
  LayoutDashboard, 
  Clock, 
  Heart, 
  ShoppingBag, 
  Settings, 
  LogOut 
} from 'lucide-react';

const Sidebar = ({ activeTab = 'dashboard', onTabChange }) => {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'order-history', label: 'Order History', icon: Clock },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'shopping-cart', label: 'Shopping Cart', icon: ShoppingBag },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'logout', label: 'Log-out', icon: LogOut }
  ];

  const handleItemClick = (item) => {
    if (onTabChange) {
      onTabChange(item.id);
    }
  };

  return (
    <div className="rounded-sm border border-gray-200 sticky top-4 py-10">
      <h2 className="text-lg font-bold text-gray-900 mb-6 px-6">Navigation</h2>
      
      <nav className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                isActive
                  ? 'bg-green-50 border-l-3 border-[var(--color-primary)] text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-gray-900' : 'text-gray-500'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
