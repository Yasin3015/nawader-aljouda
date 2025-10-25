// src/components/Dashboard/SaleChart.jsx
import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useTranslation } from 'react-i18next';
import { weeklyData, monthlyData, yearlyData } from '../../FakeData/chartData';

const SaleChart = () => {
  const { t } = useTranslation();
  const [period, setPeriod] = useState('monthly');

  const data = useMemo(() => {
    if (period === 'weekly') return weeklyData;
    if (period === 'monthly') return monthlyData;
    return yearlyData;
  }, [period]);

  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{t('saleGraph')}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setPeriod('weekly')}
            className={`px-4 py-1.5 rounded text-sm ${period === 'weekly' ? 'bg-emerald-600 text-white' : 'text-gray-600 bg-gray-100'}`}
          >
            {t('weekly')}
          </button>
          <button
            onClick={() => setPeriod('monthly')}
            className={`px-4 py-1.5 rounded text-sm ${period === 'monthly' ? 'bg-emerald-600 text-white' : 'text-gray-600 bg-gray-100'}`}
          >
            {t('monthly')}
          </button>
          <button
            onClick={() => setPeriod('yearly')}
            className={`px-4 py-1.5 rounded text-sm ${period === 'yearly' ? 'bg-emerald-600 text-white' : 'text-gray-600 bg-gray-100'}`}
          >
            {t('yearly')}
          </button>
        </div>
      </div>

      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.6}/>
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#f3f3f3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fill="url(#colorGreen)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SaleChart;
