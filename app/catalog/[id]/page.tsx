import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { AppShell } from '@/mresalat/core/AppShell';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { CatalogDomainSurface } from '@/mresalat/catalog/CatalogDomainSurface';
import { ServiceStatusBadge, ServiceSurface } from '@/mresalat/catalog/ServiceCatalogPrimitives';
import { serviceComponentRegistry } from '@/mresalat/domains/service-component-registry';
import { serviceCatalog, serviceCatalogById } from '@/mresalat/domains/service-catalog';

export function generateStaticParams() { return serviceCatalog.map((service) => ({ id: service.id })); }

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const service = serviceCatalogById[id];
  if (!service) return {};
  const description = `${service.titleEn}؛ دموی طراحی سیستم با وضعیت ${service.verificationStatus} و ریسک ${service.riskLevel}.`;
  return { title: `${service.titleFa} · کاتالوگ خدمات`, description, openGraph: { title: service.titleFa, description, images: [] }, twitter: { title: service.titleFa, description, images: [] } };
}

export default async function CatalogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = serviceCatalogById[id];
  if (!service) notFound();
  return <AppShell active="catalog"><nav className="catalog-breadcrumb" aria-label="مسیر صفحه"><Link href="/catalog">کاتالوگ خدمات</Link><MResalatIcon name="next" size={16} /><span>فصل {String(service.chapter).padStart(2, '0')}</span><MResalatIcon name="next" size={16} /><strong>{service.titleFa}</strong></nav><ServiceSurface service={service}><div className="catalog-detail-status"><ServiceStatusBadge status={service.verificationStatus} /><span><MResalatIcon name="evidence" size={16} />رکورد ممیزی <bdi dir="ltr">#{service.id}</bdi></span><span>دموی غیرمتصل</span></div><CatalogDomainSurface service={service} /><section className="catalog-traceability" aria-labelledby="traceability-title"><header><span className="eyebrow">ردیابی طراحی</span><h2 id="traceability-title">اجزای ثبت‌شده این مسیر</h2><p>هر کلید به تعریف مشترک در رجیستری طراحی سیستم resolves می‌شود.</p></header><div>{service.componentKeys.map((key) => <article key={key}><code>{key}</code><strong>{serviceComponentRegistry[key].name}</strong><small>{serviceComponentRegistry[key].descriptionFa}</small><span>{serviceComponentRegistry[key].family}</span></article>)}</div></section><footer className="catalog-detail-footer"><Link className="button button-secondary" href="/catalog">بازگشت به ۶۹ مسیر</Link>{service.demoHref && <a className="button button-primary" href={service.demoHref}>مشاهده نمونه موجود<MResalatIcon name="next" size={16} /></a>}</footer></ServiceSurface></AppShell>;
}
