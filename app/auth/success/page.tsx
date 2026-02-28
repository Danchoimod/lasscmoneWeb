"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { googleLoginAction } from "@/lib/actions";

function SuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function handleSuccess() {
            let token = searchParams.get("token");

            // If not in URL, check localStorage (as per new backend behavior)
            if (!token) {
                token = localStorage.getItem("token") || localStorage.getItem("idToken");
            }

            if (!token) {
                setError("Authentication token is missing. Please try logging in again.");
                return;
            }

            try {
                // Remove from localStorage after picking it up to keep it clean, 
                // but only after successful login check? We'll keep it for now as it's the source.

                const result = await googleLoginAction(token);

                if (result.success) {
                    // Clean up if we used localStorage
                    localStorage.removeItem("token");
                    localStorage.removeItem("idToken");
                    window.location.href = "/";
                } else {
                    setError(result.error || "Failed to initialize session.");
                }
            } catch (err) {
                console.error("Auth success processing error:", err);
                setError("An unexpected error occurred during login.");
            }
        }

        handleSuccess();
    }, [searchParams]);

    if (error) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center p-4">
                <div className="w-full max-w-md bg-white p-8 shadow-xl border border-red-100">
                    <h1 className="text-xl font-bold text-red-600 mb-4">Login Failed</h1>
                    <p className="text-slate-600 mb-6">{error}</p>
                    <button
                        onClick={() => router.push("/login")}
                        className="w-full bg-black py-3 text-sm font-bold text-white hover:bg-zinc-800 transition-all"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="flex flex-col items-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-black mb-4"></div>
                <h1 className="text-xl font-bold text-slate-900">Logging you in...</h1>
                <p className="text-slate-600 mt-2">Please wait while we finalize your session.</p>
            </div>
        </div>
    );
}

export default function AuthSuccessPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen flex-col items-center justify-center p-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-black mb-4"></div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
