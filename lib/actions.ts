"use server";

import { cookies } from "next/headers";
import { API_BASE_URL } from "./api";

export async function logoutAction() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (token) {
            // Notify backend if needed
            await fetch(`${API_BASE_URL}/auth/logout`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
        }

        // Clear cookie
        cookieStore.delete("token");

        return { success: true };
    } catch (error) {
        console.error("Logout action error:", error);
        return { success: false, error: "Logout failed" };
    }
}

export async function loginAction(formData: any) {
    try {
        const { email, password } = formData;

        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok && (data.status === "success" || data.idToken)) {
            const token = data.data?.token || data.idToken;

            if (!token) {
                return { success: false, error: "No token received" };
            }

            const cookieStore = await cookies();
            cookieStore.set({
                name: "token",
                value: token,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: data.expiresIn ? parseInt(data.expiresIn) : 60 * 60 * 24 * 7,
            });

            return {
                success: true,
                user: data.data?.user || { email: data.email, localId: data.localId }
            };
        }

        return { success: false, error: data.message || "Login failed" };
    } catch (error) {
        console.error("Login action error:", error);
        return { success: false, error: "Internal server error" };
    }
}
