import React from "react";
import BillingAddress from "./BillingAddress";

const ProfileInfo = ({ user, onEditProfile }) => {
  const defaultUser = {
    name: "Dianne Russell",
    role: "Customer",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  };

  const userData = user || defaultUser;
  const handleEditAddress = () => {
    console.log("Edit address clicked");
    // Handle edit address logic
  };
  const addressData = {
    name: "Dainne Russell",
    address: "4140 Parker Rd. Allentown, New Mexico 31134",
    email: "dainne.ressell@gmail.com",
    phone: "(671) 555-0110",
  };

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
      <div className=" border border-gray-200 p-6 flex-1 rounded-sm">
        <div className="flex flex-col items-center text-center">
          {/* Profile Image */}
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
            <img
              src={userData.avatar}
              alt={userData.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name */}
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {userData.name}
          </h3>

          {/* Role */}
          <p className="text-gray-500 mb-4">{userData.role}</p>

          {/* Edit Profile Button */}
          <button
            onClick={onEditProfile}
            className="text-green-600 hover:text-green-700 underline font-medium transition-colors"
          >
            Edit Profile
          </button>
        </div>
      </div>
      <div className="lg:col-span-3">
        <BillingAddress
          address={addressData}
          onEditAddress={onEditProfile}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
