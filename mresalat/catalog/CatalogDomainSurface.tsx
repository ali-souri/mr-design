import { Badge } from '@/mresalat/core/primitives';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import type { AuditedServicePath } from '@/mresalat/domains/service-catalog';
import { serviceComponentRegistry } from '@/mresalat/domains/service-component-registry';
import { EmptyServiceState, ExternalLoginGate, SafeStopNotice, SensitiveDataPlaceholder, ServiceActionSummary, ServiceFormShell, UnavailableServiceState } from './ServiceCatalogPrimitives';

const has = (service: AuditedServicePath, key: keyof typeof serviceComponentRegistry) => service.componentKeys.includes(key);

function SearchList({ service }: { service: AuditedServicePath }) {
  return <section className="catalog-search-demo"><label><span>جستجو در {service.titleFa}</span><span className="catalog-search-input"><MResalatIcon name="search" size={20} /><input placeholder="نام خدمت یا ارائه‌دهنده…" /></span></label><div className="catalog-demo-list"><article><span><MResalatIcon name={service.domain === 'health' ? 'clinic' : 'education'} size={24} /></span><div><strong>ارائه‌دهنده نمونه</strong><small>اطلاعات عمومی و ساختگی برای مرور الگو</small></div><Badge tone="neutral">نمونه</Badge></article><EmptyServiceState title="نمونه حالت بدون نتیجه" detail="عبارت جستجو را کوتاه‌تر کنید." /></div><SafeStopNotice service={service} /></section>;
}

function ReadOnlyList({ service }: { service: AuditedServicePath }) {
  return <section className="catalog-read-demo"><div className="catalog-demo-toolbar"><label>بازه نمایشی<select defaultValue="all"><option value="all">همه موارد</option><option value="recent">تازه‌ترین</option></select></label><Badge tone="neutral">فقط مشاهده</Badge></div><div className="catalog-record-list">{['رکورد ساختگی A', 'رکورد ساختگی B'].map((title, index) => <article key={title}><span><MResalatIcon name={service.icon} size={20} /></span><div><strong>{title}</strong><small>شناسه <bdi dir="ltr">DEMO-••{index + 1}</bdi> · بدون داده واقعی</small></div><Badge tone={index ? 'neutral' : 'success'}>{index ? 'بایگانی' : 'فعال'}</Badge></article>)}</div><SensitiveDataPlaceholder kind="جزئیات پوشانده" lines={2} /><SafeStopNotice service={service} /></section>;
}

function FinanceDashboard({ service }: { service: AuditedServicePath }) {
  return <section className="catalog-finance-demo"><div className="catalog-metric-grid"><article><small>اعتبار نمونه</small><strong>••••••</strong><span>مبلغ واقعی نمایش داده نمی‌شود</span></article><article><small>وضعیت مسیر</small><strong>آماده مرور</strong><span>بدون تعهد یا درخواست</span></article><article><small>اقدام بعدی</small><strong>تأیید هویت</strong><span>خارج از این دمو</span></article></div>{has(service, 'qr-privacy') && <div className="catalog-qr"><span aria-hidden="true"><i /><i /><i /></span><div><Badge tone="warning">غیرقابل اسکن</Badge><h2>QR حریم‌خصوصی</h2><p>این الگو هیچ شناسه قابل استفاده‌ای تولید یا نمایش نمی‌دهد.</p></div></div>}<ServiceActionSummary service={service} impact="ممکن است اعتبار، خرید یا تعهد مالی ایجاد کند؛ دمو پیش از آن متوقف است." /><SafeStopNotice service={service} /></section>;
}

function CampaignSurface({ service }: { service: AuditedServicePath }) {
  return <section className="catalog-campaign"><div><Badge tone="info">پویش نمونه</Badge><h2>همراهی داوطلبانه، با تصمیم آگاهانه</h2><p>داستان و هدف پویش به‌صورت عمومی نمایش داده می‌شود؛ مبلغ و پرداخت وارد این نمونه نشده است.</p><div className="catalog-progress"><span style={{ width: '42%' }} /><small>۴۲٪ پیشرفت نمایشی</small></div></div><ServiceActionSummary service={service} impact="ثبت همیاری می‌تواند پرداخت مالی ایجاد کند." /><SafeStopNotice service={service} /></section>;
}

