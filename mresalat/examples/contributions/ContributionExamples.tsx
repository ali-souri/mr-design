'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/mresalat/core/primitives';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { Field, Panel, ProductExampleShell, SafeReview, SearchBox, SegmentedTabs, Stepper } from '../product/ProductExampleShell';

const campaigns = [
  { id: 'sky-edu', title: 'همیاری آموزشی فردا', description: 'کمپین کاملاً ساختگی برای نمایش مسیر انتخاب و مرور.', category: 'آموزش', progress: 64 },
  { id: 'sky-home', title: 'پویش خانه روشن', description: 'اطلاعات نمونه؛ هیچ دریافت وجه یا ادعای اثر واقعی ندارد.', category: 'اجتماعی', progress: 38 },
  { id: 'sky-care', title: 'همراهی برای مراقبت', description: 'نمونه عمومی بدون داده سلامت یا هویت ذی‌نفع.', category: 'سلامت عمومی', progress: 81 },
];

export function HeavenlyResalat() {
  const [campaign, setCampaign] = useState(campaigns[0]); const [amount, setAmount] = useState(''); const [step, setStep] = useState(0);
  return <ProductExampleShell serviceId="heavenly-resalat"><Stepper steps={['انتخاب پویش', 'مبلغ و جزئیات', 'مرور پرداخت']} current={step} />{step === 0 && <Panel title="پویش‌های رسالت آسمانی" eyebrow="کشف کمپین" icon="goal"><div className="campaign-grid">{campaigns.map((item) => <button type="button" className={campaign.id === item.id ? 'selected' : ''} onClick={() => setCampaign(item)} key={item.id}><header><span><MResalatIcon name="advocacy" size={23} /></span><Badge tone="info">{item.category}</Badge></header><h3>{item.title}</h3><p>{item.description}</p><div className="progress-track"><span style={{ width: `${item.progress}%` }} /></div><small>پیشرفت نمایشی {item.progress.toLocaleString('fa-IR')}٪</small></button>)}</div><button className="button button-primary" type="button" onClick={() => setStep(1)}>ادامه با {campaign.title}</button></Panel>}{step === 1 && <div className="product-split"><Panel title="مبلغ همیاری" eyebrow={campaign.title} icon="gift"><Field label="مبلغ نمایشی (ریال)" helper="هیچ مبلغی رزرو یا ارسال نمی‌شود."><input dir="ltr" inputMode="numeric" value={amount} onChange={(event) => setAmount(event.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="0" /></Field><div className="amount-chips">{['500000', '1000000', '5000000'].map((value) => <button type="button" onClick={() => setAmount(value)} key={value}>{Number(value).toLocaleString('fa-IR')}</button>)}</div><Field label="یادداشت اختیاری"><textarea rows={3} placeholder="متن نمایشی؛ ارسال نمی‌شود" /></Field><button className="button button-primary" type="button" disabled={!amount} onClick={() => setStep(2)}>مرور همیاری</button></Panel><Panel title="شفافیت اثر" eyebrow="پیش از پرداخت" icon="evidence"><p className="panel-copy">جزئیات واقعی مقصد، نحوه تخصیص و شرایط پرداخت باید در محصول رسمی تأیید شوند؛ این دمو هیچ ادعایی درباره تخصیص وجه ندارد.</p></Panel></div>}{step === 2 && <SafeReview title="خلاصه همیاری" rows={[{ label: 'پویش', value: campaign.title }, { label: 'مبلغ', value: `${Number(amount).toLocaleString('fa-IR')} ریال نمایشی` }, { label: 'اثر بعدی', value: 'ورود به تأیید و پرداخت رسمی' }, { label: 'اجرای دمو', value: 'بدون ارسال یا پرداخت' }]} action="ارسال و پرداخت واقعی غیرفعال است" />}</ProductExampleShell>;
}

const contributions = [
  { id: 'CON-D-104', title: 'همیاری آموزشی فردا', type: 'نقدی', status: 'ثبت نمایشی', date: '۱۴۰۵/۰۴/۲۲', amount: '••••••' },
  { id: 'CON-D-081', title: 'پویش خانه روشن', type: 'اعتباری', status: 'مختومه', date: '۱۴۰۴/۱۱/۰۳', amount: '••••••' },
];

export function MyContributions() {
  const [query, setQuery] = useState(''); const [type, setType] = useState('all'); const [status, setStatus] = useState('all'); const [mode, setMode] = useState('populated');
  const rows = useMemo(() => mode === 'empty' ? [] : contributions.filter((item) => (!query || `${item.title} ${item.id}`.includes(query)) && (type === 'all' || item.type === type) && (status === 'all' || item.status === status)), [query, type, status, mode]);
  return <ProductExampleShell serviceId="my-contributions"><Panel title="همیاری‌های من" eyebrow="سابقه ساختگی و پوشانده" icon="advocacy" actions={<SegmentedTabs value={mode} onChange={setMode} tabs={[{ id: 'populated', label: 'نمونه پُر' }, { id: 'empty', label: 'حالت خالی' }]} />}><div className="transaction-toolbar"><SearchBox value={query} onChange={setQuery} placeholder="نام پویش یا شناسه…" /><div className="filter-grid compact"><Field label="نوع"><select value={type} onChange={(event) => setType(event.target.value)}><option value="all">همه</option><option>نقدی</option><option>اعتباری</option></select></Field><Field label="وضعیت"><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">همه</option><option>ثبت نمایشی</option><option>مختومه</option></select></Field></div></div><div className="contribution-history">{rows.map((item) => <article key={item.id}><span><MResalatIcon name="gift" size={21} /></span><div><strong>{item.title}</strong><small><bdi dir="ltr">{item.id}</bdi> · {item.date}</small></div><Badge tone={item.status === 'مختومه' ? 'neutral' : 'success'}>{item.status}</Badge><dl><dt>{item.type}</dt><dd>{item.amount} ریال</dd></dl></article>)}{rows.length === 0 && <div className="product-empty"><MResalatIcon name="advocacy" size={27} /><strong>همیاری‌ای در این نما نیست</strong><p>این حالت خالی، بدون ادعای سابقه واقعی است.</p></div>}</div></Panel></ProductExampleShell>;
}

export const contributionScreens: Record<string, React.ComponentType> = { contributions: MyContributions };
