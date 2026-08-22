import { AssistantShell } from '@/mresalat/ai/AssistantShell';
import { AppShell } from '@/mresalat/core/AppShell';

const quickActions = [
  { icon: '✦', title: 'عضویت در ام‌رسالت', text: 'شروع یک مسیر ساده و مرحله‌به‌مرحله' },
  { icon: '◌', title: 'دریافت وام', text: 'بررسی شرایط و مدارک وام قرض‌الحسنه' },
  { icon: '◇', title: 'خرید اقساطی', text: 'آشنایی با فروشگاه‌ها و روش پرداخت' },
];

const services = [
  { tag: 'پیشنهاد برای شروع', title: 'وام قرض‌الحسنه', text: 'شرایط، مدارک و مسیر دریافت وام را یک‌جا ببینید.', href: '/loan' },
  { tag: 'خدمت پرکاربرد', title: 'عضویت در ام‌رسالت', text: 'حساب خود را بسازید و از خدمات اکوسیستم استفاده کنید.', href: '/showcase' },
];

export default function Home() {
  return (
    <AppShell active="home">
      <section className="home-hero" aria-labelledby="welcome-title">
        <div className="welcome-copy">
          <span className="eyebrow"><span className="status-dot" /> راهنمای هوشمند شما</span>
          <h1 id="welcome-title">سلام، چطور می‌تونم کمکتون کنم؟</h1>
          <p>نیازتان را بگویید؛ من مناسب‌ترین مسیر در ام‌رسالت را پیدا می‌کنم و قدم‌به‌قدم همراهتان هستم.</p>
        </div>
        <AssistantShell variant="hero" />
      </section>

      <section className="section-block" aria-labelledby="quick-title">
        <div className="section-heading">
          <div><span className="eyebrow">دسترسی سریع</span><h2 id="quick-title">از کجا شروع کنیم؟</h2></div>
          <a className="text-link" href="/showcase">همه خدمات <span aria-hidden="true">←</span></a>
        </div>
        <div className="quick-grid">
          {quickActions.map((action) => (
            <button className="quick-card" key={action.title} type="button">
              <span className="quick-icon" aria-hidden="true">{action.icon}</span>
              <span><strong>{action.title}</strong><small>{action.text}</small></span>
              <span className="circle-arrow" aria-hidden="true">←</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section-block" aria-labelledby="services-title">
        <div className="section-heading">
          <div><span className="eyebrow">پیشنهادهای امروز</span><h2 id="services-title">خدماتی که شاید به کارتان بیاید</h2></div>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <article className={`service-card service-card-${index + 1}`} key={service.title}>
              <span className="badge">{service.tag}</span>
              <div className="service-symbol" aria-hidden="true">{index === 0 ? '٪' : 'م'}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <a className="button button-secondary" href={service.href}>مشاهده مسیر <span aria-hidden="true">←</span></a>
            </article>
          ))}
          <article className="journey-card">
            <div className="journey-card-head"><span className="journey-icon" aria-hidden="true">✓</span><span><small>مسیر در حال انجام</small><strong>تکمیل عضویت</strong></span></div>
            <div className="progress-track" aria-label="پیشرفت عضویت ۶۵ درصد"><span style={{ width: '65%' }} /></div>
            <p>فقط تأیید نشانی باقی مانده است.</p>
            <a className="text-link" href="/showcase">ادامه مسیر <span aria-hidden="true">←</span></a>
          </article>
        </div>
      </section>
    </AppShell>
  );
}
