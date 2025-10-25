import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { notifications as initialNotifications } from '../../FakeData/notificationsData';

const NotificationsDropdown = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* overlay */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* dropdown */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-96 bg-white rounded-2xl shadow-2xl z-50 animate-slideDown border border-gray-200">

        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">{t('notifications')}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-4 space-y-3">
          {notifications.map((notif) => {
            const Icon = notif.icon;
            return (
              <div
                key={notif.id}
                className={`flex gap-3 p-3 rounded-lg transition ${
                  notif.isRead ? 'opacity-50' : 'bg-gray-50'
                }`}
              >
                <div className={`flex-shrink-0 w-12 h-12 ${notif.iconBg} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${notif.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-sm mb-1 ${notif.isRead ? 'text-gray-400' : 'text-gray-900'}`}>
                    {t(notif.titleKey)}
                  </h3>
                  <p className={`text-xs mb-2 ${notif.isRead ? 'text-gray-300' : 'text-gray-500'}`}>
                    {notif.subtitle}
                  </p>
                  <p className={`text-xs ${notif.isRead ? 'text-gray-300' : 'text-gray-400'}`}>
                    {notif.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t">
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 text-sm font-medium transition"
          >
            <Check className="w-4 h-4" />
            {t('markAllAsRead')}
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationsDropdown;