function InsuranceSurface({ service }: { service: AuditedServicePath }) {
  if (has(service, 'insurance-portal')) return <><section className="catalog-portal-grid">{['شخص ثالث', 'بدنه', 'موتورسیکلت', 'عمر'].map((title, index) => <article key={title}><MResalatIcon name={index === 3 ? 'health' : 'insurance'} size={24} /><strong>{title}</strong><small>اطلاعات عمومی محصول</small></article>)}</section><SafeStopNotice service={service} /></>;
  if (has(service, 'life-plan-selector')) return <section className="catalog-plan-selector"><h2>انتخاب نمایشی نوع پوشش</h2><div role="radiogroup" aria-label="طرح بیمه عمر"><button type="button" role="radio" aria-checked="true">پایه<small>بدون محاسبه حق بیمه</small></button><button type="button" role="radio" aria-checked="false">تکمیلی<small>بدون ادعای پوشش</small></button></div><ServiceActionSummary service={service} impact="ادامه واقعی می‌تواند نیازمند داده سلامت و پرداخت باشد." /><SafeStopNotice service={service} /></section>;
  return <ServiceFormShell service={service} title={`استعلام نمایشی ${service.titleFa}`} fields={[{ id: 'vehicle-type', label: 'نوع وسیله', type: 'select', options: ['خودرو نمونه', 'موتورسیکلت نمونه'], helper: 'هیچ پلاک یا شناسه واقعی وارد نکنید.' }, { id: 'model-year', label: 'سال ساخت', placeholder: '۱۴۰۰', helper: 'فقط مقدار ساختگی برای QA.' }]} />;
}

function BankingSurface({ service }: { service: AuditedServicePath }) {
  if (has(service, 'download-card')) return <><section className="catalog-download-card"><span><MResalatIcon name="product" size={32} /></span><div><Badge tone="info">اطلاعات عمومی</Badge><h2>{service.titleFa}</h2><p>راهنمای دریافت نسخه رسمی، بدون شروع نصب یا دریافت اطلاعات دستگاه.</p></div><button className="button button-secondary" type="button" disabled>دریافت در دمو غیرفعال است</button></section><SafeStopNotice service={service} /></>;
  if (has(service, 'banking-hub') && !has(service, 'banking-request')) return <><section className="catalog-portal-grid">{['حساب و کارت', 'وام‌ها', 'انتقال وجه', 'درگاه‌های ورود'].map((title) => <article key={title}><MResalatIcon name="bank" size={24} /><strong>{title}</strong><small>ورودی معرفی‌شده، بدون عملیات بانکی</small></article>)}</section><SafeStopNotice service={service} /></>;
  return <ServiceFormShell service={service} title={`ورودی نمایشی ${service.titleFa}`} fields={[{ id: 'request-type', label: 'نوع درخواست', type: 'select', options: ['درخواست نمونه', 'پیگیری نمونه'], helper: 'انتخاب شما هیچ درخواست واقعی نمی‌سازد.' }, { id: 'reference', label: 'شرح کوتاه', placeholder: 'توضیح ساختگی', helper: 'اطلاعات بانکی یا شخصی وارد نکنید.' }]}><ServiceActionSummary service={service} impact="ادامه واقعی می‌تواند درخواست بانکی یا تعهد مالی ایجاد کند." /></ServiceFormShell>;
}

