"use server";

import { signIn, signOut, auth } from "@/auth";
import { API_BASE_URL } from "./api";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export async function loginAction(formData: any) {
    try {
        const { email, password } = formData;

        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        revalidatePath("/");
        return { success: true, user: null }; // user will be in session
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { success: false, error: "Your email or password is incorrect." };
                default:
                    return { success: false, error: "Something went wrong." };
            }
        }
        // In Auth.js v5, redirecting might throw an error that should be rethrown
        if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
            throw error;
        }
        console.error("Login action error:", error);
        return { success: false, error: "Login failed" };
    }
}

export async function getMe() {
    try {
        const session = await auth();
        const token = (session as any)?.accessToken;

        if (!token) {
            return { success: false, error: "No token found", isUnauthorized: true };
        }

        const response = await fetch(`${API_BASE_URL}/me`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (response.status === 401) {
            await signOut({ redirect: false });
            return { success: false, error: "Unauthorized", isUnauthorized: true };
        }

        const data = await response.json();

        if (response.ok && data.status === "success") {
            return { success: true, data: data.data };
        }

        return { success: false, error: data.message || "Failed to fetch profile" };
    } catch (error) {
        console.error("GetMe action error:", error);
        return { success: false, error: "Internal server error" };
    }
}

export async function getFollowing() {
    try {
        const session = await auth();
        const token = (session as any)?.accessToken;

        if (!token) {
            return { success: false, error: "No token found", isUnauthorized: true };
        }

        const response = await fetch(`${API_BASE_URL}/users/me/following`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (response.status === 401) {
            await signOut({ redirect: false });
            return { success: false, error: "Unauthorized", isUnauthorized: true };
        }

        const data = await response.json();

        if (response.ok && data.status === "success") {
            return { success: true, data: data.data, pagination: data.pagination };
        }

        return { success: false, error: data.message || "Failed to fetch following list" };
    } catch (error) {
        console.error("GetFollowing action error:", error);
        return { success: false, error: "Internal server error" };
    }
}

export async function getMyPackages() {
    try {
        const session = await auth();
        const token = (session as any)?.accessToken;

        if (!token) {
            return { success: false, error: "No token found", isUnauthorized: true };
        }

        const response = await fetch(`${API_BASE_URL}/packages/me`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (response.status === 401) {
            await signOut({ redirect: false });
            return { success: false, error: "Unauthorized", isUnauthorized: true };
        }

        const data = await response.json();

        if (response.ok && data.status === "success") {
            return { success: true, data: data.packages || [], pagination: data.pagination };
        }

        return { success: false, error: data.message || "Failed to fetch internal packages" };
    } catch (error) {
        console.error("GetMyPackages action error:", error);
        return { success: false, error: "Internal server error" };
    }
}

export async function getMyPackageById(id: string) {
    try {
        const session = await auth();
        const token = (session as any)?.accessToken;

        if (!token) {
            return { success: false, error: "No token found", isUnauthorized: true };
        }

        const response = await fetch(`${API_BASE_URL}/packages/me/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (response.status === 401) {
            await signOut({ redirect: false });
            return { success: false, error: "Unauthorized", isUnauthorized: true };
        }

        const data = await response.json();

        if (response.ok && data.status === "success") {
            return { success: true, data: data.data.package || data.data };
        }

        return { success: false, error: data.message || "Failed to fetch project details" };
    } catch (error) {
        console.error(`GetMyPackageById action error (${id}):`, error);
        return { success: false, error: "Internal server error" };
    }
}

export async function updateProject(id: string, formData: any) {
    try {
        const session = await auth();
        const token = (session as any)?.accessToken;

        if (!token) {
            return { success: false, error: "No token found", isUnauthorized: true };
        }

        const response = await fetch(`${API_BASE_URL}/packages/me/${id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });

        if (response.status === 401) {
            await signOut({ redirect: false });
            return { success: false, error: "Unauthorized", isUnauthorized: true };
        }

        const data = await response.json();

        if (response.ok && data.status === "success") {
            revalidatePath(`/project/${data.data?.slug || id}`);
            revalidatePath("/profile/project");
            return { success: true, data: data.data };
        }

        return { success: false, error: data.message || "Failed to update project" };
    } catch (error) {
        console.error(`UpdateProject action error (${id}):`, error);
        return { success: false, error: "Internal server error" };
    }
}
export async function createComment(packageId: number, content: string, parentId: number | null = null) {
    try {
        const session = await auth();
        const token = (session as any)?.accessToken;

        if (!token) {
            return { success: false, error: "You must be logged in to comment.", isUnauthorized: true };
        }

        const response = await fetch(`${API_BASE_URL}/comments`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                packageId,
                content,
                parentId: parentId || undefined
            })
        });

        if (response.status === 401) {
            await signOut({ redirect: false });
            return { success: false, error: "Session expired", isUnauthorized: true };
        }

        const data = await response.json();

        if (response.ok && data.status === "success") {
            // Revalidate the project page to show the new comment
            // We don't have the slug here, but we can revalidate by tag if implemented
            // For now, let the client handle UI update or refresh
            return { success: true, data: data.data };
        }

        return { success: false, error: data.message || "Failed to post comment" };
    } catch (error) {
        console.error("CreateComment action error:", error);
        return { success: false, error: "Internal server error" };
    }
}
export async function deleteComment(commentId: number) {
    try {
        const session = await auth();
        const token = (session as any)?.accessToken;

        if (!token) {
            return { success: false, error: "You must be logged in to delete comments.", isUnauthorized: true };
        }

        const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        if (response.status === 401) {
            await signOut({ redirect: false });
            return { success: false, error: "Session expired", isUnauthorized: true };
        }

        if (response.status === 204 || response.ok) {
            return { success: true };
        }

        if (response.status === 403) {
            return { success: false, error: "Not authorized to delete this comment" };
        }

        const data = await response.json().catch(() => ({}));
        return { success: false, error: data.message || "Failed to delete comment" };
    } catch (error) {
        console.error("DeleteComment action error:", error);
        return { success: false, error: "Internal server error" };
    }
}

export async function createReport(data: { reason: string; packageId?: number; targetUserId?: number }) {
    try {
        const session = await auth();
        const token = (session as any)?.accessToken;

        if (!token) {
            return { success: false, error: "You must be logged in to report.", isUnauthorized: true };
        }

        const response = await fetch(`${API_BASE_URL}/reports`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if (response.status === 401) {
            await signOut({ redirect: false });
            return { success: false, error: "Session expired", isUnauthorized: true };
        }

        if (response.ok) {
            return { success: true };
        }

        const result = await response.json().catch(() => ({}));
        return { success: false, error: result.message || "Failed to submit report" };
    } catch (error) {
        console.error("CreateReport action error:", error);
        return { success: false, error: "Internal server error" };
    }
}

export async function followUser(followingId: number) {
    try {
        const session = await auth();
        const token = (session as any)?.accessToken;

        if (!token) {
            return { success: false, error: "You must be logged in to follow users.", isUnauthorized: true };
        }

        const response = await fetch(`${API_BASE_URL}/users/follow`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ followingId })
        });

        if (response.status === 401) {
            await signOut({ redirect: false });
            return { success: false, error: "Session expired", isUnauthorized: true };
        }

        const result = await response.json();
        if (response.ok && result.status === "success") {
            return { success: true, followed: result.data.followed };
        }

        return { success: false, error: result.message || "Failed to process follow request" };
    } catch (error) {
        console.error("FollowUser action error:", error);
        return { success: false, error: "Internal server error" };
    }
}
