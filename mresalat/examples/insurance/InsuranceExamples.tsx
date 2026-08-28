'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { Badge } from '@/mresalat/core/primitives';
import { MResalatIcon, type MResalatIconName } from '@/mresalat/core/MResalatIcon';
import { Field, Panel, ProductExampleShell, SafeReview, Stepper } from '../product/ProductExampleShell';

const insuranceProducts: Array<{ href: string; label: string; detail: string; icon: MResalatIconName; badge: string }> = [
  { href: '/examples/mbime/third-party', label: 'بیمه شخص ثالث', detail: 'خودرو، برند، تیپ، سال و کاربری', icon: 'insurance', badge: 'خودرو' },
  { href: '/examples/mbime/comprehensive', label: 'بیمه بدنه', detail: 'فرم وسیله نقلیه با مرور متفاوت', icon: 'security', badge: 'خودرو' },
  { href: '/examples/mbime/motorcycle', label: 'بیمه موتورسیکلت', detail: 'برند، نوع، کاربری و سال', icon: 'product', badge: 'موتور' },
  { href: '/examples/mbime/life', label: 'بیمه عمر', detail: 'انتخاب طرح و خلاصه مزایا', icon: 'health', badge: 'زندگی' },
];

export function InsurancePortal() {
  return <ProductExampleShell serviceId="mbime-portal"><section className="insurance-portal-hero"><div><span className="eyebrow">انتخاب محصول، بدون محاسبه حق‌بیمه</span><h2>پوشش مناسب را از نوع نیاز پیدا کنید</h2><p>ورودی استعلام و خسارت فقط معرفی می‌شود؛ هیچ منطق قیمت‌گذاری یا صدور بیمه‌نامه‌ای وجود ندارد.</p><div><button className="button button-primary" type="button" disabled>استعلام بیمه‌نامه · دمو</button><button className="button button-secondary" type="button" disabled>ورود به خسارت · دمو</button></div></div><span className="insurance-shield"><MResalatIcon name="insurance" size={46} /></span></section><section className="insurance-product-grid">{insuranceProducts.map((product) => <Link href={product.href} key={product.href}><header><span><MResalatIcon name={product.icon} size={25} /></span><Badge tone="info">{product.badge}</Badge></header><h3>{product.label}</h3><p>{product.detail}</p><span>شروع نمونه<MResalatIcon name="next" size={17} /></span></Link>)}</section><Panel title="قبل از خرید بدانید" eyebrow="شفافیت محصول" icon="evidence"><div className="insurance-facts"><article><strong>۰</strong><span>محاسبه واقعی حق‌بیمه</span></article><article><strong>۰</strong><span>داده وسیله نقلیه ذخیره‌شده</span></article><article><strong>۰</strong><span>بیمه‌نامه صادرشده</span></article></div></Panel></ProductExampleShell>;
}

