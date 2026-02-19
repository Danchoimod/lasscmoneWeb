"use client";

import React, { useState } from "react";
import Link from "next/link";
import ProjectTabs from "./ProjectTabs";

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

interface ProjectDetailTabsProps {
    project: any;
    comments: Comment[];
    commentCount: number;
    tabs: any[];
}

export default function ProjectDetailTabs({ project, comments, commentCount, tabs }: ProjectDetailTabsProps) {
    const [activeTab, setActiveTab] = useState("description");

    return (
        <div className="bg-white dark:bg-gray-800 rounded-none shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="w-full border-b border-gray-200 dark:border-gray-700">
                <div className="overflow-x-auto overflow-y-hidden transition-all scrollbar-hide">
                    <div className="min-w-max">
                        <ProjectTabs
                            tabs={tabs}
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
                            About {project.title}
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
                    </div>
                )}

                {activeTab === "installation" && (
                    <div className="animate-in fade-in duration-300">
                        <p className="text-gray-500 italic">Installation guide coming soon...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
