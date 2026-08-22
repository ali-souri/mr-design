import type { AssistantVariant } from '@/mresalat/ai/AssistantShell';
import type { MResalatIconName } from '@/mresalat/core/MResalatIcon';
import type { JourneyStep } from './contracts';

export type SegmentView = 'home' | 'services' | 'journey';
export type SegmentMode = 'discovery' | 'guided' | 'operational' | 'family' | 'young' | 'care';

export type SegmentConfig = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  mode: SegmentMode;
  icon: MResalatIconName;
  assistantVariant: AssistantVariant;
  home: { eyebrow: string; title: string; intro: string; prompt: string };
  pages: Record<SegmentView, { label: string; title: string }>;
  quickActions: { title: string; description: string; icon: MResalatIconName; href?: string }[];
  metrics: { label: string; value: string; detail: string; tone: 'info' | 'success' | 'warning' }[];
  services: { title: string; description: string; icon: MResalatIconName; tag: string }[];
  journey: { title: string; progress: number; steps: JourneyStep[]; action: string };
  activities: { title: string; meta: string; status: string }[];
};

const journey = (titles: string[], current = 1): JourneyStep[] => titles.map((title, index) => ({
  id: `step-${index + 1}`,
  title,
  description: index === current ? 'این مرحله اکنون به اقدام شما نیاز دارد.' : undefined,
  status: index < current ? 'completed' : index === current ? 'current' : 'upcoming',
}));

