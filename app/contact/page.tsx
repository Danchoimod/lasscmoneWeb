import React from "react";
import { Metadata } from "next";
import { Mail, MessageSquare, Disc, Github, Youtube, Twitter } from "lucide-react";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with the LF Launcher team for support, business inquiries, or to report issues. Our support team is here for you 24/7 via email and Discord.",
};

export default function ContactPage() {
    return (
        <div className="bg-[#f9fafb] min-h-screen font-sans">
            <main className="max-w-6xl mx-auto px-4 py-20">
                {/* Header section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold tracking-tighter text-zinc-900 uppercase italic mb-4">
                        Get In <span className="text-green-600">Touch</span>
                    </h1>
                    <p className="text-zinc-500 max-w-2xl mx-auto leading-relaxed">
                        Have questions or encountering technical issues? We're dedicated to helping you get the best Minecraft experience. Contact our support team through the official channels below.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    {/* Official Channels */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 border border-zinc-200 shadow-sm rounded-none group hover:border-green-600 transition-colors">
                            <div className="w-12 h-12 bg-zinc-100 flex items-center justify-center mb-6 group-hover:bg-green-100 group-hover:text-green-700 transition-colors">
                                <Mail size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">Email Support</h3>
                            <p className="text-zinc-500 text-sm mb-4">For account recovery, billing inquiries (LF Coins), or formal business proposals.</p>
                            <a href="mailto:support@lflauncher.org" className="text-green-700 font-bold hover:underline">support@lflauncher.org</a>
                        </div>

                        <div className="bg-white p-8 border border-zinc-200 shadow-sm rounded-none group hover:border-[#5865F2] transition-colors">
                            <div className="w-12 h-12 bg-zinc-100 flex items-center justify-center mb-6 group-hover:bg-[#5865F2]/10 group-hover:text-[#5865F2] transition-colors">
                                <Disc size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">Discord Community</h3>
                            <p className="text-zinc-500 text-sm mb-4">Get instant help from our staff and community experts or report bugs in real-time.</p>
                            <a href="https://discord.gg/3pGfja3ceW" target="_blank" rel="noopener noreferrer" className="text-[#5865F2] font-bold hover:underline">discord.gg/3pGfja3ceW</a>
                        </div>
                    </div>

                    {/* Social/Follow Section */}
                    <div className="bg-zinc-900 p-8 flex flex-col justify-between text-white border-b-8 border-green-600">
                        <div>
                            <h3 className="text-2xl font-bold mb-6 italic uppercase underline decoration-green-500 underline-offset-8">Follow Us</h3>
                            <p className="text-zinc-400 leading-relaxed mb-8">
                                Stay updated with the latest version releases, server news, and top-tier community content releases by following our official social media handles.
                            </p>

                            <div className="space-y-6">
                                <a href="https://x.com/TTPGamer269994" className="flex items-center gap-4 hover:text-green-500 transition-colors">
                                    <Twitter size={20} />
                                    <span className="font-bold text-sm uppercase tracking-widest">Twitter / X</span>
                                </a>
                                <a href="https://youtube.com/@danchoimod" className="flex items-center gap-4 hover:text-red-500 transition-colors">
                                    <Youtube size={20} />
                                    <span className="font-bold text-sm uppercase tracking-widest">YouTube News</span>
                                </a>
                                <a href="https://github.com/Danchoimod" className="flex items-center gap-4 hover:text-zinc-400 transition-colors">
                                    <Github size={20} />
                                    <span className="font-bold text-sm uppercase tracking-widest">GitHub Repository</span>
                                </a>
                            </div>
                        </div>

                        <div className="mt-12 pt-12 border-t border-zinc-800">
                            <p className="text-[10px] text-zinc-500 leading-relaxed italic uppercase">
                                Response time: Our staff typically responds within 24–48 hours for email inquiries. For immediate assistance, please use our Discord server.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
