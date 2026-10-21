import React from 'react';
import { Transaction } from '../types';
import { CoinIcon } from './CoinIcon';
import { Trash2, RotateCcw, X, PlusCircle } from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
  onClearHistory: () => void;
  onResetBalance: () => void;
  onRefillCoins: () => void;
  isArabic: boolean;
  currentBalance: number;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  transactions,
  onClearHistory,
  onResetBalance,
  onRefillCoins,
  isArabic,
  currentBalance,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-[#111625] border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white">
              {isArabic ? 'سجل العمليات' : 'Transaction History'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {isArabic ? 'سجل تفصيلي لجميع الهدايا المرسلة' : 'Detailed records of all sent gifts'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Balance Status summary */}
        <div className="my-4 p-3.5 rounded-2xl bg-[#161D30] border border-slate-800 flex items-center justify-between gap-3">
          <div>
            <span className="block text-[11px] text-slate-400">
              {isArabic ? 'الرصيد الحالي' : 'Current Balance'}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <CoinIcon className="w-4 h-4" />
              <span className="font-mono font-bold text-amber-400 text-base tabular-nums">
                {currentBalance.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRefillCoins}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 border border-emerald-500/30 text-xs font-semibold transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{isArabic ? '+ شحن رصيد' : '+ Refill'}</span>
            </button>
            <button
              onClick={onResetBalance}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              title={isArabic ? 'إعادة ضبط الرصيد' : 'Reset balance'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isArabic ? 'إعادة ضبط' : 'Reset'}</span>
            </button>
          </div>
        </div>

        {/* Transaction List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 py-1">
          {transactions.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <p className="text-sm">
                {isArabic ? 'لا توجد هدايا مرسلة حتى الآن.' : 'No gifts sent yet.'}
              </p>
              <p className="text-xs text-slate-600 mt-1">
                {isArabic ? 'اختر هدية واضغط "إرسال هدية" للبدء.' : 'Select a gift and press "Send Gift" to begin.'}
              </p>
            </div>
          ) : (
            transactions.map((tx) => (
              <div 
                key={tx.id}
                className="p-3 rounded-xl bg-[#141A2B] border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-1.5 font-medium text-slate-200">
                    <span>{isArabic ? tx.giftNameAr : tx.giftNameEn}</span>
                    <span className="text-pink-400 font-bold">x{tx.quantity}</span>
                    <span className="text-slate-500">→</span>
                    <span className="text-cyan-400">@{tx.recipientUsername}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 font-mono">
                    {new Date(tx.timestamp).toLocaleTimeString(isArabic ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    {' · '}
                    {new Date(tx.timestamp).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-right">
                  <CoinIcon className="w-3.5 h-3.5" />
                  <span className="font-mono font-bold text-amber-400 tabular-nums">
                    -{tx.totalCost.toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer controls */}
        {transactions.length > 0 && (
          <div className="pt-4 mt-2 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              onClick={onClearHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 text-xs font-semibold transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isArabic ? 'مسح السجل' : 'Clear History'}</span>
            </button>
            <span className="text-[11px] text-slate-500">
              {transactions.length} {isArabic ? 'عملية مسجلة' : 'transactions recorded'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
