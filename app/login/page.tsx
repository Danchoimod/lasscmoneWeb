"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction, googleLoginAction } from "@/lib/actions";
import { getDiscordAuthUrl } from "@/lib/api";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const loginResult = await googleLoginAction(idToken);

      if (loginResult.success) {
        window.location.href = "/";
      } else {
        setError(loginResult.error || "Google login failed on server.");
      }
    } catch (err: any) {
      console.error("Google login error:", err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError("Login cancelled.");
      } else {
        setError("An error occurred during Google login.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDiscordLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const url = await getDiscordAuthUrl();
      if (url) {
        window.location.href = url;
      } else {
        setError("Failed to get Discord authorization URL.");
      }
    } catch (err) {
      console.error("Discord login error:", err);
      setError("An error occurred during Discord login.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await loginAction({ email, password });

      if (result.success) {
        window.location.href = "/";
      } else {
        setError(result.error || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F6F6F6] font-sans text-zinc-900">
      <main className="flex-grow">
        <section className="flex flex-col items-center justify-center px-4 py-2 md:py-8">
          <div className="w-full max-w-md bg-white shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Login to your account
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                  You must be logged in to perform this action.
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleDiscordLogin}
                  disabled={loading}
                  className="flex h-11 w-full items-center justify-center gap-3 border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <img src="https://www.svgrepo.com/show/353655/discord-icon.svg" alt="Discord" className="h-5 w-5" />
                  {loading ? "Redirecting..." : "Continue with Discord"}
                </button>
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="flex h-11 w-full items-center justify-center gap-3 border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
                  Continue with Google
                </button>
              </div>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-slate-500 font-medium">Or email</span>
                </div>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="sr-only" htmlFor="email">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-black focus:ring-1 focus:ring-black"
                    placeholder="Email Address"
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-black focus:ring-1 focus:ring-black"
                    placeholder="Password"
                  />
                </div>

                <div className="flex justify-end">
                  <a href="/forgot-password" className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                    Reset your password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black py-3 text-sm font-bold text-white transition-all hover:bg-zinc-800 active:scale-[0.99] disabled:bg-zinc-500 disabled:cursor-not-allowed"
                >
                  {loading ? "Logging in..." : "Continue"}
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-slate-600">
                Don't have an account?{" "}
                <a href="/signup" className="font-bold text-[#4285f4] hover:underline">
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
