import React from "react";
import Carousel from "@/components/features/Carousel";
import FilterSection from "@/components/features/FilterSection";
import ContentGrid from "@/components/features/ContentGrid";
import { getCarousels, getPackages, getCategories } from "@/lib/api";

export default async function HomePage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await searchParamsPromise;
  const categorySlug = typeof searchParams.category === 'string' ? searchParams.category : null;

  // Fetch data on the server
  const [slides, packages, categories] = await Promise.all([
    getCarousels(),
    getPackages(categorySlug),
    getCategories(),
  ]);

  return (
    <div className="bg-[#F6F6F6] font-sans text-zinc-900">
      {/* Hero Carousel Section - Prefetched */}
      <Carousel initialSlides={slides} />

      {/* Main Content Area */}
      <div className="w-full pb-20">
        {/* Search and Filters - URL based */}
        <FilterSection
          initialSlug={categorySlug}
          initialCategories={categories}
        />

        {/* Content Grid - Prefetched */}
        <ContentGrid packages={packages} />
      </div>
    </div>
  );
}
