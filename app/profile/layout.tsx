'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function ProfileSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/profile', label: 'User Profile' },
    { href: '/profile/follow', label: 'Following List' },
    { href: '/profile/project', label: 'My Projects' },
    { href: '/profile/status', label: 'Account Status' },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Title tiêu chuẩn */}
      <div className="p-4 bg-gray-200 border-b border-gray-300">
        <h2 className="text-sm font-bold text-gray-700">Account Settings</h2>
      </div>

      <nav className="flex-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-3 text-sm border-b border-gray-200 transition-none ${isActive
                ? 'bg-white text-black font-bold border-l-4 border-l-green-600'
                : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                }`}
            >
              {item.label}
            </Link>
          );
        })}

        <Link
          href="/login"
          className="block px-4 py-3 text-sm text-red-600 hover:bg-red-50 border-b border-gray-200"
        >
          Logout / Exit
        </Link>
      </nav>
    </div>
  );
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-50/50 text-zinc-900 font-sans">
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto py-12 px-6 gap-8">
        <div className="w-full md:w-64">
          <ProfileSidebar />
        </div>

        <main className="flex-1 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}
