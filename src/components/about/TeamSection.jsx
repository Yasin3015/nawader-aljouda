import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Twitter, Facebook, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

import "swiper/css";
import "swiper/css/navigation";

const TeamSection = () => {
  const { t } = useTranslation();

  const teamMembers = [
    {
      id: 1,
      name: t("about.team.members.jenny.name"),
      position: t("about.team.members.jenny.position"),
      image: null,
      social: ["twitter", "facebook", "whatsapp"],
    },
    {
      id: 2,
      name: t("about.team.members.cody.name"),
      position: t("about.team.members.cody.position"),
      image: null,
      social: ["twitter", "facebook", "whatsapp"],
    },
    {
      id: 3,
      name: t("about.team.members.jane.name"),
      position: t("about.team.members.jane.position"),
      image: null,
      social: ["twitter", "facebook", "whatsapp"],
    },
    {
      id: 4,
      name: t("about.team.members.robert.name"),
      position: t("about.team.members.robert.position"),
      image: null,
      social: ["twitter", "facebook", "whatsapp"],
    },
    {
      id: 5,
      name: t("about.team.members.dianne.name"),
      position: t("about.team.members.dianne.position"),
      image: null,
      social: ["twitter", "facebook", "whatsapp"],
    },
  ];

  const features = [
    {
      icon: <Twitter className="w-8 h-8 text-green-600" />,
      title: t("about.team.features.expert.title"),
      description: t("about.team.features.expert.description"),
    },
    {
      icon: <Facebook className="w-8 h-8 text-green-600" />,
      title: t("about.team.features.innovation.title"),
      description: t("about.team.features.innovation.description"),
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-green-600" />,
      title: t("about.team.features.quality.title"),
      description: t("about.team.features.quality.description"),
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t("about.team.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("about.team.description")}
          </p>
        </div>
        {/* Team Carousel */}
        <div className="relative">
          <div className="flex w-full items-center justify-between mb-8 absolute -top-7 z-80">
            <div
              className="swiper-button-prev w-14 h-14  bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors border p-3 !text-[var(--color-primary)]"
            ></div>

            <div
              className="swiper-button-next w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors border p-3 !text-[var(--color-primary)]"
            ></div>
          </div>

          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {teamMembers.map((member) => (
              <SwiperSlide key={member.id} className="py-4">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-shadow relative">
                  {/* Member Image */}
                  <div className="relative h-64 bg-gray-200 flex items-center justify-center overflow-hidden">
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

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity">
                      {member.social.includes("twitter") && (
                        <a
                          href="#"
                          className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600"
                        >
                          <Twitter className="w-5 h-5 text-white" />
                        </a>
                      )}
                      {member.social.includes("facebook") && (
                        <a
                          href="#"
                          className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600"
                        >
                          <Facebook className="w-5 h-5 text-white" />
                        </a>
                      )}
                      {member.social.includes("whatsapp") && (
                        <a
                          href="#"
                          className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600"
                        >
                          <MessageCircle className="w-5 h-5 text-white" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h4>
                    <p className="text-gray-600">{member.position}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
