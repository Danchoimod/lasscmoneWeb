import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const idToken = (credentials as any).idToken;
                const email = credentials?.email;
                const password = credentials?.password;

                if (!idToken && (!email || !password)) {
                    return null;
                }

                try {
                    let response;
                    if ((credentials as any).idToken) {
                        response = await fetch(`${process.env.BACKEND_API_URL}/auth/google`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ idToken: (credentials as any).idToken }),
                        });
                    } else {
                        const { email, password } = credentials as any;
                        response = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ email, password }),
                        });
                    }

                    const data = await response.json();
                    console.log("[Auth] Backend response:", data);

                    if (response.ok && (data.status === "success" || data.success === true || data.idToken || data.data?.idToken || data.data?.token)) {
                        const token = data.data?.idToken || data.data?.token || data.idToken;
                        const user = data.data?.user || { email: data.email, localId: data.localId };

                        if (!token) return null;

                        return {
                            id: user.id || user.localId || user.email,
                            email: user.email,
                            name: user.username || user.displayName,
                            accessToken: token,
                            user: user,
                        };
                    }

                    return null;
                } catch (error) {
                    console.error("Auth authorize error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.accessToken = (user as any).accessToken;
                token.user = (user as any).user;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                (session as any).accessToken = token.accessToken;
                (session as any).user = token.user as any;
            }
            return session;
        },
    },
});
