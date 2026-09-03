import React, { useState } from 'react';
import { Cpu, Layers, Zap, Radio, Sliders, Shield, Battery, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audioSynthesizer';
import { KineticTextReveal } from './ui/KineticTextReveal';

export const HardwareShowcase: React.FC = () => {
  const [dishAngle, setDishAngle] = useState(38);
  const [batterySize, setBatterySize] = useState(10000);

  const handleAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setDishAngle(val);
    if (val % 8 === 0) {
      sound.playRadarChirp(0.8 + (val / 90));
    }
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
          <span>SEC.03 // RF MECHANICAL &amp; ELECTRICAL ENGINEERING</span>
          <span className="w-8 h-[1px] bg-cyan-neon/40 hidden sm:inline-block" />
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
          <KineticTextReveal
            text="The Hardware Signal Lens"
            splitBy="characters"
            staggerFrom="center"
            stagger={0.035}
            distance={18}
          />
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Engineered like a precision radar telescope. AuraPod gathers scattered micro-volt radio waves from concrete walls and concentrates them directly into your device.
        </p>
      </div>

      {/* Bento Grid Layout (10% Neobrutalist Hardware Boxes) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Bento 1: Parabolic Reflector (Spans 2 columns) */}
        <div className="md:col-span-2 rounded-2xl bg-obsidian-950 border-2 border-white/15 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-[5px_5px_0px_#0A0E17,6px_6px_0px_#00F2FE] hover:border-cyan-neon transition-all text-left">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-neon/5 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 text-cyan-neon text-xs font-mono font-bold uppercase">
                <Radio className="w-4 h-4" />
                <span>01. Micro-Stamped Parabolic Grid</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-cyan-neon/10 text-cyan-neon border border-cyan-neon/30 font-mono text-xs font-bold">
                +11.8 dBi Gain
              </span>
            </div>

            <h3 className="font-display font-bold text-2xl text-white mb-2">
              Foldable Metamaterial Radio Wave Concentrator
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Just as an optical telescope focuses faint starlight, AuraPod uses an origami-inspired folded metallic mesh tuned for 700 MHz - 5.8 GHz. It captures scattered RF waves across a 120-degree horizon and focuses them onto the receiver focal point.
            </p>

            {/* Interactive Angle Tilt Adjuster & Radiation Pattern Diagram */}
            <div className="p-4 rounded-2xl bg-obsidian-950/80 border border-white/10 mb-4">
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
                    {/* Concentric decibel rings */}
                    <circle cx="50" cy="55" r="20" fill="none" stroke="#1E293B" strokeWidth="1" />
                    <circle cx="50" cy="55" r="40" fill="none" stroke="#1E293B" strokeWidth="1" />
                    {/* Steered beam lobe */}
                    <g transform={`rotate(${dishAngle - 45} 50 55)`}>
                      <path
                        d="M 50 55 Q 38 20 50 8 Q 62 20 50 55"
                        fill="rgba(0, 242, 254, 0.25)"
                        stroke="#00F2FE"
                        strokeWidth="1.5"
                      />
                      <line x1="50" y1="55" x2="50" y2="8" stroke="#10B981" strokeWidth="1" strokeDasharray="2 2" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-slate-400">
            <span className="text-emerald-signal font-bold">Aperture Efficiency: 74.2%</span>
            <span>Bandwidth: 700 MHz - 5.8 GHz Continuous</span>
          </div>
        </div>

        {/* Bento 2: Active Ultra-LNA */}
        <div className="rounded-2xl bg-obsidian-950 border-2 border-white/15 p-6 sm:p-8 flex flex-col justify-between shadow-[5px_5px_0px_#0A0E17,6px_6px_0px_#10B981] hover:border-emerald-signal transition-all text-left">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2 text-emerald-signal text-xs font-mono font-bold uppercase">
                <Cpu className="w-4 h-4" />
                <span>02. Active Ultra-LNA</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-signal/10 text-emerald-signal text-[11px] font-mono font-bold">
                &lt;1.2 dB NF
              </span>
            </div>

            <h3 className="font-display font-bold text-xl text-white mb-2">
              Low-Noise Amplifier &amp; SAW Filter
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Weak signals are easily drowned out by thermal noise. AuraPod features dual Surface Acoustic Wave (SAW) bandpass filters and an active LNA that elevates signals cleanly above the noise floor without requiring high-power active radiation.
            </p>

            {/* Noise Figure Comparison */}
            <div className="space-y-3 font-mono text-xs p-4 rounded-xl bg-obsidian-900 border-2 border-white/10 shadow-[2px_2px_0px_#000]">
              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Standard Phone:</span>
                  <span className="text-crimson-hazard font-bold">3.8 dB Noise</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-obsidian-800 overflow-hidden">
                  <div className="w-[78%] h-full bg-crimson-hazard" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>AuraPod Active LNA:</span>
                  <span className="text-emerald-signal font-bold">1.1 dB Noise</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-obsidian-800 overflow-hidden">
                  <div className="w-[22%] h-full bg-emerald-signal" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400 mt-4">
            <span className="flex items-center gap-1 text-emerald-signal font-bold">
              <Shield className="w-3.5 h-3.5" /> FCC Compliant
            </span>
            <span>Zero Tower Interference</span>
          </div>
        </div>

        {/* Bento 3: Origami Travel Fold-Flat */}
        <div className="rounded-2xl bg-obsidian-950 border-2 border-white/15 p-6 sm:p-8 flex flex-col justify-between shadow-[5px_5px_0px_#0A0E17,6px_6px_0px_#F59E0B] hover:border-amber-400 transition-all text-left">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase mb-4">
              <Layers className="w-4 h-4" />
              <span>03. Origami Portability</span>
            </div>

            <h3 className="font-display font-bold text-xl text-white mb-2">
              Folds Flat Like a Notebook
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              Dual friction hinges allow AuraPod to collapse completely flat to a thickness of just 12 millimeters. It slips easily into any laptop sleeve or desk drawer.
            </p>

            <div className="grid grid-cols-2 gap-2 text-center font-mono text-xs">
              <div className="p-3 rounded-lg bg-obsidian-900 border-2 border-white/10 shadow-[2px_2px_0px_#000]">
                <div className="text-slate-400 text-[10px]">WEIGHT</div>
                <div className="text-base font-bold text-white mt-0.5">180 grams</div>
                <div className="text-[9px] text-slate-500">Lighter than an iPhone</div>
              </div>
              <div className="p-3 rounded-lg bg-obsidian-900 border-2 border-white/10 shadow-[2px_2px_0px_#000]">
                <div className="text-slate-400 text-[10px]">THICKNESS</div>
                <div className="text-base font-bold text-white mt-0.5">12 mm</div>
                <div className="text-[9px] text-slate-500">Ultra-slim profile</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 text-xs font-mono text-slate-400 mt-4 flex items-center justify-between">
            <span className="text-amber-400 flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> 6061 Aluminum Hinges
            </span>
            <span>10,000+ Cycles</span>
          </div>
        </div>

        {/* Bento 4: 5V USB-C Ultra-Low-Power (Spans 2 columns) */}
        <div className="md:col-span-2 rounded-2xl bg-obsidian-950 border-2 border-white/15 p-6 sm:p-8 flex flex-col justify-between shadow-[5px_5px_0px_#0A0E17,6px_6px_0px_#38BDF8] hover:border-cyan-neon transition-all text-left">
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 text-cyan-neon text-xs font-mono font-bold uppercase">
                <Zap className="w-4 h-4" />
                <span>04. Universal 5V USB-C Power Bus</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-cyan-neon/10 text-cyan-neon border border-cyan-neon/30 font-mono text-xs font-bold">
                &lt;2.1 Watts Draw
              </span>
            </div>

            <h3 className="font-display font-bold text-2xl text-white mb-2">
              Runs Off Any Laptop Port or Phone Power Bank
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Forget heavy 120V/240V AC power bricks. AuraPod sips less than 420mA at 5V, meaning you can plug it directly into your laptop, tablet USB-C port, or any pocket power bank.
            </p>

            {/* Interactive Power Bank Runtime Calculator */}
            <div className="p-4 rounded-2xl bg-obsidian-950/80 border border-white/10 mb-6">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Battery className="w-3.5 h-3.5 text-emerald-signal" />
                  Test Power Bank Capacity:
                </span>
                <span className="text-emerald-signal font-bold text-sm">
                  {batterySize.toLocaleString()} mAh &rarr; {estimatedHours} Hours Boost
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
                <span>2,500 mAh (Pocket MagSafe)</span>
                <span>10,000 mAh (Standard Bank)</span>
                <span>20,000 mAh (Heavy Duty)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-obsidian-950/80 border border-white/10 text-left">
                <div className="text-slate-400 text-[10px]">LAPTOP USB DRAIN</div>
                <div className="text-sm font-bold text-emerald-signal mt-0.5">&lt;3% per 4 Hours</div>
                <div className="text-[10px] text-slate-500">Near-zero battery impact</div>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-950/80 border border-white/10 text-left">
                <div className="text-slate-400 text-[10px]">POWER BANK RUNTIME</div>
                <div className="text-sm font-bold text-emerald-signal mt-0.5">{estimatedHours}+ Hours</div>
                <div className="text-[10px] text-slate-500">At {batterySize.toLocaleString()} mAh capacity</div>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-950/80 border border-white/10 text-left">
                <div className="text-slate-400 text-[10px]">PLUG &amp; PLAY</div>
                <div className="text-sm font-bold text-cyan-neon mt-0.5">Zero Drivers</div>
                <div className="text-[10px] text-slate-500">USB-C PD compliant</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400 mt-4">
            <span>Universal USB Type-C Standard</span>
            <span>Supports 5V / 9V PD Negotiation</span>
          </div>
        </div>

      </div>
    </section>
  );
};
