import type { MResalatIconName } from '@/mresalat/core/MResalatIcon';

export type ServiceSourceType = 'live-mresalat' | 'project-documented' | 'conceptual';
export type ServiceIdentitySource = 'official-asset' | 'mresalat-system-designed';

export type MResalatServiceAction = {
  label: string;
  icon: MResalatIconName;
  evidence: 'homepage-visible' | 'service-route-visible' | 'login-visible';
};

export type MResalatService = {
  id: string;
  slug: string;
  titleFa: string;
  titleEn?: string;
  description: string;
  category: 'membership' | 'support' | 'commerce' | 'learning' | 'wellbeing' | 'operations' | 'communication';
  identity: {
    source: ServiceIdentitySource;
    asset?: string;
    assetSourceUrl?: string;
    glyph?: string;
    accent: string;
  };
  actions: MResalatServiceAction[];
  assistantPrompt: string;
  example: { label: string; value: string; detail: string; isMock: true };
  source: {
    type: ServiceSourceType;
    reference: string;
    reviewedAt: '2026-08-22';
    verification: 'public-visible' | 'login-visible-only';
    note?: string;
  };
};

type LiveServiceInput = Omit<MResalatService, 'source' | 'example'> & {
  example: Omit<MResalatService['example'], 'isMock'>;
  reference?: string;
  sourceNote?: string;
};

const live = ({ reference, sourceNote, example, ...service }: LiveServiceInput): MResalatService => ({
  ...service,
  example: { ...example, isMock: true },
  source: {
    type: 'live-mresalat',
    reference: reference ?? 'https://www.mresalat.ir/fa',
    reviewedAt: '2026-08-22',
    verification: 'public-visible',
    note: sourceNote,
  },
});

