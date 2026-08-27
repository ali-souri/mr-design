'use client';

import { useMemo, useState } from 'react';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { serviceComponentRegistry } from '@/mresalat/domains/service-component-registry';
import { catalogDomains, serviceCatalog, serviceCatalogChapters, type ServiceRiskLevel, type ServiceVerificationStatus } from '@/mresalat/domains/service-catalog';
import { EmptyServiceState, ServiceStatusBadge, ServiceSurface } from './ServiceCatalogPrimitives';

const statusOptions: { value: ServiceVerificationStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'همه وضعیت‌ها' }, { value: 'public', label: 'عمومی' }, { value: 'authenticated', label: 'پس از ورود' }, { value: 'safe-stop', label: 'توقف امن' }, { value: 'gated', label: 'درگاه جدا' }, { value: 'unavailable', label: 'در دسترس نبود' }, { value: 'not-visible', label: 'مشاهده نشد' },
];

export function ServiceFilterBar({ chapter, domain, status, risk, onChapter, onDomain, onStatus, onRisk, onReset }: {
  chapter: string; domain: string; status: string; risk: string;
  onChapter: (value: string) => void; onDomain: (value: string) => void; onStatus: (value: string) => void; onRisk: (value: string) => void; onReset: () => void;
}) {
  return <form className="catalog-filter-bar" onSubmit={(event) => event.preventDefault()} aria-label="فیلتر پوشش کاتالوگ"><label><span>فصل</span><select value={chapter} onChange={(event) => onChapter(event.target.value)}><option value="all">همه ۱۲ فصل</option>{serviceCatalogChapters.map((item) => <option value={item.id} key={item.id}>{String(item.id).padStart(2, '0')} · {item.titleFa}</option>)}</select></label><label><span>دامنه</span><select value={domain} onChange={(event) => onDomain(event.target.value)}><option value="all">همه دامنه‌ها</option>{catalogDomains.map((item) => <option value={item} key={item}>{item}</option>)}</select></label><label><span>وضعیت ممیزی</span><select value={status} onChange={(event) => onStatus(event.target.value)}>{statusOptions.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}</select></label><label><span>ریسک</span><select value={risk} onChange={(event) => onRisk(event.target.value)}><option value="all">همه سطوح</option>{(['L0', 'L1', 'L2', 'L3'] as ServiceRiskLevel[]).map((item) => <option value={item} key={item}>{item}</option>)}</select></label><button type="button" className="button button-ghost" onClick={onReset}><MResalatIcon name="filters" size={16} />پاک‌کردن فیلترها</button></form>;
}

export function CatalogExplorer() {
  const [chapter, setChapter] = useState('all');
  const [domain, setDomain] = useState('all');
  const [status, setStatus] = useState('all');
  const [risk, setRisk] = useState('all');
  const filtered = useMemo(() => serviceCatalog.filter((item) => (chapter === 'all' || String(item.chapter) === chapter) && (domain === 'all' || item.domain === domain) && (status === 'all' || item.verificationStatus === status) && (risk === 'all' || item.riskLevel === risk)), [chapter, domain, status, risk]);
  const grouped = serviceCatalogChapters.map((chapterItem) => ({ chapter: chapterItem, services: filtered.filter((item) => item.chapter === chapterItem.id) })).filter((group) => group.services.length);
  const reset = () => { setChapter('all'); setDomain('all'); setStatus('all'); setRisk('all'); };
  return <div className="catalog-explorer"><ServiceFilterBar chapter={chapter} domain={domain} status={status} risk={risk} onChapter={setChapter} onDomain={setDomain} onStatus={setStatus} onRisk={setRisk} onReset={reset} /><div className="catalog-result-summary" aria-live="polite"><strong>{filtered.length} از ۶۹ مسیر</strong><span>{grouped.length} فصل در نتیجه فعلی</span></div>{!filtered.length ? <EmptyServiceState title="مسیر منطبق پیدا نشد" detail="یکی از فیلترها را پاک کنید." /> : grouped.map(({ chapter: chapterItem, services }) => <section className="catalog-chapter" id={`chapter-${chapterItem.id}`} key={chapterItem.id}><header><div><span>{String(chapterItem.id).padStart(2, '0')}</span><div><h2>{chapterItem.titleFa}</h2><p lang="en" dir="ltr">{chapterItem.titleEn}</p></div></div><strong>{services.length} مسیر</strong></header><div className="catalog-card-grid">{services.map((service) => <ServiceSurface service={service} compact key={service.id}><div className="catalog-card-meta"><ServiceStatusBadge status={service.verificationStatus} compact /><span>{service.surfaceKind}</span></div><p className="catalog-card-boundary">{service.safeStopFa}</p><div className="catalog-component-tags" aria-label="اجزای استفاده‌شده">{service.componentKeys.slice(0, 3).map((key) => <span key={key}>{serviceComponentRegistry[key].name}</span>)}{service.componentKeys.length > 3 && <span>+{service.componentKeys.length - 3}</span>}</div><footer><a href={`/catalog/${service.id}`}>دموی canonical<MResalatIcon name="next" size={16} /></a>{service.demoHref && <a href={service.demoHref}>نمونه موجود</a>}</footer></ServiceSurface>)}</div></section>)}</div>;
}
