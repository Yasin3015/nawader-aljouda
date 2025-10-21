import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Package, 
  Heart, 
  ShoppingBag, 
  Settings, 
  LogOut 
} from 'lucide-react';

const SettingsSidebar = ({ activeTab, onTabChange }) => {
  const { t } = useTranslation();

  const navigationItems = [
    {
      id: 'dashboard',
      label: t('settings.sidebar.dashboard'),
      icon: LayoutDashboard
    },
    {
      id: 'order-history',
      label: t('settings.sidebar.orderHistory'),
      icon: Package
    },
    {
      id: 'wishlist',
      label: t('settings.sidebar.wishlist'),
      icon: Heart
    },
    {
      id: 'shopping-cart',
      label: t('settings.sidebar.shoppingCart'),
      icon: ShoppingBag
    },
    {
      id: 'settings',
      label: t('settings.sidebar.settings'),
      icon: Settings
    },
    {
      id: 'logout',
      label: t('settings.sidebar.logout'),
      icon: LogOut
    }
  ];

  const handleItemClick = (itemId) => {
    onTabChange(itemId);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        {t('settings.sidebar.mainMenu')}
      </h3>
      
      <nav className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-all duration-200 ${
                isActive
                  ? 'bg-green-50 text-green-700 border-l-4 border-green-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {isActive && (
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              )}
              <Icon className={`w-5 h-5 ${isActive ? 'text-green-600' : 'text-gray-500'}`} />
              <span className="flex-1 text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default SettingsSidebar;

