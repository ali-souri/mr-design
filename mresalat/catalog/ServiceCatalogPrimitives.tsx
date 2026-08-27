'use client';

import { useId, useState, type ReactNode } from 'react';
import { Alert, Badge } from '@/mresalat/core/primitives';
import { MResalatIcon, type MResalatIconName } from '@/mresalat/core/MResalatIcon';
import type { AuditedServicePath, ServiceRiskLevel, ServiceVerificationStatus } from '@/mresalat/domains/service-catalog';

const statusCopy: Record<ServiceVerificationStatus, { label: string; detail: string; tone: 'info' | 'success' | 'warning' | 'danger' | 'neutral'; icon: MResalatIconName }> = {
  authenticated: { label: 'پس از ورود مشاهده شد', detail: 'سطح ممیزی‌شده احراز‌شده', tone: 'success', icon: 'lock' },
  public: { label: 'عمومی', detail: 'بدون ورود مشاهده شد', tone: 'info', icon: 'view' },
  'safe-stop': { label: 'توقف امن', detail: 'پیش از اثر واقعی متوقف می‌شود', tone: 'warning', icon: 'warning' },
  gated: { label: 'درگاه جداگانه', detail: 'نیازمند ورود خارج از این دمو', tone: 'warning', icon: 'lock' },
  unavailable: { label: 'در دسترس نبود', detail: 'خطا در ممیزی مشاهده شد', tone: 'danger', icon: 'error' },
  'not-visible': { label: 'مشاهده نشد', detail: 'برای حساب ممیزی‌شده دیده نشد', tone: 'neutral', icon: 'help' },
};

const riskCopy: Record<ServiceRiskLevel, string> = {
  L0: 'دانش عمومی', L1: 'مشاهده حفاظت‌شده', L2: 'اقدام کنترل‌شده', L3: 'اقدام حساس',
};

export function ServiceStatusBadge({ status, compact = false }: { status: ServiceVerificationStatus; compact?: boolean }) {
  const copy = statusCopy[status];
  return <span className={`catalog-status catalog-status-${status}`} role="status" aria-label={`${copy.label}؛ ${copy.detail}`}><MResalatIcon name={copy.icon} size={16} /><span>{copy.label}{!compact && <small>{copy.detail}</small>}</span></span>;
}

export function ServiceHeader({ service, compact = false }: { service: AuditedServicePath; compact?: boolean }) {
  const Heading = compact ? 'h3' : 'h1';
  return <header className={`catalog-service-header ${compact ? 'compact' : ''}`}>
    <span className="catalog-service-icon"><MResalatIcon name={service.icon} size={compact ? 20 : 32} /></span>
    <div><small>فصل {String(service.chapter).padStart(2, '0')} · <bdi dir="ltr">{service.domain}</bdi></small><Heading>{service.titleFa}</Heading><p lang="en" dir="ltr">{service.titleEn}</p></div>
    <Badge tone={service.riskLevel === 'L3' ? 'danger' : service.riskLevel === 'L2' ? 'warning' : service.riskLevel === 'L1' ? 'success' : 'info'}>{service.riskLevel} · {riskCopy[service.riskLevel]}</Badge>
  </header>;
}

export function ServiceSurface({ service, children, compact = false }: { service: AuditedServicePath; children: ReactNode; compact?: boolean }) {
  return <article className={`catalog-service-surface risk-${service.riskLevel.toLowerCase()} ${compact ? 'compact' : 'detail'}`} data-service-id={service.id}>
    <ServiceHeader service={service} compact={compact} />
    {children}
  </article>;
}

export function SafeStopNotice({ service }: { service: AuditedServicePath }) {
  return <aside className={`safe-stop-notice risk-${service.riskLevel.toLowerCase()}`} aria-labelledby={`stop-${service.id}`}>
    <span><MResalatIcon name={service.riskLevel === 'L3' ? 'security' : 'warning'} size={20} /></span>
    <div><strong id={`stop-${service.id}`}>مرز امن این دمو</strong><p>{service.safeStopFa}</p><small lang="en" dir="ltr">{service.safeStopEn}</small></div>
  </aside>;
}

export function ExternalLoginGate({ title = 'ورود در سامانه جداگانه', detail = 'برای امنیت شما، اطلاعات ورود در MResalat System دریافت نمی‌شود.' }: { title?: string; detail?: string }) {
  return <section className="catalog-gate" role="status"><span><MResalatIcon name="lock" size={32} /></span><div><Badge tone="warning">درگاه مستقل</Badge><h2>{title}</h2><p>{detail}</p><button className="button button-secondary" type="button" disabled>ورود در نسخه نمایشی غیرفعال است</button></div></section>;
}

export function UnavailableServiceState({ notVisible = false }: { notVisible?: boolean }) {
  return <section className="catalog-unavailable" role="status"><span><MResalatIcon name={notVisible ? 'help' : 'error'} size={32} /></span><div><h2>{notVisible ? 'این مسیر در ممیزی دیده نشد' : 'این خدمت در دسترس نبود'}</h2><p>{notVisible ? 'برای این وضعیت فقط شواهد عدم مشاهده ثبت شده و گردش‌کاری ساخته نشده است.' : 'وضعیت خطای مشاهده‌شده، بدون ساخت مسیر یا قابلیت جایگزین، حفظ شده است.'}</p></div></section>;
}

