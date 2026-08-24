'use client';

/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages */

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { AppShell } from '@/mresalat/core/AppShell';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { MResalatServiceIcon } from '@/mresalat/core/MResalatServiceIcon';
import { ThemeToggle } from '@/mresalat/core/ThemeController';
import { ecosystemServices } from '@/mresalat/domains/ecosystem';
import { discoveryPrompts, formatMBazarPrice, marketplaceContext, mbazarCategories, mbazarProducts, recentSearches } from './data';
import { useMBazarCart } from './cart-state';
import type { MBazarCategory, MBazarProduct, MBazarProductVariant, MarketplaceContextState } from './types';

const mbazarService = ecosystemServices.find((service) => service.id === 'mbazar')!;

function keepFocusInside(event: KeyboardEvent, container: HTMLElement) {
  const items = Array.from(container.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'));
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
}

export function MBazarShell({ children, active = 'home' }: { children: React.ReactNode; active?: 'home' | 'search' | 'categories' | 'cart' | 'profile' }) {
  return <MBazarShellFrame active={active}>{children}</MBazarShellFrame>;
}

function MBazarShellFrame({ children, active }: { children: React.ReactNode; active: 'home' | 'search' | 'categories' | 'cart' | 'profile' }) {
  const { cart } = useMBazarCart();
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const items = [
    { id: 'home', label: 'خانه', href: '/examples/mbazar', icon: 'home' as const },
    { id: 'search', label: 'جستجو', href: '/examples/mbazar/search', icon: 'search' as const },
    { id: 'cart', label: 'سبد خرید', href: '/examples/mbazar/cart', icon: 'cart' as const },
    { id: 'categories', label: 'دسته‌بندی', href: '/examples/mbazar/categories', icon: 'grid' as const },
    { id: 'profile', label: 'ام‌بازار من', href: '/examples/mbazar/installments', icon: 'profile' as const },
  ];
  return <AppShell active="examples" hideMobileNav><div className="mbazar-app"><header className="mbazar-service-header"><a href="/examples/mbazar" className="mbazar-identity"><MResalatServiceIcon service={mbazarService} size={48} /><span><strong>ام‌بازار</strong><small>بازار اکوسیستم ام‌رسالت</small></span></a><nav aria-label="ناوبری ام‌بازار">{items.slice(0, 2).map((item) => <a className={active === item.id ? 'active' : ''} href={item.href} key={item.id}>{item.label}</a>)}<a href="/examples/mbazar/categories" className={active === 'categories' ? 'active' : ''}>دسته‌بندی‌ها</a><a href="/examples/mbazar/cart" className={active === 'cart' ? 'active' : ''}>سبد خرید{itemCount > 0 && <b className="mbazar-header-badge">{itemCount.toLocaleString('fa-IR')}</b>}</a><a href="/examples/mbazar/installments">درخواست‌های اقساطی</a></nav><ThemeToggle /></header>{children}<nav className="mbazar-mobile-nav" aria-label="ناوبری ام‌بازار">{items.map((item) => <a key={item.id} href={item.href} className={active === item.id ? 'active' : ''} aria-current={active === item.id ? 'page' : undefined}><MResalatIcon name={item.icon} size={20} /><span>{item.label}</span>{item.id === 'cart' && itemCount > 0 && <i aria-label={`${itemCount.toLocaleString('fa-IR')} کالا در سبد خرید`}>{itemCount.toLocaleString('fa-IR')}</i>}</a>)}</nav></div></AppShell>;
}

export function MarketplaceContext({ value = marketplaceContext, compact = false }: { value?: MarketplaceContextState; compact?: boolean }) {
  return <section className={`marketplace-context ${compact ? 'is-compact' : ''}`} aria-label="زمینه خرید فعلی"><div className="marketplace-context-label"><span><MResalatIcon name="location" size={20} /></span><div><small>ارسال به</small><strong>{value.destination}</strong></div></div><button type="button">تغییر</button><span className="marketplace-context-divider" /><div className="marketplace-context-label"><span><MResalatIcon name="seller" size={20} /></span><div><small>فروشگاه</small><strong>{value.store}</strong></div></div><button type="button">تغییر</button></section>;
}

export function MBazarSearch({ initialQuery = '', variant = 'default', onSubmit }: { initialQuery?: string; variant?: 'default' | 'hero'; onSubmit?: (query: string) => void }) {
  const [query, setQuery] = useState(initialQuery);
  const submit = () => { const value = query.trim(); if (!value) return; if (onSubmit) onSubmit(value); else window.location.href = `/examples/mbazar/search?q=${encodeURIComponent(value)}`; };
  return <div className={`mbazar-search mbazar-search-${variant}`}><form onSubmit={(event) => { event.preventDefault(); submit(); }}><MResalatIcon name="search" size={24} /><label className="sr-only" htmlFor="mbazar-search-field">جستجو در ام‌بازار</label><input id="mbazar-search-field" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="نام کالا، دسته‌بندی یا نیازتان را بنویسید…" autoComplete="off" /><button type="button" className="mbazar-voice-button" aria-label="جستجوی صوتی نمایشی"><MResalatIcon name="voice" size={20} /></button><button type="submit" className="mbazar-search-button">جستجو</button></form>{variant === 'hero' && <div className="mbazar-prompt-row"><span>مثلاً:</span>{discoveryPrompts.slice(0, 2).map((prompt) => <button type="button" key={prompt} onClick={() => setQuery(prompt)}>{prompt}</button>)}</div>}</div>;
}

export function PurchaseModeBadge({ eligible }: { eligible?: boolean }) {
  if (!eligible) return null;
  return <span className="purchase-mode-badge"><MResalatIcon name="credit" size={16} />قابل درخواست اقساطی</span>;
}

export function PriceDisplay({ product, compact = false }: { product: MBazarProduct; compact?: boolean }) {
  return <div className={`mbazar-price ${compact ? 'is-compact' : ''}`}>{product.price.previous && <del>{formatMBazarPrice(product.price.previous)}</del>}<div><strong>{formatMBazarPrice(product.price.current)}</strong><span>تومان</span>{product.discountPercent && <b>{product.discountPercent.toLocaleString('fa-IR')}٪</b>}</div></div>;
}

export function MBazarCategoryCard({ category }: { category: MBazarCategory }) {
  return <a href={`/examples/mbazar/category/${category.slug}`} className={`mbazar-category-card tone-${category.tone}`}><span><MResalatIcon name={category.icon} size={32} /></span><div><strong>{category.title}</strong><small>{category.description}</small></div><MResalatIcon name="next" size={20} /></a>;
}

export function MBazarProductCard({ product, variant = 'grid', onQuickView }: { product: MBazarProduct; variant?: MBazarProductVariant; onQuickView?: (product: MBazarProduct) => void }) {
  const [favorite, setFavorite] = useState(false);
  const [comparing, setComparing] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useMBazarCart();
  const availability = product.availability === 'available' ? 'موجود' : product.availability === 'limited' ? 'موجودی محدود' : 'ناموجود';
  const add = () => { addItem(product.id); setAdded(true); window.setTimeout(() => setAdded(false), 1600); };
  return <article className={`mbazar-product-card variant-${variant}`}><div className="mbazar-product-media"><a href={`/examples/mbazar/product/${product.id}`}><img src={product.image} alt={product.imageAlt} loading="lazy" /></a>{product.discountPercent && <span className="mbazar-discount">{product.discountPercent.toLocaleString('fa-IR')}٪ تخفیف</span>}<button type="button" className={`mbazar-card-icon ${favorite ? 'active' : ''}`} aria-pressed={favorite} onClick={() => setFavorite(!favorite)} aria-label={`${favorite ? 'حذف' : 'افزودن'} ${product.title} ${favorite ? 'از' : 'به'} علاقه‌مندی‌ها`}><MResalatIcon name="favorite" size={20} /></button></div><div className="mbazar-product-content"><a href={`/examples/mbazar/product/${product.id}`} className="mbazar-product-title">{product.title}</a><PriceDisplay product={product} compact={variant === 'carousel'} /><PurchaseModeBadge eligible={product.installmentEligible} /><div className="mbazar-product-meta"><span className={`availability-${product.availability}`}>{availability}</span><span>{product.seller.name}</span>{variant !== 'carousel' && <button type="button" className={comparing ? 'active' : ''} aria-pressed={comparing} onClick={() => setComparing(!comparing)}><MResalatIcon name="evidence" size={16} />{comparing ? 'در مقایسه' : 'مقایسه'}</button>}</div><div className="mbazar-product-actions"><button type="button" className={`button button-primary ${added ? 'is-added' : ''}`} onClick={add} disabled={product.availability === 'unavailable'}><MResalatIcon name={added ? 'success' : 'cart'} size={16} />{added ? 'افزوده شد' : 'افزودن'}</button><a href={`/examples/mbazar/product/${product.id}`} className="button button-ghost">جزئیات</a>{onQuickView && <button type="button" className="button button-ghost mbazar-quick-icon" onClick={() => onQuickView(product)} aria-label={`نمایش سریع ${product.title}`}><MResalatIcon name="view" size={16} /></button>}</div></div></article>;
}

export function MBazarProductGrid({ products, variant = 'grid', onQuickView }: { products: MBazarProduct[]; variant?: MBazarProductVariant; onQuickView?: (product: MBazarProduct) => void }) {
  return <div className={`mbazar-product-grid variant-${variant}`}>{products.map((product) => <MBazarProductCard key={product.id} product={product} variant={variant} onQuickView={onQuickView} />)}</div>;
}

export function MBazarProductQuickView({ product, onClose }: { product?: MBazarProduct; onClose: () => void }) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const [added, setAdded] = useState(false);
  const { addItem } = useMBazarCart();
  useEffect(() => { if (!product) return; const previous = document.activeElement as HTMLElement | null; closeRef.current?.focus(); const listener = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); if (event.key === 'Tab' && dialogRef.current) keepFocusInside(event, dialogRef.current); }; document.addEventListener('keydown', listener); document.body.style.overflow = 'hidden'; return () => { document.removeEventListener('keydown', listener); document.body.style.overflow = ''; previous?.focus(); }; }, [product, onClose]);
  if (!product) return null;
  return <div className="mbazar-drawer-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section ref={dialogRef} className="mbazar-quick-view" role="dialog" aria-modal="true" aria-labelledby={titleId}><header><span className="drawer-handle" /><strong>نمایش سریع کالا</strong><button ref={closeRef} type="button" className="icon-button" onClick={onClose} aria-label="بستن نمایش سریع"><MResalatIcon name="close" size={20} /></button></header><div className="mbazar-quick-body"><img src={product.image} alt={product.imageAlt} /><div><h2 id={titleId}>{product.title}</h2><PriceDisplay product={product} /><PurchaseModeBadge eligible={product.installmentEligible} /><dl><div><dt>فروشگاه</dt><dd>{product.seller.name}</dd></div><div><dt>وضعیت</dt><dd>{product.availability === 'available' ? 'موجود' : 'موجودی محدود'}</dd></div>{product.colors && <div><dt>گزینه‌ها</dt><dd>{product.colors.join('، ')}</dd></div>}</dl><div className="mbazar-quick-actions"><button className={`button button-primary ${added ? 'is-added' : ''}`} type="button" onClick={() => { addItem(product.id); setAdded(true); }}><MResalatIcon name={added ? 'success' : 'cart'} size={16} />{added ? 'به سبد افزوده شد' : 'افزودن به سبد'}</button><a className="button button-ghost" href={`/examples/mbazar/product/${product.id}`}>مشاهده جزئیات</a></div></div></div></section></div>;
}

