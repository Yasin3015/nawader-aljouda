import React, { useState } from 'react';
import { Users, Sparkles, Target, ChevronLeft, ChevronRight, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TeamSection = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const teamMembers = [
    {
      id: 1,
      name: t('about.team.members.jenny.name'),
      position: t('about.team.members.jenny.position'),
      image: null,
      social: "twitter"
    },
    {
      id: 2,
      name: t('about.team.members.cody.name'),
      position: t('about.team.members.cody.position'),
      image: null,
      social: null
    },
    {
      id: 3,
      name: t('about.team.members.jane.name'),
      position: t('about.team.members.jane.position'),
      image: null,
      social: null
    },
    {
      id: 4,
      name: t('about.team.members.robert.name'),
      position: t('about.team.members.robert.position'),
      image: null,
      social: null
    },
    {
      id: 5,
      name: t('about.team.members.dianne.name'),
      position: t('about.team.members.dianne.position'),
      image: null,
      social: null
    }
  ];

  const features = [
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: t('about.team.features.expert.title'),
      description: t('about.team.features.expert.description')
    },
    {
      icon: <Sparkles className="w-8 h-8 text-green-600" />,
      title: t('about.team.features.innovation.title'),
      description: t('about.team.features.innovation.description')
    },
    {
      icon: <Target className="w-8 h-8 text-green-600" />,
      title: t('about.team.features.quality.title'),
      description: t('about.team.features.quality.description')
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(teamMembers.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(teamMembers.length / 3)) % Math.ceil(teamMembers.length / 3));
  };

  const getVisibleMembers = () => {
    const start = currentSlide * 3;
    return teamMembers.slice(start, start + 3);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('about.team.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('about.team.description')}
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Team Carousel */}
        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            
            <h3 className="text-2xl font-bold text-gray-900">{t('about.team.carousel.title')}</h3>
            
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getVisibleMembers().map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
                {/* Member Image */}
                <div className="relative h-64 bg-gray-200 flex items-center justify-center">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                      <p className="text-gray-500">Team Member Photo</p>
                    </div>
                  )}
                  
                  {/* Social Icon */}
                  {member.social === 'twitter' && (
                    <div className="absolute top-4 left-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Twitter className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h4>
                  <p className="text-gray-600">{member.position}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(teamMembers.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
