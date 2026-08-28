'use client';

import Link from 'next/link';
import { useId, useState, type ReactNode } from 'react';
import { AppShell } from '@/mresalat/core/AppShell';
import { Badge } from '@/mresalat/core/primitives';
import { MResalatIcon, type MResalatIconName } from '@/mresalat/core/MResalatIcon';
import { serviceCatalogById, type ServiceRiskLevel } from '@/mresalat/domains/service-catalog';
import { exampleDomainByKey, routesForDomain, type ExampleDomainKey } from './example-route-registry';

const riskTone = (risk: ServiceRiskLevel) => risk === 'L3' ? 'danger' : risk === 'L2' ? 'warning' : risk === 'L1' ? 'success' : 'info';

export function ProductExampleShell({ serviceId, children, actions }: { serviceId: string; children: ReactNode; actions?: ReactNode }) {
  const service = serviceCatalogById[serviceId];
  const route = routesForDomain(service.chapter === 1 ? 'membership' : service.chapter === 2 ? 'mhami' : service.chapter === 3 ? 'mbazar' : service.chapter === 4 ? 'learning' : service.chapter === 5 ? 'mhesam' : service.chapter === 6 ? 'heavenly-resalat' : service.chapter === 7 ? 'msalamat' : service.chapter === 8 ? 'mbime' : service.chapter === 9 ? 'auxiliary' : service.chapter === 10 ? 'rahyar' : service.chapter === 11 ? 'banking' : 'communication').find((item) => item.serviceId === serviceId)!;
  const domain = exampleDomainByKey[route.domain];
  return <AppShell active="examples"><div className={`product-example accent-${domain.accent}`}>
    <nav className="product-breadcrumb" aria-label="مسیر صفحه"><Link href="/examples">نمونه‌های محصول</Link><MResalatIcon name="next" size={15} /><Link href={domain.href}>{domain.titleFa}</Link><MResalatIcon name="next" size={15} /><strong>{service.titleFa}</strong></nav>
    <header className="product-hero"><div><span className="eyebrow">نمونه تعاملی · داده کاملاً ساختگی</span><h1>{service.titleFa}</h1><p className="product-en" lang="en" dir="ltr">{service.titleEn}</p><p>{service.note ?? domain.description}</p><div className="product-badges"><Badge tone={riskTone(service.riskLevel)}>{service.riskLevel}</Badge><Badge tone="neutral">{service.verificationStatus}</Badge><Badge tone="info">Mock / Demo</Badge></div></div>{actions && <aside className="product-hero-actions">{actions}</aside>}</header>
    <nav className="domain-route-strip" aria-label={`مسیرهای ${domain.titleFa}`}>{routesForDomain(domain.key).map((item) => <Link aria-current={item.serviceId === serviceId ? 'page' : undefined} href={item.href} key={item.serviceId}>{serviceCatalogById[item.serviceId].titleFa}</Link>)}</nav>
    <div className="product-canvas">{children}</div>
    <DemoBoundary serviceId={serviceId} />
  </div></AppShell>;
}

export function DemoBoundary({ serviceId, title = 'مرز امن نسخه نمایشی' }: { serviceId: string; title?: string }) {
  const service = serviceCatalogById[serviceId];
  return <aside className={`product-boundary risk-${service.riskLevel.toLowerCase()}`}><span><MResalatIcon name={service.riskLevel === 'L3' ? 'security' : 'warning'} size={22} /></span><div><strong>{title}</strong><p>{service.safeStopFa}</p><small lang="en" dir="ltr">{service.safeStopEn}</small></div></aside>;
}

export function DomainLanding({ domainKey, title, description, lead, children }: { domainKey: ExampleDomainKey; title?: string; description?: string; lead?: ReactNode; children?: ReactNode }) {
  const domain = exampleDomainByKey[domainKey]; const routes = routesForDomain(domainKey);
  return <AppShell active="examples"><div className={`product-example domain-landing accent-${domain.accent}`}><nav className="product-breadcrumb" aria-label="مسیر صفحه"><Link href="/examples">نمونه‌های محصول</Link><MResalatIcon name="next" size={15} /><strong>{domain.titleFa}</strong></nav><header className="product-hero"><div><span className="eyebrow">فصل محصول · {routes.length.toLocaleString('fa-IR')} مسیر ممیزی‌شده</span><h1>{title ?? domain.titleFa}</h1><p className="product-en" lang="en" dir="ltr">{domain.titleEn}</p><p>{description ?? domain.description}</p></div><Badge tone="info">همه داده‌ها ساختگی‌اند</Badge></header>{lead}<section className="domain-service-grid" aria-label={`تجربه‌های ${domain.titleFa}`}>{routes.map((route, index) => { const service = serviceCatalogById[route.serviceId]; return <Link className="domain-service-card" href={route.href} key={route.serviceId}><span>{String(index + 1).padStart(2, '0')}</span><MResalatIcon name={service.icon} size={24} /><div><strong>{service.titleFa}</strong><small lang="en" dir="ltr">{service.titleEn}</small><p>{service.surfaceKind === 'form' ? 'فرم تعاملی و مرور امن' : service.surfaceKind === 'list' ? 'فهرست، جستجو و حالت‌ها' : service.surfaceKind === 'gate' ? 'مرز دسترسی مستقل' : 'تجربه محصول ممیزی‌شده'}</p></div><MResalatIcon name="next" size={18} /></Link>; })}</section>{children}</div></AppShell>;
}

export function Panel({ title, eyebrow, icon = 'grid', children, actions, className = '' }: { title: string; eyebrow?: string; icon?: MResalatIconName; children: ReactNode; actions?: ReactNode; className?: string }) {
  return <section className={`product-panel ${className}`}><header><span className="panel-icon"><MResalatIcon name={icon} size={22} /></span><div>{eyebrow && <small>{eyebrow}</small>}<h2>{title}</h2></div>{actions && <div className="panel-actions">{actions}</div>}</header>{children}</section>;
}

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return <ol className="product-stepper" aria-label="مراحل فرایند">{steps.map((step, index) => <li className={index < current ? 'done' : index === current ? 'current' : ''} aria-current={index === current ? 'step' : undefined} key={step}><span>{(index + 1).toLocaleString('fa-IR')}</span><strong>{step}</strong></li>)}</ol>;
}

export function SegmentedTabs({ tabs, value, onChange, label = 'انتخاب نما' }: { tabs: Array<{ id: string; label: string }>; value: string; onChange: (id: string) => void; label?: string }) {
  return <div className="product-tabs" role="tablist" aria-label={label}>{tabs.map((tab) => <button type="button" role="tab" aria-selected={tab.id === value} className={tab.id === value ? 'active' : ''} onClick={() => onChange(tab.id)} key={tab.id}>{tab.label}</button>)}</div>;
}

export function SearchBox({ value, onChange, placeholder = 'جستجو در داده‌های نمایشی…', label = 'جستجو' }: { value: string; onChange: (value: string) => void; placeholder?: string; label?: string }) {
  return <label className="product-search"><span className="sr-only">{label}</span><MResalatIcon name="search" size={19} /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /></label>;
}

export function Field({ label, helper, children }: { label: string; helper?: string; children: ReactNode }) {
  return <label className="product-field"><span>{label}</span>{children}{helper && <small>{helper}</small>}</label>;
}

export function SafeReview({ title = 'مرور پیش از ادامه', rows, action = 'ادامه واقعی در دمو غیرفعال است' }: { title?: string; rows: Array<{ label: string; value: string }>; action?: string }) {
  return <section className="safe-review"><header><MResalatIcon name="assessment" size={22} /><div><small>Review</small><h3>{title}</h3></div></header><dl>{rows.map((row) => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl><button className="button button-primary" type="button" disabled>{action}</button></section>;
}

export function ExternalProductGate({ title, description, evidence = 'در ممیزی، ورود در یک سامانه جداگانه مشاهده شد.' }: { title: string; description: string; evidence?: string }) {
  return <section className="external-product-gate" role="status"><span><MResalatIcon name="lock" size={34} /></span><Badge tone="warning">درگاه مستقل</Badge><h2>{title}</h2><p>{description}</p><div><MResalatIcon name="evidence" size={17} /><span>{evidence}</span></div><button className="button button-secondary" type="button" disabled>ورود نمایشی غیرفعال است</button></section>;
}

export function UnavailableProduct({ serviceId, notVisible = false }: { serviceId: string; notVisible?: boolean }) {
  const service = serviceCatalogById[serviceId];
  return <ProductExampleShell serviceId={serviceId}><section className="product-unavailable" role="status"><span><MResalatIcon name={notVisible ? 'help' : 'error'} size={42} /></span><small>{notVisible ? 'Audited absence' : 'HTTP 404 observed'}</small><h2>{notVisible ? 'این قابلیت برای حساب ممیزی‌شده دیده نشد' : 'این خدمت هنگام ممیزی در دسترس نبود'}</h2><p>{notVisible ? 'هیچ گردش‌کار یا محتوای فرضی ساخته نشده است. این صفحه فقط وضعیت مشاهده‌نشده را صریح و قابل بازبینی نگه می‌دارد.' : 'به‌جای ساختن یک مسیر خیالی، همان وضعیت خطای مشاهده‌شده نگه داشته شده است.'}</p><div><Link className="button button-secondary" href="/examples">بازگشت به نمونه‌ها</Link><button className="button button-ghost" type="button" onClick={() => window.location.reload()}>تلاش دوباره</button><Link className="button button-ghost" href="/examples/communication/support">راهنما و پشتیبانی</Link></div><code>{service.id}</code></section></ProductExampleShell>;
}

export function useMockReview(initialStep = 0) {
  const [step, setStep] = useState(initialStep); const [message, setMessage] = useState(''); const liveId = useId();
  const next = () => { setStep((current) => current + 1); setMessage('مرحله بعدی دمو نمایش داده شد؛ هیچ داده‌ای ارسال نشد.'); };
  return { step, setStep, next, message, liveId };
}
