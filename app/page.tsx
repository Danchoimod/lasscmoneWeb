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

        {/* SEO Rich Text Section - Improving for Google AdSense */}
        <div className="max-w-6xl mx-auto px-6 mt-16 pt-16 border-t border-zinc-200">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tighter text-zinc-900 uppercase">
              LF Launcher - Your All-in-One Minecraft Platform
            </h2>
            <p className="max-w-3xl mx-auto text-zinc-600 leading-relaxed text-base italic">
              "Built from zero, reaching for miracles." LF Launcher is more than just a launcher; it's a bridge helping the Minecraft community access the highest quality content on both Android and PC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            <div className="space-y-4 group">
              <div className="w-12 h-12 bg-[#00a63e] text-white flex items-center justify-center rounded-none font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
                01
              </div>
              <h3 className="text-xl font-bold tracking-tight">Cross-Platform Experience</h3>
              <p className="text-zinc-500 leading-relaxed text-sm">
                LF Launcher is optimized for both Android and Windows operating systems. We understand the differences between Bedrock and Java Editions, providing specialized installation solutions to ensure smooth gameplay.
              </p>
            </div>
            
            <div className="space-y-4 group">
              <div className="w-12 h-12 bg-[#4CAF50] text-white flex items-center justify-center rounded-none font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
                02
              </div>
              <h3 className="text-xl font-bold tracking-tight">Rigorous Quality Control</h3>
              <p className="text-zinc-500 leading-relaxed text-sm">
                Safety is our top priority. Every Mod, Map, and Resource Pack uploaded to LF Launcher undergoes a thorough check for malware and compatibility. You can safely install new content into your game.
              </p>
            </div>

            <div className="space-y-4 group">
              <div className="w-12 h-12 bg-[#D4A017] text-white flex items-center justify-center rounded-none font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
                03
              </div>
              <h3 className="text-xl font-bold tracking-tight">One-Click Installation</h3>
              <p className="text-zinc-500 leading-relaxed text-sm">
                Forget manual file extraction or folder moving. With our technology, installing complex Add-ons is as simple as a single click. LF Launcher automatically handles `.mcpack` and `.mcaddon` file structures.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-16 border-t border-zinc-100">
            <div>
              <h2 className="text-2xl font-black mb-6 tracking-tighter uppercase italic border-l-4 border-[#00a63e] pl-4">
                The Missions of LASSCMONE STUDIO
              </h2>
              <p className="text-zinc-600 leading-loose text-sm mb-4">
                We provide more than just a download directory. Our mission is to create an ecosystem where content creators can proudly share their work and players can enjoy it with ease.
              </p>
              <p className="text-zinc-600 leading-loose text-sm">
                Every line of code written at the Studio aims to remove technical barriers for mobile players, bringing a modding experience comparable to that on a PC.
              </p>
            </div>
            <div className="bg-white p-8 border border-zinc-200 shadow-sm flex flex-col justify-center">
              <h2 className="text-2xl font-black mb-6 tracking-tighter uppercase text-zinc-800">Community & Support</h2>
              <p className="text-zinc-600 leading-loose text-sm mb-6">
                Having trouble with installation? Don't worry! Our support team and a community of thousands on Discord are ready to help you 24/7.
              </p>
              <div className="flex gap-4">
                <a href="/about-us" className="text-sm font-bold text-[#00a63e] hover:underline uppercase">Learn More →</a>
                <a href="/android-install-guide" className="text-sm font-bold text-[#00a63e] hover:underline uppercase">Install Guide →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
