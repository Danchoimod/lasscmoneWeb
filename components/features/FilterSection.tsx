"use client";

import React from "react";
import { Search, ChevronDown } from "lucide-react";

const FilterSection = () => {
  const categories = ["All", "Addons", "Maps", "Texture Packs", "Skins", "Scripts"];
  const [activeCategory, setActiveCategory] = React.useState("All");

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 px-4">
      {/* Container chính: Chia 2 cột trên Desktop */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        
        {/* Thanh Search - Vuông vức, border đậm */}
        <div className="flex-grow flex items-center border-2 border-black bg-white px-3 py-2">
          <Search className="w-5 h-5 mr-3 text-black" />
          <input 
            type="text" 
            placeholder="search..."
            className="bg-transparent outline-none w-full text-black placeholder-zinc-400 text-sm tracking-widest"
          />
        </div>

        {/* Dropdown Sort - Thiết kế như một khối đặc */}
        <div className="relative group">
          <button className="h-full flex items-center gap-6 bg-[#222222] text-white px-6 py-2 hover:bg-zinc-800 transition-colors w-full md:w-auto justify-between">
            <span className="text-sm tracking-tight">Sort by: Latest</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Danh mục - Đã loại bỏ [] và uppercase */}
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-1.5 text-sm tracking-wide border transition-all ${
              activeCategory === cat 
                ? "bg-green-600 border-green-600 text-white" 
                : "border-zinc-300 text-zinc-500 hover:border-black hover:text-black"
            }`}
          >
            {/* Đã bỏ dấu ngoặc và không dùng class uppercase */}
            {cat}
          </button>
        ))}
      </div>

      {/* Đường kẻ phân cách phẳng */}
      <div className="w-full h-[1px] bg-zinc-200 mt-6" />
    </div>
  );
};

export default FilterSection;