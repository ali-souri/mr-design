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

export type MBazarCart = {
  id: string;
  items: MBazarCartItem[];
  currency: 'IRT';
};

export type MBazarCartItem = {
  productId: string;
  sellerId: string;
  quantity: number;
  selected: boolean;
};

export type CartValidationIssue = 'out-of-stock' | 'limited-stock' | 'price-changed' | 'installment-unavailable';
export type InstallmentEligibilityStatus = 'eligible' | 'conditional' | 'unknown' | 'ineligible';
export type InstallmentEligibility = { status: InstallmentEligibilityStatus; reasonCodes: string[]; nextAction?: string };
export type MBazarPaymentMode = 'cash' | 'installment';
export type CheckoutStep = 'delivery' | 'payment' | 'eligibility' | 'plan' | 'review' | 'confirm';

export type MBazarAddress = {
  id: string;
  title: string;
  recipient: string;
  address: string;
  postalCode: string;
  phone: string;
};

export type InstallmentPlan = {
  id: string;
  label: string;
  months: number;
  downPayment: number;
  monthlyPayment: number;
  totalPayment: number;
  fee: number;
};

export type MBazarCheckoutDraft = {
  step: CheckoutStep;
  addressId: string;
  deliveryMethod: 'standard' | 'scheduled';
  paymentMode?: MBazarPaymentMode;
  eligibilityScenario: InstallmentEligibilityStatus;
  planId?: string;
  acknowledgement: boolean;
};

export type InstallmentRequestStatus = 'action-required' | 'reviewing' | 'ready' | 'completed';
export type InstallmentRequest = {
  id: string;
  reference: string;
  productId: string;
  status: InstallmentRequestStatus;
  statusLabel: string;
  lastUpdate: string;
  nextAction: string;
  progress: number;
  planId?: string;
};
