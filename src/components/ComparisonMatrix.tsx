import React from 'react';
import { Shield, Radio, CheckCircle2 } from 'lucide-react';
import { comparisonSpecs } from '../data/specsData';
import { KineticTextReveal } from './ui/KineticTextReveal';

export const ComparisonMatrix: React.FC = () => {
  return (
    <section id="matrix" className="py-24 px-4 relative z-10 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-left max-w-3xl mb-16">
        <div className="font-mono text-xs text-cyan-neon tracking-wider uppercase mb-3 flex items-center gap-3">
          <Shield className="w-3.5 h-3.5" />
          <span>How AuraPod Compares</span>
          <span className="w-8 h-[1px] bg-cyan-neon/40 hidden sm:inline-block" />
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
          <KineticTextReveal
            text="Why Alternatives Fail Students"
            splitBy="words"
            direction="up"
            stagger={0.06}
            distance={16}
          />
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          From expensive $600 repeaters with rooftop cabling to omnidirectional dongles that get the exact same 1 bar—see why AuraPod stands alone.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-2xl mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-obsidian-900/90 text-xs font-mono">
                <th className="p-4 sm:p-5 text-slate-400 font-semibold">METRIC / FEATURE</th>
                <th className="p-4 sm:p-5 text-slate-400 font-semibold">PHONE ALONE</th>
                <th className="p-4 sm:p-5 text-slate-400 font-semibold">INDUSTRIAL BOOSTER</th>
                <th className="p-4 sm:p-5 text-slate-400 font-semibold">PORTABLE MIFI</th>
                <th className="p-4 sm:p-5 text-cyan-neon font-bold bg-cyan-neon/10 border-l border-r border-cyan-neon/30">
                  <div className="flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5" />
                    <span>AURAPOD SYSTEM</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs sm:text-sm font-mono">
              {comparisonSpecs.map((spec, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 sm:p-5 text-white font-sans font-medium">
                    <div className="font-bold text-slate-200">{spec.feature}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{spec.category}</div>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-400">{spec.phoneAlone}</td>
                  <td className="p-4 sm:p-5 text-slate-400">{spec.industrialBooster}</td>
                  <td className="p-4 sm:p-5 text-slate-400">{spec.mifiDongle}</td>
                  <td className="p-4 sm:p-5 text-emerald-signal font-bold bg-cyan-neon/[0.04] border-l border-r border-cyan-neon/20">
                    {spec.auraPod}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Takeaway */}
        <div className="p-4 bg-obsidian-950/80 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <span>*Tested across 4G LTE Band 3/40 and 5G Sub-6 n78 carrier frequencies.</span>
          <span className="text-cyan-neon font-bold">100% Student Desk Friendly</span>
        </div>
      </div>

      {/* Presentation Takeaway Card (Why AuraPod Wins) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left font-mono text-xs">
        <div className="p-4 rounded-2xl bg-obsidian-900/60 border border-white/10">
          <div className="flex items-center gap-2 text-cyan-neon font-bold mb-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>ZERO DORM LEASE BREACHES</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Unlike industrial repeaters requiring coaxial cable runs through exterior windows, AuraPod sits entirely inside on the student study desk.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-obsidian-900/60 border border-white/10">
          <div className="flex items-center gap-2 text-emerald-signal font-bold mb-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>ZERO FCC REGULATORY RISK</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Passive optical/RF parabolic concentration captures existing scattered waves without emitting unlicensed high-power interference toward base station towers.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-obsidian-900/60 border border-white/10">
          <div className="flex items-center gap-2 text-amber-400 font-bold mb-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>1/20TH THE PRICE POINT</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Priced at $29 (vs $600 for commercial cellular boosters) with a $9.50 BOM that sustains 67% gross margins for sustainable hardware economics.
          </p>
        </div>
      </div>

    </section>
  );
};
