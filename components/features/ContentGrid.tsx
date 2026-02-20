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
  };
  category: {
    name: string;
  };
  images: { url: string }[];
}

interface ContentGridProps {
  packages?: Package[];
  loading?: boolean;
  error?: string | null;
}

const ContentGrid = ({ packages = [], loading = false, error = null }: ContentGridProps) => {
  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-20 flex flex-col justify-center items-center text-center">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-none flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-zinc-800 uppercase tracking-tight mb-2">
          Category not found
        </h3>
        <p className="text-gray-500 text-sm max-w-xs italic">
          The category you are looking for has been moved or doesn't exist. Please check your link or try browsing other content.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="mt-8 px-6 py-2 bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest hover:bg-zinc-700 transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
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
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            tags={[pkg.category?.name || "Uncategorized"]} // API doesn't seem to have explicit tags, using category for now
            title={pkg.title}
            description={pkg.shortSummary || pkg.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ContentGrid;

