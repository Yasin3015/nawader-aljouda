import { useState, useEffect } from "react";
import NavbarDesktop from "./NavbarDesktop";
import MobileMenu from "./MobileMenu";
import MobileNav from "./MobileNav";

const ResponsiveNavbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <MobileNav />
      ) : (
        <NavbarDesktop />
      )}
    </>
  );
};

export default ResponsiveNavbar;
