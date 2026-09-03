import React, { useState } from 'react';
import { Check, Zap, ArrowRight, DollarSign, PieChart, TrendingUp, Users } from 'lucide-react';
import { bomItems } from '../data/specsData';
import { sound } from '../utils/audioSynthesizer';
import { KineticTextReveal } from './ui/KineticTextReveal';

export const PricingBento: React.FC = () => {
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const [activeEconomicsTab, setActiveEconomicsTab] = useState<'bom' | 'market'>('bom');

  const toggleCurrency = (cur: 'USD' | 'INR') => {
    sound.playToggleClick();
    setCurrency(cur);
  };

  return (
    <section id="pricing" className="py-24 px-4 relative z-10 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-left max-w-3xl mb-16">
        <div className="font-mono text-xs text-emerald-signal tracking-wider uppercase mb-3 flex items-center gap-3">
          <Zap className="w-3.5 h-3.5" />
          <span>Pricing &amp; Hardware Costs</span>
          <span className="w-8 h-[1px] bg-emerald-signal/40 hidden sm:inline-block" />
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
          <KineticTextReveal
            text="Costs Less Than Wireless Earbuds"
            splitBy="words"
            direction="up"
            stagger={0.06}
            distance={16}
          />
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Built with an estimated sub-$10 Bill of Materials, making personal signal boosting genuinely affordable for students.
        </p>

        {/* Currency Switcher */}
        <div className="flex justify-start mt-6">
          <div className="p-1 rounded-xl bg-obsidian-900 border border-white/10 flex items-center gap-1 text-xs font-mono">
            <button
              onClick={() => toggleCurrency('USD')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                currency === 'USD' ? 'bg-cyan-neon text-obsidian-950 font-bold shadow-cyan-glow' : 'text-slate-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => toggleCurrency('INR')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                currency === 'INR' ? 'bg-cyan-neon text-obsidian-950 font-bold shadow-cyan-glow' : 'text-slate-400 hover:text-white'
              }`}
            >
              INR (₹)
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
        
        {/* Tier 1: AuraPod Lite */}
        <div className="rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-white/25 transition-all text-left">
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Passive Model</div>
            <h3 className="font-display font-bold text-2xl text-white">AuraPod Lite</h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              Passive RF reflector pocket block for phone and desk boosting.
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-display font-black text-4xl text-white">
                {currency === 'USD' ? '$19' : '₹1,499'}
              </span>
              <span className="text-xs font-mono text-slate-400">/ One-time purchase</span>
            </div>

            {/* Feature list */}
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-sans">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-cyan-neon shrink-0" />
                <span>Dual Telescopic Antennas (+8 dBi Gain)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-cyan-neon shrink-0" />
                <span>Zero Battery / Zero Power Required</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-cyan-neon shrink-0" />
                <span>Compact Pocket Block Form Factor</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-cyan-neon shrink-0" />
                <span>AuraScope AR Tower Alignment App (Free)</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-500">
                <span className="w-4 text-center font-bold">✕</span>
                <span>Active LNA Booster &amp; Laptop USB Tether</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
            <button
              onClick={() => sound.playToggleClick()}
              className="w-full py-3 rounded-xl font-display font-bold text-xs sm:text-sm glass-panel border border-white/20 text-slate-200 hover:text-white hover:border-cyan-neon/50 transition-all"
            >
              Select AuraPod Lite
            </button>
          </div>
        </div>

        {/* Tier 2: AuraPod Pro (Featured) */}
        <div className="rounded-3xl glass-panel border border-cyan-neon/60 p-6 sm:p-8 flex flex-col justify-between relative shadow-cyan-glow text-left bg-gradient-to-b from-cyan-neon/[0.04] to-transparent overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-xl bg-cyan-neon text-obsidian-950 font-mono text-[10px] font-bold uppercase tracking-wider">
            COMPLETE KIT
          </div>

          <div>
            <div className="text-xs font-mono text-cyan-neon uppercase tracking-wider mb-2">Active Hardware + Software</div>
            <h3 className="font-display font-bold text-2xl text-white">AuraPod Pro</h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              Complete package with active LNA, USB-C tether, and AuraQueue.
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-display font-black text-4xl text-white">
                {currency === 'USD' ? '$29' : '₹1,999'}
              </span>
              <span className="text-xs font-mono text-slate-400">/ Complete Hardware Kit</span>
            </div>

            {/* Feature list */}
            <ul className="space-y-3 text-xs sm:text-sm text-slate-200 font-sans">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-signal shrink-0" />
                <span><strong>Dual 3-Stage Telescopic Antennas (+12 dBi Gain)</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-signal shrink-0" />
                <span><strong>Active Ultra-LNA Module</strong> (&lt;1.2 dB Noise Figure)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-signal shrink-0" />
                <span><strong>5V USB-C Laptop Bus</strong> (Draws &lt;2.1W)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-signal shrink-0" />
                <span><strong>AuraQueue Resilient LMS Engine</strong> (Zero Failed Submits)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-signal shrink-0" />
                <span><strong>CampusVault 3 AM Pre-Caching &amp; DormMesh P2P</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-signal shrink-0" />
                <span>Cryptographic Proof Receipt Generator</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <button
              onClick={() => sound.playSuccessChime()}
              className="w-full py-3.5 rounded-xl font-display font-bold text-sm bg-gradient-to-r from-cyan-neon via-sky-400 to-blue-500 text-obsidian-950 hover:brightness-110 shadow-cyan-glow transition-all flex items-center justify-center gap-2"
            >
              <span>Pre-Order AuraPod Pro</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Presentation-Grade Commercial BOM & Market Opportunity Showcase */}
      <div className="max-w-4xl mx-auto rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 text-left">
        
        {/* Header with Switcher Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-6 font-mono text-xs">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-signal" />
            <span className="text-white font-bold uppercase">Commercial Viability &amp; Financial Model</span>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-obsidian-950 border border-white/10">
            <button
              onClick={() => {
                sound.playToggleClick();
                setActiveEconomicsTab('bom');
              }}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeEconomicsTab === 'bom'
                  ? 'bg-emerald-signal text-obsidian-950 font-bold shadow-emerald-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              BOM Cost ($9.50)
            </button>
            <button
              onClick={() => {
                sound.playToggleClick();
                setActiveEconomicsTab('market');
              }}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeEconomicsTab === 'market'
                  ? 'bg-emerald-signal text-obsidian-950 font-bold shadow-emerald-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Market &amp; TAM
            </button>
          </div>
        </div>

        {activeEconomicsTab === 'bom' ? (
          // BOM Cost Explorer Tab
          <div>
            <div className="flex items-center justify-between pb-3 mb-4">
              <span className="text-xs font-mono text-slate-400">
                Manufacturing Batch Scale: 5,000 Units • Shenzhen SMT &amp; CNC Production
              </span>
              <span className="text-xs font-mono text-emerald-signal font-bold">
                67.2% Gross Profit Margin
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {bomItems.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-obsidian-950/70 border border-white/5 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{item.component}</span>
                    <span className="text-cyan-neon font-bold">
                      {currency === 'USD' ? `$${item.cost.toFixed(2)}` : `₹${item.costInr}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500">
                    <span>{item.function}</span>
                    <span>{((item.cost / 9.5) * 100).toFixed(1)}% of COGS</span>
                  </div>
                  {/* Cost Allocation Progress Bar */}
                  <div className="w-full h-1 rounded-full bg-obsidian-800 overflow-hidden">
                    <div
                      className="h-full bg-cyan-neon/80"
                      style={{ width: `${(item.cost / 9.5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center pt-4 border-t border-white/10 text-sm font-bold">
                <span className="text-white">TOTAL COGS (BILL OF MATERIALS):</span>
                <span className="text-emerald-signal text-base">
                  {currency === 'USD' ? '$9.50' : '₹780'}
                </span>
              </div>
            </div>
          </div>
        ) : (
          // Market Opportunity & TAM Tab
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-obsidian-950/80 border border-white/10">
              <div className="flex items-center gap-1.5 text-cyan-neon mb-2">
                <Users className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase">Target Audience (TAM)</span>
              </div>
              <div className="text-2xl font-bold text-white">21.8M</div>
              <p className="text-[11px] text-slate-400 mt-1">
                College students living in campus housing across US &amp; Tier-1/2 Indian universities.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-obsidian-950/80 border border-white/10">
              <div className="flex items-center gap-1.5 text-emerald-signal mb-2">
                <PieChart className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase">Serviceable Market (SOM)</span>
              </div>
              <div className="text-2xl font-bold text-emerald-signal">$632M</div>
              <p className="text-[11px] text-slate-400 mt-1">
                Immediate addressable student hardware spend in reinforced concrete dormitories.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-obsidian-950/80 border border-white/10">
              <div className="flex items-center gap-1.5 text-amber-400 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase">Go-To-Market Model</span>
              </div>
              <div className="text-2xl font-bold text-amber-400">0$ Paid CAC</div>
              <p className="text-[11px] text-slate-400 mt-1">
                Campus ambassador peer-to-peer dorm distribution with 15% referral rev-share.
              </p>
            </div>
          </div>
        )}

      </div>

    </section>
  );
};
