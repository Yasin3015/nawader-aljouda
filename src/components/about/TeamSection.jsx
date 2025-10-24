import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Twitter, Facebook, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import teamMember from '../../assets/images/team.jpg'
import { Link } from "react-router-dom";

const TeamSection = () => {
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(i18n.language === "ar");
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);

  const teamMembers = [
    {
      id: 1,
      name: t("about.team.members.jenny.name"),
      position: t("about.team.members.jenny.position"),
      image: teamMember,
    },
    {
      id: 2,
      name: t("about.team.members.cody.name"),
      position: t("about.team.members.cody.position"),
      image: teamMember,
    },
    {
      id: 3,
      name: t("about.team.members.jane.name"),
      position: t("about.team.members.jane.position"),
      image: teamMember,
    },
    {
      id: 4,
      name: t("about.team.members.robert.name"),
      position: t("about.team.members.robert.position"),
      image: teamMember,
    },
    {
      id: 5,
      name: t("about.team.members.dianne.name"),
      position: t("about.team.members.dianne.position"),
      image: teamMember,
    },
  ];

  const handleCardClick = (id) => {
    setActiveCard((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-10 pb-0">
      <div className="container" dir={isRTL ? "rtl" : "ltr"}>
        {/* العنوان والوصف */}
        <div className="text-center mb-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t("about.team.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("about.team.description")}
          </p>
        </div>
        <div className="relative">
          <div
            className={`flex w-full items-center justify-between mb-8 absolute -top-0 z-50`}
          >
            {isRTL ? (
              <>
                <div className="swiper-button-prev w-14 h-14 !bg-gray-100 border-2 !border-white rounded-full flex items-center justify-center p-3 !text-gray-700 hover:bg-gray-200 hover:!text-[var(--color-primary)] transition-colors"></div>
                <div className="swiper-button-next w-14 h-14 bg-gray-100 border-2 border-white rounded-full flex items-center justify-center p-3 !text-gray-700 hover:bg-gray-200 transition-colors hover:!text-[var(--color-primary)]"></div>
              </>
            ) : (
              <>
                <div className="swiper-button-next w-14 h-14 !bg-gray-100 border-2 !border-white rounded-full flex items-center justify-center p-3 font-medium text-1xl !text-gray-700 hover:bg-gray-200 hover:!text-[var(--color-primary)] transition-colors"></div>
                <div className="swiper-button-prev w-14 h-14 bg-gray-100 border-2 border-white rounded-full flex items-center justify-center p-3 !text-gray-700 hover:bg-gray-200 hover:!text-[var(--color-primary)] transition-colors"></div>
              </>
            )}
          </div>

          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            className="!py-3 !px-3"
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            dir={isRTL ? "rtl" : "ltr"}
            style={{ direction: isRTL ? "rtl" : "ltr" }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {teamMembers.map((member) => (
              <SwiperSlide key={member.id} className="py-4">
                <div
                  onClick={() => handleCardClick(member.id)}
                  className="bg-white border-1 border-[var(--color-gray-2)] rounded-md overflow-hidden group relative cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
                >
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

                    {/* الأيقونات */}
                    <div
                      className={`absolute inset-0 bg-black/70 flex items-center justify-center gap-4 transition-opacity ${
                        activeCard === member.id
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <Link
                        target="_blank"
                        href="#"
                        className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600"
                      >
                        <Twitter className="w-5 h-5 text-white" />
                      </Link>
                      <Link
                        target="_blank"
                        href="#"
                        className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600"
                      >
                        <Facebook className="w-5 h-5 text-white" />
                      </Link>
                      <Link
                        target="_blank"
                        href="#"
                        className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600"
                      >
                        <MessageCircle className="w-5 h-5 text-white" />
                      </Link>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="text-xl  text-gray-900">
                      {member.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{member.position}</p>
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
