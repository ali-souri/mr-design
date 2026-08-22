import { AssistantShell } from '@/mresalat/ai/AssistantShell';
import { Alert, Badge } from '@/mresalat/core/primitives';
import type { ServiceJourney } from '@/mresalat/domains/contracts';
import Link from 'next/link';

export function ServicePageTemplate({ journey }: { journey: ServiceJourney }) {
  return (
    <>
      <div className="breadcrumbs"><Link href="/">خانه</Link><span>←</span><a href="/showcase">خدمات</a><span>←</span><b>وام قرض‌الحسنه</b></div>
      <section className="service-hero-layout">
        <div className="service-hero-copy">
          <Badge tone="success">ام‌مشاور · راهنمای رسمی خدمت</Badge>
          <h1>{journey.title}</h1>
          <p>{journey.summary}</p>
          <div className="hero-actions"><a className="button button-primary" href="#start">بررسی شرایط من</a><a className="button button-ghost" href="#journey">مشاهده مراحل</a></div>
          <div className="source-inline"><span aria-hidden="true">▤</span><span>منبع رسمی · {journey.source.title} · نسخه {journey.source.version}<small>به‌روزرسانی {journey.source.updatedAt}</small></span></div>
        </div>
        <div className="service-visual" aria-hidden="true"><div className="coins"><span>٪</span><i /><i /></div><strong>مسیر وام،<br />شفاف و قدم‌به‌قدم</strong></div>
      </section>

      <div className="content-with-aside">
        <div>
          <section className="content-section" aria-labelledby="benefits-title"><span className="eyebrow">در یک نگاه</span><h2 id="benefits-title">چرا این خدمت؟</h2><div className="benefit-grid">{journey.benefits.map((item, index) => <article key={item}><span aria-hidden="true">{index === 0 ? '٪' : index === 1 ? '⌂' : '◎'}</span><p>{item}</p></article>)}</div></section>

          <section className="content-section split-info" aria-label="شرایط و مدارک">
            <div className="info-panel"><div className="panel-title"><span aria-hidden="true">✓</span><h2>شرایط اولیه</h2></div><ul className="check-list">{journey.requirements.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div className="info-panel"><div className="panel-title"><span aria-hidden="true">▤</span><h2>مدارک موردنیاز</h2></div><ul className="document-list">{journey.documents.map((item) => <li key={item}><i aria-hidden="true">□</i>{item}</li>)}</ul></div>
          </section>

          <section className="content-section" id="journey" aria-labelledby="journey-title"><span className="eyebrow">مسیر خدمت</span><h2 id="journey-title">از بررسی تا دریافت وام</h2><ol className="journey-stepper">{journey.steps.map((step, index) => <li key={step.id} className={step.status}><span>{index + 1}</span><div><strong>{step.title}</strong><p>{step.description}</p></div></li>)}</ol></section>

          <section className="content-section" aria-labelledby="faq-title"><span className="eyebrow">پرسش‌های پرتکرار</span><h2 id="faq-title">پاسخ کوتاه به سؤال‌های مهم</h2><div className="faq-list">{journey.faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary>{faq.question}<span aria-hidden="true">⌄</span></summary><p>{faq.answer}</p></details>)}</div></section>
          <Alert tone="warning" title="تصمیم نهایی پس از بررسی حساب شماست">اطلاعات این صفحه راهنمای عمومی است. مبلغ، مدت بازپرداخت و نوع تضمین پس از اعتبارسنجی و ورود امن مشخص می‌شود.</Alert>
        </div>
        <aside className="service-aside" id="start"><div className="sticky-card"><span className="eyebrow">گام بعدی پیشنهادی</span><h3>شرایط خودتان را بررسی کنید</h3><p>با ورود امن، امتیاز و گزینه‌های قابل استفاده برای شما نمایش داده می‌شود.</p><a className="button button-primary button-block" href="/secure">شروع بررسی امن <span aria-hidden="true">←</span></a><div className="privacy-note"><span aria-hidden="true">⌾</span>بدون تأیید شما اقدامی انجام نمی‌شود.</div></div><AssistantShell variant="context" /></aside>
      </div>
    </>
  );
}
