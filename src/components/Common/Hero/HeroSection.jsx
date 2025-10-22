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
        <div className="grid grid-cols-1 grid-rows-2 lg:grid-rows-1 lg:grid-cols-3 gap-5 items-stretch">
          {/* Main Card */}
          <div className="h-full lg:col-span-2">
            <HeroMainCard />
          </div>

          {/* Side Cards */}
          <div className="flex flex-col gap-5 h-full lg:col-span-1">
            <HeroSideCard
              titleKey="summerSale"
              subtitleKey="discount75"
              buttonKey="shopNow"
              bg={side}
              number={1}
            />
            <HeroSideCard
              titleKey="bestDeal"
              subtitleKey="dealOfMonth"
              buttonKey="shopNow"
              bg={side2}
              number={2}
            />
          </div>
        </div>

        <HeroFeaturesBar />
      </Container>
    </section>
  );
};

export default HeroSection;