function CommunicationSurface({ service }: { service: AuditedServicePath }) {
  if (has(service, 'map-gate')) return <section className="catalog-map-gate"><span><MResalatIcon name="location" size={32} /></span><div><Badge tone="warning">مجوز مکان</Badge><h2>مکان دقیق درخواست نمی‌شود</h2><p>نقشه الگویی خنثی است و مختصات، نشانی یا شناسه دستگاه را دریافت نمی‌کند.</p><button type="button" className="button button-secondary" disabled>درخواست مکان غیرفعال</button></div><SafeStopNotice service={service} /></section>;
  if (has(service, 'search-entry')) return <SearchList service={service} />;
  if (has(service, 'download-card')) return <BankingSurface service={service} />;
  if (has(service, 'conversation-list')) return <section className="catalog-conversations"><div className="catalog-demo-toolbar"><Badge tone="success">پس از ورود</Badge><span>محتوای پیام پوشانده است</span></div>{['گفتگوی نمونه یک', 'اعلان ساختگی'].map((title) => <article key={title}><span><MResalatIcon name="messages" size={20} /></span><div><strong>{title}</strong><small>متن پیام نمایش داده نمی‌شود · ••••••</small></div><time>—</time></article>)}<SafeStopNotice service={service} /></section>;
  return <section className="catalog-composer"><label><span>متن پیش‌نویس نمایشی</span><textarea placeholder="پرسش عمومی درباره خدمات…" /></label><button type="button" className="button button-primary" disabled>ارسال در دمو غیرفعال است</button><SafeStopNotice service={service} /></section>;
}

function MembershipSupportSurface({ service }: { service: AuditedServicePath }) {
  if (has(service, 'membership-tracking') || has(service, 'supporter-list') || has(service, 'loan-gate') && service.surfaceKind === 'read-only') return <ReadOnlyList service={service} />;
  if (has(service, 'association-card') && service.surfaceKind === 'read-only') return <section className="catalog-membership-card"><header><MResalatIcon name="card" size={24} /><div><small>کارت نمایشی انجمن</small><strong>عضو نمونه</strong></div></header><dl><div><dt>شناسه</dt><dd><bdi dir="ltr">•••• ••••</bdi></dd></div><div><dt>وضعیت</dt><dd>فعال نمایشی</dd></div></dl><SafeStopNotice service={service} /></section>;
  return <ServiceFormShell service={service} title={`پوسته ${service.titleFa}`} fields={[{ id: 'identity', label: service.domain === 'membership' ? 'نوع عضویت' : 'شناسه نمایشی', type: 'select', options: ['گزینه نمونه یک', 'گزینه نمونه دو'], helper: 'هیچ شناسه یا اطلاعات شخصی واقعی وارد نکنید.' }, { id: 'note', label: 'توضیح', placeholder: 'متن ساختگی', helper: 'برای مرور حالت کمک و خطا.' }]}>{service.riskLevel === 'L3' && <ServiceActionSummary service={service} impact="ادامه واقعی می‌تواند درخواست مالی یا تأیید هویت ایجاد کند." />}</ServiceFormShell>;
}

function HealthSurface({ service }: { service: AuditedServicePath }) {
  if (has(service, 'provider-search')) return <SearchList service={service} />;
  if (has(service, 'medical-record-gate')) return <><ExternalLoginGate title="پرونده پزشکی حفاظت‌شده" detail="این دمو هیچ سند، نتیجه، تشخیص یا محتوای پزشکی را دریافت یا نمایش نمی‌دهد." /><SafeStopNotice service={service} /></>;
  if (has(service, 'appointment-list')) return <><EmptyServiceState title="نوبت واقعی نمایش داده نمی‌شود" detail="برای QA فقط ساختار فهرست و حالت خالی ارائه شده است." /><SafeStopNotice service={service} /></>;
  return <section className="catalog-health-dashboard"><div className="catalog-metric-grid"><article><small>مسیرهای عمومی</small><strong>۲</strong><span>کاملاً ساختگی</span></article><article><small>اقدام لازم</small><strong>ندارد</strong><span>بدون توصیه پزشکی</span></article></div><SensitiveDataPlaceholder kind="خلاصه سلامت بدون محتوای بالینی" /><SafeStopNotice service={service} /></section>;
}

