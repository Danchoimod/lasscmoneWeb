"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ContentGrid from "@/components/features/ContentGrid";
import FilterSection from "@/components/features/FilterSection";
import Link from "next/link";
import { ChevronRight, Search as SearchIcon } from "lucide-react";

function SearchContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q") || "";

    const [searchQuery, setSearchQuery] = React.useState(initialQuery);
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        // Sync with URL without reloading
        const params = new URLSearchParams(window.location.search);
        if (query) {
            params.set("q", query);
        } else {
            params.delete("q");
        }
        router.replace(`/search?${params.toString()}`, { scroll: false });
    };

    const handleCategoryChange = (slug: string | null) => {
        setSelectedCategory(slug);
        if (slug) setSearchQuery(""); // Clear search when picking a category or keep both? 
        // Usually on a search page, we want to filter search results by category, 
        // but based on HomePage logic, they are exclusive.
    };

    return (
        <div className="bg-[#F6F6F6] min-h-screen font-sans text-zinc-900 pb-20">
            {/* Breadcrumbs Header */}
            <div className="bg-white border-b border-gray-200 py-6">
                <div className="max-w-6xl mx-auto px-4">
                    <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
                        <Link href="/" className="hover:text-black transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-zinc-800">Search Results</span>
                    </nav>
                    <div className="flex items-end gap-3">
                        <SearchIcon className="w-8 h-8 text-green-600 mb-1" />
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter uppercase italic">
                            {searchQuery ? (
                                <>Search: <span className="text-green-600">{searchQuery}</span></>
                            ) : selectedCategory ? (
                                <>Category: <span className="text-green-600 font-black">{selectedCategory}</span></>
                            ) : (
                                "All Projects"
                            )}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <FilterSection
                onCategoryChange={handleCategoryChange}
                onSearchChange={handleSearchChange}
                initialSearch={initialQuery}
            />

            {/* Results Section */}
            <div className="mt-8">
                <ContentGrid
                    searchQuery={searchQuery}
                    categorySlug={selectedCategory}
                />
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#F6F6F6]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}