export function MBazarAssistant({ title, prompts }: { title: string; prompts: string[] }) {
  return <aside className="mbazar-assistant"><span><MResalatIcon name="assistant" size={20} /></span><div><strong>{title}</strong><small>راهنمای نمایشی ام‌بازار</small></div><div>{prompts.map((prompt) => <button type="button" key={prompt}>{prompt}</button>)}</div></aside>;
}

export function MarketplaceSectionHeader({ eyebrow, title, href, linkLabel = 'مشاهده همه' }: { eyebrow?: string; title: string; href?: string; linkLabel?: string }) {
  return <header className="marketplace-section-header"><div>{eyebrow && <span>{eyebrow}</span>}<h2>{title}</h2></div>{href && <a href={href}>{linkLabel}<MResalatIcon name="next" size={16} /></a>}</header>;
}

export function MBazarHome() {
  const [quickProduct, setQuickProduct] = useState<MBazarProduct>();
  const featured = useMemo(() => mbazarProducts.slice(0, 4), []);
  return <MBazarShell active="home"><MarketplaceContext /><section className="mbazar-home-hero"><div className="mbazar-home-copy"><span className="mbazar-kicker">کشف ساده‌تر در ام‌بازار</span><h1>از نیازتان شروع کنید، نه از میان انبوه کالاها</h1><p>کالا، دسته‌بندی یا چیزی که برایش راه‌حل می‌خواهید را بنویسید؛ این نمونه بدون اتصال به موتور جستجوی واقعی کار می‌کند.</p><MBazarSearch variant="hero" /></div><aside className="mbazar-home-side"><strong>ادامه جستجو</strong>{recentSearches.map((query) => <a href={`/examples/mbazar/search?q=${encodeURIComponent(query)}`} key={query}><MResalatIcon name="time" size={16} />{query}<MResalatIcon name="next" size={16} /></a>)}<a className="mbazar-home-installment" href="/examples/mbazar/search?installment=1"><MResalatIcon name="credit" size={24} /><span><strong>خرید اقساطی</strong><small>کالاهای قابل درخواست را ببینید</small></span></a></aside></section><section className="mbazar-section"><MarketplaceSectionHeader eyebrow="میان‌برهای خرید" title="دسته‌های پرکاربرد" href="/examples/mbazar/categories" /><div className="mbazar-category-row">{mbazarCategories.slice(0, 4).map((category) => <MBazarCategoryCard category={category} key={category.id} />)}</div></section><section className="mbazar-campaign"><div><span>پیشنهاد این هفته</span><h2>انتخاب‌های مناسب کار و یادگیری</h2><p>مجموعه‌ای از کالاهای دیجیتال و آموزشی با امکان مقایسه سریع.</p><a className="button button-primary" href="/examples/mbazar/category/digital">مشاهده مجموعه</a></div><div className="campaign-orbit"><MResalatIcon name="product" size={32} /><i /><i /></div></section><section className="mbazar-section"><MarketplaceSectionHeader eyebrow="پیشنهاد برای شروع" title="کالاهای منتخب" href="/examples/mbazar/search?q=منتخب" /><MBazarProductGrid products={featured} variant="carousel" onQuickView={setQuickProduct} /></section><section className="mbazar-section"><MarketplaceSectionHeader title="پیشنهادهای متناسب با نیازهای روزمره" /><MBazarProductGrid products={mbazarProducts.slice(3)} variant="recommendation" onQuickView={setQuickProduct} /></section><MBazarAssistant title="برای پیدا کردن کالای مناسب کمک می‌خواهید؟" prompts={discoveryPrompts} /><MBazarProductQuickView product={quickProduct} onClose={() => setQuickProduct(undefined)} /></MBazarShell>;
}

