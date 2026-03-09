import React from 'react';
import ProfileSidebar from './ProfileSidebar';
import ScrollToTop from '@/components/common/ScrollToTop';

export const dynamic = 'force-dynamic';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-50/50 text-zinc-900 font-sans">
      <ScrollToTop />
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto py-12 px-6 gap-8">
        <aside className="w-full md:w-64 shrink-0 self-start">
          <div className="sticky top-[80px]">
            <ProfileSidebar />
          </div>
        </aside>

        <main className="flex-1 bg-white min-h-[600px] shadow-sm ring-1 ring-gray-200">
          {children}
        </main>
      </div>
    </div>
  );
}
