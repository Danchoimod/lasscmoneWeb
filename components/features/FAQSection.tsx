"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "Is it free?",
        answer: "Absolutely free. There are no paid features and there never will be."
    },
    {
        question: "Is it safe?",
        answer: "(LF Launcher) is completely safe if you download it from this website. If you are familiar with Java or just want to explore, our source code is open for review."
    },
    {
        question: "Can I modify the game (use mods)?",
        answer: "Yes! You can install Forge or Fabric versions directly within the launcher, or install them manually just like the official launcher."
    },
    {
        question: "Can I change my skin?",
        answer: "Yes! Add an Ely.by account so that other LF Launcher users can see your skin. You can find this in the Accounts menu."
    },
    {
        question: "Does LF Launcher support mobile downloads?",
        answer: "Yes, it does. You can download the mobile version right here on the download page. Instructions are included in the compressed file."
    },
    {
        question: "It's not running, what should I do?",
        answer: "Who knows? :) Please contact our support team below for assistance."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="mt-16 space-y-8">
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
                        >
                            <span className="font-bold text-zinc-800 group-hover:text-[#D4A017] transition-colors uppercase text-sm tracking-wide">
                                {faq.question}
                            </span>
                            {openIndex === index ? (
                                <ChevronUp className="text-zinc-400 group-hover:text-[#D4A017]" size={20} />
                            ) : (
                                <ChevronDown className="text-zinc-400 group-hover:text-[#D4A017]" size={20} />
                            )}
                        </button>

                        <div
                            className={`transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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
