import React from "react";
import Image from "next/image";
import { UserPlus, Calendar, Box, ShieldCheck } from "lucide-react";
import ContentCard from "@/components/features/ContentCard";
import { getUserProfile } from "@/lib/api";
import { notFound } from "next/navigation";
import ReportButton from "@/components/features/ReportButton";
import FollowButton from "@/components/features/FollowButton";

interface UserData {
  id: number;
  displayName: string;
  username: string;
  avatarUrl: string;
  status: number;
  createdAt: string;
  _count: {
    followers: number;
  };
  packages: any[];
  slug: string;
  isFollowing?: boolean;
}

export default async function UserProfilePage({
  params: paramsPromise
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await paramsPromise;

  const user: UserData | null = await getUserProfile(slug);

  if (!user) {
    notFound();
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
              alt={user.displayName || user.username}
              fill
              className="object-cover"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 flex flex-col items-center md:items-start pb-2">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-black text-zinc-900 tracking-tight uppercase">
                {user.displayName || user.username}
              </h1>
              {user.status === 4 && (
                <div className="w-6 h-6 bg-blue-500 rounded-none flex items-center justify-center shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
              )}
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
            <FollowButton
              userId={user.id}
              initialFollowed={user.isFollowing}
            />
            <ReportButton
              targetUserId={user.id}
              className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200"
            />
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
                author={user.displayName || user.username}
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
                authorStatus={user.status}
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
}