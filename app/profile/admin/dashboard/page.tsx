'use client';

import {
  Server,
  Box,
  ChevronRight,
  Monitor,
  Maximize2,
  MoreVertical,
  Edit2
} from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { StatCard } from '@/components/dashboard/StatCard';
import { InfoItem } from '@/components/dashboard/InfoItem';
import { MainLayout } from '@/app/profile/admin/layouts/MainLayout';

const data = [
  { name: '13', value: 30 },
  { name: '14', value: 45 },
  { name: '15', value: 25 },
  { name: '16', value: 60 },
  { name: '17', value: 35 },
  { name: '18', value: 80 },
  { name: '19', value: 20 },
];

export default function Home() {
  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="flex items-center text-xs text-gray-400 mb-6">
        <span>Control Panel</span>
        <ChevronRight size={12} className="mx-1" />
        <span className="text-gray-600 font-medium">Dashboard</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard title="Category" value="1" total="3" />

        {/* Custom Stat Card with Overlay */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between relative group">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white px-2 py-1 border rounded text-[10px] text-gray-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Min Height: 200px | Width: 3/12 Block
          </div>
          <div className="absolute left-[-35px] top-1/2 -translate-y-1/2 flex flex-col space-y-1 bg-white border rounded shadow-sm p-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="p-1 cursor-pointer"><Maximize2 size={12} /></div>
            <div className="h-px bg-gray-100 mx-1"></div>
            <div className="p-1 cursor-pointer"><MoreVertical size={12} /></div>
            <div className="h-px bg-gray-100 mx-1"></div>
            <div className="p-1 cursor-pointer hover:text-blue-500"><Edit2 size={12} /></div>
          </div>

          <div className="mb-2">
            <h3 className="text-sm font-bold text-gray-800 uppercase">You can change all!</h3>
            <p className="text-xs text-gray-400">Running / Total</p>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-bold text-gray-800">1</span>
            <span className="text-2xl font-semibold text-gray-300">/ 5</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-sm font-bold text-gray-500 mb-1">Login Count</h3>
          <p className="text-xs text-gray-400 mb-2">Failed : Successful</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-bold text-gray-800 tracking-wider">0:2</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-sm font-bold text-gray-500 mb-1">System Resource</h3>
          <p className="text-xs text-gray-400 mb-2">CPU, Memory Usage</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-bold text-gray-800">24%</span>
            <span className="text-2xl font-semibold text-gray-300">100%</span>
          </div>
        </div>
      </div>

      {/* Lower Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Data Overview */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-base font-bold text-gray-800 mb-6 border-b pb-2">Data Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
            <InfoItem label="Node.js Version" value="v16.20.2" />
            <InfoItem label="Panel Version" value="10.0.4" />
            <InfoItem label="Matched Category Version" value="4.1.0" />
            <InfoItem label="Process User" value="wangku" />

            <InfoItem label="Panel Time" value="2024/3/19 19:56:18" />
            <InfoItem label="Browser Time" value="2024/3/19 19:56:18" />
            <InfoItem label="Temporary Banned IPs" value="0" />
            <InfoItem label="Blocked Accesses" value="2" />

            <InfoItem label="Memory" value="15.9GB/16GB" />
            <InfoItem label="Linux Load" value="7.05~5.94~5.43" />
            <InfoItem label="Panel Memory Usage" value="65.4MB" />
            <InfoItem label="Hostname" value="Wangkun-Macbook-Pro.local" />

            <div className="col-span-2">
              <span className="text-xs text-gray-400">OS Version</span>
              <p className="text-xs font-medium text-gray-700 leading-tight mt-1 max-w-md">
                Darwin Kernel Version 23.0.0: Fri Sep 15 14:41:43 PDT 2023; root:xnu-10002.1.13~1/RELEASE_ARM64_T6000 23.0.0
              </p>
            </div>
            <div className="col-span-2">
              <span className="text-xs text-gray-400">OS Type</span>
              <p className="text-sm font-medium text-gray-700 mt-1">Darwin darwin</p>
            </div>
          </div>
        </div>

        {/* Quick Start */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-base font-bold text-gray-800 mb-6 border-b pb-2">Quick Start</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-start bg-[#f9f9f9] hover:bg-gray-100 border-none p-4 rounded text-sm text-gray-700 transition-colors shadow-sm cursor-pointer">
              <Server size={16} className="mr-3 text-gray-600" /> Deploy Minecraft Server
            </button>
            <button className="w-full flex items-center justify-start bg-[#f9f9f9] hover:bg-gray-100 border-none p-4 rounded text-sm text-gray-700 transition-colors shadow-sm cursor-pointer">
              <Box size={16} className="mr-3 text-gray-600" /> Deploy Steam Game Server
            </button>
            <button className="w-full flex items-center justify-start bg-[#f9f9f9] hover:bg-gray-100 border-none p-4 rounded text-sm text-gray-700 transition-colors shadow-sm cursor-pointer">
              <Monitor size={16} className="mr-3 text-gray-600" /> Deploy Console Application
            </button>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-base font-bold text-gray-800 mb-4 border-b pb-2">Interface Requests</h2>
          <div className="h-48 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-base font-bold text-gray-800 mb-4 border-b pb-2">Running Instances</h2>
          <div className="h-48 w-full flex items-end justify-between px-4 mt-4">
            {[5, 12, 4, 10, 6, 12, 5].map((h, i) => (
              <div key={i} className="flex flex-col items-center w-full group">
                <div className="w-4 bg-blue-100 rounded-t-sm transition-all group-hover:bg-blue-400" style={{ height: `${h * 10}px` }}></div>
                <span className="text-[10px] text-gray-400 mt-2">{i + 13}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
