"use client";

import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function PrivacyPolicy() {
  const lastModified = "January 29, 2026"; 

  return (
    <div className="flex min-h-screen flex-col bg-[#E9ECEF] font-sans text-[#333]">
      <Navbar />

      <main className="mx-auto flex w-full max-w-[1100px] flex-grow gap-6 px-4 py-6">
        {/* Main Content (Left) */}
        <div className="flex-grow rounded-sm border border-[#D1D4D7] bg-white">
          {/* Section Header */}
          <div className="border-b border-[#EEE] bg-[#F8F9FA] px-6 py-3">
            <h1 className="text-sm font-bold uppercase tracking-wide text-[#555]">
              PRIVACY POLICY
            </h1>
          </div>

          {/* Content Body */}
          <div className="p-8 text-[15px] leading-[1.7] text-[#444] space-y-6">
            <section className="space-y-4">
              <p>
                At <a href="#" className="text-[#4F8A10] hover:underline font-medium">https://lflauncher.org</a>, your privacy is a top priority. This Privacy Policy document outlines the types of personal information that is received and collected by our website and applications, and how it is used.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#333]">1. Information Collection</h2>
              <p>
                We may collect information regarding your account, such as your email address and Minecraft UUID, to provide a personalized experience. When using our services (like relay servers or launchers), we may also collect log data including IP addresses, browser types, and system specifications to ensure stability and security.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#333]">2. Use of Information</h2>
              <p>
                The information we collect is used to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, operate, and maintain our software and services.</li>
                <li>Improve and personalize user experience.</li>
                <li>Understand and analyze how you use our applications.</li>
                <li>Develop new products, features, and functionality.</li>
                <li>Prevent fraudulent activities and enhance system security.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#333]">3. Third-Party Services</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website or servicing you, so long as those parties agree to keep this information confidential (e.g., Microsoft/Mojang Auth APIs).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#333]">4. Contact Information</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at: 
                <a href="mailto:support@lflauncher.org" className="text-[#4F8A10] hover:underline font-medium ml-1">
                  support@lflauncher.org
                </a>
              </p>
            </section>

            <p className="pt-4 border-t border-[#EEE]">
              The Privacy Policy of <a href="#" className="text-[#4F8A10] hover:underline font-medium">lflauncher.org</a> was last modified on [{lastModified}]
            </p>
          </div>
        </div>

        {/* Sidebar (Right) */}
        <aside className="hidden w-[300px] flex-shrink-0 space-y-6 md:block text-center">
          {/* Buttons Group */}

          {/* Search Bar */}
          <div className="relative border border-[#D1D4D7] bg-white p-2">
            <input 
              type="text" 
              placeholder="Search policy content..." 
              className="w-full border border-[#DDD] px-3 py-2 text-sm italic outline-none focus:border-[#BBB]"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
               </svg>
            </span>
          </div>

          {/* Quick Note Box */}
          <div className="border border-[#D1D4D7] bg-white p-4 text-left text-[13px] text-[#666]">
            <h3 className="font-bold text-[#333] mb-2 uppercase text-[11px]">Quick Note</h3>
            <p>Your data is encrypted and handled according to international security standards.</p>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}