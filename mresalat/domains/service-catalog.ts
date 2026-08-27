import type { MResalatIconName } from '@/mresalat/core/MResalatIcon';
import type { ServiceComponentKey } from './service-component-registry';

export type ServiceVerificationStatus = 'authenticated' | 'public' | 'safe-stop' | 'gated' | 'unavailable' | 'not-visible';
export type ServiceRiskLevel = 'L0' | 'L1' | 'L2' | 'L3';
export type ServiceSurfaceKind = 'gate' | 'dashboard' | 'form' | 'list' | 'search' | 'marketplace' | 'read-only' | 'safe-stop' | 'unavailable' | 'info' | 'permission';

export type AuditedServicePath = {
  id: string;
  chapter: number;
  domain: string;
  titleFa: string;
  titleEn: string;
  verificationStatus: ServiceVerificationStatus;
  riskLevel: ServiceRiskLevel;
  safeStopFa: string;
  safeStopEn: string;
  surfaceKind: ServiceSurfaceKind;
  componentKeys: ServiceComponentKey[];
  icon: MResalatIconName;
  isMock: true;
  demoHref?: string;
  note?: string;
};

export const serviceCatalogSource = {
  title: 'MResalat_Bilingual_Service_Catalog_2026-08-28.docx',
  auditedAt: '2026-08-28',
  chapterCount: 12,
  expectedPathCount: 69,
} as const;

export const serviceCatalogChapters = [
  { id: 1, titleFa: 'عضویت', titleEn: 'Membership' },
  { id: 2, titleFa: 'ام‌حامی و انجمن حامیان', titleEn: 'M-Hami + Supporters Association' },
  { id: 3, titleFa: 'ام‌بازار و SAT', titleEn: 'M-Bazar + SAT' },
  { id: 4, titleFa: 'آموزش', titleEn: 'Learning' },
  { id: 5, titleFa: 'ام‌حسام، اعتبار و اقساط', titleEn: 'M-Hesam, credit and installments' },
  { id: 6, titleFa: 'رسالت آسمانی و همیاری', titleEn: 'Heavenly Resalat and contributions' },
  { id: 7, titleFa: 'ام‌سلامت', titleEn: 'M-Salamat' },
  { id: 8, titleFa: 'ام‌بیمه', titleEn: 'M-Bime' },
  { id: 9, titleFa: 'سایا و سامانه‌های مکمل', titleEn: 'SAYA + auxiliary systems' },
  { id: 10, titleFa: 'مدیریت رهیار', titleEn: 'Rahyar management' },
  { id: 11, titleFa: 'پیشخوان مجازی و بانکداری', titleEn: 'Virtual Counter + banking' },
  { id: 12, titleFa: 'پیام، جستجو، نقشه و پشتیبانی', titleEn: 'Messaging, search, map and support' },
] as const;

