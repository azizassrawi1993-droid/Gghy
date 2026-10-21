import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Send, 
  Globe, 
  History, 
  RotateCcw, 
  ShieldAlert, 
  Sparkles, 
  Wifi, 
  Battery, 
  Minus, 
  Plus,
  Gift as GiftBoxIcon,
  UserCheck
} from 'lucide-react';
import { Gift, DemoRecipient, Transaction, CategoryId } from './types';
import { GIFTS_CATALOG, CATEGORIES, INITIAL_DEMO_COINS, DEFAULT_RECIPIENT } from './data/gifts';
import { CoinIcon } from './components/CoinIcon';
import { GiftCard } from './components/GiftCard';
import { GiftIllustration } from './components/GiftIllustration';
import { UserAvatar } from './components/UserAvatar';
import { PromotionalBanner } from './components/PromotionalBanner';
import { GiftAnimationOverlay } from './components/GiftAnimationOverlay';
import { HistoryDrawer } from './components/HistoryDrawer';
import { playCoinSound, playSendSound, playCelebrationFanfare, playErrorSound } from './utils/audio';

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [balance, setBalance] = useState<number>(() => {
    const saved = localStorage.getItem('demo_coins_balance');
    return saved ? Number(saved) : INITIAL_DEMO_COINS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('demo_transactions_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [recipient, setRecipient] = useState<DemoRecipient>(DEFAULT_RECIPIENT);
  const [usernameInput, setUsernameInput] = useState<string>('user123');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [selectedGift, setSelectedGift] = useState<Gift>(GIFTS_CATALOG[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isFollowing, setIsFollowing] = useState<boolean>(true);

  // Modals & Overlays
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [activeAnimation, setActiveAnimation] = useState<{
    gift: Gift;
    quantity: number;
    bonusCoins?: number;
  } | null>(null);
  const [insufficientBalanceToast, setInsufficientBalanceToast] = useState<boolean>(false);
  const [promoToast, setPromoToast] = useState<string | null>(null);

  const isArabic = lang === 'ar';

  // Synchronize HTML attributes for language and RTL
  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', isArabic ? 'rtl' : 'ltr');
  }, [lang, isArabic]);

  // Persist balance in localStorage
  useEffect(() => {
    localStorage.setItem('demo_coins_balance', balance.toString());
  }, [balance]);

  // Persist transactions in localStorage
  useEffect(() => {
    localStorage.setItem('demo_transactions_history', JSON.stringify(transactions));
  }, [transactions]);

  // Handle Search for recipient
  const handleSearchRecipient = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanUsername = usernameInput.trim().replace(/^@/, '');
    if (!cleanUsername) return;

    setRecipient({
      username: cleanUsername,
      displayName: cleanUsername,
      avatarUrl: '',
      isVerified: true,
      statusTextAr: 'جاهز لاستلام الهدايا الآن',
      statusTextEn: 'Ready to receive gifts now',
    });
    playCoinSound();
  };

  // Quick select preset usernames
  const handlePresetSelect = (presetUser: string) => {
    setUsernameInput(presetUser);
    setRecipient({
      username: presetUser,
      displayName: presetUser,
      avatarUrl: '',
      isVerified: true,
      statusTextAr: 'جاهز لاستلام الهدايا الآن',
      statusTextEn: 'Ready to receive gifts now',
    });
    playCoinSound();
  };

  // Handle gift selection
  const handleSelectGift = (gift: Gift) => {
    setSelectedGift(gift);
    playCoinSound();
  };

  // Calculate total cost
  const totalCost = selectedGift ? selectedGift.coins * quantity : 0;
  const hasEnoughBalance = balance >= totalCost;

  // Handle sending gift
  const handleSendGift = () => {
    if (!selectedGift) return;

    if (!hasEnoughBalance) {
      playErrorSound();
      setInsufficientBalanceToast(true);
      setTimeout(() => setInsufficientBalanceToast(false), 3000);
      return;
    }

    // Deduct coins
    const nextBalance = balance - totalCost;
    setBalance(nextBalance);

    // Simulated promotional bonus reward chance (35% probability or on big gifts)
    let bonusCoins: number | undefined;
    if (Math.random() < 0.35 || totalCost >= 1000000) {
      bonusCoins = Math.floor(Math.min(100000, totalCost * 0.15)) + 1000;
      setBalance(prev => prev + (bonusCoins || 0));
    }

    // Create transaction record
    const newTx: Transaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      recipientUsername: recipient.username,
      giftId: selectedGift.id,
      giftNameAr: selectedGift.nameAr,
      giftNameEn: selectedGift.nameEn,
      quantity: quantity,
      costPerItem: selectedGift.coins,
      totalCost: totalCost,
      bonusGift: bonusCoins ? {
        nameAr: 'مكافأة إضافية',
        nameEn: 'Bonus Reward',
        coinsValue: bonusCoins,
      } : undefined
    };

    setTransactions(prev => [newTx, ...prev]);

    // Audio & Visual celebratory effect
    if (selectedGift.coins >= 10000000) {
      playCelebrationFanfare();
    } else {
      playSendSound();
    }

    setActiveAnimation({
      gift: selectedGift,
      quantity,
      bonusCoins
    });
  };

  // Reset balance to initial state
  const handleResetDemo = () => {
    setBalance(INITIAL_DEMO_COINS);
    setTransactions([]);
    localStorage.removeItem('demo_coins_balance');
    localStorage.removeItem('demo_transactions_history');
    playCoinSound();
  };

  // Refill coins
  const handleRefillCoins = () => {
    setBalance(prev => prev + 1000000000);
    playCelebrationFanfare();
  };

  // Filter gifts by category
  const filteredGifts = selectedCategory === 'all'
    ? GIFTS_CATALOG
    : selectedCategory === 'popular'
      ? GIFTS_CATALOG.filter(g => g.isPopular)
      : GIFTS_CATALOG.filter(g => g.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col items-center select-none font-sans antialiased">
      
      {/* Main Container - Mobile First Frame */}
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl min-h-screen bg-[#0B0E17] flex flex-col relative shadow-[0_0_80px_rgba(0,0,0,0.8)] border-x border-slate-900">
        
        {/* Android Status Bar Mockup */}
        <div className="px-5 pt-2.5 pb-1 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span className="font-semibold text-slate-300">18:49</span>
          <div className="flex items-center gap-2.5">
            <Wifi className="w-3.5 h-3.5 text-slate-300" />
            <div className="flex items-center gap-1">
              <span className="text-[10px]">82%</span>
              <Battery className="w-3.5 h-3.5 text-slate-300" />
            </div>
          </div>
        </div>

        {/* Top Header Bar */}
        <header className="px-4 py-3 flex items-center justify-between gap-3 border-b border-slate-800/60 sticky top-0 bg-[#0B0E17]/95 backdrop-blur-md z-30">
          {/* Left: Back / Brand Lockup */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSelectedCategory('all')}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              aria-label="Back"
            >
              {isArabic ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 flex items-center justify-center">
                <GiftIllustration type="tiktok-note" className="w-6 h-6" />
              </div>
              <span className="text-lg font-black tracking-tight text-white flex items-center gap-1">
                <span className="text-[#FE2C55]">Gift</span> Coins
              </span>
            </div>
          </div>

          {/* Right: Coin Balance Pill + Drawer Trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="group flex items-center gap-2 py-1.5 px-3 rounded-full bg-[#161C2C] hover:bg-[#1C2438] border border-amber-500/30 transition-all shadow-[0_0_15px_rgba(255,190,26,0.15)] focus:outline-none"
              title={isArabic ? 'عرض سجل العمليات وإدارة الرصيد' : 'View history and manage balance'}
            >
              <CoinIcon className="w-5 h-5" />
              <div className="text-right">
                <span className="block font-mono font-black text-xs sm:text-sm text-white tabular-nums tracking-tight group-hover:text-amber-300">
                  {balance >= 1000000000 
                    ? `${(balance / 1000000000).toFixed(2)}B` 
                    : balance.toLocaleString()}
                </span>
                <span className="block text-[9px] text-slate-400 font-medium -mt-0.5">
                  {isArabic ? 'عملات' : 'Coins'}
                </span>
              </div>
              {isArabic ? <ChevronLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />}
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(isArabic ? 'en' : 'ar')}
              className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
              title="Toggle Language"
            >
              <Globe className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 pb-36 space-y-4">
          
          {/* Section Title */}
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {isArabic ? 'إرسال هدية' : 'Send a Gift'}
            </h1>
          </div>

          {/* Recipient Search Form */}
          <form onSubmit={handleSearchRecipient} className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 ${isArabic ? 'right-3.5' : 'left-3.5'}`} />
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder={isArabic ? 'أدخل اسم المستخدم' : 'Enter username'}
                className={`w-full py-2.5 bg-[#121624] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FE2C55] transition-colors ${
                  isArabic ? 'pr-10 pl-3' : 'pl-10 pr-3'
                }`}
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#FE2C55] hover:bg-[#E0264B] active:scale-95 text-white font-bold text-sm shadow-md transition-all whitespace-nowrap"
            >
              {isArabic ? 'بحث' : 'Search'}
            </button>
          </form>

          {/* Quick Preset Usernames */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 text-xs no-scrollbar">
            <span className="text-slate-500 text-[11px] whitespace-nowrap">
              {isArabic ? 'اقتراحات:' : 'Suggestions:'}
            </span>
            {['user123', 'streamer_pro', 'gamers_live', 'aziz_live'].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors whitespace-nowrap ${
                  recipient.username === preset
                    ? 'bg-[#FE2C55]/20 border-[#FE2C55]/60 text-pink-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                @{preset}
              </button>
            ))}
          </div>

          {/* Selected Recipient Profile Card */}
          <div className="p-3.5 rounded-2xl bg-[#121624] border border-slate-800/80 flex items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <UserAvatar username={recipient.username} size={44} />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-white">
                    @{recipient.username}
                  </span>
                  {recipient.isVerified && (
                    <span className="w-4 h-4 rounded-full bg-[#00F2FE] text-black flex items-center justify-center text-[10px] font-black" title="Verified Account">
                      ✓
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {isArabic ? recipient.statusTextAr : recipient.statusTextEn}
                </p>
              </div>
            </div>

            {/* Follow / Following Toggle Button */}
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isFollowing 
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' 
                  : 'bg-[#FE2C55] text-white hover:bg-[#E0264B]'
              }`}
            >
              {isFollowing ? (
                <>
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{isArabic ? 'مُتابَع' : 'Following'}</span>
                </>
              ) : (
                <span>{isArabic ? '+ متابعة' : '+ Follow'}</span>
              )}
            </button>
          </div>

          {/* Promotional Banner */}
          <PromotionalBanner 
            isArabic={isArabic} 
            onBannerClick={() => {
              setPromoToast(
                isArabic 
                  ? '👑 كل هدية ترسلها تمنحك فرصة ربح مكافأة عملات مضاعفة فورية!' 
                  : '👑 Every gift you send gives you a chance to win bonus coins!'
              );
              setTimeout(() => setPromoToast(null), 4000);
            }} 
          />

          {/* Promo Info Toast if clicked */}
          {promoToast && (
            <div className="p-3 rounded-xl bg-purple-950/80 border border-purple-500/50 text-purple-200 text-xs text-center animate-in fade-in">
              {promoToast}
            </div>
          )}

          {/* Category Tabs (Horizontal Scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar border-b border-slate-800/80 text-xs font-semibold">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    playCoinSound();
                  }}
                  className={`pb-1.5 px-2 relative whitespace-nowrap transition-colors ${
                    isActive ? 'text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{isArabic ? cat.nameAr : cat.nameEn}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FE2C55] rounded-full shadow-[0_0_8px_#FE2C55]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Virtual Gift Catalog Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {filteredGifts.map((gift) => (
              <GiftCard
                key={gift.id}
                gift={gift}
                isSelected={selectedGift?.id === gift.id}
                isArabic={isArabic}
                onSelect={handleSelectGift}
              />
            ))}
          </div>

        </div>

        {/* Insufficient Balance Notification Banner */}
        {insufficientBalanceToast && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 max-w-sm w-[90%] p-3.5 rounded-2xl bg-rose-950/95 border border-rose-500/80 text-rose-200 text-xs shadow-2xl flex items-center justify-between gap-3 animate-bounce">
            <div>
              <span className="font-bold block text-white">
                {isArabic ? 'رصيد العملات غير كافٍ!' : 'Insufficient coins balance!'}
              </span>
              <span>
                {isArabic ? 'اضغط لإعادة تعبئة الرصيد مجاناً' : 'Tap to refill your balance'}
              </span>
            </div>
            <button
              onClick={() => {
                handleRefillCoins();
                setInsufficientBalanceToast(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-500 text-white font-bold text-xs whitespace-nowrap hover:bg-rose-600"
            >
              {isArabic ? 'شحن الآن' : 'Refill'}
            </button>
          </div>
        )}

        {/* Bottom Sticky Action Bar (Exact Layout from reference) */}
        <footer className="sticky bottom-0 z-30 bg-[#0B0E17]/98 backdrop-blur-lg border-t border-slate-800/80 px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.7)]">
          <div className="flex items-center justify-between gap-3">
            
            {/* Left: Selected Gift & Quantity Stepper */}
            <div className="flex items-center gap-2 min-w-0">
              {selectedGift ? (
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 p-1 flex items-center justify-center shrink-0">
                    <GiftIllustration type={selectedGift.svgType} className="w-8 h-8" />
                  </div>
                  <div className="hidden xs:block">
                    <span className="block text-xs font-bold text-white truncate max-w-[100px]">
                      {isArabic ? selectedGift.nameAr : selectedGift.nameEn}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {selectedGift.coins.toLocaleString()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <GiftBoxIcon className="w-5 h-5 text-pink-500" />
                  <span>{isArabic ? 'اختر هدية لإرسالها' : 'Select a gift'}</span>
                </div>
              )}

              {/* Quantity selector buttons */}
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setQuantity(prev => Math.max(1, prev - 1));
                    playCoinSound();
                  }}
                  className="p-1 text-slate-400 hover:text-white"
                  title="Decrease"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-2 font-mono font-bold text-white tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setQuantity(prev => Math.min(999, prev + 1));
                    playCoinSound();
                  }}
                  className="p-1 text-slate-400 hover:text-white"
                  title="Increase"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              {/* Quick Multiplier presets */}
              <div className="hidden sm:flex items-center gap-1 text-[10px]">
                {[1, 5, 10, 99].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      setQuantity(num);
                      playCoinSound();
                    }}
                    className={`px-1.5 py-0.5 rounded font-mono font-bold ${
                      quantity === num ? 'bg-[#FE2C55] text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {num}x
                  </button>
                ))}
              </div>
            </div>

            {/* Center: Cost display */}
            <div className="text-right shrink-0">
              <span className="text-[10px] text-slate-400 block -mb-0.5">
                {isArabic ? 'التكلفة:' : 'Cost:'}
              </span>
              <div className="flex items-center gap-1">
                <CoinIcon className="w-4 h-4" />
                <span className="font-mono font-black text-sm text-amber-400 tabular-nums">
                  {totalCost.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Right: Send Gift Action Button */}
            <button
              onClick={handleSendGift}
              disabled={!selectedGift}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 sm:px-6 rounded-2xl font-bold text-xs sm:text-sm text-white shadow-lg transition-all active:scale-95 shrink-0 ${
                hasEnoughBalance
                  ? 'bg-gradient-to-r from-[#FE2C55] to-[#FF0050] hover:opacity-95 shadow-[0_4px_18px_rgba(254,44,85,0.4)]'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Send className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
              <span>{isArabic ? 'إرسال هدية' : 'Send Gift'}</span>
            </button>

          </div>
        </footer>

      </div>

      {/* Floating Demo Reset & History Shortcuts (For Easy Sandbox Testing) */}
      <div className="fixed bottom-4 right-4 z-40 hidden md:flex flex-col gap-2">
        <button
          onClick={() => setIsHistoryOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#161D30] border border-slate-700/80 text-slate-200 text-xs font-semibold hover:bg-[#1E2742] transition-colors shadow-lg"
        >
          <History className="w-4 h-4 text-pink-400" />
          <span>{isArabic ? 'سجل العمليات' : 'History'} ({transactions.length})</span>
        </button>

        <button
          onClick={handleResetDemo}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold transition-colors shadow-lg"
          title="Restore initial 9,876,543,210 coins and clear history"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{isArabic ? 'إعادة ضبط الرصيد' : 'Reset Coins'}</span>
        </button>
      </div>

      {/* Full Screen Gift Animation Overlay */}
      {activeAnimation && (
        <GiftAnimationOverlay
          gift={activeAnimation.gift}
          quantity={activeAnimation.quantity}
          recipient={recipient}
          isArabic={isArabic}
          bonusCoins={activeAnimation.bonusCoins}
          onClose={() => setActiveAnimation(null)}
        />
      )}

      {/* Demo History & Coins Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        transactions={transactions}
        onClearHistory={() => {
          setTransactions([]);
          localStorage.removeItem('demo_transactions_history');
        }}
        onResetBalance={handleResetDemo}
        onRefillCoins={handleRefillCoins}
        isArabic={isArabic}
        currentBalance={balance}
      />

    </div>
  );
}
