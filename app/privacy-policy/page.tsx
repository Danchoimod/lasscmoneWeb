"use client";

import React from "react";

export default function PrivacyPolicy() {
  const lastModified = "January 29, 2026";

  return (
    <div className="bg-[#E9ECEF] font-sans text-[#333]">

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
      </main>
    </div>
  );
}