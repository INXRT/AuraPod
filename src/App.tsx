import React, { useState } from 'react';
import { Github, Smartphone } from 'lucide-react';
import { StudioBackgroundLighting } from './components/StudioBackgroundLighting';
import { Hero } from './components/Hero';
import { HostelFaradayPhysics } from './components/HostelFaradayPhysics';
import { ScrollHardware3D } from './components/ScrollHardware3D';
import { SubmissionSimulator } from './components/SubmissionSimulator';
import { HardwareShowcase } from './components/HardwareShowcase';
import { SoftwareAuraOS } from './components/SoftwareAuraOS';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { PricingBento } from './components/PricingBento';
import { Footer } from './components/Footer';
import { NavigationDock } from './components/NavigationDock';
import { AuraPodLogo } from './components/ui/AuraPodLogo';
import { AuraPodEdition } from './types';

export const App: React.FC = () => {
  const [auraPodActive, setAuraPodActive] = useState(true);
  const [activeEdition, setActiveEdition] = useState<AuraPodEdition>('pocket');

  const toggleAuraPod = () => {
    setAuraPodActive((prev) => !prev);
  };

  const toggleEdition = () => {
    setActiveEdition((prev) => (prev === 'pocket' ? 'room' : 'pocket'));
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 font-sans relative selection:bg-cyan-neon/30 selection:text-cyan-neon">

      {/* Engineering Prototype & Research Notice Top Banner */}
      <div className="relative z-30 bg-obsidian-900/95 border-b border-amber-500/25 py-2 px-4 text-center font-mono text-[11px] text-slate-300 flex items-center justify-center gap-2.5 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
        <span>
          <strong className="text-amber-300 font-semibold uppercase tracking-wider">Engineering Prototype Notice:</strong>{' '}
          AuraPod is an academic research &amp; capstone prototype. Not currently available for commercial retail purchase.
        </span>
        <a
          href="#pricing"
          className="text-cyan-neon hover:underline font-semibold ml-1 shrink-0 hidden sm:inline"
        >
          View BOM &amp; Pilot Specs &rarr;
        </a>
      </div>

      {/* Top Navigation & Brand Header */}
      <header className="sticky top-0 z-40 bg-obsidian-950/85 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo & Name */}
          <a href="#top" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-cyan-neon/15 border border-cyan-neon/30 flex items-center justify-center text-cyan-neon shadow-[0_0_12px_rgba(6,182,212,0.15)] group-hover:border-cyan-neon/60 transition-all">
              <AuraPodLogo className="w-4 h-4 text-cyan-neon" glow />
            </div>
            <span className="font-display font-bold text-lg text-white tracking-tight">AuraPod</span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10">
              v2.4 Prototype
            </span>
          </a>

          {/* Clean Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-400">
            <a href="#faraday" className="hover:text-cyan-neon transition-colors">Faraday Physics</a>
            <a href="#hardware-3d" className="hover:text-cyan-neon transition-colors">3D Anatomy</a>
            <a href="#simulator" className="hover:text-cyan-neon transition-colors">11:59 PM Testbed</a>
            <a href="#software" className="hover:text-cyan-neon transition-colors">AuraOS</a>
            <a href="#pricing" className="hover:text-cyan-neon transition-colors">BOM &amp; Specs</a>
          </nav>

          {/* Actions: Edition Toggle & Made by INXRT */}
          <div className="flex items-center gap-3">
            {/* Quick Edition Pill Switcher */}
            <div className="inline-flex items-center p-0.5 rounded-lg bg-obsidian-900 border border-white/10 text-xs font-mono">
              <button
                onClick={() => setActiveEdition('pocket')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1.5 ${
                  activeEdition === 'pocket'
                    ? 'bg-white text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Switch to Pocket Edition"
              >
                <Smartphone className="w-3 h-3" />
                <span className="hidden sm:inline">Pocket</span>
              </button>
              <button
                onClick={() => setActiveEdition('room')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1.5 ${
                  activeEdition === 'room'
                    ? 'bg-white text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Switch to Room Edition"
              >
                <AuraPodLogo className="w-3 h-3 text-cyan-neon" />
                <span className="hidden sm:inline">Room</span>
              </button>
            </div>

            {/* Made by INXRT Attribution Pill */}
            <a
              href="https://github.com/INXRT"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-cyan-neon/50 hover:bg-cyan-neon/10 hover:text-cyan-neon text-slate-300 text-xs font-mono transition-all duration-200 group"
              title="Built by INXRT"
            >
              <span className="text-slate-400 group-hover:text-slate-200 text-[11px]">by</span>
              <span className="font-semibold text-white group-hover:text-cyan-neon tracking-wide text-xs">INXRT</span>
              <Github className="w-3 h-3 text-slate-400 group-hover:text-cyan-neon transition-colors" />
            </a>
          </div>

        </div>
      </header>

      {/* Calibrated Photographic Studio Lighting */}
      <StudioBackgroundLighting auraPodActive={auraPodActive} />

      {/* Hero Section with Interactive 3D WebGL Viewport (Pocket Edition & Room Edition) */}
      <div id="top" className="relative z-10">
        <Hero
          auraPodActive={auraPodActive}
          onToggleAuraPod={toggleAuraPod}
          activeEdition={activeEdition}
          onSelectEdition={setActiveEdition}
        />
      </div>

      {/* SEC.02: The Root Cause: Hostel Faraday Cage Physics */}
      <div className="relative z-10">
        <HostelFaradayPhysics
          auraPodActive={auraPodActive}
          onToggleAuraPod={toggleAuraPod}
        />
      </div>

      {/* SEC.03: Scroll-Driven 3D Hardware Subsystem Anatomy (Three.js WebGL) */}
      <div className="relative z-10">
        <ScrollHardware3D
          activeEdition={activeEdition}
          onSelectEdition={setActiveEdition}
        />
      </div>

      {/* SEC.04: Killer Feature: The 11:59 PM Survival Simulator */}
      <div className="relative z-10">
        <SubmissionSimulator
          auraPodActive={auraPodActive}
          onToggleAuraPod={toggleAuraPod}
        />
      </div>

      {/* SEC.05: Hardware Deep Dive: Room Edition Dish & Pocket Edition Telescopic Physics */}
      <div className="relative z-10">
        <HardwareShowcase />
      </div>

      {/* SEC.06: Software Ecosystem: AuraOS */}
      <div className="relative z-10">
        <SoftwareAuraOS />
      </div>

      {/* SEC.07: Competitive Benchmark Comparison Table (Pocket Edition vs Room Edition vs Others) */}
      <div className="relative z-10">
        <ComparisonMatrix />
      </div>

      {/* SEC.08: Product Lineup, Pricing & Bill of Materials */}
      <div className="relative z-10">
        <PricingBento />
      </div>

      {/* Footer & Deliverables */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* Smart Auto-Hiding Magnetic Dock Navigation */}
      <NavigationDock
        auraPodActive={auraPodActive}
        onToggleAuraPod={toggleAuraPod}
        activeEdition={activeEdition}
        onToggleEdition={toggleEdition}
      />

    </div>
  );
};

export default App;
