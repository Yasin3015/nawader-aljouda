import HeroSection from "../../components/Common/Hero/HeroSection";
import ProductListSection from "../../components/Common/Products/ProductsHomeList";
import BestSaleCard from "../../components/Common/Products/BestSaleCard";
import Container from "../../components/UI/Container";
import ProductCard from "../../components/Common/Products/ProductCard";
import { products } from "../../FakeData/Products";
import BestDeals from "../../components/Common/BestDeals";
import GoalSection from "../../components/Common/GoalSection";
import bg from '../../assets/images/goalbg.jpg'
import PartnersCarousel from '../../components/Common/PartnersCarousel'

const Home = () => {
  return (
    <div>
      <HeroSection />
      <GoalSection bg={bg} />
      <ProductListSection />
      <BestDeals />
      <PartnersCarousel />
    </div>
  )
}

export default Home
