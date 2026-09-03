import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, CheckCircle2, Clock, UploadCloud, RefreshCw, FileText, Download, ShieldCheck, Terminal, ChevronDown, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audioSynthesizer';
import { KineticTextReveal } from './ui/KineticTextReveal';

interface SubmissionSimulatorProps {
  auraPodActive: boolean;
  onToggleAuraPod: () => void;
}

export const SubmissionSimulator: React.FC<SubmissionSimulatorProps> = ({ auraPodActive, onToggleAuraPod }) => {
  const [secondsLeft, setSecondsLeft] = useState(38);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'failed' | 'success'>('idle');
  const [shakeScreen, setShakeScreen] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[11:58:12.040] Socket idle. Awaiting user assignment dispatch payload...',
    '[11:58:12.042] Target endpoint: portal.university.edu:443 (TLS 1.3)',
    '[11:58:12.045] Local daemon: AuraQueue background client listening on port 8080'
  ]);
  const [fileName] = useState('Distributed_Systems_Final_Project_v3.zip');
  const [fileSize] = useState('34.8 MB');
  const logContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  // Countdown timer ticking down to midnight
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 1 ? prev - 1 : 45));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStartSubmission = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmissionStatus('idle');
    setUploadProgress(0);
    sound.playToggleClick();

    if (!auraPodActive) {
      // Dead Zone Failure Path
      setTerminalLogs([
        '[11:58:31.020] DISPATCH: Initializing standard browser socket upload...',
        '[11:58:31.250] Carrier RSRP: -119 dBm (1 Bar). Wall penetration loss: -32 dB',
        '[11:58:31.620] TCP SYN sent to portal.university.edu:443 -> ACK received (RTT 1420ms)',
        '[11:58:32.100] POST /api/v2/assignments/cs402-final (Content-Length: 36490444 bytes)',
        '[11:58:32.800] Streaming chunks... Packet loss detected: 34.2%'
      ]);

      let progress = 0;
      const interval = setInterval(() => {
        progress += 3;
        setUploadProgress(progress);

        if (progress === 9) {
          setTerminalLogs((prev) => [
            ...prev,
            '[11:58:33.410] Retransmission timeout: segment seq 2097152:3145728 unacknowledged'
          ]);
        }

        if (progress >= 18) {
          clearInterval(interval);
          setTerminalLogs((prev) => [
            ...prev,
            '[11:58:34.800] Buffer exhaustion: Carrier signal dropped below -122 dBm sensitivity',
            '[11:58:35.300] Socket reset by peer: TCP RST packet received',
            '[11:58:35.750] FATAL: ERR_CONNECTION_RESET (Submission halted at 18%)',
            '[12:00:01.000] DEADLINE BREACH: Assignment closed. Late grade penalty applied (0/100)'
          ]);

          setTimeout(() => {
            setIsSubmitting(false);
            setSubmissionStatus('failed');
            setShakeScreen(true);
            sound.playErrorAlarm();
            setTimeout(() => setShakeScreen(false), 500);
          }, 600);
        }
      }, 110);
    } else {
      // AuraPod Success Path
      setTerminalLogs([
        '[11:58:24.010] DISPATCH: AuraQueue Resilient Chunk Daemon engaged (port 8080)',
        '[11:58:24.150] Parabolic RF link: +11.8 dBi beam focus locked on Base Station #TOW-802',
        '[11:58:24.310] Carrier RSRP: -78 dBm (4 Bars). Coherence: 98.4%. Ping: 24ms',
        '[11:58:24.500] Tus v1.0.0 protocol handshake established with university portal',
        '[11:58:24.800] Chunk 1/4 (8.7MB): Offset 0 -> Uploaded (HTTP 204 No Content)'
      ]);

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(Math.min(progress, 100));

        if (progress === 40) {
          setTerminalLogs((prev) => [
            ...prev,
            '[11:58:25.200] Chunk 2/4 (8.7MB): Offset 9122611 -> SHA-256 [a92bf0...] OK'
          ]);
        }
        if (progress === 70) {
          setTerminalLogs((prev) => [
            ...prev,
            '[11:58:25.800] Chunk 3/4 (8.7MB): Offset 18245222 -> Verified at 34.8 Mbps'
          ]);
        }

        if (progress >= 100) {
          clearInterval(interval);
          setTerminalLogs((prev) => [
            ...prev,
            '[11:58:26.400] Chunk 4/4 (8.7MB): Upload-Offset: 36490444 (100% complete)',
            '[11:58:26.700] Server response: HTTP 201 Created (Assignment Accepted)',
            '[11:58:27.020] Cryptographic receipt signed with SHA-256 [7f83b165...069]',
            '[11:58:27.100] SUCCESS: Submission recorded 1m 33s BEFORE deadline. Stored in CampusVault.'
          ]);

          setTimeout(() => {
            setIsSubmitting(false);
            setSubmissionStatus('success');
            sound.playSuccessChime();
            try {
              confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#00F2FE', '#10B981', '#38BDF8']
              });
            } catch {
              // Ignore if canvas blocked
            }
          }, 350);
        }
      }, 55);
    }
  };

  const handleDownloadReceipt = () => {
    const receiptContent = `====================================================================
               AURAQUEUE CRYPTOGRAPHIC SUBMISSION RECEIPT
====================================================================
Institution:        State University Portal (LMS Canvas/Moodle)
Course:             CS402: Distributed Systems Capstone
Assignment:         Final Research Draft & Code Archive
File Submitted:     ${fileName} (${fileSize})
Timestamp:          2026-09-03 11:58:26.700 IST
SHA-256 Checksum:   7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
Integrity Check:    PASSED (AuraQueue Asynchronous Packet Verified)
Network Carrier:    AuraPod Pro Active Link (+11.8 dBi Parabolic Focus)
Status:             ON-TIME SUBMISSION VERIFIED
====================================================================`;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Submission_Receipt_CS402.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="simulator" className="py-24 px-4 relative z-10 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-left max-w-3xl mb-12">
        <div className="font-mono text-xs text-amber-400 tracking-wider uppercase mb-3 flex items-center gap-3">
          <Clock className="w-3.5 h-3.5" />
          <span>Deadline Simulation</span>
          <span className="w-8 h-[1px] bg-amber-400/40 hidden sm:inline-block" />
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
          <KineticTextReveal
            text="The 11:59 PM Deadline Test"
            splitBy="words"
            direction="up"
            stagger={0.06}
            distance={16}
          />
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          See what happens when an assignment upload drops at 11:59 PM on a weak 1-bar connection—and how AuraPod keeps your upload safe.
        </p>
      </div>

      {/* Simulator Chassis */}
      <div
        className={`rounded-2xl bg-obsidian-950 border-2 transition-all duration-300 overflow-hidden ${
          auraPodActive
            ? 'border-emerald-signal/60 shadow-[6px_6px_0px_#0A0E17,8px_8px_0px_#10B981]'
            : 'border-crimson-hazard/60 shadow-[6px_6px_0px_#0A0E17,8px_8px_0px_#EF4444]'
        } ${shakeScreen ? 'animate-shake' : ''}`}
      >
        
        {/* Hardware Header Bar */}
        <div className="px-5 py-3 bg-obsidian-900 border-b-2 border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-crimson-hazard border border-crimson-hazard/80" />
              <span className="w-3 h-3 rounded-sm bg-amber-400 border border-amber-400/80" />
              <span className="w-3 h-3 rounded-sm bg-emerald-signal border border-emerald-signal/80" />
            </div>
            <span className="text-slate-400 text-[11px] font-mono border-l border-white/10 pl-3">
              portal.university.edu/courses/cs402/assignments/final
            </span>
          </div>

          {/* Retro Digital LED Segmented Countdown Display */}
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-black border border-crimson-hazard/80 text-crimson-hazard font-mono text-xs font-black tracking-wider shadow-[2px_2px_0px_#EF4444]">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            <span>DEADLINE IN: 00:00:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}</span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6 text-left">
          
          {/* Tactile Mode Switcher Bay (Neobrutalist Card) */}
          <div className="p-4 rounded-xl bg-obsidian-900 border-2 border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[4px_4px_0px_#0F172A]">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                ACTIVE TESTBED ENVIRONMENT
              </div>
              <div className="text-sm font-mono font-bold text-white flex items-center gap-2 mt-1">
                {auraPodActive ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-signal animate-pulse" />
                    <span className="text-emerald-signal font-bold">AuraPod Active (+11.8 dBi Focused • 0% Packet Loss)</span>
                  </>
                ) : (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-crimson-hazard" />
                    <span className="text-crimson-hazard font-bold">Hostel Corner Room (1 Bar • -32 dB Rebar Attenuation)</span>
                  </>
                )}
              </div>
            </div>

            {/* Clicky Neobrutalist Mode Switch Button */}
            <button
              onClick={() => {
                sound.playToggleClick();
                onToggleAuraPod();
              }}
              className={`px-4 py-2.5 rounded-lg text-xs font-mono font-black tracking-wide border-2 transition-all ${
                auraPodActive
                  ? 'bg-obsidian-950 border-emerald-signal text-emerald-signal shadow-[3px_3px_0px_#10B981] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
                  : 'bg-cyan-neon border-cyan-neon text-obsidian-950 shadow-[3px_3px_0px_#000,4px_4px_0px_#00F2FE] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
              }`}
            >
              {auraPodActive ? 'SWITCH TO DEAD ZONE (1 BAR)' : 'ENABLE AURAPOD BOOST (4 BARS)'}
            </button>
          </div>

          {/* Assignment & Telemetry Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left: Assignment Details (Col 7) */}
            <div className="lg:col-span-7 p-6 rounded-xl bg-obsidian-900/90 border-2 border-white/15 flex flex-col justify-between shadow-[4px_4px_0px_#0F172A]">
              <div>
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 mb-4">
                  <div>
                    <div className="inline-block px-2 py-0.5 rounded bg-cyan-neon/15 border border-cyan-neon/40 text-cyan-neon text-[10px] font-mono font-bold uppercase tracking-wider mb-1.5">
                      TASK #CS402-FINAL
                    </div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                      CS402: Distributed Systems Final Capstone
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-1">
                      Weight: 40% Final Grade • Strictly No Late Submissions Accepted.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-amber-400/20 border-2 border-amber-400/60 text-amber-300 font-mono text-xs font-bold shadow-[2px_2px_0px_#D97706] shrink-0">
                    Due 11:59 PM
                  </span>
                </div>

                {/* Attached File Box (Mechanical Cassette Stamped Look) */}
                <div className="p-4 rounded-lg bg-obsidian-950 border-2 border-white/15 flex items-center justify-between shadow-[2px_2px_0px_#0F172A] mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded bg-cyan-neon/15 border border-cyan-neon/30 text-cyan-neon">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-mono font-bold text-white truncate max-w-[200px] sm:max-w-xs">
                        {fileName}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500">
                        {fileSize} • Compressed Tarball Archive
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-signal/15 border border-emerald-signal/40 text-emerald-signal font-mono text-[10px] font-bold uppercase tracking-wider">
                    READY
                  </span>
                </div>
              </div>

              {/* Upload Progress Bar (Segmented Technical Meter) */}
              {isSubmitting && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className={auraPodActive ? 'text-cyan-neon font-bold' : 'text-amber-400 font-bold'}>
                      {auraPodActive ? 'AuraQueue Streaming Byte Chunks (34.8 Mbps)...' : 'Standard Upload (Socket Retransmitting)...'}
                    </span>
                    <span className="text-white font-black">{uploadProgress}%</span>
                  </div>
                  
                  {/* Segmented meter track */}
                  <div className="w-full h-3 rounded bg-obsidian-950 border-2 border-white/20 p-0.5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-100 ${
                        auraPodActive
                          ? 'bg-gradient-to-r from-cyan-neon to-emerald-signal'
                          : 'bg-crimson-hazard'
                      }`}
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right: Telemetry & Dispatch Button (Col 5) */}
            <div className="lg:col-span-5 p-6 rounded-xl bg-obsidian-900/90 border-2 border-white/15 flex flex-col justify-between shadow-[4px_4px_0px_#0F172A]">
              <div>
                <div className="text-xs font-mono text-cyan-neon font-bold uppercase tracking-wider pb-3 border-b border-white/10 mb-4 flex items-center justify-between">
                  <span>LIVE PROTOCOL TELEMETRY</span>
                  <span className="text-[10px] text-slate-500 font-mono">[PORT 8080]</span>
                </div>

                {/* Structured Data Table with Tactile Row Separators */}
                <div className="border border-white/10 rounded-lg overflow-hidden divide-y divide-white/10 font-mono text-xs bg-obsidian-950">
                  <div className="flex justify-between items-center p-2.5">
                    <span className="text-slate-400">Signal Strength:</span>
                    <span className={`font-bold ${auraPodActive ? 'text-emerald-signal' : 'text-crimson-hazard'}`}>
                      {auraPodActive ? '-78 dBm (4 Bars)' : '-119 dBm (1 Bar)'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2.5">
                    <span className="text-slate-400">Packet Jitter:</span>
                    <span className={`font-bold ${auraPodActive ? 'text-emerald-signal' : 'text-crimson-hazard'}`}>
                      {auraPodActive ? '2.1 ms' : '240 ms (Drop)'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2.5">
                    <span className="text-slate-400">Effective Bandwidth:</span>
                    <span className={`font-bold ${auraPodActive ? 'text-emerald-signal' : 'text-crimson-hazard'}`}>
                      {auraPodActive ? '34.8 Mbps' : '0.12 Mbps'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2.5">
                    <span className="text-slate-400">AuraQueue Daemon:</span>
                    <span className={`font-bold ${auraPodActive ? 'text-cyan-neon' : 'text-slate-600'}`}>
                      {auraPodActive ? 'ACTIVE (Interception ON)' : 'OFF (Unprotected)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Neobrutalist High-Energy Dispatch Action Button */}
              <div className="mt-6">
                <button
                  onClick={handleStartSubmission}
                  disabled={isSubmitting}
                  className={`w-full py-3.5 px-5 rounded-lg font-mono font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 border-2 transition-all ${
                    isSubmitting
                      ? 'bg-obsidian-800 border-white/10 text-slate-500 cursor-not-allowed shadow-none'
                      : auraPodActive
                      ? 'bg-gradient-to-r from-cyan-neon to-emerald-signal border-cyan-neon text-obsidian-950 shadow-[4px_4px_0px_#0A0E17,5px_5px_0px_#10B981] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none'
                      : 'bg-crimson-hazard border-crimson-hazard text-white shadow-[4px_4px_0px_#0A0E17,5px_5px_0px_#991B1B] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>TRANSMITTING PAYLOAD...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4" />
                      <span>Submit Assignment (34.8 MB)</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

          {/* Live Protocol Terminal Inspector (10% Neobrutalist CRT Styling) */}
          <div className="rounded-xl bg-black border-2 border-white/20 overflow-hidden shadow-[4px_4px_0px_#0F172A]">
            <div className="flex items-center justify-between px-4 py-2.5 bg-obsidian-900 border-b-2 border-white/15 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-cyan-neon" />
                <span className="font-bold">Live Packet Activity &amp; Protocol Trace</span>
              </div>
              <button
                onClick={() => setShowTerminal(!showTerminal)}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white font-mono"
              >
                <span>{showTerminal ? '[ COLLAPSE ]' : '[ EXPAND ]'}</span>
                {showTerminal ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>

            {showTerminal && (
              <div ref={logContainerRef} className="p-4 font-mono text-[11px] space-y-1.5 max-h-36 overflow-y-auto">
                {terminalLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`${
                      log.includes('FATAL') || log.includes('ERR_') || log.includes('timeout')
                        ? 'text-crimson-hazard font-bold'
                        : log.includes('SUCCESS') || log.includes('verified') || log.includes('HTTP 201')
                        ? 'text-emerald-signal font-bold'
                        : log.includes('DISPATCH') || log.includes('AuraQueue')
                        ? 'text-cyan-neon font-medium'
                        : 'text-slate-400'
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Result States with Tactile Neobrutalist Borders */}
          {submissionStatus === 'failed' && (
            <div className="p-6 rounded-xl bg-crimson-hazard/10 border-2 border-crimson-hazard shadow-[4px_4px_0px_#EF4444] text-left">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-crimson-hazard border border-crimson-hazard text-white">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-black text-crimson-hazard uppercase font-mono tracking-wider">
                    CRITICAL NETWORK ERROR: 12:00:02 AM • DEADLINE BREACH
                  </div>
                  <p className="text-sm text-slate-200">
                    The network dropped at 18% upload progress. The LMS closed the socket with <code className="text-crimson-hazard font-mono bg-black/40 px-1.5 py-0.5 rounded border border-crimson-hazard/40">ERR_CONNECTION_RESET</code>. Your assignment was recorded <strong>LATE (0/100)</strong>.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        onToggleAuraPod();
                        sound.playToggleClick();
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-black text-cyan-neon hover:underline"
                    >
                      <span>Enable AuraPod (+11.8 dBi) to rescue submission &rarr;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {submissionStatus === 'success' && (
            <div className="p-6 rounded-xl bg-emerald-signal/10 border-2 border-emerald-signal shadow-[4px_4px_0px_#10B981] text-left">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-emerald-signal border border-emerald-signal text-obsidian-950">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-emerald-signal uppercase font-mono tracking-wider flex items-center gap-2">
                      <span>SUBMISSION GUARANTEED &amp; TIMESTAMP VERIFIED</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-signal" />
                    </div>
                    <p className="text-sm text-slate-200 mt-1">
                      Uploaded in 0.8s via AuraPod’s parabolic focus. AuraQueue verified chunk integrity and generated cryptographic proof before midnight.
                    </p>
                    <div className="text-xs font-mono text-slate-400 mt-2">
                      Timestamp: 11:58:26 PM IST • Hash: <span className="text-cyan-neon font-bold">sha256:7f83b165...069</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleDownloadReceipt}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-signal border-2 border-emerald-signal text-obsidian-950 font-mono font-black text-xs shadow-[3px_3px_0px_#0A0E17] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Proof Receipt</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
