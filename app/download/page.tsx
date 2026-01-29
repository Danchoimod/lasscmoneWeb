"use client";

import Image from "next/image";
import { Download, ChevronRight, ShieldCheck, Zap, Heart } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function DownloadPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F6F6] font-sans text-zinc-900">
      {/* Fixed Navbar at the top */}
      <Navbar />

      {/* Hero Download Section */}
      <section className="relative w-full bg-[#111] py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('/next.svg')] bg-repeat bg-[length:200px_200px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
        
        <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto px-6 text-center">
          {/* Logo Box - Changed from rounded-3xl to rounded-none */}
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-none bg-zinc-100 shadow-2xl overflow-hidden border-2 border-zinc-800">
            <Image
              src="/icons/icon.jpg" 
              alt="LF Launcher Logo"
              width={96}
              height={96}
              className="object-cover rounded-none"
              priority
            />
          </div>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-6xl text-white uppercase italic">
            LF <span className="text-[#D4A017]">Launcher</span>
          </h1>
          
          <p className="mb-10 max-w-2xl text-lg leading-8 text-zinc-300">
            The ultimate launcher for Minecraft Bedrock Edition. 
            Integrated LF Coin, seamless Add-on management, and superior performance.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row w-full max-w-md">
            {/* Windows Button - Changed to rounded-none */}
            <a
              href="#"
              className="flex-1 flex h-16 items-center justify-center gap-3 rounded-none bg-[#D4A017] hover:bg-[#C19214] text-black font-black text-lg transition-all active:scale-95 shadow-lg"
            >
              <Download size={24} />
              WINDOWS
            </a>
            
            {/* Android Button - Changed to rounded-none */}
            <a
              href="#"
              className="flex-1 flex h-16 items-center justify-center gap-3 rounded-none bg-white hover:bg-zinc-100 text-black font-black text-lg transition-all active:scale-95 shadow-lg border-b-4 border-zinc-300"
            >
              <ChevronRight size={24} />
              ANDROID
            </a>
          </div>
          
          <p className="mt-4 text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Version 1.2.4 (Stable) • Updated on Jan 27, 2026
          </p>
        </div>
      </section>

      {/* Features section */}
      <main className="w-full max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-zinc-800 mb-8 border-l-4 border-[#4CAF50] pl-4 uppercase">
          Why choose LF Launcher?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 - Container already square, ensuring no hidden rounded classes */}
          <div className="bg-white border border-zinc-200 p-8 shadow-sm hover:shadow-md transition-shadow rounded-none">
            <div className="w-12 h-12 bg-zinc-100 flex items-center justify-center mb-6 rounded-none">
              <Zap className="text-zinc-900" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-zinc-800">Minecraft won't start or work properly. What should I do?</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              It happens! :) You can contact our free support team for assistance (see contact details below).
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white border border-zinc-200 p-8 shadow-sm hover:shadow-md transition-shadow rounded-none">
            <div className="w-12 h-12 bg-zinc-100 flex items-center justify-center mb-6 rounded-none">
              <ShieldCheck className="text-zinc-900" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-zinc-800">Is it safe to use?</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              LF Launcher is completely safe. If you download it from this official website, it is guaranteed to be free of any malware.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white border border-zinc-200 p-8 shadow-sm hover:shadow-md transition-shadow rounded-none">
            <div className="w-12 h-12 bg-zinc-100 flex items-center justify-center mb-6 overflow-hidden rounded-none">
                <Heart className="text-zinc-900" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-zinc-800">Is it free?</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Yes, the launcher is entirely free. There are no paid features and there never will be.
            </p>
          </div>
        </div>

        {/* Requirements Section - Removed overflow-hidden to ensure square corners on borders */}
        <div className="mt-16 bg-white border border-zinc-200 shadow-sm rounded-none">
            <div className="bg-zinc-800 p-4 rounded-none">
              <h3 className="text-white font-bold uppercase tracking-wider text-xs">System Requirements</h3>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="flex flex-col gap-2">
                 <span className="text-zinc-400 font-bold uppercase text-[10px]">Operating System</span>
                 <p className="text-zinc-700 font-bold">Windows 10/11 64-bit or Android 9.0+</p>
              </div>
              <div className="flex flex-col gap-2">
                 <span className="text-zinc-400 font-bold uppercase text-[10px]">Disk Space</span>
                 <p className="text-zinc-700 font-bold">Minimum 500MB free space</p>
              </div>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}