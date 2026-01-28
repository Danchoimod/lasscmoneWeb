"use client";

import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F6F6] font-sans text-zinc-900">
      {/* Navbar xuất hiện cố định ở trên */}
      <Navbar />

      <main className="flex-grow">
        {/* Section Đăng nhập: Chiếm trung tâm màn hình */}
        <section className="flex flex-col items-center justify-center px-4 py-2 md:py-8">
          <div className="w-full max-w-md bg-white  shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8">
              {/* Tiêu đề */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Login to your account
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                  You must be logged in to perform this action.
                </p>
              </div>

              {/* Đăng nhập mạng xã hội: Discord & Google */}
              <div className="flex flex-col gap-3">
                {/* Discord Button */}
                <button className="flex h-11 w-full items-center justify-center gap-3  border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.98]">
                  <img 
                    src="https://www.svgrepo.com/show/353655/discord-icon.svg" 
                    alt="Discord" 
                    className="h-5 w-5" 
                  />
                  Continue with Discord
                </button>

                {/* Google Button */}
                <button className="flex h-11 w-full items-center justify-center gap-3  border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.98]">
                  <img 
                    src="https://www.svgrepo.com/show/475656/google-color.svg" 
                    alt="Google" 
                    className="h-5 w-5" 
                  />
                  Continue with Google
                </button>
              </div>

              {/* Đường kẻ phân cách */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-slate-500 font-medium">Or email</span>
                </div>
              </div>

              {/* Form nhập liệu */}
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="sr-only" htmlFor="email">Email address</label>
                  <input 
                    id="email"
                    name="email" 
                    type="email" 
                    required 
                    className="block w-full  border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-black focus:ring-1 focus:ring-black" 
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
                    className="block w-full  border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-black focus:ring-1 focus:ring-black" 
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
                  className="w-full  bg-black py-3 text-sm font-bold text-white transition-all hover:bg-zinc-800 active:scale-[0.99]"
                >
                  Continue
                </button>
              </form>

              {/* Link đăng ký */}
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