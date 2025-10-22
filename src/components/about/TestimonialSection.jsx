import React, { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";

const TestimonialSection = () => {
  const { t, i18n } = useTranslation();
  const testimonials = t("about.testimonials.items", { returnObjects: true });

  const [isRTL, setIsRTL] = useState(i18n.language === "ar");

  // ✅ تحديث الاتجاه لما اللغة تتغير
  useEffect(() => {
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className="w-5 h-5 text-yellow-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4" dir={isRTL ? "rtl" : "ltr"}>
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t("about.testimonials.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("about.testimonials.description")}
          </p>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          key={isRTL ? "rtl" : "ltr"} // ✅ لإجبار إعادة الإنشاء عند تغيير اللغة
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            reverseDirection: isRTL, // ✅ يعكس الاتجاه مع اللغة
          }}
          dir={isRTL ? "rtl" : "ltr"}
          style={{ direction: isRTL ? "rtl" : "ltr" }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="py-8">
              <TestimonialCard
                testimonial={testimonial}
                renderStars={renderStars}
                isRTL={isRTL}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial, renderStars, isRTL }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`bg-gray-50 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      {/* Quote Icon */}
      <div className={`mb-6 ${isRTL ? "ml-auto" : ""}`}>
        <Quote className="w-12 h-12 text-green-500" />
      </div>

      {/* Quote Text */}
      <blockquote
        className={`text-gray-700 leading-relaxed italic mb-4 ${
          expanded ? "" : "line-clamp-2"
        }`}
      >
        “{testimonial.quote}”
      </blockquote>

      {/* Read More Button */}
      {testimonial.quote.split(" ").length > 15 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-green-600 text-sm font-semibold hover:underline mb-4 self-start"
        >
          {expanded
            ? isRTL
              ? "عرض أقل"
              : "Show less"
            : isRTL
            ? "قراءة المزيد"
            : "Read more"}
        </button>
      )}

      {/* Rating */}
      <div
        className={`flex items-center gap-1 mb-4 ${
          isRTL ? "justify-end" : "justify-start"
        }`}
      >
        {renderStars(5)}
      </div>

      {/* Customer Info */}
      <div
        className={`border-t border-gray-200 pt-4 flex items-center gap-4 ${
          isRTL ? "flex-row-reverse text-right" : ""
        }`}
      >
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-bold text-gray-900 text-lg">
            {testimonial.name}
          </h4>
          <p className="text-gray-600">{testimonial.status}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
