'use client';
/* eslint-disable @next/next/no-html-link-for-pages */

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { SmartAssistant3D } from '@/mresalat/ai/SmartAssistant3D';
import { AppShell } from '@/mresalat/core/AppShell';
import { trackEvent } from '@/mresalat/core/analytics';
import { MResalatIcon, type MResalatIconName } from '@/mresalat/core/MResalatIcon';
import { Badge } from '@/mresalat/core/primitives';
import { phaseOneSegments, segmentExperiences, type SegmentExperienceConfig, type SegmentLink, type SegmentSlug, type SegmentViewSlug } from './experience-data';

type ProgressStep = { title: string; detail: string; state: 'completed' | 'current' | 'upcoming' };

const statusSteps: Record<SegmentSlug, ProgressStep[]> = {
  individual: [
    { title: 'ثبت درخواست', detail: 'در ۲۵ مرداد ۱۴۰۵ ثبت شد', state: 'completed' },
    { title: 'بررسی اطلاعات', detail: 'اطلاعات پایه با موفقیت بررسی شد', state: 'completed' },
    { title: 'تأیید عملیات بانکی', detail: 'در حال بررسی کارشناسی', state: 'current' },
    { title: 'پذیرش و صدور', detail: 'پس از پایان بررسی آغاز می‌شود', state: 'upcoming' },
    { title: 'تکمیل درخواست', detail: 'نتیجه در همین صفحه اعلام می‌شود', state: 'upcoming' },
  ],
  'under-18': [
    { title: 'ثبت اطلاعات نوجوان', detail: 'با همراهی سرپرست تکمیل شد', state: 'completed' },
    { title: 'بررسی رابطه سرپرستی', detail: 'بررسی نمایشی در حال انجام است', state: 'current' },
    { title: 'انتخاب درخواست حساب', detail: 'پس از بررسی فعال می‌شود', state: 'upcoming' },
    { title: 'تأیید نهایی', detail: 'نتیجه برای سرپرست نمایش داده می‌شود', state: 'upcoming' },
  ],
  organization: [
    { title: 'ثبت درخواست سازمان', detail: 'اطلاعات اولیه ثبت شده است', state: 'completed' },
    { title: 'ثبت صاحبان امضاء', detail: '۲ نفر از ۳ نفر تأیید شده‌اند', state: 'current' },
    { title: 'اطلاعات تکمیلی سازمان', detail: 'پس از تکمیل اعضا باز می‌شود', state: 'upcoming' },
    { title: 'بررسی و پذیرش', detail: 'بررسی نهایی پرونده سازمان', state: 'upcoming' },
  ],
};

function fire(event: Parameters<typeof trackEvent>[0]['event'], segment: SegmentSlug, view?: string) {
  trackEvent({ event, surface: 'segment', entityId: segment, metadata: view ? { view } : undefined });
}

export function SegmentSelector() {
  return <div className="seg-selector" aria-label="انتخاب نوع عضویت">{phaseOneSegments.map((config) => <a href={`/segments/${config.slug}`} key={config.slug} onClick={() => fire('segment_selected', config.slug)}><span><MResalatIcon name={config.slug === 'individual' ? 'profile' : config.slug === 'under-18' ? 'child' : 'organization'} size={24} /></span><div><strong>{config.titleFa}</strong><small>{config.shortDescriptionFa}</small></div><MResalatIcon name="next" size={20} /></a>)}</div>;
}

export function SegmentActionCard({ item, segment }: { item: SegmentLink; segment: SegmentSlug }) {
  return <a className="seg-action-card" href={item.href} onClick={() => fire('segment_procedure_started', segment, item.href)}><span><MResalatIcon name={item.icon} size={24} /></span><div>{item.badge && <Badge tone="info">{item.badge}</Badge>}<strong>{item.title}</strong><small>{item.description}</small></div><MResalatIcon name="next" size={20} /></a>;
}

