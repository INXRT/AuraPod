import React from 'react';

interface AuraPodLogoProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export const AuraPodLogo: React.FC<AuraPodLogoProps> = ({
  className = 'w-5 h-5 text-cyan-neon',
  size,
  glow = false,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      className={`${className} ${
        glow ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' : ''
      }`}
    >
      {/* Parabolic Reflector Hood */}
      <path d="M12 2a10 10 0 0 1 10 10v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1A10 10 0 0 1 12 2z" />
      {/* Focal Waveguide Stem */}
      <path d="M12 12v6" />
      {/* Precision Feed Node */}
      <circle cx="12" cy="20" r="1.25" fill="currentColor" />
    </svg>
  );
};
