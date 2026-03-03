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
    <div className="bg-[#E9ECEF] font-sans text-[#333] min-h-screen">
      <main className="mx-auto flex w-full max-w-[1100px] flex-grow gap-6 px-4 py-6">
        {/* Main Content Column */}
        <div className="flex-grow rounded-sm border border-[#D1D4D7] bg-white overflow-hidden">
          {/* Header */}
          <div className="border-b border-[#EEE] bg-[#F8F9FA] px-6 py-3">
            <h1 className="text-sm font-bold uppercase tracking-wide text-[#555]">
              USER PROFILE: {user.displayName || user.username}
            </h1>
          </div>

          {/* Profile Info Section */}
          <div className="p-6 md:p-10 border-b border-[#EEE]">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar - High quality square */}
              <div className="relative w-32 h-32 md:w-36 md:h-36 bg-gray-100 border border-[#D1D4D7] shrink-0">
                <Image
                  src={user.avatarUrl || "/icons/icon.jpg"}
                  alt={user.displayName || user.username}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info Details */}
              <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                    <h2 className="text-2xl font-bold text-[#333]">
                      {user.displayName || user.username}
                    </h2>
                    {user.status === 4 && (
                      <ShieldCheck className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <p className="text-sm text-[#777]">@{user.username}</p>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-[14px] text-[#555]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#999]" />
                    <span>Joined {new Date(user.createdAt).toLocaleDateString("en-US", { month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Box className="w-4 h-4 text-[#999]" />
                    <span><strong>{user.packages?.length || 0}</strong> Submissions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-[#999]" />
                    <span><strong>{user._count?.followers || 0}</strong> Followers</span>
                  </div>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
                  <FollowButton
                    userId={user.id}
                    initialFollowed={user.isFollowing}
                  />
                  <ReportButton
                    targetUserId={user.id}
                    className="bg-white hover:bg-gray-100 text-[#555] border border-[#D1D4D7] text-xs font-bold h-9 px-4 uppercase"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submissions Section */}
          <div className="p-6 md:p-8">
            <div className="border-b border-[#EEE] pb-3 mb-6">
              <h3 className="text-sm font-bold uppercase text-[#555] tracking-wider">
                User Submissions
              </h3>
            </div>

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
                    thumbnail={pkg.images?.[0]?.url || "https://placehold.co/600x400?text=No+Image"}
                    category={pkg.category?.name || "Uncategorized"}
                    tags={[pkg.category?.name || "Uncategorized"]}
                    title={pkg.title}
                    description={pkg.shortSummary || pkg.description || "No description available."}
                    authorStatus={user.status}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-[#F9F9F9] border border-dashed border-[#DDD]">
                <p className="text-[#999] italic text-sm">This user hasn't submitted any packages yet.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