export function SegmentProcedureCard({ item, segment }: { item: SegmentLink; segment: SegmentSlug }) {
  return <a className="seg-procedure-card" href={item.href} onClick={() => fire('segment_procedure_started', segment, item.href)}><span className="seg-procedure-icon"><MResalatIcon name={item.icon} size={24} /></span><div><strong>{item.title}</strong><p>{item.description}</p><small>مشاهده فرایند <MResalatIcon name="next" size={16} /></small></div></a>;
}

export function SegmentSupportPanel({ config, compact = false }: { config: SegmentExperienceConfig; compact?: boolean }) {
  const friendly = config.assistantMode === 'friendly';
  return <aside className={`seg-support-panel ${friendly ? 'friendly' : ''} ${compact ? 'compact' : ''}`}><span className="seg-support-icon"><MResalatIcon name="assistant" size={24} /></span><div><small>{friendly ? 'من و بزرگ‌ترت کنارتان هستیم' : 'راهنمای مسیر ام‌رسالت'}</small><strong>{friendly ? 'جایی از مسیر سؤال داری؟' : 'برای قدم بعدی راهنمایی می‌خواهید؟'}</strong><p>{friendly ? 'هر مرحله را کوتاه و روشن توضیح می‌دهم.' : 'پاسخ‌ها راهنمای نمایشی‌اند و تغییری در درخواست ایجاد نمی‌کنند.'}</p></div><a href="/rag" className="button button-secondary">گفت‌وگو با راهنما</a></aside>;
}

export function SegmentHero({ config }: { config: SegmentExperienceConfig }) {
  const youth = config.visualTone === 'youth';
  return <section className="seg-hero"><div className="seg-hero-copy"><span className="eyebrow">{config.hero.eyebrow}</span><h1>{config.hero.title}</h1><p>{config.hero.description}</p><div className="seg-hero-actions"><a className="button button-primary" href={config.hero.primaryHref} onClick={() => fire('segment_procedure_started', config.slug, 'hero')}>{config.hero.primaryLabel}<MResalatIcon name="next" size={16} /></a><a className="button button-ghost" href={`${config.hero.primaryHref === '/segments/individual/membership' ? '/segments/individual/status' : `/segments/${config.slug}/status`}`}>پیگیری درخواست</a></div><div className="seg-trust-row"><span><MResalatIcon name="security" size={16} />امن و مرحله‌ای</span><span><MResalatIcon name="help" size={16} />راهنمای روشن</span><span><MResalatIcon name="time" size={16} />قابل ادامه</span></div></div>{youth ? <div className="seg-youth-mascot"><SmartAssistant3D mode="complete" emotion="happy" /><span>سلام! من مسیر را برای تو و سرپرستت ساده می‌کنم.</span></div> : <div className="seg-hero-visual" aria-hidden="true"><span><MResalatIcon name={config.slug === 'organization' ? 'organization' : 'membership'} size={32} /></span><i /><i /><i /></div>}</section>;
}

