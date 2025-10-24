// src/components/Dashboard/Header.jsx
import React from 'react';
import { Home, Menu, X, Search, Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NotificationsDropdown from './NotificationsDropdown';
import SearchBar from './SearchBar';

/*
  Header contains:
  - toggle button for collapsing sidebar (icons-only on small/large)
  - language toggle (uses i18n.changeLanguage)
  - search & notifications toggles
  Header respects RTL by reading i18n.language and layout remains the same.
*/

const Header = ({
  collapsed,
  setCollapsed,
  notificationsOpen,
  setNotificationsOpen,
  searchOpen,
  setSearchOpen
}) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const toggleLang = () => {
    const next = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(next);
  };

  return (
    <header className="bg-green-500 shadow-sm sticky top-0 z-30 relative">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
          >
            {i18n.language === 'en' ? 'العربية' : 'English'}
          </button>

          <button
            className="relative"
            onClick={() => {
              setSearchOpen(!searchOpen);
              setNotificationsOpen(false);
            }}
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          <button
            className="relative"
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setSearchOpen(false);
            }}
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="relative">
            {notificationsOpen && (
              <NotificationsDropdown
                isOpen={notificationsOpen}
                onClose={() => setNotificationsOpen(false)}
              />
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span className="text-sm font-medium hidden sm:block">{t('admin')}</span>
          </div>
        </div>
      </div>

      <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
};

export default Header;
