export type MBazarAvailability = 'available' | 'limited' | 'unavailable';
export type MBazarProductVariant = 'carousel' | 'grid' | 'list' | 'recommendation';

export type MBazarSeller = {
  id: string;
  name: string;
};

export type MBazarProduct = {
  id: string;
  slug: string;
  title: string;
  image: string;
  imageAlt: string;
  seller: MBazarSeller;
  price: { current: number; previous?: number; currency: 'IRT' };
  discountPercent?: number;
  availability: MBazarAvailability;
  installmentEligible?: boolean;
  categoryId: string;
  rating?: number;
  description?: string;
  specifications?: Array<{ label: string; value: string }>;
  colors?: string[];
};

export type MBazarCategory = {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: 'product' | 'home' | 'education' | 'health' | 'gift' | 'learning' | 'settings' | 'grid';
  tone: 'blue' | 'cyan' | 'violet' | 'amber';
};

export type MarketplaceContextState = {
  destination: string;
  store: string;
};

export type MBazarFilterState = {
  installmentOnly: boolean;
  availableOnly: boolean;
  seller?: string;
  maxPrice?: number;
};
