import React from 'react';

interface CoinIconProps {
  className?: string;
  size?: number;
}

export const CoinIcon: React.FC<CoinIconProps> = ({ className = 'w-4 h-4', size }) => {
  return (
    <svg 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      <defs>
        <radialGradient id="coinGlow" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFF275" />
          <stop offset="45%" stopColor="#FFC800" />
          <stop offset="85%" stopColor="#E69500" />
          <stop offset="100%" stopColor="#B36B00" />
        </radialGradient>
        <linearGradient id="coinRim" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF7A1" />
          <stop offset="50%" stopColor="#D98200" />
          <stop offset="100%" stopColor="#7A4100" />
        </linearGradient>
        <linearGradient id="starShine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFE066" />
        </linearGradient>
        <filter id="coinShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Outer Rim */}
      <circle cx="16" cy="16" r="15" fill="url(#coinRim)" filter="url(#coinShadow)" />
      
      {/* Inner Face */}
      <circle cx="16" cy="16" r="13" fill="url(#coinGlow)" />
      
      {/* Subtle Inner Ring */}
      <circle cx="16" cy="16" r="11" stroke="#FFAE00" strokeWidth="0.75" strokeDasharray="1.5 1.5" opacity="0.6" />

      {/* Star / Sparkle Symbol */}
      <path 
        d="M16 6.5L18.8 12.8L25.5 13.5L20.4 18.2L21.9 25L16 21.5L10.1 25L11.6 18.2L6.5 13.5L13.2 12.8L16 6.5Z" 
        fill="url(#starShine)"
        opacity="0.95"
      />
      
      {/* Glint on top-left */}
      <ellipse cx="11" cy="9" rx="3.5" ry="1.5" transform="rotate(-30 11 9)" fill="#FFFFFF" opacity="0.5" />
    </svg>
  );
};
