import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { billingAddressSchema } from '../../validation/settingsSchemas';

const BillingAddressSettings = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(billingAddressSchema),
    defaultValues: {
      firstName: 'Dianne',
      lastName: 'Dianne',
      companyName: 'Zakirsoft',
      address: '4140 Parl',
      city: 'Washington DC',
      zipCode: '20033',
      email: 'dianne.russell@gmail.com',
      phone: '(603) 555-0123'
    }
  });

  const onSubmit = async (data) => {
    try {
      console.log('Billing address updated:', data);
      // Handle form submission here
    } catch (error) {
      console.error('Error updating billing address:', error);
    }
  };

  const cities = [
    'Washington DC',
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas'
  ];

  return (
    <div className="rounded-md border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        {t('settings.billing.title')}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('settings.billing.firstName')}
            </label>
            <input
              {...register('firstName')}
              type="text"
              className={`w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('settings.billing.lastName')}
            </label>
            <input
              {...register('lastName')}
              type="text"
              className={`w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('settings.billing.companyName')}
          </label>
          <input
            {...register('companyName')}
            type="text"
            className={`w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.companyName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.companyName && (
            <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('settings.billing.address')}
          </label>
          <input
            {...register('address')}
            type="text"
            className={`w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('settings.billing.city')}
            </label>
            <select
              {...register('city')}
              className={`w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('settings.billing.zipCode')}
            </label>
            <input
              {...register('zipCode')}
              type="text"
              className={`w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.zipCode ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.zipCode && (
              <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('settings.billing.email')}
          </label>
          <input
            {...register('email')}
            type="email"
            className={`w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('settings.billing.phone')}
          </label>
          <input
            {...register('phone')}
            type="tel"
            className={`w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 text-white px-6 py-2 rounded-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t('settings.common.saving') : t('settings.common.save')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BillingAddressSettings;

