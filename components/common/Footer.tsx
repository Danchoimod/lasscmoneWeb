import React from "react";
import { Disc, Github, Youtube, Music2, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#f4f4f5] border-t border-zinc-200 pt-12 pb-6 px-6 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">

        {/* Left Side: Brand & Mission */}
        <div className="space-y-3">
          <h2 className="text-zinc-900 font-bold text-xl tracking-tighter">
            LASSCMONE<span className="text-zinc-500 font-light italic">STUDIO</span>
          </h2>
          <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
            Built from zero. Waiting for my miracle.
          </p>
        </div>

        {/* Right Side: Contact & Socials */}
        <div className="flex flex-col space-y-2">
          <span className="text-zinc-400 text-xs uppercase font-semibold tracking-widest">
            Contact Support
          </span>
          <a
            href="mailto:support@lflauncher.org"
            className="text-zinc-800 font-medium text-lg hover:text-blue-600 transition-colors duration-200"
          >
            support@lflauncher.org
          </a>

          {/* Social Icons - Cleaned up */}
          <div className="flex items-center gap-5 pt-3">
            <a href="https://discord.gg/3pGfja3ceW" className="text-zinc-400 hover:text-[#5865F2] transition-colors" title="Discord" target="_blank" rel="noreferrer">
              <Disc size={20} />
            </a>

            <a href="https://github.com/Danchoimod" className="text-zinc-400 hover:text-zinc-900 transition-colors" title="GitHub" target="_blank" rel="noreferrer">
              <Github size={20} />
            </a>

            <a href="https://www.youtube.com/@danchoimod" className="text-zinc-400 hover:text-[#FF0000] transition-colors" title="YouTube" target="_blank" rel="noreferrer">
              <Youtube size={20} />
            </a>

            <a href="https://www.tiktok.com/@danchoimod" className="text-zinc-400 hover:text-zinc-900 transition-colors" title="TikTok" target="_blank" rel="noreferrer">
              <Music2 size={20} />
            </a>

            <a href="https://x.com/TTPGamer269994" className="text-zinc-400 hover:text-zinc-900 transition-colors" title="X (Twitter)" target="_blank" rel="noreferrer">
              {/* Lucide Twitter icon hiện tại đã cập nhật theo dáng logo X mới */}
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-5xl mx-auto mt-12 pt-6 border-t border-zinc-200/60 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-zinc-400 text-[10px] sm:text-[11px] uppercase tracking-wider text-center md:text-left leading-loose">
          © 2026 LASSCMONE STUDIO. NOT AN OFFICIAL MINECRAFT PRODUCT. <br className="md:hidden" />
          NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.
        </p>
        <div className="flex gap-6 text-[11px] font-medium text-zinc-400 shrink-0">
          <a href="/privacy-policy" className="hover:text-zinc-700 transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-zinc-700 transition-colors">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;