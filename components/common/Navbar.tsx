"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ChevronDown, Menu, X, User } from "lucide-react";

interface Category {
  id: number;
  name: string;
  param: string;
  parentId: number | null;
  children?: Category[];
}

interface NavbarProps {
  initialCategories?: Category[];
}

const Navbar = ({ initialCategories = [] }: NavbarProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [categories] = useState<Category[]>(initialCategories);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState<string | null>(null);

  // Search states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navItems = categories.map(cat => ({
    name: cat.name,
    hasDropdown: cat.children && cat.children.length > 0,
    param: cat.param,
    children: cat.children
  }));

  // Add "Submission" if it's always there and not in API, 
  // or just use API if it's supposed to be dynamic.
  // The original has Submission as hasDropdown: false.
  if (categories.length > 0) {
    navItems.push({ name: "Submission", hasDropdown: false, param: "profile/project", children: [] });
    navItems.push({
      name: "Help",
      hasDropdown: true,
      param: "", // Set to empty string if you don't want the parent "Help" to be a link
      children: [
        { id: 1, name: "Terms", param: "terms", parentId: null },
        { id: 2, name: "Privacy", param: "privacy-policy", parentId: null },
      ],
    });
  }

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm font-sans border-b border-gray-200">
      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute inset-0 z-[100] bg-white flex items-center px-4 md:px-8 animate-in fade-in slide-in-from-top duration-200">
          <form onSubmit={handleSearchSubmit} className="flex items-center w-full max-w-6xl mx-auto gap-4">
            <Search className="w-5 h-5 text-gray-400" />
            <div className="flex-1 relative">
              <input
                autoFocus
                type="text"
                placeholder="Search for projects, mods, creators..."
                className="w-full bg-transparent border-none outline-none text-lg py-2 placeholder-gray-400 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Escape' && setIsSearchOpen(false)}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
              }}
              className="p-2 hover:bg-gray-100 rounded-none text-gray-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </form>
        </div>
      )}

      {/* Top Navbar */}
      <nav className="flex items-center bg-white text-gray-700 h-14 w-full text-sm px-4 gap-2">

        {/* Logo - Removed rounded-md */}
        <Link href="/" className="flex items-center px-2 cursor-pointer shrink-0">
          <Image
            src="/icons/icon.jpg"
            alt="LF Launcher Logo"
            width={32}
            height={32}
            className="object-cover rounded-none shadow-sm"
            priority
          />
        </Link>

        {/* 🔍 Mobile Search Button - Changed to rounded-none */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex md:hidden flex-1 items-center bg-gray-100 hover:bg-gray-200 rounded-none px-3 h-9 text-gray-500 transition-colors"
        >
          <Search className="w-4 h-4 mr-2" />
          <span className="text-xs">Search...</span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center flex-1 h-full px-2">
          {navItems.map((item) => (
            <div key={item.name} className="relative group h-full">
              {item.param ? (
                <Link
                  href={`/${item.param}`}
                  className="flex items-center px-4 h-full hover:text-blue-600 hover:bg-gray-50 cursor-pointer transition-all whitespace-nowrap font-medium"
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="ml-1 w-3 h-3 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  )}
                </Link>
              ) : (
                <div className="flex items-center px-4 h-full text-gray-700 cursor-default whitespace-nowrap font-medium">
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown className="ml-1 w-3 h-3 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  )}
                </div>
              )}

              {/* Dropdown Menu */}
              {item.hasDropdown && (
                <div className="absolute left-0 top-full hidden group-hover:block w-48 bg-white border border-gray-200 shadow-lg py-2 z-50">
                  {item.children?.map((child) => (
                    <Link
                      key={child.id}
                      href={`/${child.param}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={() => setIsSearchOpen(true)}>
            <Search className="hidden md:block w-5 h-5 mx-2 cursor-pointer text-gray-500 hover:text-blue-600 transition-colors" />
          </button>

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
            <div key={item.name} className="flex flex-col border-b border-gray-50">
              <div className="flex items-center justify-between hover:bg-gray-50">
                {item.param ? (
                  <Link
                    href={`/${item.param}`}
                    className="flex-1 px-6 py-4 font-medium text-gray-700"
                    onClick={() => setOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className="flex-1 px-6 py-4 font-medium text-gray-700 cursor-default">
                    {item.name}
                  </span>
                )}

                {item.hasDropdown && (
                  <button
                    className="px-6 py-4 border-l border-gray-100 flex items-center justify-center transition-colors hover:text-blue-600"
                    onClick={() => setActiveMobileSubmenu(activeMobileSubmenu === item.name ? null : item.name)}
                  >
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${activeMobileSubmenu === item.name ? "rotate-180" : ""}`} />
                  </button>
                )}
              </div>

              {/* Mobile Submenu Items */}
              {item.hasDropdown && activeMobileSubmenu === item.name && (
                <div className="bg-gray-50 py-1">
                  {item.children?.map((child) => (
                    <Link
                      key={child.id}
                      href={`/${child.param}`}
                      className="block px-10 py-3 text-sm text-gray-600 hover:text-blue-600 border-l-2 border-transparent hover:border-blue-600 transition-all font-medium"
                      onClick={() => setOpen(false)}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
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