"use client";

import React, { useState } from "react";
import { UserPlus, UserMinus } from "lucide-react";
import { followUser } from "@/lib/actions";
import { useRouter } from "next/navigation";

interface FollowButtonProps {
    userId: number;
    initialFollowed?: boolean;
    className?: string;
    variant?: "default" | "link" | "compact";
}

export default function FollowButton({
    userId,
    initialFollowed = false,
    className = "",
    variant = "default"
}: FollowButtonProps) {
    const [followed, setFollowed] = useState(initialFollowed);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleFollow = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            setIsLoading(true);
            const result = await followUser(userId);

            if (result.success) {
                setFollowed(result.followed);
                router.refresh(); // Refresh to update follower counts if needed
            } else {
                if (result.isUnauthorized) {
                    router.push("/login");
                } else {
                    alert(result.error || "Failed to process request");
                }
            }
        } catch (err) {
            console.error("Follow error:", err);
            alert("An error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    if (variant === "link") {
        return (
            <button
                onClick={handleFollow}
                disabled={isLoading}
                className={`text-[10px] font-bold uppercase tracking-wider transition-all disabled:opacity-50 flex items-center gap-1 ${followed ? "text-gray-400 hover:text-gray-500" : "text-emerald-600 hover:text-emerald-700"
                    } ${className}`}
            >
                {followed ? (
                    <><UserMinus className="w-2.5 h-2.5" /> unfollow</>
                ) : (
                    <><UserPlus className="w-2.5 h-2.5" /> follow</>
                )}
            </button>
        );
    }

    return (
        <button
            onClick={handleFollow}
            disabled={isLoading}
            className={`flex items-center gap-2 px-6 py-2.5 font-bold uppercase text-sm transition-all shadow-sm active:scale-95 disabled:opacity-50 ${followed
                    ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200"
                    : "bg-[#4CAF50] hover:bg-green-600 text-white"
                } ${className}`}
        >
            {followed ? (
                <>
                    <UserMinus className={`w-4 h-4 ${isLoading ? 'animate-pulse' : ''}`} />
                    unfollow
                </>
            ) : (
                <>
                    <UserPlus className={`w-4 h-4 ${isLoading ? 'animate-pulse' : ''}`} />
                    follow
                </>
            )}
        </button>
    );
}