type SortValue = 'recommended' | 'price-low' | 'price-high' | 'discount';

export function MBazarSortControl({ value, onChange }: { value: SortValue; onChange: (value: SortValue) => void }) {
  return <label className="mbazar-sort-control"><MResalatIcon name="sort" size={16} /><span>مرتب‌سازی</span><select value={value} onChange={(event) => onChange(event.target.value as SortValue)}><option value="recommended">پیشنهادی</option><option value="price-low">کمترین قیمت</option><option value="price-high">بیشترین قیمت</option><option value="discount">بیشترین تخفیف</option></select></label>;
}

export function MBazarFilterBar({ installmentOnly, availableOnly, onInstallmentChange, onAvailableChange, onOpenDrawer, resultCount }: { installmentOnly: boolean; availableOnly: boolean; onInstallmentChange: (value: boolean) => void; onAvailableChange: (value: boolean) => void; onOpenDrawer: () => void; resultCount: number }) {
  return <div className="mbazar-filter-bar"><span>{resultCount.toLocaleString('fa-IR')} کالا</span><button type="button" className={installmentOnly ? 'active' : ''} aria-pressed={installmentOnly} onClick={() => onInstallmentChange(!installmentOnly)}><MResalatIcon name="credit" size={16} />قابل درخواست اقساطی</button><button type="button" className={availableOnly ? 'active' : ''} aria-pressed={availableOnly} onClick={() => onAvailableChange(!availableOnly)}>فقط کالاهای موجود</button><button type="button" className="mbazar-filter-more" onClick={onOpenDrawer}><MResalatIcon name="filters" size={16} />همه فیلترها</button></div>;
}

