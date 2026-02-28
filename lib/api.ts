import { auth } from "@/auth";

export const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.BACKEND_API_URL || "http://localhost:25461/api";

async function getAuthHeaders(): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json"
    };
    try {
        const session = await auth();
        const token = (session as any)?.accessToken;
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
    } catch (e) {
        // auth() might fail or session might not be available
    }
    return headers;
}

export async function getCarousels() {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${API_BASE_URL}/carousels`, {
            headers,
            next: { revalidate: 3600 }
        });
        if (!res.ok) return [];
        const result = await res.json();
        return result.status === "success" ? result.data : [];
    } catch (error) {
        console.error("Error fetching carousels:", error);
        return [];
    }
}

export async function getPackages(categorySlug?: string | null, page: number = 1) {
    try {
        const headers = await getAuthHeaders();
        let url = `${API_BASE_URL}/packages?page=${page}&limit=10`;
        if (categorySlug) {
            url = `${API_BASE_URL}/categories/${categorySlug}/packages?page=${page}&limit=10`;
        }
        const res = await fetch(url, {
            headers,
            next: { revalidate: 60 }
        });
        if (!res.ok) return { packages: [], pagination: null };
        const result = await res.json();

        let packages = [];
        if (result.status === "success" && result.data?.packages) packages = result.data.packages;
        else if (result.packages) packages = result.packages;
        else if (Array.isArray(result)) packages = result;
        else if (result.data && Array.isArray(result.data)) packages = result.data;

        return {
            packages,
            pagination: result.data?.pagination || result.pagination || null
        };
    } catch (error) {
        console.error("Error fetching packages:", error);
        return { packages: [], pagination: null };
    }
}

export async function searchPackages(query: string, page: number = 1) {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${API_BASE_URL}/packages/search?search=${encodeURIComponent(query)}&page=${page}&limit=10`, {
            headers,
            cache: 'no-store'
        });
        if (!res.ok) return { packages: [], pagination: null };
        const result = await res.json();

        let packages = [];
        if (result.status === "success" && result.data?.packages) packages = result.data.packages;
        else if (result.packages) packages = result.packages;
        else if (Array.isArray(result)) packages = result;

        return {
            packages,
            pagination: result.data?.pagination || result.pagination || null
        };
    } catch (error) {
        console.error("Error searching packages:", error);
        return { packages: [], pagination: null };
    }
}

export async function getPackageBySlug(slug: string) {
    try {
        const headers = await getAuthHeaders();
        console.log(`[API] Fetching package: ${slug}`);
        const res = await fetch(`${API_BASE_URL}/packages/${slug}`, {
            headers,
            cache: 'no-store'
        });
        console.log(`[API] Fetch status: ${res.status}`);
        if (!res.ok) return null;
        const result = await res.json();
        if (result.status === "success" && result.data?.package) return result.data.package;
        if (result.status === "success" && result.data) return result.data;
        if (result.package) return result.package;
        if (result.data) return result.data;
        return result;
    } catch (error) {
        console.error(`Error fetching package ${slug}:`, error);
        return null;
    }
}

export async function getPackageComments(packageId: number, page: number = 1) {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${API_BASE_URL}/comments/package/${packageId}?page=${page}&limit=10`, {
            headers,
            cache: 'no-store'
        });
        if (!res.ok) return { comments: [], total: 0, pagination: null };
        const result = await res.json();

        if (result.status === "success" && result.data) {
            return {
                comments: result.data.comments || [],
                total: result.data.total || 0,
                pagination: result.data.pagination || null
            };
        }

        return { comments: [], total: 0, pagination: null };
    } catch (error) {
        console.error("Error fetching comments:", error);
        return { comments: [], total: 0, pagination: null };
    }
}

export async function getCategories() {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${API_BASE_URL}/categories`, {
            headers,
            cache: 'no-store'
        });
        if (!res.ok) return [];
        const result = await res.json();

        // Bóc tách dữ liệu từ cấu trúc { status, data }
        if (result.status === "success") {
            return Array.isArray(result.data) ? result.data : (result.data?.categories || []);
        }
        return Array.isArray(result) ? result : [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

export async function getUserProfile(slug: string) {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${API_BASE_URL}/users/${slug}/profile`, {
            headers,
            cache: 'no-store'
        });
        if (!res.ok) return null;
        const result = await res.json();
        return result.status === "success" ? result.data : null;
    } catch (error) {
        console.error(`Error fetching user profile ${slug}:`, error);
        return null;
    }
}
export async function getVersions() {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${API_BASE_URL}/versions`, {
            headers,
            next: { revalidate: 3600 }
        });
        if (!res.ok) return [];
        const result = await res.json();
        return result.status === "success" ? result.data.versions : [];
    } catch (error) {
        console.error("Error fetching versions:", error);
        return [];
    }
}

export async function getDiscordAuthUrl() {
    try {
        const res = await fetch(`${API_BASE_URL}/auth/discord/url`);
        if (!res.ok) return null;
        const result = await res.json();

        // Handle both standard { status, data: { url } } and direct { url } formats
        if (result.status === "success" && result.data?.url) return result.data.url;
        if (result.url) return result.url;

        return null;
    } catch (error) {
        console.error("Error fetching Discord auth URL:", error);
        return null;
    }
}

export async function loginWithDiscord(code: string) {
    try {
        const res = await fetch(`${API_BASE_URL}/auth/discord`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            return { success: false, error: errorData.message || "Failed to login with Discord" };
        }
        const result = await res.json();
        if (result.status === "success" && result.data?.idToken) {
            return { success: true, data: result.data };
        }
        return { success: false, error: result.message || "Invalid response from server" };
    } catch (error) {
        console.error("Error logging in with Discord:", error);
        return { success: false, error: "Network error during Discord login" };
    }
}

export async function getLatestUpdates() {
    try {
        const res = await fetch(`${API_BASE_URL}/app-updates/latest/all`, {
            next: { revalidate: 3600 }
        });
        if (!res.ok) return { windows: null, android: null };
        const result = await res.json();
        return result.status === "success" ? result.data : { windows: null, android: null };
    } catch (e) {
        console.error("Error fetching latest app updates:", e);
        return { windows: null, android: null };
    }
}
