import type { Metadata } from 'next';
import { AppShell } from '@/mresalat/core/AppShell';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { segments, segmentViews } from '@/mresalat/domains/segments';

export const metadata: Metadata = { title: 'فهرست تجربه‌ها', description: 'مرور همه تجربه‌های سگمنت‌محور MResalat System' };

export default function SegmentIndexPage() {
  return <AppShell active="segments"><header className="index-hero"><span className="eyebrow">۱۰ سگمنت · ۳۰ تجربه</span><h1>فهرست تجربه‌های MResalat System</h1><p>هر سگمنت از همان سیستم مشترک استفاده می‌کند اما ترتیب، محتوا و اقدام اصلی متناسب با نیاز اوست.</p><a className="button button-secondary" href="/qa">نمای فشرده QA<MResalatIcon name="next" size={16} /></a></header><div className="segment-index-grid">{segments.map((segment, index) => <article key={segment.id}><header><span className="domain-icon"><MResalatIcon name={segment.icon} size={24} /></span><span className="segment-number">{String(index + 1).padStart(2, '0')}</span></header><h2>{segment.name}</h2><p>{segment.description}</p><nav>{segmentViews.map((view) => <a href={`/segments/${segment.slug}/${view}`} key={view}>{segment.pages[view].label}<MResalatIcon name="next" size={16} /></a>)}</nav></article>)}</div></AppShell>;
}
