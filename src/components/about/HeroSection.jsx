import React from 'react';
import { Shield, Leaf, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import image1 from './../../assets/images/about-img1.png'

const AboutHeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
            <div className="w-full h-96 flex items-center justify-center">
              <div className="text-center">
                <img src={image1} alt='About hero image'/>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold !text-[var(--color-warning)]">
                {t('about.hero.title')}
              </h1>
              <h2 className="text-4xl lg:text-6xl font-bold text-[var(--color-gray-9)]">
                {t('about.hero.subtitle')}
              </h2>
            </div>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('about.hero.description')}
            </p>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
