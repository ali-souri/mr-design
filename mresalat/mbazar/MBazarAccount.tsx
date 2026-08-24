'use client';

/* eslint-disable @next/next/no-img-element */

import { useState, type FormEvent } from 'react';
import { useEffect } from 'react';
import { trackEvent } from '@/mresalat/core/analytics';
import { MResalatIcon, type MResalatIconName } from '@/mresalat/core/MResalatIcon';
import { MBazarProductCard, MBazarProductQuickView, MBazarShell } from './MBazarComponents';
import { useMBazarCart } from './cart-state';
import { formatMBazarPrice, productById } from './data';
import type { MBazarAddress, MBazarFavorite, MBazarReview } from './types';

const accountLinks = [
  { id: 'profile', label: 'ام‌بازار من', href: '/examples/mbazar/profile', icon: 'profile' as const },
  { id: 'orders', label: 'سفارش‌های من', href: '/examples/mbazar/orders', icon: 'orders' as const },
  { id: 'installments', label: 'درخواست‌های اقساطی', href: '/examples/mbazar/installments', icon: 'credit' as const },
  { id: 'favorites', label: 'علاقه‌مندی‌ها', href: '/examples/mbazar/favorites', icon: 'favorite' as const },
  { id: 'addresses', label: 'آدرس‌های من', href: '/examples/mbazar/addresses', icon: 'location' as const },
  { id: 'reviews', label: 'نظرات من', href: '/examples/mbazar/reviews', icon: 'messages' as const },
  { id: 'support', label: 'پشتیبانی', href: '/examples/mbazar/support', icon: 'support' as const },
] as const;

export type AccountSection = typeof accountLinks[number]['id'];
export function MBazarAccountNav({ active }: { active: AccountSection }) {
  return <nav className="mbazar-account-nav" aria-label="بخش‌های حساب ام‌بازار">{accountLinks.map((item) => <a href={item.href} className={active === item.id ? 'active' : ''} aria-current={active === item.id ? 'page' : undefined} key={item.id}><MResalatIcon name={item.icon} size={20} /><span>{item.label}</span><MResalatIcon name="next" size={16} /></a>)}</nav>;
}
export function MBazarAccountLayout({ active, children }: { active: AccountSection; children: React.ReactNode }) {
  return <main className="mbazar-purchase-page mbazar-account-layout"><aside><MBazarAccountNav active={active} /></aside><div className="mbazar-account-content">{children}</div></main>;
}

export function MBazarProfileGroup({ title, icon, items }: { title: string; icon: MResalatIconName; items: Array<{ label: string; detail: string; href: string; badge?: string }> }) {
  return <section className="mbazar-profile-group"><header><span><MResalatIcon name={icon} size={20} /></span><h2>{title}</h2></header>{items.map((item) => <a href={item.href} key={item.href}><span><strong>{item.label}</strong><small>{item.detail}</small></span>{item.badge && <b>{item.badge}</b>}<MResalatIcon name="next" size={16} /></a>)}</section>;
}

