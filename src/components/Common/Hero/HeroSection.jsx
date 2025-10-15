import React from "react";
import Container from "../../UI/Container";
import HeroMainCard from "./HeroMainCard";
import HeroSideCard from "./HeroSideCard";
import HeroFeaturesBar from "./HeroFeaturesBar";
import side from '../../../assets/images/sideCard.jpg'
import side2 from '../../../assets/images/sideCard2.jpg'

const HeroSection = () => {
  return (
    <section className="py-8 md:py-12 bg-[var(--color-white)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          {/* Main Banner */}
          <div className="lg:col-span-2 h-full">
            <HeroMainCard />
          </div>

          {/* Side Banners */}
          <div className="flex flex-col gap-5 h-full">
            <HeroSideCard
              titleKey="summerSale"
              subtitleKey="discount75"
              buttonKey="shopNow"
              bg={side}
            />
            <HeroSideCard
              titleKey="bestDeal"
              subtitleKey="dealOfMonth"
              buttonKey="shopNow"
              bg={side2}
            />
          </div>
        </div>

        {/* Features Bar */}
        <HeroFeaturesBar />
      </Container>
    </section>
  );
};

export default HeroSection;
