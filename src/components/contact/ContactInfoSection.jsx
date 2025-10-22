// src/components/contact/ContactInfoSection.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Mail, Phone } from "lucide-react";
import ContactInfo from "./ContactInfo";

const ContactInfoSection = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="space-y-8">
        <ContactInfo 
          icon={MapPin}
          title={t('contact.info.address.title')}
          info={t('contact.info.address.value')}
        />
        <ContactInfo 
          icon={Mail}
          title={t('contact.info.email.title')}
          info={t('contact.info.email.value')}
        />
        <ContactInfo 
          icon={Phone}
          title={t('contact.info.phone.title')}
          info={t('contact.info.phone.value')}
        />
      </div>
    </div>
  );
};

export default ContactInfoSection;