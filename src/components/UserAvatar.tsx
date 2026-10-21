import React from 'react';

interface UserAvatarProps {
  username: string;
  size?: number;
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ username, size = 48, className = '' }) => {
  // Deterministic seed based on username string
  const cleanName = username.replace('@', '') || 'demo';
  const charCodeSum = cleanName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const gradients = [
    { from: '#FE2C55', to: '#7C4DFF' },
    { from: '#FF007A', to: '#00F2FE' },
    { from: '#F59E0B', to: '#EF4444' },
    { from: '#10B981', to: '#3B82F6' },
    { from: '#8B5CF6', to: '#EC4899' },
    { from: '#06B6D4', to: '#3B82F6' },
  ];

  const selectedGrad = gradients[charCodeSum % gradients.length];
  const initial = cleanName.slice(0, 2).toUpperCase();

  return (
    <div 
      className={`relative rounded-full flex items-center justify-center shrink-0 shadow-md ring-2 ring-white/10 select-none overflow-hidden ${className}`}
      style={{ 
        width: size, 
        height: size,
        background: `linear-gradient(135deg, ${selectedGrad.from}, ${selectedGrad.to})`
      }}
    >
      {/* Subtle interior pattern / sunset silhouette */}
      <svg 
        viewBox="0 0 100 100" 
        className="absolute inset-0 w-full h-full opacity-40 mix-blend-overlay pointer-events-none"
      >
        <circle cx="50" cy="50" r="45" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="6 4" />
        <path d="M0 70 Q 25 55, 50 70 T 100 70 L 100 100 L 0 100 Z" fill="#000" opacity="0.3" />
      </svg>

      <span 
        className="font-bold text-white tracking-wider relative z-10 font-sans"
        style={{ fontSize: Math.max(12, Math.floor(size * 0.38)) }}
      >
        {initial}
      </span>
    </div>
  );
};
