import React from "react";

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
            Stay Humble — Build Eternity
          </p>
        </div>

        {/* Right Side: Contact & Support */}
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
          <div className="flex gap-4 pt-2">
            <a href="https://discord.gg/wVmp6tJF" className="text-zinc-400 hover:text-zinc-900 text-xs transition-colors">Discord</a>
            <a href="https://github.com/Danchoimod" className="text-zinc-400 hover:text-zinc-900 text-xs transition-colors">GitHub</a>
            <a href="https://www.facebook.com/profile.php?id=100094655031262" className="text-zinc-400 hover:text-zinc-900 text-xs transition-colors">Facebook</a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-5xl mx-auto mt-12 pt-6 border-t border-zinc-200/60 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-zinc-400 text-[10px] sm:text-[11px] uppercase tracking-wider text-center md:text-left">
          © 2026 LASSCMONE STUDIO. NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.
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