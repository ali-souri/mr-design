'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/mresalat/core/primitives';
import { MResalatIcon, type MResalatIconName } from '@/mresalat/core/MResalatIcon';
import { DomainLanding, ExternalProductGate, Field, Panel, ProductExampleShell, SearchBox, SegmentedTabs } from '../product/ProductExampleShell';

export function AuxiliaryLanding() {
  return <DomainLanding domainKey="auxiliary" lead={<section className="domain-lead auxiliary-lead"><div><span className="eyebrow">چهار سامانه، چهار مرز روشن</span><h2>ابزار فرم، بازار، درگاه مستقل و خدمات عمومی</h2><p>هر ورودی فقط همان چیزی را نشان می‌دهد که در ممیزی دیده شده است؛ به‌ویژه مرآت پشت مرز ورود باقی می‌ماند.</p></div><div className="system-rail"><span>SAYA</span><span>M‑Etka</span><span>Merat</span><span>iCap</span></div></section>} />;
}

const forms = [
  { id: 'FORM-D-19', title: 'فرم بازخورد نمایشی', status: 'پیش‌نویس', updated: 'امروز' },
  { id: 'FORM-D-11', title: 'درخواست اطلاعات نمونه', status: 'بایگانی', updated: 'هفته گذشته' },
];

export function Saya() {
  const [tab, setTab] = useState('forms'); const [query, setQuery] = useState(''); const [designer, setDesigner] = useState(false); const rows = useMemo(() => forms.filter((item) => !query || `${item.title} ${item.id}`.includes(query)), [query]);
  return <ProductExampleShell serviceId="saya"><section className="saya-header"><div><span className="eyebrow">سازنده فرم سایا</span><h2>فرم‌ها را پیدا یا یک پوسته تازه بسازید</h2><p>ذخیره و انتشار در نسخه نمایشی غیرفعال است.</p></div><button className="button button-primary" type="button" onClick={() => { setDesigner(true); setTab('create'); }}><MResalatIcon name="add" size={17} />ساخت فرم</button></section><Panel title="فضای کار" eyebrow="داده‌های ساختگی" icon="assessment"><SegmentedTabs value={tab} onChange={(value) => { setTab(value); setDesigner(value === 'create'); }} tabs={[{ id: 'forms', label: 'فرم‌های من' }, { id: 'create', label: 'ساخت فرم' }]} />{!designer ? <><SearchBox value={query} onChange={setQuery} placeholder="جستجو در عنوان یا شناسه…" /><div className="saya-form-list">{rows.map((form) => <article key={form.id}><span><MResalatIcon name="assessment" size={21} /></span><div><strong>{form.title}</strong><small><bdi dir="ltr">{form.id}</bdi> · بروزرسانی {form.updated}</small></div><Badge tone={form.status === 'پیش‌نویس' ? 'warning' : 'neutral'}>{form.status}</Badge><button type="button" onClick={() => setDesigner(true)}>باز کردن پوسته</button></article>)}</div></> : <section className="form-designer"><aside><strong>بلوک‌ها</strong>{['عنوان کوتاه', 'توضیح', 'گزینه چندتایی', 'تاریخ'].map((block) => <button type="button" key={block}><MResalatIcon name="add" size={16} />{block}</button>)}</aside><div className="designer-canvas"><span>فرم بدون عنوان · پیش‌نویس دمو</span><Field label="عنوان فرم"><input placeholder="عنوان نمایشی" /></Field><div className="designer-question"><span>پرسش نمونه</span><input disabled placeholder="پاسخ کوتاه" /></div><div className="designer-actions"><button className="button button-secondary" type="button">پیش‌نمایش محلی</button><button className="button button-primary" type="button" disabled>ذخیره / انتشار غیرفعال</button></div></div></section>}</Panel></ProductExampleShell>;
}

const etkaEntries: Array<{ title: string; detail: string; icon: MResalatIconName }> = [
  { title: 'بازار ام‌اتکا', detail: 'ورودی فروشگاه و مرور محصولات', icon: 'seller' },
  { title: 'خرید حضوری', detail: 'معرفی مسیر پذیرنده حضوری', icon: 'location' },
  { title: 'ام‌اتکا پلاس', detail: 'ورودی سرویس مکمل مشاهده‌شده', icon: 'grid' },
];

export function Metka() {
  const [selected, setSelected] = useState(etkaEntries[0]);
  return <ProductExampleShell serviceId="metka"><Panel title="ام‌اتکا" eyebrow="سه ورودی مشاهده‌شده" icon="organization"><div className="entry-choice-grid">{etkaEntries.map((entry) => <button type="button" className={selected.title === entry.title ? 'selected' : ''} onClick={() => setSelected(entry)} key={entry.title}><span><MResalatIcon name={entry.icon} size={25} /></span><strong>{entry.title}</strong><p>{entry.detail}</p><MResalatIcon name="next" size={17} /></button>)}</div><div className="entry-preview"><Badge tone="info">پیش‌نمایش ورودی</Badge><h3>{selected.title}</h3><p>{selected.detail}. جزئیات داخلی که در ممیزی مشاهده نشده‌اند ساخته نمی‌شوند.</p><button className="button button-primary" type="button" disabled>ورود واقعی غیرفعال است</button></div></Panel></ProductExampleShell>;
}

export function Merat() {
  return <ProductExampleShell serviceId="merat"><div className="product-split"><Panel title="مرآت" eyebrow="سامانه مستقل" icon="assessment"><p className="panel-copy">برای مرآت فقط ورود جداگانه مشاهده شد. این نمونه درباره صفحات یا فرایندهای پس از ورود ادعایی ندارد.</p><ul className="requirement-list"><li><MResalatIcon name="evidence" size={17} />شاهد ممیزی: درگاه جدا</li><li><MResalatIcon name="lock" size={17} />اطلاعات ورود دریافت نمی‌شود</li><li><MResalatIcon name="warning" size={17} />قابلیت داخلی ساخته نشده است</li></ul></Panel><ExternalProductGate title="ورود به مرآت" description="نام کاربری، رمز یا کد تأیید در این نمونه دریافت نمی‌شود." /></div></ProductExampleShell>;
}

export function Icap() {
  const actions = [
    { title: 'انتقال', detail: 'پیش از ورود و انتقال متوقف می‌شود', icon: 'settlement' as const },
    { title: 'پرداخت', detail: 'هیچ ابزار یا مبلغی دریافت نمی‌شود', icon: 'wallet' as const },
    { title: 'صدور سند', detail: 'فقط معرفی؛ سندی ساخته نمی‌شود', icon: 'evidence' as const },
  ];
  return <ProductExampleShell serviceId="icap"><section className="icap-hero"><div><span className="eyebrow">ورودی عمومی iCap</span><h2>خدمات را بشناسید؛ پیش از ورود متوقف شوید</h2><p>این هاب هیچ اجرای انتقال، پرداخت یا صدور سند را شبیه‌سازی نمی‌کند.</p></div><span><MResalatIcon name="credit" size={42} /></span></section><div className="icap-action-grid">{actions.map((action) => <article key={action.title}><span><MResalatIcon name={action.icon} size={25} /></span><h3>{action.title}</h3><p>{action.detail}</p><button className="button button-secondary" type="button" disabled>نیازمند ورود رسمی</button></article>)}</div></ProductExampleShell>;
}

export const auxiliaryScreens: Record<string, React.ComponentType> = { saya: Saya, metka: Metka, merat: Merat, icap: Icap };
