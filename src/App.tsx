import React, { useState } from 'react';
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
