import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

const BACKEND_API_URL = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:25461/api";

async function refreshAccessToken(token: any) {
    try {
        console.log("[Auth] Attempting to refresh access token...");
        const response = await fetch(`${BACKEND_API_URL}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: token.refreshToken }),
        });

        const refreshedTokens = await response.json();

        if (!response.ok) {
            console.error("[Auth] Refresh error response:", refreshedTokens);
            throw refreshedTokens;
        }

        console.log("[Auth] Token refreshed successfully");
        return {
            ...token,
            accessToken: refreshedTokens.idToken,
            accessTokenExpires: Date.now() + parseInt(refreshedTokens.expiresIn) * 1000,
            refreshToken: refreshedTokens.refreshToken ?? token.refreshToken, // Fallback to old refresh token
        };
    } catch (error) {
        console.error("[Auth] Error refreshing access token:", error);
        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const idToken = (credentials as any).idToken;
                const email = credentials?.email;
                const password = credentials?.password;
                const preAuthUser = (credentials as any).user ? JSON.parse((credentials as any).user as string) : null;
                const accessToken = (credentials as any).accessToken;
                const refreshToken = (credentials as any).refreshToken;

                if (preAuthUser && accessToken) {
                    return {
                        id: preAuthUser.id || preAuthUser.localId || preAuthUser.uid || preAuthUser.email,
                        email: preAuthUser.email,
                        name: preAuthUser.username || preAuthUser.displayName,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        user: preAuthUser,
                    };
                }

                if (!idToken && (!email || !password)) {
                    return null;
                }

                try {
                    let response;
                    if (idToken) {
                        response = await fetch(`${BACKEND_API_URL}/auth/google`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ idToken, refreshToken }),
                        });
                    } else {
                        response = await fetch(`${BACKEND_API_URL}/auth/login`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ email, password }),
                        });
                    }

                    const data = await response.json();
                    console.log("[Auth] Backend response:", data);

                    if (response.ok && (data.status === "success" || data.idToken || data.data?.idToken)) {
                        const token = data.data?.idToken || data.idToken;
                        const rToken = data.data?.refreshToken || data.refreshToken;
                        const expiresIn = data.data?.expiresIn || data.expiresIn;
                        const user = data.data?.user || { email: data.email, localId: data.localId };

                        if (!token) return null;

                        return {
                            id: user.id || user.localId || user.email,
                            email: user.email,
                            name: user.username || user.displayName,
                            accessToken: token,
                            refreshToken: rToken,
                            expiresIn: parseInt(expiresIn),
                            user: user,
                        };
                    }

                    if (data.error) {
                        throw new Error(data.error);
                    }

                    return null;
                } catch (error) {
                    if (error instanceof Error) {
                        throw error;
                    }
                    console.error("Auth authorize error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Initial sign in
            if (user) {
                console.log("[Auth] JWT Initial sign in. User status:", (user as any).user?.status);
                return {
                    accessToken: (user as any).accessToken,
                    refreshToken: (user as any).refreshToken,
                    accessTokenExpires: Date.now() + ((user as any).expiresIn || 3600) * 1000,
                    user: (user as any).user,
                    status: (user as any).user?.status, // Put status at top level of token
                };
            }

            // Return previous token if the access token has not expired yet
            // Add a 60-second buffer to prevent race conditions with backend
            const shouldRefresh = Date.now() >= (token.accessTokenExpires as number) - 60 * 1000;

            if (!shouldRefresh) {
                return token;
            }

            // Access token has expired, try to update it
            console.log("[Auth] Token expired or nearing expiration, refreshing...");
            return refreshAccessToken(token);
        },
        async session({ session, token }) {
            if (token) {
                (session as any).accessToken = token.accessToken;
                (session as any).user = token.user as any;
                if ((session as any).user) {
                    (session as any).user.status = token.status; // Ensure status is in user object
                }
                (session as any).error = token.error;
            }
            return session;
        },
    },
});
