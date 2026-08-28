export type ExampleDomainKey =
  | 'membership'
  | 'mhami'
  | 'mbazar'
  | 'learning'
  | 'mhesam'
  | 'heavenly-resalat'
  | 'msalamat'
  | 'mbime'
  | 'auxiliary'
  | 'rahyar'
  | 'banking'
  | 'communication';

export type ExampleRoute = {
  serviceId: string;
  domain: ExampleDomainKey;
  ecosystemServiceId: string;
  href: string;
  source: 'product-example' | 'existing-mbazar';
};

type ExampleRouteSeed = Omit<ExampleRoute, 'ecosystemServiceId'>;

export type ExampleDomain = {
  key: ExampleDomainKey;
  titleFa: string;
  titleEn: string;
  description: string;
  href: string;
  ecosystemServiceId: string;
  accent: 'blue' | 'cyan' | 'violet' | 'amber' | 'green' | 'rose';
};

export const exampleDomains: ExampleDomain[] = [
  { key: 'membership', titleFa: 'عضویت', titleEn: 'Membership', description: 'هویت، سرپرستی، امضاداران و پیگیری درخواست', href: '/examples/membership', ecosystemServiceId: 'membership', accent: 'blue' },
  { key: 'mhami', titleFa: 'ام‌حامی و انجمن', titleEn: 'M-Hami + Supporters', description: 'حامیان، عضویت انجمن، وام و ارزیابی مجوز', href: '/examples/mhami', ecosystemServiceId: 'mhami', accent: 'violet' },
  { key: 'mbazar', titleFa: 'ام‌بازار و SAT', titleEn: 'M-Bazar + SAT', description: 'کشف، خرید، سفارش، اقساط و خدمات پس از خرید', href: '/examples/mbazar', ecosystemServiceId: 'mbazar', accent: 'amber' },
  { key: 'learning', titleFa: 'یادگیری', titleEn: 'Learning', description: 'جستجوی مرکز و مرور ارائه‌دهندگان آموزشی', href: '/examples/learning', ecosystemServiceId: 'mamoozesh', accent: 'cyan' },
  { key: 'mhesam', titleFa: 'ام‌حسام و اعتبار', titleEn: 'M-Hesam + Credit', description: 'تراکنش، اعتبار، بن، MQR و خدمات اقساطی', href: '/examples/mhesam', ecosystemServiceId: 'mhesam', accent: 'green' },
  { key: 'heavenly-resalat', titleFa: 'رسالت آسمانی', titleEn: 'Contributions', description: 'کمپین‌های همیاری و سابقه مشارکت نمایشی', href: '/examples/heavenly-resalat', ecosystemServiceId: 'heavenly-mission', accent: 'rose' },
  { key: 'msalamat', titleFa: 'ام‌سلامت', titleEn: 'M-Salamat', description: 'ارائه‌دهنده، نوبت و دسترسی حریم‌محور به پرونده', href: '/examples/msalamat', ecosystemServiceId: 'msalamat', accent: 'cyan' },
  { key: 'mbime', titleFa: 'ام‌بیمه', titleEn: 'M-Bime', description: 'محصولات خودرو، موتورسیکلت و بیمه عمر', href: '/examples/mbime', ecosystemServiceId: 'mbime', accent: 'blue' },
  { key: 'auxiliary', titleFa: 'سامانه‌های مکمل', titleEn: 'Auxiliary systems', description: 'سایا، ام‌اتکا، مرآت و آیکاپ', href: '/examples/auxiliary', ecosystemServiceId: 'saya', accent: 'violet' },
  { key: 'rahyar', titleFa: 'رهیار', titleEn: 'Rahyar', description: 'بازنمایی صادقانه وضعیت دسترسی‌ناپذیر ممیزی', href: '/examples/rahyar', ecosystemServiceId: 'rahyar', accent: 'rose' },
  { key: 'banking', titleFa: 'پیشخوان و بانکداری', titleEn: 'Virtual Counter + Banking', description: 'درخواست‌ها، درگاه‌های بانکی و راهنمای همراه‌بانک', href: '/examples/banking', ecosystemServiceId: 'pishkhan', accent: 'green' },
  { key: 'communication', titleFa: 'ارتباط و دسترسی', titleEn: 'Communication + Access', description: 'پیام، مشاور، جستجو، نقشه و پشتیبانی', href: '/examples/communication', ecosystemServiceId: 'mpayam', accent: 'amber' },
];

const defaultIdentityByDomain: Record<ExampleDomainKey, string> = {
  membership: 'membership',
  mhami: 'mhami',
  mbazar: 'mbazar',
  learning: 'mamoozesh',
  mhesam: 'mhesam',
  'heavenly-resalat': 'heavenly-mission',
  msalamat: 'msalamat',
  mbime: 'mbime',
  auxiliary: 'auxiliary-systems',
  rahyar: 'rahyar',
  banking: 'pishkhan',
  communication: 'communication-access',
};

