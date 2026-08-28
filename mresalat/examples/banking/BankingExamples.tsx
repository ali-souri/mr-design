'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { Badge } from '@/mresalat/core/primitives';
import { MResalatIcon, type MResalatIconName } from '@/mresalat/core/MResalatIcon';
import { ExternalProductGate, Field, Panel, ProductExampleShell, SafeReview, Stepper } from '../product/ProductExampleShell';

const bankingServices: Array<{ href: string; title: string; detail: string; icon: MResalatIconName; gate?: boolean }> = [
  { href: '/examples/banking/current-account', title: 'افتتاح حساب جاری', detail: 'شرایط و پوسته درخواست', icon: 'bank' },
  { href: '/examples/banking/card', title: 'کارت رسالت', detail: 'درخواست یا تغییر کارت', icon: 'card' },
  { href: '/examples/banking/satna', title: 'ساتنا', detail: 'اطلاعات و مرز ورود بانکی', icon: 'settlement', gate: true },
  { href: '/examples/banking/child-loan', title: 'وام کودک', detail: 'شرایط و درخواست نمایشی', icon: 'child' },
  { href: '/examples/banking/marriage-loan', title: 'وام ازدواج', detail: 'مسیر مستقل و محصول‌محور', icon: 'family' },
  { href: '/examples/banking/services', title: 'همه خدمات بانکی', detail: 'هاب حفاظت‌شده بانکی', icon: 'grid', gate: true },
  { href: '/examples/banking/mobile', title: 'همراه‌بانک', detail: 'اطلاعات نصب و منبع دانلود', icon: 'product' },
  { href: '/examples/banking/internet', title: 'اینترنت‌بانک', detail: 'درگاه ورود مستقل', icon: 'lock', gate: true },
];

export function BankingHub() {
  return <ProductExampleShell serviceId="virtual-counter"><section className="banking-hub-hero"><div><span className="eyebrow">پیشخوان مجازی رسالت</span><h2>خدمت بانکی را با مرز دسترسی‌اش انتخاب کنید</h2><p>درخواست‌های عمومی به پوسته مرور می‌رسند؛ خدمات بانکی حساس پشت ورود جداگانه می‌مانند.</p></div><div className="banking-security-stamp"><MResalatIcon name="security" size={29} /><strong>بدون اتصال بانکی</strong><small>Demo environment</small></div></section><section className="banking-service-grid">{bankingServices.map((service) => <Link href={service.href} key={service.href}><header><span className="product-card-header-icon"><MResalatIcon name={service.icon} size={24} /></span>{service.gate && <Badge tone="warning">ورود جدا</Badge>}</header><h3>{service.title}</h3><p>{service.detail}</p><span>مشاهده نمونه<MResalatIcon name="next" size={16} /></span></Link>)}</section></ProductExampleShell>;
}

type RequestVariant = 'current' | 'card' | 'child-loan' | 'marriage-loan';
const requestCopy: Record<RequestVariant, { serviceId: string; title: string; intro: string; requirements: string[]; icon: MResalatIconName }> = {
  current: { serviceId: 'current-account-opening', title: 'افتتاح حساب جاری', intro: 'پیش‌نیازها و اطلاعات پایه درخواست حساب جاری را مرور کنید.', requirements: ['عضویت و هویت تأییدشده در محصول رسمی', 'مدارک و شرایط حساب جاری', 'مرور نهایی پیش از ارسال'], icon: 'bank' },
  card: { serviceId: 'resalat-card', title: 'کارت رسالت', intro: 'نوع درخواست کارت و شرایط تحویل را بدون ثبت درخواست مرور کنید.', requirements: ['حساب واجد شرایط', 'انتخاب نوع درخواست', 'نشانی تأییدشده در محصول رسمی'], icon: 'card' },
  'child-loan': { serviceId: 'child-loan', title: 'وام کودک', intro: 'شرایط محصول کودک و زمینه سرپرست را پیش از درخواست ببینید.', requirements: ['زمینه والد / سرپرست', 'عضویت کودک در محصول رسمی', 'بررسی شرایط تسهیلات'], icon: 'child' },
  'marriage-loan': { serviceId: 'marriage-loan', title: 'وام ازدواج', intro: 'پیش‌نیازها و ورود اولیه درخواست را بدون ارسال مالی مرور کنید.', requirements: ['عضویت معتبر', 'مدارک مربوط در محصول رسمی', 'بررسی و تأیید بانکی'], icon: 'family' },
};

