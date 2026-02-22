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

export async function getPackages(categorySlug?: string | null) {
    try {
        const headers = await getAuthHeaders();
        let url = `${API_BASE_URL}/packages`;
        if (categorySlug) {
            url = `${API_BASE_URL}/categories/${categorySlug}/packages?page=1&limit=12`;
        }
        const res = await fetch(url, {
            headers,
            next: { revalidate: 60 }
        });
        if (!res.ok) return [];
        const result = await res.json();

        // Handle flexible response formats from backend
        if (result.status === "success" && result.data?.packages) return result.data.packages;
        if (result.packages) return result.packages;
        if (Array.isArray(result)) return result;
        if (result.data && Array.isArray(result.data)) return result.data;

        return [];
    } catch (error) {
        console.error("Error fetching packages:", error);
        return [];
    }
}

export async function searchPackages(query: string) {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${API_BASE_URL}/packages/search?search=${encodeURIComponent(query)}&limit=12`, {
            headers,
            cache: 'no-store'
        });
        if (!res.ok) return [];
        const result = await res.json();

        if (result.status === "success" && result.data?.packages) return result.data.packages;
        if (result.packages) return result.packages;
        if (Array.isArray(result)) return result;

        return [];
    } catch (error) {
        console.error("Error searching packages:", error);
        return [];
    }
}

export async function getPackageBySlug(slug: string) {
    try {
        const headers = await getAuthHeaders();
        console.log(`[API] Fetching package: ${slug}`);
        const res = await fetch(`${API_BASE_URL}/packages/${slug}`, {
            headers,
            next: { revalidate: 60 }
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

export async function getPackageComments(packageId: number) {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${API_BASE_URL}/comments/package/${packageId}`, {
            headers,
            next: { revalidate: 30 }
        });
        if (!res.ok) return { comments: [], total: 0 };
        const result = await res.json();
        if (result.status === "success" && result.data) {
            return {
                comments: result.data.comments || [],
                total: result.data.pagination?.total || 0
            };
        }
        return { comments: [], total: 0 };
    } catch (error) {
        console.error(`Error fetching comments for package ${packageId}:`, error);
        return { comments: [], total: 0 };
    }
}

export async function getCategories() {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${API_BASE_URL}/categories`, {
            headers,
            next: { revalidate: 3600 }
        });
        if (!res.ok) return [];
        return res.json();
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
            next: { revalidate: 60 }
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
