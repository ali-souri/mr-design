import type { CartValidationIssue, InstallmentEligibility, InstallmentEligibilityStatus, InstallmentPlan, InstallmentRequest, MBazarAddress, MBazarCart, MBazarCategory, MBazarProduct, MarketplaceContextState } from './types';

export const marketplaceContext: MarketplaceContextState = {
  destination: 'تهران، سعادت‌آباد',
  store: 'همه فروشگاه‌ها',
};

export const mbazarCategories: MBazarCategory[] = [
  { id: 'digital', slug: 'digital', title: 'کالای دیجیتال', description: 'موبایل، لپ‌تاپ و لوازم جانبی', icon: 'product', tone: 'blue' },
  { id: 'home', slug: 'home-appliances', title: 'خانه و آشپزخانه', description: 'لوازم کاربردی خانه', icon: 'home', tone: 'cyan' },
  { id: 'school', slug: 'school-office', title: 'کتاب و لوازم‌تحریر', description: 'مدرسه، دانشگاه و محل کار', icon: 'education', tone: 'violet' },
  { id: 'health', slug: 'health-beauty', title: 'سلامت و زیبایی', description: 'مراقبت شخصی و بهداشت', icon: 'health', tone: 'cyan' },
  { id: 'food', slug: 'food-grocery', title: 'خواربار و خشکبار', description: 'کالاهای روزمره و خوراکی', icon: 'gift', tone: 'amber' },
  { id: 'culture', slug: 'culture-learning', title: 'فرهنگ و یادگیری', description: 'کتاب و محصولات آموزشی', icon: 'learning', tone: 'violet' },
  { id: 'tools', slug: 'tools-equipment', title: 'ابزار و تجهیزات', description: 'ابزارهای خانگی و حرفه‌ای', icon: 'settings', tone: 'blue' },
  { id: 'other', slug: 'other', title: 'سایر کالاها', description: 'مشاهده همه گروه‌های کالا', icon: 'grid', tone: 'cyan' },
];

const sellerA = { id: 'resalat-market', name: 'فروشگاه ام‌بازار' };
const sellerB = { id: 'digital-house', name: 'خانه دیجیتال' };
const sellerC = { id: 'green-life', name: 'زندگی سبز' };