export const ecosystemServices: MResalatService[] = [
  live({
    id: 'membership', slug: 'membership', titleFa: 'عضویت ام‌رسالت', titleEn: 'membership', category: 'membership',
    description: 'عضویت برای اشخاص حقیقی، کاربران زیر ۱۸ سال و سازمان‌ها، همراه با پیگیری درخواست.',
    identity: { source: 'official-asset', asset: '/service-identities/membership.svg', assetSourceUrl: 'https://www.mresalat.ir/icons/mresalat-home/membership-request.svg', accent: '#0a72b8' },
    actions: [
      { label: 'اشخاص حقیقی', icon: 'profile', evidence: 'homepage-visible' }, { label: 'عضویت زیر ۱۸ سال', icon: 'membership', evidence: 'homepage-visible' },
      { label: 'عضویت سازمانی', icon: 'organization', evidence: 'homepage-visible' }, { label: 'پیگیری درخواست', icon: 'time', evidence: 'homepage-visible' },
    ],
    assistantPrompt: 'برای شروع عضویت یا پیگیری درخواست چه کمکی می‌خواهید؟',
    example: { label: 'نمونه وضعیت درخواست', value: 'در حال بررسی مدارک', detail: 'داده نمایشی؛ پیگیری درخواست در محصول زنده قابل مشاهده است.' },
    sourceNote: 'چهار اقدام مستقیماً در گروه عضویت صفحه اصلی دیده شدند.',
  }),
  live({
    id: 'mhami', slug: 'mhami', titleFa: 'ام‌حامی', titleEn: 'm-hami', category: 'support',
    description: 'بخش حمایتی اکوسیستم با دو ورودی روشن برای دیدن حامیان یا حامی شدن.',
    identity: { source: 'official-asset', asset: '/service-identities/mhami.svg', assetSourceUrl: 'https://www.mresalat.ir/icons/mresalat-home/mhami-myhami.svg', accent: '#0a78b6' },
    actions: [{ label: 'حامیان من', icon: 'advocacy', evidence: 'homepage-visible' }, { label: 'حامی باش', icon: 'add', evidence: 'homepage-visible' }],
    assistantPrompt: 'می‌خواهید حامیان خود را ببینید یا مسیر «حامی باش» را شروع کنید؟',
    example: { label: 'نمونه رکورد حمایتی', value: '۱ حمایت فعال', detail: 'داده نمایشی؛ فقط عملکردهای عمومیِ تأییدشده بازنمایی شده‌اند.' },
  }),
  live({
    id: 'supporters-association', slug: 'supporters-association', titleFa: 'انجمن حامیان', titleEn: 'supporters-association', category: 'support',
    description: 'انجمن حامیان فرهنگ قرض‌الحسنه و کارآفرینی اجتماعی با عضویت و وام بدون کارمزد.',
    identity: { source: 'official-asset', asset: '/service-identities/supporters-association.svg', assetSourceUrl: 'https://www.mresalat.ir/icons/mresalat-home/hagh.svg', accent: '#1374af' },
    actions: [
      { label: 'عضویت انجمن', icon: 'membership', evidence: 'homepage-visible' }, { label: 'درخواست وام قرض‌الحسنه بدون کارمزد', icon: 'loan', evidence: 'homepage-visible' },
      { label: 'پیگیری درخواست وام قرض‌الحسنه بدون کارمزد', icon: 'time', evidence: 'homepage-visible' },
    ],
    assistantPrompt: 'برای عضویت انجمن، درخواست وام یا پیگیری آن راهنمایی می‌خواهید؟',
    example: { label: 'نمونه وضعیت درخواست وام', value: 'ثبت اولیه انجام شد', detail: 'داده نمایشی و بدون اتصال به سامانه تولید.' },
  }),
  live({
    id: 'mbazar', slug: 'mbazar', titleFa: 'ام‌بازار', titleEn: 'm-bazar', category: 'commerce',
    description: 'بازار اکوسیستم؛ مسیر عمومی آن سفارش‌ها، دسته‌بندی‌ها، تنظیمات و درخواست‌های اقساطی را نشان می‌دهد.',
    identity: { source: 'official-asset', asset: '/service-identities/mbazar.svg', assetSourceUrl: 'https://www.mresalat.ir/icons/mresalat-home/mbazar.svg', accent: '#18a7b4' },
    actions: [
      { label: 'سفارشات من', icon: 'orders', evidence: 'service-route-visible' }, { label: 'دسته‌بندی‌ها', icon: 'grid', evidence: 'service-route-visible' },
      { label: 'تنظیمات ام‌بازار', icon: 'settings', evidence: 'service-route-visible' }, { label: 'درخواست‌های اقساطی', icon: 'credit', evidence: 'service-route-visible' },
    ],
    assistantPrompt: 'برای سفارش‌ها، دسته‌بندی کالا یا درخواست اقساطی چه کمکی می‌خواهید؟',
    example: { label: 'نمونه سفارش', value: 'در انتظار آماده‌سازی', detail: 'وضعیت نمایشی؛ وجود «سفارشات من» در مسیر عمومی تأیید شد.' },
    reference: 'https://www.mresalat.ir/fa/mbazar', sourceNote: 'منوی مسیر عمومی ام‌بازار نیز بازبینی شد.',
  }),
  live({
    id: 'mamoozesh', slug: 'mamoozesh', titleFa: 'آموزش', titleEn: 'learning', category: 'learning',
    description: 'گروه آموزشی فعلی با دو مقصد ام‌آموزش و ام‌دُناپ.',
    identity: { source: 'official-asset', asset: '/service-identities/mamoozesh.svg', assetSourceUrl: 'https://www.mresalat.ir/icons/new-mamozesh.svg', accent: '#087d88' },
    actions: [{ label: 'ام‌آموزش', icon: 'education', evidence: 'homepage-visible' }, { label: 'ام‌دُناپ', icon: 'learning', evidence: 'homepage-visible' }],
    assistantPrompt: 'می‌خواهید وارد ام‌آموزش شوید یا ام‌دُناپ را باز کنید؟',
    example: { label: 'مقصدهای عمومی', value: '۲ سامانه', detail: 'جزئیات دوره‌ها پشت مقصدهای مرتبط است و اینجا ادعا نشده.' },
  }),
  live({
    id: 'mhesam', slug: 'mhesam', titleFa: 'حسابداری اعضا', titleEn: 'member-accounting', category: 'operations',
    description: 'گروه حسابداری اعضا با ورودی ام‌حسام شخصی.',
    identity: { source: 'official-asset', asset: '/service-identities/mhesam.svg', assetSourceUrl: 'https://www.mresalat.ir/icons/mresalat-home/personal-mhesam.svg', accent: '#166db0' },
    actions: [{ label: 'ام‌حسام شخصی', icon: 'reports', evidence: 'homepage-visible' }],
    assistantPrompt: 'برای ورود به ام‌حسام شخصی چه راهنمایی لازم دارید؟',
    example: { label: 'ورودی تأییدشده', value: 'ام‌حسام شخصی', detail: 'عملکرد داخلی سامانه بدون ورود قابل بررسی نبود.' },
  }),
  live({
    id: 'heavenly-mission', slug: 'heavenly-mission', titleFa: 'رسالت آسمانی', titleEn: 'heavenly-mission', category: 'support',
    description: 'بخش همیاری اجتماعی با دسترسی به همیاری‌های کاربر و رسالت آسمانی.',
    identity: { source: 'official-asset', asset: '/service-identities/heavenly-mission.svg', assetSourceUrl: 'https://www.mresalat.ir/icons/mresalat-home/social-responsibility-svg.svg', accent: '#1592a6' },
    actions: [{ label: 'همیاری‌های من', icon: 'advocacy', evidence: 'homepage-visible' }, { label: 'رسالت آسمانی', icon: 'goal', evidence: 'homepage-visible' }],
    assistantPrompt: 'می‌خواهید همیاری‌های خود را ببینید یا وارد رسالت آسمانی شوید؟',
    example: { label: 'نمونه همیاری', value: 'آخرین وضعیت ثبت‌شده', detail: 'نمایش نمونه است و مبلغ یا اطلاعات واقعی کاربر ندارد.' },
  }),
  live({
    id: 'msalamat', slug: 'msalamat', titleFa: 'ام‌سلامت', titleEn: 'm-salamat', category: 'wellbeing',
    description: 'دستیار هوشمند سلامت با دو ورودی ام‌سلامت و سلامت من.',
    identity: { source: 'official-asset', asset: '/service-identities/msalamat.svg', assetSourceUrl: 'https://www.mresalat.ir/icons/msalamat.svg', accent: '#13a29f' },
    actions: [{ label: 'ام‌سلامت', icon: 'health', evidence: 'homepage-visible' }, { label: 'سلامت من', icon: 'profile', evidence: 'homepage-visible' }],
    assistantPrompt: 'برای ام‌سلامت یا بخش «سلامت من» راهنمایی می‌خواهید؟',
    example: { label: 'دامنه نمونه', value: 'راهنمای ورود', detail: 'هیچ تشخیص یا قابلیت پزشکیِ تأییدنشده‌ای نمایش داده نمی‌شود.' },
  }),
  live({
    id: 'mbime', slug: 'mbime', titleFa: 'ام‌بیمه', titleEn: 'm-bime', category: 'wellbeing',
    description: 'درگاه بیمه با گزینه‌های شخص ثالث، بدنه، موتورسیکلت و عمر.',
    identity: { source: 'official-asset', asset: '/service-identities/mbime.svg', assetSourceUrl: 'https://www.mresalat.ir/icons/mresalat-home/mbime.svg', accent: '#0b75af' },
    actions: [
      { label: 'بیمه شخص ثالث', icon: 'insurance', evidence: 'homepage-visible' }, { label: 'بیمه بدنه', icon: 'security', evidence: 'homepage-visible' },
      { label: 'بیمه موتورسیکلت', icon: 'product', evidence: 'homepage-visible' }, { label: 'بیمه عمر', icon: 'health', evidence: 'homepage-visible' },
    ],
    assistantPrompt: 'برای کدام نوع بیمه راهنمایی می‌خواهید؟',
    example: { label: 'نمونه بیمه‌نامه', value: '۲۸ روز تا تمدید', detail: 'داده نمایشی؛ فقط انواع بیمه قابل مشاهده در سایت زنده استفاده شده‌اند.' },
  }),
  live({
    id: 'saya', slug: 'saya', titleFa: 'سایا', titleEn: 'saya', category: 'wellbeing',
    description: 'سرویس فعلی در گروه «دستیار هوشمند شناخت».',
    identity: { source: 'official-asset', asset: '/service-identities/saya.svg', assetSourceUrl: 'https://www.mresalat.ir/icons/pysa.svg', accent: '#6e5fb4' },
    actions: [{ label: 'سایا', icon: 'assessment', evidence: 'homepage-visible' }],
    assistantPrompt: 'برای ورود به سایا یا شناخت جایگاه این خدمت راهنمایی می‌خواهید؟',
    example: { label: 'دسترسی عمومی', value: 'ورود به سایا', detail: 'جزئیات ارزیابی‌ها در مقصد جداگانه است و بازآفرینی نشده.' },
    reference: 'https://psya.mresalat.ir/', sourceNote: 'ورودی عمومی به محصول جداگانه سایا هدایت شد.',
  }),
  live({
    id: 'auxiliary-systems', slug: 'auxiliary-systems', titleFa: 'سایر سامانه‌ها', titleEn: 'auxiliary-systems', category: 'operations',
    description: 'گروه خدمات تکمیلی فعلی شامل ام‌اتکا، مرآت و آیکاپ.',
    identity: { source: 'mresalat-system-designed', glyph: 'M+', accent: '#0f6fad' },
    actions: [
      { label: 'ام‌اتکا', icon: 'organization', evidence: 'homepage-visible' }, { label: 'مرآت', icon: 'assessment', evidence: 'homepage-visible' },
      { label: 'آیکاپ', icon: 'credit', evidence: 'homepage-visible' },
    ],
    assistantPrompt: 'برای انتخاب میان ام‌اتکا، مرآت و آیکاپ راهنمایی می‌خواهید؟',
    example: { label: 'مقصدهای عمومی', value: '۳ سامانه', detail: 'عملکرد داخلی هر مقصد بدون ورود تأیید نشده است.' },
    sourceNote: 'هویت گروه طراحی سیستم است؛ مقصدها در سایت زنده آیکون رسمی جداگانه دارند.',
  }),
  live({
    id: 'rahyar', slug: 'rahyar', titleFa: 'مدیریت رهیار', titleEn: 'rahyar-management', category: 'operations',
    description: 'مدیریت رهیار با دسترسی به رهیار شما و استعلام کارت هویتی رهیار.',
    identity: { source: 'official-asset', asset: '/service-identities/rahyar.svg', assetSourceUrl: 'https://www.mresalat.ir/icons/mresalat-home/myRahyarManagment.svg', accent: '#176fb1' },
    actions: [{ label: 'رهیار شما', icon: 'profile', evidence: 'homepage-visible' }, { label: 'استعلام کارت هویتی رهیار', icon: 'evidence', evidence: 'homepage-visible' }],
    assistantPrompt: 'برای پیدا کردن رهیار یا استعلام کارت هویتی راهنمایی می‌خواهید؟',
    example: { label: 'نمونه استعلام', value: 'آماده دریافت شناسه', detail: 'هیچ شناسه واقعی دریافت یا ارسال نمی‌شود.' },
  }),
  live({
    id: 'advisor', slug: 'advisor', titleFa: 'مشاوره آنلاین ام‌رسالت', titleEn: 'online-advisor', category: 'support',
    description: 'ورودی عمومی مشاوره آنلاین برای پرسش درباره خدمات اکوسیستم.',
    identity: { source: 'official-asset', asset: '/service-identities/advisor.svg', assetSourceUrl: 'https://www.mresalat.ir/icons/header/consulting-1.svg', accent: '#7259b4' },
    actions: [{ label: 'از من بپرس!', icon: 'assistant', evidence: 'homepage-visible' }],
    assistantPrompt: 'درباره کدام خدمت ام‌رسالت پرسش دارید؟',
    example: { label: 'زمینه گفت‌وگو', value: 'خدمات ام‌رسالت', detail: 'این نمونه رابط است و به مشاور زنده یا API تولید متصل نیست.' },
  }),
  live({
    id: 'mpayam', slug: 'mpayam', titleFa: 'ام‌پیام پلاس+', titleEn: 'm-payam-plus', category: 'communication',
    description: 'سرویس پیام فعلی با وعده از دست ندادن پیام‌های مهم.',
    identity: { source: 'official-asset', asset: '/service-identities/mpayam.webp', assetSourceUrl: 'https://www.mresalat.ir/icons/header/messenger-header.webp', accent: '#466ad4' },
    actions: [{ label: 'پیام‌های مهم', icon: 'messages', evidence: 'homepage-visible' }],
    assistantPrompt: 'می‌خواهید پیام‌های مهم ام‌پیام پلاس را مرور کنید؟',
    example: { label: 'نمونه اعلان', value: '۱ پیام مهم', detail: 'داده نمایشی؛ محتوای داخلی بدون ورود بررسی نشد.' },
  }),
  live({
    id: 'pishkhan', slug: 'pishkhan', titleFa: 'پیشخوان مجازی رسالت', titleEn: 'resalat-virtual-counter', category: 'operations',
    description: 'ورودی عمومی خدمات بانکی بانک قرض‌الحسنه رسالت.',
    identity: { source: 'official-asset', asset: '/service-identities/pishkhan.svg', assetSourceUrl: 'https://www.mresalat.ir/icons/header/pishkhan-1.svg', accent: '#16a995' },
    actions: [{ label: 'خدمات بانکی', icon: 'bank', evidence: 'homepage-visible' }],
    assistantPrompt: 'برای ورود به پیشخوان مجازی و خدمات بانکی راهنمایی می‌خواهید؟',
    example: { label: 'دامنه تأییدشده', value: 'خدمات بانکی', detail: 'هیچ عملیات بانکی در این نمونه اجرا نمی‌شود.' },
  }),
];

export const conceptualServices: MResalatService[] = [{
  id: 'sat', slug: 'sat', titleFa: 'SAT فروشندگان', titleEn: 'seller-tools', category: 'commerce',
  description: 'نمونه مستند پروژه برای عملیات فروشنده؛ در صفحه عمومی فعلی به‌عنوان خدمت جاری مشاهده نشد.',
  identity: { source: 'mresalat-system-designed', glyph: 'SAT', accent: '#0f7891' },
  actions: [{ label: 'سفارش‌ها', icon: 'orders', evidence: 'login-visible' }, { label: 'کالاها', icon: 'product', evidence: 'login-visible' }],
  assistantPrompt: 'کدام بخش عملیات فروشنده نیاز به توجه دارد؟',
  example: { label: 'طبقه‌بندی', value: 'مفهومی / مستند پروژه', detail: 'با سرویس‌های جاری صفحه عمومی مخلوط نشده است.', isMock: true },
  source: { type: 'project-documented', reference: '/seller', reviewedAt: '2026-08-22', verification: 'login-visible-only', note: 'در بازبینی صفحه عمومی فعلی پیدا نشد.' },
}];

export type EcosystemService = MResalatService;
