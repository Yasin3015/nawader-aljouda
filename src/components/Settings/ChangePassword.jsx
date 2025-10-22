import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema } from '../../validation/settingsSchemas';
import PasswordInput from '../../components/auth/PasswordInput';

const ChangePassword = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  // Watch values for controlled inputs
  const currentPassword = watch('currentPassword');
  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');

  const onSubmit = async (data) => {
    try {
      // TODO: استدعاء API لتغيير كلمة المرور
      console.log('Password change data:', data);
      
      // عرض رسالة نجاح (يمكنك استخدام Toast)
      alert(t('settings.password.successMessage') || 'Password changed successfully!');
      
      // إعادة تعيين الحقول
      reset();
    } catch (error) {
      console.error('Error changing password:', error);
      alert(t('settings.password.errorMessage') || 'Failed to change password');
    }
  };

  const handlePasswordChange = (name, value) => {
    setValue(name, value, { shouldValidate: true });
  };

  return (
    <div className="border border-gray-200 rounded-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        {t('settings.password.title') || 'Change Password'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('settings.password.currentPassword') || 'Current Password'}
          </label>
          <PasswordInput
            name="currentPassword"
            placeholder={t('settings.password.placeholder') || 'Enter password'}
            value={currentPassword}
            onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
            error={errors.currentPassword?.message}
            isRTL={isRTL}
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('settings.password.newPassword') || 'New Password'}
          </label>
          <PasswordInput
            name="newPassword"
            placeholder={t('settings.password.placeholder') || 'Enter new password'}
            value={newPassword}
            onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
            error={errors.newPassword?.message}
            isRTL={isRTL}
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('settings.password.confirmPassword') || 'Confirm Password'}
          </label>
          <PasswordInput
            name="confirmPassword"
            placeholder={t('settings.password.placeholder') || 'Confirm new password'}
            value={confirmPassword}
            onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
            error={errors.confirmPassword?.message}
            isRTL={isRTL}
          />
        </div>

        {/* Submit Button */}
        <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 text-white px-6 py-2 rounded-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting 
              ? (t('settings.common.saving') || 'Saving...') 
              : (t('settings.password.saveChanges') || 'Save Changes')
            }
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;