export const mbazarProducts: MBazarProduct[] = [
  { id: 'laptop-aria-14', slug: 'laptop-aria-14', title: 'لپ‌تاپ ۱۴ اینچی آریا، مناسب کار روزمره', image: '/m-bazar/laptop.png', imageAlt: 'لپ‌تاپ نقره‌ای روی میز', seller: sellerB, price: { current: 46800000, previous: 49900000, currency: 'IRT' }, discountPercent: 6, availability: 'limited', installmentEligible: true, categoryId: 'digital', rating: 4.4, description: 'یک لپ‌تاپ سبک برای کارهای اداری، مطالعه و استفاده روزمره.', specifications: [{ label: 'نمایشگر', value: '۱۴ اینچ Full HD' }, { label: 'حافظه', value: '۵۱۲ گیگابایت SSD' }, { label: 'رم', value: '۱۶ گیگابایت' }, { label: 'وزن', value: '۱٫۴ کیلوگرم' }], colors: ['نقره‌ای', 'خاکستری'] },
  { id: 'phone-nova-12', slug: 'phone-nova-12', title: 'گوشی موبایل نوا ۱۲ با حافظه ۲۵۶ گیگابایت', image: '/m-bazar/phone.png', imageAlt: 'گوشی موبایل هوشمند', seller: sellerA, price: { current: 28900000, previous: 31500000, currency: 'IRT' }, discountPercent: 8, availability: 'available', installmentEligible: true, categoryId: 'digital', rating: 4.6, description: 'گوشی خوش‌دست با نمایشگر روشن و شارژدهی مناسب استفاده روزمره.', specifications: [{ label: 'حافظه', value: '۲۵۶ گیگابایت' }, { label: 'دوربین اصلی', value: '۵۰ مگاپیکسل' }, { label: 'شبکه', value: '5G' }], colors: ['مشکی', 'آبی'] },
  { id: 'headphone-wave', slug: 'headphone-wave', title: 'هدفون بی‌سیم ویو با حذف نویز', image: '/m-bazar/headphones.png', imageAlt: 'هدفون بی‌سیم مشکی', seller: sellerB, price: { current: 3850000, currency: 'IRT' }, availability: 'available', categoryId: 'digital', rating: 4.2, description: 'هدفون روگوشی سبک با اتصال بی‌سیم و میکروفن داخلی.', specifications: [{ label: 'شارژدهی', value: 'تا ۲۶ ساعت' }, { label: 'اتصال', value: 'بلوتوث ۵٫۳' }] },
  { id: 'school-pack', slug: 'school-pack', title: 'بسته کامل لوازم‌تحریر مدرسه، ۱۸ تکه', image: '/m-bazar/stationery.png', imageAlt: 'دفتر و لوازم‌تحریر رنگی', seller: sellerA, price: { current: 890000, previous: 990000, currency: 'IRT' }, discountPercent: 10, availability: 'available', installmentEligible: false, categoryId: 'school', rating: 4.5, description: 'اقلام ضروری مدرسه در یک بسته کاربردی.', specifications: [{ label: 'تعداد اقلام', value: '۱۸ تکه' }, { label: 'مناسب', value: 'دوره ابتدایی' }] },
  { id: 'coffee-maker', slug: 'coffee-maker', title: 'قهوه‌ساز خانگی با مخزن ۱٫۲ لیتری', image: '/m-bazar/coffee-maker.png', imageAlt: 'قهوه‌ساز و فنجان قهوه', seller: sellerC, price: { current: 7290000, previous: 8100000, currency: 'IRT' }, discountPercent: 10, availability: 'limited', installmentEligible: true, categoryId: 'home', rating: 4.3, description: 'قهوه‌ساز جمع‌وجور برای دم‌آوری روزانه.', specifications: [{ label: 'ظرفیت', value: '۱٫۲ لیتر' }, { label: 'توان', value: '۹۰۰ وات' }] },
  { id: 'nuts-box', slug: 'nuts-box', title: 'جعبه خشکبار ممتاز چهار مغز، ۸۰۰ گرم', image: '/m-bazar/nuts.png', imageAlt: 'ظرفی از مغزها و خشکبار', seller: sellerC, price: { current: 1280000, currency: 'IRT' }, availability: 'unavailable', categoryId: 'food', rating: 4.7, description: 'ترکیب چهار مغز در بسته‌بندی مناسب هدیه و مصرف روزانه.', specifications: [{ label: 'وزن', value: '۸۰۰ گرم' }, { label: 'نوع بسته‌بندی', value: 'جعبه‌ای' }] },
];

export const recentSearches = ['خشکبار', 'لپ‌تاپ کاری', 'لوازم مدرسه'];
export const discoveryPrompts = ['یه لپ‌تاپ برای کار تا ۵۰ میلیون می‌خوام', 'برای مدرسه بچه‌ام چی لازم دارم؟', 'محصولات قابل درخواست اقساطی رو نشون بده'];

export function formatMBazarPrice(value: number) {
  return new Intl.NumberFormat('fa-IR').format(value);
}

export function productById(id: string) {
  return mbazarProducts.find((product) => product.id === id || product.slug === id) ?? mbazarProducts[0];
}

export function categoryBySlug(slug: string) {
  return mbazarCategories.find((category) => category.slug === slug || category.id === slug) ?? mbazarCategories[0];
}

export const initialMBazarCart: MBazarCart = {
  id: 'demo-cart-b', currency: 'IRT', items: [
    { productId: 'phone-nova-12', sellerId: 'resalat-market', quantity: 1, selected: true },
    { productId: 'coffee-maker', sellerId: 'green-life', quantity: 1, selected: true },
    { productId: 'school-pack', sellerId: 'resalat-market', quantity: 1, selected: true },
  ],
};

export const productStock: Record<string, number> = { 'laptop-aria-14': 2, 'phone-nova-12': 5, 'headphone-wave': 4, 'school-pack': 8, 'coffee-maker': 2, 'nuts-box': 10 };
export const cartValidationRules: Partial<Record<string, CartValidationIssue[]>> = {
  'laptop-aria-14': ['limited-stock'],
  'coffee-maker': ['price-changed', 'limited-stock'],
  'school-pack': ['installment-unavailable'],
  'nuts-box': ['out-of-stock'],
};

