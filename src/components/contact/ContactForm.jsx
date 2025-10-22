// src/components/contact/ContactForm.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import FormTextarea from "../auth/FormTextarea";
import FormInput from "../auth/FormInput";

const ContactForm = () => {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Zod validation schema
  const contactSchema = z.object({
    name: z.string().min(2, t('contact.validation.name')),
    email: z.string().email(t('contact.validation.email')),
    subject: z.string().min(3, t('contact.validation.subject')),
    message: z.string().min(10, t('contact.validation.message')),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitSuccess(false);

    try {
      contactSchema.parse(formData);
      
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => setSubmitSuccess(false), 5000);
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 md:col-span-2">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-2xl font-bold text-gray-900">
            {t('contact.form.title')}
          </h2>
        </div>
        <p className="text-sm text-gray-600">
          {t('contact.form.description')}
        </p>
      </div>

      {submitSuccess && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-sm">{t('contact.form.success')}</p>
        </div>
      )}

      <div>
        <FormInput
          name="name"
          type="text"
          placeholder={t('contact.form.placeholders.name')}
          className="my-2"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          disabled={isSubmitting}
        />

        <FormInput
          name="email"
          type="email"
          className="my-2"
          placeholder={t('contact.form.placeholders.email')}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          disabled={isSubmitting}
        />

        <FormInput
          name="subject"
          type="text"
          className="my-2"
          placeholder={t('contact.form.placeholders.subject')}
          value={formData.subject}
          onChange={handleChange}
          error={errors.subject}
          disabled={isSubmitting}
        />

        <FormTextarea
          name="message"
          placeholder={t('contact.form.placeholders.message')}
          value={formData.message}
          className="my-2 rounded-md"
          onChange={handleChange}
          error={errors.message}
          rows={5}
          disabled={isSubmitting}
        />

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
        </button>
      </div>
    </div>
  );
};

export default ContactForm;