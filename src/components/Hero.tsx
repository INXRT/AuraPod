import React, { useState } from 'react';
import { ShieldCheck, Plus, Minus, Smartphone } from 'lucide-react';
import { RfWaveCanvas } from './RfWaveCanvas';
import { AuraPodMesh3D } from './AuraPodMesh3D';
import { AuraPodRoomMesh3D } from './AuraPodRoomMesh3D';
import { KineticTextReveal } from './ui/KineticTextReveal';
import { AuraPodLogo } from './ui/AuraPodLogo';
import { AuraPodEdition } from '../types';

interface HeroProps {
  auraPodActive: boolean;
  onToggleAuraPod: () => void;
  activeEdition: AuraPodEdition;
  onSelectEdition: (edition: AuraPodEdition) => void;
}

export const Hero: React.FC<HeroProps> = ({
  auraPodActive,
  onToggleAuraPod,
  activeEdition,
  onSelectEdition,
}) => {
  // Fold states for each model
  const [isPocketFolded, setIsPocketFolded] = useState(true); // Default: closed pocket block
  const [isRoomFolded, setIsRoomFolded] = useState(false); // Default: deployed 45° dish
  const [modelScale, setModelScale] = useState(0.78);

  const isFolded = activeEdition === 'pocket' ? isPocketFolded : isRoomFolded;

  const handleScaleIncrease = () => {
    setModelScale((prev) => Math.min(1.15, Number((prev + 0.08).toFixed(2))));
  };

  const handleScaleDecrease = () => {
    setModelScale((prev) => Math.max(0.48, Number((prev - 0.08).toFixed(2))));
  };

  const handleToggle = () => {
    onToggleAuraPod();
  };

  const handleFoldToggle = () => {
    if (activeEdition === 'pocket') {
      setIsPocketFolded((prev) => !prev);
    } else {
      setIsRoomFolded((prev) => !prev);
    }
  };

  const handleEditionChange = (ed: AuraPodEdition) => {
    if (ed === activeEdition) return;
    onSelectEdition(ed);
  };

  return (
    <section className="relative min-h-screen pt-20 sm:pt-28 pb-16 px-4 sm:px-8 bg-obsidian-950 text-slate-100 overflow-hidden">
      
      {/* Interactive Physics Canvas for Parabolic Waves */}
      <RfWaveCanvas auraPodActive={auraPodActive} />

      {/* Main Editorial Header Block */}
      <div className="relative z-10 max-w-6xl mx-auto mb-10 text-left">

        {/* Edition Selection Switcher */}
        <div className="flex items-center gap-3 mb-6">
          <div className="inline-flex items-center p-1 bg-obsidian-900/90 border border-white/10 rounded-xl shadow-inner">
            <button
              onClick={() => handleEditionChange('pocket')}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all flex items-center gap-2 ${
                activeEdition === 'pocket'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Pocket Edition</span>
              <span className={`hidden sm:inline text-[10px] px-1.5 py-0.2 rounded font-normal ${
                activeEdition === 'pocket' ? 'bg-slate-200 text-slate-800' : 'bg-white/5 text-slate-400'
              }`}>
                Dual Masts
              </span>
            </button>
            <button
              onClick={() => handleEditionChange('room')}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all flex items-center gap-2 ${
                activeEdition === 'room'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <AuraPodLogo className="w-3.5 h-3.5 text-cyan-neon" />
              <span>Room Edition</span>
              <span className={`hidden sm:inline text-[10px] px-1.5 py-0.2 rounded font-normal ${
                activeEdition === 'room' ? 'bg-slate-200 text-slate-800' : 'bg-white/5 text-slate-400'
              }`}>
                Parabolic Dish
              </span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-slate-400">
            <span className="px-2.5 py-1 rounded bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[10px] font-semibold uppercase tracking-wider">
              Functional Prototype Stage
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-signal" />
              <span>Hardware Model Selected</span>
            </div>
          </div>
        </div>

        {/* Headline */}
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[1.02] mb-6 max-w-5xl">
          <KineticTextReveal
            text={
              activeEdition === 'pocket'
                ? "A Personal Radio Lens for Concrete Dead Zones."
                : "A Room-Scale Metamaterial Concentrator for Dorms."
            }
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
              text={
                activeEdition === 'pocket'
                  ? "Thick concrete dorm walls and basement study halls can attenuate 4G and 5G signals by up to 35 dB, causing midnight uploads to fail. AuraPod Pocket Edition is an everyday-carry block that flips open with dual precision antennas to focus scattered cell and Wi-Fi waves straight to your device—giving you reliable 4-bar speeds anywhere you go."
                  : "Designed for entire student rooms, shared hostel desks, and basement quarters. AuraPod Room Edition features an origami-folding parabolic metamaterial dish that gathers scattered radio waves across a 120-degree aperture and concentrates them into a central focal horn to illuminate your entire study room in clean signal."
              }
              splitBy="words"
              stagger={0.018}
              delay={0.3}
              distance={12}
              direction="up"
              className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-3xl"
            />
          </div>

          {/* Quick Telemetry Cards */}
          <div className="md:col-span-4 flex flex-col gap-2.5 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-obsidian-900/80 border border-white/10 flex items-center justify-between hover:border-white/25 transition-colors shadow-sm">
              <span className="text-slate-400">Directional Gain:</span>
              <span className="text-cyan-neon font-bold text-sm">
                {activeEdition === 'pocket' ? '+12 dBi Focused' : '+11.8 dBi Room Aperture'}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-obsidian-900/80 border border-white/10 flex items-center justify-between hover:border-white/25 transition-colors shadow-sm">
              <span className="text-slate-400">Concentrator:</span>
              <span className="text-emerald-signal font-bold text-sm">
                {activeEdition === 'pocket' ? 'Dual Telescopic Masts' : '18-Stage Parabolic Dish'}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-obsidian-900/80 border border-white/10 flex items-center justify-between hover:border-white/25 transition-colors shadow-sm">
              <span className="text-slate-400">Form Factor:</span>
              <span className="text-white font-bold text-sm">
                {activeEdition === 'pocket' ? '180g Pocket Block' : 'Desk Hub • 45° CNC Tilt'}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Standalone Floating 3D WebGL Mesh Extender */}
      <div className="relative z-10 max-w-6xl mx-auto mb-16">
        
        {/* Floating Standalone Control Buttons Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-2 font-mono text-xs border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-cyan-neon" />
            <span className="text-white font-bold uppercase tracking-wider">
              {activeEdition === 'pocket' ? 'AuraPod Pocket Edition' : 'AuraPod Room Edition'}
            </span>
            <span className="hidden sm:inline px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-slate-300 font-mono">
              {activeEdition === 'pocket' ? 'Solid Pocket Block' : 'Foldable Parabolic Hub'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Fold / Deploy Toggle */}
            <button
              onClick={handleFoldToggle}
              className="px-4 py-2 rounded-lg bg-obsidian-900 hover:bg-obsidian-850 border border-white/15 text-slate-200 hover:text-white shadow-sm active:scale-[0.98] transition-all font-mono font-semibold text-xs"
            >
              {activeEdition === 'pocket'
                ? (isFolded ? 'Open Antennas' : 'Close to Pocket')
                : (isFolded ? 'Deploy 45° Dish' : 'Fold Flat (12mm)')}
            </button>

            {/* Signal Boost Toggle */}
            <button
              onClick={handleToggle}
              className={`px-4 py-2 rounded-lg font-mono font-semibold tracking-wider transition-all border text-xs shadow-sm active:scale-[0.98] ${
                auraPodActive
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25'
                  : 'bg-crimson-hazard/15 border-crimson-hazard/40 text-rose-400 hover:bg-crimson-hazard/25'
              }`}
            >
              {auraPodActive ? '● Signal Boost Active' : '○ Enable Signal Boost'}
            </button>
          </div>
        </div>

        {/* 100% Fully Visible Borderless 3D Canvas with High-CRI Studio Stage Backdrop */}
        <div className="w-full h-[520px] sm:h-[600px] relative flex items-center justify-center rounded-3xl overflow-hidden border border-white/[0.08] bg-gradient-to-b from-white/[0.02] to-obsidian-950/80 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9)]">
          
          {/* Engineering Studio Corner Crosshair Calibration Markers */}
          <span className="absolute top-3 left-4 font-mono text-[10px] text-slate-400 select-none pointer-events-none tracking-widest">+ CAM_BAY_01</span>
          <span className="absolute top-3 right-4 font-mono text-[10px] text-slate-400 select-none pointer-events-none tracking-widest">5600K_CRI98 +</span>
          <span className="absolute bottom-3 left-4 font-mono text-[10px] text-slate-400 select-none pointer-events-none tracking-widest">+ 3D_INTERACTIVE</span>
          <span className="absolute bottom-3 right-4 font-mono text-[10px] text-slate-400 select-none pointer-events-none tracking-widest">PBR_SPECULAR +</span>

          {/* Studio Stage Cyclorama Illuminator */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
            {/* Top Key Softbox Wash */}
            <div className="w-[85%] max-w-[620px] h-[380px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.045)_0%,rgba(56,189,248,0.02)_40%,transparent_75%)] blur-[45px]" />
            {/* Stage Pedestal Ground Reflection */}
            <div className="absolute bottom-6 w-[75%] max-w-[480px] h-[60px] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.035)_0%,rgba(15,23,42,0.9)_55%,transparent_100%)] blur-[16px]" />
          </div>

          {/* Subtle Size Decrease Button (Left Flank) */}
          <button
            onClick={handleScaleDecrease}
            title="Decrease Size (-)"
            aria-label="Decrease 3D Model Size"
            className="absolute left-3 sm:left-6 z-20 w-9 h-9 rounded-full bg-obsidian-900/85 hover:bg-obsidian-800 text-slate-300 hover:text-white border border-white/15 hover:border-white/40 backdrop-blur-md shadow-md flex items-center justify-center transition-all active:scale-95 font-mono text-sm"
          >
            <Minus className="w-4 h-4" />
          </button>

          {/* 3D Model Canvas - Pocket Edition or Room Edition */}
          {activeEdition === 'pocket' ? (
            <AuraPodMesh3D
              key="pocket-mesh"
              auraPodActive={auraPodActive}
              isFolded={isFolded}
              onToggleFold={undefined}
              scale={modelScale}
              interactive={true}
              showBadge={true}
              className="w-full h-full"
            />
          ) : (
            <AuraPodRoomMesh3D
              key="room-mesh"
              auraPodActive={auraPodActive}
              isFolded={isFolded}
              onToggleFold={undefined}
              scale={modelScale}
              interactive={true}
              showBadge={true}
              className="w-full h-full"
            />
          )}

          {/* Subtle Size Increase Button (Right Flank) */}
          <button
            onClick={handleScaleIncrease}
            title="Increase Size (+)"
            aria-label="Increase 3D Model Size"
            className="absolute right-3 sm:right-6 z-20 w-9 h-9 rounded-full bg-obsidian-900/85 hover:bg-obsidian-800 text-slate-300 hover:text-white border border-white/15 hover:border-white/40 backdrop-blur-md shadow-md flex items-center justify-center transition-all active:scale-95 font-mono text-sm"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Standalone Sub-label Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400 pt-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <AuraPodLogo className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-white font-medium">
              {activeEdition === 'pocket' ? 'Pocket Edition Hardware:' : 'Room Edition Hardware:'}
            </span>
            <span>
              {activeEdition === 'pocket'
                ? 'Ultra-compact <180g solid block. Flips open to extend dual precision antennas for personal device boosting.'
                : '18-stage metamaterial wireframe dish on a weighted desk base. Provides 120° wide-aperture room coverage.'}
            </span>
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
