import React from 'react';

interface StudioBackgroundLightingProps {
  auraPodActive?: boolean;
}

/**
 * StudioBackgroundLighting
 * Authentic high-CRI architectural studio environment.
 * Replaces all AI-style neon blur blobs and artificial projector toggles with
 * calibrated neutral photographic studio lighting (5500K top softbox wash,
 * dark titanium cyclorama, micro-coordinate blueprint grid, and natural vignette).
 */
export const StudioBackgroundLighting: React.FC<StudioBackgroundLightingProps> = ({
  auraPodActive = true,
}) => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Deep Matte Obsidian Cyclorama Base */}
      <div className="absolute inset-0 bg-[#07090E]" />

      {/* 2. Top Overhead Softbox Wash - Pure neutral 5200K daylight falloff */}
      <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1600px] h-[900px] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(241,245,249,0.045)_0%,rgba(148,163,184,0.015)_55%,transparent_85%)] pointer-events-none" />

      {/* 3. Restrained Instrument Bias - Very faint surgical sky-blue / amber indicator reflection */}
      <div
        className={`absolute top-[38%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full blur-[160px] transition-all duration-1000 pointer-events-none ${
          auraPodActive
            ? 'bg-sky-500/[0.025]'
            : 'bg-amber-500/[0.025]'
        }`}
      />

      {/* 4. Fine Engineering Coordinate Millimeter Grid */}
      <div
        className="absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.6) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 85% 75% at 50% 30%, black 20%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 50% 30%, black 20%, transparent 85%)',
        }}
      />

      {/* 5. Smooth Studio Cyclorama Edge Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_50%,rgba(7,9,14,0.85)_100%)] pointer-events-none" />
    </div>
  );
};
