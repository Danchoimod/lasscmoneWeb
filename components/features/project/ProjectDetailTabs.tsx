"use client";

import React, { useState, useTransition, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { createComment } from "@/lib/actions";
import ProjectTabs from "./ProjectTabs";

interface Comment {
    id: number;
    content: string;
    createdAt: string;
    user: {
        id: number;
        displayName: string;
        username: string;
        avatarUrl: string;
        slug?: string;
        status?: number;
    };
    replies: Comment[];
}

interface ProjectDetailTabsProps {
    project: any;
    comments: Comment[];
    commentCount: number;
    tabs: any[];
}

const getPlatformName = (type: string | number) => {
    const mapping: Record<string | number, string> = {
        "1": "Bedrock",
        "2": "Java",
        "bedrock": "Bedrock",
        "java": "Java"
    };
    return mapping[type] || type.toString();
};

export default function ProjectDetailTabs({ project, comments, commentCount, tabs }: ProjectDetailTabsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    // Sync tab with URL
    const currentTab = searchParams.get("tab") || "description";
    const [activeTab, setActiveTab] = useState(currentTab);

    const [commentContent, setCommentContent] = useState("");
    const [submittingComment, setSubmittingComment] = useState(false);
    const [replyToId, setReplyToId] = useState<number | null>(null);
    const [replyContent, setReplyContent] = useState("");

    // Local temporary comments for faster UI
    const [optimisticComments, setOptimisticComments] = useState<Comment[]>([]);

    // Clear optimistic comments when actual comments prop updates
    useEffect(() => {
        setOptimisticComments([]);
    }, [comments]);

    // Update state when URL changes
    useEffect(() => {
        if (currentTab !== activeTab) {
            setActiveTab(currentTab);
        }
    }, [currentTab]);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        router.push(`${pathname}?tab=${tabId}`, { scroll: false });
    };

    const handlePostComment = async (parentId: number | null = null) => {
        const content = parentId ? replyContent : commentContent;
        if (!content.trim()) return;

        try {
            setSubmittingComment(true);
            const result = await createComment(project.id, content, parentId);
            if (result.success) {
                if (parentId) {
                    setReplyContent("");
                    setReplyToId(null);
                } else {
                    setCommentContent("");
                }

                // Refresh server data without full page reload
                startTransition(() => {
                    router.refresh();
                });
            } else {
                alert(result.error || "Failed to post comment");
            }
        } catch (err) {
            console.error("Error posting comment:", err);
        } finally {
            setSubmittingComment(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-none shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="w-full border-b border-gray-200 dark:border-gray-700">
                <div className="overflow-x-auto overflow-y-hidden transition-all scrollbar-hide">
                    <div className="min-w-max">
                        <ProjectTabs
                            tabs={tabs}
                            activeTab={activeTab}
                            onTabChange={handleTabChange}
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
                        <p className="text-gray-500 italic">{project.changelog}.</p>
                    </div>
                )}

                {activeTab === "comments" && (
                    <div className="animate-in fade-in duration-300 space-y-8">
                        <div className="flex items-center justify-between border-b pb-4 border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold italic text-gray-900 dark:text-white uppercase tracking-tight">
                                Comments ({commentCount})
                            </h2>
                        </div>

                        {/* Comment Input */}
                        <div className="space-y-4 bg-gray-50 dark:bg-gray-900/50 p-4 border border-gray-100 dark:border-gray-700">
                            <textarea
                                value={commentContent}
                                onChange={(e) => setCommentContent(e.target.value)}
                                placeholder="Write a comment..."
                                className="w-full min-h-[100px] p-4 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none focus:border-green-600 transition-colors"
                            />
                            <div className="flex justify-end">
                                <button
                                    onClick={() => handlePostComment(null)}
                                    disabled={submittingComment || !commentContent.trim()}
                                    className="text-xs font-bold text-green-600 hover:text-green-700 uppercase tracking-widest border border-green-600 px-6 py-2 hover:bg-green-50 transition-colors disabled:opacity-50"
                                >
                                    {submittingComment ? "Posting..." : "Post Comment"}
                                </button>
                            </div>
                        </div>

                        <div className={`space-y-8 relative ${isPending ? 'grayscale-[0.5] opacity-80' : ''} transition-all duration-500`}>
                            {isPending && (
                                <div className="absolute top-0 right-0 animate-pulse text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 z-10">
                                    Refreshing list...
                                </div>
                            )}

                            {(comments.length > 0) ? (
                                <div className="space-y-8">
                                    {comments.map((comment) => (
                                        <div key={comment.id} className="space-y-4">
                                            {/* Main Comment */}
                                            <div className="flex gap-4 group">
                                                <Link href={`/user/${comment.user.slug || `${comment.user.id}-${comment.user.username.toLowerCase().replace(/\s+/g, '-')}`}`} className="shrink-0 hover:opacity-80 transition-opacity">
                                                    <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-none overflow-hidden hover:border-green-600 transition-colors">
                                                        <img
                                                            src={comment.user.avatarUrl}
                                                            alt={comment.user.displayName || comment.user.username}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </Link>
                                                <div className="flex-1 space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <Link href={`/user/${comment.user.slug || `${comment.user.id}-${comment.user.username.toLowerCase().replace(/\s+/g, '-')}`}`} className="text-sm font-bold text-gray-900 dark:text-white hover:text-green-600 transition-colors flex items-center gap-1">
                                                            {comment.user.displayName || comment.user.username}
                                                            {comment.user.status === 4 && (
                                                                <div className="w-3 h-3 bg-blue-500 rounded-none flex items-center justify-center shrink-0">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="white" className="w-2 h-2">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                                    </svg>
                                                                </div>
                                                            )}
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
                                                        <button
                                                            onClick={() => setReplyToId(replyToId === comment.id ? null : comment.id)}
                                                            className="mt-2 text-[10px] font-bold text-gray-400 hover:text-green-600 uppercase tracking-[0.15em] flex items-center gap-1 transition-colors"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                                            </svg>
                                                            {replyToId === comment.id ? "Cancel Reply" : "Reply"}
                                                        </button>

                                                        {replyToId === comment.id && (
                                                            <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                                                                <textarea
                                                                    value={replyContent}
                                                                    onChange={(e) => setReplyContent(e.target.value)}
                                                                    placeholder="Write a reply..."
                                                                    className="w-full min-h-[80px] p-3 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none focus:border-green-600 transition-colors"
                                                                />
                                                                <div className="flex justify-end">
                                                                    <button
                                                                        onClick={() => handlePostComment(comment.id)}
                                                                        disabled={submittingComment || !replyContent.trim()}
                                                                        className="text-[10px] font-bold text-green-600 hover:text-green-700 uppercase tracking-widest border border-green-600 px-4 py-1.5 hover:bg-green-50 transition-colors disabled:opacity-50"
                                                                    >
                                                                        {submittingComment ? "Replying..." : "Post Reply"}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
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
                                                                        alt={reply.user.displayName || reply.user.username}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                            </Link>
                                                            <div className="flex-1 space-y-1">
                                                                <div className="flex items-center gap-2">
                                                                    <Link href={`/user/${reply.user.slug || `${reply.user.id}-${reply.user.username.toLowerCase().replace(/\s+/g, '-')}`}`} className="text-xs font-bold text-gray-800 dark:text-gray-200 hover:text-green-600 transition-colors flex items-center gap-1">
                                                                        {reply.user.displayName || reply.user.username}
                                                                        {reply.user.status === 4 && (
                                                                            <div className="w-2.5 h-2.5 bg-blue-500 rounded-none flex items-center justify-center shrink-0">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={5} stroke="white" className="w-1.5 h-1.5">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                                                </svg>
                                                                            </div>
                                                                        )}
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
                                                                <button
                                                                    onClick={() => setReplyToId(replyToId === reply.id ? null : reply.id)}
                                                                    className="mt-1 text-[9px] font-bold text-gray-400 hover:text-green-600 uppercase tracking-widest flex items-center gap-1 transition-colors"
                                                                >
                                                                    {replyToId === reply.id ? "Cancel Reply" : "Reply"}
                                                                </button>

                                                                {replyToId === reply.id && (
                                                                    <div className="mt-3 space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
                                                                        <textarea
                                                                            value={replyContent}
                                                                            onChange={(e) => setReplyContent(e.target.value)}
                                                                            placeholder={`Reply to ${reply.user.displayName || reply.user.username}...`}
                                                                            className="w-full min-h-[60px] p-2 text-[10px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none focus:border-green-600 transition-colors"
                                                                        />
                                                                        <div className="flex justify-end">
                                                                            <button
                                                                                onClick={() => handlePostComment(comment.id)} // Still parent to the main comment
                                                                                disabled={submittingComment || !replyContent.trim()}
                                                                                className="text-[9px] font-bold text-green-600 hover:text-green-700 uppercase tracking-widest border border-green-600 px-3 py-1 hover:bg-green-50 transition-colors disabled:opacity-50"
                                                                            >
                                                                                {submittingComment ? "Replying..." : "Post Reply"}
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                )}
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
                    <div className="animate-in fade-in duration-300 space-y-6">
                        <div>
                            <h2 className="text-xl font-bold mb-4 italic text-gray-900 dark:text-white uppercase tracking-tight">
                                Supported Versions
                            </h2>
                            {project.versions && project.versions.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {project.versions.map((v: any) => (
                                        <div key={v.id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700">
                                            <div className="w-8 h-8 rounded-none bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-green-600 dark:text-green-500">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                                                    {getPlatformName(v.platformType)}
                                                </p>
                                                <p className="text-sm font-bold text-gray-900 dark:text-white">v{v.versionNumber}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 italic text-sm font-medium">No specific version requirements listed.</p>
                            )}
                        </div>
                        <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold mb-4 italic text-gray-900 dark:text-white uppercase tracking-tight">
                                Guide
                            </h2>
                            <p className="text-gray-500 italic">Installation guide coming soon...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
