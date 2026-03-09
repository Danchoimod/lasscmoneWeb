"use client";

import React from "react";

export default function PrivacyPolicy() {
  const lastModified = "January 29, 2026";

  return (
    <div className="bg-[#E9ECEF] font-sans text-[#333]">

      <main className="mx-auto flex w-full max-w-[1100px] grow gap-6 px-4 py-6">
        {/* Main Content (Left) */}
        <div className="grow rounded-sm border border-[#D1D4D7] bg-white">
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
                At <a href="https://lflauncher.org" className="text-[#4F8A10] hover:underline font-medium">https://lflauncher.org</a>, accessible from https://lflauncher.org, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by lflauncher.org and how we use it.
              </p>
              <p>
                If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#333]">1. Log Files</h2>
              <p>
                lflauncher.org follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#333]">2. Cookies and Web Beacons</h2>
              <p>
                Like any other website, lflauncher.org uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#333]">3. Google DoubleClick DART Cookie</h2>
              <p>
                Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" className="text-[#4F8A10] hover:underline">https://policies.google.com/technologies/ads</a>
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#333]">4. Our Advertising Partners</h2>
              <p>
                Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Google: <a href="https://policies.google.com/technologies/ads" className="text-[#4F8A10] hover:underline">https://policies.google.com/technologies/ads</a>
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#333]">5. Third Party Privacy Policies</h2>
              <p>
                lflauncher.org's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
              </p>
              <p>
                You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#333]">6. Children's Information</h2>
              <p>
                Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
              </p>
              <p>
                lflauncher.org does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#333]">7. Consent</h2>
              <p>
                By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
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