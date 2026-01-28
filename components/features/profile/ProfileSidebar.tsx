import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type Section = 'profile' | 'follow' | 'project' | 'status';

export default function ProfileSidebar() {
  const pathname = usePathname();

  const menuItems: { href: string; label: string }[] = [
    { href: '/profile', label: 'Profile' },
    { href: '/profile/follow', label: 'My Follow' },
    { href: '/profile/project', label: 'Project' },
    { href: '/profile/status', label: 'Status' },
  ];

  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <div className="sticky top-28 space-y-4">
        <div className="border border-zinc-200 p-5 bg-white rounded-sm shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Settings</span>
          <h1 className="text-xl font-bold text-zinc-800 mt-0.5">Account Dashboard</h1>
        </div>

        <nav className="flex flex-col border border-zinc-200 bg-white rounded-sm shadow-sm overflow-hidden">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-left px-5 py-3.5 text-sm font-bold transition-all border-b border-zinc-100 last:border-b-0 ${
                  isActive
                    ? 'bg-zinc-50 text-blue-600 border-l-4 border-l-blue-500'
                    : 'text-zinc-600 hover:bg-zinc-50 border-l-4 border-l-transparent'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/login"
            className="text-left px-5 py-3.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-all flex items-center justify-between group border-t border-zinc-100 border-l-4 border-l-transparent"
          >
            Logout
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </Link>
        </nav>

        <div className="p-4 bg-white border border-zinc-200 rounded-sm text-[10px] text-zinc-400 font-bold uppercase tracking-wider text-center shadow-sm">
          Last login: Jan 29, 2026
        </div>
      </div>
    </aside>
  );
}
