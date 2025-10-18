import React from 'react';
import { Shield, Leaf, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AboutHeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-[var(--color-gray-9)]">
                {t('about.hero.title')}
              </h1>
              <h2 className="text-4xl lg:text-6xl font-bold text-[var(--color-gray-9)]">
                {t('about.hero.subtitle')}
              </h2>
            </div>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('about.hero.description')}
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[var(--color-green-gray-1)] rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <span className="text-sm font-medium text-gray-700">{t('about.hero.badges.secure')}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[var(--color-green-gray-1)] rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <span className="text-sm font-medium text-gray-700">{t('about.hero.badges.organic')}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[var(--color-green-gray-1)] rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <span className="text-sm font-medium text-gray-700">{t('about.hero.badges.rating')}</span>
              </div>
            </div>
          </div>

          {/* Right Content - Image Placeholder */}
          <div className="relative">
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-300 rounded-lg mx-auto mb-4"></div>
                <p className="text-gray-500">Hero Image</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