export function SensitiveDataPlaceholder({ kind = 'اطلاعات حساس', lines = 3 }: { kind?: string; lines?: number }) {
  return <section className="sensitive-placeholder" aria-label={`${kind} ساختگی و پوشانده`}><header><MResalatIcon name="security" size={20} /><div><strong>{kind}</strong><small>ساختگی · پوشانده · فقط نمایش</small></div></header>{Array.from({ length: lines }, (_, index) => <span key={index} style={{ '--placeholder-width': `${92 - index * 14}%` } as React.CSSProperties} />)}</section>;
}

export function EmptyServiceState({ title = 'موردی برای نمایش نیست', detail = 'فیلترها را تغییر دهید یا بعداً دوباره بررسی کنید.' }: { title?: string; detail?: string }) {
  return <div className="catalog-empty" role="status"><MResalatIcon name="search" size={24} /><strong>{title}</strong><p>{detail}</p></div>;
}

export type MockField = { id: string; label: string; type?: 'text' | 'select'; placeholder?: string; helper?: string; options?: string[] };

export function ServiceFormShell({ service, title, fields, children }: { service: AuditedServicePath; title: string; fields: MockField[]; children?: ReactNode }) {
  const formId = useId();
  const [reviewed, setReviewed] = useState(false);
  const [error, setError] = useState(false);
  return <section className="catalog-form-shell"><header><span className="eyebrow">فرم نمایشی</span><h2>{title}</h2><p>برای QA می‌توانید کنترل‌ها را مرور کنید؛ هیچ داده‌ای ذخیره یا ارسال نمی‌شود.</p></header><form noValidate onSubmit={(event) => { event.preventDefault(); const formData = new FormData(event.currentTarget); const invalid = fields.some((field) => !String(formData.get(field.id) ?? '').trim()); setError(invalid); setReviewed(!invalid); }}>
    <div className="catalog-form-grid">{fields.map((field) => { const describedBy = `${formId}-${field.id}-help`; return <label key={field.id} htmlFor={`${formId}-${field.id}`}><span>{field.label}</span>{field.type === 'select' ? <select id={`${formId}-${field.id}`} name={field.id} required defaultValue="" aria-describedby={describedBy}><option value="" disabled>انتخاب کنید</option>{field.options?.map((option) => <option key={option}>{option}</option>)}</select> : <input id={`${formId}-${field.id}`} name={field.id} required placeholder={field.placeholder ?? 'مقدار ساختگی'} aria-describedby={describedBy} />}{field.helper && <small id={describedBy}>{field.helper}</small>}</label>; })}</div>
    {children}
    {error && <Alert tone="danger" title="اطلاعات نمایشی کامل نیست">برای دیدن مرز توقف، فیلدهای نمونه را کامل کنید. داده‌ای ارسال نشده است.</Alert>}
    {reviewed && <Alert tone="success" title="مرز توقف با موفقیت بررسی شد">فرم همین‌جا متوقف شد؛ هیچ درخواست واقعی ایجاد نشد.</Alert>}
    <button className="button button-primary" type="submit">بررسی فرم تا مرز امن</button>
    <button className="button button-secondary" type="button" disabled>ثبت یا ادامه واقعی</button>
  </form><SafeStopNotice service={service} /></section>;
}

export function ServiceActionSummary({ service, impact = 'این مرحله می‌تواند در محصول واقعی اثر بیرونی داشته باشد.' }: { service: AuditedServicePath; impact?: string }) {
  return <section className="catalog-action-summary"><header><MResalatIcon name="assessment" size={24} /><div><small>مرور پیش از اقدام</small><h2>اثر و مرز تأیید</h2></div></header><dl><div><dt>اثر احتمالی</dt><dd>{impact}</dd></div><div><dt>سطح ریسک</dt><dd>{service.riskLevel} · {riskCopy[service.riskLevel]}</dd></div><div><dt>وضعیت دمو</dt><dd>بدون اجرا و بدون اتصال به محصول واقعی</dd></div></dl><label className="catalog-confirmation"><input type="checkbox" disabled /><span>تأیید واقعی فقط پس از احراز هویت و مرور نهایی محصول انجام می‌شود.</span></label></section>;
}

export function CatalogStateGallery() {
  return <section className="catalog-state-gallery" aria-labelledby="catalog-states-title"><header><span className="eyebrow">حالت‌های پایه</span><h2 id="catalog-states-title">وضعیت‌ها، بخشی از طراحی‌اند</h2></header><div><article className="catalog-loading" aria-label="نمونه حالت بارگذاری"><span /><span /><span /></article><EmptyServiceState /><ExternalLoginGate title="نمونه حالت درگاه" /><UnavailableServiceState /></div></section>;
}
