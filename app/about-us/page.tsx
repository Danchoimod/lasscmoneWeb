import React from "react";
import { CheckCircle2, Shield, Zap, Globe } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about LASSCMONE STUDIO — the team behind LF Launcher. Our mission is to make Minecraft content installation seamless for Android and PC players worldwide.",
};

export default function AboutUsPage() {
    const lastModified = "March 09, 2026";

    return (
        <div className="bg-[#E9ECEF] font-sans text-[#333]">
            <main className="mx-auto w-full max-w-[1100px] px-4 py-8">
                {/* Main Content Card */}
                <div className="w-full rounded-sm border border-[#D1D4D7] bg-white shadow-sm overflow-hidden">
                    {/* Section Header */}
                    <div className="border-b border-[#EEE] bg-[#F8F9FA] px-6 py-3">
                        <h1 className="text-sm font-bold uppercase tracking-wide text-[#555]">
                            ABOUT LF LAUNCHER
                        </h1>
                    </div>

                    {/* Content Body */}
                    <div className="p-4 md:p-8 text-[15px] leading-[1.7] text-[#444] space-y-10 wrap-break-word overflow-hidden">

                        {/* Introduction */}
                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-[#333] border-b border-[#EEE] pb-2 uppercase tracking-tight">Our Mission</h2>
                            <p>
                                At <a href="https://lflauncher.org" className="text-[#4F8A10] hover:underline font-medium">https://lflauncher.org</a> (LASSCMONE STUDIO), we believe that playing Minecraft should be about creativity and adventure, not technical hurdles. Starting from a blank canvas, we built LF Launcher to serve as the ultimate bridge between creators and players on both Android and PC.
                            </p>
                            <p>
                                Our philosophy is simple: <strong>"Built from zero. Waiting for my miracle."</strong> This project represents a journey of persistence, transforming from a personal challenge into a full-featured ecosystem for the global Minecraft community.
                            </p>
                        </section>

                        {/* The Miracle We Are Building */}
                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-[#333] border-b border-[#EEE] pb-2 uppercase tracking-tight">The Miracle We Are Building</h2>
                            <p>
                                The Minecraft content landscape can be fragmented and difficult to navigate, especially for mobile users. We focused on the struggle that Android and Java Edition players face when trying to install complex mods, 3D models, and expansive maps. We are building a platform that doesn't just host files, but ensures they work seamlessly with your game version.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                <div className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-100 italic">
                                    <CheckCircle2 className="w-5 h-5 text-[#4F8A10] shrink-0 mt-0.5" />
                                    <span>Verified content checked for safety and compatibility.</span>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-100 italic">
                                    <CheckCircle2 className="w-5 h-5 text-[#4F8A10] shrink-0 mt-0.5" />
                                    <span>One-click technology to handle complex archive structures.</span>
                                </div>
                            </div>
                        </section>

                        {/* Core Values */}
                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-[#333] border-b border-[#EEE] pb-2 uppercase tracking-tight">Why Choose LF Launcher?</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <Shield className="w-8 h-8 text-[#4F8A10] shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-[#333]">Uncompromising Security</h3>
                                        <p className="text-[#555]">Safety is the foundation of our studio. We use official Microsoft/Mojang Authentication APIs, ensuring your account credentials never touch our servers directly. Every mod and map in our marketplace is analyzed for malicious code before it reaches your device.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Zap className="w-8 h-8 text-[#4F8A10] shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-[#333]">Performance First Architecture</h3>
                                        <p className="text-[#555]">We develop our software to be lightweight. Whether you're using our Android app or our desktop tools, LF Launcher is designed to use minimal system resources, giving your game the performance it needs while managing even the largest modpacks.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Globe className="w-8 h-8 text-[#4F8A10] shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-[#333]">A Growing Ecosystem</h3>
                                        <p className="text-[#555]">LASSCMONE STUDIO isn't just about a single tool. From relay servers to global content hosting and cross-platform syncing, we are creating a world where your Minecraft setup follows you wherever you go.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Our Commitment */}
                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-[#333] border-b border-[#EEE] pb-2 uppercase tracking-tight">Our Commitment to You</h2>
                            <p>
                                We listen to our community. Every update we release is based on the feedback from players like you. We are committed to keeping LF Launcher accessible, free to use, and focused on the joy of Minecraft content.
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Simplicity:</strong> Installation should be a joy, not a chore.</li>
                                <li><strong>Transparency:</strong> We are open about how our tools work and how they handle your data.</li>
                                <li><strong>Innovation:</strong> We are always looking for new ways to make Minecraft content better.</li>
                            </ul>
                        </section>

                        {/* Contact */}
                        <section className="space-y-3 pt-6 border-t border-[#EEE]">
                            <p>
                                If you have questions, feedback, or want to contribute to our project, we would love to hear from you. Join our <a href="https://discord.gg/3pGfja3ceW" className="text-[#4F8A10] hover:underline font-medium">Discord Community</a> or email us at:
                                <a href="mailto:support@lflauncher.org" className="text-[#4F8A10] hover:underline font-medium ml-1">
                                    support@lflauncher.org
                                </a>
                            </p>
                        </section>

                        <div className="pt-4 text-xs text-[#999] flex justify-between items-center">
                            <span>© 2026 LASSCMONE STUDIO.</span>
                            <span>Last modified: {lastModified}</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
