import React from 'react';
import { Gift } from '../types';
import { GiftIllustration } from './GiftIllustration';
import { CoinIcon } from './CoinIcon';

interface GiftCardProps {
  gift: Gift;
  isSelected: boolean;
  isArabic: boolean;
  onSelect: (gift: Gift) => void;
}

export const GiftCard: React.FC<GiftCardProps> = ({ gift, isSelected, isArabic, onSelect }) => {
  const formattedCoins = gift.coins >= 1000000 
    ? `${(gift.coins / 1000000).toLocaleString()}M` 
    : gift.coins >= 1000 
      ? `${(gift.coins / 1000).toLocaleString()}K` 
      : gift.coins.toLocaleString();

  return (
    <button
      onClick={() => onSelect(gift)}
      aria-label={`${isArabic ? gift.nameAr : gift.nameEn} - ${gift.coins.toLocaleString()} coins`}
      className={`group relative flex flex-col items-center justify-between p-2.5 sm:p-3 rounded-2xl transition-all duration-200 select-none text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 ${
        isSelected
          ? 'bg-[#181D2E] border-2 border-[#FE2C55] ring-4 ring-[#FE2C55]/20 shadow-[0_0_20px_rgba(254,44,85,0.4)] scale-[1.02]'
          : 'bg-[#121624]/90 hover:bg-[#181E30] border border-slate-800/90 hover:border-slate-700 hover:scale-[1.01]'
      }`}
    >
      {/* Popular or Legendary Badge */}
      {gift.coins >= 50000000 ? (
        <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
          VIP
        </span>
      ) : null}

      {/* Gift 3D Illustration */}
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center my-1 transition-transform duration-200 group-hover:scale-110">
        <GiftIllustration type={gift.svgType} className="w-full h-full drop-shadow-md" />
      </div>

      {/* Gift Name */}
      <div className="w-full mt-1.5">
        <span className="block text-xs sm:text-[13px] font-medium text-slate-200 truncate group-hover:text-white">
          {isArabic ? gift.nameAr : gift.nameEn}
        </span>
      </div>

      {/* Coin Cost */}
      <div className="flex items-center justify-center gap-1 mt-1 text-slate-300">
        <CoinIcon className="w-3.5 h-3.5" />
        <span className="font-mono text-xs font-semibold tabular-nums text-amber-400">
          {gift.coins.toLocaleString()}
        </span>
      </div>

      {/* Selected Indicator Checkmark */}
      {isSelected && (
        <div className="absolute top-1.5 left-1.5 w-4 h-4 rounded-full bg-[#FE2C55] text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
          ✓
        </div>
      )}
    </button>
  );
};
