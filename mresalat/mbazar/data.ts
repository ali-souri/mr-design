import type { CartValidationIssue, InstallmentEligibility, InstallmentEligibilityStatus, InstallmentPlan, InstallmentRequest, MBazarAddress, MBazarCart, MBazarCategory, MBazarDomainSnapshot, MBazarFulfillmentStatus, MBazarOrder, MBazarOrderItem, MBazarProduct, MBazarSeller, MBazarTrackingMilestone, MarketplaceContextState } from './types';

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

export const mbazarSellers: MBazarSeller[] = [
  { id: 'resalat-market', name: 'فروشگاه ام‌بازار', status: 'marketplace-provider', rating: 4.6, reviewCount: 284, region: 'تهران', description: 'عرضه‌کننده کالاهای روزمره و دیجیتال در بستر ام‌بازار.' },
  { id: 'digital-house', name: 'خانه دیجیتال', status: 'marketplace-provider', rating: 4.4, reviewCount: 96, region: 'تهران و البرز', description: 'کالاهای دیجیتال منتخب با اطلاعات محصول ثبت‌شده در ام‌بازار.' },
  { id: 'green-life', name: 'زندگی سبز', status: 'marketplace-provider', reviewCount: 0, region: 'ارسال سراسری', description: 'محصولات خانه و خوراکی با ارسال مستقل فروشنده.' },
];
const [sellerA, sellerB, sellerC] = mbazarSellers;

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
  { id: 'home', title: 'خانه', recipient: 'مهدی رضایی', province: 'تهران', city: 'تهران', address: 'سعادت‌آباد، بلوار دریا، پلاک نمایشی ۲۴', postalCode: '۱۹۹۸۷۶۵۴۳۲', phone: '۰۹۱۲•••۳۴۱۲', isDefault: true },
  { id: 'work', title: 'محل کار', recipient: 'مهدی رضایی', province: 'تهران', city: 'تهران', address: 'میدان ونک، خیابان ملاصدرا، پلاک نمایشی ۸', postalCode: '۱۹۶۷۸۴۵۲۱۰', phone: '۰۹۱۲•••۳۴۱۲', isDefault: false },
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