const STOP = {
  public: { safeStopFa: 'این دمو فقط اطلاعات عمومی را نشان می‌دهد و پیش از هر ورود، رزرو، خرید یا ارسال متوقف می‌شود.', safeStopEn: 'This demo shows public information only and stops before any sign-in, booking, purchase, or submission.' },
  auth: { safeStopFa: 'این دمو احراز هویت واقعی انجام نمی‌دهد و فقط سطح مشاهده‌شده پس از ورود را بازنمایی می‌کند.', safeStopEn: 'This demo performs no real authentication and only represents the audited signed-in surface.' },
  read: { safeStopFa: 'همه داده‌ها ساختگی یا پوشانده‌اند؛ هیچ رکورد واقعی دریافت، تغییر یا ارسال نمی‌شود.', safeStopEn: 'All data is synthetic or redacted; no real record is fetched, changed, or transmitted.' },
  form: { safeStopFa: 'ورودی‌ها نمایشی‌اند و مسیر پیش از ذخیره، بارگذاری، تأیید یا ارسال واقعی متوقف می‌شود.', safeStopEn: 'Inputs are illustrative and the flow stops before any real save, upload, confirmation, or submission.' },
  money: { safeStopFa: 'اثر و مرز تأیید نمایش داده می‌شود؛ هیچ مبلغ، پرداخت، انتقال یا تعهد مالی اجرا نمی‌شود.', safeStopEn: 'Impact and the confirmation boundary are shown; no amount, payment, transfer, or financial commitment is executed.' },
  location: { safeStopFa: 'هیچ مکان دقیق یا نشانی واقعی درخواست، ذخیره یا ارسال نمی‌شود.', safeStopEn: 'No precise location or real address is requested, stored, or transmitted.' },
  health: { safeStopFa: 'محتوا عمومی و ساختگی است؛ هیچ داده، سند، تشخیص یا اقدام بالینی نمایش یا ارسال نمی‌شود.', safeStopEn: 'Content is generic and synthetic; no health data, document, diagnosis, or clinical action is shown or transmitted.' },
  gate: { safeStopFa: 'درگاه جداگانه فقط معرفی می‌شود؛ این دمو اطلاعات ورود دریافت نمی‌کند و از مرز ورود عبور نمی‌کند.', safeStopEn: 'The separate gateway is identified only; this demo collects no credentials and does not cross the sign-in boundary.' },
  unavailable: { safeStopFa: 'فقط وضعیت دسترسی‌ناپذیر مشاهده‌شده ثبت شده و هیچ گردش‌کار جایگزینی ساخته نشده است.', safeStopEn: 'Only the observed unavailable state is recorded; no replacement workflow has been invented.' },
  message: { safeStopFa: 'نوشتن نمونه ممکن است، اما هیچ پیام واقعی نمایش داده یا ارسال نمی‌شود.', safeStopEn: 'A sample draft may be composed, but no real message is revealed or sent.' },
  notVisible: { safeStopFa: 'این مسیر برای حساب ممیزی‌شده دیده نشد؛ هیچ قابلیت یا محتوایی برای آن جعل نشده است.', safeStopEn: 'This path was not visible for the audited account; no capability or content has been fabricated.' },
} as const;

const core = ['service-surface', 'service-header', 'status-badge', 'safe-stop-notice'] as const satisfies readonly ServiceComponentKey[];
const components = (...keys: ServiceComponentKey[]): ServiceComponentKey[] => [...core, ...keys];
const path = (record: Omit<AuditedServicePath, 'isMock'>): AuditedServicePath => ({ ...record, isMock: true });

