import React from 'react';
import { Github, ExternalLink, ArrowUp } from 'lucide-react';
import { AuraPodLogo } from './ui/AuraPodLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-obsidian-950 pt-16 pb-12 px-4 sm:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5 text-left">
          
          {/* Brand & Project Identity */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-neon/15 border border-cyan-neon/30 flex items-center justify-center text-cyan-neon shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <AuraPodLogo className="w-4 h-4 text-cyan-neon" />
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">AuraPod</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-slate-400">
                Prototype v2.4
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed font-sans max-w-md">
              Passive parabolic RF signal lens and resilient edge-caching hardware engineered for high-density academic environments.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-400/5 border border-amber-400/20 text-amber-300/80 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Academic Capstone Prototype • Not for commercial sale</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <div className="text-white font-semibold uppercase tracking-wider text-[11px] font-sans">
              System Architecture
            </div>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <a href="#hardware-3d" className="hover:text-cyan-neon transition-colors">
                  3D Anatomy &amp; Models
                </a>
              </li>
              <li>
                <a href="#faraday" className="hover:text-cyan-neon transition-colors">
                  Faraday Cage Physics
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-cyan-neon transition-colors">
                  11:59 PM Testbed Simulator
                </a>
              </li>
              <li>
                <a href="#software" className="hover:text-cyan-neon transition-colors">
                  AuraOS Edge Cache
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-cyan-neon transition-colors">
                  Bill of Materials (BOM)
                </a>
              </li>
            </ul>
          </div>

          {/* Project & Source */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <div className="text-white font-semibold uppercase tracking-wider text-[11px] font-sans">
              Project &amp; Code
            </div>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <a 
                  href="https://github.com/INXRT/AuraPod" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-cyan-neon flex items-center gap-1.5 transition-colors group"
                >
                  <Github className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-neon transition-colors" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/INXRT/AuraPod/issues" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-cyan-neon flex items-center gap-1.5 transition-colors group"
                >
                  <span>Issue Tracker</span>
                  <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/INXRT/AuraPod#readme" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-cyan-neon flex items-center gap-1.5 transition-colors group"
                >
                  <span>Technical Documentation</span>
                  <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/INXRT" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-cyan-neon flex items-center gap-1.5 transition-colors group"
                >
                  <span>INXRT on GitHub</span>
                  <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with attribution and copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; 2026 AuraPod. Open-source engineering capstone.
          </div>

          <div className="flex items-center gap-4">
            {/* Made by INXRT */}
            <a
              href="https://github.com/INXRT"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-cyan-neon/40 hover:bg-cyan-neon/10 hover:text-cyan-neon text-slate-300 text-xs font-mono transition-all duration-300 group shadow-sm hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            >
              <span className="text-slate-400 group-hover:text-slate-300">Made by</span>
              <span className="font-semibold text-white group-hover:text-cyan-neon tracking-wide">INXRT</span>
              <Github className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-neon transition-colors" />
            </a>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
