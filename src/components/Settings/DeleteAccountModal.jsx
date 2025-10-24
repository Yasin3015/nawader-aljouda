// src/components/Settings/DeleteAccountModal.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { X, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const DeleteAccountModal = ({ onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    // التحقق من كتابة كلمة التأكيد
    if (confirmText !== 'DELETE') {
      return;
    }

    setIsDeleting(true);

    try {
      // هنا هيكون في API call لحذف الحساب
      // await deleteAccountAPI();
      
      // محاكاة API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // مسح كل البيانات وتسجيل الخروج
      logout();

      // إغلاق الـ Modal
      onClose();

      // التوجيه لصفحة تسجيل الدخول
      navigate('/auth/login');

      // يمكنك إضافة toast notification هنا
      // toast.success('تم حذف الحساب بنجاح');
    } catch (error) {
      console.error('Error deleting account:', error);
      // يمكنك إضافة toast notification للخطأ
      // toast.error('حدث خطأ أثناء حذف الحساب');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-md max-w-md w-full p-4 relative">
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
          disabled={isDeleting}
        >
          <X className="w-6 h-6" />
        </button>

        {/* الأيقونة */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 rounded-full p-3">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        {/* العنوان */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          {t('settings.deleteAccount.modal.title')}
        </h2>

        {/* الرسالة */}
        <p className="text-gray-600 text-center mb-6">
          {t('settings.deleteAccount.modal.message')}
        </p>

        {/* تحذير */}
        <div className="bg-red-50 border border-red-200 rounded-sm p-2 mb-6">
          <p className="text-sm text-red-700 text-center font-medium">
            {t('settings.deleteAccount.modal.warning')}
          </p>
        </div>

        {/* حقل التأكيد */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('settings.deleteAccount.modal.confirmLabel')} <span className="text-red-600 font-bold">DELETE</span>
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="DELETE"
            disabled={isDeleting}
            className="w-full border border-gray-300 rounded-sm px-1.5 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        {/* الأزرار */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2.5 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('settings.deleteAccount.modal.cancel')}
          </button>
          <button
            onClick={handleDelete}
            disabled={confirmText !== 'DELETE' || isDeleting}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting 
              ? t('settings.deleteAccount.modal.deleting')
              : t('settings.deleteAccount.modal.confirm')
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;