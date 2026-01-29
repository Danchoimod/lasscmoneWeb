'use client';

import React from 'react';

// Định nghĩa kiểu cho SectionHeading
interface SectionHeadingProps {
  children: React.ReactNode;
}

const SectionHeading = ({ children }: SectionHeadingProps) => (
  <div className="mb-6 border-b-2 border-gray-800 pb-2">
    <h2 className="text-xl font-bold text-gray-800">{children}</h2>
  </div>
);

const followedUsers = [
  { id: 1, name: 'Mod2090' },
  { id: 2, name: 'Lasscmone' },
  { id: 3, name: 'Steve' },
  { id: 4, name: 'Alex' },
  { id: 5, name: 'Notch' },
  { id: 6, name: 'Herobrine' },
  { id: 7, name: 'Dream' },
  { id: 8, name: 'Technoblade' },
];

export default function FollowPage() {
  return (
    // Toàn bộ container sử dụng rounded-none
    <div className="bg-white p-8 border border-gray-300 rounded-none transition-none">
      <SectionHeading>My Following</SectionHeading>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
        {followedUsers.map((user) => (
          <div 
            key={user.id} 
            className="border border-gray-300 rounded-none flex flex-col cursor-pointer group bg-gray-50 transition-none"
          >
            {/* Ảnh đại diện - Cạnh sắc (Square) */}
            <div className="aspect-square bg-gray-200 flex items-center justify-center relative overflow-hidden border-b border-gray-300 rounded-none">
              <div className="w-full h-full bg-gray-300 group-hover:bg-gray-400 transition-none" />
              
              {/* Overlay: Nút View Profile vuông vức */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-white/20 transition-none">
                <span className="text-[10px] uppercase font-bold text-gray-800 bg-white border border-gray-800 px-3 py-1.5 rounded-none shadow-none">
                  View Profile
                </span>
              </div>
            </div>

            {/* Khối thông tin người dùng */}
            <div className="p-3 bg-white rounded-none">
              <span className="font-bold text-xs text-gray-800 truncate block group-hover:text-green-700 transition-none">
                {user.name}
              </span>
              <span className="text-[10px] text-gray-400 font-medium uppercase mt-1 block">
                Member
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
