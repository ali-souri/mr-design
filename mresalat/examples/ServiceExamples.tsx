'use client';

import { useMemo, useState } from 'react';
import { ServiceAssistant } from '@/mresalat/ai/ServiceAssistant';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { MResalatServiceIcon } from '@/mresalat/core/MResalatServiceIcon';
import { Badge } from '@/mresalat/core/primitives';
import { conceptualServices, ecosystemServices } from '@/mresalat/domains/ecosystem';

const categories = [
  ['all', 'همه'], ['membership', 'عضویت'], ['support', 'حمایت و راهنمایی'], ['commerce', 'بازار'],
  ['learning', 'آموزش'], ['wellbeing', 'سلامت و پوشش'], ['operations', 'سامانه‌ها'], ['communication', 'ارتباطات'],
] as const;

export function ServiceExamples() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<(typeof categories)[number][0]>('all');
  const [selectedId, setSelectedId] = useState('membership');
  const filtered = useMemo(() => ecosystemServices.filter((service) => {
    const categoryMatches = category === 'all' || service.category === category;
    const queryMatches = !query.trim() || `${service.titleFa} ${service.titleEn} ${service.actions.map((item) => item.label).join(' ')}`.toLowerCase().includes(query.trim().toLowerCase());
    return categoryMatches && queryMatches;
  }), [category, query]);
  const selected = ecosystemServices.find((service) => service.id === selectedId) ?? filtered[0] ?? ecosystemServices[0];

  return (
    <>
      <section className="service-discovery" aria-labelledby="current-services">
        <div className="service-discovery-head"><div><span className="eyebrow">Current / live</span><h2 id="current-services">خدمات جاری و قابل مشاهده</h2><p>فهرست بر اساس صفحه عمومی ام‌رسالت در ۳۱ مرداد ۱۴۰۵ بازبینی شده است.</p></div><label className="service-search"><MResalatIcon name="search" size={20} /><span className="sr-only">جست‌وجوی خدمت</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="نام خدمت یا اقدام…" /></label></div>
        <div className="service-filters" aria-label="فیلتر دسته خدمات">{categories.map(([value, label]) => <button type="button" className={category === value ? 'active' : ''} onClick={() => setCategory(value)} key={value}>{label}</button>)}</div>
        <div className="service-selector-grid">
          {filtered.map((service) => <button type="button" key={service.id} className={selected.id === service.id ? 'selected' : ''} onClick={() => service.id === 'mbazar' ? window.location.assign('/examples/mbazar') : setSelectedId(service.id)} aria-pressed={selected.id === service.id}><MResalatServiceIcon service={service} size={48} /><span><strong>{service.titleFa}</strong><small>{service.id === 'mbazar' ? 'ورود به تجربه خریدار' : service.titleEn}</small></span><MResalatIcon name="next" size={16} /></button>)}
          {filtered.length === 0 && <p className="service-empty">خدمتی با این جست‌وجو پیدا نشد.</p>}
        </div>
      </section>

      <article className="service-example" id={`example-${selected.slug}`}>
        <header className="service-example-head">
          <div><MResalatServiceIcon service={selected} size={64} /><span><small>{selected.titleEn}</small><h2>{selected.titleFa}</h2></span></div>
          <div><Badge tone="success">جاری / عمومی</Badge><Badge tone="neutral">نمونه بدون API</Badge></div>
        </header>
        <ServiceAssistant service={selected} />
        <div className="service-example-body">
          <section><span className="eyebrow">عملکرد تأییدشده</span><h3>کارهایی که اکنون در محصول دیده می‌شوند</h3><p>{selected.description}</p><div className="verified-action-grid">{selected.actions.map((action) => <button type="button" key={action.label}><span><MResalatIcon name={action.icon} size={20} /></span><strong>{action.label}</strong><small>{action.evidence === 'service-route-visible' ? 'مسیر عمومی خدمت' : 'صفحه عمومی'}</small></button>)}</div></section>
          <aside className="service-mock-state"><span><MResalatIcon name="evidence" size={20} />وضعیت نمایشی</span><small>{selected.example.label}</small><strong>{selected.example.value}</strong><p>{selected.example.detail}</p><div><i /><span>اطلاعات آزمایشی، بدون داده مشتری</span></div></aside>
        </div>
        <footer className="service-source"><MResalatIcon name="evidence" size={16} /><span><strong>منبع عملکرد</strong><small>{selected.source.reference} · بازبینی {selected.source.reviewedAt}</small></span><Badge tone={selected.identity.source === 'official-asset' ? 'info' : 'neutral'}>{selected.identity.source === 'official-asset' ? 'دارایی رسمی' : 'طراحی MResalat System'}</Badge></footer>
      </article>

      <section className="conceptual-examples" aria-labelledby="conceptual-services"><div><span className="eyebrow">Conceptual / project-documented</span><h2 id="conceptual-services">نمونه‌های مفهومی و مستند پروژه</h2><p>این بخش عمداً از خدمات جاری جداست.</p></div>{conceptualServices.map((service) => <article key={service.id}><MResalatServiceIcon service={service} size={48} /><div><strong>{service.titleFa}</strong><p>{service.description}</p></div><Badge tone="warning" wrap="multiline">غیرقابل تأیید در سایت عمومی</Badge></article>)}</section>
    </>
  );
}
