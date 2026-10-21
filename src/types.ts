export type CategoryId = 'all' | 'popular' | 'symbols' | 'animals' | 'vehicles' | 'jewelry' | 'more';

export interface Gift {
  id: string;
  nameEn: string;
  nameAr: string;
  coins: number;
  category: CategoryId;
  isPopular?: boolean;
  glowColor?: string;
  accentColor?: string;
  svgType: 
    | 'rose' 
    | 'finger-heart' 
    | 'heart' 
    | 'tiktok-note' 
    | 'panda' 
    | 'ice-cream' 
    | 'diamond' 
    | 'crown' 
    | 'rocket' 
    | 'sports-car' 
    | 'castle' 
    | 'lion' 
    | 'universe' 
    | 'dancing-bear' 
    | 'ferris-wheel' 
    | 'galaxy' 
    | 'yacht' 
    | 'dragon' 
    | 'space-station' 
    | 'meteor';
}

export interface DemoRecipient {
  username: string;
  displayName: string;
  avatarUrl: string;
  isVerified: boolean;
  statusTextAr: string;
  statusTextEn: string;
}

export interface Transaction {
  id: string;
  timestamp: number;
  recipientUsername: string;
  giftId: string;
  giftNameAr: string;
  giftNameEn: string;
  quantity: number;
  costPerItem: number;
  totalCost: number;
  bonusGift?: {
    nameAr: string;
    nameEn: string;
    coinsValue: number;
  };
}
