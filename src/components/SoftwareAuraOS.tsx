import React, { useState, useRef } from 'react';
import { Compass, Database, HardDrive, Share2, CheckCircle2, Crosshair, Sparkles } from 'lucide-react';
import { KineticTextReveal } from './ui/KineticTextReveal';

export const SoftwareAuraOS: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'aurascope' | 'auraqueue' | 'campusvault'>('aurascope');

  // AuraScope Radar Interactive State
  const radarRef = useRef<HTMLDivElement | null>(null);
  const [reticlePos, setReticlePos] = useState({ x: 120, y: 80 });
  const [lockStatus, setLockStatus] = useState({ locked: false, percentage: 35 });

  // Target tower coordinates within the radar box (fixed target)
  const targetX = 220;
  const targetY = 130;

  const handleMouseMoveRadar = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!radarRef.current) return;
    const rect = radarRef.current.getBoundingClientRect();
    const curX = e.clientX - rect.left;
    const curY = e.clientY - rect.top;
    setReticlePos({ x: curX, y: curY });

    // Calculate distance to target
    const dx = curX - targetX;
    const dy = curY - targetY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 260;

    const alignment = Math.max(10, Math.min(100, Math.round((1 - dist / maxDist) * 100)));

    if (dist < 28) {
      setLockStatus({ locked: true, percentage: 100 });
    } else {
      setLockStatus({ locked: false, percentage: alignment });
    }
  };

  return (
    <section id="software" className="py-24 px-4 relative z-10 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-left max-w-3xl mb-16">
        <div className="font-mono text-xs text-emerald-signal tracking-wider uppercase mb-3 flex items-center gap-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Companion Software &amp; Offline Protection</span>
          <span className="w-8 h-[1px] bg-emerald-signal/40 hidden sm:inline-block" />
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
          <KineticTextReveal
            text="AuraOS Software Ecosystem"
            splitBy="words"
            direction="up"
            stagger={0.08}
            distance={20}
          />
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Hardware concentrates the signal. AuraOS provides software-layer certainty so not a single byte of homework or test data is lost during drops.
        </p>
      </div>

      {/* Interactive Tab Switcher */}
      <div className="flex justify-center mb-10">
        <div className="p-1 rounded-2xl bg-obsidian-900/90 border border-white/10 shadow-inner flex flex-wrap gap-1 sm:gap-1.5">
          <button
            onClick={() => setActiveTab('aurascope')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-display font-semibold text-xs sm:text-sm transition-all ${
              activeTab === 'aurascope'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>AuraScope AR Radar</span>
          </button>

          <button
            onClick={() => setActiveTab('auraqueue')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-display font-semibold text-xs sm:text-sm transition-all ${
              activeTab === 'auraqueue'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>AuraQueue Engine</span>
          </button>

          <button
            onClick={() => setActiveTab('campusvault')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-display font-semibold text-xs sm:text-sm transition-all ${
              activeTab === 'campusvault'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <HardDrive className="w-4 h-4" />
            <span>CampusVault &amp; DormMesh</span>
          </button>
        </div>
      </div>

      {/* Tab 1: AuraScope AR Radar Simulator */}
      {activeTab === 'aurascope' && (
        <div className="rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-cyan-neon/10 text-cyan-neon border border-cyan-neon/30 text-xs font-mono font-bold">
              <span>AR GYROSCOPE TARGETING</span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Pinpoint Distant Cell Towers in 5 Seconds
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Dorm rooms have blind spots. AuraScope queries public base station telemetry (CID/LAC) and your device’s cellular modem metrics. Through camera AR, it overlays a 3D compass reticle directly on your phone screen, visually guiding you to angle AuraPod towards the strongest line-of-sight signal source.
            </p>

            <div className="p-4 rounded-2xl bg-obsidian-950 border border-white/10 space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Target Base Station:</span>
                <span className="text-white font-bold">CellTower #TOW-802A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Optimal Azimuth:</span>
                <span className="text-cyan-neon font-bold">42.8° NNE (Rooftop Mast)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Beam Coherence:</span>
                <span className={`font-bold ${lockStatus.locked ? 'text-emerald-signal' : 'text-amber-400'}`}>
                  {lockStatus.percentage}% {lockStatus.locked ? '• LOCKED' : '• ALIGNING...'}
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-500 font-mono">
              💡 Interactive: Move your cursor inside the radar display on the right to align with the cell tower.
            </div>
          </div>

          {/* Interactive Radar Screen */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              ref={radarRef}
              onMouseMove={handleMouseMoveRadar}
              className="relative w-full max-w-[360px] h-[320px] rounded-3xl bg-obsidian-950 border border-white/15 shadow-card-elevation overflow-hidden cursor-crosshair select-none p-4"
            >
              {/* Radar Grid Rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-24 h-24 rounded-full border border-sky-500/15" />
                <div className="w-48 h-48 rounded-full border border-sky-500/15" />
                <div className="w-72 h-72 rounded-full border border-sky-500/10" />
                <div className="absolute w-full h-[1px] bg-sky-500/10" />
                <div className="absolute h-full w-[1px] bg-sky-500/10" />
                {/* Rotating Sweep Beam */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/10 to-transparent animate-radar-sweep origin-center pointer-events-none" />
              </div>

              {/* Target Cell Tower Marker */}
              <div
                style={{ left: `${targetX}px`, top: `${targetY}px` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              >
                <div className="relative flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full border border-emerald-signal bg-emerald-signal/20 animate-ping" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-signal absolute" />
                  <span className="absolute top-4 left-4 text-[9px] font-mono text-emerald-signal font-bold whitespace-nowrap">
                    TOWER #802 (3.5GHz)
                  </span>
                </div>
              </div>

              {/* Cursor / Phone Reticle */}
              <div
                style={{ left: `${reticlePos.x}px`, top: `${reticlePos.y}px` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-75"
              >
                <div className={`relative flex items-center justify-center ${lockStatus.locked ? 'text-emerald-signal' : 'text-cyan-neon'}`}>
                  <Crosshair className={`w-8 h-8 ${lockStatus.locked ? 'animate-spin' : ''}`} />
                  <span className="absolute -bottom-5 text-[9px] font-mono font-bold whitespace-nowrap bg-black/80 px-1 rounded">
                    {lockStatus.locked ? '100% LOCK' : `${lockStatus.percentage}%`}
                  </span>
                </div>
              </div>

              {/* Overlay HUD stats */}
              <div className="absolute top-3 left-3 text-[10px] font-mono text-cyan-neon">
                AZIMUTH: 042° | ELEV: 38°
              </div>
              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-400">
                STATUS: {lockStatus.locked ? 'TARGET ACQUIRED' : 'SCANNING...'}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: AuraQueue Resilient LMS Engine */}
      {activeTab === 'auraqueue' && (
        <div className="rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-signal/10 text-emerald-signal border border-emerald-signal/30 text-xs font-mono font-bold">
              <span>NEVER-FAIL SUBMISSION ENGINE</span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Zero Crashes, Zero Lost Quiz Answers
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Standard web browsers cancel uploads when TCP sockets disconnect. AuraQueue operates as a lightweight native daemon and browser extension. It intercepts uploads for Canvas, Moodle, and Blackboard, slicing payloads into encrypted byte chunks.
            </p>

            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-obsidian-950 border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-signal shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white font-mono">Tus Protocol Chunking:</strong> Uploads are split into 2 MB resumable byte ranges. If signal drops, upload pauses without closing the tab.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-obsidian-950 border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-signal shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white font-mono">Cryptographic Proof:</strong> If network returns after midnight, AuraQueue provides an SHA-256 digital certificate proving the user clicked submit before 11:59 PM.
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Chunking Graphic */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-obsidian-950 border border-white/10 space-y-4">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex justify-between">
              <span>AuraQueue Packet Flow</span>
              <span className="text-emerald-signal font-bold">LMS Interception Active</span>
            </div>

            {/* Chunks Representation */}
            <div className="space-y-3">
              {[
                { id: 1, name: "Chunk 01 (0 - 8MB)", status: "Completed & Verified", color: "text-emerald-signal", bg: "bg-emerald-signal" },
                { id: 2, name: "Chunk 02 (8 - 16MB)", status: "Completed & Verified", color: "text-emerald-signal", bg: "bg-emerald-signal" },
                { id: 3, name: "Chunk 03 (16 - 24MB)", status: "Held in IndexedDB (Auto-Resume)", color: "text-cyan-neon", bg: "bg-cyan-neon" },
                { id: 4, name: "Chunk 04 (24 - 32MB)", status: "Pending Flush", color: "text-slate-500", bg: "bg-slate-700" },
              ].map((c) => (
                <div key={c.id} className="p-3 rounded-xl bg-obsidian-900 border border-white/5 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-2.5 h-2.5 rounded-full ${c.bg}`} />
                    <span className="text-white font-bold">{c.name}</span>
                  </div>
                  <span className={c.color}>{c.status}</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-emerald-signal/10 border border-emerald-signal/30 text-[11px] font-mono text-slate-300">
              ⚡ Safe Mode: If connection drops, socket freezes for up to 48 hours without session invalidation.
            </div>
          </div>

        </div>
      )}

      {/* Tab 3: CampusVault & DormMesh P2P */}
      {activeTab === 'campusvault' && (
        <div className="rounded-3xl glass-panel border border-amber-400/30 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amber-400/10 text-amber-400 border border-amber-400/30 text-xs font-mono font-bold">
              <span>OFFLINE PRE-CACHING &amp; LOCAL P2P</span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Nocturnal Vault &amp; Dorm Peer Swarm
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Why stream a 1080p lecture on 1 bar? CampusVault wakes up at 3 AM when dormitory network congestion drops to zero. It automatically pulls down syllabi, slides, and lecture videos, transcoding them into lightweight H.265 offline packages.
            </p>

            <div className="p-4 rounded-2xl bg-obsidian-950 border border-white/10 space-y-2 text-xs font-mono">
              <div className="text-amber-400 font-bold flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" />
                DormMesh Local P2P Wi-Fi Direct Swarm
              </div>
              <p className="text-slate-300 text-[11px] font-sans">
                If Room 302 downloads the 2 GB Machine Learning lecture, students in Room 304 and 308 stream it directly over local Wi-Fi Direct at 50 Mbps with <strong>zero mobile data usage</strong>.
              </p>
            </div>
          </div>

          {/* Dorm Swarm Diagram */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-obsidian-950 border border-white/10">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
              Hostel Floor 3 • P2P Mesh Topology
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs text-center">
              <div className="p-4 rounded-xl bg-obsidian-900 border border-emerald-signal/40">
                <div className="text-emerald-signal font-bold">Room 302 (Aryan)</div>
                <div className="text-[10px] text-slate-400 mt-1">AuraPod Seed Node</div>
                <div className="text-xs text-white mt-2">Cached: 4.8 GB Lectures</div>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-900 border border-cyan-neon/40">
                <div className="text-cyan-neon font-bold">Room 304 (Dev)</div>
                <div className="text-[10px] text-slate-400 mt-1">Peer Stream Receiver</div>
                <div className="text-xs text-white mt-2">Streaming at 54 Mbps</div>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-900 border border-white/10">
                <div className="text-slate-300 font-bold">Room 308 (Priya)</div>
                <div className="text-[10px] text-slate-400 mt-1">Peer Sync Node</div>
                <div className="text-xs text-white mt-2">P2P Synced at 48 Mbps</div>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-900 border border-amber-400/30">
                <div className="text-amber-400 font-bold">Campus Cloud</div>
                <div className="text-[10px] text-slate-400 mt-1">3 AM Quiet Sync</div>
                <div className="text-xs text-white mt-2">Auto-Vault Active</div>
              </div>
            </div>

            <div className="mt-4 text-center text-[10px] font-mono text-slate-500">
              Encrypted end-to-end via AES-256 over local campus subnet.
            </div>
          </div>

        </div>
      )}

    </section>
  );
};
