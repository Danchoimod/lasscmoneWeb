"use client";

import React, { useEffect, useState } from "react";
import ContentCard from "./ContentCard";

interface Package {
  id: number;
  title: string;
  description: string;
  ratingAvg: number;
  createdAt: string;
  user: {
    username: string;
    avatarUrl: string;
  };
  category: {
    name: string;
  };
  images: { url: string }[];
}

const ContentGrid = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api-backend/packages");
        if (!response.ok) {
          throw new Error("Failed to fetch packages");
        }
        const result = await response.json();
        if (result.status === "success" && result.data && result.data.packages) {
          setPackages(result.data.packages);
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8 flex justify-center items-center h-64 text-red-500">
        Error: {error}
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
            author={pkg.user.username}
            authorAvatar={pkg.user.avatarUrl}
            rating={pkg.ratingAvg || 0}
            date={new Date(pkg.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
            thumbnail={pkg.images[0]?.url || "https://placehold.co/600x400?text=No+Image"}
            category={pkg.category.name}
            tags={[pkg.category.name]} // API doesn't seem to have explicit tags, using category for now
            title={pkg.title}
            description={pkg.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ContentGrid;

