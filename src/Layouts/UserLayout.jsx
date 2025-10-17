import { Outlet } from "react-router-dom";
import ResponsiveNavbar from "../components/Layout/Navbar/ResponsiveNavbar";
import Footer from "../components/Layout/Footer";

const UserLayout = () => {

  return (
    <div className="min-h-screen">
      <ResponsiveNavbar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default UserLayout;
