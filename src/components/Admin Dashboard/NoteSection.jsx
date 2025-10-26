import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const NoteSection = () => {
  const { t } = useTranslation();
  const [note, setNote] = useState('');
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        {t('orderDetails.note.title')}
      </h3>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder={t('orderDetails.note.placeholder')}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
        rows="3"
      />
    </div>
  );
};

export default NoteSection;