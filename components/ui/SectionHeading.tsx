import React from 'react';

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionHeading({ children, className = '' }: SectionHeadingProps) {
  return (
    <h2 className={`text-xl font-bold text-zinc-800 border-b border-zinc-100 pb-3 flex items-center gap-3 ${className}`}>
      {children}
    </h2>
  );
}
