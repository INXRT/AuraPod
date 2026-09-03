import React, { useState } from 'react';
import { Radio, FileText, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audioSynthesizer';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    sound.playSuccessChime();
    setSubscribed(true);
  };

  return (
    <footer className="border-t border-white/10 bg-obsidian-950 pt-16 pb-12 px-4 relative z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 text-left">
        
        {/* Col 1: Brand */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-neon/20 border border-cyan-neon/40 flex items-center justify-center text-cyan-neon">
              <Radio className="w-4 h-4" />
            </div>
            <span className="font-display font-bold text-lg text-white tracking-tight">AuraPod</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed font-sans">
            Personal portable parabolic RF reflector and resilient campus data caching hub. Built for student academic survival.
          </p>
          <div className="text-[11px] font-mono text-slate-500">
            © 2026 AuraPod Technologies. All rights reserved.
          </div>
        </div>

        {/* Form: Pilot Waitlist */}
        <div className="space-y-3 font-sans md:col-span-1">
          <div className="text-white font-bold text-xs font-mono uppercase tracking-wider">Campus Batch 01 Waitlist</div>
          <p className="text-xs text-slate-400">Join 400+ students from 12 universities pre-ordering the $29 AuraPod Pro.</p>
          <div className="space-y-2">
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.name@univ.edu"
                className="w-full px-3 py-2 rounded-xl bg-obsidian-900 border border-white/10 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-neon/50"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-xl bg-cyan-neon text-obsidian-950 text-xs font-mono font-bold hover:brightness-110 shadow-cyan-glow whitespace-nowrap transition-all"
              >
                Join
              </button>
            </form>
            {subscribed && (
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-signal mt-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>You are #412 on the campus pilot waitlist!</span>
              </div>
            )}
          </div>
        </div>

        {/* Col 2: Product Architecture */}
        <div className="space-y-3 font-mono text-xs">
          <div className="text-white font-bold uppercase tracking-wider font-sans">Product Architecture</div>
          <ul className="space-y-2 text-slate-400">
            <li>
              <a href="#simulator" className="hover:text-cyan-neon flex items-center gap-1.5 transition-colors">
                <FileText className="w-3.5 h-3.5 text-cyan-neon" />
                <span>11:59 PM Survival Simulator</span>
              </a>
            </li>
            <li>
              <a href="#hardware" className="hover:text-cyan-neon flex items-center gap-1.5 transition-colors">
                <span>Hardware Signal Lens Specs</span>
              </a>
            </li>
            <li>
              <a href="#software" className="hover:text-cyan-neon flex items-center gap-1.5 transition-colors">
                <span>AuraOS Architecture</span>
              </a>
            </li>
            <li>
              <a href="#matrix" className="hover:text-cyan-neon flex items-center gap-1.5 transition-colors">
                <span>Competitive Benchmark</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Academic Citations */}
        <div className="space-y-3 font-mono text-xs">
          <div className="text-white font-bold uppercase tracking-wider font-sans">RF Physics &amp; Compliance</div>
          <ul className="space-y-2 text-slate-500 text-[11px]">
            <li>• FCC Title 47 Part 15 Unlicensed Passive Devices</li>
            <li>• Friis Transmission Eq: <code className="text-slate-400">Pr = Pt·Gt·Gr(λ/4πR)²</code></li>
            <li>• 3GPP TR 38.901 Building Penetration Loss Model</li>
            <li>• Tus Protocol Resumable Upload Specification</li>
          </ul>
        </div>

      </div>

      <div className="max-w-6xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <div>
          © 2026 AuraPod Project Team. Built for University Capstone &amp; Pitch Competitions.
        </div>
        <div className="flex items-center gap-1">
          <span>Designed with zero AI slop for real academic impact</span>
        </div>
      </div>
    </footer>
  );
};
