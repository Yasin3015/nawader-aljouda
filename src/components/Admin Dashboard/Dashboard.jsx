import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import StatCard from './StatCard';
import SaleChart from './SaleChart';
import BestSellers from './BestSellers';
import RecentOrders from './RecentOrders';
import { useTranslation } from 'react-i18next';
import { stats as statsData } from '../../FakeData/statsData';

const Dashboard = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [collapsed, setCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen]= useState(false)


  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) setCollapsed(true);
  }, []);

  return (
    <div className="min-h-screen !overflow-hidden!max-w-screen bg-gray-50 flex" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} isRtl={isRtl} />

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300`}
      >
        <Header collapsed={collapsed} setCollapsed={setCollapsed} notificationsOpen={notificationsOpen} setNotificationsOpen={setNotificationsOpen}/>

        <main className={`flex-1 p-4 lg:p-8 !overflow-x-hidden ${collapsed?"!w-[calc(100vw-4.2rem)]":"!w-[calc(100vw-12.5rem)]"} transition-all`}>
          {/* Banner */}
          <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg p-6 lg:p-8 mb-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">Dashboard</h1>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-sm text-white">Home</span>
                <span>/</span>
                <span className="text-emerald-400">Dashboard</span>
              </div>
            </div>
            <div className="absolute top-0 right-4 text-sm bg-white text-gray-900 px-3 py-1 rounded-b flex items-center gap-2">
              <span>📅</span>
              <span>Oct 11, 2023 - Nov 11, 2022</span>
            </div>
          </div>

          {/* Stats */}
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
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