export function MBazarFilterDrawer({ open, installmentOnly, availableOnly, maxPrice, onApply, onClose }: { open: boolean; installmentOnly: boolean; availableOnly: boolean; maxPrice?: number; onApply: (filters: { installmentOnly: boolean; availableOnly: boolean; maxPrice?: number }) => void; onClose: () => void }) {
  const [installment, setInstallment] = useState(installmentOnly);
  const [available, setAvailable] = useState(availableOnly);
  const [price, setPrice] = useState(maxPrice?.toString() ?? '');
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (!open) return; const previous = document.activeElement as HTMLElement | null; closeRef.current?.focus(); const listener = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); const dialog = closeRef.current?.closest('section'); if (event.key === 'Tab' && dialog) keepFocusInside(event, dialog); }; document.addEventListener('keydown', listener); document.body.style.overflow = 'hidden'; return () => { document.removeEventListener('keydown', listener); document.body.style.overflow = ''; previous?.focus(); }; }, [open, onClose]);
  if (!open) return null;
  return <div className="mbazar-drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="mbazar-filter-drawer" role="dialog" aria-modal="true" aria-labelledby={titleId}><header><div><span className="drawer-handle" /><h2 id={titleId}>فیلتر کالاها</h2><small>فیلترها روی داده‌های نمایشی اعمال می‌شوند.</small></div><button ref={closeRef} type="button" className="icon-button" onClick={onClose} aria-label="بستن فیلترها"><MResalatIcon name="close" size={20} /></button></header><div className="mbazar-filter-options"><label><input type="checkbox" checked={installment} onChange={(event) => setInstallment(event.target.checked)} /><span><strong>قابل درخواست اقساطی</strong><small>نمایش کالاهایی که امکان بررسی شرایط دارند</small></span></label><label><input type="checkbox" checked={available} onChange={(event) => setAvailable(event.target.checked)} /><span><strong>فقط کالاهای موجود</strong><small>حذف موارد ناموجود از نتیجه</small></span></label><label className="price-filter"><span><strong>حداکثر قیمت</strong><small>تومان</small></span><input type="number" inputMode="numeric" value={price} onChange={(event) => setPrice(event.target.value)} placeholder="مثلاً ۵۰۰۰۰۰۰۰" /></label></div><footer><button type="button" className="button button-ghost" onClick={() => { setInstallment(false); setAvailable(false); setPrice(''); }}>پاک کردن</button><button type="button" className="button button-primary" onClick={() => onApply({ installmentOnly: installment, availableOnly: available, maxPrice: price ? Number(price) : undefined })}>اعمال فیلترها</button></footer></section></div>;
}

