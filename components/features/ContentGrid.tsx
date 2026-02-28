"use client";

import React, { useEffect, useState } from "react";
import ContentCard from "./ContentCard";

interface Package {
  id: number;
  slug: string;
  title: string;
  shortSummary: string;
  description: string;
  ratingAvg: number;
  createdAt: string;
  user: {
    id: number;
    displayName: string;
    username: string;
    avatarUrl: string;
    slug?: string;
    status?: number;
  };
  category: {
    name: string;
  };
  images: { url: string }[];
}

import Pagination from "@/components/common/Pagination";

interface ContentGridProps {
  packages?: Package[];
  loading?: boolean;
  error?: string | null;
  initialPagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null;
  query?: string;
  category?: string | null;
}

const ContentGrid = ({ packages: initialPackages = [], loading = false, error = null, initialPagination, query, category }: ContentGridProps) => {
  const [packages, setPackages] = useState<Package[]>(initialPackages);
  const [pagination, setPagination] = useState(initialPagination);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setPackages(initialPackages);
    setPagination(initialPagination);
  }, [initialPackages, initialPagination]);

  const onPageChange = async (pageNum: number) => {
    if (!pagination || isFetching) return;

    setIsFetching(true);
    try {
      const { searchPackages, getPackages } = await import("@/lib/api");
      let result;

      if (query) {
        result = await searchPackages(query, pageNum);
      } else {
        result = await getPackages(category, pageNum);
      }

      setPackages(result.packages);
      setPagination(result.pagination);

      // Scroll to transition point
      const gridElement = document.getElementById('grid-start');
      if (gridElement) {
        gridElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (err) {
      console.error("Failed to load page:", err);
    } finally {
      setIsFetching(false);
    }
  };

  if (loading) {
    // ... existing loading code ...
  }

  if (error) {
    // ... existing error code ...
  }

  if (packages.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-20 flex flex-col justify-center items-center text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-none flex items-center justify-center mb-6 text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25m-2.25-2.25-2.25 2.25m2.25-2.25V18M3.75 7.5h16.5M3.75 7.5l1.5-4.5h13.5l1.5 4.5" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-zinc-800 uppercase tracking-tight mb-2">No packages available here</h3>
        <p className="text-gray-500 text-sm max-w-xs italic">
          It looks like there are no packages in this category yet. Check back later or explore other categories.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 relative">
      <div id="grid-start" className="absolute -top-32 h-0 w-0"></div>

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ${isFetching ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
        {packages.map((pkg) => (
          <ContentCard
            key={pkg.id}
            id={pkg.id}
            slug={pkg.slug || pkg.id.toString()}
            author={pkg.user?.displayName || pkg.user?.username || "Anonymous"}
            authorSlug={pkg.user?.slug || (pkg.user ? `${pkg.user.id}-${pkg.user.username.toLowerCase().replace(/\s+/g, '-')}` : "")}
            authorAvatar={pkg.user?.avatarUrl || "https://placehold.co/100x100?text=A"}
            rating={pkg.ratingAvg || 0}
            date={new Date(pkg.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
            thumbnail={pkg.images[0]?.url || "https://placehold.co/600x400?text=No+Image"}
            category={pkg.category?.name || "Uncategorized"}
            tags={[pkg.category?.name || "Uncategorized"]}
            title={pkg.title}
            description={pkg.shortSummary || pkg.description}
            authorStatus={pkg.user?.status}
          />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        {pagination && pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={onPageChange}
            isLoading={isFetching}
          />
        )}
      </div>
    </div>
  );
};

export default ContentGrid;
