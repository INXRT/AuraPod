import React, { useState } from 'react';
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

export const App: React.FC = () => {
  const [auraPodActive, setAuraPodActive] = useState(true);

  const toggleAuraPod = () => {
    setAuraPodActive((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 font-sans relative selection:bg-cyan-neon/30 selection:text-cyan-neon">

      {/* Hero Section with Interactive 3D WebGL Mesh Extender Viewport */}
      <div id="top">
        <Hero
          auraPodActive={auraPodActive}
          onToggleAuraPod={toggleAuraPod}
        />
      </div>

      {/* SEC.02: The Root Cause: Hostel Faraday Cage Physics */}
      <HostelFaradayPhysics
        auraPodActive={auraPodActive}
        onToggleAuraPod={toggleAuraPod}
      />

      {/* SEC.03: Scroll-Driven 3D Hardware Subsystem Anatomy (Three.js WebGL) */}
      <ScrollHardware3D />

      {/* SEC.04: Killer Feature: The 11:59 PM Survival Simulator (10% Neobrutalism) */}
      <SubmissionSimulator
        auraPodActive={auraPodActive}
        onToggleAuraPod={toggleAuraPod}
      />

      {/* SEC.05: Hardware Deep Dive: Beam Radiation Pattern & Power Runtime Calculator */}
      <HardwareShowcase />

      {/* SEC.06: Software Ecosystem: AuraOS */}
      <SoftwareAuraOS />

      {/* SEC.07: Competitive Benchmark Comparison Table */}
      <ComparisonMatrix />

      {/* SEC.08: Commercial Viability, BOM ($9.50) & Venture Unit Economics */}
      <PricingBento />

      {/* Footer & Deliverables */}
      <Footer />

      {/* Smart Auto-Hiding Magnetic Dock Navigation */}
      <NavigationDock
        auraPodActive={auraPodActive}
        onToggleAuraPod={toggleAuraPod}
      />

    </div>
  );
};

export default App;
