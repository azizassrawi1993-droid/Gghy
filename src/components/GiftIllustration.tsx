import React from 'react';
import { Gift } from '../types';

interface GiftIllustrationProps {
  type: Gift['svgType'];
  className?: string;
  size?: number;
}

export const GiftIllustration: React.FC<GiftIllustrationProps> = ({ type, className = 'w-16 h-16', size }) => {
  const style = size ? { width: size, height: size } : undefined;

  switch (type) {
    case 'rose':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
          <defs>
            <radialGradient id="roseRed" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FF4B72" />
              <stop offset="50%" stopColor="#E60039" />
              <stop offset="100%" stopColor="#8A001E" />
            </radialGradient>
            <linearGradient id="roseStem" x1="50" y1="60" x2="50" y2="95">
              <stop offset="0%" stopColor="#38A169" />
              <stop offset="100%" stopColor="#1C4522" />
            </linearGradient>
            <filter id="petalGlow">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#FF0044" floodOpacity="0.4" />
            </filter>
          </defs>
          {/* Stem & Leaves */}
          <path d="M50 55 C49 70 52 82 50 95" stroke="url(#roseStem)" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M50 72 C35 68 25 76 22 84 C34 85 46 78 50 72 Z" fill="#2E7D32" />
          <path d="M50 66 C65 62 75 70 78 78 C66 79 54 72 50 66 Z" fill="#388E3C" />
          {/* Outer Petals */}
          <ellipse cx="50" cy="45" rx="36" ry="30" fill="url(#roseRed)" filter="url(#petalGlow)" />
          {/* Layered Petals */}
          <path d="M22 42 C20 28 35 18 50 18 C65 18 80 28 78 42 C72 54 62 58 50 58 C38 58 28 54 22 42 Z" fill="#C4002F" />
          <path d="M28 36 C34 22 45 20 50 20 C55 20 66 22 72 36 C68 46 58 50 50 50 C42 50 32 46 28 36 Z" fill="#E60039" />
          <path d="M35 32 C38 24 45 22 50 22 C55 22 62 24 65 32 C62 38 56 42 50 42 C44 42 38 38 35 32 Z" fill="#FF2E5B" />
          {/* Rose Bud Core */}
          <circle cx="50" cy="30" r="8" fill="#FF6B8B" />
          <path d="M46 27 C49 24 53 24 55 28 C53 31 47 31 46 27 Z" fill="#FFF0F5" opacity="0.8" />
        </svg>
      );

    case 'finger-heart':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
          <defs>
            <linearGradient id="handSkin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFD1A4" />
              <stop offset="60%" stopColor="#FFAA70" />
              <stop offset="100%" stopColor="#D97736" />
            </linearGradient>
            <radialGradient id="miniHeart" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FF85A2" />
              <stop offset="60%" stopColor="#FF1E56" />
              <stop offset="100%" stopColor="#B3002D" />
            </radialGradient>
          </defs>
          {/* Floating Neon Heart */}
          <g transform="translate(0, -6)">
            <path d="M50 22 C46 16 38 16 34 21 C29 27 33 35 50 46 C67 35 71 27 66 21 C62 16 54 16 50 22 Z" fill="url(#miniHeart)" filter="drop-shadow(0 2px 6px #FF1E56)" />
            <circle cx="43" cy="22" r="2.5" fill="#FFFFFF" opacity="0.7" />
          </g>
          {/* Crossed Fingers */}
          {/* Thumb */}
          <path d="M38 52 C35 44 44 38 48 44 L56 56 C58 60 55 68 47 66 Z" fill="url(#handSkin)" />
          {/* Index Finger */}
          <path d="M52 40 C56 35 63 38 61 46 L53 62 C50 67 43 65 44 58 Z" fill="#FFA56E" />
          {/* Palm Base & Folded fingers */}
          <path d="M30 64 C28 58 35 54 42 56 L64 58 C72 60 74 72 70 82 C66 90 40 92 34 84 Z" fill="url(#handSkin)" />
          {/* Folded knuckles */}
          <rect x="52" y="65" width="16" height="8" rx="4" fill="#E68547" />
          <rect x="48" y="74" width="18" height="8" rx="4" fill="#D97736" />
        </svg>
      );

    case 'heart':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
          <defs>
            <radialGradient id="vibrantHeart" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFAEC2" />
              <stop offset="25%" stopColor="#FF3366" />
              <stop offset="70%" stopColor="#D90043" />
              <stop offset="100%" stopColor="#800024" />
            </radialGradient>
            <filter id="heartShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#FF0055" floodOpacity="0.5" />
            </filter>
          </defs>
          <path 
            d="M50 25 C42 12 24 12 16 23 C6 37 13 54 50 82 C87 54 94 37 84 23 C76 12 58 12 50 25 Z" 
            fill="url(#vibrantHeart)" 
            filter="url(#heartShadow)" 
          />
          {/* Glossy 3D Highlight */}
          <ellipse cx="32" cy="28" rx="9" ry="5" transform="rotate(-35 32 28)" fill="#FFFFFF" opacity="0.65" />
          <circle cx="24" cy="36" r="2.5" fill="#FFFFFF" opacity="0.5" />
        </svg>
      );

    case 'tiktok-note':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
          <defs>
            <filter id="neonAberration">
              <feDropShadow dx="-3" dy="0" stdDeviation="2" floodColor="#00F2FE" floodOpacity="0.9" />
              <feDropShadow dx="3" dy="0" stdDeviation="2" floodColor="#FE2C55" floodOpacity="0.9" />
            </filter>
          </defs>
          {/* Cyan layer offset */}
          <path 
            d="M58 22 C64 29 72 32 79 33 V44 C72 44 65 41 58 37 V63 C58 74 49 82 38 82 C27 82 18 73 18 62 C18 51 27 42 38 42 C41 42 44 43 47 44 V22 H58 Z" 
            fill="#00F2FE" 
            opacity="0.85"
            transform="translate(-2, 0)"
          />
          {/* Red/Magenta layer offset */}
          <path 
            d="M58 22 C64 29 72 32 79 33 V44 C72 44 65 41 58 37 V63 C58 74 49 82 38 82 C27 82 18 73 18 62 C18 51 27 42 38 42 C41 42 44 43 47 44 V22 H58 Z" 
            fill="#FE2C55" 
            opacity="0.85"
            transform="translate(2, 0)"
          />
          {/* Main White note on top */}
          <path 
            d="M58 22 C64 29 72 32 79 33 V44 C72 44 65 41 58 37 V63 C58 74 49 82 38 82 C27 82 18 73 18 62 C18 51 27 42 38 42 C41 42 44 43 47 44 V22 H58 Z" 
            fill="#FFFFFF" 
          />
        </svg>
      );

    case 'panda':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
          <defs>
            <radialGradient id="pandaHead" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="85%" stopColor="#E6EAF0" />
              <stop offset="100%" stopColor="#C8D0DC" />
            </radialGradient>
          </defs>
          {/* Ears */}
          <circle cx="26" cy="28" r="14" fill="#1A1E29" />
          <circle cx="26" cy="28" r="7" fill="#3B4252" />
          <circle cx="74" cy="28" r="14" fill="#1A1E29" />
          <circle cx="74" cy="28" r="7" fill="#3B4252" />
          {/* Head */}
          <ellipse cx="50" cy="50" rx="35" ry="30" fill="url(#pandaHead)" />
          {/* Eye Patches */}
          <ellipse cx="36" cy="48" rx="10" ry="13" transform="rotate(-15 36 48)" fill="#1A1E29" />
          <ellipse cx="64" cy="48" rx="10" ry="13" transform="rotate(15 64 48)" fill="#1A1E29" />
          {/* Pupils with glint */}
          <circle cx="37" cy="47" r="4.5" fill="#FFFFFF" />
          <circle cx="38" cy="46" r="2.5" fill="#1A1E29" />
          <circle cx="63" cy="47" r="4.5" fill="#FFFFFF" />
          <circle cx="62" cy="46" r="2.5" fill="#1A1E29" />
          {/* Cute pink cheeks */}
          <ellipse cx="28" cy="58" rx="6" ry="3.5" fill="#FF8BA7" opacity="0.5" />
          <ellipse cx="72" cy="58" rx="6" ry="3.5" fill="#FF8BA7" opacity="0.5" />
          {/* Nose & Mouth */}
          <ellipse cx="50" cy="58" rx="4" ry="2.5" fill="#1A1E29" />
          <path d="M46 62 C48 64 52 64 54 62" stroke="#1A1E29" strokeWidth="2" strokeLinecap="round" />
          {/* Little red heart held */}
          <path d="M50 72 C46 68 40 68 37 72 C33 77 38 84 50 91 C62 84 67 77 63 72 C60 68 54 68 50 72 Z" fill="#FF1E56" filter="drop-shadow(0 2px 4px #FF1E56)" />
          {/* Little paws holding heart */}
          <circle cx="35" cy="76" r="6" fill="#1A1E29" />
          <circle cx="65" cy="76" r="6" fill="#1A1E29" />
        </svg>
      );

    case 'ice-cream':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
          <defs>
            <linearGradient id="waffleCone" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F6C47A" />
              <stop offset="50%" stopColor="#DF9B40" />
              <stop offset="100%" stopColor="#B26C1F" />
            </linearGradient>
            <radialGradient id="iceCreamSwirl" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFF0F5" />
              <stop offset="35%" stopColor="#FF85A2" />
              <stop offset="85%" stopColor="#FF2E63" />
              <stop offset="100%" stopColor="#C70039" />
            </radialGradient>
          </defs>
          {/* Waffle Cone */}
          <polygon points="32,56 68,56 50,96" fill="url(#waffleCone)" />
          {/* Waffle Grid lines */}
          <line x1="38" y1="58" x2="56" y2="92" stroke="#8E4E10" strokeWidth="1.5" opacity="0.6" />
          <line x1="48" y1="58" x2="62" y2="78" stroke="#8E4E10" strokeWidth="1.5" opacity="0.6" />
          <line x1="62" y1="58" x2="44" y2="92" stroke="#8E4E10" strokeWidth="1.5" opacity="0.6" />
          <line x1="52" y1="58" x2="38" y2="78" stroke="#8E4E10" strokeWidth="1.5" opacity="0.6" />
          {/* Swirl Layers */}
          <ellipse cx="50" cy="54" rx="22" ry="10" fill="url(#iceCreamSwirl)" />
          <ellipse cx="50" cy="42" rx="18" ry="9" fill="url(#iceCreamSwirl)" />
          <ellipse cx="50" cy="30" rx="14" ry="8" fill="url(#iceCreamSwirl)" />
          {/* Tip with cherry or swirl */}
          <path d="M50 14 C46 18 44 26 50 26 C56 26 54 18 50 14 Z" fill="#FF1744" />
          <circle cx="50" cy="12" r="4" fill="#D50000" />
          {/* Sprinkles */}
          <rect x="42" y="38" width="5" height="2" rx="1" fill="#FFEA00" transform="rotate(20 42 38)" />
          <rect x="54" y="44" width="5" height="2" rx="1" fill="#00E5FF" transform="rotate(-30 54 44)" />
          <rect x="46" y="50" width="5" height="2" rx="1" fill="#FFFFFF" transform="rotate(10 46 50)" />
        </svg>
      );

    case 'diamond':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
          <defs>
            <linearGradient id="diaTop" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#80E5FF" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#00A2FF" />
            </linearGradient>
            <linearGradient id="diaFacet1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#29B6F6" />
              <stop offset="100%" stopColor="#0277BD" />
            </linearGradient>
            <linearGradient id="diaFacet2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4FC3F7" />
              <stop offset="100%" stopColor="#01579B" />
            </linearGradient>
          </defs>
          {/* Diamond Crown (Top) */}
          <polygon points="26,36 38,20 62,20 74,36" fill="url(#diaTop)" />
          <polygon points="38,20 50,36 26,36" fill="#B3E5FC" />
          <polygon points="38,20 62,20 50,36" fill="#E1F5FE" />
          <polygon points="62,20 74,36 50,36" fill="#81D4FA" />
          {/* Pavilion (Bottom point) */}
          <polygon points="26,36 50,36 50,84" fill="url(#diaFacet1)" />
          <polygon points="50,36 74,36 50,84" fill="url(#diaFacet2)" />
          <polygon points="38,36 50,36 50,84" fill="#0288D1" />
          <polygon points="50,36 62,36 50,84" fill="#03A9F4" />
          {/* Gleams / Star Glints */}
          <circle cx="34" cy="24" r="3" fill="#FFFFFF" />
          <path d="M72 32 L75 35 L72 38 L69 35 Z" fill="#FFFFFF" />
          <path d="M50 82 L52 85 L50 88 L48 85 Z" fill="#FFFFFF" />
        </svg>
      );

    case 'crown':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
          <defs>
            <linearGradient id="crownGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF275" />
              <stop offset="45%" stopColor="#FFB300" />
              <stop offset="85%" stopColor="#FF8F00" />
              <stop offset="100%" stopColor="#C46200" />
            </linearGradient>
            <filter id="crownGlow">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#FFB300" floodOpacity="0.6" />
            </filter>
          </defs>
          {/* Crown Base */}
          <path 
            d="M18 68 C18 64 82 64 82 68 L80 76 C80 80 20 80 20 76 Z" 
            fill="url(#crownGold)" 
          />
          {/* Crown Spikes */}
          <path 
            d="M18 68 L14 36 L34 50 L50 22 L66 50 L86 36 L82 68 Z" 
            fill="url(#crownGold)" 
            filter="url(#crownGlow)" 
          />
          {/* Jewels on Tips */}
          <circle cx="14" cy="36" r="5" fill="#E91E63" />
          <circle cx="50" cy="22" r="6" fill="#00E5FF" />
          <circle cx="86" cy="36" r="5" fill="#E91E63" />
          <circle cx="34" cy="50" r="3.5" fill="#76FF03" />
          <circle cx="66" cy="50" r="3.5" fill="#76FF03" />
          {/* Band Rubies & Diamonds */}
          <rect x="28" y="70" width="6" height="6" rx="1" fill="#D50000" />
          <circle cx="50" cy="73" r="3.5" fill="#00E5FF" />
          <rect x="66" y="70" width="6" height="6" rx="1" fill="#D50000" />
        </svg>
      );

    case 'rocket':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
          <defs>
            <linearGradient id="rocketBody" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#ECEFF1" />
              <stop offset="100%" stopColor="#B0BEC5" />
            </linearGradient>
            <linearGradient id="fireFlame" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFEE55" />
              <stop offset="50%" stopColor="#FF5722" />
              <stop offset="100%" stopColor="#D50000" />
            </linearGradient>
          </defs>
          <g transform="rotate(-30 50 50)">
            {/* Flames */}
            <path d="M42 75 C42 92 50 98 50 98 C50 98 58 92 58 75 Z" fill="url(#fireFlame)" filter="drop-shadow(0 0 8px #FF9100)" />
            <path d="M45 75 C45 86 50 90 50 90 C50 90 55 86 55 75 Z" fill="#FFF7A1" />
            {/* Fins */}
            <path d="M34 60 L24 76 L40 70 Z" fill="#D50000" />
            <path d="M66 60 L76 76 L60 70 Z" fill="#D50000" />
            {/* Rocket Hull */}
            <path d="M50 14 C40 28 36 50 36 72 L64 72 C64 50 60 28 50 14 Z" fill="url(#rocketBody)" />
            {/* Nose Cone */}
            <path d="M50 14 C45 22 41 30 40 34 L60 34 C59 30 55 22 50 14 Z" fill="#D50000" />
            {/* Porthole */}
            <circle cx="50" cy="46" r="9" fill="#0288D1" stroke="#ECEFF1" strokeWidth="2.5" />
            <circle cx="50" cy="46" r="6" fill="#4FC3F7" />
            <ellipse cx="48" cy="44" rx="2" ry="1" fill="#FFFFFF" />
          </g>
        </svg>
      );

    case 'sports-car':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
          <defs>
            <linearGradient id="carRed" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF3366" />
              <stop offset="45%" stopColor="#D50000" />
              <stop offset="100%" stopColor="#800000" />
            </linearGradient>
            <linearGradient id="carGlass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#455A64" />
              <stop offset="100%" stopColor="#102027" />
            </linearGradient>
          </defs>
          {/* Wheels */}
          <circle cx="28" cy="68" r="10" fill="#1A1A1A" stroke="#424242" strokeWidth="2" />
          <circle cx="28" cy="68" r="5" fill="#E0E0E0" />
          <circle cx="74" cy="68" r="10" fill="#1A1A1A" stroke="#424242" strokeWidth="2" />
          <circle cx="74" cy="68" r="5" fill="#E0E0E0" />
          {/* Sleek Aerodynamic Body */}
          <path 
            d="M12 62 C16 54 26 50 40 48 L56 36 C66 36 78 44 86 54 L92 60 C92 66 84 68 82 68 L66 68 C64 63 56 63 54 68 L36 68 C34 63 26 63 24 68 L14 68 C10 68 10 64 12 62 Z" 
            fill="url(#carRed)" 
            filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
          />
          {/* Windshield & Cockpit */}
          <path d="M42 48 L56 38 C64 38 72 44 76 48 Z" fill="url(#carGlass)" stroke="#263238" strokeWidth="1" />
          {/* Headlights (Neon Blue / White LED) */}
          <polygon points="86,56 92,60 88,61" fill="#00E5FF" filter="drop-shadow(0 0 4px #00E5FF)" />
          {/* Spoiler */}
          <path d="M10 50 L20 48 L18 52 Z" fill="#212121" />
        </svg>
      );

    case 'castle':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
          <defs>
            <linearGradient id="castleGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFE082" />
              <stop offset="50%" stopColor="#FFA000" />
              <stop offset="100%" stopColor="#C46200" />
            </linearGradient>
          </defs>
          {/* Base Wall */}
          <rect x="20" y="52" width="60" height="32" rx="2" fill="url(#castleGold)" />
          {/* Wall Battlements */}
          <rect x="20" y="48" width="6" height="6" fill="#FFA000" />
          <rect x="32" y="48" width="6" height="6" fill="#FFA000" />
          <rect x="62" y="48" width="6" height="6" fill="#FFA000" />
          <rect x="74" y="48" width="6" height="6" fill="#FFA000" />
          {/* Gate Arch */}
          <path d="M42 84 V66 C42 61 58 61 58 66 V84 Z" fill="#3E2723" />
          {/* Central High Tower */}
          <rect x="38" y="32" width="24" height="28" fill="url(#castleGold)" />
          <polygon points="36,32 50,14 64,32" fill="#E65100" />
          <rect x="47" y="38" width="6" height="10" rx="3" fill="#FFF59D" />
          {/* Left Tower */}
          <rect x="14" y="38" width="16" height="42" fill="url(#castleGold)" />
          <polygon points="12,38 22,22 32,38" fill="#E65100" />
          {/* Right Tower */}
          <rect x="70" y="38" width="16" height="42" fill="url(#castleGold)" />
          <polygon points="68,38 78,22 88,38" fill="#E65100" />
          {/* Royal Flags */}
          <polygon points="50,14 50,8 60,11" fill="#D50000" />
          <polygon points="22,22 22,16 30,19" fill="#00B0FF" />
          <polygon points="78,22 78,16 86,19" fill="#00B0FF" />
        </svg>
      );

    case 'lion':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
          <defs>
            <radialGradient id="lionMane" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFB300" />
              <stop offset="70%" stopColor="#E65100" />
              <stop offset="100%" stopColor="#BF360C" />
            </radialGradient>
            <linearGradient id="lionFace" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFE082" />
              <stop offset="100%" stopColor="#FFB300" />
            </linearGradient>
          </defs>
          {/* Grand Mane */}
          <circle cx="50" cy="50" r="38" fill="url(#lionMane)" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.5))" />
          {/* Mane Tuffs */}
          <polygon points="50,10 44,22 56,22" fill="#FF8F00" />
          <polygon points="86,40 74,45 80,56" fill="#FF8F00" />
          <polygon points="14,40 26,45 20,56" fill="#FF8F00" />
          <polygon points="28,82 40,74 34,88" fill="#FF6F00" />
          <polygon points="72,82 60,74 66,88" fill="#FF6F00" />
          {/* Ears */}
          <circle cx="28" cy="30" r="9" fill="#FFA000" />
          <circle cx="28" cy="30" r="5" fill="#FFE082" />
          <circle cx="72" cy="30" r="9" fill="#FFA000" />
          <circle cx="72" cy="30" r="5" fill="#FFE082" />
          {/* Face */}
          <ellipse cx="50" cy="52" rx="22" ry="24" fill="url(#lionFace)" />
          {/* Royal Crown on Head */}
          <polygon points="40,24 45,16 50,22 55,16 60,24" fill="#FFD700" stroke="#FF8F00" strokeWidth="1" />
          {/* Eyes with Golden Glow */}
          <ellipse cx="40" cy="46" rx="4" ry="3" fill="#2E7D32" />
          <circle cx="40" cy="46" r="1.5" fill="#00E676" />
          <ellipse cx="60" cy="46" rx="4" ry="3" fill="#2E7D32" />
          <circle cx="60" cy="46" r="1.5" fill="#00E676" />
          {/* Snout & Whiskers */}
          <polygon points="46,55 54,55 50,60" fill="#3E2723" />
          <ellipse cx="45" cy="62" rx="5" ry="3.5" fill="#FFF9C4" />
          <ellipse cx="55" cy="62" rx="5" ry="3.5" fill="#FFF9C4" />
        </svg>
      );

    case 'universe':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
          <defs>
            <radialGradient id="planetGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#7C4DFF" />
              <stop offset="45%" stopColor="#536DFE" />
              <stop offset="85%" stopColor="#1A237E" />
              <stop offset="100%" stopColor="#0D102D" />
            </radialGradient>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="50%" stopColor="#E040FB" />
              <stop offset="100%" stopColor="#FF4081" />
            </linearGradient>
          </defs>
          {/* Back of Rings */}
          <ellipse cx="50" cy="50" rx="44" ry="14" transform="rotate(-25 50 50)" stroke="url(#ringGrad)" strokeWidth="6" opacity="0.6" />
          {/* Planet Body */}
          <circle cx="50" cy="50" r="26" fill="url(#planetGrad)" filter="drop-shadow(0 0 12px #651FFF)" />
          {/* Front of Rings */}
          <path 
            d="M12 65 C22 80 72 60 88 35" 
            stroke="url(#ringGrad)" 
            strokeWidth="6" 
            strokeLinecap="round" 
            filter="drop-shadow(0 0 6px #00E5FF)"
          />
          {/* Stars */}
          <circle cx="20" cy="22" r="1.5" fill="#FFFFFF" />
          <circle cx="80" cy="74" r="1.5" fill="#FFFFFF" />
          <circle cx="78" cy="18" r="2" fill="#E040FB" />
        </svg>
      );

    case 'galaxy':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
          <defs>
            <radialGradient id="galaxyCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#E040FB" />
              <stop offset="65%" stopColor="#304FFE" />
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>
          </defs>
          {/* Swirling Spiral Arms */}
          <g transform="rotate(25 50 50)">
            <ellipse cx="50" cy="50" rx="46" ry="18" fill="url(#galaxyCore)" filter="drop-shadow(0 0 15px #7C4DFF)" />
            <path d="M10 50 C25 25 75 25 90 50 C75 75 25 75 10 50 Z" stroke="#00E5FF" strokeWidth="2" strokeDasharray="3 4" opacity="0.8" />
            <circle cx="50" cy="50" r="12" fill="#FFFFFF" filter="drop-shadow(0 0 8px #FFFFFF)" />
          </g>
          {/* Sparkling Stardust */}
          <circle cx="34" cy="38" r="1.5" fill="#FFF" />
          <circle cx="68" cy="58" r="2" fill="#FF80AB" />
          <circle cx="28" cy="62" r="1.5" fill="#00E5FF" />
          <circle cx="72" cy="32" r="1.5" fill="#FFF" />
        </svg>
      );

    case 'dragon':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
          <defs>
            <linearGradient id="dragonGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF176" />
              <stop offset="40%" stopColor="#FFB300" />
              <stop offset="80%" stopColor="#FF6F00" />
              <stop offset="100%" stopColor="#DD2C00" />
            </linearGradient>
          </defs>
          {/* Coiled Body */}
          <path 
            d="M20 74 C16 48 40 38 48 48 C56 58 72 58 78 44 C84 30 76 18 64 22 C52 26 50 36 38 32 C26 28 32 12 50 10 C74 8 92 28 84 56 C76 84 44 88 20 74 Z" 
            fill="url(#dragonGold)" 
            filter="drop-shadow(0 4px 10px #FF6F00)"
          />
          {/* Dragon Head */}
          <path d="M74 26 C82 22 92 26 90 38 C84 42 76 38 72 32 Z" fill="#FFA000" />
          {/* Horns & Whiskers */}
          <path d="M76 22 C80 14 88 12 92 8" stroke="#FFE082" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M86 34 C94 36 98 44 94 52" stroke="#FFD54F" strokeWidth="2" strokeLinecap="round" />
          {/* Glowing Ruby Eye */}
          <circle cx="80" cy="28" r="2.5" fill="#D50000" filter="drop-shadow(0 0 3px #FF1744)" />
          {/* Scales highlights */}
          <circle cx="36" cy="56" r="3" fill="#FFF9C4" opacity="0.6" />
          <circle cx="58" cy="62" r="3" fill="#FFF9C4" opacity="0.6" />
        </svg>
      );

    case 'yacht':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
          <defs>
            <linearGradient id="yachtHull" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#CFD8DC" />
              <stop offset="100%" stopColor="#263238" />
            </linearGradient>
          </defs>
          {/* Ocean Waves */}
          <path d="M10 76 Q30 72 50 76 T90 76 L86 86 L14 86 Z" fill="#0288D1" opacity="0.8" />
          {/* Hull */}
          <path d="M14 62 L22 74 L84 74 L92 56 L70 56 Z" fill="url(#yachtHull)" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.4))" />
          {/* Cabin decks */}
          <polygon points="34,42 66,42 64,56 28,56" fill="#ECEFF1" />
          <polygon points="42,32 58,32 56,42 38,42" fill="#FFFFFF" />
          {/* Tinted Windows */}
          <rect x="36" y="46" width="24" height="6" rx="2" fill="#102027" />
          {/* Radar Mast */}
          <line x1="50" y1="32" x2="50" y2="24" stroke="#78909C" strokeWidth="2" />
          <line x1="46" y1="24" x2="54" y2="24" stroke="#78909C" strokeWidth="2" />
        </svg>
      );

    case 'dancing-bear':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
          <defs>
            <radialGradient id="pinkBear" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FF80AB" />
              <stop offset="60%" stopColor="#F50057" />
              <stop offset="100%" stopColor="#880E4F" />
            </radialGradient>
          </defs>
          {/* Ears */}
          <circle cx="28" cy="28" r="12" fill="#F50057" />
          <circle cx="28" cy="28" r="6" fill="#FF80AB" />
          <circle cx="72" cy="28" r="12" fill="#F50057" />
          <circle cx="72" cy="28" r="6" fill="#FF80AB" />
          {/* Head */}
          <circle cx="50" cy="50" r="30" fill="url(#pinkBear)" />
          {/* Cool Sunglasses */}
          <rect x="26" y="40" width="20" height="14" rx="4" fill="#212121" />
          <rect x="54" y="40" width="20" height="14" rx="4" fill="#212121" />
          <line x1="46" y1="46" x2="54" y2="46" stroke="#212121" strokeWidth="3" />
          {/* Lens reflections */}
          <line x1="28" y1="44" x2="42" y2="44" stroke="#00E5FF" strokeWidth="2" opacity="0.8" />
          <line x1="56" y1="44" x2="70" y2="44" stroke="#00E5FF" strokeWidth="2" opacity="0.8" />
          {/* Snout & Smile */}
          <ellipse cx="50" cy="62" rx="10" ry="7" fill="#FFD7E2" />
          <circle cx="50" cy="59" r="3" fill="#880E4F" />
          <path d="M46 64 C48 67 52 67 54 64" stroke="#880E4F" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'ferris-wheel':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
          {/* Base Stand */}
          <polygon points="50,50 30,90 70,90" stroke="#78909C" strokeWidth="4" fill="none" />
          {/* Wheel Rim */}
          <circle cx="50" cy="46" r="30" stroke="#FF4081" strokeWidth="3" fill="none" />
          <circle cx="50" cy="46" r="16" stroke="#00E5FF" strokeWidth="2" fill="none" />
          {/* Center Axle */}
          <circle cx="50" cy="46" r="6" fill="#FFD600" />
          {/* Cabins in Neon Colors */}
          <circle cx="50" cy="16" r="4" fill="#00E5FF" />
          <circle cx="50" cy="76" r="4" fill="#00E5FF" />
          <circle cx="20" cy="46" r="4" fill="#76FF03" />
          <circle cx="80" cy="46" r="4" fill="#76FF03" />
          <circle cx="29" cy="25" r="4" fill="#FFEA00" />
          <circle cx="71" cy="67" r="4" fill="#FFEA00" />
          <circle cx="29" cy="67" r="4" fill="#FF1744" />
          <circle cx="71" cy="25" r="4" fill="#FF1744" />
        </svg>
      );

    case 'space-station':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
          {/* Solar Arrays Left & Right */}
          <rect x="8" y="38" width="28" height="24" rx="2" fill="#0D47A1" stroke="#00E5FF" strokeWidth="1.5" />
          <rect x="64" y="38" width="28" height="24" rx="2" fill="#0D47A1" stroke="#00E5FF" strokeWidth="1.5" />
          {/* Solar cell grid lines */}
          <line x1="17" y1="38" x2="17" y2="62" stroke="#40C4FF" strokeWidth="1" />
          <line x1="27" y1="38" x2="27" y2="62" stroke="#40C4FF" strokeWidth="1" />
          <line x1="73" y1="38" x2="73" y2="62" stroke="#40C4FF" strokeWidth="1" />
          <line x1="83" y1="38" x2="83" y2="62" stroke="#40C4FF" strokeWidth="1" />
          {/* Main Module Truss */}
          <rect x="34" y="46" width="32" height="8" fill="#ECEFF1" />
          <circle cx="50" cy="50" r="10" fill="#CFD8DC" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="50" cy="50" r="4" fill="#00E5FF" />
        </svg>
      );

    case 'meteor':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
          <defs>
            <radialGradient id="meteorCore" cx="70%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#FFD600" />
              <stop offset="70%" stopColor="#FF3D00" />
              <stop offset="100%" stopColor="#3E2723" />
            </radialGradient>
          </defs>
          {/* Blazing Flame Tail */}
          <path d="M12 90 C28 72 40 50 70 30 C50 60 28 72 12 90 Z" fill="#FF1744" opacity="0.7" />
          <path d="M18 84 C32 68 46 48 70 30 C54 56 34 68 18 84 Z" fill="#FF9100" />
          <path d="M26 76 C40 60 52 44 70 30 C56 50 40 62 26 76 Z" fill="#FFEA00" />
          {/* Meteorite Rock Head */}
          <circle cx="70" cy="30" r="18" fill="url(#meteorCore)" filter="drop-shadow(0 0 10px #FF6D00)" />
          {/* Craters */}
          <circle cx="64" cy="24" r="3.5" fill="#BF360C" />
          <circle cx="76" cy="34" r="4" fill="#BF360C" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
          <circle cx="50" cy="50" r="40" fill="#FE2C55" />
          <circle cx="50" cy="50" r="20" fill="#FFFFFF" />
        </svg>
      );
  }
};
