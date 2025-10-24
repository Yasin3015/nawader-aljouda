// src/components/Settings/DeleteAccount.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle } from 'lucide-react';
import DeleteAccountModal from './DeleteAccountModal';

const DeleteAccount = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="border-1 border-[var(--color-gray-2)] rounded-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {t('settings.deleteAccount.title')}
        </h2>
        
        <div className="bg-red-50 border border-red-200 rounded-sm p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-red-900 mb-1">
                {t('settings.deleteAccount.warningTitle')}
              </h3>
              <p className="text-sm text-red-700">
                {t('settings.deleteAccount.warningMessage')}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <p className="text-sm text-gray-600">
            {t('settings.deleteAccount.consequences.title')}
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 mr-4">
            <li>{t('settings.deleteAccount.consequences.point1')}</li>
            <li>{t('settings.deleteAccount.consequences.point2')}</li>
            <li>{t('settings.deleteAccount.consequences.point3')}</li>
            <li>{t('settings.deleteAccount.consequences.point4')}</li>
          </ul>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-2 sm:px-6 py-2.5 rounded-sm transition-colors font-medium"
        >
          {t('settings.deleteAccount.button')}
        </button>
      </div>

      {showModal && (
        <DeleteAccountModal
          onClose={() => setShowModal(false)}
          onConfirm={() => {
          }}
        />
      )}
    </>
  );
};

export default DeleteAccount;