import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "../../UI/Container";
import MobileMenu from "./MobileMenu";
import search from '../../../assets/icons/search.svg';
import cart from '../../../assets/icons/bag.svg';
import menu from '../../../assets/icons/menu.svg';
import logo from '../../../assets/images/mobileLogo.svg';
import phone from '../../../assets/icons/PhoneCall.svg';

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentPage = location.pathname.split("/").filter(Boolean).pop() || "Home";
  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <div className="lg:hidden bg-white border-b border-gray-200">
        <Container className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <img src={cart} alt="Cart" className="w-6 h-6" />
            <img src={search} alt="Search" className="w-6 h-6" />
          </div>

          <img src={logo} alt="Logo" className="h-8 object-contain" />

          <button onClick={handleMenuToggle}>
            <img src={menu} alt="Menu" className="w-7 h-7" />
          </button>
        </Container>
      </div>
      <div className="lg:hidden bg-black text-gray-300">
        <Container className="flex items-center justify-between py-2 text-sm">
          <span className="capitalize">{currentPage}</span>
          <Link href="tel:+201234567890" className="text-gray-400">
            <img src={phone} alt="Phone" className="inline"/><span className="text-white text-md ">+20 123 456 7890</span>
          </Link>
        </Container>
      </div>
      {isMenuOpen && (
        <MobileMenu isOpen={isMenuOpen} onClose={()=>{setIsMenuOpen(false)}} />
      )}
    </>
  );
};

export default MobileNav;
