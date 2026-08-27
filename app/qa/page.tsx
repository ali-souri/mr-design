import type { Metadata } from 'next';
import Link from 'next/link';
import { AppShell } from '@/mresalat/core/AppShell';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { segments, segmentViews } from '@/mresalat/domains/segments';
import { serviceCatalog, serviceCatalogChapters } from '@/mresalat/domains/service-catalog';

export const metadata: Metadata = { title: 'Route QA Index' };

const canonical = [{ label: 'خانه عمومی', href: '/' }, { label: 'انتخاب سگمنت', href: '/segments' }, { label: 'شخص حقیقی · خانه', href: '/segments/individual' }, { label: 'شخص حقیقی · احراز هویت', href: '/segments/individual/identity' }, { label: 'شخص حقیقی · OTP', href: '/segments/individual/otp' }, { label: 'شخص حقیقی · وضعیت', href: '/segments/individual/status' }, { label: 'نوجوان · خانه', href: '/segments/under-18' }, { label: 'نوجوان · اطلاعات', href: '/segments/under-18/child-info' }, { label: 'نوجوان · وضعیت', href: '/segments/under-18/status' }, { label: 'سازمان · خانه', href: '/segments/organization' }, { label: 'سازمان · صاحبان امضاء', href: '/segments/organization/owners' }, { label: 'سازمان · وضعیت', href: '/segments/organization/status' }, { label: 'نمونه‌های اکوسیستم', href: '/examples' }, { label: 'سبد ام‌بازار', href: '/examples/mbazar/cart' }, { label: 'پرداخت ام‌بازار', href: '/examples/mbazar/checkout?step=delivery' }, { label: 'مرکز اقساط ام‌بازار', href: '/examples/mbazar/installments' }, { label: 'سفارش فعال', href: '/examples/mbazar/orders/order-2841' }, { label: 'سفارش تحویل‌شده', href: '/examples/mbazar/orders/order-2480' }, { label: 'سفارش لغوشده', href: '/examples/mbazar/orders/order-2319' }, { label: 'سفارش مشکل‌دار', href: '/examples/mbazar/orders/order-2264' }, { label: 'علاقه‌مندی با افت قیمت', href: '/examples/mbazar/favorites' }, { label: 'درخواست پشتیبانی', href: '/examples/mbazar/support/new?order=order-2264' }, { label: 'ام‌بازار من', href: '/examples/mbazar/profile' }, { label: 'وام ام‌مشاور', href: '/loan' }, { label: 'فروشنده فعال', href: '/seller' }, { label: 'پاسخ RAG', href: '/rag' }, { label: 'عملیات امن', href: '/secure' }, { label: 'Showcase', href: '/showcase' }];

const phaseTwoQa = [
  { label: 'Phase 3 · کنترل همه زمینه‌ها و QA reset', href: '/qa/contexts' },
  { label: 'Phase 3 · والد · خانه با تأیید', href: '/segments/parent/home?pending=1' },
  { label: 'Phase 3 · والد · خانه بدون تأیید', href: '/segments/parent/home?pending=0' },
  { label: 'Phase 3 · والد · نمای آریا', href: '/segments/parent/child/arya' },
  { label: 'Phase 3 · والد · حریم خصوصی فعالیت', href: '/segments/parent/child/arya/activity' },
  { label: 'Phase 3 · نوجوان · پول توجیبی', href: '/segments/under-18/allowance' },
  { label: 'Phase 3 · پرسنل · خانه', href: '/segments/organization-employee/home' },
  { label: 'Phase 3 · مدیر · جزئیات پرسنل', href: '/segments/organization/personnel/p-01' },
  { label: 'Phase 3 · مدیر · تخصیص اعتبار', href: '/segments/organization/credit/allocate' },
  { label: 'Phase 3 · هدف نوجوان → ام‌بازار', href: '/examples/mbazar/search?q=دوچرخه&source=youth-goal&goal=bike&child=arya' },
  { label: 'Phase 3 · اعتبار سازمانی → ام‌بازار', href: '/examples/mbazar/search?source=organization-credit&program=benefit-demo' },
  { label: 'Phase 2 · شخص حقیقی · AI و خانه', href: '/segments/individual/home' },
  { label: 'Phase 2 · شخص حقیقی · خدمات', href: '/segments/individual/services' },
  { label: 'Phase 2 · شخص حقیقی · مسیر فعال', href: '/segments/individual/journeys#membership' },
  { label: 'Phase 2 · نوجوان · AI و ماسکات', href: '/segments/under-18/home' },
  { label: 'Phase 2 · نوجوان · هدف', href: '/segments/under-18/goals#bike' },
  { label: 'Phase 2 · نوجوان · پاداش', href: '/segments/under-18/rewards' },
  { label: 'Phase 2 · نوجوان · فعالیت', href: '/segments/under-18/activity' },
  { label: 'Phase 2 · نوجوان · یادگیری', href: '/segments/under-18/learning' },
  { label: 'Phase 2 · سازمان · AI و خانه', href: '/segments/organization/home' },
  { label: 'Phase 2 · سازمان · مزایا', href: '/segments/organization/benefits' },
  { label: 'Phase 2 · سازمان · پرسنل', href: '/segments/organization/personnel' },
  { label: 'Phase 2 · سازمان · گزارش‌ها', href: '/segments/organization/reports' },
  { label: 'Phase 2 · سازمان · خدمات', href: '/segments/organization/services' },
  { label: 'Phase 2 · سازمان · فرایندها', href: '/segments/organization/journeys' },
];

