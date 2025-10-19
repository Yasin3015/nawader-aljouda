import { Outlet } from "react-router-dom";
import ResponsiveNavbar from "../components/Layout/Navbar/ResponsiveNavbar";
import Footer from "../components/Layout/Footer";
import ShoppingCart from "../components/UI/ShoppingCart";
import { CartProvider } from "../contexts/CartContext";
import { ToastProvider } from "../components/UI/ToastProvider";

const UserLayout = () => {

  return (
    <ToastProvider>
      <CartProvider>
        <div className="min-h-screen">
          <ResponsiveNavbar />
          <Outlet />
          <Footer />
          <ShoppingCart />
        </div>
      </CartProvider>
    </ToastProvider>
  );
};
export default UserLayout;
