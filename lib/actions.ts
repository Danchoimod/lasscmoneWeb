"use server";

import { signIn, auth } from "@/auth";
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
