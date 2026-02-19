"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { UserPlus, Calendar, Box, ShieldCheck, UserMinus } from "lucide-react";
import ContentCard from "@/components/features/ContentCard";

interface UserData {
  id: number;
  username: string;
  avatarUrl: string;
  status: number;
  createdAt: string;
  _count: {
    followers: number;
  };
  packages: any[];
  slug: string;
}

const UserProfilePage = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const response = await fetch(`/api-backend/users/${slug}/profile`);
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const result = await response.json();
        if (result.status === "success" && result.data) {
          setUser(result.data);
        } else {
          throw new Error("User not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center px-4 text-center">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-none flex items-center justify-center mb-6">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-800 mb-2 uppercase tracking-tight">User Not Found</h2>
        <p className="text-zinc-500 mb-8 max-w-md italic">
          The requested user profile could not be found. It might have been deleted or the link is incorrect.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-2 bg-zinc-800 text-white font-bold text-sm tracking-tight transition-colors hover:bg-zinc-700"
        >
          BACK TO HOME
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      {/* 1. Profile Header Section */}
      <div className="bg-white border-b border-zinc-200 pt-12 pb-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-6">

          {/* Avatar */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 bg-zinc-100 border-4 border-white shadow-lg rounded-none overflow-hidden -mb-4 flex items-center justify-center p-0">
            <Image
              src={user.avatarUrl || "/next.svg"}
              alt={user.username}
              fill
              className="object-cover"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 flex flex-col items-center md:items-start pb-2">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-black text-zinc-900 tracking-tight uppercase">
                {user.username}
              </h1>
              <div className="w-6 h-6 bg-blue-500 rounded-none flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-zinc-500 font-medium">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Joined {new Date(user.createdAt).toLocaleDateString("en-US", { month: 'long', year: 'numeric' })}
              </div>
              <div className="flex items-center gap-1.5">
                <Box className="w-4 h-4" />
                {user.packages?.length || 0} submissions
              </div>
              <div className="flex items-center gap-1.5">
                <UserPlus className="w-4 h-4 text-zinc-400" />
                {user._count?.followers || 0} followers
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pb-2">
            <button className="flex items-center gap-2 bg-[#4CAF50] hover:bg-green-600 text-white px-6 py-2.5 font-bold uppercase text-sm transition-all shadow-sm active:scale-95">
              <UserPlus className="w-4 h-4" />
              follow
            </button>
          </div>
        </div>
      </div>

      {/* 2. Submissions Grid Section */}
      <div className="max-w-6xl mx-auto px-4 mt-12 pb-20">
        <div className="flex items-center justify-between mb-8 border-b border-zinc-200 pb-4">
          <h2 className="text-xl font-black uppercase tracking-widest text-zinc-800 italic">
            user submissions
          </h2>
          <span className="bg-zinc-800 text-white text-xs px-3 py-1 font-bold">
            {user.packages?.length || 0} items
          </span>
        </div>

        {/* Submissions Grid */}
        {user.packages && user.packages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.packages.map((pkg) => (
              <ContentCard
                key={pkg.id}
                id={pkg.id}
                slug={pkg.slug}
                author={user.username}
                authorSlug={user.slug}
                authorAvatar={user.avatarUrl}
                rating={pkg.ratingAvg || 0}
                date={new Date(pkg.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                thumbnail={pkg.images?.[0]?.url || "/next.svg"}
                category={pkg.category?.name || "Uncategorized"}
                tags={[pkg.category?.name || "Uncategorized"]}
                title={pkg.title}
                description={pkg.shortSummary || pkg.description || "No description available."}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-dashed border-zinc-200">
            <p className="text-zinc-400 italic font-medium">This user hasn't submitted any packages yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;