const trackingTitles = ['ثبت سفارش', 'تأیید فروشنده', 'آماده‌سازی', 'تحویل به ارسال', 'در مسیر', 'تحویل شده'];
function milestones(current: number): MBazarTrackingMilestone[] {
  return trackingTitles.map((title, index) => ({ id: `step-${index}`, title, status: index < current ? 'completed' : index === current ? 'current' : 'upcoming' }));
}
function orderItem(productId: string, quantity = 1, unitPrice?: number): MBazarOrderItem {
  const product = productById(productId);
  return { id: `${productId}-${quantity}`, productId, sellerId: product.seller.id, title: product.title, image: product.image, imageAlt: product.imageAlt, unitPrice: unitPrice ?? product.price.current, quantity };
}
function group(id: string, status: MBazarFulfillmentStatus, statusLabel: string, nextStep: string, itemIds: string[], current: number) {
  return { id: `group-${id}`, seller: mbazarSellers.find((seller) => seller.id === id)!, status, statusLabel, nextStep, itemIds, milestones: milestones(current) };
}
const homeAddress = mbazarAddresses[0];
export const initialMBazarOrders: MBazarOrder[] = [
  { id: 'order-2841', reference: 'MBO-1405-2841', createdAt: '۲۴ مرداد ۱۴۰۵', paymentMode: 'cash', status: 'preparing', items: [orderItem('phone-nova-12', 1, 28900000), orderItem('coffee-maker', 1, 6990000)], sellerGroups: [group('resalat-market', 'preparing', 'در حال آماده‌سازی', 'تحویل به سرویس ارسال', ['phone-nova-12-1'], 2), group('green-life', 'in-transit', 'ارسال شده', 'تحویل مرسوله', ['coffee-maker-1'], 4)], totals: { subtotal: 35890000, discount: 0, delivery: 145000, total: 36035000 }, deliveryAddress: homeAddress, deliveryMethod: 'ارسال عادی', nextAction: { label: 'مشاهده پیشرفت', href: '/examples/mbazar/orders/order-2841', kind: 'track' }, isNew: true },
  { id: 'order-2716', reference: 'MBO-1405-2716', createdAt: '۱۸ مرداد ۱۴۰۵', paymentMode: 'cash', status: 'shipped', items: [orderItem('laptop-aria-14', 1, 46800000)], sellerGroups: [group('digital-house', 'in-transit', 'در مسیر تحویل', 'دریافت مرسوله', ['laptop-aria-14-1'], 4)], totals: { subtotal: 49900000, discount: 3100000, delivery: 145000, total: 46945000 }, deliveryAddress: homeAddress, deliveryMethod: 'ارسال عادی', nextAction: { label: 'پیگیری مرسوله', href: '/examples/mbazar/orders/order-2716', kind: 'track' } },
  { id: 'order-2480', reference: 'MBO-1405-2480', createdAt: '۳ مرداد ۱۴۰۵', paymentMode: 'installment', status: 'delivered', items: [orderItem('phone-nova-12', 1, 27900000), orderItem('headphone-wave', 1, 3750000)], sellerGroups: [group('resalat-market', 'delivered', 'تحویل شده', 'اقدامی لازم نیست', ['phone-nova-12-1'], 5), group('digital-house', 'delivered', 'تحویل شده', 'اقدامی لازم نیست', ['headphone-wave-1'], 5)], totals: { subtotal: 31650000, discount: 0, delivery: 145000, total: 31795000 }, deliveryAddress: homeAddress, deliveryMethod: 'ارسال عادی', nextAction: { label: 'ثبت نظر', href: '/examples/mbazar/reviews/new?order=order-2480&product=phone-nova-12', kind: 'review' }, reviewedProductIds: ['headphone-wave'] },
  { id: 'order-2319', reference: 'MBO-1405-2319', createdAt: '۲۰ تیر ۱۴۰۵', paymentMode: 'cash', status: 'cancelled', items: [orderItem('school-pack', 1, 890000)], sellerGroups: [group('resalat-market', 'failed', 'لغو شده', 'در صورت نیاز با پشتیبانی گفت‌وگو کنید', ['school-pack-1'], 1)], totals: { subtotal: 890000, discount: 0, delivery: 0, total: 890000 }, deliveryAddress: homeAddress, deliveryMethod: 'ارسال عادی', cancellationReason: 'عدم تأیید موجودی توسط فروشنده', nextAction: { label: 'پشتیبانی سفارش', href: '/examples/mbazar/support/new?order=order-2319', kind: 'support' } },
  { id: 'order-2264', reference: 'MBO-1405-2264', createdAt: '۱۲ تیر ۱۴۰۵', paymentMode: 'cash', status: 'issue', items: [orderItem('coffee-maker', 1, 7290000)], sellerGroups: [group('green-life', 'failed', 'نیازمند بررسی تحویل', 'ثبت جزئیات برای پشتیبانی', ['coffee-maker-1'], 4)], totals: { subtotal: 7290000, discount: 0, delivery: 145000, total: 7435000 }, deliveryAddress: homeAddress, deliveryMethod: 'ارسال فروشنده', issueSummary: 'تحویل مرسوله در بازه اعلام‌شده تأیید نشده است.', nextAction: { label: 'پیگیری با پشتیبانی', href: '/examples/mbazar/support/new?order=order-2264', kind: 'support' }, isNew: true },
];

export const initialMBazarDomain: MBazarDomainSnapshot = {
  favorites: [
    { productId: 'laptop-aria-14', savedPrice: 49900000, savedAt: '۲۰ مرداد ۱۴۰۵', savedInstallmentEligible: true },
    { productId: 'coffee-maker', savedPrice: 6990000, savedAt: '۱۹ مرداد ۱۴۰۵', savedInstallmentEligible: true },
    { productId: 'nuts-box', savedPrice: 1180000, savedAt: '۱۷ مرداد ۱۴۰۵', savedInstallmentEligible: true },
  ],
  addresses: mbazarAddresses,
  orders: initialMBazarOrders,
  reviews: [{ id: 'review-1', orderId: 'order-2480', productId: 'headphone-wave', rating: 4, text: 'کیفیت صدا مناسب است و اتصال پایداری دارد.', createdAt: '۸ مرداد ۱۴۰۵', pros: 'اتصال پایدار', cons: 'کیف کمی کوچک است' }],
  supportCases: [{ id: 'MBS-1405-0412', orderId: 'order-2264', type: 'delivery-delay', status: 'in-review', createdAt: '۱۳ تیر ۱۴۰۵', summary: 'پیگیری تأخیر تحویل مرسوله فروشگاه زندگی سبز', sellerId: 'green-life', nextAction: 'پاسخ کارشناس را در همین صفحه دنبال کنید' }],
};

export function orderById(id: string) { return initialMBazarOrders.find((order) => order.id === id || order.reference === id) ?? initialMBazarOrders[0]; }
export function sellerById(id: string) { return mbazarSellers.find((seller) => seller.id === id) ?? mbazarSellers[0]; }
