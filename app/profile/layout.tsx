'use client';

import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import ProfileSidebar from '@/components/features/profile/ProfileSidebar';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50 text-zinc-900 font-sans">
      <Navbar />
      
      <div className="flex-1 flex flex-col md:flex-row w-full max-w-7xl mx-auto py-12 px-6 gap-8">
        <ProfileSidebar />

        <main className="flex-1 bg-white">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
