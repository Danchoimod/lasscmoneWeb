"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ProjectBreadcrumbs from "@/components/features/project/ProjectBreadcrumbs";
import ProjectGallery from "@/components/features/project/ProjectGallery";
import ProjectTabs from "@/components/features/project/ProjectTabs";
import ProjectSidebar from "@/components/features/project/ProjectSidebar";

interface PackageData {
  id: number;
  title: string;
  description: string;
  ratingAvg: number;
  createdAt: string;
  updatedAt: string;
  changelog: string;
  user: {
    username: string;
    avatarUrl: string;
  };
  category: {
    name: string;
    param: string;
  };
  images: { url: string }[];
}

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params?.id;
  const [activeTab, setActiveTab] = useState("description");
  const [project, setProject] = useState<PackageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await fetch(`/api-backend/packages/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch project details");
        }
        const result = await response.json();
        if (result.status === "success" && result.data && result.data.package) {
          setProject(result.data.package);
        } else {
          throw new Error("Project not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

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
    category: project.category.name,
    event: "Featured", // Placeholder as API doesn't have events
    badge: project.category.name.toUpperCase(),
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: project.category.name, href: `/${project.category.param}` },
      { label: project.title },
    ],
    images: project.images.map((img) => img.url),
    creator: {
      name: project.user.username,
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
      { id: "comments", label: "Comments", count: 0 },
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
                  <div className="animate-in fade-in duration-300">
                    <p className="text-gray-500 italic">Comments section coming soon...</p>
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