export const segments: SegmentConfig[] = [
  {
    id: 'general', slug: 'general', name: 'کاربر عمومی', shortName: 'عمومی', mode: 'discovery', icon: 'home', assistantVariant: 'hero',
    description: 'کشف نیاز و پیدا کردن مسیر مناسب در اکوسیستم ام‌رسالت.',
    home: { eyebrow: 'راهنمای هوشمند شما', title: 'نیازتان را بگویید؛ مسیر مناسب را پیدا می‌کنیم', intro: 'از عضویت و وام تا خرید و خدمات زندگی، قدم بعدی روشن و قابل پیگیری است.', prompt: 'مثلاً برای شروع عضویت چه کاری باید انجام دهم؟' },
    pages: { home: { label: 'خانه', title: 'خانه ام‌رسالت' }, services: { label: 'کشف خدمات', title: 'خدمات مناسب نیاز شما' }, journey: { label: 'مسیرهای من', title: 'مسیرها و فعالیت‌های من' } },
    quickActions: [{ title: 'عضویت در ام‌رسالت', description: 'ساخت حساب و شروع خدمات', icon: 'membership' }, { title: 'دریافت وام', description: 'شرایط و مدارک لازم', icon: 'loan', href: '/loan' }, { title: 'خرید اقساطی', description: 'فروشگاه‌ها و اعتبار خرید', icon: 'orders' }, { title: 'راهنمای هوشمند', description: 'پاسخ مستند و کوتاه', icon: 'assistant', href: '/rag' }],
    metrics: [{ label: 'خدمات در دسترس', value: '۲۴', detail: 'در ۶ حوزه', tone: 'info' }, { label: 'مسیر فعال', value: '۱', detail: 'تکمیل عضویت', tone: 'warning' }, { label: 'پیشنهاد تازه', value: '۳', detail: 'متناسب با نیاز شما', tone: 'success' }],
    services: [{ title: 'وام قرض‌الحسنه', description: 'شرایط و مسیر دریافت وام را شفاف ببینید.', icon: 'loan', tag: 'پیشنهاد امروز' }, { title: 'عضویت حقیقی', description: 'حساب خود را مرحله‌به‌مرحله فعال کنید.', icon: 'membership', tag: 'شروع سریع' }, { title: 'بازار اعضا', description: 'خرید مطمئن از فروشندگان ام‌بازار.', icon: 'seller', tag: 'کشف خدمت' }],
    journey: { title: 'تکمیل عضویت', progress: 65, steps: journey(['ثبت اطلاعات پایه', 'تأیید نشانی', 'احراز هویت', 'فعال‌سازی خدمات'], 1), action: 'تأیید نشانی' },
    activities: [{ title: 'مشاهده شرایط وام', meta: 'امروز · ۱۰:۳۲', status: 'دانش رسمی' }, { title: 'شروع عضویت', meta: '۲۱ مرداد', status: 'در حال انجام' }, { title: 'ذخیره فروشگاه منتخب', meta: '۱۹ مرداد', status: 'تکمیل شده' }],
  },
  {
    id: 'new-member', slug: 'new-member', name: 'عضو جدید', shortName: 'عضویت', mode: 'guided', icon: 'membership', assistantVariant: 'context',
    description: 'شروع روشن، آماده‌سازی الزامات و پیگیری عضویت.',
    home: { eyebrow: 'به ام‌رسالت خوش آمدید', title: 'عضویت شما، قدم‌به‌قدم و بدون ابهام', intro: 'هر مرحله، مدرک و اقدام بعدی را همین‌جا ببینید.', prompt: 'برای تکمیل عضویت چه مدرکی کم دارم؟' },
    pages: { home: { label: 'خوش‌آمد', title: 'شروع عضویت' }, services: { label: 'شرایط عضویت', title: 'شرایط و امکانات عضویت' }, journey: { label: 'پیشرفت عضویت', title: 'پیگیری عضویت من' } },
    quickActions: [{ title: 'تکمیل مشخصات', description: 'اطلاعات هویتی و تماس', icon: 'membership' }, { title: 'تأیید نشانی', description: 'ثبت و بررسی محل سکونت', icon: 'assessment' }, { title: 'بارگذاری مدرک', description: 'مدارک موردنیاز عضویت', icon: 'evidence' }, { title: 'گفت‌وگو با راهنما', description: 'رفع ابهام در هر مرحله', icon: 'assistant' }],
    metrics: [{ label: 'پیشرفت عضویت', value: '۶۵٪', detail: '۲ مرحله باقی مانده', tone: 'warning' }, { label: 'مدارک تأییدشده', value: '۳ از ۴', detail: 'کارت ملی تأیید شد', tone: 'success' }, { label: 'زمان تقریبی', value: '۸ دقیقه', detail: 'برای اقدام بعدی', tone: 'info' }],
    services: [{ title: 'عضویت حقیقی', description: 'دسترسی به مجموعه خدمات مالی و اجتماعی.', icon: 'membership', tag: 'خدمت اصلی' }, { title: 'احراز هویت آنلاین', description: 'تأیید هویت امن بدون مراجعه حضوری.', icon: 'security', tag: 'کاملاً آنلاین' }, { title: 'آشنایی با خدمات', description: 'پس از عضویت چه امکاناتی دارید؟', icon: 'assistant', tag: 'راهنما' }],
    journey: { title: 'فعال‌سازی عضویت', progress: 65, steps: journey(['ثبت شماره همراه', 'اطلاعات هویتی', 'تأیید نشانی', 'احراز نهایی'], 2), action: 'ادامه تأیید نشانی' },
    activities: [{ title: 'کارت ملی تأیید شد', meta: 'امروز · ۹:۴۰', status: 'تکمیل شده' }, { title: 'نشانی ثبت شد', meta: 'امروز · ۹:۳۴', status: 'در انتظار بررسی' }, { title: 'عضویت آغاز شد', meta: '۲۰ مرداد', status: 'ثبت شده' }],
  },
  {
    id: 'loan-applicant', slug: 'loan-applicant', name: 'متقاضی وام', shortName: 'وام', mode: 'guided', icon: 'loan', assistantVariant: 'context',
    description: 'شرایط، مدارک، وضعیت و اقدام بعدی درخواست وام.',
    home: { eyebrow: 'درخواست وام شما', title: 'مرحله بعدی: تکمیل مدرک درآمدی', intro: 'وضعیت درخواست و دلیل هر اقدام را شفاف دنبال کنید.', prompt: 'چرا مدرک درآمدی من نیاز به اصلاح دارد؟' },
    pages: { home: { label: 'خانه وام', title: 'وضعیت وام من' }, services: { label: 'شرایط و مدارک', title: 'شرایط و مدارک وام' }, journey: { label: 'پیشرفت درخواست', title: 'پیگیری درخواست وام' } },
    quickActions: [{ title: 'تکمیل مدرک', description: 'یک فایل نیاز به اصلاح دارد', icon: 'evidence' }, { title: 'محاسبه بازپرداخت', description: 'مبلغ و دوره پیشنهادی', icon: 'finance' }, { title: 'نتیجه اعتبارسنجی', description: 'مشاهده امن ارزیابی', icon: 'assessment' }, { title: 'پرسش از ام‌مشاور', description: 'پاسخ بر اساس پرونده', icon: 'assistant' }],
    metrics: [{ label: 'وضعیت درخواست', value: 'بررسی مدارک', detail: '۱ اقدام لازم', tone: 'warning' }, { label: 'مبلغ درخواستی', value: '۱۵۰ میلیون', detail: 'تومان', tone: 'info' }, { label: 'مدارک تأیید', value: '۴ از ۵', detail: 'یک مورد باقی مانده', tone: 'success' }],
    services: [{ title: 'وام قرض‌الحسنه', description: 'راهنمای شرایط، مدارک و تضامین.', icon: 'loan', tag: 'پرونده فعال' }, { title: 'اعتبارسنجی', description: 'عوامل مؤثر بر نتیجه ارزیابی را بدانید.', icon: 'assessment', tag: 'دانش رسمی' }, { title: 'توان بازپرداخت', description: 'سناریوهای دوره و مبلغ را مقایسه کنید.', icon: 'finance', tag: 'ابزار راهنما' }],
    journey: { title: 'درخواست وام ۱۵۰ میلیون تومانی', progress: 48, steps: journey(['اعتبارسنجی', 'مدارک و تضمین', 'انتخاب شرایط', 'قرارداد و واریز'], 1), action: 'اصلاح مدرک درآمدی' },
    activities: [{ title: 'مدرک شغلی بررسی شد', meta: 'امروز · ۱۱:۲۰', status: 'نیازمند اصلاح' }, { title: 'اعتبارسنجی تکمیل شد', meta: '۲۱ مرداد', status: 'تکمیل شده' }, { title: 'درخواست ثبت شد', meta: '۲۰ مرداد', status: 'تکمیل شده' }],
  },
  {
    id: 'prospective-seller', slug: 'prospective-seller', name: 'فروشنده آینده', shortName: 'شروع فروش', mode: 'guided', icon: 'seller', assistantVariant: 'context',
    description: 'آشنایی با مزایا، الزامات و مسیر ورود به ام‌بازار.',
    home: { eyebrow: 'کسب‌وکار شما در ام‌بازار', title: 'فروش آنلاین را با یک مسیر روشن شروع کنید', intro: 'از آماده‌سازی فروشگاه تا انتشار اولین محصول همراهتان هستیم.', prompt: 'برای شروع فروش چه مجوزهایی لازم دارم؟' },
    pages: { home: { label: 'معرفی فروشندگی', title: 'شروع فروش در ام‌بازار' }, services: { label: 'شرایط فروشنده', title: 'الزامات و مزایای فروشندگی' }, journey: { label: 'ورود به بازار', title: 'پیشرفت راه‌اندازی فروشگاه' } },
    quickActions: [{ title: 'بررسی شرایط', description: 'آیا کسب‌وکار من آماده است؟', icon: 'assessment' }, { title: 'مزایای فروشندگی', description: 'بازار، اعتبار و تسویه', icon: 'seller' }, { title: 'مدارک کسب‌وکار', description: 'فهرست مدارک لازم', icon: 'evidence' }, { title: 'مشاوره راه‌اندازی', description: 'یک سؤال در هر مرحله', icon: 'assistant' }],
    metrics: [{ label: 'آمادگی فروشگاه', value: '۴۰٪', detail: 'پروفایل کسب‌وکار', tone: 'warning' }, { label: 'زمان راه‌اندازی', value: '۲ روز', detail: 'پس از تأیید مدارک', tone: 'info' }, { label: 'هزینه عضویت', value: 'رایگان', detail: 'در نسخه فعلی', tone: 'success' }],
    services: [{ title: 'ساخت فروشگاه', description: 'هویت، دسته‌بندی و اطلاعات تماس.', icon: 'seller', tag: 'قدم اول' }, { title: 'انتشار محصول', description: 'استانداردهای عکس، قیمت و موجودی.', icon: 'product', tag: 'راهنمای عملی' }, { title: 'تسویه فروش', description: 'زمان‌بندی و قواعد تسویه را بدانید.', icon: 'settlement', tag: 'دانش مالی' }],
    journey: { title: 'راه‌اندازی فروشگاه', progress: 40, steps: journey(['پروفایل کسب‌وکار', 'مدارک و تأیید', 'تنظیم فروشگاه', 'اولین محصول'], 1), action: 'تکمیل مدارک' },
    activities: [{ title: 'نام فروشگاه انتخاب شد', meta: 'امروز', status: 'تکمیل شده' }, { title: 'مدارک کسب‌وکار', meta: 'اقدام بعدی', status: 'نیازمند اقدام' }, { title: 'دسته‌بندی انتخاب شد', meta: '۲۱ مرداد', status: 'تکمیل شده' }],
  },
  {
    id: 'active-seller', slug: 'active-seller', name: 'فروشنده فعال', shortName: 'فروشنده', mode: 'operational', icon: 'seller', assistantVariant: 'compact',
    description: 'عملیات روزانه سفارش، محصول، فروش و تسویه.',
    home: { eyebrow: 'فروشگاه خانه آبی', title: '۵ سفارش امروز به اقدام شما نیاز دارد', intro: 'اولویت‌های عملیاتی را ببینید و سریع انجام دهید.', prompt: 'کدام سفارش‌ها باید امروز ارسال شوند؟' },
    pages: { home: { label: 'داشبورد فروشنده', title: 'عملیات امروز فروشگاه' }, services: { label: 'محصولات و سفارش‌ها', title: 'محصولات و سفارش‌های فروشگاه' }, journey: { label: 'فروش و تسویه', title: 'پیشرفت فروش و تسویه' } },
    quickActions: [{ title: 'ثبت محصول', description: 'افزودن کالای جدید', icon: 'add' }, { title: 'سفارشات', description: '۱۸ سفارش باز', icon: 'orders' }, { title: 'تسویه', description: 'مشاهده و درخواست', icon: 'settlement' }, { title: 'گزارش فروش', description: 'عملکرد و روندها', icon: 'reports' }],
    metrics: [{ label: 'فروش امروز', value: '۱۲٫۴ میلیون', detail: '۱۲٪ بیشتر از دیروز', tone: 'success' }, { label: 'سفارش باز', value: '۱۸', detail: '۵ مورد نیازمند اقدام', tone: 'warning' }, { label: 'تسویه بعدی', value: '۲۸٫۹ میلیون', detail: 'یکشنبه ۲۵ مرداد', tone: 'info' }],
    services: [{ title: 'مدیریت سفارش', description: 'آماده‌سازی، ارسال و پیگیری سفارش‌ها.', icon: 'orders', tag: '۵ اقدام فوری' }, { title: 'موجودی محصولات', description: '۴ محصول نزدیک به اتمام موجودی.', icon: 'product', tag: 'نیازمند توجه' }, { title: 'گزارش عملکرد', description: 'فروش، بازدید و نرخ تبدیل فروشگاه.', icon: 'reports', tag: 'به‌روز' }],
    journey: { title: 'چرخه تسویه هفته جاری', progress: 72, steps: journey(['تأیید سفارش‌ها', 'پایان مهلت مرجوعی', 'محاسبه تسویه', 'واریز به حساب'], 2), action: 'مشاهده صورت‌حساب' },
    activities: [{ title: 'سفارش MB-۱۴۰۵۸۳۲', meta: '۴٫۸۵ میلیون تومان', status: 'آماده‌سازی' }, { title: 'سفارش MB-۱۴۰۵۸۲۹', meta: '۲٫۳۹ میلیون تومان', status: 'ارسال شد' }, { title: 'تسویه هفتگی', meta: '۲۸٫۹ میلیون تومان', status: 'در حال محاسبه' }],
  },
  {
    id: 'org-manager', slug: 'organization-manager', name: 'مدیر سازمان', shortName: 'مدیر سازمان', mode: 'operational', icon: 'organization', assistantVariant: 'compact',
    description: 'برنامه‌های رفاهی، تخصیص اعتبار، گزارش و وضعیت کارکنان.',
    home: { eyebrow: 'سازمان راهکار فردا', title: 'تخصیص اعتبار مرداد آماده بررسی نهایی است', intro: 'برنامه‌ها، بودجه و اقدام‌های سازمان را یک‌جا مدیریت کنید.', prompt: 'چند کارمند هنوز تخصیص مرداد را دریافت نکرده‌اند؟' },
    pages: { home: { label: 'داشبورد سازمان', title: 'مدیریت برنامه‌های سازمان' }, services: { label: 'برنامه‌ها و اعتبار', title: 'مزایا و برنامه‌های اعتباری' }, journey: { label: 'تخصیص و پیشرفت', title: 'پیگیری تخصیص اعتبار' } },
    quickActions: [{ title: 'تخصیص اعتبار', description: 'برنامه مرداد', icon: 'credit' }, { title: 'کارکنان', description: '۴۸۲ عضو فعال', icon: 'employee' }, { title: 'برنامه رفاهی', description: 'ساخت یا ویرایش برنامه', icon: 'gift' }, { title: 'گزارش سازمان', description: 'مصرف و مشارکت', icon: 'reports' }],
    metrics: [{ label: 'اعتبار تخصیص‌یافته', value: '۲٫۸ میلیارد', detail: 'تومان در مرداد', tone: 'info' }, { label: 'کارکنان فعال', value: '۴۸۲', detail: '۹۶٪ واجد شرایط', tone: 'success' }, { label: 'موارد نیازمند تأیید', value: '۱۲', detail: 'پیش از تخصیص', tone: 'warning' }],
    services: [{ title: 'اعتبار سازمانی', description: 'تخصیص کنترل‌شده بر اساس سیاست سازمان.', icon: 'credit', tag: 'برنامه فعال' }, { title: 'مزایای کارکنان', description: 'طراحی بسته‌های رفاهی و خدماتی.', icon: 'gift', tag: 'قابل تنظیم' }, { title: 'گزارش مدیریتی', description: 'مصرف اعتبار و مشارکت کارکنان.', icon: 'reports', tag: 'داده زنده' }],
    journey: { title: 'تخصیص اعتبار مرداد', progress: 75, steps: journey(['تعریف سیاست', 'بارگذاری کارکنان', 'بازبینی استثناها', 'تأیید و تخصیص'], 2), action: 'بررسی ۱۲ استثنا' },
    activities: [{ title: 'فهرست کارکنان به‌روز شد', meta: 'امروز · ۸:۲۰', status: 'داده زنده' }, { title: 'بودجه برنامه تأیید شد', meta: '۲۱ مرداد', status: 'تکمیل شده' }, { title: '۱۲ پرونده استثنا', meta: 'اقدام بعدی', status: 'نیازمند بررسی' }],
  },
  {
    id: 'employee', slug: 'organization-employee', name: 'کارمند سازمان', shortName: 'کارمند', mode: 'guided', icon: 'employee', assistantVariant: 'context',
    description: 'مزایا، اعتبار باقی‌مانده و خدمات در دسترس کارکنان.',
    home: { eyebrow: 'مزایای سازمانی شما', title: '۳٫۸ میلیون تومان اعتبار قابل استفاده دارید', intro: 'خدمات واجد شرایط و سابقه مصرف اعتبارتان را شفاف ببینید.', prompt: 'اعتبار رفاهی‌ام را کجا می‌توانم استفاده کنم؟' },
    pages: { home: { label: 'مزایای من', title: 'خانه مزایای کارکنان' }, services: { label: 'خدمات موجود', title: 'خدمات قابل استفاده' }, journey: { label: 'مصرف اعتبار', title: 'اعتبار و سابقه استفاده' } },
    quickActions: [{ title: 'اعتبار من', description: 'مانده و تاریخ اعتبار', icon: 'finance' }, { title: 'خدمات رفاهی', description: 'کالا و خدمات واجد شرایط', icon: 'gift' }, { title: 'سوابق استفاده', description: 'تراکنش‌های برنامه', icon: 'reports' }, { title: 'پرسش از راهنما', description: 'قواعد برنامه سازمان', icon: 'assistant' }],
    metrics: [{ label: 'اعتبار باقی‌مانده', value: '۳٫۸ میلیون', detail: 'تا پایان شهریور', tone: 'success' }, { label: 'اعتبار مصرف‌شده', value: '۱٫۲ میلیون', detail: '۲ خرید در مرداد', tone: 'info' }, { label: 'پیشنهاد واجد شرایط', value: '۶', detail: 'بر اساس برنامه شما', tone: 'warning' }],
    services: [{ title: 'خرید رفاهی', description: 'کالاهای واجد شرایط برنامه سازمان.', icon: 'orders', tag: 'اعتبار سازمانی' }, { title: 'خدمات سلامت', description: 'بسته‌های سلامت تحت پوشش برنامه.', icon: 'health', tag: 'پیشنهاد مرتبط' }, { title: 'آموزش مهارتی', description: 'دوره‌های مورد تأیید سازمان.', icon: 'education', tag: 'پیشنهاد مرتبط' }],
    journey: { title: 'مصرف اعتبار رفاهی', progress: 24, steps: journey(['اعتبار فعال شد', 'انتخاب خدمت', 'تأیید خرید', 'ثبت در سوابق'], 1), action: 'مشاهده خدمات' },
    activities: [{ title: 'خرید از ام‌بازار', meta: '۸۵۰ هزار تومان', status: 'موفق' }, { title: 'اعتبار مرداد فعال شد', meta: '۱ مرداد', status: 'تکمیل شده' }, { title: 'دوره آموزشی ذخیره شد', meta: '۲۰ مرداد', status: 'پیشنهاد' }],
  },
  {
    id: 'parent', slug: 'parent', name: 'والد', shortName: 'خانواده', mode: 'family', icon: 'parent', assistantVariant: 'context',
    description: 'کنترل‌های خانوادگی، هدف‌ها و خدمات مناسب فرزند.',
    home: { eyebrow: 'خانواده محمدی', title: 'هدف پس‌انداز آوا به ۷۲٪ رسیده است', intro: 'وضعیت فرزند، کنترل‌های مالی و پیشنهادهای رشد را با آرامش دنبال کنید.', prompt: 'چطور سقف خرج هفتگی آوا را تغییر بدهم؟' },
    pages: { home: { label: 'داشبورد خانواده', title: 'خانه خانواده' }, services: { label: 'خدمات فرزند', title: 'خدمات مناسب خانواده و فرزند' }, journey: { label: 'هدف‌ها و فعالیت', title: 'هدف‌ها و فعالیت‌های خانواده' } },
    quickActions: [{ title: 'حساب فرزند', description: 'مانده و فعالیت اخیر', icon: 'child' }, { title: 'کنترل‌های مالی', description: 'سقف و دسته‌بندی خرج', icon: 'security' }, { title: 'هدف پس‌انداز', description: 'دوچرخه آوا', icon: 'goal' }, { title: 'خدمات آموزشی', description: 'پیشنهادهای متناسب سن', icon: 'education' }],
    metrics: [{ label: 'پس‌انداز هدف', value: '۷۲٪', detail: '۱٫۴ میلیون باقی مانده', tone: 'success' }, { label: 'خرج این هفته', value: '۳۸۰ هزار', detail: 'در محدوده تعیین‌شده', tone: 'info' }, { label: 'فعالیت نیازمند تأیید', value: '۱', detail: 'خرید آموزشی', tone: 'warning' }],
    services: [{ title: 'هدف پس‌انداز خانوادگی', description: 'ساخت هدف و همراهی امن با فرزند.', icon: 'goal', tag: 'فعال' }, { title: 'آموزش مالی نوجوان', description: 'یادگیری خرج، پس‌انداز و تصمیم‌گیری.', icon: 'learning', tag: 'پیشنهاد آوا' }, { title: 'خدمات سلامت فرزند', description: 'کشف و پیگیری خدمات مناسب سن.', icon: 'health', tag: 'راهنمای خانواده' }],
    journey: { title: 'هدف خرید دوچرخه آوا', progress: 72, steps: journey(['ساخت هدف', 'پس‌انداز هفتگی', 'رسیدن به مبلغ', 'خرید با تأیید والد'], 1), action: 'افزودن پس‌انداز این هفته' },
    activities: [{ title: 'پس‌انداز هفتگی انجام شد', meta: 'امروز · ۱۵۰ هزار تومان', status: 'موفق' }, { title: 'درخواست خرید کتاب', meta: '۲۱ مرداد', status: 'نیازمند تأیید' }, { title: 'درس «انتخاب هوشمند»', meta: '۲۰ مرداد', status: 'تکمیل شده' }],
  },
  {
    id: 'young', slug: 'young-user', name: 'کاربر نوجوان', shortName: 'نوجوان', mode: 'young', icon: 'child', assistantVariant: 'context',
    description: 'هدف، جایزه، یادگیری و فعالیت مالی امن برای نوجوان.',
    home: { eyebrow: 'سلام آوا!', title: 'فقط سه قدم تا هدف دوچرخه باقی مانده', intro: 'پیشرفتت را ببین، مأموریت‌های کوچک را انجام بده و انتخاب‌های مالی بهتر یاد بگیر.', prompt: 'چطور سریع‌تر و هوشمندانه‌تر پس‌انداز کنم؟' },
    pages: { home: { label: 'خانه من', title: 'خانه آوا' }, services: { label: 'هدف‌ها و جایزه‌ها', title: 'هدف‌ها، جایزه‌ها و یادگیری' }, journey: { label: 'مسیر یادگیری', title: 'پیشرفت و فعالیت من' } },
    quickActions: [{ title: 'هدف دوچرخه', description: '۷۲٪ تکمیل شده', icon: 'goal' }, { title: 'جایزه‌های من', description: '۲ نشان تازه', icon: 'reward' }, { title: 'یادگیری کوتاه', description: '۵ دقیقه تا نشان بعدی', icon: 'learning' }, { title: 'درخواست از والد', description: 'برای خرید یا تغییر هدف', icon: 'messages' }],
    metrics: [{ label: 'پس‌انداز من', value: '۳٫۶ میلیون', detail: 'برای هدف دوچرخه', tone: 'success' }, { label: 'روزهای پیوسته', value: '۸ روز', detail: 'ثبت خرج و پس‌انداز', tone: 'info' }, { label: 'نشان بعدی', value: '۸۰ امتیاز', detail: '۲۰ امتیاز باقی مانده', tone: 'warning' }],
    services: [{ title: 'مأموریت پس‌انداز', description: 'این هفته سه انتخاب هوشمند ثبت کن.', icon: 'goal', tag: '۲۰ امتیاز' }, { title: 'درس پول و انتخاب', description: 'یک داستان کوتاه درباره اولویت‌ها.', icon: 'learning', tag: '۵ دقیقه' }, { title: 'جایزه‌های قابل دریافت', description: 'پیشرفتت را با نشان‌های تازه جشن بگیر.', icon: 'reward', tag: '۲ جایزه' }],
    journey: { title: 'مسیر قهرمان پس‌انداز', progress: 68, steps: journey(['شناخت هدف', 'ثبت انتخاب‌ها', 'هفته بدون خرج اضافه', 'نشان قهرمان'], 2), action: 'ثبت انتخاب امروز' },
    activities: [{ title: '۱۵۰ هزار تومان پس‌انداز کردی', meta: 'امروز', status: '+۱۵ امتیاز' }, { title: 'درس انتخاب هوشمند', meta: 'دیروز', status: 'تکمیل شد' }, { title: 'درخواست خرید کتاب', meta: '۲۱ مرداد', status: 'در انتظار والد' }],
  },
  {
    id: 'care-seeker', slug: 'care-seeker', name: 'جوینده آموزش و سلامت', shortName: 'راهنمای خدمات', mode: 'care', icon: 'health', assistantVariant: 'hero',
    description: 'کشف نیازمحور خدمات آموزش، سلامت و ارزیابی.',
    home: { eyebrow: 'از نیاز شما شروع می‌کنیم', title: 'برای رشد، سلامت یا ارزیابی چه کمکی می‌خواهید؟', intro: 'نیازتان را بگویید تا خدمت مناسب، دلیل پیشنهاد و مسیر آن را شفاف ببینید.', prompt: 'برای ارزیابی تمرکز و برنامه آموزشی از کجا شروع کنم؟' },
    pages: { home: { label: 'خانه راهنما', title: 'راهنمای نیازمحور' }, services: { label: 'کشف خدمات', title: 'آموزش، سلامت و ارزیابی' }, journey: { label: 'مسیر خدمت', title: 'نوبت‌ها و فعالیت‌های من' } },
    quickActions: [{ title: 'آموزش و مهارت', description: 'دوره و برنامه یادگیری', icon: 'education' }, { title: 'سلامت و تندرستی', description: 'راهنمای خدمات سلامت', icon: 'health' }, { title: 'ارزیابی تخصصی', description: 'شناخت نیاز و نقطه شروع', icon: 'assessment' }, { title: 'نوبت‌های من', description: 'فعالیت‌ها و یادآوری‌ها', icon: 'calendar' }],
    metrics: [{ label: 'پیشنهادهای مرتبط', value: '۴', detail: 'بر اساس نیاز ثبت‌شده', tone: 'success' }, { label: 'نوبت پیش رو', value: 'شنبه', detail: 'ساعت ۱۶:۳۰', tone: 'info' }, { label: 'پرسش تکمیلی', value: '۱', detail: 'برای پیشنهاد دقیق‌تر', tone: 'warning' }],
    services: [{ title: 'ارزیابی سبک یادگیری', description: 'شناخت بهتر نیاز و ساخت مسیر پیشنهادی.', icon: 'assessment', tag: 'پیشنهاد اول' }, { title: 'برنامه تمرکز و مطالعه', description: 'جلسه‌های کوتاه و فعالیت‌های قابل پیگیری.', icon: 'education', tag: 'متناسب با نیاز' }, { title: 'مشاوره سلامت عمومی', description: 'راهنمای انتخاب خدمت و نوبت مناسب.', icon: 'clinic', tag: 'راهنمای اولیه' }],
    journey: { title: 'ارزیابی و برنامه تمرکز', progress: 35, steps: journey(['پاسخ به پرسش‌ها', 'جلسه ارزیابی', 'دریافت برنامه', 'پیگیری فعالیت‌ها'], 1), action: 'آمادگی برای جلسه' },
    activities: [{ title: 'پرسش‌نامه تکمیل شد', meta: 'امروز', status: 'تکمیل شده' }, { title: 'جلسه ارزیابی', meta: 'شنبه · ۱۶:۳۰', status: 'نوبت پیش رو' }, { title: 'یادآوری آمادگی جلسه', meta: 'جمعه · ۱۸:۰۰', status: 'زمان‌بندی شده' }],
  },
];

export const segmentBySlug = Object.fromEntries(segments.map((segment) => [segment.slug, segment])) as Record<string, SegmentConfig>;
export const segmentViews: SegmentView[] = ['home', 'services', 'journey'];