export function VehicleInsuranceForm({ variant }: { variant: 'third-party' | 'comprehensive' | 'motorcycle' }) {
  const serviceId = variant === 'third-party' ? 'third-party-insurance' : variant === 'comprehensive' ? 'comprehensive-insurance' : 'motorcycle-insurance';
  const title = variant === 'third-party' ? 'بیمه شخص ثالث' : variant === 'comprehensive' ? 'بیمه بدنه' : 'بیمه موتورسیکلت';
  const [step, setStep] = useState(0); const [values, setValues] = useState({ vehicle: variant === 'motorcycle' ? 'موتورسیکلت' : '', brand: '', trim: '', year: '', use: '' });
  const submit = (event: FormEvent) => { event.preventDefault(); setStep(1); };
  return <ProductExampleShell serviceId={serviceId}><Stepper steps={['مشخصات وسیله', 'مرور اطلاعات', 'استعلام رسمی']} current={step} />{step === 0 ? <div className="product-split"><Panel title={title} eyebrow="فرم وسیله نقلیه" icon={variant === 'comprehensive' ? 'security' : 'insurance'}><form className="product-form" onSubmit={submit}><div className="product-form-grid"><Field label="نوع وسیله"><select required value={values.vehicle} onChange={(event) => setValues({ ...values, vehicle: event.target.value })}><option value="" disabled>انتخاب کنید</option><option>{variant === 'motorcycle' ? 'موتورسیکلت' : 'سواری'}</option><option>{variant === 'motorcycle' ? 'اسکوتر' : 'وانت'}</option></select></Field><Field label="برند"><select required value={values.brand} onChange={(event) => setValues({ ...values, brand: event.target.value })}><option value="" disabled>انتخاب کنید</option><option>برند ساختگی الف</option><option>برند ساختگی ب</option></select></Field>{variant !== 'motorcycle' && <Field label="تیپ"><input required value={values.trim} onChange={(event) => setValues({ ...values, trim: event.target.value })} placeholder="تیپ نمونه" /></Field>}<Field label="سال ساخت"><select required value={values.year} onChange={(event) => setValues({ ...values, year: event.target.value })}><option value="" disabled>انتخاب کنید</option><option>۱۴۰۴</option><option>۱۴۰۳</option><option>۱۴۰۲</option></select></Field><Field label="نوع کاربری"><select required value={values.use} onChange={(event) => setValues({ ...values, use: event.target.value })}><option value="" disabled>انتخاب کنید</option><option>شخصی</option><option>سازمانی</option></select></Field></div><button className="button button-primary" type="submit">مرور اطلاعات</button></form></Panel><Panel title="در این مرحله چه نمی‌کنیم؟" eyebrow="بدون قیمت‌گذاری" icon="warning"><ul className="requirement-list"><li><MResalatIcon name="close" size={17} />محاسبه حق‌بیمه</li><li><MResalatIcon name="close" size={17} />استعلام پلاک یا سابقه</li><li><MResalatIcon name="close" size={17} />منطق پذیرش ریسک</li></ul></Panel></div> : <SafeReview title={`مرور ${title}`} rows={[{ label: 'وسیله', value: values.vehicle || 'انتخاب نشده' }, { label: 'برند / تیپ', value: `${values.brand || '—'} ${values.trim}` }, { label: 'سال / کاربری', value: `${values.year || '—'} · ${values.use || '—'}` }, { label: 'نتیجه قیمت', value: 'محاسبه نمی‌شود' }]} action="ادامه به استعلام واقعی غیرفعال است" />}</ProductExampleShell>;
}

const lifePlans = [
  { id: 'atabat', title: 'عتبات', description: 'معرفی طرح مشاهده‌شده، بدون محاسبه یا تعهد.', benefits: ['خلاصه عمومی مزایا', 'شرایط در محصول رسمی'] },
  { id: 'group-accident', title: 'عمر و حوادث گروهی', description: 'پوسته انتخاب برای زمینه سازمانی.', benefits: ['پوشش گروهی عمومی', 'نیازمند اطلاعات سازمان'] },
  { id: 'group-savings', title: 'عمر و پس‌انداز گروهی', description: 'نمایش ساختار مزایا و پیش‌نیازها.', benefits: ['پس‌انداز بلندمدت', 'شرایط گروهی'] },
];

export function LifeInsurance() {
  const [selected, setSelected] = useState(lifePlans[0]); const [review, setReview] = useState(false);
  return <ProductExampleShell serviceId="life-insurance"><Panel title="طرح‌های بیمه عمر" eyebrow="بدون داده سلامت یا محاسبه" icon="health"><div className="life-plan-grid">{lifePlans.map((plan) => <button type="button" className={selected.id === plan.id ? 'selected' : ''} onClick={() => { setSelected(plan); setReview(false); }} key={plan.id}><span><MResalatIcon name="health" size={23} /></span><h3>{plan.title}</h3><p>{plan.description}</p><ul>{plan.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul><span className="radio-mark" /></button>)}</div><div className="life-prerequisite"><MResalatIcon name="warning" size={20} /><div><strong>پیش‌نیاز مهم</strong><p>هرگونه اطلاعات سلامت، ذی‌نفع یا پرداخت فقط در فرایند رسمی و پس از توضیح روشن دریافت می‌شود.</p></div></div><button className="button button-primary" type="button" onClick={() => setReview(true)}>مرور طرح {selected.title}</button></Panel>{review && <SafeReview title="خلاصه طرح انتخابی" rows={[{ label: 'طرح', value: selected.title }, { label: 'مزایا', value: selected.benefits.join(' · ') }, { label: 'حق‌بیمه', value: 'محاسبه نشده' }, { label: 'داده سلامت', value: 'دریافت نشده' }]} action="ادامه به سلامت / پرداخت غیرفعال است" />}</ProductExampleShell>;
}

export const insuranceScreens: Record<string, React.ComponentType> = {
  'third-party': () => <VehicleInsuranceForm variant="third-party" />,
  comprehensive: () => <VehicleInsuranceForm variant="comprehensive" />,
  motorcycle: () => <VehicleInsuranceForm variant="motorcycle" />,
  life: LifeInsurance,
};
