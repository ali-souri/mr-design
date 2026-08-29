import packageMetadata from '@/package.json';
import Link from 'next/link';
import { componentInventory } from '@/mresalat/core/component-inventory';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { Badge } from '@/mresalat/core/primitives';
import { serviceCatalog, serviceCatalogChapters } from '@/mresalat/domains/service-catalog';
import { segments } from '@/mresalat/domains/segments';
import { DocsSearch } from './DocsSearch';

const cards = [
  { title: 'شروع کار', detail: 'نصب، اجرا، ساختار پروژه و اولین صفحه', href: '/showcase/getting-started', icon: 'code' },
  { title: 'شخصی‌سازی', detail: 'Theme، رنگ، تایپوگرافی، layout و mascot', href: '/showcase/customization', icon: 'settings' },
  { title: 'ساخت تجربه', detail: 'Service page، domain، segment و journey', href: '/showcase/guides/create-service-page', icon: 'add' },
  { title: 'اجزا و API', detail: 'نمونه زنده، import واقعی و props تایپ‌شده', href: '/showcase/components', icon: 'grid' },
  { title: 'معماری', detail: 'State، RAG، WebGL و مرز API آینده', href: '/showcase/architecture', icon: 'evidence' },
  { title: 'مرجع', detail: 'Token، icon، route، service و configuration', href: '/showcase/reference/configuration', icon: 'search' },
] as const;

export function DocumentationLanding() {
  return (
    <section className="docs-landing" aria-labelledby="docs-landing-title">
      <header>
        <div>
          <Badge tone="success">v{packageMetadata.version} · Developer Documentation</Badge>
          <span className="eyebrow">Persian-first · RTL-first · React · TypeScript</span>
          <h1 id="docs-landing-title">مستندات توسعه‌دهنده<br /><bdi dir="ltr">MResalat System</bdi></h1>
          <p>برای اجرا، شخصی‌سازی، ساخت component و domain، درک Trust/Risk و آماده‌سازی integration واقعی—بدون پنهان‌کردن Showcase اجرایی موجود.</p>
          <nav aria-label="دسترسی سریع مستندات"><Link className="button button-primary" href="/showcase/getting-started/quick-start">شروع سریع<MResalatIcon name="next" size={16} /></Link><Link className="button button-secondary" href="/showcase/components">اجزا و API</Link><a className="button button-ghost" href="#legacy-showcase">همه دموهای Showcase</a></nav>
        </div>
        <div className="docs-landing-search"><strong>جستجو در مستندات</strong><p>عنوان، component، token، service و guide</p><DocsSearch /></div>
      </header>
      <div className="docs-landing-cards">{cards.map((card) => <Link key={card.href} href={card.href}><span><MResalatIcon name={card.icon} size={22} /></span><strong>{card.title}</strong><p>{card.detail}</p><small>باز کردن <MResalatIcon name="next" size={14} /></small></Link>)}</div>
      <dl className="docs-landing-stats">
        <div><dt>اجزای ثبت‌شده</dt><dd>{componentInventory.length}</dd></div>
        <div><dt>مسیرهای ممیزی‌شده</dt><dd>{serviceCatalog.length}</dd></div>
        <div><dt>دامنه‌ها / فصل‌ها</dt><dd>{serviceCatalogChapters.length}</dd></div>
        <div><dt>تجربه‌های مخاطب</dt><dd>{segments.length}</dd></div>
      </dl>
    </section>
  );
}
