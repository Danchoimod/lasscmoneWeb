import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/lib/blog-data";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Minecraft Blog & Technical Guides",
    description: "Comprehensive collection of guides, mod reviews, and the latest news about the Minecraft world on Android and PC.",
};

export default function BlogListPage() {
    return (
        <div className="bg-[#F8F9FA] min-h-screen font-sans">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-black text-zinc-900 mb-4 uppercase tracking-tight">Blog & News</h1>
                    <p className="text-zinc-600 max-w-2xl mx-auto">
                        Sharing knowledge, modding experience, and latest updates from the LF Launcher community.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BLOG_POSTS.map((post) => (
                        <article key={post.id} className="bg-white border border-zinc-200 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="relative h-48 w-full bg-zinc-100 italic">
                                <Image 
                                    src={post.image} 
                                    alt={post.title} 
                                    fill 
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#00a63e] text-white px-2 py-0.5">
                                        {post.category}
                                    </span>
                                    <span className="text-xs text-zinc-400">{post.date}</span>
                                </div>
                                <h2 className="text-xl font-bold text-zinc-900 mb-3 leading-tight hover:text-[#00a63e] transition-colors">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className="text-zinc-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                                    {post.summary}
                                </p>
                                <Link 
                                    href={`/blog/${post.slug}`}
                                    className="text-sm font-bold text-zinc-900 uppercase border-b-2 border-[#00a63e] pb-0.5 hover:bg-[#00a63e] hover:text-white transition-all"
                                >
                                    Read More →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
