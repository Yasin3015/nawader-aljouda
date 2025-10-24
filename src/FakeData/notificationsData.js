// src/data/notificationsData.js
import { ShoppingBag, AlertCircle, Megaphone } from 'lucide-react';

export const notifications = [
  {
    id: 1,
    type: 'purchase',
    icon: ShoppingBag,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    titleKey: 'newPurchaseTitle', // you'll map keys in i18n files
    subtitle: 'Total: $140',
    date: 'Nov 15, 2023',
    isRead: false
  },
  {
    id: 2,
    type: 'warning',
    icon: AlertCircle,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    titleKey: 'aboutToSoldOutTitle',
    subtitle: 'Product x is about to, Lorem ipsum dolor sit amet consectetur.',
    date: 'Nov 15, 2023',
    isRead: false
  },
  {
    id: 3,
    type: 'success',
    icon: Megaphone,
    iconBg: 'bg-gray-100',
    iconColor: 'text-gray-600',
    titleKey: 'newItemAdded',
    subtitle: 'Product x is about to, Lorem ipsum dolor sit amet consectetur.',
    date: 'Nov 15, 2023',
    isRead: false
  },
  {
    id: 4,
    type: 'success',
    icon: Megaphone,
    iconBg: 'bg-gray-100',
    iconColor: 'text-gray-300',
    titleKey: 'newItemAdded',
    subtitle: 'Product x is about to, Lorem ipsum dolor sit amet consectetur.',
    date: 'Nov 15, 2023',
    isRead: true
  }
];
