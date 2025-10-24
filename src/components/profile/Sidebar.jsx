import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Clock, 
  Settings,  
  Trash
} from 'lucide-react';

const Sidebar = ({ activeTab = 'dashboard', onTabChange }) => {
  const { t } = useTranslation();
  
  const navigationItems = [
    { id: 'dashboard', label: t('profile.sidebar.dashboard'), icon: LayoutDashboard },
    { id: 'order-history', label: t('profile.sidebar.orderHistory'), icon: Clock },
    { id: 'settings', label: t('profile.sidebar.settings'), icon: Settings },
    { id: 'delete-account', label: t('profile.sidebar.deleteAccount'), icon: Trash }
  ];

  const handleItemClick = (item) => {
    if (onTabChange) {
      onTabChange(item.id);
    }
  };

  return (
    <div className="rounded-sm border border-gray-200 sticky top-4 py-10">
      <h2 className="text-lg font-bold text-gray-900 mb-6 px-6">{t('profile.sidebar.navigation')}</h2>
      
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