function MarketplaceSurface({ service }: { service: AuditedServicePath }) {
  return <section className="catalog-existing-surface"><div><Badge tone="success">استفاده مجدد</Badge><h2>پوشش موجود ام‌بازار</h2><p>این مسیر به اجزای عمیق موجود مانند جستجو، کارت کالا، سفارش، آدرس، اقساط و Checkout متصل است.</p>{service.demoHref && <a className="button button-secondary" href={service.demoHref}>باز کردن نمونه موجود<MResalatIcon name="next" size={16} /></a>}</div><ServiceActionSummary service={service} impact={service.riskLevel === 'L3' ? 'تسویه یا خرید می‌تواند پرداخت و تعهد مالی ایجاد کند.' : 'این نمای کاتالوگ هیچ داده خرید واقعی را تغییر نمی‌دهد.'} /><SafeStopNotice service={service} /></section>;
}

export function CatalogDomainSurface({ service }: { service: AuditedServicePath }) {
  if (service.verificationStatus === 'not-visible') return <><UnavailableServiceState notVisible /><SafeStopNotice service={service} /></>;
  if (service.verificationStatus === 'unavailable') return <><UnavailableServiceState /><SafeStopNotice service={service} /></>;
  if (service.verificationStatus === 'gated') return <><ExternalLoginGate title={has(service, 'medical-record-gate') ? 'پرونده پزشکی حفاظت‌شده' : undefined} /><SafeStopNotice service={service} /></>;
  if (has(service, 'mbazar-existing')) return <MarketplaceSurface service={service} />;
  if (has(service, 'provider-search')) return service.domain === 'health' ? <HealthSurface service={service} /> : <SearchList service={service} />;
  if (service.domain === 'membership' || service.domain === 'mhami' || service.domain === 'supporters-association') return <MembershipSupportSurface service={service} />;
  if (service.domain === 'health') return <HealthSurface service={service} />;
  if (service.domain === 'insurance') return <InsuranceSurface service={service} />;
  if (service.domain === 'banking') return <BankingSurface service={service} />;
  if (['communication', 'location', 'support'].includes(service.domain)) return <CommunicationSurface service={service} />;
  if (has(service, 'campaign-card') || has(service, 'contribution-history')) return has(service, 'contribution-history') ? <ReadOnlyList service={service} /> : <CampaignSurface service={service} />;
  if (has(service, 'transaction-list')) return <ReadOnlyList service={service} />;
  if (has(service, 'credit-summary') || has(service, 'finance-dashboard') || has(service, 'qr-privacy')) return <FinanceDashboard service={service} />;
  if (has(service, 'credit-form')) return <ServiceFormShell service={service} title={`فرم نمایشی ${service.titleFa}`} fields={[{ id: 'amount', label: 'مبلغ نمایشی', placeholder: '۰', helper: 'مبلغ واردشده ارسال یا نگهداری نمی‌شود.' }, { id: 'destination', label: 'مقصد ساختگی', placeholder: 'شناسه نمونه', helper: 'هیچ حساب یا فرد واقعی وارد نکنید.' }]}><ServiceActionSummary service={service} impact="ادامه واقعی می‌تواند مانده اعتبار را تغییر دهد." /></ServiceFormShell>;
  if (has(service, 'form-builder-entry')) return <ServiceFormShell service={service} title="سازنده فرم عمومی" fields={[{ id: 'title', label: 'عنوان فرم', placeholder: 'فرم نمونه', helper: 'ذخیره و انتشار غیرفعال است.' }, { id: 'template', label: 'الگو', type: 'select', options: ['خالی', 'نمونه عمومی'] }]} />;
  if (has(service, 'service-entry-card')) return <section className="catalog-entry-card"><MResalatIcon name={service.icon} size={32} /><div><Badge tone="info">ورودی عمومی</Badge><h2>{service.titleFa}</h2><p>فقط جایگاه و مرز ورود خدمت نمایش داده می‌شود؛ عملکرد داخلی ادعا نشده است.</p></div><SafeStopNotice service={service} /></section>;
  return <><SensitiveDataPlaceholder /><SafeStopNotice service={service} /></>;
}
