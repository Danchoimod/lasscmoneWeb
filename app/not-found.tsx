import React from "react";
import Link from "next/link";
import { MoveLeft, HelpCircle, Download, FileText } from "lucide-react";

export default function NotFound() {
    return (
        <div className="bg-white min-h-screen font-sans flex items-center justify-center py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-[120px] md:text-[200px] leading-tight font-black text-zinc-100 italic absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 hidden md:block">
                    404
                </h1>
                
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-20 h-2 bg-green-600 mb-8"></div>
                    <div className="mb-4">
                        <span className="text-sm font-black uppercase tracking-[0.3em] text-zinc-400">Error Encountered</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-zinc-900 uppercase italic leading-tight mb-8">
                        The Map You're Looking For... <br />
                        <span className="text-green-600">Doesn't Exist.</span>
                    </h2>
                    
                    <p className="text-zinc-500 max-w-xl mx-auto leading-relaxed mb-12">
                        It looks like the content has been moved, deleted, or the coordinates were typed incorrectly. Don't worry, we can help you find your way back.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
                        <Link 
                            href="/" 
                            className="bg-zinc-900 text-white font-bold px-8 py-4 rounded-none uppercase flex items-center gap-3 hover:bg-green-700 hover:text-white transition-all shadow-xl"
                        >
                            <MoveLeft size={20} />
                            Back to Home
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl px-4">
                        <Link href="/blog" className="flex flex-col items-center gap-3 p-6 border border-zinc-100 hover:border-green-600 transition-colors">
                            <FileText className="text-zinc-300" size={32} />
                            <span className="text-xs font-bold uppercase tracking-wider">Latest Blog News</span>
                        </Link>
                        <Link href="/download" className="flex flex-col items-center gap-3 p-6 border border-zinc-100 hover:border-green-600 transition-colors">
                            <Download className="text-zinc-300" size={32} />
                            <span className="text-xs font-bold uppercase tracking-wider">Download Launcher</span>
                        </Link>
                        <Link href="/about-us" className="flex flex-col items-center gap-3 p-6 border border-zinc-100 hover:border-green-600 transition-colors">
                            <HelpCircle className="text-zinc-300" size={32} />
                            <span className="text-xs font-bold uppercase tracking-wider">Help & About</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
