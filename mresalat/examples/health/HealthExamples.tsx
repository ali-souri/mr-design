'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Badge } from '@/mresalat/core/primitives';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { ExternalProductGate, Field, Panel, ProductExampleShell, SearchBox, SegmentedTabs } from '../product/ProductExampleShell';

const healthProviders = [
  { id: 'HP-01', name: 'مرکز سلامت نمونه سپید', type: 'مرکز عمومی', city: 'تهران', next: 'شنبه · زمان نمایشی', remote: true },
  { id: 'HP-02', name: 'درمانگاه ساختگی مهر', type: 'خدمات عمومی', city: 'شیراز', next: 'دوشنبه · زمان نمایشی', remote: false },
  { id: 'HP-03', name: 'مرکز مراقبت آفتاب', type: 'مشاوره عمومی', city: 'مشهد', next: 'زمان آزاد مشاهده نشد', remote: true },
];

export function HealthProviders() {
  const [serviceType, setServiceType] = useState('همه'); const [query, setQuery] = useState(''); const [city, setCity] = useState('همه'); const [selected, setSelected] = useState<(typeof healthProviders)[number]>();
  const providers = useMemo(() => healthProviders.filter((provider) => (!query || `${provider.name} ${provider.type}`.includes(query)) && (city === 'همه' || provider.city === city) && (serviceType === 'همه' || provider.type === serviceType)), [query, city, serviceType]);
  return <ProductExampleShell serviceId="msalamat-public"><section className="health-service-picker"><div><span className="eyebrow">نوع خدمت عمومی</span><h2>از نیاز عمومی شروع کنید</h2></div><SegmentedTabs value={serviceType} onChange={setServiceType} tabs={[{ id: 'همه', label: 'همه' }, { id: 'مرکز عمومی', label: 'مرکز عمومی' }, { id: 'خدمات عمومی', label: 'خدمات عمومی' }, { id: 'مشاوره عمومی', label: 'مشاوره' }]} /></section><Panel title="یافتن ارائه‌دهنده" eyebrow="بدون داده سلامت" icon="health"><div className="provider-filters"><SearchBox value={query} onChange={setQuery} placeholder="نام مرکز یا نوع خدمت…" /><Field label="شهر"><select value={city} onChange={(event) => setCity(event.target.value)}><option>همه</option><option>تهران</option><option>شیراز</option><option>مشهد</option></select></Field><label className="consent-row"><input type="checkbox" /><span>نمایش ارائه‌دهندگان با مشاوره از راه دور</span></label></div><div className="health-provider-grid">{providers.map((provider) => <article key={provider.id}><header><span className="product-card-header-icon"><MResalatIcon name="clinic" size={24} /></span><Badge tone={provider.remote ? 'info' : 'neutral'}>{provider.remote ? 'حضوری / از راه دور' : 'حضوری'}</Badge></header><h3>{provider.name}</h3><p>{provider.type} · {provider.city}</p><div className="availability-row"><span>نزدیک‌ترین زمان ساختگی</span><strong>{provider.next}</strong></div><button className="button button-secondary" type="button" onClick={() => setSelected(provider)}>جزئیات مرکز</button></article>)}</div></Panel>{selected && <aside className="provider-preview" role="dialog" aria-modal="true"><button className="icon-button" type="button" aria-label="بستن" onClick={() => setSelected(undefined)}><MResalatIcon name="close" size={20} /></button><Badge tone="info">پروفایل ساختگی</Badge><h2>{selected.name}</h2><p>فقط اطلاعات عمومی و ساختگی نمایش داده شده است. هیچ علامت، شرح حال یا داده پزشکی وارد نکنید.</p><dl><div><dt>نوع</dt><dd>{selected.type}</dd></div><div><dt>شهر</dt><dd>{selected.city}</dd></div><div><dt>زمان</dt><dd>{selected.next}</dd></div></dl><button className="button button-primary" type="button" disabled>رزرو و ارسال داده سلامت غیرفعال است</button></aside>}</ProductExampleShell>;
}

export function MyHealth() {
  return <ProductExampleShell serviceId="my-health"><section className="health-privacy-hero"><span><MResalatIcon name="security" size={28} /></span><div><small>سلامت من · نمای کلی</small><h2>حریم خصوصی، قبل از هر رکورد</h2><p>این داشبورد فقط مسیرهای سطح بالا را نشان می‌دهد؛ تشخیص، نتیجه آزمایش یا داده بالینی وجود ندارد.</p></div><Badge tone="success">داده سلامت: صفر</Badge></section><div className="health-nav-grid"><Link href="/examples/msalamat/appointments"><MResalatIcon name="calendar" size={27} /><strong>نوبت‌های من</strong><p>نمونه‌های آینده و گذشته را مرور کنید.</p><span>باز کردن<MResalatIcon name="next" size={16} /></span></Link><Link href="/examples/msalamat/medical-record"><MResalatIcon name="clinic" size={27} /><strong>پرونده پزشکی</strong><p>ردیف‌های قفل‌شده و پوشانده را ببینید.</p><span>باز کردن<MResalatIcon name="next" size={16} /></span></Link><Link href="/examples/msalamat"><MResalatIcon name="search" size={27} /><strong>یافتن مرکز</strong><p>جستجوی عمومی بدون ثبت نیاز سلامت.</p><span>باز کردن<MResalatIcon name="next" size={16} /></span></Link></div></ProductExampleShell>;
}

