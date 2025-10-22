// src/components/contact/ContactInfo.jsx
import React from "react";

const ContactInfo = ({ icon: Icon, title, info }) => {
  return (
    <div className="flex flex-col items-center text-center gap-3 p-4">
      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
        <Icon className="w-6 h-6 text-green-600" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-600 whitespace-pre-line">{info}</p>
      </div>
    </div>
  );
};

export default ContactInfo;