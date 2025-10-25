import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "../components/Admin Dashboard/Sidebar";
import Header from "../components/Admin Dashboard/Header";
import Breadcrumbs from "../components/Common/Breadcrumbs";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
     const { i18n } = useTranslation();
      const isRtl = i18n.language === 'ar';
      const [collapsed, setCollapsed] = useState(false);
      const [notificationsOpen, setNotificationsOpen]= useState(false)
      const [searchOpen, setSearchOpen]= useState(false)
    
    
      useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth < 1024) setCollapsed(true);
      }, []);
  return (
    <>
      <div
        className="min-h-screen !overflow-hidden!max-w-screen bg-gray-50 flex"
        dir={isRtl ? "rtl" : "ltr"}
      >
        {/* Sidebar */}
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isRtl={isRtl}
        />

        <div className={`flex-1 flex flex-col transition-all duration-300`}>
          <Header
            collapsed={collapsed}
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
            setCollapsed={setCollapsed}
            notificationsOpen={notificationsOpen}
            setNotificationsOpen={setNotificationsOpen}
          />

          <main
            className={`flex-1 p-4 lg:p-8 !overflow-x-hidden ${
              collapsed ? "!w-[calc(100vw-4.5rem)]" : "!w-[calc(100vw-13rem)]"
            } transition-all`}
          >
            <Breadcrumbs />
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
