import React, { useState, useEffect, useRef } from 'react';
import { Radio } from 'lucide-react';
import { AuraPodMesh3D } from './AuraPodMesh3D';
import { sound } from '../utils/audioSynthesizer';
import { KineticTextReveal } from './ui/KineticTextReveal';

interface SubsystemStep {
  id: 'dish' | 'feed' | 'lna' | 'chassis';
  number: string;
  title: string;
  headline: string;
  description: string;
  badge: string;
  specs: { label: string; value: string }[];
  isFolded: boolean;
}

const subsystems: SubsystemStep[] = [
  {
    id: 'dish',
    number: '01',
    title: 'DUAL TELESCOPIC ANTENNA ARRAY',
    headline: '3-Stage Stepped Telescopic Masts (+12 dBi Focus)',
    description:
      'Two multi-stage telescoping brass and aluminum antennas fold flush into the chassis. When flipped open, they extend into the air to capture weak, scattered 4G, 5G, and Wi-Fi waves with directional beamforming focus.',
    badge: '+12 dBi Gain',
    specs: [
      { label: 'Architecture', value: '3-Stage Telescopic' },
      { label: 'Materials', value: 'Space-Titanium & Brass' },
      { label: 'Stowed State', value: 'Flush in Pocket Block' },
    ],
    isFolded: false,
  },
  {
    id: 'feed',
    number: '02',
    title: 'PRECISION SWIVEL & INTERNAL BAY',
    headline: 'Ball-and-Clevis Knuckle with Gold RF Contacts',
    description:
      'Smooth CNC aluminum pivots angle the antennas into an optimal V-spread beamforming stance. Dual recessed slots with gold spring-loaded pogo pins protect the antenna tips when stowed in your pocket.',
    badge: 'Dual V-Spread',
    specs: [
      { label: 'Knuckle Type', value: 'CNC Ball-and-Clevis' },
      { label: 'Contact Plating', value: 'ENIG Immersion Gold' },
      { label: 'Internal Bay', value: 'Molded Rubber Cushions' },
    ],
    isFolded: false,
  },
  {
    id: 'lna',
    number: '03',
    title: 'SHIELDED LNA & SAW BANDPASS FILTER',
    headline: 'Clean Signal Amplification (<1.2 dB Noise Figure)',
    description:
      'Weak microwave signals are easily drowned out by background RF noise. A tin-plated Faraday shield protects the onboard LNA and surface acoustic wave (SAW) filters, cleanly lifting weak signals above the noise floor.',
    badge: '<1.2 dB Noise Figure',
    specs: [
      { label: 'Noise Figure', value: '1.1 dB' },
      { label: 'Shielding', value: 'Tin-Plated Faraday Can' },
      { label: 'Compliance', value: 'FCC Part 15 Unlicensed' },
    ],
    isFolded: false,
  },
  {
    id: 'chassis',
    number: '04',
    title: 'TITANIUM POCKET CHASSIS & 5V USB-C',
    headline: 'Under 180 Grams with 18-Hour Power Bank Life',
    description:
      'An anodized titanium pocket block with a smooth rear hinge fits cleanly into your pocket. Runs directly off your laptop USB-C port or small power bank with under 2.1W power draw.',
    badge: '<2.1W USB-C',
    specs: [
      { label: 'Total Weight', value: 'Under 180 grams' },
      { label: 'Power Input', value: '5V USB-C (<2.1W)' },
      { label: 'Hinge Life', value: '10,000+ Open/Close Cycles' },
    ],
    isFolded: true,
  },
];

