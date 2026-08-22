import type { Metadata } from 'next';
import { AssistantShell } from '@/mresalat/ai/AssistantShell';
import { TrustLegend, UncertainAnswer } from '@/mresalat/ai/StructuredAnswer';
import { AppShell } from '@/mresalat/core/AppShell';
import { Alert, Badge, Button } from '@/mresalat/core/primitives';
import { riskLevelLabels } from '@/mresalat/domains/contracts';

export const metadata: Metadata = { title: 'نمایشگاه سیستم' };

const screens = [
  { code: 'A', title: 'خانه عمومی', text: 'کشف نیاز با دستیار Hero و اولویت‌های کاربر تازه', href: '/', tone: 'blue' },
  { code: 'B', title: 'وام و ام‌مشاور', text: 'قالب تکرارپذیر معرفی و مسیر یک خدمت', href: '/loan', tone: 'cyan' },
  { code: 'C', title: 'خانه فروشنده', text: 'داشبورد عملیاتی با دستیار Compact', href: '/seller', tone: 'navy' },
  { code: 'D', title: 'پاسخ مستند RAG', text: 'منبع، تازگی، عدم‌قطعیت و ارجاع انسانی', href: '/rag', tone: 'violet' },
  { code: 'E', title: 'عملیات امن', text: 'تأیید صریح، احراز دومرحله‌ای و رسید', href: '/secure', tone: 'red' },
];

export default function ShowcasePage() {
  return (
    <AppShell active="services">
      <header className="showcase-hero"><span className="eyebrow">نسخه ۰.۱ · سطح داخلی</span><h1>MResalat System</h1><p>زبان مشترک تجربه‌های هوشمند، سفرهای خدمت و عملیات امن در اکوسیستم ام‌رسالت.</p><div className="token-strip"><span><i style={{ background: 'var(--action-primary)' }} /> Primary</span><span><i style={{ background: 'var(--accent-cyan)' }} /> Accent</span><span><i style={{ background: 'var(--status-success)' }} /> Success</span><span><i style={{ background: 'var(--status-warning)' }} /> Warning</span><span><i style={{ background: 'var(--status-danger)' }} /> Danger</span></div></header>

      <section className="showcase-section"><div className="section-heading"><div><span className="eyebrow">تجربه‌های مرجع</span><h2>پنج صفحه برای بازبینی</h2></div></div><div className="screen-grid">{screens.map((screen) => <a className={`screen-card screen-${screen.tone}`} href={screen.href} key={screen.code}><span>{screen.code}</span><div><h3>{screen.title}</h3><p>{screen.text}</p></div><i aria-hidden="true">←</i></a>)}</div></section>

      <section className="showcase-section"><span className="eyebrow">چگالی دستیار</span><h2>یک الگو، سه سطح حضور</h2><div className="variant-stack"><div><Badge tone="info">Hero</Badge><AssistantShell variant="hero" /></div><div><Badge tone="success">Context</Badge><AssistantShell variant="context" /></div><div><Badge tone="neutral">Compact</Badge><AssistantShell variant="compact" /></div></div></section>

      <section className="showcase-section"><span className="eyebrow">اعتماد و ریسک</span><h2>زبان صریح برای منشأ اطلاعات و حساسیت اقدام</h2><TrustLegend /><div className="risk-grid">{([0, 1, 2, 3] as const).map((level) => <article key={level} className={`risk-level risk-level-${level}`}><strong>{riskLevelLabels[level]}</strong><p>{level === 0 ? 'پاسخ مستند از دانش عمومی' : level === 1 ? 'داده زنده پس از ورود و با ماسک' : level === 2 ? 'پیش‌نمایش و تأیید یک اقدام برگشت‌پذیر' : 'احراز قوی، تأیید صریح و رسید قطعی'}</p></article>)}</div></section>

      <section className="showcase-section"><span className="eyebrow">حالت‌های سیستم</span><h2>بازخورد روشن و قابل بازیابی</h2><div className="alerts-demo"><Alert tone="success" title="درخواست با موفقیت ثبت شد">شماره پیگیری در سوابق شما ذخیره شد.</Alert><Alert tone="info" title="اطلاعات از سامانه دریافت شد">این داده همین حالا به‌روزرسانی شده است.</Alert><Alert tone="warning" title="اطلاعات بیشتری لازم است">لطفاً فقط یک سؤال روشن‌کننده را پاسخ دهید.</Alert><Alert tone="danger" title="سرویس موقتاً در دسترس نیست">تغییری ثبت نشد؛ می‌توانید دوباره تلاش کنید.</Alert></div><UncertainAnswer /></section>

      <section className="showcase-section"><span className="eyebrow">کنترل‌های پایه</span><h2>دکمه‌ها و نشان‌ها</h2><div className="primitive-row"><Button>اقدام اصلی</Button><Button tone="secondary">اقدام دوم</Button><Button tone="danger">اقدام حساس</Button><Badge tone="success">موفق</Badge><Badge tone="warning">نیازمند توجه</Badge><Badge tone="danger">حساس</Badge><Badge tone="neutral">خنثی</Badge></div></section>
    </AppShell>
  );
}
