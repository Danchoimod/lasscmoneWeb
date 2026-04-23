'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { showAlert, showConfirm } from '@/lib/swal';

export default function ProfileSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    
    // Hardcoded admin email check
    const isAdmin = session?.user?.email === 'tranphupham1989@gmail.com';

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        const confirmed = await showConfirm('Logout', 'Are you sure you want to logout?');
        if (!confirmed) return;

        try {
            await signOut({ callbackUrl: '/login' });
        } catch (error) {
            console.error('Logout failed:', error);
            await showAlert('Error', 'Failed to logout. Please try again.', 'error');
        }
    };

    const userMenuItems = [
        { href: '/profile', label: 'User Profile' },
        { href: '/profile/follow', label: 'Following List' },
        { href: '/profile/project', label: 'My Projects' },
    ];

    const adminMenuItems = [
        { href: '/profile/admin/dashboard', label: 'Dashboard' },
        { href: '/profile/admin/packages', label: 'Packages' },
        { href: '/profile/admin/categories', label: 'Categories' },
        { href: '/profile/admin/users', label: 'Users' },
        { href: '/profile/admin/versions', label: 'Versions' },
        { href: '/profile/admin/app-updates', label: 'App Updates' },
        { href: '/profile/admin/carousels', label: 'Carousels' },
        { href: '/profile/admin/comments', label: 'Comments' },
        { href: '/profile/admin/reports', label: 'Reports' },
        { href: '/profile/admin/images', label: 'Images' },
    ];

    return (
        <div className="flex flex-col bg-white border border-[#D1D4D7] overflow-hidden">
            {/* Sidebar Header */}
            <div className="p-4 bg-[#F8F9FA] border-b border-[#EEE]">
                <h2 className="text-[11px] font-bold text-[#555] uppercase tracking-wider">Account Settings</h2>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1">
                {userMenuItems.map((item) => {
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

                {isAdmin && (
                    <>
                        <div className="p-4 bg-[#F8F9FA] border-b border-[#EEE] mt-4">
                            <h2 className="text-[11px] font-bold text-[#D4A017] uppercase tracking-wider">Admin Panel</h2>
                        </div>
                        {adminMenuItems.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`block px-5 py-4 text-[11px] font-bold uppercase tracking-wide border-b border-[#EEE] transition-colors ${isActive
                                        ? 'bg-[#FDFDFD] text-[#D4A017] border-l-[4px] border-l-[#D4A017]'
                                        : 'text-[#666] hover:bg-[#F9F9F9] hover:text-[#D4A017]'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </>
                )}

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