export const serviceCatalog: AuditedServicePath[] = [
  path({ ...STOP.gate, id: 'individual-membership', chapter: 1, domain: 'membership', titleFa: 'اشخاص حقیقی', titleEn: 'Individual membership', verificationStatus: 'gated', riskLevel: 'L2', surfaceKind: 'gate', componentKeys: components('external-login-gate', 'membership-form'), icon: 'profile', demoHref: '/segments/individual/membership' }),
  path({ ...STOP.auth, id: 'under-18-membership', chapter: 1, domain: 'membership', titleFa: 'عضویت زیر ۱۸ سال', titleEn: 'Under-18 membership', verificationStatus: 'authenticated', riskLevel: 'L2', surfaceKind: 'form', componentKeys: components('form-shell', 'membership-form'), icon: 'child', demoHref: '/segments/under-18/request' }),
  path({ ...STOP.auth, id: 'organization-membership', chapter: 1, domain: 'membership', titleFa: 'عضویت سازمانی', titleEn: 'Organization membership', verificationStatus: 'authenticated', riskLevel: 'L2', surfaceKind: 'form', componentKeys: components('form-shell', 'membership-form'), icon: 'organization', demoHref: '/segments/organization/request' }),
  path({ ...STOP.read, id: 'membership-request-tracking', chapter: 1, domain: 'membership', titleFa: 'پیگیری درخواست عضویت', titleEn: 'Membership request tracking', verificationStatus: 'authenticated', riskLevel: 'L1', surfaceKind: 'read-only', componentKeys: components('membership-tracking', 'sensitive-placeholder'), icon: 'time', demoHref: '/segments/individual/status' }),

  path({ ...STOP.read, id: 'my-supporters', chapter: 2, domain: 'mhami', titleFa: 'حامیان من', titleEn: 'My supporters', verificationStatus: 'authenticated', riskLevel: 'L1', surfaceKind: 'list', componentKeys: components('filter-bar', 'supporter-list', 'empty-state'), icon: 'family' }),
  path({ ...STOP.form, id: 'become-supporter', chapter: 2, domain: 'mhami', titleFa: 'حامی باش', titleEn: 'Become a supporter', verificationStatus: 'authenticated', riskLevel: 'L2', surfaceKind: 'form', componentKeys: components('form-shell', 'supporter-verification'), icon: 'advocacy' }),
  path({ ...STOP.gate, id: 'association-membership', chapter: 2, domain: 'supporters-association', titleFa: 'عضویت انجمن', titleEn: 'Association membership', verificationStatus: 'gated', riskLevel: 'L2', surfaceKind: 'gate', componentKeys: components('external-login-gate', 'association-card'), icon: 'membership' }),
  path({ ...STOP.money, id: 'zero-fee-loan-request', chapter: 2, domain: 'mhami', titleFa: 'درخواست وام قرض‌الحسنه بدون کارمزد', titleEn: 'Zero-fee interest-free loan request', verificationStatus: 'safe-stop', riskLevel: 'L3', surfaceKind: 'safe-stop', componentKeys: components('form-shell', 'loan-gate', 'action-summary'), icon: 'loan', note: 'توقف پیش از تأیید OTP.' }),
  path({ ...STOP.read, id: 'zero-fee-loan-tracking', chapter: 2, domain: 'mhami', titleFa: 'پیگیری وام بدون کارمزد', titleEn: 'Zero-fee loan tracking', verificationStatus: 'authenticated', riskLevel: 'L1', surfaceKind: 'read-only', componentKeys: components('filter-bar', 'loan-gate', 'sensitive-placeholder'), icon: 'assessment' }),
  path({ ...STOP.read, id: 'association-membership-card', chapter: 2, domain: 'supporters-association', titleFa: 'کارت حق عضویت انجمن', titleEn: 'Association membership card', verificationStatus: 'authenticated', riskLevel: 'L1', surfaceKind: 'read-only', componentKeys: components('association-card', 'sensitive-placeholder'), icon: 'card' }),
  path({ ...STOP.form, id: 'business-license-evaluation', chapter: 2, domain: 'mhami', titleFa: 'احراز، تطبیق و ارزیابی مجوز کاروکسب', titleEn: 'Business-license verification and evaluation', verificationStatus: 'authenticated', riskLevel: 'L2', surfaceKind: 'form', componentKeys: components('form-shell', 'supporter-verification', 'sensitive-placeholder'), icon: 'evidence' }),

  path({ ...STOP.auth, id: 'mbazar-storefront', chapter: 3, domain: 'mbazar', titleFa: 'خانه و فهرست ام‌بازار', titleEn: 'M-Bazar storefront', verificationStatus: 'authenticated', riskLevel: 'L1', surfaceKind: 'marketplace', componentKeys: components('mbazar-existing'), icon: 'seller', demoHref: '/examples/mbazar' }),
  path({ ...STOP.auth, id: 'mbazar-search-categories', chapter: 3, domain: 'mbazar', titleFa: 'جستجو و دسته‌بندی کالا', titleEn: 'Product search and categories', verificationStatus: 'authenticated', riskLevel: 'L1', surfaceKind: 'search', componentKeys: components('filter-bar', 'mbazar-existing'), icon: 'search', demoHref: '/examples/mbazar/search' }),
  path({ ...STOP.read, id: 'mbazar-favorites', chapter: 3, domain: 'mbazar', titleFa: 'علاقه‌مندی‌ها', titleEn: 'Favorites', verificationStatus: 'authenticated', riskLevel: 'L1', surfaceKind: 'list', componentKeys: components('mbazar-existing'), icon: 'favorite', demoHref: '/examples/mbazar/favorites' }),
  path({ ...STOP.read, id: 'mbazar-orders', chapter: 3, domain: 'mbazar', titleFa: 'سفارش‌های من', titleEn: 'My orders', verificationStatus: 'authenticated', riskLevel: 'L1', surfaceKind: 'list', componentKeys: components('mbazar-existing', 'sensitive-placeholder'), icon: 'orders', demoHref: '/examples/mbazar/orders' }),
  path({ ...STOP.read, id: 'mbazar-installments', chapter: 3, domain: 'mbazar', titleFa: 'درخواست‌های اقساطی', titleEn: 'Installment requests', verificationStatus: 'authenticated', riskLevel: 'L1', surfaceKind: 'dashboard', componentKeys: components('mbazar-existing', 'action-summary'), icon: 'credit', demoHref: '/examples/mbazar/installments' }),
  path({ ...STOP.location, id: 'mbazar-addresses', chapter: 3, domain: 'mbazar', titleFa: 'آدرس‌های من / افزودن آدرس', titleEn: 'My addresses / Add address', verificationStatus: 'safe-stop', riskLevel: 'L2', surfaceKind: 'form', componentKeys: components('form-shell', 'mbazar-existing'), icon: 'location', demoHref: '/examples/mbazar/addresses' }),
  path({ ...STOP.read, id: 'mbazar-reviews', chapter: 3, domain: 'mbazar', titleFa: 'نقد و نظرات', titleEn: 'My comments and reviews', verificationStatus: 'authenticated', riskLevel: 'L1', surfaceKind: 'list', componentKeys: components('mbazar-existing'), icon: 'messages', demoHref: '/examples/mbazar/reviews' }),
  path({ ...STOP.money, id: 'mbazar-cart-checkout', chapter: 3, domain: 'mbazar', titleFa: 'سبد خرید و تسویه', titleEn: 'Cart and checkout', verificationStatus: 'safe-stop', riskLevel: 'L3', surfaceKind: 'safe-stop', componentKeys: components('mbazar-existing', 'action-summary'), icon: 'cart', demoHref: '/examples/mbazar/cart' }),
  path({ ...STOP.location, id: 'mbazar-city-address', chapter: 3, domain: 'mbazar', titleFa: 'انتخاب شهر و نشانی خرید', titleEn: 'Choose shopping city/address', verificationStatus: 'safe-stop', riskLevel: 'L2', surfaceKind: 'permission', componentKeys: components('mbazar-existing', 'form-shell'), icon: 'location', demoHref: '/examples/mbazar/checkout?step=delivery' }),
  path({ ...STOP.money, id: 'sat-booth-purchase', chapter: 3, domain: 'sat', titleFa: 'خرید از SAT (غرفه)', titleEn: 'Buy from SAT booth', verificationStatus: 'safe-stop', riskLevel: 'L3', surfaceKind: 'marketplace', componentKeys: components('mbazar-existing', 'action-summary'), icon: 'seller', demoHref: '/seller' }),
  path({ ...STOP.public, id: 'digital-products-category', chapter: 3, domain: 'mbazar', titleFa: 'دسته کالای دیجیتال', titleEn: 'Digital-products category', verificationStatus: 'public', riskLevel: 'L0', surfaceKind: 'marketplace', componentKeys: components('mbazar-existing'), icon: 'product', demoHref: '/examples/mbazar/category/digital' }),

  path({ ...STOP.public, id: 'mamouzesh', chapter: 4, domain: 'learning', titleFa: 'ام‌آموزش', titleEn: 'M-Amouzesh', verificationStatus: 'public', riskLevel: 'L0', surfaceKind: 'search', componentKeys: components('filter-bar', 'provider-search', 'empty-state'), icon: 'education' }),
  path({ ...STOP.public, id: 'mdonap', chapter: 4, domain: 'learning', titleFa: 'ام‌دُناپ', titleEn: 'M-Donap', verificationStatus: 'public', riskLevel: 'L0', surfaceKind: 'search', componentKeys: components('filter-bar', 'provider-search', 'empty-state'), icon: 'learning' }),

  path({ ...STOP.read, id: 'mhesam-transactions', chapter: 5, domain: 'mhesam', titleFa: 'تراکنش‌ها', titleEn: 'Transactions', verificationStatus: 'authenticated', riskLevel: 'L1', surfaceKind: 'list', componentKeys: components('filter-bar', 'transaction-list', 'sensitive-placeholder'), icon: 'reports' }),
  path({ ...STOP.money, id: 'mqr', chapter: 5, domain: 'mhesam', titleFa: 'MQR', titleEn: 'MQR', verificationStatus: 'authenticated', riskLevel: 'L2', surfaceKind: 'permission', componentKeys: components('qr-privacy', 'action-summary'), icon: 'grid', note: 'QR دمو قابل اسکن نیست.' }),
  path({ ...STOP.money, id: 'credit-withdrawal', chapter: 5, domain: 'mhesam', titleFa: 'برداشت اعتبار', titleEn: 'Credit withdrawal', verificationStatus: 'safe-stop', riskLevel: 'L3', surfaceKind: 'form', componentKeys: components('form-shell', 'credit-form', 'action-summary'), icon: 'wallet' }),
  path({ ...STOP.money, id: 'credit-donation', chapter: 5, domain: 'mhesam', titleFa: 'اهدای اعتبار', titleEn: 'Credit donation', verificationStatus: 'safe-stop', riskLevel: 'L3', surfaceKind: 'form', componentKeys: components('form-shell', 'credit-form', 'action-summary'), icon: 'gift' }),
  path({ ...STOP.read, id: 'mhesam-credit', chapter: 5, domain: 'mhesam', titleFa: 'اعتبار ام‌حسام', titleEn: 'M-Hesam credit overview', verificationStatus: 'authenticated', riskLevel: 'L1', surfaceKind: 'dashboard', componentKeys: components('credit-summary', 'sensitive-placeholder'), icon: 'credit' }),
  path({ ...STOP.read, id: 'vouchers', chapter: 5, domain: 'mhesam', titleFa: 'بن‌ها', titleEn: 'Vouchers', verificationStatus: 'authenticated', riskLevel: 'L2', surfaceKind: 'list', componentKeys: components('credit-summary', 'action-summary'), icon: 'gift' }),
  path({ ...STOP.read, id: 'mqr-in-person-purchases', chapter: 5, domain: 'mhesam', titleFa: 'خریدهای حضوری MQR', titleEn: 'In-person MQR purchases', verificationStatus: 'authenticated', riskLevel: 'L1', surfaceKind: 'list', componentKeys: components('filter-bar', 'transaction-list'), icon: 'orders' }),
  path({ ...STOP.money, id: 'maghsat-plus', chapter: 5, domain: 'installments', titleFa: 'ام‌اقساط پلاس', titleEn: 'M-Aghsat Plus', verificationStatus: 'authenticated', riskLevel: 'L3', surfaceKind: 'dashboard', componentKeys: components('finance-dashboard', 'action-summary'), icon: 'credit' }),
  path({ ...STOP.money, id: 'maghsat', chapter: 5, domain: 'installments', titleFa: 'ام‌اقساط', titleEn: 'M-Aghsat', verificationStatus: 'authenticated', riskLevel: 'L3', surfaceKind: 'dashboard', componentKeys: components('finance-dashboard', 'action-summary'), icon: 'calendar' }),
  path({ ...STOP.money, id: 'mnessieh', chapter: 5, domain: 'installments', titleFa: 'ام‌نسیه', titleEn: 'M-Nessieh', verificationStatus: 'authenticated', riskLevel: 'L3', surfaceKind: 'dashboard', componentKeys: components('finance-dashboard', 'action-summary'), icon: 'wallet' }),

  path({ ...STOP.read, id: 'my-contributions', chapter: 6, domain: 'heavenly-resalat', titleFa: 'همیاری‌های من', titleEn: 'My contributions', verificationStatus: 'authenticated', riskLevel: 'L1', surfaceKind: 'list', componentKeys: components('filter-bar', 'contribution-history', 'sensitive-placeholder'), icon: 'advocacy' }),
  path({ ...STOP.money, id: 'heavenly-resalat', chapter: 6, domain: 'heavenly-resalat', titleFa: 'رسالت آسمانی', titleEn: 'Heavenly Resalat', verificationStatus: 'safe-stop', riskLevel: 'L3', surfaceKind: 'safe-stop', componentKeys: components('campaign-card', 'action-summary'), icon: 'goal' }),

  path({ ...STOP.health, id: 'msalamat-public', chapter: 7, domain: 'health', titleFa: 'ام‌سلامت', titleEn: 'M-Salamat public services', verificationStatus: 'public', riskLevel: 'L0', surfaceKind: 'search', componentKeys: components('filter-bar', 'provider-search'), icon: 'health' }),
  path({ ...STOP.health, id: 'my-health', chapter: 7, domain: 'health', titleFa: 'سلامت من', titleEn: 'My Health dashboard', verificationStatus: 'authenticated', riskLevel: 'L1', surfaceKind: 'dashboard', componentKeys: components('health-dashboard', 'sensitive-placeholder'), icon: 'profile' }),
  path({ ...STOP.health, id: 'my-appointments', chapter: 7, domain: 'health', titleFa: 'نوبت‌های من', titleEn: 'My appointments', verificationStatus: 'authenticated', riskLevel: 'L1', surfaceKind: 'list', componentKeys: components('appointment-list', 'empty-state'), icon: 'calendar' }),
  path({ ...STOP.health, id: 'medical-record', chapter: 7, domain: 'health', titleFa: 'پرونده پزشکی', titleEn: 'Medical record', verificationStatus: 'gated', riskLevel: 'L3', surfaceKind: 'gate', componentKeys: components('medical-record-gate', 'external-login-gate', 'sensitive-placeholder'), icon: 'clinic' }),

  path({ ...STOP.public, id: 'mbime-portal', chapter: 8, domain: 'insurance', titleFa: 'ام‌بیمه', titleEn: 'M-Bime portal', verificationStatus: 'public', riskLevel: 'L0', surfaceKind: 'info', componentKeys: components('insurance-portal'), icon: 'insurance' }),
  path({ ...STOP.form, id: 'third-party-insurance', chapter: 8, domain: 'insurance', titleFa: 'بیمه شخص ثالث', titleEn: 'Third-party motor insurance', verificationStatus: 'safe-stop', riskLevel: 'L2', surfaceKind: 'form', componentKeys: components('form-shell', 'vehicle-quote-form'), icon: 'insurance' }),
  path({ ...STOP.form, id: 'comprehensive-insurance', chapter: 8, domain: 'insurance', titleFa: 'بیمه بدنه', titleEn: 'Comprehensive motor insurance', verificationStatus: 'safe-stop', riskLevel: 'L2', surfaceKind: 'form', componentKeys: components('form-shell', 'vehicle-quote-form'), icon: 'security' }),
  path({ ...STOP.form, id: 'motorcycle-insurance', chapter: 8, domain: 'insurance', titleFa: 'بیمه موتورسیکلت', titleEn: 'Motorcycle insurance', verificationStatus: 'safe-stop', riskLevel: 'L2', surfaceKind: 'form', componentKeys: components('form-shell', 'vehicle-quote-form'), icon: 'product' }),
  path({ ...STOP.health, id: 'life-insurance', chapter: 8, domain: 'insurance', titleFa: 'بیمه عمر', titleEn: 'Life insurance', verificationStatus: 'safe-stop', riskLevel: 'L2', surfaceKind: 'form', componentKeys: components('life-plan-selector', 'action-summary'), icon: 'health' }),

  path({ ...STOP.form, id: 'saya', chapter: 9, domain: 'auxiliary', titleFa: 'سایا', titleEn: 'SAYA', verificationStatus: 'public', riskLevel: 'L2', surfaceKind: 'form', componentKeys: components('form-builder-entry', 'action-summary'), icon: 'assessment' }),
  path({ ...STOP.public, id: 'metka', chapter: 9, domain: 'auxiliary', titleFa: 'ام‌اتکا', titleEn: 'M-Etka', verificationStatus: 'public', riskLevel: 'L2', surfaceKind: 'info', componentKeys: components('service-entry-card', 'action-summary'), icon: 'organization' }),
  path({ ...STOP.gate, id: 'merat', chapter: 9, domain: 'auxiliary', titleFa: 'مرآت', titleEn: 'Merat', verificationStatus: 'gated', riskLevel: 'L2', surfaceKind: 'gate', componentKeys: components('external-login-gate', 'service-entry-card'), icon: 'assessment' }),
  path({ ...STOP.public, id: 'icap', chapter: 9, domain: 'auxiliary', titleFa: 'آیکاپ', titleEn: 'iCap', verificationStatus: 'public', riskLevel: 'L2', surfaceKind: 'info', componentKeys: components('service-entry-card', 'action-summary'), icon: 'credit' }),

  path({ ...STOP.unavailable, id: 'your-rahyar', chapter: 10, domain: 'rahyar', titleFa: 'رهیار شما', titleEn: 'Your Rahyar', verificationStatus: 'unavailable', riskLevel: 'L0', surfaceKind: 'unavailable', componentKeys: components('unavailable-state', 'rahyar-unavailable'), icon: 'profile', note: 'در ممیزی 404 مشاهده شد.' }),
  path({ ...STOP.unavailable, id: 'rahyar-id-lookup', chapter: 10, domain: 'rahyar', titleFa: 'استعلام کارت هویتی رهیار', titleEn: 'Rahyar ID-card lookup', verificationStatus: 'unavailable', riskLevel: 'L0', surfaceKind: 'unavailable', componentKeys: components('unavailable-state', 'rahyar-unavailable'), icon: 'evidence', note: 'در ممیزی 404 مشاهده شد.' }),

  path({ ...STOP.public, id: 'virtual-counter', chapter: 11, domain: 'banking', titleFa: 'پیشخوان مجازی رسالت', titleEn: 'Resalat Virtual Counter', verificationStatus: 'public', riskLevel: 'L0', surfaceKind: 'info', componentKeys: components('banking-hub'), icon: 'bank' }),
  path({ ...STOP.money, id: 'current-account-opening', chapter: 11, domain: 'banking', titleFa: 'افتتاح حساب جاری', titleEn: 'Current-account opening', verificationStatus: 'safe-stop', riskLevel: 'L3', surfaceKind: 'form', componentKeys: components('form-shell', 'banking-request', 'action-summary'), icon: 'bank' }),
  path({ ...STOP.money, id: 'resalat-card', chapter: 11, domain: 'banking', titleFa: 'کارت رسالت', titleEn: 'Resalat card', verificationStatus: 'safe-stop', riskLevel: 'L3', surfaceKind: 'form', componentKeys: components('form-shell', 'banking-request', 'action-summary'), icon: 'card' }),
  path({ ...STOP.gate, id: 'satna-transfer', chapter: 11, domain: 'banking', titleFa: 'ساتنا', titleEn: 'SATNA transfer', verificationStatus: 'gated', riskLevel: 'L3', surfaceKind: 'gate', componentKeys: components('external-login-gate', 'action-summary'), icon: 'settlement', note: 'هیچ رابط انتقالی که انجام عملیات را القا کند نمایش داده نمی‌شود.' }),
  path({ ...STOP.money, id: 'child-loan', chapter: 11, domain: 'banking', titleFa: 'وام کودک', titleEn: 'Child loan', verificationStatus: 'safe-stop', riskLevel: 'L3', surfaceKind: 'form', componentKeys: components('form-shell', 'banking-request', 'action-summary'), icon: 'child' }),
  path({ ...STOP.money, id: 'marriage-loan', chapter: 11, domain: 'banking', titleFa: 'وام ازدواج', titleEn: 'Marriage loan', verificationStatus: 'safe-stop', riskLevel: 'L3', surfaceKind: 'form', componentKeys: components('form-shell', 'banking-request', 'action-summary'), icon: 'family' }),
  path({ ...STOP.gate, id: 'all-banking-services', chapter: 11, domain: 'banking', titleFa: 'همه خدمات بانکی', titleEn: 'All banking services', verificationStatus: 'gated', riskLevel: 'L3', surfaceKind: 'gate', componentKeys: components('external-login-gate', 'banking-hub'), icon: 'grid' }),
  path({ ...STOP.public, id: 'mobile-banking', chapter: 11, domain: 'banking', titleFa: 'همراه‌بانک', titleEn: 'Mobile banking', verificationStatus: 'public', riskLevel: 'L0', surfaceKind: 'info', componentKeys: components('download-card'), icon: 'product' }),
  path({ ...STOP.gate, id: 'internet-banking', chapter: 11, domain: 'banking', titleFa: 'اینترنت‌بانک', titleEn: 'Internet banking', verificationStatus: 'gated', riskLevel: 'L3', surfaceKind: 'gate', componentKeys: components('external-login-gate', 'banking-hub'), icon: 'lock' }),

  path({ ...STOP.message, id: 'mpayam', chapter: 12, domain: 'communication', titleFa: 'ام‌پیام', titleEn: 'M-Payam', verificationStatus: 'authenticated', riskLevel: 'L1', surfaceKind: 'list', componentKeys: components('conversation-list', 'sensitive-placeholder'), icon: 'messages' }),
  path({ ...STOP.message, id: 'mpayam-plus', chapter: 12, domain: 'communication', titleFa: 'ام‌پیام پلاس', titleEn: 'M-Payam Plus', verificationStatus: 'authenticated', riskLevel: 'L1', surfaceKind: 'list', componentKeys: components('conversation-list', 'sensitive-placeholder'), icon: 'messages' }),
  path({ ...STOP.message, id: 'rasan-advisor', chapter: 12, domain: 'communication', titleFa: 'رسان / مشاوره آنلاین', titleEn: 'Rasan / online advisor', verificationStatus: 'public', riskLevel: 'L2', surfaceKind: 'safe-stop', componentKeys: components('advisor-entry', 'message-gate'), icon: 'assistant' }),
  path({ ...STOP.public, id: 'global-search', chapter: 12, domain: 'communication', titleFa: 'جستجو', titleEn: 'Search', verificationStatus: 'public', riskLevel: 'L0', surfaceKind: 'search', componentKeys: components('search-entry', 'empty-state'), icon: 'search' }),
  path({ ...STOP.location, id: 'map', chapter: 12, domain: 'location', titleFa: 'نقشه', titleEn: 'Map', verificationStatus: 'safe-stop', riskLevel: 'L2', surfaceKind: 'permission', componentKeys: components('map-gate', 'action-summary'), icon: 'location' }),
  path({ ...STOP.message, id: 'support-chat', chapter: 12, domain: 'support', titleFa: 'گفتگوی پشتیبانی', titleEn: 'Support chat', verificationStatus: 'safe-stop', riskLevel: 'L2', surfaceKind: 'safe-stop', componentKeys: components('support-composer', 'message-gate'), icon: 'support' }),
  path({ ...STOP.money, id: 'arbaeen-pavilion', chapter: 12, domain: 'contribution', titleFa: 'موکب اربعین تا اربعین', titleEn: 'Arbaeen-to-Arbaeen pavilion', verificationStatus: 'safe-stop', riskLevel: 'L3', surfaceKind: 'safe-stop', componentKeys: components('campaign-card', 'action-summary'), icon: 'advocacy' }),
  path({ ...STOP.public, id: 'mresalat-app-download', chapter: 12, domain: 'communication', titleFa: 'دانلود اپلیکیشن ام‌رسالت', titleEn: 'MResalat app download', verificationStatus: 'public', riskLevel: 'L0', surfaceKind: 'info', componentKeys: components('download-card'), icon: 'product' }),
  path({ ...STOP.notVisible, id: 'memorial', chapter: 12, domain: 'communication', titleFa: 'یادبود', titleEn: 'Memorial', verificationStatus: 'not-visible', riskLevel: 'L0', surfaceKind: 'unavailable', componentKeys: components('not-visible-state'), icon: 'help' }),
];

export const serviceCatalogById = Object.fromEntries(serviceCatalog.map((item) => [item.id, item])) as Record<string, AuditedServicePath>;
export const catalogDomains = [...new Set(serviceCatalog.map((item) => item.domain))].sort();
