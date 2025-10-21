import { Outlet } from "react-router-dom";
import ResponsiveNavbar from "../components/Layout/Navbar/ResponsiveNavbar";
import Footer from "../components/Layout/Footer";
import ShoppingCart from "../components/UI/ShoppingCart";
import { CartProvider } from "../contexts/CartContext";
import { WishlistProvider } from "../contexts/WishlistContext";
import { ToastProvider } from "../components/UI/ToastProvider";

const UserLayout = () => {

  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen">
            <ResponsiveNavbar />
            <Outlet />
            <Footer />
            <ShoppingCart />
          </div>
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
};
export default UserLayout;
