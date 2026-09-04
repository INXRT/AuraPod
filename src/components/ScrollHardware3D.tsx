import React, { useState, useEffect, useRef } from 'react';
import { Radio, Smartphone } from 'lucide-react';
import { AuraPodMesh3D } from './AuraPodMesh3D';
import { AuraPodRoomMesh3D } from './AuraPodRoomMesh3D';
import { sound } from '../utils/audioSynthesizer';
import { KineticTextReveal } from './ui/KineticTextReveal';
import { AuraPodEdition } from '../types';

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

const pocketSubsystems: SubsystemStep[] = [
  {
    id: 'dish',
    number: '01',
    title: 'DUAL TELESCOPIC ANTENNA ARRAY',
    headline: '3-Stage Stepped Telescopic Masts (+12 dBi Focus)',
    description:
      'Two multi-stage telescoping brass and aluminum antennas fold flush into the chassis. When flipped open, they extend into the air to capture weak, scattered 4G, 5G, and Wi-Fi waves with directional beamforming focus.',
    badge: '+12 dBi Gain',
    specs: [
      { label: 'Architecture', value: '3-Stage Telescopic Masts' },
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

const roomSubsystems: SubsystemStep[] = [
  {
    id: 'dish',
    number: '01',
    title: 'PARABOLIC METAMATERIAL REFLECTOR',
    headline: '18-Stage Mathematical Paraboloid (+11.8 dBi Gain)',
    description:
      'Engineered like a radio telescope. An origami-folding metallic wireframe grid captures scattered cell and Wi-Fi waves across a wide 120-degree aperture and concentrates them directly into the central focal collector horn.',
    badge: '+11.8 dBi Gain',
    specs: [
      { label: 'Reflector Grid', value: '18-Stage Mathematical Paraboloid' },
      { label: 'Focus Equation', value: 'z = (x² + y²) / (4 * f)' },
      { label: 'Coverage Area', value: '120° Multi-Bed Room Blanket' },
    ],
    isFolded: false,
  },
  {
    id: 'feed',
    number: '02',
    title: 'FOCAL RECEIVER HORN & DIELECTRIC NODE',
    headline: 'Active Concentrator at Focal Distance f=0.65',
    description:
      'Suspended on a rigid focal arm at the exact optical focal point of the dish. The dielectric focal receiver horn gathers concentrated RF energy and routes it with minimal insertion loss directly to the low-noise amplifier.',
    badge: 'f=0.65 Focal Hub',
    specs: [
      { label: 'Collector Horn', value: 'Spherical Dielectric Lens' },
      { label: 'Impedance Match', value: '50Ω Coaxial Waveguide' },
      { label: 'Return Loss', value: '>18 dB Across Target Bands' },
    ],
    isFolded: false,
  },
  {
    id: 'chassis',
    number: '03',
    title: 'CNC ARTICULATED HINGE STRUTS',
    headline: 'Dual 6061-T6 Aluminum Struts (45° Radar Elevation)',
    description:
      'Two CNC-machined titanium struts lock the dish at a precision 45-degree angle toward distant cellular towers. The friction-damped pivot folds completely flat to 12mm thickness for flat storage.',
    badge: '45° Elevation',
    specs: [
      { label: 'Strut Material', value: 'CNC 6061-T6 Aluminum' },
      { label: 'Elevation Range', value: '0° Flat to 45° Operational' },
      { label: 'Hinge Resistance', value: 'Friction-Damped Articulated' },
    ],
    isFolded: true,
  },
  {
    id: 'lna',
    number: '04',
    title: 'ANODIZED BASE POD & 360° HALO BEACON',
    headline: 'Weighted Desk Pod with Multi-Bed Status Ring',
    description:
      'A solid cylindrical base pod provides heavy desk stabilization on dorm tables and windowsills. An integrated 360-degree telemetry status ring emits ambient lock feedback visible to all roommates.',
    badge: '360° Status Ring',
    specs: [
      { label: 'Base Unit', value: 'Anodized Obsidian Aluminum' },
      { label: 'Desk Stabilization', value: 'High-Mass Anti-Skid Footpad' },
      { label: 'Continuous Draw', value: '<2.5W Continuous 5V' },
    ],
    isFolded: false,
  },
];

interface ScrollHardware3DProps {
  activeEdition?: AuraPodEdition;
  onSelectEdition?: (edition: AuraPodEdition) => void;
}

export const ScrollHardware3D: React.FC<ScrollHardware3DProps> = ({
  activeEdition: parentEdition,
  onSelectEdition: parentSelectEdition,
}) => {
  const [internalEdition, setInternalEdition] = useState<AuraPodEdition>('pocket');
  const activeEdition = parentEdition || internalEdition;

  const setEdition = (ed: AuraPodEdition) => {
    if (parentSelectEdition) {
      parentSelectEdition(ed);
    } else {
      setInternalEdition(ed);
    }
  };

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [userFoldOverride, setUserFoldOverride] = useState<boolean | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const subsystems = activeEdition === 'pocket' ? pocketSubsystems : roomSubsystems;
  const activeSubsystem = subsystems[activeStepIndex] || subsystems[0];
  const isFolded = userFoldOverride !== null ? userFoldOverride : activeSubsystem.isFolded;

  // Reset step index when edition changes
  const handleEditionTab = (ed: AuraPodEdition) => {
    if (ed === activeEdition) return;
    sound.playRadarChirp(1.1);
    setEdition(ed);
    setActiveStepIndex(0);
    setUserFoldOverride(null);
  };

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
            setUserFoldOverride(null);
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
      <div className="text-left max-w-3xl mb-12">
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
        <p className="text-slate-400 text-sm sm:text-base mb-6">
          Explore the internal engineering of both AuraPod models. Switch between the ultra-portable **Pocket Edition** and the high-gain **Room Edition** to inspect their components in 3D.
        </p>
        {/* Subsystem Edition Switcher Tabs */}
        <div className="inline-flex items-center p-1 bg-obsidian-900 border border-white/10 rounded-xl shadow-inner">
          <button
            onClick={() => handleEditionTab('pocket')}
            className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold transition-all flex items-center gap-2 ${
              activeEdition === 'pocket'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Pocket Edition Anatomy</span>
            <span className={`text-[10px] ${activeEdition === 'pocket' ? 'text-slate-700' : 'opacity-60'}`}>(Dual Masts)</span>
          </button>

          <button
            onClick={() => handleEditionTab('room')}
            className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold transition-all flex items-center gap-2 ${
              activeEdition === 'room'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Room Edition Anatomy</span>
            <span className={`text-[10px] ${activeEdition === 'room' ? 'text-slate-700' : 'opacity-60'}`}>(Parabolic Dish)</span>
          </button>
        </div>
      </div>

      {/* Two-Column Layout: Left Sticky 3D WebGL Canvas, Right Scrollable Narrative Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
        
        {/* Left: Sticky 3D WebGL Canvas Component */}
        <div className="lg:col-span-6 sticky top-24 z-20">
          
          {/* Top Status Header */}
          <div className="flex items-center justify-between gap-2 pb-3 mb-2 font-mono text-xs border-b border-white/15">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span className="text-white font-bold">
                {activeEdition === 'pocket' ? 'POCKET EDITION' : 'ROOM EDITION'} // PART {activeSubsystem.number}
              </span>
            </div>
            <div className="text-sky-400 font-mono font-medium text-xs">
              {activeSubsystem.badge}
            </div>
          </div>

          {/* 3D WebGL Canvas with Studio Stage Lighting and Engineering Crosshairs */}
          <div className="w-full h-[460px] sm:h-[520px] relative rounded-2xl overflow-hidden border border-white/[0.08] bg-gradient-to-b from-white/[0.015] to-obsidian-950/80 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.85)]">
            {/* Corner Crosshair Datum Markers */}
            <span className="absolute top-3 left-4 font-mono text-[9px] text-slate-400 select-none pointer-events-none">+ STAGE_02</span>
            <span className="absolute top-3 right-4 font-mono text-[9px] text-slate-400 select-none pointer-events-none">5600K_CRI98 +</span>
            <span className="absolute bottom-3 left-4 font-mono text-[9px] text-slate-400 select-none pointer-events-none">+ CALIBRATED</span>
            <span className="absolute bottom-3 right-4 font-mono text-[9px] text-slate-400 select-none pointer-events-none">HARDWARE_EXPLORER +</span>

            {/* Diffuse Studio Cyclorama Fill */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
              <div className="w-[88%] h-[340px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,rgba(56,189,248,0.015)_40%,transparent_75%)] blur-[45px]" />
              <div className="absolute bottom-6 w-[70%] h-[50px] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,rgba(15,23,42,0.85)_55%,transparent_100%)] blur-[14px]" />
            </div>
            {activeEdition === 'pocket' ? (
              <AuraPodMesh3D
                key="anatomy-pocket"
                auraPodActive={true}
                isFolded={isFolded}
                onToggleFold={undefined}
                highlightPart={activeSubsystem.id}
                interactive={true}
                showBadge={true}
                className="w-full h-full"
              />
            ) : (
              <AuraPodRoomMesh3D
                key="anatomy-room"
                auraPodActive={true}
                isFolded={isFolded}
                onToggleFold={undefined}
                highlightPart={activeSubsystem.id}
                interactive={true}
                showBadge={true}
                className="w-full h-full"
              />
            )}
          </div>

          {/* Subsystem Step Switcher Pills */}
          <div className="grid grid-cols-4 gap-2 pt-4 border-t border-white/10 font-mono text-xs">
            {subsystems.map((sub, idx) => (
              <button
                key={sub.id}
                onClick={() => handleStepClick(idx)}
                className={`py-2 px-2 rounded-lg border transition-all flex flex-col items-center gap-0.5 ${
                  activeStepIndex === idx
                    ? 'bg-white border-white text-slate-950 font-bold shadow-sm'
                    : 'bg-obsidian-900/80 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <span className="font-bold">{sub.number}</span>
                <span className="truncate max-w-[65px] text-[9px] uppercase">{sub.id}</span>
              </button>
            ))}
          </div>

          {/* Quick Fold Toggle Button */}
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono">
            <button
              onClick={handleToggleFold}
              className="px-3 py-1.5 rounded-lg bg-obsidian-900 hover:bg-obsidian-850 border border-white/15 text-slate-300 hover:text-white font-mono text-[11px] font-medium shadow-sm transition-all"
            >
              {activeEdition === 'pocket'
                ? (isFolded ? 'Open Antennas' : 'Close to Pocket')
                : (isFolded ? 'Deploy 45° Dish' : 'Fold Flat (12mm)')}
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
                className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 border ${
                  isActive
                    ? 'bg-obsidian-900/90 border-white/25 shadow-xl ring-1 ring-white/10'
                    : 'bg-obsidian-900/40 border-white/10 opacity-60 hover:opacity-90 hover:border-white/20'
                }`}
              >
                {/* Step Index & Badge */}
                <div className="flex items-center justify-between gap-4 mb-4 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-obsidian-950 border border-white/15 text-cyan-neon font-bold text-sm">
                      {sub.number}
                    </span>
                    <span className="text-slate-400 font-medium uppercase tracking-wider text-[11px]">
                      {sub.title}
                    </span>
                  </div>

                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300 font-mono text-xs font-medium">
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

                {/* Technical Specifications Grid */}
                <div className="border border-white/10 rounded-xl overflow-hidden divide-y divide-white/10 font-mono text-xs bg-obsidian-950/70 shadow-sm">
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
