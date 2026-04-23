import { useSession } from "next-auth/react";

export function useAdminApi() {
    const { data: session } = useSession();
    const token = (session as any)?.accessToken;

    const adminFetch = async (url: string, options: RequestInit = {}) => {
        if (!token) {
            throw new Error("No access token available");
        }

        const headers = {
            ...options.headers,
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        };

        const res = await fetch(url, { ...options, headers });
        if (!res.ok) {
            const error = await res.json().catch(() => ({ error: "Unknown error" }));
            throw new Error(error.message || error.error || `Request failed with status ${res.status}`);
        }
        return res.json();
    };

    return { adminFetch, token, isAdmin: !!token && (session?.user as any)?.status === 4 };
}
