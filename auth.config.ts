import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnProfile = nextUrl.pathname.startsWith("/profile");
            const isOnAdmin = nextUrl.pathname.startsWith("/profile/admin");

            if (isOnAdmin) {
                if (isLoggedIn && (auth?.user as any)?.status === 4) return true;
                return Response.redirect(new URL("/", nextUrl)); // Redirect non-admins to home
            }

            if (isOnProfile) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn && nextUrl.pathname.startsWith("/login")) {
                // Allow access to login page even if session exists to handle expired tokens
                return true;
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
