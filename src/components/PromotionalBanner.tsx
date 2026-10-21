import React from 'react';
import { CoinIcon } from './CoinIcon';

interface PromotionalBannerProps {
  isArabic: boolean;
  onBannerClick?: () => void;
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ isArabic, onBannerClick }) => {
  return (
    <div 
      onClick={onBannerClick}
      className="relative w-full rounded-2xl overflow-hidden cursor-pointer group select-none transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] border border-fuchsia-500/30 shadow-[0_4px_25px_rgba(254,44,85,0.2)]"
      style={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
      }}
    >
      {/* Background Starfield and Nebula */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#ec4899_0%,transparent_60%)] opacity-30 mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#00f2fe_0%,transparent_50%)] opacity-20 pointer-events-none" />
      
      {/* Subtle animated stardust */}
      <div className="absolute top-2 left-6 w-1 h-1 bg-white rounded-full animate-ping opacity-75" />
      <div className="absolute bottom-3 right-8 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse opacity-80" />
      <div className="absolute top-4 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-pulse" />

      <div className="relative px-4 py-3.5 sm:px-6 sm:py-4 flex items-center justify-between gap-3">
        {/* Left Gift Box Graphic */}
        <div className="relative shrink-0 flex items-center">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14">
            {/* 3D Gift Box SVG */}
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_4px_12px_rgba(254,44,85,0.5)]">
              {/* Box body */}
              <rect x="15" y="28" width="50" height="42" rx="4" fill="url(#giftGrad1)" />
              {/* Lid */}
              <rect x="10" y="20" width="60" height="12" rx="3" fill="#FF2E63" />
              {/* Ribbons */}
              <rect x="36" y="20" width="8" height="50" fill="#FFD700" />
              <rect x="10" y="24" width="60" height="4" fill="#FFEAA7" opacity="0.6" />
              {/* Bow loops */}
              <ellipse cx="32" cy="16" rx="8" ry="5" transform="rotate(-30 32 16)" fill="#FFD700" />
              <ellipse cx="48" cy="16" rx="8" ry="5" transform="rotate(30 48 16)" fill="#FFD700" />
              <circle cx="40" cy="18" r="4" fill="#FFA000" />
              <defs>
                <linearGradient id="giftGrad1" x1="15" y1="28" x2="65" y2="70">
                  <stop offset="0%" stopColor="#4A00E0" />
                  <stop offset="100%" stopColor="#8E2DE2" />
                </linearGradient>
              </defs>
            </svg>
            {/* Spilling Coin */}
            <div className="absolute -bottom-1 -left-1">
              <CoinIcon className="w-5 h-5 drop-shadow-[0_2px_6px_rgba(255,200,0,0.8)]" />
            </div>
          </div>
        </div>

        {/* Center Text Message */}
        <div className="flex-1 text-center px-1">
          <h2 className="text-sm sm:text-base md:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-pink-200 tracking-tight leading-snug drop-shadow-sm">
            {isArabic 
              ? 'إرسل هدية وكل هدية ترسلها تجيك هدية أحسن منها! 👑' 
              : 'Send a gift & unlock special bonus rewards! 👑'}
          </h2>
          <p className="text-[10px] sm:text-xs text-pink-200/80 mt-0.5 font-medium">
            {isArabic 
              ? 'هدايا مميزة ومكافآت مضاعفة فورية عند كل إرسال' 
              : 'Instant bonus coins and special surprise rewards with every gift'}
          </p>
        </div>

        {/* Right Gift Graphic with TikTok logo accent */}
        <div className="relative shrink-0 hidden xs:flex items-center">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,242,254,0.4)]">
              {/* Box body */}
              <rect x="15" y="28" width="50" height="42" rx="4" fill="url(#giftGrad2)" />
              {/* Lid */}
              <rect x="10" y="20" width="60" height="12" rx="3" fill="#00D2D3" />
              {/* Ribbons */}
              <rect x="36" y="20" width="8" height="50" fill="#FF7675" />
              {/* Bow loops */}
              <ellipse cx="32" cy="16" rx="8" ry="5" transform="rotate(-30 32 16)" fill="#FF7675" />
              <ellipse cx="48" cy="16" rx="8" ry="5" transform="rotate(30 48 16)" fill="#FF7675" />
              <circle cx="40" cy="18" r="4" fill="#D63031" />
              <defs>
                <linearGradient id="giftGrad2" x1="15" y1="28" x2="65" y2="70">
                  <stop offset="0%" stopColor="#2575FC" />
                  <stop offset="100%" stopColor="#6A11CB" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute -bottom-1 -right-1">
              <CoinIcon className="w-5 h-5 drop-shadow-[0_2px_6px_rgba(255,200,0,0.8)]" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