export const mbazarAddresses: MBazarAddress[] = [
  { id: 'home', title: 'خانه', recipient: 'حسین محمدی', address: 'تهران، سعادت‌آباد، بلوار دریا، پلاک ۲۴', postalCode: '۱۹۹۸۷۶۵۴۳۲', phone: '۰۹۱۲•••۳۴۱۲' },
  { id: 'work', title: 'محل کار', recipient: 'حسین محمدی', address: 'تهران، میدان ونک، خیابان ملاصدرا، پلاک ۸', postalCode: '۱۹۶۷۸۴۵۲۱۰', phone: '۰۹۱۲•••۳۴۱۲' },
];

export const installmentPlans: InstallmentPlan[] = [
  { id: 'plan-6', label: 'شش‌ماهه سبک', months: 6, downPayment: 12000000, monthlyPayment: 4300000, totalPayment: 37800000, fee: 0 },
  { id: 'plan-12', label: 'دوازده‌ماهه متعادل', months: 12, downPayment: 10000000, monthlyPayment: 2500000, totalPayment: 40000000, fee: 1100000 },
  { id: 'plan-18', label: 'هجده‌ماهه با قسط کمتر', months: 18, downPayment: 8000000, monthlyPayment: 1950000, totalPayment: 43100000, fee: 2500000 },
];

export const eligibilityResults: Record<InstallmentEligibilityStatus, InstallmentEligibility> = {
  eligible: { status: 'eligible', reasonCodes: ['membership-active', 'identity-verified'], nextAction: 'انتخاب طرح اقساط' },
  conditional: { status: 'conditional', reasonCodes: ['membership-confirmation-required'], nextAction: 'تکمیل تأیید عضویت' },
  unknown: { status: 'unknown', reasonCodes: ['manual-review-required'], nextAction: 'درخواست بررسی بیشتر' },
  ineligible: { status: 'ineligible', reasonCodes: ['purchase-not-supported'], nextAction: 'بازگشت به پرداخت نقدی' },
};

export const installmentRequests: InstallmentRequest[] = [
  { id: 'MBI-1405-1908', reference: 'MBI-1405-1908', productId: 'phone-nova-12', status: 'reviewing', statusLabel: 'در انتظار بررسی', lastUpdate: 'همین حالا', nextAction: 'فعلاً اقدامی لازم نیست؛ نتیجه بررسی در همین صفحه نمایش داده می‌شود', progress: 24, planId: 'plan-12' },
  { id: 'MBI-1405-1842', reference: 'MBI-1405-1842', productId: 'phone-nova-12', status: 'action-required', statusLabel: 'نیازمند تأیید طرح', lastUpdate: 'امروز، ۱۰:۳۵', nextAction: 'طرح پیشنهادی را مرور و تأیید کنید', progress: 58, planId: 'plan-12' },
  { id: 'MBI-1405-1771', reference: 'MBI-1405-1771', productId: 'laptop-aria-14', status: 'reviewing', statusLabel: 'در حال بررسی', lastUpdate: 'دیروز، ۱۶:۲۰', nextAction: 'فعلاً اقدامی لازم نیست', progress: 38 },
  { id: 'MBI-1405-1690', reference: 'MBI-1405-1690', productId: 'coffee-maker', status: 'ready', statusLabel: 'قابل ادامه خرید', lastUpdate: '۲۱ مرداد ۱۴۰۵', nextAction: 'خرید را تا پایان امروز تکمیل کنید', progress: 82, planId: 'plan-6' },
  { id: 'MBI-1405-1426', reference: 'MBI-1405-1426', productId: 'phone-nova-12', status: 'completed', statusLabel: 'پایان‌یافته', lastUpdate: '۱۲ مرداد ۱۴۰۵', nextAction: 'اقدامی لازم نیست', progress: 100, planId: 'plan-12' },
];

export function calculateCart(cart: MBazarCart) {
  const selected = cart.items.filter((item) => item.selected).map((item) => ({ item, product: productById(item.productId) }));
  const subtotal = selected.reduce((sum, row) => sum + (row.product.price.previous ?? row.product.price.current) * row.item.quantity, 0);
  const currentTotal = selected.reduce((sum, row) => sum + row.product.price.current * row.item.quantity, 0);
  const discount = subtotal - currentTotal;
  const delivery = selected.length ? 145000 : 0;
  return { itemCount: selected.reduce((sum, row) => sum + row.item.quantity, 0), subtotal, discount, delivery, total: currentTotal + delivery };
}

export function installmentRequestById(id: string) { return installmentRequests.find((request) => request.id === id) ?? installmentRequests[0]; }
