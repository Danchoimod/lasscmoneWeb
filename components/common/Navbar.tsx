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
    <header className="sticky top-0 z-50 w-full shadow-sm font-sans border-b border-gray-200">
      {/* Top Navbar */}
      <nav className="flex items-center bg-white text-gray-700 h-14 w-full text-sm px-4 gap-2">
        
        {/* Logo - Removed rounded-md */}
        <Link href="/" className="flex items-center px-2 cursor-pointer shrink-0">
          <Image
            src="/icons/icon.jpg"
            alt="LF App Icon"
            width={32}
            height={32}
            className="rounded-none shadow-sm"
            priority
          />
        </Link>

        {/* 🔍 Mobile Search Button - Changed to rounded-none */}
        <button className="flex md:hidden flex-1 items-center bg-gray-100 hover:bg-gray-200 rounded-none px-3 h-9 text-gray-500 transition-colors">
          <Search className="w-4 h-4 mr-2" />
          <span className="text-xs">Search...</span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center flex-1 h-full px-2">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center px-4 h-full hover:text-blue-600 hover:bg-gray-50 cursor-pointer transition-all whitespace-nowrap font-medium"
            >
              <span>{item.name}</span>
              {item.hasDropdown && (
                <ChevronDown className="ml-1 w-3 h-3 text-gray-400" />
              )}
            </div>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Search className="hidden md:block w-5 h-5 mx-2 cursor-pointer text-gray-500 hover:text-blue-600 transition-colors" />

          {/* Download Button - Changed to rounded-none */}
          <Link 
            href="/download"
            className="hidden md:block bg-[#D4A017] hover:bg-[#C19214] text-white font-bold px-4 py-1.5 rounded-none text-xs transition-colors"
          >
            DOWNLOAD
          </Link>

          {/* Login Button - Changed to rounded-none */}
          <Link
            href="/login"
            className="hidden md:block bg-[#4CAF50] hover:bg-[#45a049] text-white font-bold px-3 py-1 rounded-none text-xs"
          >
            LOGIN
          </Link>

          {/* 👤 User Avatar - Changed rounded-full to rounded-none */}
          <Link href="/profile" className="p-1">
            <div className="w-9 h-9 bg-gray-100 border border-gray-200 rounded-none flex items-center justify-center overflow-hidden hover:border-blue-500 transition-all">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          </Link>

          {/* Hamburger Menu Mobile */}
          <button 
            onClick={() => setOpen(!open)} 
            className="md:hidden p-1 text-gray-600 hover:text-black"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="absolute top-14 left-0 w-full md:hidden bg-white text-gray-800 border-t border-gray-100 shadow-xl max-h-[calc(100vh-56px)] overflow-y-auto">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between px-6 py-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer"
            >
              <span className="font-medium text-gray-700">{item.name}</span>
              {item.hasDropdown && (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </div>
          ))}

          <div className="flex flex-col gap-2 p-6 bg-gray-50">
            {/* Mobile Buttons - Changed to rounded-none */}
            <Link 
              href="/download"
              className="w-full bg-[#D4A017] text-white font-bold py-3 text-sm text-center rounded-none shadow-sm"
              onClick={() => setOpen(false)}
            >
              DOWNLOAD
            </Link>
            <Link
              href="/login"
              className="w-full bg-[#4CAF50] text-white font-bold py-3 text-sm text-center rounded-none"
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