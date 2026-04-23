"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    const isAdmin = (session?.user as any)?.status === 4;

    useEffect(() => {
        if (status === "loading") return; // Wait for session to load
        if (!session || !isAdmin) {
            router.replace("/"); // Redirect non-admins to home
        }
    }, [status, session, isAdmin, router]);

    if (status === "loading") {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"></div>
            </div>
        );
    }

    if (!session || !isAdmin) {
        return null; // Render nothing while redirecting
    }

    return <>{children}</>;
}
