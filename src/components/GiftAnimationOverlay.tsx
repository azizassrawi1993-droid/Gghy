import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Gift, DemoRecipient } from '../types';
import { GiftIllustration } from './GiftIllustration';
import { CoinIcon } from './CoinIcon';
import { UserAvatar } from './UserAvatar';

interface GiftAnimationOverlayProps {
  gift: Gift;
  quantity: number;
  recipient: DemoRecipient;
  isArabic: boolean;
  bonusCoins?: number;
  onClose: () => void;
}

export const GiftAnimationOverlay: React.FC<GiftAnimationOverlayProps> = ({
  gift,
  quantity,
  recipient,
  isArabic,
  bonusCoins,
  onClose,
}) => {
  useEffect(() => {
    // Trigger celebratory confetti burst
    const end = Date.now() + 1500;
    const colors = ['#FE2C55', '#25F4EE', '#FFD700', '#FF007A', '#FFFFFF'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Auto dismiss after 3 seconds or user can tap anytime
    const timer = setTimeout(() => {
      onClose();
    }, 3200);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative max-w-sm w-full bg-[#121624] border border-[#FE2C55]/50 rounded-3xl p-6 sm:p-8 text-center shadow-[0_0_50px_rgba(254,44,85,0.4)] overflow-hidden"
      >
        {/* Ambient Glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#FE2C55]/30 rounded-full blur-3xl pointer-events-none" />
        
        {/* Flying Gift Core with Pulsing Halo */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-[#FE2C55]/40 to-[#00F2FE]/40 blur-xl animate-pulse" />
          
          <div className="relative w-28 h-28 transform animate-bounce">
            <GiftIllustration type={gift.svgType} className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]" />
          </div>

          {/* Quantity Badge */}
          {quantity > 1 && (
            <div className="absolute bottom-0 right-8 px-2.5 py-1 rounded-full bg-[#FE2C55] text-white font-black text-sm shadow-lg border-2 border-white animate-pulse">
              x{quantity}
            </div>
          )}
        </div>

        {/* Celebration Title */}
        <h3 className="text-xl sm:text-2xl font-black text-white mb-1 tracking-tight">
          {isArabic ? `تم إرسال ${gift.nameAr}!` : `${gift.nameEn} Sent!`}
        </h3>

        {/* Recipient preview */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 my-2">
          <UserAvatar username={recipient.username} size={22} />
          <span>{isArabic ? 'إلى:' : 'To:'}</span>
          <span className="font-semibold text-white">@{recipient.username}</span>
        </div>

        {/* Total Cost deducted */}
        <div className="flex items-center justify-center gap-1.5 text-sm text-slate-300 mt-2">
          <span>{isArabic ? 'القيمة المخصومة:' : 'Coins deducted:'}</span>
          <CoinIcon className="w-4 h-4" />
          <span className="font-mono font-bold text-amber-400 tabular-nums">
            -{(gift.coins * quantity).toLocaleString()}
          </span>
        </div>

        {/* Bonus Reward Notification if promo applied */}
        {bonusCoins && bonusCoins > 0 ? (
          <div className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 border border-amber-400/40 text-amber-200 text-xs text-center animate-pulse">
            <span className="font-bold block text-amber-300 mb-0.5">
              🎉 {isArabic ? 'مكافأة إضافية خاصة!' : 'Special Bonus Reward!'}
            </span>
            <span>
              {isArabic 
                ? `حصلت على +${bonusCoins.toLocaleString()} عملة إضافية!` 
                : `You received +${bonusCoins.toLocaleString()} bonus coins!`}
            </span>
          </div>
        ) : null}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FE2C55] to-[#FF0050] hover:opacity-95 text-white font-bold text-sm shadow-md transition-all active:scale-98"
        >
          {isArabic ? 'متابعة' : 'Continue'}
        </button>

      </div>
    </div>
  );
};
