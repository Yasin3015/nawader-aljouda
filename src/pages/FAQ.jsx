import { useState } from 'react';
import worker from '../assets/images/FAQ.png'; 
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqItems = [
    {
      title: "In elementum est a ante sodales iaculis.",
      content: "Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi, laoreet ut tempor ac, cursus vitae eros. Cras quis ultrices elit. Proin ac lectus arcu. Maecenas aliquet vel tellus et accumsan. Donec a eros non massa vulputate ornare. Vivamus ornare commodo ante, at commodo felis congue vitae."
    },
    {
      title: "Etiam lobortis massa eu nibh tempor elementum.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      title: "In elementum est a ante sodales iaculis.",
      content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      title: "Aenean quis quam nec lacus semper dignissim.",
      content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
    },
    {
      title: "Nulla tincidunt eros id tempus accumsan.",
      content: "Duis aute irure dolor in reprehenderit in voluptate velit esse."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-8">

      <div className="w-full md:w-1/2">
        <h1 className="text-4xl font-bold mb-8">
          Welcome, Let's Talk<br />
          About Our System
        </h1>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className="border rounded-lg overflow-hidden"
            >
              <button
                className="w-full p-4 text-left flex justify-between items-center bg-white hover:bg-gray-50"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-medium">{item.title}</span>
                <span className="text-xl">{openIndex === index ? '−' : '+'}</span>
              </button>
              
              {openIndex === index && (
                <div className="p-4 bg-gray-50">
                  <p className="text-gray-600">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
       <div className="w-full md:w-1/2">
        <img 
          src={worker} 
          alt="Worker in safety equipment" 
          className="w-full max-w-lg mx-auto"
        />
      </div>
    </div>
  );
};

export default FAQ;