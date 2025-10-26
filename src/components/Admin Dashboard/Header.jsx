// src/components/Dashboard/Header.jsx
import React from 'react';
import { Home, Menu, X, Search, Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NotificationsDropdown from './NotificationsDropdown';
import SearchBar from './SearchBar';
import LanguageSwitcher from '../Layout/Navbar/LanguageSwitcher'

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
  const { t } = useTranslation();

  return (
    <header className="bg-gray-100 sticky top-0 z-30 relative">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
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
        </div>
        <div className='flex items-center justify-start gap-3'>
            <SearchBar />
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span className="text-sm font-medium hidden sm:block">{t('admin')}</span>
          </div>
          </div>
      </div>
    </header>
  );
};

export default Header;
