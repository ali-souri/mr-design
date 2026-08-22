import type { AssistantSource, SecureAction, ServiceJourney } from './contracts';

export const loanJourney: ServiceJourney = {
  serviceCode: 'M-MOSHAVER-LOAN-01',
  title: 'وام قرض‌الحسنه ام‌رسالت',
  summary: 'یک مسیر شفاف برای بررسی شرایط، آماده‌سازی مدارک و ثبت درخواست وام؛ با راهنمایی قدم‌به‌قدم ام‌مشاور.',
  benefits: ['کارمزد کم و بازپرداخت منعطف', 'ارزیابی آنلاین و بدون مراجعه حضوری', 'مشاهده شفاف وضعیت درخواست'],
  requirements: ['عضویت فعال در ام‌رسالت', 'نتیجه اعتبارسنجی قابل قبول', 'داشتن امتیاز کافی یا معرفی ضامن واجد شرایط'],
  documents: ['کارت ملی هوشمند', 'اطلاعات محل سکونت و شغل', 'مدارک درآمدی در صورت درخواست', 'اطلاعات ضامن متناسب با نتیجه اعتبارسنجی'],
  steps: [
    { id: 'credit', title: 'بررسی اولیه و اعتبارسنجی', description: 'تکمیل اطلاعات پایه و دریافت نتیجه ارزیابی', status: 'current' },
    { id: 'score', title: 'تکمیل امتیاز و مدارک', description: 'آماده‌سازی موارد موردنیاز بر اساس نتیجه', status: 'upcoming' },
    { id: 'request', title: 'ثبت درخواست و انتخاب مبلغ', description: 'انتخاب مبلغ و دوره بازپرداخت در محدوده مجاز', status: 'upcoming' },
    { id: 'contract', title: 'تأیید نهایی و قرارداد', description: 'مرور قرارداد، تأیید امن و واریز', status: 'upcoming' },
  ],
  faqs: [
    { question: 'حداکثر مبلغ وام چقدر است؟', answer: 'مبلغ قابل دریافت برای هر شخص به نتیجه اعتبارسنجی، امتیاز و سیاست‌های روز خدمت وابسته است و پس از ورود به حساب نمایش داده می‌شود.' },
    { question: 'آیا همیشه به ضامن نیاز دارم؟', answer: 'خیر. نوع تضمین بر اساس نتیجه اعتبارسنجی و مبلغ درخواستی تعیین می‌شود.' },
    { question: 'بررسی درخواست چقدر زمان می‌برد؟', answer: 'زمان دقیق ثابت نیست؛ در هر مرحله، وضعیت و اقدام بعدی در پنل شما نمایش داده می‌شود.' },
  ],
  source: {
    id: 'loan-guide', title: 'راهنمای وام قرض‌الحسنه', section: 'شرایط و مراحل دریافت', version: '۴.۲', updatedAt: '۱۴۰۵/۰۴/۱۸', kind: 'official-knowledge',
  },
};

export const loanSources: AssistantSource[] = [
  { id: 'loan-guide', title: 'راهنمای وام قرض‌الحسنه', section: 'شرایط دریافت و مدارک', version: '۴.۲', updatedAt: '۱۴۰۵/۰۴/۱۸', kind: 'official-knowledge', excerpt: 'احراز هویت، عضویت فعال و ارزیابی اعتبار از پیش‌نیازهای بررسی درخواست هستند.' },
  { id: 'credit-policy', title: 'سیاست ارزیابی اعتبار ام‌مشاور', section: 'تضمین و توان بازپرداخت', version: '۲.۱', updatedAt: '۱۴۰۵/۰۳/۲۹', kind: 'official-knowledge', excerpt: 'نوع تضمین با توجه به نتیجه اعتبارسنجی و مبلغ درخواست تعیین می‌شود.' },
];

export const cardLockAction: SecureAction = {
  id: 'temp-card-lock', riskLevel: 3, title: 'مسدودسازی موقت کارت',
  summary: 'تراکنش‌های جدید این کارت متوقف می‌شوند. بعداً می‌توانید کارت را از مسیر امن دوباره فعال کنید.',
  requiresConfirmation: true, requiresStepUpAuth: true, maskedResource: '۶۲۷۷ •••• •••• ۴۸۲۱',
};

export const sellerStats = [
  { label: 'فروش امروز', value: '۱۲٬۴۸۰٬۰۰۰', unit: 'تومان', trend: '۱۲٪ بیشتر از دیروز', tone: 'success' },
  { label: 'سفارش‌های باز', value: '۱۸', unit: 'سفارش', trend: '۵ سفارش نیازمند اقدام', tone: 'warning' },
  { label: 'تسویه بعدی', value: '۲۸٬۹۰۰٬۰۰۰', unit: 'تومان', trend: 'یکشنبه، ۲۵ مرداد', tone: 'info' },
];