const mascotStates = ['greeting', 'idle', 'calm', 'listening', 'thinking', 'explaining', 'happy', 'warning', 'uncertain', 'handoff', 'portrait'];
const mascotHands = ['relaxed', 'open', 'wave', 'point', 'explain', 'caution', 'thinking', 'support', 'fist'];
const catalogQa = serviceCatalogChapters.map((chapter) => {
  const representative = serviceCatalog.find((service) => service.chapter === chapter.id)!;
  return { label: `فصل ${String(chapter.id).padStart(2, '0')} · ${chapter.titleFa}`, href: `/catalog/${representative.id}`, count: serviceCatalog.filter((service) => service.chapter === chapter.id).length };
});

export default function QaPage() {
  return <AppShell active="system"><header className="qa-head"><span className="eyebrow">بازبینی مسیرها</span><h1>Route QA Index</h1><p>مسیرهای نمایشی هسته، سگمنت‌های پس از ثبت‌نام، ام‌بازار و پوشش ۶۹ مسیر ممیزی‌شده از یک صفحه قابل دسترسی‌اند.</p></header><section className="qa-canonical" id="catalog-coverage"><h2>پوشش کاتالوگ · ۶۹ / ۶۹</h2><div><Link href="/catalog">همه مسیرها و فیلترها<MResalatIcon name="grid" size={16} /></Link>{catalogQa.map((route) => <a href={route.href} key={route.href}>{route.label}<span>{route.count}</span><MResalatIcon name="next" size={16} /></a>)}</div></section><section className="qa-canonical"><h2>نمونه‌های مرجع</h2><div>{[...phaseTwoQa, ...canonical].map((route) => <a href={route.href} key={`${route.href}-${route.label}`}>{route.label}<MResalatIcon name="next" size={16} /></a>)}</div></section><section className="qa-canonical"><h2>آزمایش سریع حالت‌های ماسکات</h2><div>{mascotStates.map((state) => <a href={`/qa/mascot/${state}`} key={state}>{state}<MResalatIcon name="assistant" size={16} /></a>)}</div></section><section className="qa-canonical"><h2>آزمایش rig و ژست دست</h2><div>{mascotHands.map((pose) => <a href={`/qa/mascot/hand/${pose}`} key={pose}>{pose}<MResalatIcon name="assistant" size={16} /></a>)}</div></section><div className="qa-route-table"><div className="qa-row qa-row-head"><span>سگمنت</span>{segmentViews.map((view) => <span key={view}>{view === 'home' ? 'خانه' : view === 'services' ? 'خدمات' : 'مسیر'}</span>)}</div>{segments.map((segment) => <div className="qa-row" key={segment.id}><strong><MResalatIcon name={segment.icon} size={16} />{segment.name}</strong>{segmentViews.map((view) => <a href={`/segments/${segment.slug}/${view}`} key={view}>{segment.pages[view].label}<MResalatIcon name="next" size={16} /></a>)}</div>)}</div></AppShell>;
}
