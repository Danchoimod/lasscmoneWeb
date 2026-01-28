"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronDown, Menu, X, User } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Mods", hasDropdown: true },
    { name: "Maps", hasDropdown: true },
    { name: "Skins", hasDropdown: true },
    { name: "Texture Packs", hasDropdown: true },
    { name: "Scripts", hasDropdown: true },
    { name: "Help", hasDropdown: true },
    { name: "Submission", hasDropdown: false },
  ];

  return (
    <header className="sticky top-0 z-50 w-full shadow-md font-sans">
      {/* Top Navbar */}
      <nav className="flex items-center bg-[#222222] text-[#E0E0E0] h-12 w-full text-sm px-2 gap-2">
        
        {/* Logo */}
        <Link href="/" className="flex items-center px-2 cursor-pointer shrink-0">
          <Image
            src="/icons/icon.jpg"
            alt="LF App Icon"
            width={28}
            height={28}
            className="rounded-sm" // Bo nhẹ cho icon đồng bộ
            priority
          />
        </Link>

        {/* 🔍 Mobile Search Button (Thay thế cho Input) */}
        <button className="flex md:hidden flex-1 items-center bg-[#333] hover:bg-[#444] rounded px-3 h-8 text-gray-400 transition-colors">
          <Search className="w-4 h-4 mr-2" />
          <span className="text-xs">Search...</span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center flex-1 h-full px-2">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center px-3 h-full hover:bg-[#333333] cursor-pointer transition-colors whitespace-nowrap"
            >
              <span>{item.name}</span>
              {item.hasDropdown && (
                <ChevronDown className="ml-1 w-3 h-3 text-gray-400" />
              )}
            </div>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Desktop actions */}
          <Link 
            href="/download"
            className="hidden md:block bg-[#D4A017] hover:bg-[#C19214] text-white font-bold px-3 py-1 rounded-sm text-xs"
          >
            DOWNLOAD
          </Link>

          <Link 
            href="/login"
            className="hidden md:block bg-[#4CAF50] hover:bg-[#45a049] text-white font-bold px-3 py-1 rounded-sm text-xs"
          >
            LOGIN
          </Link>

          <Search className="hidden md:block w-5 h-5 mx-2 cursor-pointer hover:text-white" />

          {/* 👤 User Avatar Square (Mobile & Desktop) */}
          <Link href="/profile" className="p-1">
            <div className="w-8 h-8 bg-[#444] border border-[#555] rounded-sm flex items-center justify-center overflow-hidden hover:border-[#D4A017] transition-all">
              {/* Nếu có ảnh thật thì dùng <Image />, không thì dùng Icon User */}
              <User className="w-5 h-5 text-gray-300" />
              {/* <Image src="/avatar.jpg" width={32} height={32} alt="User" /> */}
            </div>
          </Link>

          {/* Hamburger Menu Mobile */}
          <button 
            onClick={() => setOpen(!open)} 
            className="md:hidden p-1 text-gray-300 hover:text-white"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="absolute top-12 left-0 w-full md:hidden bg-[#1E1E1E] text-[#E0E0E0] border-t border-[#333] shadow-lg max-h-[calc(100vh-48px)] overflow-y-auto">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between px-4 py-4 border-b border-[#2a2a2a] hover:bg-[#333] cursor-pointer"
            >
              <span className="font-medium">{item.name}</span>
              {item.hasDropdown && (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </div>
          ))}

          <div className="flex gap-2 p-4 bg-[#181818]">
            <Link 
              href="/download"
              className="flex-1 bg-[#D4A017] text-white font-bold py-3 text-sm text-center rounded-sm"
              onClick={() => setOpen(false)}
            >
              DOWNLOAD
            </Link>
            <Link 
              href="/login"
              className="flex-1 bg-[#4CAF50] text-white font-bold py-3 text-sm text-center rounded-sm"
              onClick={() => setOpen(false)}
            >
              LOGIN
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;