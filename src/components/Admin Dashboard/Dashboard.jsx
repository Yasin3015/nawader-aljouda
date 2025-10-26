import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import StatCard from "./StatCard";
import SaleChart from "./SaleChart";
import BestSellers from "./BestSellers";
import RecentOrders from "./RecentOrders";
import { useTranslation } from "react-i18next";
import { stats as statsData } from "../../FakeData/statsData";

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
        {statsData.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Chart + Best sellers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <SaleChart />
        </div>
        <div>
          <BestSellers />
        </div>
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </>
  );
};

export default Dashboard;