export function BankingRequestForm({ variant }: { variant: RequestVariant }) {
  const copy = requestCopy[variant]; const [step, setStep] = useState(0); const [requestType, setRequestType] = useState(variant === 'card' ? 'new' : 'standard'); const [contact, setContact] = useState(''); const [context, setContext] = useState('');
  const review = (event: FormEvent) => { event.preventDefault(); setStep(2); };
  return <ProductExampleShell serviceId={copy.serviceId}><Stepper steps={['شرایط', 'ورودی درخواست', 'مرور و توقف']} current={step} />{step === 0 ? <div className="product-split"><Panel title={copy.title} eyebrow="معرفی درخواست" icon={copy.icon}><p className="panel-copy">{copy.intro}</p><ul className="requirement-list">{copy.requirements.map((item) => <li key={item}><MResalatIcon name="success" size={17} />{item}</li>)}</ul><button className="button button-primary" type="button" onClick={() => setStep(1)}>شروع فرم نمایشی</button></Panel><Panel title="اثر درخواست" eyebrow="L3 · اقدام حساس" icon="warning"><p className="panel-copy">ارسال واقعی می‌تواند پرونده بانکی یا تسهیلاتی ایجاد کند. نسخه نمایشی پیش از همین اثر متوقف می‌شود.</p></Panel></div> : step === 1 ? <Panel title="اطلاعات اولیه" eyebrow={`فرم ${copy.title}`} icon="evidence"><form className="product-form" onSubmit={review}><div className="product-form-grid">{variant === 'card' && <Field label="نوع درخواست"><select value={requestType} onChange={(event) => setRequestType(event.target.value)}><option value="new">درخواست کارت جدید</option><option value="change">تغییر / جایگزینی کارت</option></select></Field>}{variant.includes('loan') && <Field label="نوع درخواست"><select value={requestType} onChange={(event) => setRequestType(event.target.value)}><option value="standard">شروع درخواست</option><option value="info">فقط مرور شرایط</option></select></Field>}<Field label={variant === 'current' ? 'نوع فعالیت / نیاز حساب' : variant === 'card' ? 'دلیل درخواست' : 'زمینه درخواست'}><input value={context} onChange={(event) => setContext(event.target.value)} placeholder="اطلاعات ساختگی" /></Field><Field label="شماره همراه ساختگی"><input dir="ltr" inputMode="tel" value={contact} onChange={(event) => setContact(event.target.value.replace(/\D/g, '').slice(0, 11))} placeholder="09000000000" /></Field>{variant === 'current' && <Field label="نوع حساب"><select defaultValue=""><option value="" disabled>انتخاب کنید</option><option>جاری بدون دسته‌چک</option><option>مرور شرایط سایر انواع</option></select></Field>}</div><button className="button button-primary" type="submit">مرور درخواست</button></form></Panel> : <SafeReview title={`مرور ${copy.title}`} rows={[{ label: 'نوع مسیر', value: requestType === 'new' ? 'کارت جدید' : requestType === 'change' ? 'تغییر کارت' : requestType === 'info' ? 'مرور شرایط' : 'شروع درخواست' }, { label: 'زمینه', value: context || 'تکمیل نشده' }, { label: 'همراه', value: contact ? `•••••••${contact.slice(-4)}` : 'تکمیل نشده' }, { label: 'اثر بعدی', value: 'ایجاد یا ارسال درخواست در محصول رسمی' }]} action="ارسال درخواست واقعی غیرفعال است" />}</ProductExampleShell>;
}

export function Satna() {
  return <ProductExampleShell serviceId="satna-transfer"><div className="product-split"><Panel title="انتقال ساتنا" eyebrow="اطلاعات عمومی" icon="settlement"><p className="panel-copy">ساتنا یک مسیر بانکی حساس است. این نمونه فقط هدف کلی و مرز امنیتی آن را توضیح می‌دهد.</p><dl className="definition-list"><div><dt>کاربرد کلی</dt><dd>انتقال بین‌بانکی در بستر رسمی</dd></div><div><dt>اطلاعات در دمو</dt><dd>هیچ حساب، شبا یا مبلغی دریافت نمی‌شود</dd></div><div><dt>اجرای انتقال</dt><dd>صفر</dd></div></dl></Panel><ExternalProductGate title="ورود بانکی برای ساتنا" description="فرم انتقال عمداً نمایش داده نمی‌شود؛ ابتدا باید در بستر بانکی رسمی وارد شوید." evidence="ممیزی، این مسیر را پشت ورود جداگانه بانکی مشاهده کرد." /></div></ProductExampleShell>;
}

