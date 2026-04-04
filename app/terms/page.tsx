import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Read the LF Launcher Terms of Use. Understand the rules and conditions for using our software, website, and services.",
};

export default function TermsOfService() {
  const lastModified = "March 20, 2026";

  return (
    <div className="bg-[#E9ECEF] font-sans text-[#333]">
      <main className="mx-auto flex w-full max-w-[1100px] grow gap-6 px-4 py-6">
        {/* Main Content Column */}
        <div className="grow rounded-sm border border-[#D1D4D7] bg-white">
          {/* Header */}
          <div className="border-b border-[#EEE] bg-[#F8F9FA] px-6 py-3">
            <h1 className="text-sm font-bold uppercase tracking-wide text-[#555]">
              TERMS OF USE - LFLAUNCHER.ORG
            </h1>
          </div>

          {/* Text Content */}
          <div className="p-8 text-[15px] leading-[1.7] text-[#444] space-y-6">
            <p>
              Welcome to LFLauncher. By accessing our website and using the software provided at <a href="https://lflauncher.org" className="text-[#4F8A10] hover:underline font-medium">https://lflauncher.org</a>, you agree to comply with the following terms:
            </p>

            <div className="space-y-4">
              <p><strong>1. Acceptance of Terms</strong><br />
                Using the services at LFLauncher means you have read, understood, and accepted these Terms of Use (ToU). If you do not agree, please stop using the website and remove all software related to LFLauncher from your device.</p>

              <p><strong>2. Software License</strong><br />
                - <strong>Rights:</strong> LFLauncher provides you with a personal, non-exclusive, and revocable license to use the software for personal entertainment purposes.<br />
                - <strong>Restrictions:</strong> You may not modify, reverse engineer, extract source code, or redistribute our software without written consent.<br />
                - <strong>Updates:</strong> The software may automatically download updates to fix bugs or improve features.</p>

              <p><strong>3. Account and Server Regulations</strong><br />
                - <strong>Responsibility:</strong> You are responsible for securing your account information (if any).<br />
                - <strong>Abuse:</strong> Any DDoS attacks, exploitation of security vulnerabilities, or unauthorized interference with LFLauncher's server systems will result in a permanent IP ban and potential legal action.<br />
                - <strong>Cheating:</strong> We do not tolerate the use of third-party software for cheating (cheat/hack) that affects other users in the community.</p>

              <p><strong>4. Third-Party Content</strong><br />
                The website or software may contain links to third-party websites or resources (e.g., mods, shaders, or game servers). LFLauncher does not control and is not responsible for the content, privacy policies, or safety of these third parties.</p>

              <p><strong>5. Disclaimer</strong><br />
                - <strong>Risks:</strong> The software is provided "As-Is". We are not responsible for any hardware damage, data loss, or software conflicts arising during use.<br />
                - <strong>Continuity:</strong> We do not guarantee that the website or servers will operate 100% of the time without interruption.</p>

              <p><strong>6. Changes to Terms</strong><br />
                LFLauncher reserves the right to modify these terms at any time without prior notice. Changes take effect immediately upon being updated on this website.</p>

              <p className="text-[13px] text-[#777] italic">
                * LFLauncher is not affiliated with Mojang Studios or Microsoft. Minecraft is a trademark of Mojang Synergies AB.
              </p>
              <p className="text-[13px] text-[#777] italic">
                * Some components of the software are released under open-source licenses; please refer to the attached LICENSE file.
              </p>
            </div>

            <p className="pt-4 border-t border-[#EEE]">
              The ToU of <a href="https://lflauncher.org" className="text-[#4F8A10] hover:underline font-medium">lflauncher.org</a> were last modified on <strong>{lastModified}</strong>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