function applyFilters(products: MBazarProduct[], state: { installmentOnly: boolean; availableOnly: boolean; maxPrice?: number }, sort: SortValue) {
  const filtered = products.filter((product) => (!state.installmentOnly || product.installmentEligible) && (!state.availableOnly || product.availability !== 'unavailable') && (!state.maxPrice || product.price.current <= state.maxPrice));
  return [...filtered].sort((a, b) => sort === 'price-low' ? a.price.current - b.price.current : sort === 'price-high' ? b.price.current - a.price.current : sort === 'discount' ? (b.discountPercent ?? 0) - (a.discountPercent ?? 0) : Number(b.installmentEligible) - Number(a.installmentEligible));
}

export function MBazarSearchPage({ initialQuery = '', initialInstallment = false, initialAvailable = false, initialMaxPrice }: { initialQuery?: string; initialInstallment?: boolean; initialAvailable?: boolean; initialMaxPrice?: number }) {
  const [draft, setDraft] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const [installmentOnly, setInstallmentOnly] = useState(initialInstallment);
  const [availableOnly, setAvailableOnly] = useState(initialAvailable);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(initialMaxPrice);
  const [sort, setSort] = useState<SortValue>('recommended');
  const [drawer, setDrawer] = useState(false);
  const [quickProduct, setQuickProduct] = useState<MBazarProduct>();
  const normalized = query.trim().toLowerCase();
  const baseResults = useMemo(() => normalized ? mbazarProducts.filter((product) => `${product.title} ${product.seller.name} ${product.description ?? ''}`.toLowerCase().includes(normalized) || (normalized.includes('لپ') && product.categoryId === 'digital') || normalized.includes('منتخب')) : mbazarProducts, [normalized]);
  const products = useMemo(() => applyFilters(baseResults, { installmentOnly, availableOnly, maxPrice }, sort), [baseResults, installmentOnly, availableOnly, maxPrice, sort]);
  const suggesting = !query && Boolean(draft.trim());
  const submit = (value: string) => { const next = value.trim(); if (!next) return; setQuery(next); setDraft(next); const params = new URLSearchParams(); params.set('q', next); if (installmentOnly) params.set('installment', '1'); window.history.replaceState(null, '', `/examples/mbazar/search?${params.toString()}`); };
  const updateFilters = (next: { installmentOnly: boolean; availableOnly: boolean; maxPrice?: number }) => { setInstallmentOnly(next.installmentOnly); setAvailableOnly(next.availableOnly); setMaxPrice(next.maxPrice); setDrawer(false); const params = new URLSearchParams(); if (query) params.set('q', query); if (next.installmentOnly) params.set('installment', '1'); if (next.availableOnly) params.set('available', '1'); if (next.maxPrice) params.set('max', String(next.maxPrice)); window.history.replaceState(null, '', `/examples/mbazar/search${params.size ? `?${params.toString()}` : ''}`); };
  return <MBazarShell active="search"><MarketplaceContext compact /><main className="mbazar-search-page"><header className="mbazar-page-header"><div><span>جستجو و کشف</span><h1>در ام‌بازار چه می‌خواهید؟</h1></div></header><div className="mbazar-search mbazar-search-pagebox"><form onSubmit={(event) => { event.preventDefault(); submit(draft); }}><MResalatIcon name="search" size={24} /><label className="sr-only" htmlFor="mbazar-page-search">جستجو در ام‌بازار</label><input id="mbazar-page-search" value={draft} onChange={(event) => { setDraft(event.target.value); if (query) setQuery(''); }} placeholder="نام کالا، فروشگاه یا نیازتان…" autoFocus /><button type="button" className="mbazar-voice-button" aria-label="جستجوی صوتی نمایشی"><MResalatIcon name="voice" size={20} /></button><button type="submit" className="mbazar-search-button">جستجو</button></form></div>{suggesting ? <SearchSuggestions query={draft} onSelect={submit} /> : query ? <><div className="mbazar-results-head"><div><span>نتیجه برای</span><h2>«{query}»</h2></div><MBazarSortControl value={sort} onChange={setSort} /></div><MBazarFilterBar resultCount={products.length} installmentOnly={installmentOnly} availableOnly={availableOnly} onInstallmentChange={(value) => updateFilters({ installmentOnly: value, availableOnly, maxPrice })} onAvailableChange={(value) => updateFilters({ installmentOnly, availableOnly: value, maxPrice })} onOpenDrawer={() => setDrawer(true)} /><ActiveFilters query={query} installmentOnly={installmentOnly} availableOnly={availableOnly} maxPrice={maxPrice} onClear={(key) => key === 'installment' ? updateFilters({ installmentOnly: false, availableOnly, maxPrice }) : key === 'available' ? updateFilters({ installmentOnly, availableOnly: false, maxPrice }) : updateFilters({ installmentOnly, availableOnly, maxPrice: undefined })} />{products.length ? <MBazarProductGrid products={products} variant="grid" onQuickView={setQuickProduct} /> : <EmptyResults onReset={() => updateFilters({ installmentOnly: false, availableOnly: false })} />}<MBazarAssistant title="نتایج را دقیق‌تر کن" prompts={['فقط کالاهای قابل درخواست اقساطی را نشان بده', 'گزینه‌های ارزان‌تر را اول نشان بده']} /></> : <SearchEmptyState onSelect={submit} />}</main><MBazarFilterDrawer open={drawer} installmentOnly={installmentOnly} availableOnly={availableOnly} maxPrice={maxPrice} onApply={updateFilters} onClose={() => setDrawer(false)} /><MBazarProductQuickView product={quickProduct} onClose={() => setQuickProduct(undefined)} /></MBazarShell>;
}

function SearchEmptyState({ onSelect }: { onSelect: (query: string) => void }) {
  return <div className="mbazar-search-empty"><section><MarketplaceSectionHeader eyebrow="جستجوهای اخیر" title="ادامه مسیر قبلی" /><div className="mbazar-recent-list">{recentSearches.map((query) => <button type="button" key={query} onClick={() => onSelect(query)}><MResalatIcon name="time" size={16} />{query}<MResalatIcon name="next" size={16} /></button>)}</div></section><section><MarketplaceSectionHeader eyebrow="پیشنهاد ام‌بازار" title="با نیازتان جستجو کنید" /><div className="mbazar-discovery-prompts">{discoveryPrompts.map((prompt) => <button type="button" key={prompt} onClick={() => onSelect(prompt)}><MResalatIcon name="assistant" size={20} /><span>{prompt}</span></button>)}</div></section><section className="mbazar-popular-cats"><MarketplaceSectionHeader title="دسته‌های پرطرفدار" href="/examples/mbazar/categories" /> <div className="mbazar-category-row">{mbazarCategories.slice(0, 4).map((category) => <MBazarCategoryCard category={category} key={category.id} />)}</div></section></div>;
}

function SearchSuggestions({ query, onSelect }: { query: string; onSelect: (query: string) => void }) {
  const matchingProducts = mbazarProducts.filter((product) => product.title.includes(query) || product.title.includes(query.slice(0, 2))).slice(0, 3);
  return <div className="mbazar-suggestions" aria-live="polite"><section><h2>پیشنهاد جستجو</h2>{[query, `${query} اقساطی`, `${query} تا ۵۰ میلیون`].map((item) => <button type="button" key={item} onClick={() => onSelect(item)}><MResalatIcon name="search" size={16} /><span>{item}</span><small>عبارت جستجو</small></button>)}</section><section><h2>دسته‌بندی‌ها</h2>{mbazarCategories.filter((category) => category.title.includes(query) || category.description.includes(query)).slice(0, 3).map((category) => <a key={category.id} href={`/examples/mbazar/category/${category.slug}`}><MResalatIcon name={category.icon} size={20} /><span>{category.title}</span><MResalatIcon name="next" size={16} /></a>)}</section>{matchingProducts.length > 0 && <section><h2>کالاها</h2>{matchingProducts.map((product) => <a key={product.id} href={`/examples/mbazar/product/${product.id}`}><img src={product.image} alt="" /><span>{product.title}</span><small>{formatMBazarPrice(product.price.current)} تومان</small></a>)}</section>}</div>;
}

function ActiveFilters({ query, installmentOnly, availableOnly, maxPrice, onClear }: { query?: string; installmentOnly: boolean; availableOnly: boolean; maxPrice?: number; onClear: (key: string) => void }) {
  return <div className="mbazar-active-filters" aria-label="فیلترهای فعال">{query && <span>جستجو: {query}</span>}{installmentOnly && <button type="button" onClick={() => onClear('installment')}>اقساطی<MResalatIcon name="close" size={16} /></button>}{availableOnly && <button type="button" onClick={() => onClear('available')}>موجود<MResalatIcon name="close" size={16} /></button>}{maxPrice && <button type="button" onClick={() => onClear('price')}>تا {formatMBazarPrice(maxPrice)} تومان<MResalatIcon name="close" size={16} /></button>}</div>;
}

function EmptyResults({ onReset }: { onReset: () => void }) {
  return <div className="mbazar-empty-results"><span><MResalatIcon name="search" size={32} /></span><h2>نتیجه‌ای با این فیلترها پیدا نشد</h2><p>فیلترها را پاک کنید یا عبارت دیگری بنویسید.</p><button type="button" className="button button-primary" onClick={onReset}>پاک کردن فیلترها</button></div>;
}

