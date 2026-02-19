"use client";

import React, { useState } from "react";
import Carousel from "@/components/features/Carousel";
import FilterSection from "@/components/features/FilterSection";
import ContentGrid from "@/components/features/ContentGrid";

export default function HomePage() {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (slug: string | null) => {
    setSelectedCategorySlug(slug);
    // Optionally clear search when category changes, or vice-versa
    if (slug) setSearchQuery("");
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query) setSelectedCategorySlug(null);
  };

  return (
    <div className="bg-[#F6F6F6] font-sans text-zinc-900">
      {/* Hero Carousel Section */}
      <Carousel />

      {/* Main Content Area */}
      <div className="w-full pb-20">
        {/* Search and Filters */}
        <FilterSection
          onCategoryChange={handleCategoryChange}
          onSearchChange={handleSearchChange}
        />

        {/* Content Grid */}
        <ContentGrid
          categorySlug={selectedCategorySlug}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}
