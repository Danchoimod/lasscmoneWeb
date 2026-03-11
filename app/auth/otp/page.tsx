"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyOtpAction } from "@/lib/actions";
import { showAlert } from "@/lib/swal";


function OTPForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [timer, setTimer] = useState(60);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => setTimer(timer - 1), 1000);
            return () => clearInterval(countdown);
        }
    }, [timer]);

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        const data = e.clipboardData.getData("text").trim();
        if (data.length === 6 && !isNaN(Number(data))) {
            setOtp(data.split(""));
            inputRefs.current[5]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join("");
        if (otpValue.length < 6) {
            setError("Please enter the full 6-digit code.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            if (!email) {
                setError("Email is missing. Please try signing up again.");
                return;
            }

            const result = await verifyOtpAction(email, otpValue);

            if (result.success) {
                await showAlert("Success", "Verification successful! Your account is now active.", "success");
                router.push("/login");
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = () => {
        if (timer === 0) {
            setTimer(60);
            // Logic for resending OTP would go here
            console.log("Resending OTP to:", email);
        }
    };

    return (
        <div className="bg-[#F6F6F6] font-sans text-zinc-900 min-h-screen">
            <main className="flex-grow">
                <section className="flex flex-col items-center justify-center px-4 py-2 md:py-8">
                    <div className="w-full max-w-md bg-white shadow-xl border border-gray-100 overflow-hidden">
                        <div className="p-8">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                    Verify your account
                                </h1>
                                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                                    We've sent a 6-digit confirmation code to <br />
                                    <span className="text-black font-semibold">{email || "your email"}</span>
                                </p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* OTP Input */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="flex justify-between gap-2">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => { inputRefs.current[index] = el; }}
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            onPaste={index === 0 ? handlePaste : undefined}
                                            className="w-full h-12 text-center text-xl font-bold bg-slate-50 border border-slate-200 outline-none transition-all focus:border-black focus:ring-1 focus:ring-black disabled:opacity-50"
                                            required
                                        />
                                    ))}
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
                                            Verifying...
                                        </>
                                    ) : "Verify Account"}
                                </button>
                            </form>

                            {/* Resend Logic */}
                            <div className="mt-8 text-center">
                                <p className="text-slate-500 text-sm italic">
                                    Didn't receive the code?
                                </p>
                                <button
                                    onClick={handleResend}
                                    disabled={timer > 0}
                                    className={`mt-2 text-sm font-bold transition-all ${timer > 0 ? "text-slate-300 cursor-not-allowed" : "text-[#4285f4] hover:underline"
                                        }`}
                                >
                                    {timer > 0 ? `Resend code in ${timer}s` : "Resend new code"}
                                </button>
                            </div>

                            {/* Chuyển sang trang Login */}
                            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                                <button
                                    onClick={() => router.push("/login")}
                                    className="text-sm font-bold text-slate-600 hover:text-black transition-colors"
                                >
                                    Back to Login
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default function OTPPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#F6F6F6]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        }>
            <OTPForm />
        </Suspense>
    );
}
