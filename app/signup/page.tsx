"use client";

import React, { useState } from "react";
import { signupAction } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!formData.agreeTerms) {
      setError("Please agree to the Terms and Conditions");
      return;
    }

    setLoading(true);
    try {
      const result = await signupAction(formData);
      if (result.success) {
        // Sau khi đăng ký thành công, chuyển hướng người dùng sang trang OTP
        router.push(`/auth/otp?email=${encodeURIComponent(formData.email)}`);
      } else {
        setError(result.error);
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
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

              {/* Thông báo lỗi */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}

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
                    disabled={loading}
                    value={formData.username}
                    onChange={handleChange}
                    className="block w-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-black focus:ring-1 focus:ring-black disabled:opacity-50"
                    placeholder="Username"
                  />
                </div>

                {/* Display Name */}
                <div>
                  <label className="sr-only" htmlFor="displayName">Display Name</label>
                  <input
                    id="displayName"
                    name="displayName"
                    type="text"
                    disabled={loading}
                    value={formData.displayName}
                    onChange={handleChange}
                    className="block w-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-black focus:ring-1 focus:ring-black disabled:opacity-50"
                    placeholder="Display Name (Optional)"
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
                    disabled={loading}
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-black focus:ring-1 focus:ring-black disabled:opacity-50"
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
                    disabled={loading}
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-black focus:ring-1 focus:ring-black disabled:opacity-50"
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
                    disabled={loading}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-black focus:ring-1 focus:ring-black disabled:opacity-50"
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
                    disabled={loading}
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-black disabled:opacity-50"
                  />
                  <label htmlFor="agreeTerms" className="text-xs text-slate-500 leading-relaxed">
                    I agree to the
                    <a href="/terms" className="underline mx-1">Terms of Use</a> and
                    <a href="/privacy-policy" className="underline mx-1">Privacy Policy</a>.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black py-3 text-sm font-bold text-white transition-all hover:bg-zinc-800 active:scale-[0.99] disabled:opacity-70 flex justify-center items-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </>
                  ) : "Create account"}
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