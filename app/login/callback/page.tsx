"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginWithDiscord } from "@/lib/api";
import { discordLoginAction } from "@/lib/actions";

function CallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function handleCallback() {
            const code = searchParams.get("code");

            if (!code) {
                setError("Authorization code is missing.");
                return;
            }

            try {
                const result = await loginWithDiscord(code);

                if (result.success && result.data) {
                    const { idToken, user } = result.data;
                    const loginResult = await discordLoginAction(idToken, user);

                    if (loginResult.success) {
                        window.location.href = "/";
                    } else {
                        setError(loginResult.error || "Failed to initialize session.");
                    }
                } else {
                    setError(result.error || "Failed to authenticate with Discord.");
                }
            } catch (err) {
                console.error("Callback error:", err);
                setError("An unexpected error occurred during Discord login.");
            }
        }

        handleCallback();
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
                <h1 className="text-xl font-bold text-slate-900">Authenticating...</h1>
                <p className="text-slate-600 mt-2">Please wait while we complete your login with Discord.</p>
            </div>
        </div>
    );
}

export default function DiscordCallbackPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen flex-col items-center justify-center p-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-black mb-4"></div>
            </div>
        }>
            <CallbackContent />
        </Suspense>
    );
}
