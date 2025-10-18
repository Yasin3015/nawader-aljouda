import React from 'react';
import { Truck, Heart, Award, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TrustedStoreSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Truck className="w-6 h-6 text-green-600" />,
      title: t('about.trustedStore.features.shipping.title'),
      description: t('about.trustedStore.features.shipping.description')
    },
    {
      icon: <Heart className="w-6 h-6 text-green-600" />,
      title: t('about.trustedStore.features.feedback.title'),
      description: t('about.trustedStore.features.feedback.description')
    },
    {
      icon: <Award className="w-6 h-6 text-green-600" />,
      title: t('about.trustedStore.features.organic.title'),
      description: t('about.trustedStore.features.organic.description')
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      title: t('about.trustedStore.features.support.title'),
      description: t('about.trustedStore.features.support.description')
    },
    {
      icon: <Award className="w-6 h-6 text-green-600" />,
      title: t('about.trustedStore.features.payment.title'),
      description: t('about.trustedStore.features.payment.description')
    },
    {
      icon: <Heart className="w-6 h-6 text-green-600" />,
      title: t('about.trustedStore.features.food.title'),
      description: t('about.trustedStore.features.food.description')
    }
  ];

  return (
    <section className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Image */}
          <div className="relative">
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Truck className="w-16 h-16 text-gray-500" />
                </div>
                <p className="text-gray-500">Trusted Store Image</p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                {t('about.trustedStore.title')}
              </h2>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {t('about.trustedStore.subtitle')}
              </h3>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              {t('about.trustedStore.description')}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{feature.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Promise Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{t('about.trustedStore.promise.title')}</h4>
              </div>
              <ul className="space-y-2">
                {t('about.trustedStore.promise.items', { returnObjects: true }).map((promise, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{promise}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedStoreSection;