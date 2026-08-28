'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Badge } from '@/mresalat/core/primitives';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { MResalatServiceIcon } from '@/mresalat/core/MResalatServiceIcon';
import { ecosystemServiceById } from '@/mresalat/domains/ecosystem';
import { serviceCatalogById, type ServiceVerificationStatus } from '@/mresalat/domains/service-catalog';
import { exampleDomains, routesForDomain, type ExampleDomain, type ExampleDomainKey } from './example-route-registry';
import {
  filterServiceDiscoveryItems,
  pathCountByDomain,
  serviceDiscoveryItems,
  sortExampleDomains,
  sortServiceDiscoveryItems,
  type DiscoveryDomainFilter,
  type DiscoverySort,
  type ServiceDiscoveryItem,
} from './service-discovery';

const sortOptions: { value: DiscoverySort; label: string }[] = [
  { value: 'audit', label: 'ترتیب اصلی / ممیزی' },
  { value: 'fa', label: 'الفبایی فارسی' },
  { value: 'en', label: 'Alphabetical English' },
  { value: 'count-desc', label: 'بیشترین تعداد مسیر' },
  { value: 'count-asc', label: 'کمترین تعداد مسیر' },
];

const statusLabels: Record<ServiceVerificationStatus, string> = {
  authenticated: 'نیازمند ورود',
  public: 'عمومی',
  'safe-stop': 'توقف امن',
  gated: 'مرز دسترسی',
  unavailable: 'در دسترس نیست',
  'not-visible': 'مشاهده نشد',
};

function statusTone(status: ServiceVerificationStatus): 'info' | 'success' | 'warning' | 'danger' | 'neutral' {
  if (status === 'public') return 'success';
  if (status === 'safe-stop' || status === 'gated') return 'warning';
  if (status === 'unavailable') return 'danger';
  if (status === 'not-visible') return 'neutral';
  return 'info';
}

function DomainPreview({ domainKey }: { domainKey: ExampleDomainKey }) {
  const services = routesForDomain(domainKey).slice(0, 3).map((route) => serviceCatalogById[route.serviceId]);
  return <div className={`gallery-preview preview-${domainKey}`} aria-hidden="true"><header><i /><i /><i /></header>{domainKey === 'communication' || domainKey === 'mhami' ? <div className="preview-conversation">{services.map((service, index) => <span key={service.id}><b>{service.titleFa.slice(0, 1)}</b><i style={{ width: `${74 - index * 12}%` }} /></span>)}</div> : domainKey === 'mhesam' || domainKey === 'banking' ? <div className="preview-finance"><strong>••••••••</strong><span /><span /><small>Demo balance</small></div> : domainKey === 'rahyar' ? <div className="preview-error"><MResalatIcon name="error" size={28} /><span>404</span></div> : <div className="preview-cards">{services.map((service) => <span key={service.id}><MResalatIcon name={service.icon} size={20} /><i /></span>)}</div>}</div>;
}

function ProductDomainCard({ domain, matchingServices }: { domain: ExampleDomain; matchingServices: ServiceDiscoveryItem[] }) {
  const routes = routesForDomain(domain.key);
  const identity = ecosystemServiceById[domain.ecosystemServiceId];
  const representativeRoutes = matchingServices.length ? matchingServices.slice(0, 3).map((item) => item.route) : routes.slice(0, 3);
  const auditIndex = exampleDomains.findIndex((item) => item.key === domain.key);

  return <article className={`product-domain-card accent-${domain.accent}`}>
    <div className="domain-card-number">{String(auditIndex + 1).padStart(2, '0')}</div>
    <DomainPreview domainKey={domain.key} />
    <header>
      <MResalatServiceIcon service={identity} size={48} />
      <div><h2>{domain.titleFa}</h2><small lang="en" dir="ltr">{domain.titleEn}</small></div>
      <Badge tone="neutral">{routes.length.toLocaleString('fa-IR')} مسیر</Badge>
    </header>
    <p>{domain.description}</p>
    <div className="domain-card-links">{representativeRoutes.map((route) => <Link href={route.href} key={route.serviceId}>{serviceCatalogById[route.serviceId].titleFa}</Link>)}</div>
    <Link className="domain-open" href={domain.href}>ورود به تجربه‌های دامنه<MResalatIcon name="next" size={17} /></Link>
  </article>;
}

function ProductRouteCard({ item }: { item: ServiceDiscoveryItem }) {
  const highRisk = item.service.riskLevel === 'L2' || item.service.riskLevel === 'L3';
  return <Link className={`product-route-card accent-${item.domain.accent}`} href={item.route.href} data-service-id={item.service.id} data-identity-source={item.identity.identity.source}>
    <header>
      <MResalatServiceIcon service={item.identity} size={48} />
      <div><h3>{item.service.titleFa}</h3><small lang="en" dir="ltr">{item.service.titleEn}</small></div>
      <MResalatIcon name="next" size={18} />
    </header>
    <div className="route-product-identity"><span>{item.identity.titleFa}</span><i aria-hidden="true" /><span>{item.domain.titleFa}</span></div>
    <p>{item.purpose}</p>
    <footer>
      <span><Badge tone={statusTone(item.service.verificationStatus)}>{statusLabels[item.service.verificationStatus]}</Badge>{highRisk && <Badge tone={item.service.riskLevel === 'L3' ? 'danger' : 'neutral'}>{item.service.riskLevel}</Badge>}</span>
      <strong>مشاهده تجربه تعاملی</strong>
    </footer>
  </Link>;
}

export function ProductGallery() {
  const [query, setQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState<DiscoveryDomainFilter>('all');
  const [sort, setSort] = useState<DiscoverySort>('audit');

  const filteredServices = useMemo(() => sortServiceDiscoveryItems(filterServiceDiscoveryItems(query, domainFilter), sort, query), [domainFilter, query, sort]);
  const visibleDomainKeys = useMemo(() => new Set(filteredServices.map((item) => item.route.domain)), [filteredServices]);
  const visibleDomains = useMemo(() => sortExampleDomains(exampleDomains.filter((domain) => visibleDomainKeys.has(domain.key)), sort), [sort, visibleDomainKeys]);
  const hasActiveFilters = Boolean(query.trim()) || domainFilter !== 'all' || sort !== 'audit';

  const resetDiscovery = () => {
    setQuery('');
    setDomainFilter('all');
    setSort('audit');
  };

  return <>
    <section className="examples-product-hero"><div><span className="eyebrow">MResalat product prototypes · 2026 audit</span><h1>۶۹ خدمت، به‌شکل تجربه‌های واقعی محصول</h1><p>از جستجو و فیلتر تا فرم، OTP، گفت‌وگو، درگاه امن و وضعیت خطا؛ همه با داده ساختگی و همان مرز توقف ممیزی‌شده.</p><div><Badge tone="success">۶۹ / ۶۹ مسیر متصل</Badge><Badge tone="info">۱۲ فصل محصول</Badge><Badge tone="neutral">بدون اتصال واقعی</Badge></div></div><aside><strong>Catalog ≠ Examples</strong><p><bdi dir="ltr">/catalog</bdi> شواهد و پوشش را نگه می‌دارد؛ اینجا خودِ تجربه محصول را می‌بینید.</p><Link href="/catalog">مشاهده ردپای ممیزی<MResalatIcon name="next" size={16} /></Link></aside></section>

    <section className="product-discovery" aria-labelledby="product-discovery-title">
      <header><div><span className="eyebrow">Explore all product paths</span><h2 id="product-discovery-title">خدمت یا اقدام دقیق را پیدا کنید</h2><p>نام فارسی یا انگلیسی، اقدام، نیاز یا دامنه را جستجو کنید.</p></div><output aria-live="polite"><strong>{filteredServices.length.toLocaleString('fa-IR')}</strong> مسیر در <strong>{visibleDomains.length.toLocaleString('fa-IR')}</strong> دامنه</output></header>
      <form className="product-discovery-toolbar" onSubmit={(event) => event.preventDefault()}>
        <label className="product-discovery-search"><MResalatIcon name="search" size={22} /><span className="sr-only">جستجوی خدمت یا اقدام</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="نام خدمت، اقدام یا نیاز را جستجو کنید…" autoComplete="off" /></label>
        <label className="product-discovery-sort"><span>مرتب‌سازی</span><select value={sort} onChange={(event) => setSort(event.target.value as DiscoverySort)}>{sortOptions.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}</select></label>
        <button className="button button-ghost product-discovery-reset" type="button" onClick={resetDiscovery} disabled={!hasActiveFilters}><MResalatIcon name="filters" size={16} />پاک‌کردن فیلترها</button>
      </form>
      <div className="product-domain-filters" aria-label="فیلتر دامنه محصول">
        <button type="button" className={domainFilter === 'all' ? 'active' : ''} aria-pressed={domainFilter === 'all'} onClick={() => setDomainFilter('all')}>همه <small>{serviceDiscoveryItems.length.toLocaleString('fa-IR')}</small></button>
        {exampleDomains.map((domain) => <button type="button" className={domainFilter === domain.key ? 'active' : ''} aria-pressed={domainFilter === domain.key} onClick={() => setDomainFilter(domain.key)} key={domain.key}>{domain.titleFa}<small>{pathCountByDomain[domain.key].toLocaleString('fa-IR')}</small></button>)}
      </div>
    </section>

    <section className="product-gallery-section" aria-labelledby="product-domains-title">
      <header className="gallery-section-heading"><div><span className="eyebrow">Browse by domain</span><h2 id="product-domains-title">دامنه‌های محصول</h2><p>اگر حوزه نیازتان را می‌دانید، از هویت رسمی هر محصول وارد شوید.</p></div><a href="#service-index">رفتن به فهرست همه مسیرها<MResalatIcon name="down" size={16} /></a></header>
      {visibleDomains.length ? <div className="product-gallery">{visibleDomains.map((domain) => <ProductDomainCard domain={domain} matchingServices={filteredServices.filter((item) => item.route.domain === domain.key)} key={domain.key} />)}</div> : <div className="product-discovery-empty"><MResalatIcon name="search" size={28} /><h3>دامنه‌ای با این جستجو پیدا نشد</h3><p>عبارت دیگری امتحان کنید یا فیلترها را پاک کنید.</p><button className="button button-ghost" type="button" onClick={resetDiscovery}>نمایش همه مسیرها</button></div>}
    </section>

    <section className="product-route-index" id="service-index" aria-labelledby="service-index-title">
      <header className="gallery-section-heading"><div><span className="eyebrow">69 audited paths</span><h2 id="service-index-title">فهرست کامل تجربه‌های تعاملی</h2><p>هر نتیجه مستقیماً به نمونه واقعی همان مسیر می‌رود؛ بدون نیاز به شناخت دامنه مادر.</p></div><span>{filteredServices.length.toLocaleString('fa-IR')} نتیجه</span></header>
      {filteredServices.length ? <div className="product-route-grid">{filteredServices.map((item) => <ProductRouteCard item={item} key={item.service.id} />)}</div> : <div className="product-discovery-empty"><MResalatIcon name="search" size={28} /><h3>خدمتی با این جستجو پیدا نشد</h3><p>املای فارسی یا انگلیسی دیگری را امتحان کنید.</p><button className="button button-ghost" type="button" onClick={resetDiscovery}>پاک‌کردن جستجو و فیلترها</button></div>}
    </section>
  </>;
}
