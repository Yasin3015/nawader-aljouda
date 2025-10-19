import React from 'react';

const BillingAddress = ({ address, onEditAddress }) => {
  const defaultAddress = {
    name: 'Dainne Russell',
    address: '4140 Parker Rd. Allentown, New Mexico 31134',
    email: 'dainne.ressell@gmail.com',
    phone: '(671) 555-0110'
  };

  const addressData = address || defaultAddress;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
        Billing Address
      </h3>
      
      <div className="space-y-3">
        {/* Name */}
        <div>
          <p className="font-bold text-gray-900">
            {addressData.name}
          </p>
        </div>

        {/* Address */}
        <div>
          <p className="text-gray-900">
            {addressData.address}
          </p>
        </div>

        {/* Email */}
        <div>
          <p className="text-gray-900">
            {addressData.email}
          </p>
        </div>

        {/* Phone */}
        <div>
          <p className="text-gray-900">
            {addressData.phone}
          </p>
        </div>

        {/* Edit Address Button */}
        <div className="pt-2">
          <button
            onClick={onEditAddress}
            className="text-green-600 hover:text-green-700 underline font-medium transition-colors"
          >
            Edit Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingAddress;