function SegmentHeader({ config }: { config: SegmentExperienceConfig }) {
  return <><nav className="seg-breadcrumb" aria-label="مسیر صفحه"><a href="/segments">انتخاب نوع عضویت</a><MResalatIcon name="next" size={16} /><a href={`/segments/${config.slug}`}>{config.titleFa}</a></nav><header className="seg-context-header"><div><span><MResalatIcon name={config.slug === 'individual' ? 'profile' : config.slug === 'under-18' ? 'child' : 'organization'} size={20} /></span><div><small>محیط شخصی‌سازی‌شده</small><strong>{config.titleFa}</strong></div></div><nav aria-label={`ناوبری ${config.titleFa}`}>{config.navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</nav></header></>;
}

function SegmentFrame({ config, children }: { config: SegmentExperienceConfig; children: ReactNode }) {
  useEffect(() => { fire('segment_landing_opened', config.slug); }, [config.slug]);
  return <AppShell active="segments"><div className={`segment-phase-one tone-${config.visualTone}`}><SegmentHeader config={config} />{children}</div></AppShell>;
}

function PendingPanel({ config }: { config: SegmentExperienceConfig }) {
  return <section className="seg-pending-panel"><div className="seg-pending-ring" style={{ '--seg-progress': `${config.pending.progress * 3.6}deg` } as React.CSSProperties}><strong>{config.pending.progress}٪</strong></div><div><span className="eyebrow">{config.pending.label}</span><h2>{config.pending.title}</h2><p>{config.pending.detail}</p><div className="seg-linear-progress" aria-label={`${config.pending.progress} درصد پیشرفت`} role="progressbar" aria-valuenow={config.pending.progress} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${config.pending.progress}%` }} /></div></div><a className="button button-primary" href={config.pending.href}>ادامه فرایند<MResalatIcon name="next" size={16} /></a></section>;
}

function SegmentLanding({ config }: { config: SegmentExperienceConfig }) {
  return <SegmentFrame config={config}><SegmentHero config={config} /><section className="seg-section"><header><div><span className="eyebrow">اقدام‌های پیشنهادی</span><h2>از کجا می‌خواهید شروع کنید؟</h2></div></header><div className="seg-action-grid">{config.primaryServices.map((item) => <SegmentActionCard item={item} segment={config.slug} key={item.title} />)}</div></section><PendingPanel config={config} /><section className="seg-section"><header><div><span className="eyebrow">فرایندهای مرتبط</span><h2>مسیرهای مهم برای شما</h2></div><a href="/examples">همه خدمات<MResalatIcon name="next" size={16} /></a></header><div className="seg-procedure-grid">{config.primaryProcesses.map((item) => <SegmentProcedureCard item={item} segment={config.slug} key={item.title} />)}</div></section><SegmentSupportPanel config={config} /></SegmentFrame>;
}

function FlowIntro({ config, eyebrow, title, description, points, action, actionHref, icon }: { config: SegmentExperienceConfig; eyebrow: string; title: string; description: string; points: string[]; action: string; actionHref: string; icon: MResalatIconName }) {
  const [accepted, setAccepted] = useState(false);
  return <SegmentFrame config={config}><section className="seg-flow-layout"><div className="seg-flow-card"><span className="seg-flow-icon"><MResalatIcon name={icon} size={32} /></span><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p><ol className="seg-check-list">{points.map((point, index) => <li key={point}><span>{index + 1}</span>{point}</li>)}</ol><label className="seg-ack"><input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} /><span>مراحل و پیش‌نیازهای این نسخه نمایشی را خواندم.</span></label><a aria-disabled={!accepted} className={`button button-primary ${!accepted ? 'is-disabled' : ''}`} href={accepted ? actionHref : '#'} onClick={(event) => { if (!accepted) event.preventDefault(); else fire('segment_procedure_started', config.slug, actionHref); }}>{action}<MResalatIcon name="next" size={16} /></a></div><aside className="seg-flow-aside"><strong>پیش از شروع آماده کنید</strong><p>{config.slug === 'organization' ? 'شناسه ملی، شماره ثبت، تلفن سازمان و اطلاعات صاحبان امضاء.' : config.slug === 'under-18' ? 'کد ملی و تاریخ تولد نوجوان؛ سرپرست باید در کنار او باشد.' : 'شماره همراهی که به نام خودتان است و کد ملی.'}</p><div><MResalatIcon name="security" size={20} /><span><b>حریم خصوصی</b><small>این رابط صرفاً نمایشی است و اطلاعات واقعی ارسال نمی‌شود.</small></span></div><SegmentSupportPanel config={config} compact /></aside></section></SegmentFrame>;
}

function Field({ id, label, placeholder, inputMode = 'text', helper, maxLength }: { id: string; label: string; placeholder: string; inputMode?: 'text' | 'numeric' | 'tel'; helper?: string; maxLength?: number }) {
  return <label className="seg-field" htmlFor={id}><span>{label}</span><input id={id} name={id} inputMode={inputMode} maxLength={maxLength} placeholder={placeholder} aria-describedby={helper ? `${id}-help` : undefined} />{helper && <small id={`${id}-help`}>{helper}</small>}</label>;
}

function IdentityForm({ config }: { config: SegmentExperienceConfig }) {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); setSubmitted(true); fire('identity_verification_started', config.slug); };
  return <SegmentFrame config={config}><section className="seg-form-page"><header><span className="seg-form-icon"><MResalatIcon name="security" size={32} /></span><span className="eyebrow">گام ۱ از ۲</span><h1>احراز هویت اولیه</h1><p>شماره همراه و کد ملی را وارد کنید تا کد تأیید نمایشی برایتان آماده شود.</p></header><form onSubmit={submit} noValidate><Field id="mobile" label="شماره همراه" placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷" inputMode="tel" maxLength={11} helper="شماره همراه باید به نام صاحب کد ملی باشد." /><Field id="national-code" label="کد ملی" placeholder="۰۰۱۲۳۴۵۶۷۸" inputMode="numeric" maxLength={10} /><div className="seg-captcha"><MResalatIcon name="security" size={20} /><span><strong>بررسی امنیتی نمایشی</strong><small>در نسخه نهایی سرویس امنیتی معتبر اینجا قرار می‌گیرد.</small></span><button type="button">من ربات نیستم</button></div>{submitted && <div className="seg-inline-success" role="status"><MResalatIcon name="success" size={20} />اطلاعات نمایشی آماده است؛ برای دیدن مرحله بعد وارد صفحه کد تأیید شوید.</div>}<button className="button button-primary button-block" type="submit">بررسی و دریافت کد</button>{submitted && <a className="button button-secondary button-block" href="/segments/individual/otp">ورود به مرحله کد تأیید</a>}</form></section></SegmentFrame>;
}

export function OtpInput({ length = 5 }: { length?: number }) {
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const latinDigits = (value: string) => value
    .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))
    .replace(/\D/g, '');
  const update = (index: number, input: HTMLInputElement) => {
    if (latinDigits(input.value) && index < length - 1) window.requestAnimationFrame(() => inputs.current[index + 1]?.focus());
  };
  return <div className="seg-otp-input" dir="ltr" role="group" aria-label="کد تأیید پنج رقمی" onPaste={(event) => { const pasted = latinDigits(event.clipboardData.getData('text')).slice(0, length); if (!pasted) return; event.preventDefault(); inputs.current.forEach((input, index) => { if (input) input.value = pasted[index] ?? ''; }); window.requestAnimationFrame(() => inputs.current[Math.min(pasted.length, length) - 1]?.focus()); }}>{Array.from({ length }, (_, index) => <input key={index} ref={(element) => { inputs.current[index] = element; }} onInput={(event) => update(index, event.currentTarget)} onKeyDown={(event) => { if (event.key === 'Backspace' && !event.currentTarget.value && index > 0) inputs.current[index - 1]?.focus(); }} inputMode="numeric" autoComplete={index === 0 ? 'one-time-code' : 'off'} maxLength={1} aria-label={`رقم ${index + 1} کد تأیید`} />)}</div>;
}

function OtpPage({ config }: { config: SegmentExperienceConfig }) {
  const [remaining, setRemaining] = useState(58);
  const [done, setDone] = useState(false);
  useEffect(() => { if (remaining <= 0) return; const timer = window.setInterval(() => setRemaining((value) => Math.max(0, value - 1)), 1000); return () => window.clearInterval(timer); }, [remaining]);
  return <SegmentFrame config={config}><section className="seg-otp-page"><span className="seg-form-icon"><MResalatIcon name="lock" size={32} /></span><span className="eyebrow">تأیید دومرحله‌ای</span><h1>کد پیامک‌شده را وارد کنید</h1><p>کد پنج‌رقمی نمایشی به شماره <bdi>۰۹۱۲ ••• ۴۵۶۷</bdi> ارسال شد.</p><button className="seg-edit-phone" type="button"><MResalatIcon name="previous" size={16} />ویرایش شماره همراه</button><OtpInput /><div className="seg-otp-meta" aria-live="polite">{remaining > 0 ? <span>ارسال دوباره تا <bdi>۰۰:{String(remaining).padStart(2, '0')}</bdi></span> : <button type="button" onClick={() => setRemaining(58)}>ارسال دوباره کد</button>}</div>{done && <div className="seg-inline-success" role="status"><MResalatIcon name="success" size={20} />کد نمایشی تأیید شد.</div>}<button className="button button-primary button-block" type="button" onClick={() => { setDone(true); fire('otp_submitted', config.slug); }}>تأیید و ادامه</button><small className="seg-secure-note"><MResalatIcon name="security" size={16} />کد را در اختیار دیگران قرار ندهید.</small></section></SegmentFrame>;
}

export function SegmentStatusPanel({ config, compact = false }: { config: SegmentExperienceConfig; compact?: boolean }) {
  const steps = statusSteps[config.slug];
  return <section className={`seg-status-panel ${compact ? 'compact' : ''}`}><header><div><span className="eyebrow">وضعیت درخواست</span><h1>{config.slug === 'individual' ? 'در حال تأیید عملیات بانکی' : config.slug === 'under-18' ? 'بررسی اطلاعات با سرپرست' : 'تکمیل صاحبان امضاء'}</h1><p>{config.slug === 'organization' ? 'پس از افزودن صاحب امضای باقی‌مانده، اطلاعات تکمیلی سازمان فعال می‌شود.' : 'درخواست در مسیر طبیعی خود قرار دارد و اقدام بعدی همین‌جا نمایش داده می‌شود.'}</p></div><Badge tone="warning">در حال انجام</Badge></header><dl className="seg-request-facts"><div><dt>شماره درخواست</dt><dd><bdi>{config.slug === 'organization' ? 'ORG-1405-0182' : config.slug === 'under-18' ? 'YTH-1405-0421' : 'MR-1405-2831'}</bdi></dd></div><div><dt>تاریخ ثبت</dt><dd>۲۵ مرداد ۱۴۰۵</dd></div><div><dt>آخرین به‌روزرسانی</dt><dd>امروز، ۱۰:۳۲</dd></div></dl><ol className="seg-status-timeline">{steps.map((step, index) => <li className={step.state} aria-current={step.state === 'current' ? 'step' : undefined} key={step.title}><span>{step.state === 'completed' ? <MResalatIcon name="success" size={16} /> : index + 1}</span><div><small>{step.state === 'completed' ? 'تکمیل‌شده' : step.state === 'current' ? 'مرحله فعلی' : 'در ادامه'}</small><strong>{step.title}</strong><p>{step.detail}</p></div></li>)}</ol>{!compact && <div className="seg-status-next"><MResalatIcon name="time" size={24} /><div><small>اقدام بعدی</small><strong>{config.slug === 'organization' ? 'افزودن صاحب امضای سوم' : 'در حال حاضر اقدامی لازم نیست'}</strong></div>{config.slug === 'organization' ? <a className="button button-primary" href="/segments/organization/add-owner">انجام اقدام</a> : <span>نتیجه در همین صفحه به‌روز می‌شود.</span>}</div>}</section>;
}

function StatusPage({ config }: { config: SegmentExperienceConfig }) {
  useEffect(() => { fire('request_status_opened', config.slug); }, [config.slug]);
  return <SegmentFrame config={config}><div className="seg-status-layout"><SegmentStatusPanel config={config} /><SegmentSupportPanel config={config} compact /></div></SegmentFrame>;
}

function useDialogFocus(active: boolean, closeHref: string) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!active) return;
    const root = ref.current;
    if (!root) return;
    const focusables = () => Array.from(root.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));
    (root.querySelector<HTMLElement>('input, button, a[href]'))?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); window.location.assign(closeHref); return; }
      if (event.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [active, closeHref]);
  return ref;
}

export function ChildInfoPanel({ embedded = false }: { embedded?: boolean }) {
  const formId = useId();
  const [found, setFound] = useState(false);
  const dialogRef = useDialogFocus(!embedded, '/segments/under-18');
  return <section ref={dialogRef} className={`seg-sheet-card ${embedded ? 'embedded' : ''}`} role={embedded ? undefined : 'dialog'} aria-modal={embedded ? undefined : true} aria-labelledby={`${formId}-title`}><header><div><span className="seg-sheet-icon"><MResalatIcon name="child" size={24} /></span><div><small>گام اول</small><h1 id={`${formId}-title`}>اطلاعات کاربر زیر ۱۸ سال</h1></div></div>{!embedded && <a aria-label="بستن و بازگشت" href="/segments/under-18"><MResalatIcon name="close" size={20} /></a>}</header><p>برای بررسی اولیه، اطلاعات نوجوان را مطابق مدرک هویتی وارد کنید.</p><form onSubmit={(event) => { event.preventDefault(); setFound(true); fire('youth_child_lookup_started', 'under-18'); }}><Field id={`${formId}-birth`} label="تاریخ تولد" placeholder="۱۴۰۰/۰۶/۱۵" inputMode="numeric" helper="تاریخ را به شمسی وارد کنید." /><Field id={`${formId}-national`} label="کد ملی نوجوان" placeholder="۰۰۱۲۳۴۵۶۷۸" inputMode="numeric" maxLength={10} />{found && <div className="seg-inline-success" role="status"><MResalatIcon name="success" size={20} />اطلاعات نمایشی پیدا شد؛ امکان ادامه وجود دارد.</div>}<button className="button button-primary button-block" type="submit">بررسی اطلاعات</button>{found && <a className="button button-secondary button-block" href="/segments/under-18/account-request">انتخاب درخواست حساب</a>}</form><small className="seg-secure-note"><MResalatIcon name="parent" size={16} />ادامه فرایند باید با اطلاع ولی یا سرپرست انجام شود.</small></section>;
}

function ChildInfoPage({ config }: { config: SegmentExperienceConfig }) {
  return <SegmentFrame config={config}><div className="seg-sheet-backdrop"><ChildInfoPanel /></div></SegmentFrame>;
}

function AccountRequestPage({ config }: { config: SegmentExperienceConfig }) {
  const [choice, setChoice] = useState('youth-account');
  return <SegmentFrame config={config}><section className="seg-choice-page"><header><Badge tone="success">اطلاعات اولیه بررسی شد</Badge><span className="eyebrow">قدم بعدی</span><h1>چه کاری می‌خواهید انجام دهید؟</h1><p>یکی از درخواست‌های نمایشی را انتخاب کنید. شرایط نهایی پیش از ثبت دوباره مرور می‌شود.</p></header><div className="seg-choice-grid" role="radiogroup" aria-label="نوع درخواست">{[
    { id: 'youth-account', icon: 'card' as const, title: 'درخواست افتتاح حساب نوجوان', detail: 'مسیر پیشنهادی برای شروع خدمات پایه' },
    { id: 'continue-later', icon: 'time' as const, title: 'ذخیره و ادامه در زمان دیگر', detail: 'اطلاعات نمایشی در این دستگاه نگهداری نمی‌شود' },
  ].map((item) => <button type="button" role="radio" aria-checked={choice === item.id} className={choice === item.id ? 'selected' : ''} onClick={() => setChoice(item.id)} key={item.id}><MResalatIcon name={item.icon} size={24} /><span><strong>{item.title}</strong><small>{item.detail}</small></span><i /></button>)}</div><section className="seg-prerequisites"><h2>پیش از ادامه</h2><span><MResalatIcon name="success" size={20} />اطلاعات هویتی نوجوان</span><span><MResalatIcon name="success" size={20} />همراهی ولی یا سرپرست</span><span><MResalatIcon name="time" size={20} />تأیید نهایی در مرحله بعد</span></section><a className="button button-primary" href="/segments/under-18/status">ادامه درخواست<MResalatIcon name="next" size={16} /></a></section></SegmentFrame>;
}

export function AddOwnerPanel({ embedded = false }: { embedded?: boolean }) {
  const id = useId();
  const [verified, setVerified] = useState(false);
  const dialogRef = useDialogFocus(!embedded, '/segments/organization/owners');
  return <section ref={dialogRef} className={`seg-sheet-card owner-sheet ${embedded ? 'embedded' : ''}`} role={embedded ? undefined : 'dialog'} aria-modal={embedded ? undefined : true} aria-labelledby={`${id}-title`}><header><div><span className="seg-sheet-icon"><MResalatIcon name="employee" size={24} /></span><div><small>صاحب امضاء جدید</small><h1 id={`${id}-title`}>افزودن عضو مجاز</h1></div></div>{!embedded && <a aria-label="بستن و بازگشت" href="/segments/organization/owners"><MResalatIcon name="close" size={20} /></a>}</header><p>اطلاعات فرد را برای بررسی نمایشی وارد کنید. هیچ دعوت واقعی ارسال نمی‌شود.</p><form onSubmit={(event) => { event.preventDefault(); setVerified(true); fire('organization_owner_add_started', 'organization'); }}><Field id={`${id}-mobile`} label="نام کاربری یا شماره همراه" placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷" inputMode="tel" /><Field id={`${id}-national`} label="کد ملی" placeholder="۰۰۱۲۳۴۵۶۷۸" inputMode="numeric" maxLength={10} />{verified && <div className="seg-inline-success" role="status"><MResalatIcon name="success" size={20} />عضو نمایشی با موفقیت بررسی شد.</div>}<button className="button button-primary button-block" type="submit">بررسی و افزودن</button><a className="button button-ghost button-block" href="/segments/organization/owners">انصراف</a></form></section>;
}

function OwnersPage({ config }: { config: SegmentExperienceConfig }) {
  const owners = [{ name: 'مالک نمونه یک', role: 'مدیرعامل', status: 'تأیید شده' }, { name: 'مالک نمونه دو', role: 'رئیس هیئت‌مدیره', status: 'تأیید شده' }];
  return <SegmentFrame config={config}><section className="seg-owners-page"><header><div><span className="eyebrow">گام ۲ از ۴</span><h1>صاحبان امضاء و اعضای مجاز</h1><p>افرادی را اضافه کنید که طبق اسناد سازمان اجازه ادامه این درخواست را دارند.</p></div><a className="button button-primary" href="/segments/organization/add-owner" onClick={() => fire('organization_owner_add_started', 'organization')}><MResalatIcon name="add" size={20} />افزودن صاحب امضاء</a></header><div className="seg-owner-list">{owners.map((owner, index) => <article key={owner.name}><span>{index + 1}</span><div><strong>{owner.name}</strong><small>{owner.role} · اطلاعات کاملاً ساختگی</small></div><Badge tone="success">{owner.status}</Badge><button type="button" aria-label={`مشاهده ${owner.name}`}><MResalatIcon name="view" size={20} /></button></article>)}</div><div className="seg-owner-empty"><MResalatIcon name="employee" size={24} /><div><strong>یک صاحب امضاء دیگر لازم است</strong><p>پس از افزودن فرد سوم، ادامه اطلاعات سازمان فعال می‌شود.</p></div><a href="/segments/organization/add-owner">افزودن فرد سوم<MResalatIcon name="next" size={16} /></a></div><div className="seg-owner-footer"><a className="button button-secondary" href="/segments/organization">بازگشت به خانه سازمان</a><button className="button button-primary" disabled type="button">ادامه اطلاعات سازمان</button></div></section></SegmentFrame>;
}

function AddOwnerPage({ config }: { config: SegmentExperienceConfig }) {
  return <SegmentFrame config={config}><div className="seg-sheet-backdrop organization"><AddOwnerPanel /></div></SegmentFrame>;
}

export function SegmentComponentShowcase() {
  const individual = segmentExperiences.individual;
  const youth = segmentExperiences['under-18'];
  const organization = segmentExperiences.organization;
  return <div className="seg-component-showcase"><div className="seg-showcase-heroes"><SegmentHero config={individual} /><SegmentHero config={youth} /><SegmentHero config={organization} /></div><div className="seg-showcase-grid"><SegmentActionCard item={individual.primaryServices[0]} segment="individual" /><SegmentProcedureCard item={organization.primaryProcesses[1]} segment="organization" /></div><OtpInput /><SegmentStatusPanel config={individual} compact /><div className="seg-showcase-grid"><ChildInfoPanel embedded /><AddOwnerPanel embedded /></div><div className="seg-showcase-grid"><SegmentSupportPanel config={youth} compact /><SegmentSupportPanel config={organization} compact /></div></div>;
}

export function SegmentPhaseOnePage({ segment, view }: { segment: SegmentSlug; view?: SegmentViewSlug }) {
  const config = segmentExperiences[segment];
  if (!view) return <SegmentLanding config={config} />;
  if (view === 'status') return <StatusPage config={config} />;
  if (segment === 'individual' && view === 'membership') return <FlowIntro config={config} eyebrow="فرایند ثبت درخواست عضویت" title="عضویت حقیقی را با آمادگی شروع کنید" description="پیش از ورود اطلاعات، مراحل و پیش‌نیازها را کوتاه مرور کنید." points={['ثبت شماره همراه و کد ملی', 'تأیید کد دومرحله‌ای', 'بررسی اطلاعات و پذیرش درخواست']} action="شروع ثبت اطلاعات" actionHref="/segments/individual/identity" icon="membership" />;
  if (segment === 'individual' && view === 'identity') return <IdentityForm config={config} />;
  if (segment === 'individual' && view === 'otp') return <OtpPage config={config} />;
  if (segment === 'under-18' && view === 'request') return <FlowIntro config={config} eyebrow="راهنمای شروع" title="این مسیر با همراهی سرپرست پیش می‌رود" description="اطلاعات نوجوان را وارد می‌کنید، نوع درخواست را انتخاب می‌کنید و وضعیت را باهم دنبال می‌کنید." points={['حضور ولی یا سرپرست در کنار نوجوان', 'ثبت تاریخ تولد و کد ملی نوجوان', 'انتخاب نوع درخواست پس از بررسی']} action="افزودن اطلاعات نوجوان" actionHref="/segments/under-18/child-info" icon="parent" />;
  if (segment === 'under-18' && view === 'child-info') return <ChildInfoPage config={config} />;
  if (segment === 'under-18' && view === 'account-request') return <AccountRequestPage config={config} />;
  if (segment === 'organization' && view === 'request') return <FlowIntro config={config} eyebrow="شروع عضویت سازمانی" title="ثبت سازمان را با مسئول مجاز آغاز کنید" description="دامنه فرایند، اطلاعات موردنیاز و ترتیب ثبت صاحبان امضاء را پیش از شروع ببینید." points={['ثبت اطلاعات پایه و شناسه ملی سازمان', 'افزودن صاحبان امضاء و اعضای مجاز', 'تکمیل اطلاعات و ارسال برای بررسی']} action="ورود به ثبت صاحبان امضاء" actionHref="/segments/organization/owners" icon="organization" />;
  if (segment === 'organization' && view === 'owners') return <OwnersPage config={config} />;
  if (segment === 'organization' && view === 'add-owner') return <AddOwnerPage config={config} />;
  return <SegmentLanding config={config} />;
}