const identityOverridesByServiceId: Record<string, string> = {
  'association-membership': 'supporters-association',
  'zero-fee-loan-request': 'supporters-association',
  'zero-fee-loan-tracking': 'supporters-association',
  'association-membership-card': 'supporters-association',
  'sat-booth-purchase': 'sat',
  saya: 'saya',
  mpayam: 'mpayam',
  'mpayam-plus': 'mpayam',
  'rasan-advisor': 'advisor',
  'support-chat': 'advisor',
};

const exampleRouteSeeds: ExampleRouteSeed[] = [
  { serviceId: 'individual-membership', domain: 'membership', href: '/examples/membership/individual', source: 'product-example' },
  { serviceId: 'under-18-membership', domain: 'membership', href: '/examples/membership/under-18', source: 'product-example' },
  { serviceId: 'organization-membership', domain: 'membership', href: '/examples/membership/organization', source: 'product-example' },
  { serviceId: 'membership-request-tracking', domain: 'membership', href: '/examples/membership/tracking', source: 'product-example' },
  { serviceId: 'my-supporters', domain: 'mhami', href: '/examples/mhami/supporters', source: 'product-example' },
  { serviceId: 'become-supporter', domain: 'mhami', href: '/examples/mhami/become-supporter', source: 'product-example' },
  { serviceId: 'association-membership', domain: 'mhami', href: '/examples/mhami/association', source: 'product-example' },
  { serviceId: 'zero-fee-loan-request', domain: 'mhami', href: '/examples/mhami/loan-request', source: 'product-example' },
  { serviceId: 'zero-fee-loan-tracking', domain: 'mhami', href: '/examples/mhami/loan-tracking', source: 'product-example' },
  { serviceId: 'association-membership-card', domain: 'mhami', href: '/examples/mhami/membership-card', source: 'product-example' },
  { serviceId: 'business-license-evaluation', domain: 'mhami', href: '/examples/mhami/business-license', source: 'product-example' },
  { serviceId: 'mbazar-storefront', domain: 'mbazar', href: '/examples/mbazar', source: 'existing-mbazar' },
  { serviceId: 'mbazar-search-categories', domain: 'mbazar', href: '/examples/mbazar/categories', source: 'existing-mbazar' },
  { serviceId: 'mbazar-favorites', domain: 'mbazar', href: '/examples/mbazar/favorites', source: 'existing-mbazar' },
  { serviceId: 'mbazar-orders', domain: 'mbazar', href: '/examples/mbazar/orders', source: 'existing-mbazar' },
  { serviceId: 'mbazar-installments', domain: 'mbazar', href: '/examples/mbazar/installments', source: 'existing-mbazar' },
  { serviceId: 'mbazar-addresses', domain: 'mbazar', href: '/examples/mbazar/addresses', source: 'existing-mbazar' },
  { serviceId: 'mbazar-reviews', domain: 'mbazar', href: '/examples/mbazar/reviews', source: 'existing-mbazar' },
  { serviceId: 'mbazar-cart-checkout', domain: 'mbazar', href: '/examples/mbazar/cart', source: 'existing-mbazar' },
  { serviceId: 'mbazar-city-address', domain: 'mbazar', href: '/examples/mbazar/checkout?step=delivery', source: 'existing-mbazar' },
  { serviceId: 'sat-booth-purchase', domain: 'mbazar', href: '/examples/mbazar/seller/resalat-market', source: 'existing-mbazar' },
  { serviceId: 'digital-products-category', domain: 'mbazar', href: '/examples/mbazar/category/digital', source: 'existing-mbazar' },
  { serviceId: 'mamouzesh', domain: 'learning', href: '/examples/learning/mamouzesh', source: 'product-example' },
  { serviceId: 'mdonap', domain: 'learning', href: '/examples/learning/mdonap', source: 'product-example' },
  { serviceId: 'mhesam-transactions', domain: 'mhesam', href: '/examples/mhesam/transactions', source: 'product-example' },
  { serviceId: 'mqr', domain: 'mhesam', href: '/examples/mhesam/mqr', source: 'product-example' },
  { serviceId: 'credit-withdrawal', domain: 'mhesam', href: '/examples/mhesam/credit/withdraw', source: 'product-example' },
  { serviceId: 'credit-donation', domain: 'mhesam', href: '/examples/mhesam/credit/donate', source: 'product-example' },
  { serviceId: 'mhesam-credit', domain: 'mhesam', href: '/examples/mhesam', source: 'product-example' },
  { serviceId: 'vouchers', domain: 'mhesam', href: '/examples/mhesam/vouchers', source: 'product-example' },
  { serviceId: 'mqr-in-person-purchases', domain: 'mhesam', href: '/examples/mhesam/in-person', source: 'product-example' },
  { serviceId: 'maghsat-plus', domain: 'mhesam', href: '/examples/mhesam/maghsat-plus', source: 'product-example' },
  { serviceId: 'maghsat', domain: 'mhesam', href: '/examples/mhesam/maghsat', source: 'product-example' },
  { serviceId: 'mnessieh', domain: 'mhesam', href: '/examples/mhesam/mnessieh', source: 'product-example' },
  { serviceId: 'my-contributions', domain: 'heavenly-resalat', href: '/examples/heavenly-resalat/contributions', source: 'product-example' },
  { serviceId: 'heavenly-resalat', domain: 'heavenly-resalat', href: '/examples/heavenly-resalat', source: 'product-example' },
  { serviceId: 'msalamat-public', domain: 'msalamat', href: '/examples/msalamat', source: 'product-example' },
  { serviceId: 'my-health', domain: 'msalamat', href: '/examples/msalamat/my-health', source: 'product-example' },
  { serviceId: 'my-appointments', domain: 'msalamat', href: '/examples/msalamat/appointments', source: 'product-example' },
  { serviceId: 'medical-record', domain: 'msalamat', href: '/examples/msalamat/medical-record', source: 'product-example' },
  { serviceId: 'mbime-portal', domain: 'mbime', href: '/examples/mbime', source: 'product-example' },
  { serviceId: 'third-party-insurance', domain: 'mbime', href: '/examples/mbime/third-party', source: 'product-example' },
  { serviceId: 'comprehensive-insurance', domain: 'mbime', href: '/examples/mbime/comprehensive', source: 'product-example' },
  { serviceId: 'motorcycle-insurance', domain: 'mbime', href: '/examples/mbime/motorcycle', source: 'product-example' },
  { serviceId: 'life-insurance', domain: 'mbime', href: '/examples/mbime/life', source: 'product-example' },
  { serviceId: 'saya', domain: 'auxiliary', href: '/examples/auxiliary/saya', source: 'product-example' },
  { serviceId: 'metka', domain: 'auxiliary', href: '/examples/auxiliary/metka', source: 'product-example' },
  { serviceId: 'merat', domain: 'auxiliary', href: '/examples/auxiliary/merat', source: 'product-example' },
  { serviceId: 'icap', domain: 'auxiliary', href: '/examples/auxiliary/icap', source: 'product-example' },
  { serviceId: 'your-rahyar', domain: 'rahyar', href: '/examples/rahyar', source: 'product-example' },
  { serviceId: 'rahyar-id-lookup', domain: 'rahyar', href: '/examples/rahyar/id-card', source: 'product-example' },
  { serviceId: 'virtual-counter', domain: 'banking', href: '/examples/banking', source: 'product-example' },
  { serviceId: 'current-account-opening', domain: 'banking', href: '/examples/banking/current-account', source: 'product-example' },
  { serviceId: 'resalat-card', domain: 'banking', href: '/examples/banking/card', source: 'product-example' },
  { serviceId: 'satna-transfer', domain: 'banking', href: '/examples/banking/satna', source: 'product-example' },
  { serviceId: 'child-loan', domain: 'banking', href: '/examples/banking/child-loan', source: 'product-example' },
  { serviceId: 'marriage-loan', domain: 'banking', href: '/examples/banking/marriage-loan', source: 'product-example' },
  { serviceId: 'all-banking-services', domain: 'banking', href: '/examples/banking/services', source: 'product-example' },
  { serviceId: 'mobile-banking', domain: 'banking', href: '/examples/banking/mobile', source: 'product-example' },
  { serviceId: 'internet-banking', domain: 'banking', href: '/examples/banking/internet', source: 'product-example' },
  { serviceId: 'mpayam', domain: 'communication', href: '/examples/communication/mpayam', source: 'product-example' },
  { serviceId: 'mpayam-plus', domain: 'communication', href: '/examples/communication/mpayam-plus', source: 'product-example' },
  { serviceId: 'rasan-advisor', domain: 'communication', href: '/examples/communication/rasan', source: 'product-example' },
  { serviceId: 'global-search', domain: 'communication', href: '/examples/communication/search', source: 'product-example' },
  { serviceId: 'map', domain: 'communication', href: '/examples/communication/map', source: 'product-example' },
  { serviceId: 'support-chat', domain: 'communication', href: '/examples/communication/support', source: 'product-example' },
  { serviceId: 'arbaeen-pavilion', domain: 'communication', href: '/examples/communication/arbaeen', source: 'product-example' },
  { serviceId: 'mresalat-app-download', domain: 'communication', href: '/examples/communication/app-download', source: 'product-example' },
  { serviceId: 'memorial', domain: 'communication', href: '/examples/communication/memorial', source: 'product-example' },
];

export const exampleRoutes: ExampleRoute[] = exampleRouteSeeds.map((route) => ({
  ...route,
  ecosystemServiceId: identityOverridesByServiceId[route.serviceId] ?? defaultIdentityByDomain[route.domain],
}));

export const exampleRouteByServiceId = Object.fromEntries(exampleRoutes.map((route) => [route.serviceId, route])) as Record<string, ExampleRoute>;
export const exampleDomainByKey = Object.fromEntries(exampleDomains.map((domain) => [domain.key, domain])) as Record<ExampleDomainKey, ExampleDomain>;

export function routesForDomain(domain: ExampleDomainKey) {
  return exampleRoutes.filter((route) => route.domain === domain);
}

export function routeSlug(href: string, domain: ExampleDomainKey) {
  const clean = href.split('?')[0];
  const base = `/examples/${domain}`;
  return clean === base ? [] : clean.replace(`${base}/`, '').split('/').filter(Boolean);
}
