import React from "react";
import { useTranslation } from "react-i18next";

const ConfirmModal = ({ isOpen, messageKey, onConfirm, onCancel }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-sm text-center animate-fadeIn">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">
          {t(messageKey || "confirmMessage")}
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {t("confirmSubMessage")}
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
          >
            {t("cancel")}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onCancel();
            }}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
          >
            {t("delete")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