export function MBazarCategoriesPage() {
  return <MBazarShell active="categories"><MarketplaceContext compact /><main><header className="mbazar-page-header"><div><span>مرور دسته‌ها</span><h1>دسته‌بندی کالاهای ام‌بازار</h1><p>از یک دسته شروع کنید و با فیلترهای ساده به کالای مناسب برسید.</p></div><MBazarSearch /></header><section className="mbazar-section mbazar-categories-page"><MarketplaceSectionHeader eyebrow="همه گروه‌ها" title="چه چیزی نیاز دارید؟" /><div className="mbazar-category-grid">{mbazarCategories.map((category) => <MBazarCategoryCard category={category} key={category.id} />)}</div></section><section className="mbazar-category-feature"><div><MResalatIcon name="credit" size={24} /><span><strong>کالاهای قابل درخواست اقساطی</strong><small>امکان بررسی شرایط در صفحه کالا مشخص شده است.</small></span></div><a className="button button-secondary" href="/examples/mbazar/search?installment=1">مشاهده کالاها</a></section><MBazarAssistant title="برای انتخاب دسته مناسب کمک می‌خواهید؟" prompts={['برای شروع مدرسه چه چیزهایی لازم است؟', 'تجهیزات مناسب دورکاری']} /></main></MBazarShell>;
}

export function MBazarCategoryPage({ slug, initialInstallment = false, initialAvailable = false, initialMaxPrice }: { slug: string; initialInstallment?: boolean; initialAvailable?: boolean; initialMaxPrice?: number }) {
  const category = mbazarCategories.find((item) => item.slug === slug || item.id === slug) ?? mbazarCategories[0];
  const categoryProducts = mbazarProducts.filter((product) => product.categoryId === category.id);
  const source = categoryProducts.length ? categoryProducts : mbazarProducts;
  const [installmentOnly, setInstallmentOnly] = useState(initialInstallment);
  const [availableOnly, setAvailableOnly] = useState(initialAvailable);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(initialMaxPrice);
  const [sort, setSort] = useState<SortValue>('recommended');
  const [drawer, setDrawer] = useState(false);
  const [quickProduct, setQuickProduct] = useState<MBazarProduct>();
  const products = useMemo(() => applyFilters(source, { installmentOnly, availableOnly, maxPrice }, sort), [source, installmentOnly, availableOnly, maxPrice, sort]);
  const apply = (next: { installmentOnly: boolean; availableOnly: boolean; maxPrice?: number }) => { setInstallmentOnly(next.installmentOnly); setAvailableOnly(next.availableOnly); setMaxPrice(next.maxPrice); setDrawer(false); const params = new URLSearchParams(); if (next.installmentOnly) params.set('installment', '1'); if (next.availableOnly) params.set('available', '1'); if (next.maxPrice) params.set('max', String(next.maxPrice)); window.history.replaceState(null, '', `/examples/mbazar/category/${category.slug}${params.size ? `?${params}` : ''}`); };
  return <MBazarShell active="categories"><MarketplaceContext compact /><main><nav className="mbazar-breadcrumbs" aria-label="مسیر صفحه"><a href="/examples/mbazar">ام‌بازار</a><MResalatIcon name="next" size={16} /><a href="/examples/mbazar/categories">دسته‌بندی‌ها</a><MResalatIcon name="next" size={16} /><span>{category.title}</span></nav><header className={`mbazar-category-hero tone-${category.tone}`}><span><MResalatIcon name={category.icon} size={32} /></span><div><small>دسته‌بندی ام‌بازار</small><h1>{category.title}</h1><p>{category.description}</p></div><MBazarSearch /></header><div className="mbazar-results-head"><div><span>کالاهای این دسته</span><h2>{products.length.toLocaleString('fa-IR')} نتیجه نمایشی</h2></div><MBazarSortControl value={sort} onChange={setSort} /></div><MBazarFilterBar resultCount={products.length} installmentOnly={installmentOnly} availableOnly={availableOnly} onInstallmentChange={(value) => apply({ installmentOnly: value, availableOnly, maxPrice })} onAvailableChange={(value) => apply({ installmentOnly, availableOnly: value, maxPrice })} onOpenDrawer={() => setDrawer(true)} /><ActiveFilters installmentOnly={installmentOnly} availableOnly={availableOnly} maxPrice={maxPrice} onClear={(key) => key === 'installment' ? apply({ installmentOnly: false, availableOnly, maxPrice }) : key === 'available' ? apply({ installmentOnly, availableOnly: false, maxPrice }) : apply({ installmentOnly, availableOnly })} />{products.length ? <MBazarProductGrid products={products} variant="grid" onQuickView={setQuickProduct} /> : <EmptyResults onReset={() => apply({ installmentOnly: false, availableOnly: false })} />}<MBazarAssistant title="در این دسته چه چیزی برایتان مهم‌تر است؟" prompts={['مناسب خرید اقساطی', 'بهترین گزینه برای کار روزمره']} /></main><MBazarFilterDrawer open={drawer} installmentOnly={installmentOnly} availableOnly={availableOnly} maxPrice={maxPrice} onApply={apply} onClose={() => setDrawer(false)} /><MBazarProductQuickView product={quickProduct} onClose={() => setQuickProduct(undefined)} /></MBazarShell>;
}