const appointments = [
  { id: 'APT-D-104', title: 'مرکز سلامت نمونه', kind: 'خدمت عمومی', date: 'شنبه · ۱۰:۳۰', tab: 'upcoming', status: 'تأیید نمایشی' },
  { id: 'APT-D-088', title: 'مرکز مراقبت ساختگی', kind: 'مشاوره عمومی', date: '۱۴۰۵/۰۴/۱۲', tab: 'past', status: 'پایان‌یافته' },
];

export function Appointments() {
  const [tab, setTab] = useState('upcoming'); const [query, setQuery] = useState(''); const [state, setState] = useState('populated');
  const rows = state === 'empty' ? [] : appointments.filter((item) => item.tab === tab && (!query || `${item.title} ${item.kind}`.includes(query)));
  return <ProductExampleShell serviceId="my-appointments"><Panel title="نوبت‌های من" eyebrow="جزئیات بیمار و ارائه‌دهنده ساختگی" icon="calendar" actions={<SegmentedTabs value={state} onChange={setState} tabs={[{ id: 'populated', label: 'نمونه پُر' }, { id: 'empty', label: 'خالی' }]} />}><div className="transaction-toolbar"><SegmentedTabs value={tab} onChange={setTab} tabs={[{ id: 'upcoming', label: 'پیشِ رو' }, { id: 'past', label: 'گذشته' }]} /><SearchBox value={query} onChange={setQuery} placeholder="نام مرکز یا نوع خدمت…" /></div><div className="appointment-list">{rows.map((item) => <article key={item.id}><div className="appointment-date"><span>{item.tab === 'upcoming' ? 'شنبه' : '۱۲'}</span><small>{item.tab === 'upcoming' ? '۱۰:۳۰' : 'تیر'}</small></div><div><small dir="ltr">{item.id}</small><h3>{item.title}</h3><p>{item.kind} · {item.date}</p></div><Badge tone={item.tab === 'upcoming' ? 'success' : 'neutral'}>{item.status}</Badge><div><button className="button button-secondary" type="button">جزئیات</button><button className="button button-ghost" type="button" disabled>{item.tab === 'upcoming' ? 'لغو امن غیرفعال' : 'رزرو دوباره غیرفعال'}</button></div></article>)}{rows.length === 0 && <div className="product-empty"><MResalatIcon name="calendar" size={27} /><strong>نوبتی در این نما نیست</strong><p>هیچ داده بیمار واقعی بررسی نشده است.</p></div>}</div></Panel></ProductExampleShell>;
}

export function MedicalRecord() {
  const [category, setCategory] = useState('documents');
  return <ProductExampleShell serviceId="medical-record"><div className="product-split health-record-layout"><ExternalProductGate title="دسترسی حفاظت‌شده به پرونده" description="پرونده پزشکی در محصول واقعی به ورود و کنترل دسترسی جداگانه نیاز دارد. این دمو از این مرز عبور نمی‌کند." evidence="در ممیزی فقط پوسته دسترسی مشاهده شد؛ هیچ محتوای بالینی باز نشده است." /><Panel title="پیش‌نمایش ساختار پرونده" eyebrow="همه ردیف‌ها قفل و پوشانده" icon="clinic"><SegmentedTabs value={category} onChange={setCategory} tabs={[{ id: 'documents', label: 'مدارک' }, { id: 'visits', label: 'مراجعه‌ها' }, { id: 'results', label: 'نتایج' }]} /><div className="record-list">{[1, 2, 3].map((index) => <article key={`${category}-${index}`}><span><MResalatIcon name="lock" size={19} /></span><div><strong>{category === 'documents' ? 'سند سلامت پوشانده' : category === 'visits' ? 'رکورد مراجعه پوشانده' : 'نتیجه بالینی پوشانده'}</strong><small>عنوان، تاریخ و محتوا در دمو موجود نیست</small></div><Badge tone="neutral">قفل</Badge><button type="button" disabled>باز کردن</button></article>)}</div><p className="privacy-note"><MResalatIcon name="security" size={17} />این صفحه هیچ تشخیص، نسخه، نتیجه یا سند پزشکی را نشان نمی‌دهد.</p></Panel></div></ProductExampleShell>;
}

export const healthScreens: Record<string, React.ComponentType> = { 'my-health': MyHealth, appointments: Appointments, 'medical-record': MedicalRecord };
