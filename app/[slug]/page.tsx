"use client";

import React from "react";
import { useParams } from "next/navigation";
import Carousel from "@/components/features/Carousel";
import FilterSection from "@/components/features/FilterSection";
import ContentGrid from "@/components/features/ContentGrid";

export default function CategoryPage() {
    const params = useParams();
    const slug = params?.slug as string;

    return (
        <div className="bg-[#F6F6F6] font-sans text-zinc-900">

            {/* Main Content Area */}
            <div className="w-full pb-20 pt-10">
                <div className="max-w-6xl mx-auto px-4 mb-8">
                    <h1 className="text-3xl font-bold text-zinc-900 uppercase tracking-tighter mb-2">
                        Category: {decodeURIComponent(slug).replace(/-/g, " ")}
                    </h1>
                    <div className="w-20 h-1 bg-green-600"></div>
                </div>

                {/* Content Grid */}
                <ContentGrid categorySlug={slug} />
            </div>
        </div>
    );
}