export function AllBankingServices() {
  return <ProductExampleShell serviceId="all-banking-services"><div className="product-split"><Panel title="همه خدمات بانکی" eyebrow="هاب حفاظت‌شده" icon="grid"><p className="panel-copy">خدماتی مانند انتقال، مدیریت حساب و عملیات حساس در این دمو فهرست اجرایی ندارند؛ فقط دسته‌های عمومی نشان داده می‌شوند.</p><div className="locked-service-list">{['حساب‌ها', 'انتقال‌ها', 'کارت‌ها', 'تسهیلات'].map((item) => <span key={item}><MResalatIcon name="lock" size={17} />{item}</span>)}</div></Panel><ExternalProductGate title="ورود به خدمات بانکی" description="این مرز، اطلاعات ورود و عملیات بانکی را از محیط نمونه جدا نگه می‌دارد." /></div></ProductExampleShell>;
}

export function MobileBanking() {
  const [platform, setPlatform] = useState('android');
  return <ProductExampleShell serviceId="mobile-banking"><section className="mobile-bank-hero"><div className="phone-frame"><div><MResalatIcon name="bank" size={32} /><strong>همراه‌بانک رسالت</strong><small>نمونه صفحه معرفی</small></div></div><div><span className="eyebrow">دانلود و نصب امن</span><h2>برنامه را فقط از منبع تأییدشده دریافت کنید</h2><p>این صفحه فایل اجرایی ارائه نمی‌کند و لینک دانلود تأییدنشده نمی‌سازد.</p><div className="platform-choice" role="radiogroup"><button type="button" role="radio" aria-checked={platform === 'android'} className={platform === 'android' ? 'selected' : ''} onClick={() => setPlatform('android')}>Android</button><button type="button" role="radio" aria-checked={platform === 'web'} className={platform === 'web' ? 'selected' : ''} onClick={() => setPlatform('web')}>راهنمای وب</button></div><button className="button button-primary" type="button" disabled>دانلود تأییدشده در دمو موجود نیست</button></div></section><Panel title="راهنمای نصب" eyebrow={platform === 'android' ? 'Android' : 'نسخه وب'} icon="product"><ol className="numbered-guide"><li><span>۱</span><div><strong>منبع رسمی را بررسی کنید</strong><p>نام ناشر و دامنه باید با کانال رسمی مطابقت داشته باشد.</p></div></li><li><span>۲</span><div><strong>مجوزها را مرور کنید</strong><p>فقط مجوزهای لازم را بپذیرید.</p></div></li><li><span>۳</span><div><strong>نشانی را ذخیره نکنید</strong><p>اطلاعات ورود را در صفحات ناشناس وارد نکنید.</p></div></li></ol></Panel></ProductExampleShell>;
}

export function InternetBanking() {
  return <ProductExampleShell serviceId="internet-banking"><div className="product-split"><Panel title="اینترنت‌بانک" eyebrow="ورودی امن" icon="bank"><p className="panel-copy">اطلاعات عمومی امنیت پیش از انتقال به سامانه مستقل نمایش داده می‌شود.</p><ul className="requirement-list"><li><MResalatIcon name="success" size={17} />نشانی رسمی را بررسی کنید</li><li><MResalatIcon name="success" size={17} />رمز را با دیگران به‌اشتراک نگذارید</li><li><MResalatIcon name="warning" size={17} />این دمو هیچ credential دریافت نمی‌کند</li></ul></Panel><ExternalProductGate title="ورود به اینترنت‌بانک" description="صفحه ورود واقعی خارج از این نمونه است و در اینجا باز یا تقلید نمی‌شود." /></div></ProductExampleShell>;
}

export const bankingScreens: Record<string, React.ComponentType> = {
  'current-account': () => <BankingRequestForm variant="current" />,
  card: () => <BankingRequestForm variant="card" />,
  satna: Satna,
  'child-loan': () => <BankingRequestForm variant="child-loan" />,
  'marriage-loan': () => <BankingRequestForm variant="marriage-loan" />,
  services: AllBankingServices,
  mobile: MobileBanking,
  internet: InternetBanking,
};
