import React, { useState } from 'react';
import { Cpu, Layers, Zap, Sliders, Shield, Battery, CheckCircle2, Smartphone } from 'lucide-react';
import { AuraPodLogo } from './ui/AuraPodLogo';
import { KineticTextReveal } from './ui/KineticTextReveal';

export const HardwareShowcase: React.FC = () => {
  const [dishAngle, setDishAngle] = useState(38);
  const [batterySize, setBatterySize] = useState(10000);

  const handleAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setDishAngle(val);
  };

  const handleBatteryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setBatterySize(val);
  };

  // Runtime calculation: 5V at ~420mA = 2.1W draw. 3.7V nominal lithium cell with 85% boost conversion efficiency.
  const estimatedHours = ((batterySize * 3.7 / 1000) / 2.1 * 0.85).toFixed(1);

  return (
    <section id="hardware" className="py-24 px-4 relative z-10 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-left max-w-3xl mb-16">
        <div className="font-mono text-xs text-cyan-neon tracking-wider uppercase mb-3 flex items-center gap-3">
          <Layers className="w-3.5 h-3.5" />
          <span>RF Mechanical &amp; Electrical Engineering</span>
          <span className="w-8 h-[1px] bg-cyan-neon/40 hidden sm:inline-block" />
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
          <KineticTextReveal
            text="Two Forms. One Signal Core."
            splitBy="words"
            direction="up"
            stagger={0.06}
            distance={16}
          />
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Whether you need the ultra-compact **Pocket Edition** for classes and libraries or the high-aperture **Room Edition** for dorm-wide coverage, each model uses custom microwave optics to focus faint concrete-scattered waves.
        </p>
      </div>

      {/* Bento Grid Layout - Architectural Hardware Engineering */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Bento 1: Room Edition Parabolic Concentrator */}
        <div className="rounded-2xl bg-obsidian-950/80 border border-white/12 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-card-elevation hover:border-white/25 transition-all text-left">
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 text-cyan-neon text-xs font-mono font-bold uppercase">
                <AuraPodLogo className="w-4 h-4 text-cyan-neon" />
                <span>Room Edition Concentrator</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-cyan-neon/10 text-cyan-neon border border-cyan-neon/25 font-mono text-xs font-bold">
                +11.8 dBi Gain
              </span>
            </div>

            <h3 className="font-display font-bold text-2xl text-white mb-2">
              Foldable Parabolic Metamaterial Dish
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Engineered like a radio telescope for stationary room coverage. An 18-stage mathematical wireframe paraboloid captures scattered cell and Wi-Fi waves across a 120-degree aperture and concentrates them directly into the central focal horn.
            </p>

            {/* Interactive Angle Tilt Adjuster & Radiation Pattern Diagram */}
            <div className="p-4 rounded-xl bg-obsidian-900/80 border border-white/10 mb-4">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-cyan-neon" />
                  Adjust Dish Elevation Angle:
                </span>
                <span className="text-cyan-neon font-bold text-sm">{dishAngle}° Tilt</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                value={dishAngle}
                onChange={handleAngleChange}
                className="w-full accent-cyan-neon cursor-pointer h-1.5 bg-obsidian-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1 mb-4">
                <span>10° (Horizon AP)</span>
                <span>45° (Mid-Rise Tower)</span>
                <span>80° (Rooftop Mast)</span>
              </div>

              {/* Dynamic Antenna Radiation Pattern */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-4">
                <div className="text-[11px] font-mono text-slate-400">
                  <div className="text-white font-bold">BEAMWIDTH: 32° MAIN LOBE</div>
                  <div className="text-slate-500 text-[10px]">Aiming at elevation: {dishAngle}° relative to desk horizon</div>
                </div>

                {/* Micro SVG Polar Beam Preview */}
                <div className="w-24 h-16 relative bg-obsidian-900 rounded-lg border border-white/10 flex items-center justify-center overflow-hidden">
                  <svg viewBox="0 0 100 60" className="w-full h-full">
                    <circle cx="50" cy="55" r="20" fill="none" stroke="#1E293B" strokeWidth="1" />
                    <circle cx="50" cy="55" r="40" fill="none" stroke="#1E293B" strokeWidth="1" />
                    <g transform={`rotate(${dishAngle - 45} 50 55)`}>
                      <path
                        d="M 50 55 Q 38 20 50 8 Q 62 20 50 55"
                        fill="rgba(56, 189, 248, 0.2)"
                        stroke="#38BDF8"
                        strokeWidth="1.5"
                      />
                      <line x1="50" y1="55" x2="50" y2="8" stroke="#22C55E" strokeWidth="1" strokeDasharray="2 2" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-slate-400">
            <span className="text-cyan-neon font-bold">Coverage: Entire Dorm Room</span>
            <span>Aperture Efficiency: 74.2%</span>
          </div>
        </div>

        {/* Bento 2: Pocket Edition Dual Telescopic Beamformer */}
        <div className="rounded-2xl bg-obsidian-950/80 border border-white/12 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-card-elevation hover:border-white/25 transition-all text-left">
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 text-cyan-neon text-xs font-mono font-bold uppercase">
                <Smartphone className="w-4 h-4" />
                <span>Pocket Edition Beamformer</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-cyan-neon/10 text-cyan-neon border border-cyan-neon/25 font-mono text-xs font-bold">
                +12 dBi Gain
              </span>
            </div>

            <h3 className="font-display font-bold text-2xl text-white mb-2">
              Dual Telescopic Masts in Pocket Block
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Tailored for on-the-go mobility. Two 3-stage stepped telescopic brass and aluminum masts fold completely flush into a pocket block. Once opened, they lock into an optimal V-spread beamforming configuration to focus signal directly to your phone or laptop.
            </p>

            <div className="grid grid-cols-2 gap-3 text-center font-mono text-xs mb-4">
              <div className="p-3.5 rounded-xl bg-obsidian-900/80 border border-white/10 shadow-sm text-left">
                <div className="text-slate-400 text-[10px]">WEIGHT</div>
                <div className="text-base font-bold text-white mt-0.5">&lt;180 grams</div>
                <div className="text-[10px] text-slate-500">Solid Pocket Block</div>
              </div>
              <div className="p-3.5 rounded-xl bg-obsidian-900/80 border border-white/10 shadow-sm text-left">
                <div className="text-slate-400 text-[10px]">ANTENNAS</div>
                <div className="text-base font-bold text-cyan-neon mt-0.5">Dual 3-Stage</div>
                <div className="text-[10px] text-slate-500">Brass &amp; Titanium Masts</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-obsidian-900/80 border border-white/10 font-mono text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Joint Swivel:</span>
                <span className="text-white font-bold">CNC Ball-and-Clevis</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Stowage Protection:</span>
                <span className="text-emerald-signal font-bold">Flush Internal Bay</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400 mt-4">
            <span className="text-emerald-signal font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Direct Personal Focus
            </span>
            <span>Fits in Jeans Pocket</span>
          </div>
        </div>

        {/* Bento 3: Shared Shielded Ultra-LNA */}
        <div className="rounded-2xl bg-obsidian-950/80 border border-white/12 p-6 sm:p-8 flex flex-col justify-between shadow-card-elevation hover:border-white/25 transition-all text-left">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2 text-emerald-signal text-xs font-mono font-bold uppercase">
                <Cpu className="w-4 h-4" />
                <span>Shared Core Architecture</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-signal/10 text-emerald-signal text-[11px] font-mono font-bold">
                &lt;1.2 dB NF
              </span>
            </div>

            <h3 className="font-display font-bold text-xl text-white mb-2">
              Faraday-Shielded Active LNA &amp; SAW Filter
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Weak signals are easily drowned out by thermal noise. Both editions feature dual Surface Acoustic Wave (SAW) bandpass filters and an active LNA inside a tin Faraday shield that cleanly lifts weak signals above the noise floor.
            </p>

            {/* Noise Figure Comparison */}
            <div className="space-y-3 font-mono text-xs p-4 rounded-xl bg-obsidian-900/80 border border-white/10 shadow-sm">
              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Standard Phone Alone:</span>
                  <span className="text-crimson-hazard font-bold">3.8 dB Noise</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-obsidian-800 overflow-hidden">
                  <div className="w-[78%] h-full bg-crimson-hazard" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>AuraPod Shielded LNA:</span>
                  <span className="text-emerald-signal font-bold">1.1 dB Noise</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-obsidian-800 overflow-hidden">
                  <div className="w-[22%] h-full bg-emerald-signal" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400 mt-4">
            <span className="flex items-center gap-1 text-emerald-signal font-bold">
              <Shield className="w-3.5 h-3.5" /> FCC Part 15 Safe
            </span>
            <span>Zero Tower Interference</span>
          </div>
        </div>

        {/* Bento 4: Universal 5V USB-C Ultra-Low-Power */}
        <div className="rounded-2xl bg-obsidian-950/80 border border-white/12 p-6 sm:p-8 flex flex-col justify-between shadow-card-elevation hover:border-white/25 transition-all text-left">
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase">
                <Zap className="w-4 h-4" />
                <span>Universal 5V USB-C Power Bus</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-amber-400/10 text-amber-400 border border-amber-400/30 font-mono text-xs font-bold">
                &lt;2.1 Watts Draw
              </span>
            </div>

            <h3 className="font-display font-bold text-xl text-white mb-2">
              Runs Off Any Laptop Port or Power Bank
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Forget heavy AC adapters. AuraPod draws under 420mA at 5V, meaning you can run it directly from your laptop USB-C port, iPad, or any student power bank for over 18 hours.
            </p>

            {/* Interactive Power Bank Runtime Calculator */}
            <div className="p-4 rounded-xl bg-obsidian-900/80 border border-white/10 mb-4">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Battery className="w-3.5 h-3.5 text-emerald-signal" />
                  Test Power Bank Capacity:
                </span>
                <span className="text-emerald-signal font-bold text-sm">
                  {batterySize.toLocaleString()} mAh &rarr; {estimatedHours} Hours
                </span>
              </div>
              <input
                type="range"
                min="2500"
                max="20000"
                step="2500"
                value={batterySize}
                onChange={handleBatteryChange}
                className="w-full accent-emerald-signal cursor-pointer h-1.5 bg-obsidian-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>2,500 mAh (MagSafe)</span>
                <span>10,000 mAh (Standard)</span>
                <span>20,000 mAh (Heavy)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400 mt-4">
            <span className="text-emerald-signal font-bold">&lt;3% Laptop Drain / 4 Hrs</span>
            <span>Plug &amp; Play USB-C PD</span>
          </div>
        </div>

      </div>
    </section>
  );
};
