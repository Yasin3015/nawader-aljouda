import React from 'react';

const BillingInformation = ({ billingData, setBillingData, errors = {} }) => {
  const countries = [
    'Select',
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Spain',
    'Italy',
    'Australia',
    'Japan',
    'Other'
  ];

  const states = [
    'Selects',
    'California',
    'New York',
    'Texas',
    'Florida',
    'Illinois',
    'Pennsylvania',
    'Ohio',
    'Georgia',
    'North Carolina',
    'Michigan'
  ];

  const handleInputChange = (field, value) => {
    setBillingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getFieldError = (field) => errors[`billingData.${field}`];
  const getFieldClassName = (field) => 
    `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
      getFieldError(field) ? 'border-red-500' : 'border-[var(--color-gray-2)]'
    }`;

  const ErrorMessage = ({ field }) => {
    const error = getFieldError(field);
    return error ? <p className="mt-1 text-sm text-red-600">{error}</p> : null;
  };

  return (
    <div className="py-3">
      <h2 className="text-xl font-semibold text-[var(--color-gray-7)] mb-6">Billing Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            First name
          </label>
          <input
            type="text"
            value={billingData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            placeholder="Your first name"
            className={getFieldClassName('firstName')}
          />
          <ErrorMessage field="firstName" />
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Last name
          </label>
          <input
            type="text"
            value={billingData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            placeholder="Your last name"
            className={getFieldClassName('lastName')}
          />
          <ErrorMessage field="lastName" />
        </div>

        {/* Company Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-black mb-2">
            Company Name (optional)
          </label>
          <input
            type="text"
            value={billingData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            placeholder="Company name"
            className={getFieldClassName('companyName')}
          />
          <ErrorMessage field="companyName" />
        </div>

        {/* Street Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-black mb-2">
            Street Address
          </label>
          <input
            type="text"
            value={billingData.streetAddress}
            onChange={(e) => handleInputChange('streetAddress', e.target.value)}
            placeholder="Street Address"
            className={getFieldClassName('streetAddress')}
          />
          <ErrorMessage field="streetAddress" />
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Country / Region
          </label>
          <select
            value={billingData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            className={getFieldClassName('country')}
          >
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
          <ErrorMessage field="country" />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            States
          </label>
          <select
            value={billingData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className={getFieldClassName('state')}
          >
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
          <ErrorMessage field="state" />
        </div>

        {/* Zip Code */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Zip Code (optional)
          </label>
          <input
            type="text"
            value={billingData.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            placeholder="Zip Code"
            className={getFieldClassName('zipCode')}
          />
          <ErrorMessage field="zipCode" />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Email
          </label>
          <input
            type="email"
            value={billingData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Email Address"
            className={getFieldClassName('email')}
          />
          <ErrorMessage field="email" />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={billingData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="Phone number"
            className={getFieldClassName('phone')}
          />
          <ErrorMessage field="phone" />
        </div>
      </div>

      {/* Ship to Different Address Checkbox */}
      <div className="mt-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={billingData.shipToDifferent}
            onChange={(e) => handleInputChange('shipToDifferent', e.target.checked)}
            className="w-4 h-4 text-[var(--color-primary)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--color-primary)] focus:ring-2"
          />
          <span className="ml-2 text-sm text-black">
            Ship to a different address
          </span>
        </label>
      </div>
    </div>
  );
};

export default BillingInformation;
