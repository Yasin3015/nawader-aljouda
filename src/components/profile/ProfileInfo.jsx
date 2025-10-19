import React from 'react';

const ProfileInfo = ({ user, onEditProfile }) => {
  const defaultUser = {
    name: 'Dianne Russell',
    role: 'Customer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  };

  const userData = user || defaultUser;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
        <p className="text-gray-500 mb-4">
          {userData.role}
        </p>

        {/* Edit Profile Button */}
        <button
          onClick={onEditProfile}
          className="text-green-600 hover:text-green-700 underline font-medium transition-colors"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