export const ScrollHardware3D: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [userFoldOverride, setUserFoldOverride] = useState<boolean | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeSubsystem = subsystems[activeStepIndex];
  const isFolded = userFoldOverride !== null ? userFoldOverride : activeSubsystem.isFolded;

  // Scroll detection to update active step
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      stepRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;

        if (elementCenter > windowHeight * 0.2 && elementCenter < windowHeight * 0.8) {
          if (activeStepIndex !== idx) {
            setActiveStepIndex(idx);
            setUserFoldOverride(null); // Return to step default
            sound.playRadarChirp(0.9 + idx * 0.15);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeStepIndex]);

  const handleStepClick = (idx: number) => {
    sound.playToggleClick();
    setActiveStepIndex(idx);
    setUserFoldOverride(null);
    const target = stepRefs.current[idx];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleToggleFold = () => {
    sound.playToggleClick();
    setUserFoldOverride(!isFolded);
  };

  return (
    <section id="hardware-3d" className="py-24 px-4 sm:px-8 relative z-10 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-left max-w-3xl mb-16">
        <div className="font-mono text-xs text-cyan-neon tracking-wider uppercase mb-3 flex items-center gap-3">
          <Radio className="w-3.5 h-3.5" />
          <span>Hardware Engineering</span>
          <span className="w-8 h-[1px] bg-cyan-neon/40 hidden sm:inline-block" />
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
          <KineticTextReveal
            text="Interactive Hardware Anatomy"
            splitBy="words"
            direction="up"
            stagger={0.06}
            distance={16}
          />
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Scroll through the key mechanical and radio subsystems of AuraPod. Drag to rotate and inspect the 3D model from any angle.
        </p>
      </div>

      {/* Split Sticky Layout: Left = Sticky 3D WebGL Viewport | Right = Sequential Scroll Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
        
        {/* Left: Sticky 3D Viewport */}
        <div className="lg:col-span-6 lg:sticky lg:top-24 z-20 text-left">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/15 mb-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-neon animate-pulse" />
              <span className="text-white font-bold uppercase tracking-wider">
                {activeSubsystem.title}
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-cyan-neon/15 border border-cyan-neon/40 text-cyan-neon font-bold text-[10px]">
              {activeSubsystem.badge}
            </span>
          </div>

          {/* Borderless 3D WebGL Canvas (100% Fully Visible, Zero Box) */}
          <div className="w-full h-[460px] sm:h-[520px] relative">
            <AuraPodMesh3D
              auraPodActive={true}
              isFolded={isFolded}
              onToggleFold={undefined}
              highlightPart={activeSubsystem.id}
              interactive={true}
              showBadge={true}
              className="w-full h-full"
            />
          </div>

          {/* Subsystem Step Navigation Bar (Outside Standalone Buttons) */}
          <div className="mt-2 pt-3 border-t border-white/15 grid grid-cols-4 gap-2 font-mono text-[10px]">
            {subsystems.map((sub, idx) => (
              <button
                key={sub.id}
                onClick={() => handleStepClick(idx)}
                className={`py-2 px-2 rounded-lg border-2 transition-all flex flex-col items-center gap-0.5 ${
                  activeStepIndex === idx
                    ? 'bg-cyan-neon border-cyan-neon text-obsidian-950 font-black shadow-[2px_2px_0px_#000]'
                    : 'bg-obsidian-900 border-white/15 text-slate-400 hover:text-white'
                }`}
              >
                <span className="font-bold">{sub.number}</span>
                <span className="truncate max-w-[60px] text-[9px] uppercase">{sub.id}</span>
              </button>
            ))}
          </div>

          {/* Quick Fold Toggle Button (Kept out standalone) */}
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono">
            <button
              onClick={handleToggleFold}
              className="px-3 py-1 rounded bg-obsidian-900 hover:bg-obsidian-850 border border-white/20 text-slate-300 hover:text-white font-mono text-[10px] font-bold"
            >
              {isFolded ? 'DEPLOY 3D DISH (45°)' : 'FOLD 3D FLAT (12MM)'}
            </button>
            <span className="text-slate-500">SCROLL TO STEP THROUGH 3D</span>
          </div>
        </div>

        {/* Right: Scroll-Driven Narrative Steps */}
        <div className="lg:col-span-6 space-y-12 text-left">
          {subsystems.map((sub, idx) => {
            const isActive = activeStepIndex === idx;

            return (
              <div
                key={sub.id}
                ref={(el) => (stepRefs.current[idx] = el)}
                className={`p-6 sm:p-8 rounded-2xl transition-all duration-500 border-2 ${
                  isActive
                    ? 'bg-obsidian-950 border-cyan-neon/80 shadow-[6px_6px_0px_#0A0E17,8px_8px_0px_#00F2FE]'
                    : 'bg-obsidian-900/60 border-white/10 opacity-60 hover:opacity-100 hover:border-white/20'
                }`}
              >
                {/* Step Index & Badge */}
                <div className="flex items-center justify-between gap-4 mb-4 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-obsidian-900 border border-white/20 text-cyan-neon font-black text-sm">
                      {sub.number}
                    </span>
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                      {sub.title}
                    </span>
                  </div>

                  <span className="px-2.5 py-1 rounded bg-cyan-neon/15 border border-cyan-neon/40 text-cyan-neon font-mono text-xs font-bold shadow-[2px_2px_0px_#000]">
                    {sub.badge}
                  </span>
                </div>

                {/* Subsystem Headline */}
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-3">
                  {sub.headline}
                </h3>

                {/* Body Narrative */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                  {sub.description}
                </p>

                {/* Technical Specifications Grid (10% Neobrutalist Table) */}
                <div className="border-2 border-white/10 rounded-xl overflow-hidden divide-y divide-white/10 font-mono text-xs bg-obsidian-950 shadow-[2px_2px_0px_#000]">
                  {sub.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex justify-between items-center p-3">
                      <span className="text-slate-400">{spec.label}:</span>
                      <span className="text-white font-bold">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Visual indicator button to select this step */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => handleStepClick(idx)}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-neon hover:underline"
                  >
                    <span>Focus 3D Viewport on Subsystem {sub.number} &rarr;</span>
                  </button>

                  <span className="text-[10px] font-mono text-slate-500">
                    STEP {sub.number} OF 04
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};
