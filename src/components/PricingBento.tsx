import React, { useState } from 'react';
import { Check, Zap, ArrowRight, DollarSign, PieChart, TrendingUp, Users, Smartphone, Sparkles } from 'lucide-react';
import { pocketBomItems, roomBomItems } from '../data/specsData';
import { AuraPodLogo } from './ui/AuraPodLogo';
import { KineticTextReveal } from './ui/KineticTextReveal';

export const PricingBento: React.FC = () => {
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const [activeEconomicsTab, setActiveEconomicsTab] = useState<'pocket-bom' | 'room-bom' | 'market'>('pocket-bom');

  const toggleCurrency = (cur: 'USD' | 'INR') => {
    setCurrency(cur);
  };

  const activeBomItems = activeEconomicsTab === 'pocket-bom' ? pocketBomItems : roomBomItems;
  const activeBomTotal = activeEconomicsTab === 'pocket-bom' ? 9.50 : 14.20;
  const activeBomTotalInr = activeEconomicsTab === 'pocket-bom' ? 780 : 1165;

  return (
    <section id="pricing" className="py-24 px-4 relative z-10 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-left max-w-3xl mb-16">
        <div className="font-mono text-xs text-emerald-signal tracking-wider uppercase mb-3 flex items-center gap-3">
          <Zap className="w-3.5 h-3.5" />
          <span>Product Lineup &amp; Hardware Pricing</span>
          <span className="w-8 h-[1px] bg-emerald-signal/40 hidden sm:inline-block" />
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
          <KineticTextReveal
            text="Priced for Real Student Budgets"
            splitBy="words"
            direction="up"
            stagger={0.06}
            distance={16}
          />
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Choose the **Pocket Edition** for lightweight everyday campus carry or the **Room Edition** for full-dorm coverage. Never miss an 11:59 PM deadline again.
        </p>

        {/* Prototype Notice Box */}
        <div className="mt-4 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3 font-mono text-xs text-slate-300">
          <span className="text-amber-400 font-bold shrink-0 mt-0.5">⚠️ PROTOTYPE NOTICE:</span>
          <span>
            AuraPod is currently a functional engineering prototype and research demonstration. Listed figures reflect <strong>target mass-manufacturing BOM cost targets</strong> ($29 / $49 MSRP). Selecting an edition registers your profile for closed campus beta pilot cohorts (not immediate retail purchase).
          </span>
        </div>

        {/* Currency Switcher */}
        <div className="flex justify-start mt-6">
          <div className="p-1 rounded-xl bg-obsidian-900 border border-white/10 flex items-center gap-1 text-xs font-mono">
            <button
              onClick={() => toggleCurrency('USD')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                currency === 'USD' ? 'bg-white text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => toggleCurrency('INR')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                currency === 'INR' ? 'bg-white text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              INR (₹)
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid - 3 Clean Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
        
        {/* Card 1: AuraPod Pocket Edition */}
        <div className="rounded-3xl glass-panel border border-white/12 p-6 sm:p-7 flex flex-col justify-between hover:border-white/25 transition-all text-left shadow-card-elevation">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 font-semibold uppercase tracking-wider flex items-center gap-1">
                <Smartphone className="w-3 h-3 text-cyan-neon" /> MOBILE EDC
              </span>
              <span className="text-[10px] font-mono text-slate-400">&lt;180g Pocket Block</span>
            </div>

            <h3 className="font-display font-bold text-2xl text-white">AuraPod Pocket</h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              Everyday personal carry for campus walkways, library carrels, and lectures.
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-display font-black text-4xl text-white">
                {currency === 'USD' ? '$29' : '₹1,999'}
              </span>
              <span className="text-xs font-mono text-slate-400">/ Target Projected MSRP</span>
            </div>

            {/* Feature list */}
            <ul className="space-y-3 text-xs text-slate-200 font-sans">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-cyan-neon shrink-0" />
                <span><strong>Dual 3-Stage Telescopic Masts</strong> (+12 dBi Focus)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-cyan-neon shrink-0" />
                <span><strong>CNC Swivel Knuckle</strong> &amp; Flush Stowage Bay</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-cyan-neon shrink-0" />
                <span><strong>Shielded Active LNA IC</strong> (&lt;1.2 dB Noise Figure)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-cyan-neon shrink-0" />
                <span><strong>5V USB-C Powered</strong> (&lt;2.1W from Laptop/Bank)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-cyan-neon shrink-0" />
                <span><strong>AuraQueue LMS Never-Fail Engine</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-cyan-neon shrink-0" />
                <span>100% FCC Part 15 Unlicensed Safe</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <a
              href="#hardware-3d"
              className="w-full py-3 rounded-xl font-display font-semibold text-xs sm:text-sm bg-obsidian-900 hover:bg-obsidian-800 border border-white/20 text-white transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2 group"
            >
              <span>Inspect Pocket CAD &amp; Subsystems</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-neon group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Card 2: AuraPod Room Edition (Featured Hero) */}
        <div className="rounded-3xl glass-panel border border-white/20 p-6 sm:p-7 flex flex-col justify-between relative shadow-card-highlight text-left overflow-hidden ring-1 ring-white/10">
          <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-xl bg-white text-slate-950 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> DORM ROOM HUB
          </div>

          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-semibold uppercase tracking-wider flex items-center gap-1">
                <AuraPodLogo className="w-3 h-3 text-cyan-neon" /> ROOM SCALE
              </span>
              <span className="text-[10px] font-mono text-slate-400">Desk &amp; Window Hub</span>
            </div>

            <h3 className="font-display font-bold text-2xl text-white">AuraPod Room</h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              Origami parabolic metamaterial array designed to blanket an entire dorm room in clean signal.
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-display font-black text-4xl text-white">
                {currency === 'USD' ? '$49' : '₹3,499'}
              </span>
              <span className="text-xs font-mono text-slate-400">/ Target Projected MSRP</span>
            </div>

            {/* Feature list */}
            <ul className="space-y-3 text-xs text-slate-200 font-sans">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-signal shrink-0" />
                <span><strong>18-Stage Parabolic Metamaterial Dish</strong> (+11.8 dBi)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-signal shrink-0" />
                <span><strong>Dielectric Focal Receiver Horn</strong> (f=0.65 Hub)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-signal shrink-0" />
                <span><strong>Dual CNC 6061 Aluminum Struts</strong> (45° Tilt to Flat)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-signal shrink-0" />
                <span><strong>Weighted Desk Base Pod</strong> &amp; Status Indicator</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-signal shrink-0" />
                <span><strong>Multi-Device Room Coverage</strong> (Shared Bed Hub)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-signal shrink-0" />
                <span><strong>AuraQueue + DormMesh P2P Sync</strong></span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <a
              href="#hardware-3d"
              className="w-full py-3.5 rounded-xl font-display font-bold text-sm bg-white hover:bg-slate-200 text-slate-950 shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] group"
            >
              <span>Inspect Room Parabolic Reflector</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Card 3: Campus Duo Bundle */}
        <div className="rounded-3xl glass-panel border border-white/12 p-6 sm:p-7 flex flex-col justify-between hover:border-white/25 transition-all text-left shadow-card-elevation">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20 text-amber-400 font-semibold uppercase tracking-wider">
                CAMPUS DUO
              </span>
              <span className="text-[10px] font-mono text-emerald-signal font-bold">Save $9 / ₹500</span>
            </div>

            <h3 className="font-display font-bold text-2xl text-white">Campus Duo Bundle</h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              Get both models: keep Room Edition on your desk, and carry Pocket Edition anywhere.
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-display font-black text-4xl text-white">
                {currency === 'USD' ? '$69' : '₹4,999'}
              </span>
              <span className="text-xs font-mono text-slate-400">/ Target Projected MSRP</span>
            </div>

            {/* Feature list */}
            <ul className="space-y-3 text-xs text-slate-200 font-sans">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>1x AuraPod Pocket Edition</strong> (&lt;180g EDC Block)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>1x AuraPod Room Edition</strong> (Desk Parabolic Hub)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>2x Braided High-Grade USB-C Cables</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Seamless Account &amp; Multi-Device Mesh Sync</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Priority Academic Research Delivery</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <a
              href="https://github.com/INXRT/AuraPod"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl font-display font-semibold text-xs sm:text-sm bg-obsidian-900 hover:bg-obsidian-800 border border-white/20 text-white transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2 group"
            >
              <span>Open-Source Hardware Schematics</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

      </div>

      {/* Bill of Materials (BOM) & Market Explorer */}
      <div className="max-w-4xl mx-auto rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 text-left">
        
        {/* Header with Switcher Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-6 font-mono text-xs">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-signal" />
            <span className="text-white font-bold uppercase">Manufacturing BOM &amp; Economics</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-obsidian-900/90 border border-white/10 shadow-inner">
            <button
              onClick={() => setActiveEconomicsTab('pocket-bom')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeEconomicsTab === 'pocket-bom'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Pocket BOM ($9.50)
            </button>
            <button
              onClick={() => setActiveEconomicsTab('room-bom')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeEconomicsTab === 'room-bom'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Room BOM ($14.20)
            </button>
            <button
              onClick={() => setActiveEconomicsTab('market')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeEconomicsTab === 'market'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Market &amp; TAM
            </button>
          </div>
        </div>

        {activeEconomicsTab === 'market' ? (
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
        ) : (
          // BOM Cost Explorer Tab (Pocket or Room)
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 mb-4 gap-2">
              <span className="text-xs font-mono text-slate-400">
                {activeEconomicsTab === 'pocket-bom'
                  ? 'Pocket Edition COGS • Batch Scale 5,000 Units • CNC & SMT'
                  : 'Room Edition COGS • Batch Scale 5,000 Units • Parabolic Stamping & Aluminum Pod'}
              </span>
              <span className="text-xs font-mono text-emerald-signal font-bold">
                {activeEconomicsTab === 'pocket-bom' ? '67.2% Gross Margin ($29 MSRP)' : '71.0% Gross Margin ($49 MSRP)'}
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {activeBomItems.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-obsidian-950/70 border border-white/5 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{item.component}</span>
                    <span className="text-cyan-neon font-bold">
                      {currency === 'USD' ? `$${item.cost.toFixed(2)}` : `₹${item.costInr}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500">
                    <span>{item.function}</span>
                    <span>{((item.cost / activeBomTotal) * 100).toFixed(1)}% of COGS</span>
                  </div>
                  {/* Cost Allocation Progress Bar */}
                  <div className="w-full h-1 rounded-full bg-obsidian-800 overflow-hidden">
                    <div
                      className={`h-full ${activeEconomicsTab === 'pocket-bom' ? 'bg-cyan-neon/80' : 'bg-emerald-signal/80'}`}
                      style={{ width: `${(item.cost / activeBomTotal) * 100}%` }}
                    />
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center pt-4 border-t border-white/10 text-sm font-bold">
                <span className="text-white">
                  TOTAL {activeEconomicsTab === 'pocket-bom' ? 'POCKET' : 'ROOM'} EDITION COGS:
                </span>
                <span className="text-emerald-signal text-base">
                  {currency === 'USD' ? `$${activeBomTotal.toFixed(2)}` : `₹${activeBomTotalInr}`}
                </span>
              </div>
            </div>
          </div>
        )}

      </div>

    </section>
  );
};
