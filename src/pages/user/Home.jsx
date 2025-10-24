import HeroSection from "../../components/Common/Hero/HeroSection";
import ProductListSection from "../../components/Common/Products/ProductsHomeList";
import { products } from "../../FakeData/Products";
import BestDeals from "../../components/Common/BestDeals";
import GoalSection from "../../components/Common/GoalSection";
import bg from '../../assets/images/goalbg.jpg'
import PartnersCarousel from '../../components/Common/PartnersCarousel'
import TestimonialSection from '../../components/about/TestimonialSection'
import NewsLetterSection from '../../components/Common/NewsLetterSection'
import RelatedProductsSection from '../../components/ProductInfo/RelatedProductsSection'
import Dashboard from "../../components/Admin Dashboard/Dashboard";

const Home = () => {
  return (
    <div>
      {/* <HeroSection />
      <GoalSection bg={bg} />
      <ProductListSection />
      <div className="container">
        <RelatedProductsSection />
      </div>
      <BestDeals products={products}/>
      <PartnersCarousel />
      <TestimonialSection />
      <NewsLetterSection /> */}

      <Dashboard />
    </div>
  )
}

export default Home
