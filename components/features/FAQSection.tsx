"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "What is LF Launcher and how is it different from the official Minecraft app?",
        answer: "LF Launcher is a companion platform for Minecraft Bedrock Edition on Android and Windows. While the official app handles the base game, LF Launcher provides a curated library of verified Add-Ons, Maps, Resource Packs, and Skins with one-click installation — removing the need to manually manage files or use third-party file managers."
    },
    {
        question: "Is LF Launcher completely free to use?",
        answer: "Yes, LF Launcher is 100% free. There are no subscriptions, no in-app purchases, and no premium tiers. Every feature — including the content library, one-click install, and download manager — is available to all users at no cost."
    },
    {
        question: "Is it safe to download and use LF Launcher?",
        answer: "Absolutely. LF Launcher is safe to use when downloaded from the official website at lflauncher.org. All content in our library is scanned for malware before being made available. Our authentication system uses Microsoft's official OAuth 2.0 flow, which means your account credentials are never stored on our servers."
    },
    {
        question: "Which devices and operating systems are supported?",
        answer: "LF Launcher officially supports Android 9.0 and above for mobile devices, and Windows 10 (64-bit) or Windows 11 for PC. Both platforms use the Minecraft Bedrock Edition engine. At least 500 MB of free storage space is recommended for the launcher and downloaded content."
    },
    {
        question: "How does one-click installation work?",
        answer: "When you find a Mod, Map, or Resource Pack you want in the LF Launcher library, simply tap the Download button. The launcher handles the entire process: downloading the file, verifying its integrity, and opening it with Minecraft for automatic import. You will see a 'Successfully imported' notification in Minecraft when it is ready to use."
    },
    {
        question: "What should I do if an installation fails or the content does not appear in-game?",
        answer: "First, ensure your Minecraft app is updated to the latest version, as some Add-Ons require a specific minimum version. If a Duplicate Pack Detected error appears, remove the older version through Minecraft Settings then Storage before reinstalling. If issues persist, please contact our support team via Discord at discord.gg/3pGfja3ceW or email support@lflauncher.org."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="mt-16 space-y-8">
            {/* FAQ JSON-LD for Google Rich Snippets */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs.map(faq => ({
                            "@type": "Question",
                            "name": faq.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.answer
                            }
                        }))
                    })
                }}
            />

            <div className="flex items-center gap-3 border-l-4 border-[#D4A017] pl-4">
                <HelpCircle className="text-[#D4A017]" size={24} />
                <h2 className="text-2xl font-bold text-zinc-800 uppercase tracking-tight">
                    Frequently Asked Questions
                </h2>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-zinc-200 bg-white rounded-none overflow-hidden transition-all duration-200"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex items-center justify-between p-5 text-left hover:bg-zinc-50 transition-colors group"
                            aria-expanded={openIndex === index}
                        >
                            <span className="font-bold text-zinc-800 group-hover:text-[#D4A017] transition-colors uppercase text-sm tracking-wide">
                                {faq.question}
                            </span>
                            {openIndex === index ? (
                                <ChevronUp className="text-zinc-400 group-hover:text-[#D4A017] shrink-0 ml-4" size={20} />
                            ) : (
                                <ChevronDown className="text-zinc-400 group-hover:text-[#D4A017] shrink-0 ml-4" size={20} />
                            )}
                        </button>

                        <div
                            className={`transition-all duration-300 ease-in-out ${
                                openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                            }`}
                        >
                            <div className="p-5 pt-0 text-sm text-zinc-600 leading-relaxed bg-zinc-50/50 border-t border-zinc-100">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
