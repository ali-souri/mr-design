import type { Metadata } from 'next';
import { AppShell } from '@/mresalat/core/AppShell';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { segments, segmentViews } from '@/mresalat/domains/segments';

export const metadata: Metadata = { title: 'Route QA Index' };

const canonical = [{ label: 'خانه عمومی', href: '/' }, { label: 'نمونه‌های اکوسیستم', href: '/examples' }, { label: 'سبد ام‌بازار', href: '/examples/mbazar/cart' }, { label: 'پرداخت ام‌بازار', href: '/examples/mbazar/checkout?step=delivery' }, { label: 'مرکز اقساط ام‌بازار', href: '/examples/mbazar/installments' }, { label: 'وام ام‌مشاور', href: '/loan' }, { label: 'فروشنده فعال', href: '/seller' }, { label: 'پاسخ RAG', href: '/rag' }, { label: 'عملیات امن', href: '/secure' }, { label: 'Showcase', href: '/showcase' }];

export default function QaPage() {
  return <AppShell active="system"><header className="qa-head"><span className="eyebrow">بازبینی مسیرها</span><h1>Route QA Index</h1><p>مسیرهای نمایشی هسته و ام‌بازار از یک صفحه قابل دسترسی‌اند.</p></header><section className="qa-canonical"><h2>نمونه‌های مرجع</h2><div>{canonical.map((route) => <a href={route.href} key={route.href}>{route.label}<MResalatIcon name="next" size={16} /></a>)}</div></section><div className="qa-route-table"><div className="qa-row qa-row-head"><span>سگمنت</span>{segmentViews.map((view) => <span key={view}>{view === 'home' ? 'خانه' : view === 'services' ? 'خدمات' : 'مسیر'}</span>)}</div>{segments.map((segment) => <div className="qa-row" key={segment.id}><strong><MResalatIcon name={segment.icon} size={16} />{segment.name}</strong>{segmentViews.map((view) => <a href={`/segments/${segment.slug}/${view}`} key={view}>{segment.pages[view].label}<MResalatIcon name="next" size={16} /></a>)}</div>)}</div></AppShell>;
}