export function MBazarProfilePage() {
  const { orders, favorites, addresses, supportCases, resetDemo } = useMBazarCart();
  const active = orders.filter((order) => ['placed', 'seller-confirmed', 'preparing', 'shipped', 'issue'].includes(order.status)).length;
  const defaultAddress = addresses.find((address) => address.isDefault) ?? addresses[0];
  return <MBazarShell active="profile"><MBazarAccountLayout active="profile"><section className="mbazar-profile-summary"><div className="mbazar-avatar">م‌ر</div><div><small>حساب نمایشی ام‌بازار</small><h1>مهدی رضایی</h1><p><MResalatIcon name="location" size={16} />{defaultAddress ? `${defaultAddress.title} · ${defaultAddress.city}` : 'آدرس پیش‌فرض ثبت نشده'}</p></div><dl><div><dt>سفارش فعال</dt><dd>{active.toLocaleString('fa-IR')}</dd></div><div><dt>علاقه‌مندی</dt><dd>{favorites.length.toLocaleString('fa-IR')}</dd></div><div><dt>پشتیبانی باز</dt><dd>{supportCases.filter((item) => item.status !== 'resolved').length.toLocaleString('fa-IR')}</dd></div></dl></section><div className="mbazar-profile-groups"><MBazarProfileGroup title="خریدهای من" icon="orders" items={[{ label: 'سفارش‌های من', detail: 'وضعیت، پیگیری و خرید مجدد', href: '/examples/mbazar/orders', badge: active ? `${active.toLocaleString('fa-IR')} فعال` : undefined }, { label: 'درخواست‌های اقساطی', detail: 'بررسی وضعیت و اقدام بعدی', href: '/examples/mbazar/installments' }, { label: 'علاقه‌مندی‌ها', detail: 'کالاهای ذخیره‌شده و تغییر قیمت', href: '/examples/mbazar/favorites', badge: favorites.length.toLocaleString('fa-IR') }]} /><MBazarProfileGroup title="حساب و ارسال" icon="profile" items={[{ label: 'آدرس‌های من', detail: 'افزودن، ویرایش و انتخاب پیش‌فرض', href: '/examples/mbazar/addresses' }, { label: 'نظرات من', detail: 'منتظر نظر و نظرات ثبت‌شده', href: '/examples/mbazar/reviews' }, { label: 'تنظیمات ام‌بازار', detail: 'نمایش نمایشی تنظیمات حساب', href: '/examples/mbazar/profile#settings' }]} /><MBazarProfileGroup title="پشتیبانی" icon="support" items={[{ label: 'درخواست‌های پشتیبانی', detail: 'پیگیری درخواست‌ها و ایجاد مورد جدید', href: '/examples/mbazar/support', badge: supportCases.length.toLocaleString('fa-IR') }, { label: 'راهنمای ام‌بازار', detail: 'پاسخ‌های قطعی درباره مسیر خرید', href: '/examples/mbazar/support#guide' }]} /></div><section id="settings" className="mbazar-profile-footer"><button type="button" className="button button-ghost" onClick={resetDemo}>بازنشانی داده‌های نمایشی برای QA</button><button type="button" className="button button-ghost">خروج از حساب <small>نمایشی</small></button></section></MBazarAccountLayout></MBazarShell>;
}

export function MBazarFavoriteCard({ favorite, onQuickView }: { favorite: MBazarFavorite; onQuickView?: (productId: string) => void }) {
  const { toggleFavorite } = useMBazarCart();
  const product = productById(favorite.productId);
  const delta = product.price.current - favorite.savedPrice;
  return <article className="mbazar-favorite-state"><div className={`mbazar-favorite-change ${delta < 0 ? 'price-down' : delta > 0 ? 'price-up' : product.availability === 'unavailable' ? 'unavailable' : 'unchanged'}`}><MResalatIcon name={delta < 0 ? 'success' : delta > 0 ? 'warning' : product.availability === 'unavailable' ? 'error' : 'time'} size={16} /><span>{delta < 0 ? `قیمت ${formatMBazarPrice(Math.abs(delta))} تومان کاهش یافته` : delta > 0 ? `قیمت ${formatMBazarPrice(delta)} تومان افزایش یافته` : product.availability === 'unavailable' ? 'این کالا اکنون ناموجود است' : product.availability === 'limited' ? 'موجودی محدود است' : 'بدون تغییر قیمت'}</span></div><MBazarProductCard product={product} variant="grid" onQuickView={onQuickView ? () => onQuickView(product.id) : undefined} /><button className="mbazar-favorite-remove" type="button" onClick={() => toggleFavorite(product.id)}><MResalatIcon name="remove" size={16} />حذف از علاقه‌مندی‌ها</button></article>;
}

