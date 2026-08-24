import type { Metadata } from 'next';
import { AppShell } from '@/mresalat/core/AppShell';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { segments, segmentViews } from '@/mresalat/domains/segments';
import { SegmentSelector } from '@/mresalat/segments/SegmentPhaseOne';

export const metadata: Metadata = { title: 'فهرست تجربه‌ها', description: 'مرور همه تجربه‌های سگمنت‌محور MResalat System' };

export default function SegmentIndexPage() {
  return <AppShell active="segments"><header className="index-hero"><span className="eyebrow">انتخاب مسیر اصلی</span><h1>کدام تجربه برای شماست؟</h1><p>انتخاب شما فقط یک برچسب نیست؛ خدمات، فرایندها، راهنما و اقدام‌های بعدی را متناسب با مسیرتان تنظیم می‌کند.</p><a className="button button-secondary" href="/qa">نمای فشرده QA<MResalatIcon name="next" size={16} /></a></header><section className="seg-selector-section"><div><span className="eyebrow">سه مسیر عضویت</span><h2>نوع عضویت را انتخاب کنید</h2></div><SegmentSelector /></section><section className="seg-legacy-index"><header><span className="eyebrow">تجربه‌های تکمیلی سیستم</span><h2>نقش‌ها و نیازهای دیگر</h2></header><div className="segment-index-grid">{segments.map((segment, index) => <article key={segment.id}><header><span className="domain-icon"><MResalatIcon name={segment.icon} size={24} /></span><span className="segment-number">{String(index + 1).padStart(2, '0')}</span></header><h2>{segment.name}</h2><p>{segment.description}</p><nav>{segmentViews.map((view) => <a href={`/segments/${segment.slug}/${view}`} key={view}>{segment.pages[view].label}<MResalatIcon name="next" size={16} /></a>)}</nav></article>)}</div></section></AppShell>;
}
