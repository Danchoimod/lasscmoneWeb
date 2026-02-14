"use client";

import React, { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic xử lý đăng ký với Firebase sẽ nằm ở đây
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!formData.agreeTerms) {
      alert("Please agree to the Terms and Conditions");
      return;
    }
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="bg-[#F6F6F6] font-sans text-zinc-900">

      <main className="flex-grow">
        <section className="flex flex-col items-center justify-center px-4 py-2 md:py-8">
          <div className="w-full max-w-md bg-white shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8">
              {/* Tiêu đề */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Create an account
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                  Join us today and start your journey.
                </p>
              </div>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-slate-500 font-medium">Register with email</span>
                </div>
              </div>

              {/* Form đăng ký */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Username */}
                <div>
                  <label className="sr-only" htmlFor="username">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="block w-full ro border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-black focus:ring-1 focus:ring-black"
                    placeholder="Username"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="sr-only" htmlFor="email">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-black focus:ring-1 focus:ring-black"
                    placeholder="Email Address"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="sr-only" htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-black focus:ring-1 focus:ring-black"
                    placeholder="Password"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="sr-only" htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-black focus:ring-1 focus:ring-black"
                    placeholder="Confirm Password"
                  />
                </div>

                {/* Checkbox Đồng ý điều khoản */}
                <div className="flex items-start space-x-2 py-2">
                  <input
                    id="agreeTerms"
                    name="agreeTerms"
                    type="checkbox"
                    required
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                  />
                  <label htmlFor="agreeTerms" className="text-xs text-slate-500 leading-relaxed">
                    I agree to the
                    <a href="/terms" className="underline mx-1">Terms of Use</a> and
                    <a href="/privacy-policy" className="underline mx-1">Privacy Policy</a>.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full  bg-black py-3 text-sm font-bold text-white transition-all hover:bg-zinc-800 active:scale-[0.99]"
                >
                  Create account
                </button>
              </form>

              {/* Chuyển sang trang Login */}
              <div className="mt-8 text-center text-sm text-slate-600">
                Already have an account?{" "}
                <a href="/login" className="font-bold text-[#4285f4] hover:underline">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}