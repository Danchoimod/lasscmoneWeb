"use client";

import React from "react";

export default function TermsOfService() {
  const lastModified = "12th May, 2021"; // Ngày dựa theo ảnh bạn gửi

  return (
    <div className="bg-[#E9ECEF] font-sans text-[#333]">

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
      </main>
    </div>
  );
}