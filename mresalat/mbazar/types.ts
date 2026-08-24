export type MBazarAvailability = 'available' | 'limited' | 'unavailable';
export type MBazarProductVariant = 'carousel' | 'grid' | 'list' | 'recommendation';

export type MBazarSeller = {
  id: string;
  name: string;
  status?: 'marketplace-provider' | 'unavailable';
  rating?: number;
  reviewCount?: number;
  region?: string;
  description?: string;
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
  province?: string;
  city?: string;
  isDefault?: boolean;
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

export type MBazarOrderStatus = 'placed' | 'seller-confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled' | 'issue';
export type MBazarFulfillmentStatus = 'pending' | 'preparing' | 'ready' | 'in-transit' | 'delivered' | 'failed';
export type MBazarOrderAction = { label: string; href: string; kind: 'track' | 'review' | 'support' | 'buy-again' };
export type MBazarTrackingMilestone = { id: string; title: string; detail?: string; status: 'completed' | 'current' | 'upcoming' };
export type MBazarOrderItem = {
  id: string;
  productId: string;
  sellerId: string;
  title: string;
  image: string;
  imageAlt: string;
  unitPrice: number;
  quantity: number;
};
export type MBazarOrderSellerGroup = {
  id: string;
  seller: MBazarSeller;
  status: MBazarFulfillmentStatus;
  statusLabel: string;
  nextStep: string;
  itemIds: string[];
  milestones: MBazarTrackingMilestone[];
};
export type MBazarOrder = {
  id: string;
  reference: string;
  createdAt: string;
  paymentMode: MBazarPaymentMode;
  status: MBazarOrderStatus;
  items: MBazarOrderItem[];
  sellerGroups: MBazarOrderSellerGroup[];
  totals: { subtotal: number; discount: number; delivery: number; total: number };
  deliveryAddress: MBazarAddress;
  deliveryMethod: string;
  nextAction?: MBazarOrderAction;
  cancellationReason?: string;
  issueSummary?: string;
  reviewedProductIds?: string[];
  isNew?: boolean;
};

export type MBazarFavorite = { productId: string; savedPrice: number; savedAt: string; savedInstallmentEligible?: boolean };
export type MBazarReview = { id: string; orderId: string; productId: string; rating: number; text: string; createdAt: string; pros?: string; cons?: string };
export type MBazarSupportIssueType = 'delivery-delay' | 'wrong-item' | 'damaged-item' | 'missing-item' | 'payment-question' | 'other';
export type MBazarSupportCase = {
  id: string;
  orderId: string;
  type: MBazarSupportIssueType;
  status: 'created' | 'in-review' | 'waiting-for-user' | 'resolved';
  createdAt: string;
  summary: string;
  sellerId?: string;
  nextAction?: string;
};

export type MBazarDomainSnapshot = {
  favorites: MBazarFavorite[];
  addresses: MBazarAddress[];
  orders: MBazarOrder[];
  reviews: MBazarReview[];
  supportCases: MBazarSupportCase[];
};
