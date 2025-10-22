import React from 'react';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Instagram, Send } from 'lucide-react';

export default function NewsletterSection() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Right side - Text content */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {t('newsletter.title')}
            </h3>
            <p className="text-gray-600 text-sm">
              {t('newsletter.description')}
            </p>
          </div>

          {/* Left side - Email input and social icons */}
          <div className="!max-w-full w-full md:w-1/2 flex flex-col lg:flex-row items-start gap-4 ">
            {/* Email input with button */}
            <div className="!flex-1 rounded-full flex items-center bg-white overflow-hidden border border-gray-200">
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="flex-1 px-4 py-3 bg-transparent outline-none text-sm text-gray-600 "
              />
              <button className="bg-green-500 rounded-full hover:bg-green-600 text-white px-6 py-3 font-semibold transition-colors">
                {t('newsletter.button')}
              </button>
            </div>

            {/* Social media icons */}
            <div className="flex items-center gap-2">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}