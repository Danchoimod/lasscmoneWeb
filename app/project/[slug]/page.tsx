"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProjectBreadcrumbs from "@/components/features/project/ProjectBreadcrumbs";
import ProjectGallery from "@/components/features/project/ProjectGallery";
import ProjectTabs from "@/components/features/project/ProjectTabs";
import ProjectSidebar from "@/components/features/project/ProjectSidebar";

interface PackageData {
  id: number;
  slug: string;
  title: string;
  shortSummary: string;
  description: string;
  ratingAvg: number;
  createdAt: string;
  updatedAt: string;
  changelog: string;
  user: {
    id: number;
    username: string;
    avatarUrl: string;
    slug?: string;
  };
  category: {
    name: string;
    param: string;
  };
  images: { url: string }[];
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  user: {
    id: number;
    username: string;
    avatarUrl: string;
    slug?: string;
  };
  replies: Comment[];
}

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug;
  const [activeTab, setActiveTab] = useState("description");
  const [project, setProject] = useState<PackageData | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentCount, setCommentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectAndComments = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        // 1. Fetch project by slug
        const response = await fetch(`/api-backend/packages/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch project details");
        }
        const result = await response.json();

        if (result.status === "success" && result.data && result.data.package) {
          const projectData = result.data.package;
          setProject(projectData);
          setLoading(false);

          // 2. Fetch comments using the package ID from the project data
          try {
            setCommentsLoading(true);
            const commentsResponse = await fetch(`/api-backend/comments/package/${projectData.id}`);
            if (commentsResponse.ok) {
              const commentsResult = await commentsResponse.json();
              if (commentsResult.status === "success" && commentsResult.data) {
                setComments(commentsResult.data.comments);
                setCommentCount(commentsResult.data.pagination.total || 0);
              }
            }
          } catch (cErr) {
            console.error("Error fetching comments:", cErr);
          } finally {
            setCommentsLoading(false);
          }
        } else {
          throw new Error("Project not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setLoading(false);
      }
    };

    fetchProjectAndComments();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center px-4 text-center">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-none flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-zinc-800 mb-2 italic uppercase tracking-tight">Package Not Found</h2>
        <p className="text-zinc-500 mb-8 max-w-md">
          The requested package could not be found or does not exist. Please check the URL or try searching for another product.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 bg-zinc-800 text-white font-bold text-sm tracking-tight transition-colors hover:bg-zinc-700"
          >
            BACK TO HOME
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 border-2 border-zinc-200 text-zinc-600 font-bold text-sm tracking-tight transition-colors hover:bg-zinc-50"
          >
            RETRY
          </button>
        </div>
      </div>
    );
  }

  const mappedProjectData = {
    id: project.id,
    title: project.title,
    category: project.category?.name || "Uncategorized",
    event: "Featured", // Placeholder as API doesn't have events
    badge: (project.category?.name || "Uncategorized").toUpperCase(),
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: project.category?.name || "Uncategorized", href: project.category ? `/${project.category.param}` : "#" },
      { label: project.title },
    ],
    images: project.images.map((img) => img.url),
    creator: {
      name: project.user.username,
      slug: project.user.slug || `${project.user.id}-${project.user.username.toLowerCase().replace(/\s+/g, '-')}`,
      avatar: project.user.avatarUrl || "https://avatars.githubusercontent.com/u/113335341?v=4",
      verified: true,
    },
    stats: {
      version: project.changelog || "1.0.0",
      lastUpdated: new Date(project.updatedAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      downloads: "0", // API doesn't seem to have download counts yet
      rating: project.ratingAvg || 0,
    },
    tags: [project.category.name], // Using category as tag for now
    otherFromCreator: [], // API doesn't provide this in single package response
    tabs: [
      { id: "description", label: "Description" },
      { id: "changelog", label: "Changelog" },
      { id: "comments", label: "Comments", count: commentCount },
      { id: "installation", label: "Installation" },
    ],
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProjectBreadcrumbs items={mappedProjectData.breadcrumbs} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <ProjectGallery images={mappedProjectData.images} badge={mappedProjectData.badge} />

            {/* Main Content Card */}
            <div className="bg-white dark:bg-gray-800 rounded-none shadow-sm border border-gray-200 dark:border-gray-700">
              {/* Tabs Scroll Container */}
              <div className="w-full border-b border-gray-200 dark:border-gray-700">
                <div className="overflow-x-auto overflow-y-hidden transition-all scrollbar-hide">
                  <div className="min-w-max">
                    <ProjectTabs
                      tabs={mappedProjectData.tabs}
                      activeTab={activeTab}
                      onTabChange={setActiveTab}
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 text-gray-700 dark:text-gray-300 max-w-none">
                {activeTab === "description" && (
                  <div className="animate-in fade-in duration-300">
                    <h2 className="text-2xl font-bold mb-4 italic text-gray-900 dark:text-white uppercase tracking-tight">
                      About {mappedProjectData.title}
                    </h2>
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                      {project.description}
                    </div>
                  </div>
                )}

                {activeTab === "changelog" && (
                  <div className="animate-in fade-in duration-300">
                    <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white uppercase">Version {project.changelog}</h3>
                    <p className="text-gray-500 italic">Changelog update for version {project.changelog}.</p>
                  </div>
                )}

                {activeTab === "comments" && (
                  <div className="animate-in fade-in duration-300 space-y-8">
                    <div className="flex items-center justify-between border-b pb-4 border-gray-100 dark:border-gray-700">
                      <h2 className="text-xl font-bold italic text-gray-900 dark:text-white uppercase tracking-tight">
                        Comments ({commentCount})
                      </h2>
                      <button className="text-xs font-bold text-green-600 hover:text-green-700 uppercase tracking-widest border border-green-600 px-4 py-2 hover:bg-green-50 transition-colors">
                        Add Comment
                      </button>
                    </div>

                    {commentsLoading ? (
                      <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {comments.length > 0 ? (
                          <div className="space-y-8">
                            {comments.map((comment) => (
                              <div key={comment.id} className="space-y-4">
                                {/* Main Comment */}
                                <div className="flex gap-4 group">
                                  <Link href={`/user/${comment.user.slug || `${comment.user.id}-${comment.user.username.toLowerCase().replace(/\s+/g, '-')}`}`} className="shrink-0 hover:opacity-80 transition-opacity">
                                    <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-none overflow-hidden hover:border-green-600 transition-colors">
                                      <img
                                        src={comment.user.avatarUrl}
                                        alt={comment.user.username}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  </Link>
                                  <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-2">
                                      <Link href={`/user/${comment.user.slug || `${comment.user.id}-${comment.user.username.toLowerCase().replace(/\s+/g, '-')}`}`} className="text-sm font-bold text-gray-900 dark:text-white hover:text-green-600 transition-colors">
                                        {comment.user.username}
                                      </Link>
                                      <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                                        • {new Date(comment.createdAt).toLocaleDateString("en-GB", {
                                          day: "2-digit",
                                          month: "short",
                                          year: "numeric",
                                        })}
                                      </span>
                                    </div>
                                    <div className="relative">
                                      <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 p-4 border-l-2 border-gray-200 dark:border-gray-700 group-hover:border-green-600 transition-all duration-300">
                                        {comment.content}
                                      </p>
                                      <button className="mt-2 text-[10px] font-bold text-gray-400 hover:text-green-600 uppercase tracking-[0.15em] flex items-center gap-1 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                        </svg>
                                        Reply
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                {/* Replies */}
                                {comment.replies && comment.replies.length > 0 && (
                                  <div className="ml-14 space-y-4 border-l-2 border-gray-100 dark:border-gray-800 pl-6">
                                    {comment.replies.map((reply) => (
                                      <div key={reply.id} className="flex gap-3 group/reply">
                                        <Link href={`/user/${reply.user.slug || `${reply.user.id}-${reply.user.username.toLowerCase().replace(/\s+/g, '-')}`}`} className="shrink-0 hover:opacity-80 transition-opacity">
                                          <div className="w-8 h-8 bg-gray-100 border border-gray-200 rounded-none overflow-hidden group-hover/reply:border-green-600 transition-colors">
                                            <img
                                              src={reply.user.avatarUrl}
                                              alt={reply.user.username}
                                              className="w-full h-full object-cover"
                                            />
                                          </div>
                                        </Link>
                                        <div className="flex-1 space-y-1">
                                          <div className="flex items-center gap-2">
                                            <Link href={`/user/${reply.user.slug || `${reply.user.id}-${reply.user.username.toLowerCase().replace(/\s+/g, '-')}`}`} className="text-xs font-bold text-gray-800 dark:text-gray-200 hover:text-green-600 transition-colors">
                                              {reply.user.username}
                                            </Link>
                                            <span className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">
                                              • {new Date(reply.createdAt).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                              })}
                                            </span>
                                          </div>
                                          <p className="text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 p-3 border border-gray-100 dark:border-gray-700 group-hover/reply:border-green-600/30 transition-all duration-300 italic">
                                            {reply.content}
                                          </p>
                                          <button className="mt-1 text-[9px] font-bold text-gray-400 hover:text-green-600 uppercase tracking-widest flex items-center gap-1 transition-colors">
                                            Reply
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-10">
                            <p className="text-gray-400 italic text-sm font-medium">No comments yet. Be the first to share your thoughts!</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "installation" && (
                  <div className="animate-in fade-in duration-300">
                    <p className="text-gray-500 italic">Installation guide coming soon...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <ProjectSidebar
              title={mappedProjectData.title}
              category={mappedProjectData.category}
              event={mappedProjectData.event}
              creator={mappedProjectData.creator}
              stats={mappedProjectData.stats}
              tags={mappedProjectData.tags}
              otherFromCreator={mappedProjectData.otherFromCreator}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