export function MBazarFavoritesPage({ unavailable = false }: { unavailable?: boolean }) {
  const { favorites, hydrated, toggleFavorite, resetDemo } = useMBazarCart();
  const [quickProductId, setQuickProductId] = useState<string>();
  if (!hydrated) return <MBazarShell active="profile"><main className="mbazar-purchase-page"><div className="mbazar-loading" role="status">در حال آماده‌سازی علاقه‌مندی‌ها…</div></main></MBazarShell>;
  if (unavailable) return <MBazarShell active="profile"><MBazarAccountLayout active="favorites"><section className="mbazar-account-error" role="alert"><MResalatIcon name="warning" size={32} /><h1>علاقه‌مندی‌ها در دسترس نیست</h1><p>داده نمایشی بارگیری نشد. دوباره تلاش کنید یا به محصولات برگردید.</p><button className="button button-secondary" onClick={() => location.reload()}>تلاش دوباره</button></section></MBazarAccountLayout></MBazarShell>;
  return <MBazarShell active="profile"><MBazarAccountLayout active="favorites"><header className="mbazar-account-head"><div><span>خریدهای من</span><h1>لیست علاقه‌مندی‌ها</h1><p>تغییر قیمت و موجودی نسبت به زمان ذخیره‌سازی به‌صورت قطعی مقایسه می‌شود.</p></div></header>{favorites.length ? <div className="mbazar-favorites-grid">{favorites.map((favorite) => { const product = productById(favorite.productId); const delta = product.price.current - favorite.savedPrice; return <article className="mbazar-favorite-state" key={favorite.productId}><div className={`mbazar-favorite-change ${delta < 0 ? 'price-down' : delta > 0 ? 'price-up' : product.availability === 'unavailable' ? 'unavailable' : 'unchanged'}`}><MResalatIcon name={delta < 0 ? 'success' : delta > 0 ? 'warning' : product.availability === 'unavailable' ? 'error' : 'time'} size={16} /><span>{delta < 0 ? `قیمت ${formatMBazarPrice(Math.abs(delta))} تومان کاهش یافته` : delta > 0 ? `قیمت ${formatMBazarPrice(delta)} تومان افزایش یافته` : product.availability === 'unavailable' ? 'این کالا اکنون ناموجود است' : product.availability === 'limited' ? 'موجودی محدود است' : 'بدون تغییر قیمت'}</span></div><MBazarProductCard product={product} variant="grid" onQuickView={() => setQuickProductId(product.id)} /><button className="mbazar-favorite-remove" type="button" onClick={() => toggleFavorite(product.id)}><MResalatIcon name="remove" size={16} />حذف از علاقه‌مندی‌ها</button></article>; })}</div> : <section className="mbazar-account-empty"><MResalatIcon name="favorite" size={32} /><h2>هنوز کالایی ذخیره نکرده‌اید</h2><p>با نشان قلب روی کارت کالا، آن را برای بعد نگه دارید.</p><a className="button button-primary" href="/examples/mbazar">مشاهده محصولات</a><button className="button button-ghost" onClick={resetDemo}>بازنشانی سناریوی QA</button></section>}<MBazarProductQuickView product={quickProductId ? productById(quickProductId) : undefined} onClose={() => setQuickProductId(undefined)} /></MBazarAccountLayout></MBazarShell>;
}

export function MBazarAddressCard({ address }: { address: MBazarAddress }) {
  const { addresses, deleteAddress, setDefaultAddress } = useMBazarCart();
  const canDelete = !address.isDefault && addresses.length > 1;
  return <article className={`mbazar-account-address ${address.isDefault ? 'is-default' : ''}`}><header><span><MResalatIcon name="location" size={20} /></span><div><h2>{address.title}</h2>{address.isDefault && <b>پیش‌فرض</b>}</div></header><p>{address.province}، {address.city}، {address.address}</p><dl><div><dt>گیرنده</dt><dd>{address.recipient}</dd></div><div><dt>تماس</dt><dd dir="ltr">{address.phone}</dd></div><div><dt>کدپستی</dt><dd>{address.postalCode}</dd></div></dl><footer>{!address.isDefault && <button type="button" onClick={() => setDefaultAddress(address.id)}>انتخاب به‌عنوان پیش‌فرض</button>}<a href={`/examples/mbazar/addresses/${address.id}/edit`}>ویرایش</a><button type="button" disabled={!canDelete} title={!canDelete ? 'ابتدا آدرس دیگری را پیش‌فرض کنید' : undefined} onClick={() => { if (confirm(`آدرس «${address.title}» حذف شود؟`)) deleteAddress(address.id); }}>حذف</button></footer></article>;
}

export function MBazarAddressesPage({ empty = false }: { empty?: boolean }) {
  const { addresses, resetDemo } = useMBazarCart();
  const shown = empty ? [] : addresses;
  return <MBazarShell active="profile"><MBazarAccountLayout active="addresses"><header className="mbazar-account-head"><div><span>حساب و ارسال</span><h1>آدرس‌های من</h1><p>همین آدرس‌ها در مرحله ارسال Checkout استفاده می‌شوند.</p></div><a className="button button-primary" href="/examples/mbazar/addresses/new"><MResalatIcon name="add" size={16} />افزودن آدرس</a></header>{shown.length ? <div className="mbazar-address-grid">{shown.map((address) => <MBazarAddressCard address={address} key={address.id} />)}</div> : <section className="mbazar-account-empty"><MResalatIcon name="location" size={32} /><h2>آدرسی ثبت نشده است</h2><p>برای ادامه خرید، یک آدرس تحویل اضافه کنید.</p><a className="button button-primary" href="/examples/mbazar/addresses/new">افزودن آدرس</a>{empty && <button className="button button-ghost" onClick={resetDemo}>بازنشانی سناریوی QA</button>}</section>}</MBazarAccountLayout></MBazarShell>;
}

