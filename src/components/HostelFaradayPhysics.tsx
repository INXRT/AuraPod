import React, { useState } from 'react';
import { Layers, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { KineticTextReveal } from './ui/KineticTextReveal';

interface HostelFaradayPhysicsProps {
  auraPodActive: boolean;
  onToggleAuraPod: () => void;
}

export const HostelFaradayPhysics: React.FC<HostelFaradayPhysicsProps> = ({
  auraPodActive,
  onToggleAuraPod,
}) => {
  const [wallType, setWallType] = useState<'concrete' | 'brick' | 'glass'>('concrete');

  return (
    <section id="faraday" className="py-24 px-4 sm:px-8 relative z-10 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-left max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-sans font-medium text-slate-300 mb-4">
          <Layers className="w-3.5 h-3.5 text-sky-400" />
          <span>The Problem: Concrete &amp; Rebar</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
          <KineticTextReveal
            text="Why Concrete Dorms Kill Your Signal"
            splitBy="words"
            direction="up"
            stagger={0.06}
            distance={16}
          />
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          High-frequency 4G and 5G signals cannot penetrate thick reinforced concrete walls. The embedded steel rebar grid acts like an electromagnetic mirror, blocking up to 84% of exterior radio waves.
        </p>
      </div>

      {/* Architectural Cross-Section Chassis */}
      <div className="rounded-2xl bg-obsidian-950 border border-white/15 p-6 sm:p-8 shadow-card-elevation text-left relative overflow-hidden">
        
        {/* Toolbar with Material Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-6 text-xs">
          <div className="flex items-center gap-2 font-sans font-semibold text-white">
            <span className="w-2 h-2 rounded-full bg-cyan-neon" />
            <span>Wall Signal Penetration Model</span>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-obsidian-900 border border-white/10 shadow-inner font-sans">
            {[
              { id: 'concrete', label: '250mm Concrete (-32 dB)' },
              { id: 'brick', label: 'Standard Brick (-18 dB)' },
              { id: 'glass', label: 'Window Slot (-12 dB)' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setWallType(item.id as any)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  wallType === item.id
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Architectural SVG Diagram */}
        <div className="rounded-xl bg-black border-2 border-white/10 p-4 sm:p-6 mb-6 overflow-hidden">
          <svg viewBox="0 0 640 240" className="w-full h-auto">
            {/* Exterior Tower Zone */}
            <rect x="10" y="20" width="150" height="200" rx="6" fill="#0A0E17" stroke="#1E293B" strokeWidth="1.5" />
            <text x="85" y="44" fill="#38BDF8" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              EXTERIOR AZIMUTH
            </text>
            <text x="85" y="60" fill="#64748B" fontSize="9" fontFamily="monospace" textAnchor="middle">
              Base Station (+24 dBm TX)
            </text>

            {/* Base Station Tower */}
            <line x1="85" y1="80" x2="85" y2="180" stroke="#38BDF8" strokeWidth="2.5" />
            <path d="M 55 180 L 115 180 M 65 140 L 105 140 M 75 105 L 95 105" stroke="#38BDF8" strokeWidth="2" />
            <circle cx="85" cy="80" r="6" fill="#38BDF8" />
            <circle cx="85" cy="80" r="14" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />

            {/* 250mm Wall with Rebar Mesh Barrier */}
            <rect x="190" y="20" width="90" height="200" fill="#1E293B" stroke="#475569" strokeWidth="2" />
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={`r-${i}`} x1="190" y1={35 + i * 24} x2="280" y2={35 + i * 24} stroke="#64748B" strokeWidth="1.5" />
            ))}
            <line x1="220" y1="20" x2="220" y2="220" stroke="#64748B" strokeWidth="1.5" />
            <line x1="250" y1="20" x2="250" y2="220" stroke="#64748B" strokeWidth="1.5" />
            
            <text x="235" y="125" fill="#F87171" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold" transform="rotate(-90 235 125)">
              {wallType === 'concrete' ? '250mm REBAR GRID' : wallType === 'brick' ? 'BRICK MASONRY' : 'DOUBLE GLASS'}
            </text>

            {/* Reflected Wave Vector (bouncing off rebar like a mirror) */}
            <path d="M 105 90 L 190 120 L 115 160" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="4 4" />
            <text x="135" y="145" fill="#EF4444" fontSize="9" fontFamily="monospace" fontWeight="bold">
              84% REFLECTION
            </text>

            {/* Window Aperture Slot (Natural gap in building) */}
            <rect x="190" y="20" width="90" height="45" fill="#0EA5E9" fillOpacity="0.2" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" />
            <text x="235" y="44" fill="#38BDF8" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              WINDOW APERTURE
            </text>

            {/* Interior Dorm Room */}
            <rect x="310" y="20" width="320" height="200" rx="6" fill="#0A0E17" stroke="#1E293B" strokeWidth="1.5" />
            <text x="470" y="44" fill="#94A3B8" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              STUDENT CORNER DORMITORY
            </text>

            {/* Desk & Laptop */}
            <rect x="360" y="165" width="220" height="10" rx="2" fill="#334155" />
            <rect x="470" y="140" width="55" height="25" rx="3" fill="#0F172A" stroke="#64748B" strokeWidth="2" />
            <line x1="465" y1="165" x2="530" y2="165" stroke="#64748B" strokeWidth="2.5" />

            {auraPodActive ? (
              // Active: AuraPod focusing wavefront
              <>
                {/* AuraPod Parabolic Dish on desk */}
                <path d="M 380 95 Q 405 145 430 95" fill="none" stroke="#38BDF8" strokeWidth="3" />
                <circle cx="405" cy="125" r="5" fill="#22C55E" />
                <line x1="405" y1="125" x2="470" y2="152" stroke="#22C55E" strokeWidth="2" strokeDasharray="4 4" />

                {/* Direct incident ray through window focusing to dish */}
                <path d="M 105 45 L 280 45 L 405 125" fill="none" stroke="#38BDF8" strokeWidth="2" />
                <text x="420" y="90" fill="#38BDF8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  +11.8 dBi FOCUS
                </text>
                <text x="500" y="130" fill="#22C55E" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  -78 dBm (4 BARS)
                </text>
              </>
            ) : (
              // Inactive: 1 Bar dead zone
              <>
                <path d="M 280 45 L 490 145" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="2 4" />
                <text x="500" y="130" fill="#EF4444" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  -119 dBm (1 BAR DEAD ZONE)
                </text>
              </>
            )}
          </svg>
        </div>

        {/* Comparison Callout Card */}
        <div className="p-4 rounded-xl bg-obsidian-900/80 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs shadow-sm">
          <div className="flex items-center gap-3">
            {auraPodActive ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-signal shrink-0" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-crimson-hazard shrink-0" />
            )}
            <span className="text-slate-200">
              {auraPodActive ? (
                <>
                  <strong className="text-emerald-signal">AuraPod Parabolic Focus Active:</strong> Line-of-sight wavefronts entering the window slot are concentrated onto the 50&Omega; focal horn, lifting the link budget by +41 dB.
                </>
              ) : (
                <>
                  <strong className="text-crimson-hazard">Unassisted Dead Zone:</strong> Scattered microwaves bypass your desk. Laptop antenna receives only thermal floor static (-119 dBm).
                </>
              )}
            </span>
          </div>

          <button
            onClick={onToggleAuraPod}
            className={`px-4 py-2 rounded-lg font-mono font-semibold text-xs whitespace-nowrap border transition-all shadow-sm active:scale-[0.98] ${
              auraPodActive
                ? 'bg-obsidian-900 border-white/20 text-slate-300 hover:text-white'
                : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25'
            }`}
          >
            {auraPodActive ? 'Simulate Dead Zone (1 Bar)' : 'Focus AuraPod (+11.8 dBi)'}
          </button>
        </div>

      </div>

    </section>
  );
};
