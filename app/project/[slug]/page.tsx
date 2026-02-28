import React from "react";
import ProjectBreadcrumbs from "@/components/features/project/ProjectBreadcrumbs";
import ProjectGallery from "@/components/features/project/ProjectGallery";
import ProjectSidebar from "@/components/features/project/ProjectSidebar";
import ProjectDetailTabs from "@/components/features/project/ProjectDetailTabs";
import { getPackageBySlug, getPackageComments } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function ProjectDetailPage({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await paramsPromise;

  // Fetch project and comments on the server
  let project = null;
  try {
    project = await getPackageBySlug(slug);
  } catch (err) {
    console.error(`Failed to fetch project ${slug}:`, err);
  }

  if (!project) {
    console.warn(`Project not found for slug: ${slug}`);
    notFound();
  }

  let commentsData: any = { comments: [], total: 0, pagination: null };
  if (project.id) {
    try {
      commentsData = await getPackageComments(project.id);
    } catch (err) {
      console.error(`Failed to fetch comments for project ${project.id}:`, err);
    }
  }
  const { comments, total: commentCount, pagination: initialPagination } = commentsData;

  const mappedProjectData = {
    id: project.id,
    title: project.title,
    category: project.category?.name || "Uncategorized",
    event: "Featured",
    badge: (project.category?.name || "Uncategorized").toUpperCase(),
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: project.category?.name || "Uncategorized", href: project.category ? `/${project.category.param}` : "#" },
      { label: project.title },
    ],
    images: project.images.map((img: any) => img.url),
    creator: {
      id: project.user.id,
      name: project.user.displayName || project.user.username,
      slug: project.user.slug || `${project.user.id}-${project.user.username.toLowerCase().replace(/\s+/g, '-')}`,
      avatar: project.user.avatarUrl || "https://avatars.githubusercontent.com/u/113335341?v=4",
      verified: project.user.status === 4,
      isFollowing: project.user.isFollowing,
    },
    stats: {
      version: project.changelog || "1.0.0",
      lastUpdated: new Date(project.updatedAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      downloads: "0",
      rating: project.ratingAvg || 0,
      ratingCount: project.ratingCount || 0,
    },
    tags: [project.category.name],
    otherFromCreator: [],
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

            {/* Interactive Tabs and Content Section */}
            <ProjectDetailTabs
              project={project}
              comments={comments}
              commentCount={commentCount}
              initialPagination={initialPagination}
              tabs={mappedProjectData.tabs}
            />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <ProjectSidebar
              packageId={project.id}
              title={mappedProjectData.title}
              category={mappedProjectData.category}
              shortSummary={project.shortSummary}
              event={mappedProjectData.event}
              creator={mappedProjectData.creator}
              stats={mappedProjectData.stats}
              tags={mappedProjectData.tags}
              urls={project.urls}
              versions={project.versions}
              otherFromCreator={mappedProjectData.otherFromCreator}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
