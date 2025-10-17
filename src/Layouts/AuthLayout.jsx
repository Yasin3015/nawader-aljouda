import React from "react";
import { Outlet, Link } from "react-router-dom";
import ResponsiveNavbar from "../components/Layout/Navbar/ResponsiveNavbar";
import Footer from "../components/Layout/Footer";

const AuthLayout = () => {
  return (
    <>
      <ResponsiveNavbar />
      <div className=" flex justify-center items-center bg-[var(--color-gray-1)] p-4 py-20">
        <div className="w-full max-w-md  bg-white rounded-[var(--radius-lg)] shadow-md p-6">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthLayout;


