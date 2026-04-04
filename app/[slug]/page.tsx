import React from "react";
import { Metadata } from "next";
import ContentGrid from "@/components/features/ContentGrid";
import { getPackages, getCategories } from "@/lib/api";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const categories = await getCategories();
    return categories.map((cat: any) => ({ slug: cat.param }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const categoryName = decodeURIComponent(slug).replace(/-/g, " ");

    return {
        title: `${categoryName} Minecraft Content - Download Mods & Maps`,
        description: `Explore the best ${categoryName} for Minecraft. Download and install easily with LF Launcher. Verified community content for Android and Windows.`,
        openGraph: {
            title: `${categoryName} - LF Launcher`,
            description: `Browse the top collection of ${categoryName} for Minecraft. One-click install for Bedrock Edition.`,
            type: "website",
        },
    };
}

export default async function CategoryPage({ params: paramsPromise }: Props) {
    const params = await paramsPromise;
    const slug = params.slug;
    const categoryName = decodeURIComponent(slug).replace(/-/g, " ");

    // Fetch packages for this specific category
    const { packages, pagination: initialPagination } = await getPackages(slug);

    return (
        <div className="bg-[#F6F6F6] font-sans text-zinc-900 min-h-screen">
            {/* Main Content Area */}
            <div className="w-full pb-20 pt-10">
                <div className="max-w-6xl mx-auto px-4 mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-zinc-900 uppercase italic tracking-tighter mb-4">
                                {categoryName} <span className="text-green-600">Category</span>
                            </h1>
                            <div className="w-20 h-2 bg-green-600 mb-6"></div>
                            <p className="text-zinc-500 max-w-2xl leading-relaxed text-sm italic">
                                Exploring the best {categoryName} content for Minecraft. All packages in this category are verified for compatibility with LF Launcher and standard Bedrock versions.
                            </p>
                        </div>
                        <div className="bg-white border border-zinc-200 p-4 shrink-0 shadow-sm hidden md:block">
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Viewing Contents</span>
                            <div className="text-2xl font-black italic">{packages.length}+ <span className="text-sm font-normal text-zinc-400">Available</span></div>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <ContentGrid
                    packages={packages}
                    initialPagination={initialPagination}
                    category={slug}
                />

                {/* SEO Text Section */}
                <div className="max-w-6xl mx-auto px-4 mt-20 pt-12 border-t border-zinc-200">
                    <h2 className="text-xl font-bold mb-4 uppercase tracking-tighter">About {categoryName} on LF Launcher</h2>
                    <p className="text-sm text-zinc-600 leading-loose max-w-4xl">
                        The {categoryName} category is one of the most popular sections on LF Launcher. We provide a hand-picked collection of community creations, 
                        ranging from small quality-of-life adjustments to game-changing modifications. Installing any content from the {categoryName} section 
                        requires only a single click if you have LF Launcher installed on your device.
                    </p>
                </div>
            </div>
        </div>
    );
}
