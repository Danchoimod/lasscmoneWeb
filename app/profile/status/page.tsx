import React from 'react';

// SectionHeading component definition
interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

const SectionHeading = ({ children, className = '' }: SectionHeadingProps) => (
  <h2 className={`text-xl font-bold text-zinc-800 border-b border-zinc-100 pb-3 flex items-center gap-3 ${className}`}>
    {children}
  </h2>
);

export default function StatusPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 bg-white p-8 border border-zinc-200 rounded-sm shadow-sm">
      <SectionHeading>Activity Status</SectionHeading>
      <div className="py-20 flex flex-col items-center justify-center text-zinc-300">
        <span className="font-bold text-4xl opacity-20 uppercase tracking-tighter">No Activity</span>
        <p className="font-medium uppercase tracking-widest mt-2 text-[10px] text-zinc-400">Everything is up to date</p>
      </div>
    </div>
  );
}
