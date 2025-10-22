import React from 'react'
import ContactInfoSection from '../../components/contact/ContactInfoSection';
import ContactForm from '../../components/contact/ContactForm';
import ContactMap from '../../components/contact/ContactMap';


const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ContactInfoSection />
          <ContactForm />
        </div>
      </div>
      <ContactMap />
    </div>
  );
};

export default Contact;
