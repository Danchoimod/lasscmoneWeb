import { Maximize2, MoreVertical, Edit2 } from 'lucide-react';
import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  total?: string | number;
  icon?: ReactNode;
  trend?: string;
  trendType?: 'up' | 'down';
}

export const StatCard = ({ title, value, total, icon, trend, trendType }: StatCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between relative group">
    <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
       <div className="flex flex-col space-y-1 bg-gray-50 border rounded p-1 shadow-sm">
          <Maximize2 size={14} className="text-gray-400 cursor-pointer hover:text-blue-500" />
          <MoreVertical size={14} className="text-gray-400 cursor-pointer" />
          <Edit2 size={14} className="text-gray-400 cursor-pointer hover:text-green-500" />
       </div>
    </div>
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
        {total ? (
           <>
              <p className="text-xs text-gray-400 mb-2">Online / Total</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold text-gray-800">{value}</span>
                <span className="text-2xl font-semibold text-gray-300">/ {total}</span>
              </div>
           </>
        ) : (
          <div className="mt-2">
            <span className="text-4xl font-bold text-gray-800">{value}</span>
            {trend && (
              <span className={`ml-2 text-sm font-medium ${trendType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {trend}
              </span>
            )}
          </div>
        )}
      </div>
      {icon && <div className="text-gray-400">{icon}</div>}
    </div>
  </div>
);
