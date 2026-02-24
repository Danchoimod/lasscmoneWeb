"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown, SlidersHorizontal, X } from "lucide-react";

interface Category {
  id: number;
  name: string;
  param: string;
}

interface FilterSectionProps {
  onCategoryChange?: (categorySlug: string | null) => void;
  onSearchChange?: (query: string) => void;
  initialSlug?: string | null;
  initialSearch?: string;
  initialCategories?: Category[];
}

const FilterSection = ({ onCategoryChange, onSearchChange, initialSlug = null, initialSearch = "", initialCategories = [] }: FilterSectionProps) => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(initialSlug);
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  useEffect(() => {
    setActiveCategorySlug(initialSlug);
  }, [initialSlug]);

  useEffect(() => {
    if (initialCategories.length > 0) {
      setCategories(initialCategories);
      return;
    }
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api-backend/categories");
        const result = await response.json();
        // Bóc tách data tương tự như trong lib/api.ts
        const cats = result.status === "success" ? (result.data?.categories || result.data) : result;
        setCategories(Array.isArray(cats) ? cats : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Debounced search logic - Navigates to search page
  useEffect(() => {
    if (searchTerm === initialSearch) return;

    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      } else if (initialSearch) {
        // If we clear search, go back to home or the root of search
        router.push(window.location.pathname);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, router, initialSearch]);

  const handleCategoryClick = (slug: string | null) => {
    setActiveCategorySlug(slug);
    if (slug) {
      router.push(`/?category=${slug}`);
    } else {
      router.push("/");
    }
    onCategoryChange?.(slug);
  };

  const activeCategoryName = activeCategorySlug
    ? categories.find((c) => c.param === activeCategorySlug)?.name
    : "All";

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 px-4">
      {/* Search & Sort Row */}
      <div className="flex flex-col md:flex-row gap-0 mb-8 shadow-sm">

        {/* Search Input - Nhấn mạnh vào sự vuông vức và minimalist */}
        <div className="flex-grow flex items-center border border-gray-300 bg-white px-4 py-3 focus-within:border-black transition-colors">
          <Search className="w-4 h-4 mr-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search for mods, maps, or creators..."
            className="bg-transparent outline-none w-full text-sm text-gray-800 placeholder-gray-400 tracking-tight"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-gray-400 hover:text-black transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown - Khối màu xám nhạt để phân biệt với Search */}
        <div className="relative border-y border-x md:border-l-0 border-gray-300">
          <button className="h-full flex items-center gap-8 bg-gray-50 hover:bg-gray-100 text-gray-700 px-6 py-3 transition-colors w-full md:w-auto justify-between group">
            <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <SlidersHorizontal className="w-3 h-3" />
              Latest
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
          </button>
        </div>
      </div>

      {/* Category Tabs - Hiện đại, không bo góc */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryClick(null)}
          className={`px-6 py-2 text-xs font-bold uppercase tracking-widest border transition-all duration-200 ${activeCategorySlug === null
            ? "bg-green-600 border-green-600 text-white shadow-md"
            : "bg-white border-gray-200 text-gray-500 hover:border-black hover:text-black"
            }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.param)}
            className={`px-6 py-2 text-xs font-bold uppercase tracking-widest border transition-all duration-200 ${activeCategorySlug === cat.param
              ? "bg-green-600 border-green-600 text-white shadow-md"
              : "bg-white border-gray-200 text-gray-500 hover:border-black hover:text-black"
              }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Line trang trí bên dưới */}
      <div className="relative mt-8">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-start">
          <span className="pr-3 bg-white text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
            Showing {activeCategoryName} Content
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;