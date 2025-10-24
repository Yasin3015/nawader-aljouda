import React from 'react';
import { Home, Package, ShoppingCart, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const Sidebar = ({ collapsed, setCollapsed }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const widthClass = collapsed ? 'w-14' : 'w-50';
  const textClass = collapsed ? 'hidden' : 'inline-block';
  const itemPadding = collapsed ? 'px-1 py-1 justify-center' : 'px-4 py-3';

  return (
    <aside className={`flex-shrink-0 ${widthClass} bg-white shadow-lg transition-all duration-300 overflow-y-auto`}>
      <div className="p-2 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Ctext x='10' y='30' font-size='16' fill='%2310b981' font-weight='bold'%3ENawader%3C/text%3E%3Ctext x='10' y='50' font-size='12' fill='%2310b981'%3EAl-Joulan%3C/text%3E%3C/svg%3E"
            alt="Logo"
            className="h-10"
          />
          <span className={`${textClass} font-semibold text-emerald-600`}>Knowticed</span>
        </Link>

        {/* collapse toggle inside sidebar (shows arrow direction based on RTL) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:inline-flex items-center justify-center p-1 rounded hover:bg-gray-100 transition"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {/* if RTL, arrow direction reversed */}
          {collapsed ? (
            isRtl ? <ChevronLeft className="w-5 h-5 text-gray-600" /> : <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            isRtl ? <ChevronRight className="w-5 h-5 text-gray-600" /> : <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      <nav className="px-0 space-y-1">
        <Link to="/" className={`flex items-center gap-1 ${itemPadding} ${collapsed ? 'justify-center' : ''} text-gray-700 hover:bg-gray-100 rounded-lg`}>
          <Home className="w-5 h-5" />
          <span className={`font-medium ${textClass}`}>{t('dashboard')}</span>
        </Link>

        <Link to="/products" className={`flex items-center gap-3 ${itemPadding} ${collapsed ? 'justify-center' : ''} text-gray-700 hover:bg-gray-100 rounded-lg`}>
          <Package className="w-5 h-5" />
          <span className={`font-medium ${textClass}`}>{t('allProducts')}</span>
        </Link>

        <Link to="/orders" className={`flex items-center gap-3 ${itemPadding} ${collapsed ? 'justify-center' : ''} text-gray-700 hover:bg-gray-100 rounded-lg`}>
          <ShoppingCart className="w-5 h-5" />
          <span className={`font-medium ${textClass}`}>{t('orders')}</span>
        </Link>
      </nav>

      <div className="mt-auto p-4">
        <a href="#" className={`text-sm text-emerald-600 hover:underline ${textClass}`}>{t('visitWebsite')}</a>
        {/* Small collapse button for mobile (visible when collapsed) */}
        <div className="mt-3 lg:hidden flex justify-center">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded hover:bg-gray-100 transition"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
