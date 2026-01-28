"use client";

import React from "react";
import { Search, ChevronDown } from "lucide-react";

const FilterSection = () => {
  const categories = ["All", "Addons", "Maps", "Texture Packs", "Skins", "Scripts"];
  const [activeCategory, setActiveCategory] = React.useState("All");

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 px-4">
      {/* Top row: Title and Sort Dropdown */}
      <div className="flex justify-between items-end mb-6">
        <div className="relative border border-green-700 px-4 py-1 flex items-center gap-4 cursor-pointer">
           <span className="text-zinc-700">Latest</span>
           <ChevronDown className="w-4 h-4 text-zinc-500" />
        </div>
      </div>

      {/* Middle row: Search Bar */}
      <div className="relative border border-zinc-200 mb-6 bg-white flex items-center px-4 py-3 shadow-sm">
        <Search className="w-5 h-5 text-zinc-400 mr-3" />
        <input 
          type="text" 
          placeholder="To search, type and hit enter"
          className="bg-transparent outline-none w-full text-zinc-700 placeholder-zinc-400"
        />
      </div>

      {/* Bottom row: Category Tabs */}
      <div className="flex gap-10 border-b border-zinc-200 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`relative pb-3 text-lg font-bold transition-colors whitespace-nowrap ${
              activeCategory === cat ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            {cat}
            {activeCategory === cat && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#4CAF50]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;
