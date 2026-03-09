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
  const [slides, packagesData, categories] = await Promise.all([
    getCarousels(),
    getPackages(categorySlug),
    getCategories(),
  ]);

  const packages = packagesData.packages;

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
        <ContentGrid
          packages={packages}
          initialPagination={packagesData.pagination}
          category={categorySlug}
        />

        {/* SEO Rich Text Section */}
        <div className="max-w-6xl mx-auto px-6 mt-16 pt-16 border-t border-zinc-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4 tracking-tighter">Ultimate Minecraft Launcher Experience</h2>
              <p className="text-zinc-500 leading-relaxed text-sm">
                LF Launcher is designed to provide the most seamless Minecraft experience on both Android and PC. Our platform features a curated collection of high-quality mods, maps, resource packs, and skins carefully selected to enhance your gameplay. Whether you're looking for survival challenges or creative tools, LF Launcher has everything you need.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 tracking-tighter">Safe & Easy Content Installation</h2>
              <p className="text-zinc-500 leading-relaxed text-sm">
                Security and ease of use are our top priorities. All content hosted on LF Launcher goes through a verification process to ensure safety. Our one-click installation system takes care of all the technical details, so you can spend less time configuring and more time playing the game you love.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
