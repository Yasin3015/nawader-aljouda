import React from 'react';
import img1 from '../../assets/icons/partner1.svg';
import img2 from '../../assets/icons/partner2.svg';
import img3 from '../../assets/icons/partner3.svg';
import img4 from '../../assets/icons/partner4.svg';
import img5 from '../../assets/icons/partner5.svg';

const PartnersCarousel = () => {
  const partners = [
    { id: 1, name: 'F00D', image: img1 },
    { id: 2, name: 'B00K-off', image: img2 },
    { id: 3, name: 'Series', image: img3 },
    { id: 1, name: 'F00D', image: img4 },
    { id: 2, name: 'B00K-off', image: img5 },
  ];

  return (
    <div className="w-full overflow-hidden py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">Our Partners</h2>
      
      <div className="relative overflow-hidden container">
        <div className="flex animate-infinite-scroll">
          {[...partners, ...partners].map((partner, index) => (
            <div key={index} className="flex-shrink-0 mx-4">
              <div className="w-50 flex items-center justify-center">
                <img 
                  src={partner.image} 
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain p-4"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersCarousel;