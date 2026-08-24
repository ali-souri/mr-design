import type { AssistantEmotion } from '@/mresalat/ai/SmartAssistant3D';
import type { MResalatIconName } from '@/mresalat/core/MResalatIcon';
import type { JourneyStep } from '@/mresalat/domains/contracts';
import type { SegmentSlug } from './experience-data';

export type PhaseTwoView = 'home' | 'services' | 'journeys' | 'goals' | 'rewards' | 'activity' | 'learning' | 'benefits' | 'personnel' | 'reports';

export const phaseTwoViews: Record<SegmentSlug, PhaseTwoView[]> = {
  individual: ['home', 'services', 'journeys'],
  'under-18': ['home', 'goals', 'rewards', 'activity', 'learning'],
  organization: ['home', 'benefits', 'personnel', 'reports', 'services', 'journeys'],
};

export function isPhaseTwoView(segment: SegmentSlug, view: string): view is PhaseTwoView {
  return phaseTwoViews[segment].includes(view as PhaseTwoView);
}

export type SegmentAIResult =
  | { type: 'answer'; text: string }
  | { type: 'service'; serviceId: string; title: string; href: string }
  | { type: 'journey'; journeyId: string; title: string; href: string }
  | { type: 'status'; title: string; href: string }
  | { type: 'clarify'; question: string }
  | { type: 'handoff'; title: string; href: string };

export type SegmentAssistantResponse = {
  answer: string;
  emotion: AssistantEmotion;
  results: SegmentAIResult[];
  sourceType: 'official' | 'live' | 'ai-explanation';
};

export type SegmentPrompt = { label: string; query: string };

type AssistantIntent = {
  patterns: string[];
  response: SegmentAssistantResponse;
};

export type ActiveJourney = {
  id: string;
  title: string;
  currentStep: string;
  progress: number;
  state: 'active' | 'waiting' | 'completed';
  nextAction: string;
  href: string;
  steps: JourneyStep[];
};

export type ServiceNeedGroup = {
  title: string;
  description: string;
  items: { serviceId: string; title: string; description: string; href: string }[];
};

export const segmentPrompts: Record<SegmentSlug, SegmentPrompt[]> = {
  individual: [
    { label: 'وام می‌خواهم', query: 'وام می‌خواهم' },
    { label: 'پیگیری عضویت', query: 'عضویتم در چه مرحله‌ای است؟' },
    { label: 'خرید اقساطی', query: 'چطور خرید اقساطی انجام بدهم؟' },
    { label: 'حساب باز کنم', query: 'برای افتتاح حساب از کجا شروع کنم؟' },
  ],
  'under-18': [
    { label: 'هدف پس‌انداز', query: 'می‌خواهم برای دوچرخه پول جمع کنم' },
    { label: 'پاداش‌ها', query: 'پاداش‌هایم را نشان بده' },
    { label: 'خرج‌های من', query: 'خرج‌های اخیرم را ببینم' },
    { label: 'دوره‌های آموزشی', query: 'چه دوره آموزشی برای من خوب است؟' },
  ],
  organization: [
    { label: 'اعتبار پرسنل', query: 'چطور به پرسنل اعتبار بدهم؟' },
    { label: 'بیمه سازمانی', query: 'بیمه سازمانی را از کجا شروع کنم؟' },
    { label: 'گزارش مصرف', query: 'گزارش مصرف اعتبار را نشان بده' },
    { label: 'برنامه حمایتی', query: 'چه برنامه حمایتی فعالی داریم؟' },
  ],
};

const response = (
  answer: string,
  emotion: AssistantEmotion,
  results: SegmentAIResult[],
  sourceType: SegmentAssistantResponse['sourceType'] = 'ai-explanation',
): SegmentAssistantResponse => ({ answer, emotion, results, sourceType });

const intents: Record<SegmentSlug, AssistantIntent[]> = {
  individual: [
    { patterns: ['وام', 'تسهیلات'], response: response('برای شروع، ابتدا وضعیت عضویت و احراز هویت شما باید مشخص باشد. می‌توانم مسیر مناسب را مرحله‌به‌مرحله نشان بدهم.', 'happy', [
      { type: 'status', title: 'بررسی عضویت', href: '/segments/individual/status' },
      { type: 'service', serviceId: 'advisor', title: 'شرایط وام', href: '/loan' },
      { type: 'journey', journeyId: 'loan', title: 'مسیر درخواست', href: '/segments/individual/journeys#loan' },
    ], 'official') },
    { patterns: ['عضویت', 'احراز', 'ثبت نام'], response: response('عضویت شما در مرحله احراز هویت است. اقدام بعدی، مرور اطلاعات و ادامه تأیید هویت است.', 'explaining', [
      { type: 'status', title: 'مشاهده وضعیت عضویت', href: '/segments/individual/status' },
      { type: 'journey', journeyId: 'membership', title: 'ادامه احراز هویت', href: '/segments/individual/identity' },
    ], 'live') },
    { patterns: ['اقساط', 'خرید'], response: response('برای خرید اقساطی می‌توانید ابتدا ام‌بازار را ببینید و سپس شرایط درخواست اقساط را پیش از هر اقدامی مرور کنید.', 'explaining', [
      { type: 'service', serviceId: 'mbazar', title: 'ورود به ام‌بازار', href: '/examples/mbazar' },
      { type: 'answer', text: 'این نسخه هیچ خرید یا پرداخت واقعی انجام نمی‌دهد.' },
    ], 'official') },
    { patterns: ['حساب', 'افتتاح'], response: response('شروع افتتاح حساب از تکمیل عضویت و احراز هویت می‌گذرد. صفحه عضویت، پیش‌نیازها را کوتاه و روشن نشان می‌دهد.', 'happy', [
      { type: 'journey', journeyId: 'membership', title: 'شروع مسیر عضویت', href: '/segments/individual/membership' },
    ], 'official') },
  ],
  'under-18': [
    { patterns: ['دوچرخه', 'پس انداز', 'پس‌انداز', 'هدف', 'قلک'], response: response('می‌توانیم یک هدف پس‌انداز بسازیم و قدم‌به‌قدم پیشرفتت را ببینیم. برای دوچرخه، الان ۶۰٪ مسیر نمونه تکمیل شده است.', 'happy', [
      { type: 'journey', journeyId: 'bike-goal', title: 'دیدن هدف دوچرخه', href: '/segments/under-18/goals' },
      { type: 'answer', text: 'هیچ جابه‌جایی پول واقعی در این نسخه انجام نمی‌شود.' },
    ]) },
    { patterns: ['پاداش', 'امتیاز', 'مسئولیت'], response: response('دو مسئولیت تکمیل‌شده داری و یک پاداش منتظر تأیید سرپرست است. می‌توانی وضعیتشان را ببینی.', 'happy', [
      { type: 'status', title: 'پاداش‌ها و مسئولیت‌ها', href: '/segments/under-18/rewards' },
    ], 'live') },
    { patterns: ['خرج', 'خرید', 'فعالیت', 'برداشت', 'واریز'], response: response('فعالیت‌ها را با زبان ساده به چهار گروه واریز، خرید، برداشت و پس‌انداز تقسیم کرده‌ام.', 'explaining', [
      { type: 'status', title: 'دیدن فعالیت‌های من', href: '/segments/under-18/activity' },
    ], 'live') },
    { patterns: ['دوره', 'آموزش', 'یادگیری'], response: response('دوره «پس‌انداز برای یک هدف واقعی» برای شروع مناسب است و ۴۰٪ آن را در این نمونه پیش رفته‌ای.', 'happy', [
      { type: 'service', serviceId: 'mamoozesh', title: 'ادامه یادگیری', href: '/segments/under-18/learning' },
    ], 'official') },
  ],
  organization: [
    { patterns: ['اعتبار', 'پرسنل', 'کارکنان'], response: response('ابتدا برنامه اعتباری سازمان را انتخاب کنید، سپس کارکنان واجد شرایط را مشخص کنید. هیچ تخصیص واقعی در این نسخه انجام نمی‌شود.', 'explaining', [
      { type: 'service', serviceId: 'mhami', title: 'برنامه‌های اعتبار و مزایا', href: '/segments/organization/benefits' },
      { type: 'status', title: 'فهرست پرسنل نمونه', href: '/segments/organization/personnel' },
    ], 'official') },
    { patterns: ['بیمه'], response: response('برای بیمه سازمانی، ابتدا پوشش موردنیاز و جمعیت واجد شرایط را مشخص کنید؛ سپس مسیر بررسی طرح آغاز می‌شود.', 'explaining', [
      { type: 'service', serviceId: 'mbime', title: 'خدمات ام‌بیمه', href: '/segments/organization/services#insurance' },
      { type: 'journey', journeyId: 'insurance', title: 'مسیر بیمه سازمانی', href: '/segments/organization/journeys#insurance' },
    ], 'official') },
    { patterns: ['گزارش', 'مصرف', 'مانده'], response: response('خلاصه نمونه نشان می‌دهد ۷۲٪ اعتبار تخصیصی مصرف و ۲۸٪ باقی مانده است. جزئیات فقط داده ساختگی‌اند.', 'happy', [
      { type: 'status', title: 'گزارش مصرف اعتبار', href: '/segments/organization/reports' },
    ], 'live') },
    { patterns: ['حمایتی', 'مزایا', 'برنامه'], response: response('دو برنامه نمونه فعال‌اند: اعتبار خرید کارکنان و حمایت سلامت. وضعیت و جمعیت واجد شرایط در صفحه مزایا آمده است.', 'explaining', [
      { type: 'service', serviceId: 'mhami', title: 'مشاهده برنامه‌ها', href: '/segments/organization/benefits' },
    ], 'live') },
    { patterns: ['امنیت', 'دسترسی', 'محرمانه'], response: response('برای اطلاعات حساس سازمانی باید سطح دسترسی و هویت کاربر تأیید شود. این نمونه هیچ داده واقعی سازمان یا کارمند را نمایش نمی‌دهد.', 'warning', [
      { type: 'handoff', title: 'گفت‌وگو با پشتیبانی سازمان', href: '/rag' },
    ], 'official') },
  ],
};

const unknownResponse: SegmentAssistantResponse = response(
  'برای این موضوع هنوز پاسخ دقیق در نسخه نمایشی ندارم. می‌توانید سؤال را دقیق‌تر مطرح کنید یا از راهنمای خدمات استفاده کنید.',
  'uncertain',
  [
    { type: 'clarify', question: 'نام خدمت یا کاری را که می‌خواهید انجام دهید بنویسید.' },
    { type: 'handoff', title: 'راهنمای خدمات و پشتیبانی', href: '/rag' },
  ],
);

const normalize = (value: string) => value.trim().toLocaleLowerCase('fa-IR').replace(/ي/g, 'ی').replace(/ك/g, 'ک');

export function answerSegmentQuestion(segment: SegmentSlug, question: string): SegmentAssistantResponse {
  const normalized = normalize(question);
  const intent = intents[segment].find((item) => item.patterns.some((pattern) => normalized.includes(normalize(pattern))));
  return intent?.response ?? unknownResponse;
}

const steps = (titles: string[], current: number): JourneyStep[] => titles.map((title, index) => ({
  id: `${index + 1}`,
  title,
  status: index < current ? 'completed' : index === current ? 'current' : 'upcoming',
  description: index === current ? 'اقدام بعدی شما در این مرحله نمایش داده می‌شود.' : undefined,
}));

export const individualJourneys: ActiveJourney[] = [
  { id: 'membership', title: 'تکمیل عضویت', currentStep: 'احراز هویت', progress: 62, state: 'active', nextAction: 'ادامه احراز هویت', href: '/segments/individual/identity', steps: steps(['ثبت اطلاعات', 'تأیید همراه', 'احراز هویت', 'فعال‌سازی'], 2) },
  { id: 'loan', title: 'درخواست وام', currentStep: 'بررسی شرایط', progress: 35, state: 'waiting', nextAction: 'مرور شرایط و مدارک', href: '/loan', steps: steps(['شرایط اولیه', 'مدارک', 'بررسی', 'نتیجه'], 1) },
  { id: 'account', title: 'افتتاح حساب', currentStep: 'تکمیل شده', progress: 100, state: 'completed', nextAction: 'مشاهده خدمات', href: '/segments/individual/services', steps: steps(['عضویت', 'احراز هویت', 'فعال‌سازی'], 3) },
];

export const individualServiceGroups: ServiceNeedGroup[] = [
  { title: 'مالی و بانکی', description: 'عضویت، حساب و راهنمای وام', items: [
    { serviceId: 'membership', title: 'عضویت ام‌رسالت', description: 'شروع و پیگیری عضویت شخصی', href: '/segments/individual/membership' },
    { serviceId: 'pishkhan', title: 'پیشخوان خدمات بانکی', description: 'ورودی رسمی خدمات بانکی', href: '/examples' },
    { serviceId: 'advisor', title: 'راهنمای وام', description: 'شرایط و مسیر درخواست وام', href: '/loan' },
  ] },
  { title: 'خرید و بازار', description: 'کشف کالا و خرید مطمئن', items: [{ serviceId: 'mbazar', title: 'ام‌بازار', description: 'بازار اعضا و درخواست خرید اقساطی', href: '/examples/mbazar' }] },
  { title: 'حمایت و بیمه', description: 'خدمات پشتیبان زندگی', items: [
    { serviceId: 'mhami', title: 'ام‌حامی', description: 'برنامه‌های حمایتی اعضا', href: '/examples' },
    { serviceId: 'mbime', title: 'ام‌بیمه', description: 'آشنایی با خدمات بیمه', href: '/examples' },
  ] },
  { title: 'راهنما و پشتیبانی', description: 'پاسخ روشن پیش از اقدام', items: [{ serviceId: 'advisor', title: 'ام‌مشاور', description: 'گفت‌وگوی راهنمای خدمات', href: '/rag' }] },
];

export const youthGoals = [
  { id: 'bike', title: 'دوچرخه', target: 12_000_000, saved: 7_200_000, progress: 60, icon: 'goal' as MResalatIconName, nextAction: 'ثبت پس‌انداز هفتگی' },
  { id: 'course', title: 'دوره طراحی', target: 3_000_000, saved: 900_000, progress: 30, icon: 'education' as MResalatIconName, nextAction: 'دیدن برنامه هدف' },
];

export const youthRewards = [
  { id: 'room', title: 'مرتب‌کردن فضای مطالعه', points: 120, status: 'pending' as const, note: 'منتظر تأیید سرپرست' },
  { id: 'budget', title: 'ثبت بودجه هفتگی', points: 90, status: 'completed' as const, note: 'تکمیل‌شده در ۲۳ مرداد' },
  { id: 'lesson', title: 'پایان درس پس‌انداز', points: 150, status: 'completed' as const, note: 'امتیاز آموزشی' },
];

export const youthActivity = [
  { id: 'save', title: 'پس‌انداز برای دوچرخه', amount: '+۴۵۰٬۰۰۰', kind: 'پس‌انداز', date: 'امروز', icon: 'goal' as MResalatIconName },
  { id: 'buy', title: 'خرید کتاب', amount: '−۱۸۰٬۰۰۰', kind: 'خرید', date: 'دیروز', icon: 'orders' as MResalatIconName },
  { id: 'deposit', title: 'هدیه خانوادگی', amount: '+۳۰۰٬۰۰۰', kind: 'واریز', date: '۲۲ مرداد', icon: 'gift' as MResalatIconName },
  { id: 'withdraw', title: 'برداشت برنامه‌ریزی‌شده', amount: '−۱۲۰٬۰۰۰', kind: 'برداشت', date: '۲۰ مرداد', icon: 'finance' as MResalatIconName },
];

export const youthLearning = [
  { id: 'saving', title: 'پس‌انداز برای یک هدف واقعی', progress: 40, lessons: '۲ از ۵ درس', serviceId: 'mamoozesh' },
  { id: 'smart-buy', title: 'خرید هوشمند و مقایسه', progress: 75, lessons: '۳ از ۴ درس', serviceId: 'mamoozesh' },
  { id: 'health', title: 'عادت‌های سالم روزانه', progress: 20, lessons: '۱ از ۵ درس', serviceId: 'msalamat' },
];

export const organizationPrograms = [
  { id: 'purchase-credit', title: 'اعتبار خرید کارکنان', allocated: 2_400_000_000, used: 1_728_000_000, remaining: 672_000_000, eligible: 186, status: 'فعال' },
  { id: 'health-support', title: 'حمایت سلامت خانواده', allocated: 980_000_000, used: 411_600_000, remaining: 568_400_000, eligible: 142, status: 'فعال' },
];

export const organizationPersonnel = [
  { id: 'p-01', name: 'سارا احمدی', unit: 'عملیات', eligibility: 'واجد شرایط', credit: 'اختصاص یافته', amount: '۱۲٬۰۰۰٬۰۰۰' },
  { id: 'p-02', name: 'علی رضایی', unit: 'فناوری', eligibility: 'واجد شرایط', credit: 'مصرف جزئی', amount: '۷٬۸۰۰٬۰۰۰' },
  { id: 'p-03', name: 'مهسا کریمی', unit: 'منابع انسانی', eligibility: 'نیازمند بررسی', credit: 'تخصیص نشده', amount: '—' },
  { id: 'p-04', name: 'رضا فرهمند', unit: 'مالی', eligibility: 'واجد شرایط', credit: 'اختصاص یافته', amount: '۱۰٬۰۰۰٬۰۰۰' },
  { id: 'p-05', name: 'نرگس سلیمانی', unit: 'فروش', eligibility: 'واجد شرایط', credit: 'مصرف کامل', amount: '۰' },
];

export const organizationJourneys: ActiveJourney[] = [
  { id: 'membership', title: 'تکمیل عضویت سازمان', currentStep: 'ثبت صاحبان امضاء', progress: 68, state: 'active', nextAction: 'افزودن صاحب امضاء', href: '/segments/organization/owners', steps: steps(['اطلاعات سازمان', 'صاحبان امضاء', 'مدارک', 'پذیرش'], 1) },
  { id: 'credit', title: 'تعریف برنامه اعتباری', currentStep: 'تأیید جمعیت واجد شرایط', progress: 52, state: 'active', nextAction: 'مرور پرسنل', href: '/segments/organization/personnel', steps: steps(['انتخاب برنامه', 'پرسنل', 'تأیید', 'فعال‌سازی'], 1) },
  { id: 'insurance', title: 'بیمه سازمانی', currentStep: 'بررسی طرح', progress: 34, state: 'waiting', nextAction: 'مشاهده شرایط', href: '/segments/organization/services#insurance', steps: steps(['نیازسنجی', 'طرح بیمه', 'بررسی', 'نتیجه'], 1) },
  { id: 'assessment', title: 'ارزیابی سازمانی', currentStep: 'تکمیل شده', progress: 100, state: 'completed', nextAction: 'مشاهده نتیجه', href: '/segments/organization/reports', steps: steps(['آماده‌سازی', 'ارزیابی', 'گزارش'], 3) },
];

export const organizationServiceGroups: ServiceNeedGroup[] = [
  { title: 'حمایت و مزایا', description: 'برنامه‌های جمعی برای کارکنان', items: [{ serviceId: 'mhami', title: 'ام‌حامی', description: 'برنامه‌های حمایتی و اعتباری', href: '/segments/organization/benefits' }, { serviceId: 'mbime', title: 'ام‌بیمه', description: 'پوشش‌های بیمه سازمانی', href: '/segments/organization/journeys#insurance' }] },
  { title: 'ارزیابی و سلامت', description: 'شناخت بهتر نیازهای سازمان', items: [{ serviceId: 'saya', title: 'سایا', description: 'ارزیابی و سنجش سازمانی', href: '/examples' }, { serviceId: 'msalamat', title: 'ام‌سلامت', description: 'راهنمای سلامت کارکنان', href: '/examples' }] },
  { title: 'یادگیری و مسئولیت اجتماعی', description: 'رشد پایدار سازمان و جامعه', items: [{ serviceId: 'mamoozesh', title: 'ام‌آموزش', description: 'یادگیری و توسعه کارکنان', href: '/examples' }, { serviceId: 'heavenly-mission', title: 'رسالت آسمانی', description: 'برنامه‌های مسئولیت اجتماعی', href: '/examples' }] },
];

export const formatToman = (value: number) => `${new Intl.NumberFormat('fa-IR').format(value)} تومان`;
