import React from "react";
import Image from "next/image";
import { BLOG_POSTS } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = BLOG_POSTS.find((p) => p.slug === slug);
    
    if (!post) return { title: "Not Found" };

    return {
        title: post.title,
        description: post.summary,
        openGraph: {
            title: post.title,
            description: post.summary,
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
            images: [{ url: post.image, alt: post.title }],
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Article JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": post.title,
                        "description": post.summary,
                        "image": `https://lflauncher.org${post.image}`,
                        "author": { "@type": "Person", "name": post.author },
                        "publisher": {
                            "@type": "Organization",
                            "name": "LF Launcher",
                            "logo": { "@type": "ImageObject", "url": "https://lflauncher.org/icons/icon.jpg" }
                        },
                        "datePublished": post.date,
                        "dateModified": post.date,
                        "mainEntityOfPage": { "@type": "WebPage", "@id": `https://lflauncher.org/blog/${post.slug}` }
                    })
                }}
            />
            {/* Post Header */}
            <div className="relative h-[400px] w-full bg-zinc-900 overflow-hidden">
                <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 flex items-center justify-center py-20 px-4 flex-col bg-black/30">
                    <div className="max-w-4xl mx-auto text-center">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-xs font-black uppercase tracking-widest text-[#00a63e] border border-[#00a63e] px-2 py-1">
                            {post.category}
                        </span>
                        <span className="text-sm text-zinc-500">{post.date}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-8">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#00a63e] flex items-center justify-center font-bold text-white uppercase">
                            {post.author.charAt(0)}
                        </div>
                        <div className="text-zinc-400 text-sm">
                            By <span className="text-white font-medium">{post.author}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

            {/* Post Content */}
            <article className="max-w-4xl mx-auto px-4 py-16">
                <div className="flex gap-4 mb-12 border-b border-zinc-100 pb-8 italic text-zinc-500">
                    <p className="text-lg">"{post.summary}"</p>
                </div>

                <div 
                    className="prose prose-zinc lg:prose-lg max-w-none 
                    prose-h2:text-2xl prose-h2:font-black prose-h2:uppercase prose-h2:tracking-tight prose-h2:border-l-4 prose-h2:border-[#00a63e] prose-h2:pl-4 prose-h2:mt-12
                    prose-p:text-zinc-700 prose-p:leading-relaxed
                    prose-strong:text-zinc-900"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div className="mt-20 pt-12 border-t border-zinc-200">
                    <h3 className="text-xl font-bold mb-6 italic">Thanks for reading!</h3>
                    <div className="bg-zinc-50 p-8 border border-zinc-100 italic text-zinc-600">
                        If you found this article helpful, please share it with your friends or join our Discord community for more discussions.
                    </div>
                    <div className="mt-8">
                        <Link href="/blog" className="text-[#00a63e] font-bold uppercase text-sm hover:underline">
                            ← Back to Articles
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
}
