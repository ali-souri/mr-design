import type { MResalatIconName } from '@/mresalat/core/MResalatIcon';
import type { JourneyStep } from './contracts';

export type EcosystemService = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  icon: MResalatIconName;
  prompt: string;
  actions: { label: string; icon: MResalatIconName }[];
  status: { label: string; value: string; detail: string };
  cta: string;
  journey?: { title: string; progress: number; steps: JourneyStep[] };
};

const compactJourney = (prefix: string): JourneyStep[] => [
  { id: `${prefix}-1`, title: 'انتخاب خدمت', status: 'completed' },
  { id: `${prefix}-2`, title: 'بررسی شرایط', status: 'current' },
  { id: `${prefix}-3`, title: 'ادامه مسیر', status: 'upcoming' },
];

export const ecosystemServices: EcosystemService[] = [
  { id: 'mresalat', name: 'ام‌رسالت', subtitle: 'درگاه یکپارچه اکوسیستم', description: 'شروع ساده از نیاز کاربر و هدایت به خدمت مناسب در یک تجربه هماهنگ.', icon: 'home', prompt: 'برای کدام نیاز دنبال مسیر مناسب هستید؟', actions: [{ label: 'کشف خدمات', icon: 'search' }, { label: 'مسیرهای من', icon: 'goal' }, { label: 'پیام‌ها', icon: 'messages' }], status: { label: 'خدمات پیشنهادی', value: '۳ خدمت', detail: 'بر اساس نیازهای اخیر شما' }, cta: 'ورود به تجربه عمومی' },
  { id: 'mmoshaver', name: 'ام‌مشاور', subtitle: 'راهنمای انتخاب و دریافت خدمت', description: 'شرایط، مدارک و مراحل هر خدمت را با شواهد رسمی و زبان روشن مرور کنید.', icon: 'assistant', prompt: 'درباره شرایط یا مدارک کدام خدمت بپرسید؟', actions: [{ label: 'درباره خدمت بپرس', icon: 'assistant' }, { label: 'شرایط استفاده', icon: 'evidence' }, { label: 'مدارک لازم', icon: 'assessment' }], status: { label: 'راهنمای فعال', value: 'وام قرض‌الحسنه', detail: 'مرحله بعد: بررسی مدارک' }, cta: 'گفت‌وگو با ام‌مشاور', journey: { title: 'مسیر دریافت خدمت', progress: 46, steps: compactJourney('advisor') } },
  { id: 'mbazar', name: 'ام‌بازار', subtitle: 'بازار کالا و خرید اقساطی', description: 'کالا، سفارش و گزینه‌های خرید را بدون جدا شدن از مسیر مالی کاربر پیدا کنید.', icon: 'product', prompt: 'چه کالایی و با چه شرایطی نیاز دارید؟', actions: [{ label: 'جستجوی کالا', icon: 'search' }, { label: 'خرید اقساطی', icon: 'credit' }, { label: 'سفارش‌های من', icon: 'orders' }, { label: 'پیشنهادها', icon: 'gift' }], status: { label: 'سفارش در جریان', value: '۱ سفارش', detail: 'در انتظار آماده‌سازی فروشنده' }, cta: 'مرور ام‌بازار' },
  { id: 'sat', name: 'SAT', subtitle: 'مدیریت غرفه و فروش', description: 'تصویر فشرده‌ای از سفارش‌ها، کالاها و تسویه برای عملیات روزانه فروشنده.', icon: 'seller', prompt: 'کدام بخش غرفه امروز به اقدام نیاز دارد؟', actions: [{ label: 'سفارش‌ها', icon: 'orders' }, { label: 'کالاها', icon: 'product' }, { label: 'تسویه', icon: 'settlement' }, { label: 'گزارش فروش', icon: 'reports' }], status: { label: 'اقدام امروز', value: '۵ سفارش', detail: '۲ سفارش تا دو ساعت آینده' }, cta: 'باز کردن مدیریت غرفه' },
  { id: 'mbimeh', name: 'ام‌بیمه', subtitle: 'پوشش و پیگیری بیمه', description: 'پوشش‌های موجود، بیمه‌نامه‌ها و مسیر پیگیری خسارت را شفاف نگه می‌دارد.', icon: 'insurance', prompt: 'دنبال پوشش جدید هستید یا پیگیری بیمه‌نامه؟', actions: [{ label: 'بیمه‌های موجود', icon: 'search' }, { label: 'بیمه‌نامه‌های من', icon: 'security' }, { label: 'بررسی پوشش', icon: 'evidence' }, { label: 'پیگیری خسارت', icon: 'goal' }], status: { label: 'بیمه‌نامه فعال', value: '۲ مورد', detail: 'نزدیک‌ترین تمدید: ۲۸ روز دیگر' }, cta: 'مشاهده خدمات بیمه' },
  { id: 'mhami', name: 'ام‌حامی', subtitle: 'اعتبار و مزایای حمایتی', description: 'اعتبار قابل استفاده و برنامه‌های حمایتی سازمان را در یک نمای قابل فهم ارائه می‌کند.', icon: 'advocacy', prompt: 'می‌خواهید اعتبار یا مزایای سازمانی را بررسی کنید؟', actions: [{ label: 'اعتبار من', icon: 'credit' }, { label: 'مزایای سازمانی', icon: 'organization' }, { label: 'برنامه‌های حمایتی', icon: 'advocacy' }], status: { label: 'اعتبار باقی‌مانده', value: '۳٬۸ میلیون', detail: 'قابل استفاده در خدمات منتخب' }, cta: 'مرور مزایای من' },
  { id: 'mpayam', name: 'ام‌پیام', subtitle: 'پیام‌ها و اعلان‌های خدمت', description: 'پیام‌های مهم، وضعیت درخواست‌ها و اعلان‌های قابل اقدام را اولویت‌بندی می‌کند.', icon: 'messages', prompt: 'کدام پیام یا درخواست را می‌خواهید پیگیری کنید؟', actions: [{ label: 'پیام‌های جدید', icon: 'messages' }, { label: 'اعلان‌ها', icon: 'alerts' }, { label: 'درخواست‌های باز', icon: 'time' }], status: { label: 'پیام نیازمند اقدام', value: '۲ پیام', detail: 'یکی مربوط به تکمیل مدرک است' }, cta: 'باز کردن ام‌پیام' },
  { id: 'mamoozesh', name: 'ام‌آموزش', subtitle: 'یادگیری و رشد مهارت', description: 'دوره‌های مناسب، ادامه یادگیری و پیشرفت آموزشی را به شکل هدف‌محور نشان می‌دهد.', icon: 'education', prompt: 'برای کدام مهارت یا هدف دنبال دوره هستید؟', actions: [{ label: 'دوره‌های پیشنهادی', icon: 'learning' }, { label: 'دوره‌های من', icon: 'education' }, { label: 'ادامه یادگیری', icon: 'next' }], status: { label: 'دوره فعال', value: '۶۸٪ پیشرفت', detail: 'فصل بعدی حدود ۱۲ دقیقه' }, cta: 'ادامه یادگیری', journey: { title: 'مسیر یادگیری', progress: 68, steps: compactJourney('learning') } },
  { id: 'saya', name: 'سایا', subtitle: 'ارزیابی و شناخت بهتر نیاز', description: 'ارزیابی‌های در دسترس و وضعیت تکمیل آن‌ها را بدون ادعای تشخیص تخصصی نمایش می‌دهد.', icon: 'assessment', prompt: 'می‌خواهید کدام ارزیابی را شروع یا ادامه دهید؟', actions: [{ label: 'ارزیابی‌ها', icon: 'assessment' }, { label: 'ارزیابی‌های من', icon: 'goal' }, { label: 'مشاهده وضعیت', icon: 'reports' }], status: { label: 'ارزیابی نیمه‌تمام', value: '۱ مورد', detail: 'حدود ۵ دقیقه تا پایان' }, cta: 'مرور ارزیابی‌ها' },
  { id: 'msalamat', name: 'ام‌سلامت', subtitle: 'راهنمای خدمات سلامت', description: 'نیاز سلامت را به خدمت، نوبت و مسیر پیگیری مناسب متصل می‌کند؛ بدون جایگزینی نظر پزشک.', icon: 'health', prompt: 'برای پیدا کردن چه نوع خدمت سلامت کمک می‌خواهید؟', actions: [{ label: 'خدمات سلامت', icon: 'health' }, { label: 'نوبت‌ها', icon: 'calendar' }, { label: 'مسیر دریافت خدمت', icon: 'goal' }], status: { label: 'نوبت پیش رو', value: 'سه‌شنبه ۱۷:۳۰', detail: 'مشاوره تغذیه، مرکز منتخب' }, cta: 'مشاهده مسیر سلامت', journey: { title: 'مسیر دریافت خدمت', progress: 34, steps: compactJourney('health') } },
];
