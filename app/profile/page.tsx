'use client';

import React, { ReactNode } from 'react';

// 1. Định nghĩa Interface cho Props
interface SectionHeadingProps {
  children: ReactNode; // ReactNode cho phép nhận cả text, thẻ html, hoặc component con
}

// 2. Sử dụng Interface trong Component
const SectionHeading = ({ children }: SectionHeadingProps) => (
  <div className="mb-8 border-b-2 border-gray-800 pb-2">
    <h2 className="text-xl font-bold text-gray-800">{children}</h2>
  </div>
);

// Đối với các Input, bạn cũng nên định nghĩa Type để an toàn
interface ClassicInputProps {
  label: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
}

const ClassicInput = ({ label, type = "text", defaultValue, placeholder }: ClassicInputProps) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold text-gray-700 uppercase tracking-tight">
      {label}
    </label>
    <input 
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="px-4 py-2 border border-gray-300 bg-gray-50 text-sm focus:bg-white focus:border-gray-800 outline-none transition-none"
    />
  </div>
);

export default function ProfilePage() {
  return (
    <div className="bg-white p-8 border border-gray-300">
      <SectionHeading>Public Profile</SectionHeading>
      
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-tight text-gray-700">Profile Picture</label>
            <div className="w-32 h-32 border border-gray-300 bg-gray-100 flex items-center justify-center cursor-pointer hover:border-gray-800 transition-none group relative overflow-hidden">
              <span className="text-gray-500 font-bold text-[10px] uppercase">Upload</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-3xl">
          <ClassicInput label="Username" defaultValue="Mod2090" />
          <ClassicInput label="Display Name" defaultValue="Lasscmone" />
          <div className="md:col-span-2">
            <ClassicInput label="Email Address" type="email" defaultValue="contact@lfweb.com" />
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <button className="bg-gray-800 hover:bg-black text-white px-8 py-2.5 text-xs font-bold uppercase tracking-widest border border-gray-800">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
