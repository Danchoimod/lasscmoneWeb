'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function ProfileSidebar() {
    const pathname = usePathname();

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!confirm('Are you sure you want to logout?')) return;

        try {
            await signOut({ callbackUrl: '/login' });
        } catch (error) {
            console.error('Logout failed:', error);
            alert('Failed to logout. Please try again.');
        }
    };

    const menuItems = [
        { href: '/profile', label: 'User Profile' },
        { href: '/profile/follow', label: 'Following List' },
        { href: '/profile/project', label: 'My Projects' },
    ];

    return (
        <div className="flex flex-col bg-white border border-[#D1D4D7] overflow-hidden">
            {/* Sidebar Header */}
            <div className="p-4 bg-[#F8F9FA] border-b border-[#EEE]">
                <h2 className="text-[11px] font-bold text-[#555] uppercase tracking-wider">Account Settings</h2>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block px-5 py-4 text-[11px] font-bold uppercase tracking-wide border-b border-[#EEE] transition-colors ${isActive
                                ? 'bg-[#FDFDFD] text-[#111] border-l-[4px] border-l-[#333]'
                                : 'text-[#666] hover:bg-[#F9F9F9] hover:text-[#111]'
                                }`}
                        >
                            {item.label}
                        </Link>
                    );
                })}

                {/* Logout Action */}
                <button
                    onClick={handleLogout}
                    className="w-full text-left block px-5 py-4 text-[11px] font-bold uppercase tracking-wide text-red-600 hover:bg-red-50 border-b border-[#EEE] transition-colors"
                >
                    Logout / Exit
                </button>
            </nav>
        </div>
    );
}
