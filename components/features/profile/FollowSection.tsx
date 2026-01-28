import React from 'react';
import SectionHeading from '@/components/ui/SectionHeading';

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

export default function FollowSection() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 bg-white p-8 border border-zinc-200 rounded-sm shadow-sm">
      <SectionHeading>My Following</SectionHeading>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {followedUsers.map((user) => (
          <div key={user.id} className="border border-zinc-200 rounded-sm p-0 flex flex-col hover:shadow-md transition-all cursor-pointer group bg-zinc-50/30 overflow-hidden">
            <div className="aspect-square bg-zinc-100 flex items-center justify-center relative overflow-hidden">
              <div className="w-full h-full bg-zinc-200" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/5 transition-opacity">
                <span className="text-[10px] uppercase font-bold text-zinc-600 bg-white border border-zinc-200 px-2 py-1 shadow-sm">View Profile</span>
              </div>
            </div>
            <div className="p-3 bg-white border-t border-zinc-100">
              <span className="font-bold text-xs text-zinc-700 truncate block">{user.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
