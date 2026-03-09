import React from "react";
import { Metadata } from "next";
import ContentGrid from "@/components/features/ContentGrid";
import { getPackages, getCategories } from "@/lib/api";

export async function generateMetadata({
    params: paramsPromise
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await paramsPromise;
    const categoryName = decodeURIComponent(slug).replace(/-/g, " ");

    return {
        title: `${categoryName} Minecraft Content - LF Launcher`,
        description: `Browse the best ${categoryName} for Minecraft. Download and install easily with LF Launcher.`,
    };
}

export default async function CategoryPage({
    params: paramsPromise
}: {
    params: Promise<{ slug: string }>;
}) {
    const params = await paramsPromise;
    const slug = params.slug;

    // Fetch packages for this specific category
    const { packages, pagination: initialPagination } = await getPackages(slug);

    return (
        <div className="bg-[#F6F6F6] font-sans text-zinc-900">
            {/* Main Content Area */}
            <div className="w-full pb-20 pt-10">
                <div className="max-w-6xl mx-auto px-4 mb-8">
                    <h1 className="text-3xl font-bold text-zinc-900 uppercase tracking-tighter mb-2">
                        {decodeURIComponent(slug).replace(/-/g, " ")}
                    </h1>
                    <div className="w-20 h-1 bg-green-600"></div>
                </div>

                {/* Content Grid */}
                <ContentGrid
                    packages={packages}
                    initialPagination={initialPagination}
                    category={slug}
                />
            </div>
        </div>
    );
}