export function MBazarProductPage({ product }: { product: MBazarProduct }) {
  const [purchaseMode, setPurchaseMode] = useState<'cash' | 'installment'>('cash');
  const [quickProduct, setQuickProduct] = useState<MBazarProduct>();
  const [added, setAdded] = useState(false);
  const { addItem } = useMBazarCart();
  const related = mbazarProducts.filter((item) => item.id !== product.id).slice(0, 4);
  return <MBazarShell><MarketplaceContext compact /><main><nav className="mbazar-breadcrumbs" aria-label="مسیر صفحه"><button type="button" onClick={() => history.length > 1 ? history.back() : location.assign('/examples/mbazar') }><MResalatIcon name="previous" size={16} />بازگشت</button><span>جزئیات کالا</span></nav><article className="mbazar-product-detail"><section className="mbazar-product-gallery"><img src={product.image} alt={product.imageAlt} /><div>{[product.image, product.image, product.image].map((image, index) => <button type="button" key={index} aria-label={`تصویر ${index + 1} از ${product.title}`} className={index === 0 ? 'active' : ''}><img src={image} alt="" /></button>)}</div></section><section className="mbazar-product-summary"><div className="mbazar-product-summary-head"><span>کالای ام‌بازار</span><div><button type="button" aria-label="افزودن کالا به علاقه‌مندی‌ها"><MResalatIcon name="favorite" size={20} /></button><button type="button" aria-label="اشتراک‌گذاری کالا"><MResalatIcon name="share" size={20} /></button></div></div><h1>{product.title}</h1><div className="mbazar-product-byline"><span>فروشگاه: <strong>{product.seller.name}</strong></span>{product.rating && <span>امتیاز نمایشی <b>{product.rating.toLocaleString('fa-IR')}</b> از ۵</span>}</div><div className="mbazar-detail-price"><PriceDisplay product={product} /><span className={`detail-stock availability-${product.availability}`}>{product.availability === 'available' ? 'موجود و آماده سفارش' : 'موجودی محدود'}</span></div><section className="mbazar-purchase-mode"><header><h2>شیوه خرید</h2><small>انتخاب نهایی در پرداخت انجام می‌شود.</small></header><div role="radiogroup" aria-label="شیوه خرید"><button type="button" role="radio" aria-checked={purchaseMode === 'cash'} className={purchaseMode === 'cash' ? 'active' : ''} onClick={() => setPurchaseMode('cash')}><MResalatIcon name="card" size={20} /><span><strong>نقدی</strong><small>قیمت نمایش‌داده‌شده کالا</small></span></button><button type="button" role="radio" disabled={!product.installmentEligible} aria-checked={purchaseMode === 'installment'} className={purchaseMode === 'installment' ? 'active' : ''} onClick={() => setPurchaseMode('installment')}><MResalatIcon name="credit" size={20} /><span><strong>اقساطی</strong><small>{product.installmentEligible ? 'قابل بررسی شرایط خرید' : 'برای این کالا ارائه نشده'}</small></span></button></div>{purchaseMode === 'installment' && <div className="mbazar-installment-note"><PurchaseModeBadge eligible /><p>این برچسب امکان ثبت درخواست بررسی شرایط را نشان می‌دهد و به‌معنی تأیید نهایی نیست.</p><button type="button" className="button button-secondary" onClick={() => { addItem(product.id); location.assign('/examples/mbazar/checkout?step=payment'); }}>افزودن و ادامه خرید اقساطی</button></div>}</section><MarketplaceContext compact /><button type="button" className={`button button-primary button-block ${added ? 'is-added' : ''}`} onClick={() => { addItem(product.id); setAdded(true); }}><MResalatIcon name={added ? 'success' : 'cart'} size={20} />{added ? 'به سبد خرید افزوده شد' : 'افزودن به سبد خرید'}</button></section></article><div className="mbazar-product-info-layout"><section className="mbazar-product-info"><h2>معرفی کالا</h2><p>{product.description}</p><h2>مشخصات</h2><dl>{product.specifications?.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl><h2>اطلاعات فروشگاه</h2><div className="mbazar-seller-panel"><span><MResalatIcon name="seller" size={24} /></span><div><strong>{product.seller.name}</strong><small>عرضه‌کننده این کالای نمایشی در ام‌بازار</small></div></div></section><MBazarAssistant title="درباره این کالا یا شرایط خریدش سؤال دارید؟" prompts={['مشخصات این کالا', 'وضعیت موجودی', 'فروشنده', 'خرید اقساطی']} /></div><section className="mbazar-section"><MarketplaceSectionHeader eyebrow="برای مقایسه" title="کالاهای مشابه" /><MBazarProductGrid products={related} variant="carousel" onQuickView={setQuickProduct} /></section></main><MBazarProductQuickView product={quickProduct} onClose={() => setQuickProduct(undefined)} /></MBazarShell>;
}
