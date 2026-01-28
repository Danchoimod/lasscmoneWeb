"use client";

import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function TermsOfService() {
  const lastModified = "12th May, 2021"; // Ngày dựa theo ảnh bạn gửi

  return (
    <div className="flex min-h-screen flex-col bg-[#E9ECEF] font-sans text-[#333]">
      <Navbar />

      <main className="mx-auto flex w-full max-w-[1100px] flex-grow gap-6 px-4 py-6">
        {/* Cột nội dung chính (Trái) */}
        <div className="flex-grow rounded-sm border border-[#D1D4D7] bg-white">
          {/* Header Header */}
          <div className="border-b border-[#EEE] bg-[#F8F9FA] px-6 py-3">
            <h1 className="text-sm font-bold uppercase tracking-wide text-[#555]">
              TERMS OF USE
            </h1>
          </div>

          {/* Nội dung văn bản */}
          <div className="p-8 text-[15px] leading-[1.7] text-[#444] space-y-6">
            <p>
              The information published on <a href="#" className="text-[#4F8A10] hover:underline font-medium">https://your-website.com</a> is provided to the site visitor upon acceptance of these Terms of Use (hereinafter referred to as “ToU”), the Privacy Policy and other announcements published on <a href="#" className="text-[#4F8A10] hover:underline font-medium">https://your-website.com</a>.
            </p>

            <p>
              If you (the visitor) do not accept the ToU, Privacy Policy and other announcements published on the website, you may not access or use the information published there or the website services. Breach of ToU will result in the removal of your account, server bans and possible other actions.
            </p>

            <p>
              Website has the unilateral right to modify, add or remove any terms or conditions of these ToU without notice or liability to you. Amendments to the ToU are effective without delay following the posting of such amendments. The visitor accepts to review the ToU frequently.
            </p>

            <p className="pt-4 border-t border-[#EEE]">
              The ToU of <a href="#" className="text-[#4F8A10] hover:underline font-medium">your-website.com</a> were last modified on [{lastModified}]
            </p>
          </div>
        </div>

        {/* Sidebar (Phải) */}
        <aside className="hidden w-[300px] flex-shrink-0 space-y-6 md:block text-center">
          {/* Buttons Group */}
          <div className="flex justify-between gap-2">
            <button className="flex-1 rounded-sm bg-[#5CB85C] py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#449d44]">
              Login
            </button>
            <button className="flex-1 rounded-sm bg-[#5CB85C] py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#449d44]">
              Sign Up
            </button>
            <button className="flex-1 rounded-sm bg-[#5BC0DE] py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#31b0d5]">
              Submission
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative border border-[#D1D4D7] bg-white p-2">
            <input 
              type="text" 
              placeholder="To search type and hit enter" 
              className="w-full border border-[#DDD] px-3 py-2 text-sm italic outline-none focus:border-[#BBB]"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
               </svg>
            </span>
          </div>

        </aside>
      </main>

      <Footer />
    </div>
  );
}