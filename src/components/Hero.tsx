import React, { useState } from 'react';
import { Radio, ShieldCheck, Plus, Minus } from 'lucide-react';
import { RfWaveCanvas } from './RfWaveCanvas';
import { AuraPodMesh3D } from './AuraPodMesh3D';
import { sound } from '../utils/audioSynthesizer';
import { KineticTextReveal } from './ui/KineticTextReveal';

interface HeroProps {
  auraPodActive: boolean;
  onToggleAuraPod: () => void;
}

export const Hero: React.FC<HeroProps> = ({ auraPodActive, onToggleAuraPod }) => {
  const [isFolded, setIsFolded] = useState(true); // Practical default: sealed solid pocket block!
  const [modelScale, setModelScale] = useState(0.74); // Sleek compact scale by default

  const handleScaleIncrease = () => {
    sound.playToggleClick();
    setModelScale((prev) => Math.min(1.15, Number((prev + 0.08).toFixed(2))));
  };

  const handleScaleDecrease = () => {
    sound.playToggleClick();
    setModelScale((prev) => Math.max(0.48, Number((prev - 0.08).toFixed(2))));
  };

  const handleToggle = () => {
    sound.playToggleClick();
    onToggleAuraPod();
    if (!auraPodActive) {
      sound.playSuccessChime();
    } else {
      sound.playErrorAlarm();
    }
  };

  const handleFoldToggle = () => {
    sound.playToggleClick();
    setIsFolded(!isFolded);
  };

  return (
    <section className="relative min-h-screen pt-20 sm:pt-28 pb-16 px-4 sm:px-8 bg-obsidian-950 text-slate-100 overflow-hidden">
      
      {/* Interactive Physics Canvas for Parabolic Waves */}
      <RfWaveCanvas auraPodActive={auraPodActive} />

      {/* Main Editorial Header Block */}
      <div className="relative z-10 max-w-6xl mx-auto mb-10 text-left">

        {/* Headline */}
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[1.02] mb-6 max-w-5xl">
          <KineticTextReveal
            text="A Personal Radio Lens for Concrete Dead Zones."
            splitBy="words"
            direction="up"
            stagger={0.06}
            delay={0.1}
            distance={24}
          />
        </h1>

        {/* Narrative Copy & Key Telemetry Callouts */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-white/[0.08] pt-6 mb-8">
          <div className="md:col-span-8">
            <KineticTextReveal
              text="Thick concrete dorm walls and basement study halls can attenuate 4G and 5G signals by up to 35 dB, causing midnight assignment uploads to fail. AuraPod is an everyday-carry pocket block that flips open with dual precision antennas to focus scattered cell and Wi-Fi waves straight to your device—giving you reliable 4-bar speeds right when deadlines hit."
              splitBy="words"
              stagger={0.018}
              delay={0.4}
              distance={12}
              direction="up"
              className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-3xl"
            />
          </div>

          <div className="md:col-span-4 flex flex-col gap-2.5 font-mono text-xs">
            <div className="p-3 rounded-xl bg-white/[0.03] border-2 border-white/10 flex items-center justify-between hover:border-cyan-neon/40 transition-colors shadow-[2px_2px_0px_#000]">
              <span className="text-slate-400">Directional Gain:</span>
              <span className="text-cyan-neon font-bold text-sm">+12 dBi Focused</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border-2 border-white/10 flex items-center justify-between hover:border-emerald-signal/40 transition-colors shadow-[2px_2px_0px_#000]">
              <span className="text-slate-400">Noise Figure:</span>
              <span className="text-emerald-signal font-bold text-sm">&lt;1.2 dB (Clean)</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border-2 border-white/10 flex items-center justify-between hover:border-white/20 transition-colors shadow-[2px_2px_0px_#000]">
              <span className="text-slate-400">Form Factor:</span>
              <span className="text-white font-bold text-sm">180g • 5V USB-C</span>
            </div>
          </div>
        </div>

      </div>

      {/* Standalone Floating 3D WebGL Mesh Extender - ZERO BOX, BUTTONS OUT */}
      <div className="relative z-10 max-w-6xl mx-auto mb-16">
        
        {/* Floating Standalone Control Buttons Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-2 font-mono text-xs border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-neon animate-pulse" />
            <span className="text-white font-bold uppercase tracking-wider">
              AuraPod Hardware View
            </span>
            <span className="hidden sm:inline px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-cyan-neon font-mono font-bold">
              180g Pocket Block
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleFoldToggle}
              className="px-4 py-2 rounded-lg bg-obsidian-900 hover:bg-obsidian-850 border-2 border-white/20 text-slate-200 hover:text-white shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all font-mono font-bold text-xs"
            >
              {isFolded ? 'Open Antennas' : 'Close to Pocket'}
            </button>

            <button
              onClick={handleToggle}
              className={`px-4 py-2 rounded-lg font-mono font-bold tracking-wider transition-all border-2 ${
                auraPodActive
                  ? 'bg-emerald-signal border-emerald-signal text-obsidian-950 shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
                  : 'bg-crimson-hazard border-crimson-hazard text-white shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
              }`}
            >
              {auraPodActive ? 'Signal Boost Active' : 'Enable Signal Boost'}
            </button>
          </div>
        </div>

        {/* 100% Fully Visible Borderless 3D Canvas with Subtle Size Controls on Both Flanks */}
        <div className="w-full h-[520px] sm:h-[600px] relative flex items-center justify-center">
          
          {/* Subtle Size Decrease Button (Left Flank) */}
          <button
            onClick={handleScaleDecrease}
            title="Decrease Size (-)"
            aria-label="Decrease 3D Model Size"
            className="absolute left-2 sm:left-4 z-20 w-9 h-9 rounded-full bg-obsidian-900/60 hover:bg-obsidian-850 text-slate-400 hover:text-cyan-neon border border-white/10 hover:border-cyan-neon/50 backdrop-blur-md shadow-md flex items-center justify-center transition-all opacity-50 hover:opacity-100 active:scale-90 font-mono text-sm"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          {/* 3D Model Canvas */}
          <AuraPodMesh3D
            auraPodActive={auraPodActive}
            isFolded={isFolded}
            onToggleFold={undefined}
            scale={modelScale}
            interactive={true}
            showBadge={true}
            className="w-full h-full"
          />

          {/* Subtle Size Increase Button (Right Flank) */}
          <button
            onClick={handleScaleIncrease}
            title="Increase Size (+)"
            aria-label="Increase 3D Model Size"
            className="absolute right-2 sm:right-4 z-20 w-9 h-9 rounded-full bg-obsidian-900/60 hover:bg-obsidian-850 text-slate-400 hover:text-cyan-neon border border-white/10 hover:border-cyan-neon/50 backdrop-blur-md shadow-md flex items-center justify-center transition-all opacity-50 hover:opacity-100 active:scale-90 font-mono text-sm"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Standalone Sub-label Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400 pt-2 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-cyan-neon" />
            <span className="text-white font-medium">Portable Form Factor (&lt;180g):</span>
            <span>Carries as a solid pocket block. Flips open to deploy dual precision antennas into the air.</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-signal font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>FCC Part 15 Unlicensed Safe</span>
          </div>
        </div>

      </div>

    </section>
  );
};