export function MBazarAddressForm({ id, fail = false }: { id?: string; fail?: boolean }) {
  const { addresses, saveAddress } = useMBazarCart();
  const existing = addresses.find((address) => address.id === id);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [failed, setFailed] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const form = new FormData(event.currentTarget); const required = ['title', 'recipient', 'phone', 'province', 'city', 'address', 'postalCode']; const next: Record<string, string> = {};
    const digits = (value: FormDataEntryValue | null) => String(value ?? '').replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit))).replace(/\D/g, '');
    required.forEach((name) => { if (!String(form.get(name) ?? '').trim()) next[name] = 'این فیلد الزامی است.'; });
    if (digits(form.get('phone')).length < 10) next.phone = 'شماره تماس معتبر وارد کنید.';
    if (digits(form.get('postalCode')).length !== 10) next.postalCode = 'کدپستی باید ۱۰ رقم باشد.';
    setErrors(next); if (Object.keys(next).length) return; if (fail) { setFailed(true); return; }
    saveAddress({ id: existing?.id, title: String(form.get('title')), recipient: String(form.get('recipient')), phone: String(form.get('phone')), province: String(form.get('province')), city: String(form.get('city')), address: String(form.get('address')), postalCode: String(form.get('postalCode')), isDefault: form.get('isDefault') === 'on' }); location.assign('/examples/mbazar/addresses');
  };
  const field = (name: string, label: string, type = 'text', inputMode?: 'numeric' | 'tel') => <label><span>{label}</span><input name={name} type={type} inputMode={inputMode} defaultValue={existing?.[name as keyof MBazarAddress]?.toString() ?? ''} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} />{errors[name] && <small id={`${name}-error`} role="alert">{errors[name]}</small>}</label>;
  return <MBazarShell active="profile"><MBazarAccountLayout active="addresses"><header className="mbazar-account-head"><div><span>آدرس‌های من</span><h1>{existing ? 'ویرایش آدرس' : 'افزودن آدرس جدید'}</h1><p>انتخاب موقعیت روی نقشه در این نسخه لازم نیست.</p></div></header>{failed && <div className="mbazar-form-error" role="alert"><strong>ذخیره آدرس انجام نشد</strong><span>این یک وضعیت شکست نمایشی است؛ اطلاعات شما ارسال نشده.</span></div>}<form className="mbazar-address-form" onSubmit={submit} noValidate><div className="mbazar-form-grid">{field('title', 'عنوان آدرس')}{field('recipient', 'نام گیرنده')}{field('phone', 'شماره تماس', 'tel', 'tel')}{field('province', 'استان')}{field('city', 'شهر')}{field('postalCode', 'کدپستی', 'text', 'numeric')}<label className="wide"><span>آدرس</span><textarea name="address" defaultValue={existing?.address ?? ''} aria-invalid={Boolean(errors.address)} />{errors.address && <small role="alert">{errors.address}</small>}</label></div><label className="mbazar-checkbox"><input type="checkbox" name="isDefault" defaultChecked={existing?.isDefault} />این آدرس پیش‌فرض باشد</label><div className="mbazar-form-actions"><button className="button button-primary" type="submit">ذخیره آدرس</button><a className="button button-ghost" href="/examples/mbazar/addresses">انصراف</a></div></form></MBazarAccountLayout></MBazarShell>;
}

