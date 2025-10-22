import React from 'react';
import TrustedStoreSection from '../../components/about/TrustedStoreSection';
import TeamSection from '../../components/about/TeamSection';
import TestimonialSection from '../../components/about/TestimonialSection';
import AboutHeroSection from '../../components/about/HeroSection';
import NewsletterSection from '../../components/Common/NewsLetterSection';
import ContactMap from '../../components/contact/ContactMap'

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AboutHeroSection />
      
      {/* Trusted Store Section */}
      <TrustedStoreSection />
      
      {/* Team Section */}
      <TeamSection />
      
      {/* Testimonial Section */}
      <TestimonialSection />
      <ContactMap />
      <NewsletterSection />
    </div>
  );
};

export default About;