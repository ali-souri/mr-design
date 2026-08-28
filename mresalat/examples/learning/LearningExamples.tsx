'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/mresalat/core/primitives';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { DomainLanding, Field, Panel, ProductExampleShell, SearchBox, SegmentedTabs } from '../product/ProductExampleShell';

type Provider = { id: string; name: string; kind: string; city: string; mode: 'حضوری' | 'آنلاین' | 'ترکیبی'; topics: string[]; open: boolean };
const providers: Provider[] = [
  { id: 'EDU-01', name: 'مرکز یادگیری سپهر', kind: 'مهارت‌های شغلی', city: 'تهران', mode: 'ترکیبی', topics: ['مهارت دیجیتال', 'مدیریت'], open: true },
  { id: 'EDU-02', name: 'آموزشگاه نمونه دانا', kind: 'زبان و ارتباط', city: 'شیراز', mode: 'آنلاین', topics: ['زبان', 'ارتباط مؤثر'], open: true },
  { id: 'EDU-03', name: 'خانه دانش فردا', kind: 'دانش عمومی', city: 'مشهد', mode: 'حضوری', topics: ['اقتصاد خانواده', 'فرهنگ'], open: false },
  { id: 'EDU-04', name: 'مرکز مسیر نو', kind: 'کارآفرینی', city: 'اصفهان', mode: 'ترکیبی', topics: ['کسب‌وکار', 'فروش'], open: true },
];

export function ProviderSearch({ variant }: { variant: 'mamouzesh' | 'mdonap' }) {
  const [query, setQuery] = useState(''); const [city, setCity] = useState('همه'); const [mode, setMode] = useState('همه'); const [selected, setSelected] = useState<Provider>(); const [view, setView] = useState('grid');
  const filtered = useMemo(() => providers.filter((provider) => (!query || `${provider.name} ${provider.kind} ${provider.topics.join(' ')}`.includes(query)) && (city === 'همه' || provider.city === city) && (mode === 'همه' || provider.mode === mode)), [query, city, mode]);
  const isDonap = variant === 'mdonap';
  return <ProductExampleShell serviceId={isDonap ? 'mdonap' : 'mamouzesh'}><section className={`learning-search-hero ${isDonap ? 'donap' : ''}`}><div><span className="eyebrow">{isDonap ? 'دانش و محتوای کاربردی' : 'جستجوی مرکز آموزشی'}</span><h2>{isDonap ? 'یادگیری را با موضوع شروع کنید' : 'مرکز مناسب را پیدا کنید'}</h2><p>{isDonap ? 'ارائه‌دهندگان دانش و مسیرهای محتوایی را مرور کنید؛ خرید یا ثبت‌نام در این دمو انجام نمی‌شود.' : 'مرکز، شهر و شیوه ارائه را با داده‌های کاملاً ساختگی فیلتر کنید.'}</p></div><SearchBox value={query} onChange={setQuery} placeholder={isDonap ? 'موضوع یا مهارت…' : 'نام مرکز یا دوره…'} /></section><Panel title={isDonap ? 'ارائه‌دهندگان ام‌دُناپ' : 'مراکز ام‌آموزش'} eyebrow={`${filtered.length.toLocaleString('fa-IR')} نتیجه نمایشی`} icon={isDonap ? 'learning' : 'education'} actions={<SegmentedTabs value={view} onChange={setView} tabs={[{ id: 'grid', label: 'شبکه' }, { id: 'list', label: 'فهرست' }]} />}><div className="provider-filters"><Field label="شهر"><select value={city} onChange={(event) => setCity(event.target.value)}><option>همه</option><option>تهران</option><option>شیراز</option><option>مشهد</option><option>اصفهان</option></select></Field><Field label="شیوه ارائه"><select value={mode} onChange={(event) => setMode(event.target.value)}><option>همه</option><option>حضوری</option><option>آنلاین</option><option>ترکیبی</option></select></Field><button className="button button-ghost" type="button" onClick={() => { setQuery(''); setCity('همه'); setMode('همه'); }}>پاک‌کردن</button></div><div className={`provider-results ${view}`}>{filtered.map((provider) => <article className="provider-card" key={provider.id}><header><span><MResalatIcon name={isDonap ? 'learning' : 'education'} size={24} /></span><Badge tone={provider.open ? 'success' : 'neutral'}>{provider.open ? 'پذیرش نمایشی باز' : 'فعلاً بسته'}</Badge></header><h3>{provider.name}</h3><p>{provider.kind}</p><dl><div><dt>شهر</dt><dd>{provider.city}</dd></div><div><dt>ارائه</dt><dd>{provider.mode}</dd></div></dl><div className="chip-row">{provider.topics.map((topic) => <span key={topic}>{topic}</span>)}</div><button className="button button-secondary" type="button" onClick={() => setSelected(provider)}>پیش‌نمایش ارائه‌دهنده</button></article>)}{filtered.length === 0 && <div className="product-empty"><MResalatIcon name="search" size={26} /><strong>نتیجه‌ای پیدا نشد</strong><p>عبارت یا فیلترها را تغییر دهید.</p></div>}</div></Panel>{selected && <aside className="provider-preview" role="dialog" aria-modal="true" aria-label="پیش‌نمایش ارائه‌دهنده"><button type="button" className="icon-button" aria-label="بستن" onClick={() => setSelected(undefined)}><MResalatIcon name="close" size={20} /></button><span className="eyebrow">پیش‌نمایش امن</span><h2>{selected.name}</h2><p>این مرکز و اطلاعات آن ساختگی است. فقط چیدمان و مسیر کشف ارائه‌دهنده نمایش داده می‌شود.</p><ul>{selected.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul><button className="button button-primary" type="button" disabled>{isDonap ? 'خرید / درخواست غیرفعال است' : 'رزرو / ثبت‌نام غیرفعال است'}</button></aside>}</ProductExampleShell>;
}

export function LearningLanding() {
  return <DomainLanding domainKey="learning" lead={<section className="domain-lead learning-lead"><div><span className="eyebrow">جستجو پیش از تعهد</span><h2>دو مسیر یادگیری، دو ترکیب محصول</h2><p>ام‌آموزش بر مرکز و شیوه ارائه تمرکز دارد؛ ام‌دُناپ از موضوع و دانش شروع می‌کند.</p></div><div className="learning-compare"><span><MResalatIcon name="education" size={24} />مرکز‌محور</span><span><MResalatIcon name="learning" size={24} />موضوع‌محور</span></div></section>} />;
}

export const learningScreens: Record<string, React.ComponentType> = {
  mamouzesh: () => <ProviderSearch variant="mamouzesh" />,
  mdonap: () => <ProviderSearch variant="mdonap" />,
};
