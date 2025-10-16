import { Outlet } from "react-router-dom";
import ResponsiveNavbar from "../components/Layout/Navbar/ResponsiveNavbar";

const UserLayout = () => {

  return (
    <div className="bg-amber-50 min-h-screen">
      <ResponsiveNavbar />
    
      <Outlet />
    </div>
  );
};
export default UserLayout;