export function MBazarRatingInput({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return <fieldset className="mbazar-rating-input"><legend>امتیاز شما</legend><div role="radiogroup">{[1, 2, 3, 4, 5].map((rating) => <button type="button" role="radio" aria-checked={value === rating} aria-label={`${rating.toLocaleString('fa-IR')} ستاره از ۵`} className={rating <= value ? 'active' : ''} onClick={() => onChange(rating)} onKeyDown={(event) => { if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') onChange(Math.min(5, value + 1)); if (event.key === 'ArrowRight' || event.key === 'ArrowDown') onChange(Math.max(1, value - 1)); }} key={rating}>★</button>)}</div><output>{value ? `${value.toLocaleString('fa-IR')} از ۵` : 'امتیازی انتخاب نشده'}</output></fieldset>;
}

export function MBazarReviewCard({ review }: { review: MBazarReview }) {
  const product = productById(review.productId);
  return <article className="mbazar-review-card"><header><img src={product.image} alt="" /><div><a href={`/examples/mbazar/product/${product.id}`}>{product.title}</a><span aria-label={`${review.rating.toLocaleString('fa-IR')} ستاره از ۵`}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span></div><time>{review.createdAt}</time></header><p>{review.text}</p>{(review.pros || review.cons) && <dl>{review.pros && <div><dt>نکته مثبت</dt><dd>{review.pros}</dd></div>}{review.cons && <div><dt>قابل بهبود</dt><dd>{review.cons}</dd></div>}</dl>}</article>;
}

export function MBazarReviewsPage({ noPending = false }: { noPending?: boolean }) {
  const { orders, reviews } = useMBazarCart();
  const pending = noPending ? [] : orders.filter((order) => order.status === 'delivered').flatMap((order) => order.items.filter((item) => !(order.reviewedProductIds ?? []).includes(item.productId)).map((item) => ({ order, item })));
  return <MBazarShell active="profile"><MBazarAccountLayout active="reviews"><header className="mbazar-account-head"><div><span>حساب و ارسال</span><h1>نقد و نظرات</h1><p>فقط کالاهای سفارش‌های تحویل‌شده امکان ثبت نظر دارند.</p></div></header><section className="mbazar-review-section"><header><h2>منتظر نظر شما</h2><span>{pending.length.toLocaleString('fa-IR')} کالا</span></header>{pending.length ? <div className="mbazar-review-pending">{pending.map(({ order, item }) => <article key={`${order.id}-${item.id}`}><img src={item.image} alt="" /><div><strong>{item.title}</strong><small>سفارش {order.reference} · تحویل شده</small></div><a className="button button-primary" href={`/examples/mbazar/reviews/new?order=${order.id}&product=${item.productId}`}>ثبت نظر</a></article>)}</div> : <div className="mbazar-inline-empty"><MResalatIcon name="success" size={24} /><span><strong>نظر معوقی ندارید</strong><small>کالاهای تحویل‌شده آینده اینجا نمایش داده می‌شوند.</small></span></div>}</section><section className="mbazar-review-section"><header><h2>نظرات ثبت‌شده</h2><span>{reviews.length.toLocaleString('fa-IR')} نظر</span></header><div className="mbazar-review-list">{reviews.map((review) => <MBazarReviewCard review={review} key={review.id} />)}</div></section></MBazarAccountLayout></MBazarShell>;
}

export function MBazarReviewForm({ orderId, productId }: { orderId?: string; productId?: string }) {
  const { orders, submitReview } = useMBazarCart();
  const order = orders.find((item) => item.id === orderId);
  const item = order?.items.find((row) => row.productId === productId);
  const eligible = Boolean(order && order.status === 'delivered' && item && !(order.reviewedProductIds ?? []).includes(item.productId));
  const [rating, setRating] = useState(0); const [error, setError] = useState('');
  useEffect(() => { if (orderId && productId) trackEvent({ event: 'mbazar_review_started', surface: 'marketplace', entityId: productId, metadata: { orderId } }); }, [orderId, productId]);
  if (!eligible) return <MBazarShell active="profile"><MBazarAccountLayout active="reviews"><section className="mbazar-account-error"><MResalatIcon name="warning" size={32} /><h1>امکان ثبت نظر وجود ندارد</h1><p>نظر فقط برای کالای تحویل‌شده و هنوز بررسی‌نشده قابل ثبت است.</p><a className="button button-primary" href="/examples/mbazar/reviews">بازگشت به نظرات</a></section></MBazarAccountLayout></MBazarShell>;
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const form = new FormData(event.currentTarget); const text = String(form.get('text') ?? '').trim(); if (!rating || text.length < 8) { setError('امتیاز و حداقل ۸ نویسه متن نظر را وارد کنید.'); return; } submitReview({ orderId: order!.id, productId: item!.productId, rating, text, pros: String(form.get('pros') ?? ''), cons: String(form.get('cons') ?? '') }); location.assign('/examples/mbazar/reviews'); };
  return <MBazarShell active="profile"><MBazarAccountLayout active="reviews"><header className="mbazar-account-head"><div><span>نظر درباره خرید</span><h1>ثبت نظر</h1><p>محصول و سفارش از مسیر تحویل‌شده از قبل انتخاب شده‌اند.</p></div></header><form className="mbazar-review-form" onSubmit={submit}><article><img src={item!.image} alt={item!.imageAlt} /><div><strong>{item!.title}</strong><small>سفارش {order!.reference}</small></div></article><MBazarRatingInput value={rating} onChange={setRating} /><label><span>متن نظر</span><textarea name="text" rows={5} placeholder="تجربه واقعی خود را کوتاه و روشن بنویسید" /></label><div className="mbazar-form-grid"><label><span>نکات مثبت (اختیاری)</span><input name="pros" /></label><label><span>قابل بهبود (اختیاری)</span><input name="cons" /></label></div>{error && <p className="mbazar-field-error" role="alert">{error}</p>}<div className="mbazar-form-actions"><button className="button button-primary" type="submit">ثبت نظر</button><a className="button button-ghost" href="/examples/mbazar/reviews">انصراف</a></div></form></MBazarAccountLayout></MBazarShell>;
}
