import React, { Suspense } from "react";
import ContentGrid from "@/components/features/ContentGrid";
import FilterSection from "@/components/features/FilterSection";
import Link from "next/link";
import { ChevronRight, Search as SearchIcon } from "lucide-react";
import { searchPackages, getPackages, getCategories } from "@/lib/api";

async function SearchResults({ query, category }: { query: string; category: string | null }) {
    let packages = [];
    try {
        if (query) {
            packages = await searchPackages(query);
        } else if (category) {
            packages = await getPackages(category);
        } else {
            packages = await getPackages();
        }
    } catch (error) {
        console.error("Failed to fetch packages on server:", error);
    }

    return (
        <div className="mt-8">
            <ContentGrid packages={packages} />
        </div>
    );
}

export default async function SearchPage({
    searchParams: searchParamsPromise,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const searchParams = await searchParamsPromise;
    const query = typeof searchParams.q === 'string' ? searchParams.q : "";
    const category = typeof searchParams.category === 'string' ? searchParams.category : null;
    const categories = await getCategories();

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
                            {query ? (
                                <>Search: <span className="text-green-600">{query}</span></>
                            ) : category ? (
                                <>Category: <span className="text-green-600 font-black">{category}</span></>
                            ) : (
                                "All Projects"
                            )}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <FilterSection
                initialSearch={query}
                initialSlug={category}
                initialCategories={categories}
            />

            {/* Results Section */}
            <Suspense fallback={
                <div className="w-full max-w-6xl mx-auto px-4 py-8 flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
                </div>
            }>
                <SearchResults query={query} category={category} />
            </Suspense>
        </div>
    );
}
