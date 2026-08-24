'use client';

/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages */

import { useEffect, useMemo, useState } from 'react';
import { HumanHandoff } from '@/mresalat/ai/StructuredAnswer';
import { trackEvent } from '@/mresalat/core/analytics';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { MBazarAccountLayout } from './MBazarAccount';
import { MBazarAssistant, MBazarShell } from './MBazarComponents';
import { useMBazarCart } from './cart-state';
import { formatMBazarPrice } from './data';
import type { MBazarOrder, MBazarOrderSellerGroup, MBazarOrderStatus, MBazarTrackingMilestone } from './types';

const statusCopy: Record<MBazarOrderStatus, { label: string; detail: string; tone: string }> = {
  placed: { label: 'سفارش ثبت شده', detail: 'سفارش برای فروشنده ارسال شده است.', tone: 'info' },
  'seller-confirmed': { label: 'فروشنده سفارش را تأیید کرده', detail: 'آماده‌سازی سفارش به‌زودی شروع می‌شود.', tone: 'info' },
  preparing: { label: 'در حال آماده‌سازی', detail: 'حداقل یک بسته در حال آماده شدن است.', tone: 'warning' },
  shipped: { label: 'ارسال شده', detail: 'مرسوله در مسیر تحویل است.', tone: 'info' },
  delivered: { label: 'تحویل شده', detail: 'همه بسته‌های این سفارش تحویل شده‌اند.', tone: 'success' },
  cancelled: { label: 'لغو شده', detail: 'این سفارش دیگر در حال انجام نیست.', tone: 'neutral' },
  issue: { label: 'نیازمند بررسی', detail: 'یک مورد در تحویل باید توسط پشتیبانی بررسی شود.', tone: 'danger' },
};

export function MBazarOrderStatus({ status, prominent = false }: { status: MBazarOrderStatus; prominent?: boolean }) {
  const copy = statusCopy[status];
  return <div className={`mbazar-order-status tone-${copy.tone} ${prominent ? 'is-prominent' : ''}`} role="status"><span><MResalatIcon name={status === 'delivered' ? 'success' : status === 'issue' ? 'warning' : status === 'cancelled' ? 'error' : 'product'} size={prominent ? 24 : 16} /></span><div><small>وضعیت فعلی</small><strong>{copy.label}</strong>{prominent && <p>{copy.detail}</p>}</div></div>;
}

export function MBazarOrderProgress({ milestones, label = 'پیشرفت مرسوله' }: { milestones: MBazarTrackingMilestone[]; label?: string }) {
  return <ol className="mbazar-order-progress" aria-label={label}>{milestones.map((step) => <li className={step.status} aria-current={step.status === 'current' ? 'step' : undefined} key={step.id}><span aria-hidden="true">{step.status === 'completed' ? <MResalatIcon name="success" size={16} /> : ''}</span><div><strong>{step.title}</strong>{step.detail && <small>{step.detail}</small>}</div></li>)}</ol>;
}

export function MBazarFulfillmentGroup({ group, order }: { group: MBazarOrderSellerGroup; order: MBazarOrder }) {
  const items = order.items.filter((item) => group.itemIds.includes(item.id));
  return <article className={`mbazar-order-group status-${group.status}`}><header><div><span><MResalatIcon name="seller" size={20} /></span><div><a href={`/examples/mbazar/seller/${group.seller.id}`}>{group.seller.name}</a><small>مرسوله مستقل · {items.length.toLocaleString('fa-IR')} کالا</small></div></div><strong>{group.statusLabel}</strong></header>{group.status !== 'delivered' && group.status !== 'failed' && <MBazarOrderProgress milestones={group.milestones} label={`پیشرفت مرسوله ${group.seller.name}`} />}<div className="mbazar-order-products">{items.map((item) => <a href={`/examples/mbazar/product/${item.productId}`} key={item.id}><img src={item.image} alt="" /><span><strong>{item.title}</strong><small>{item.quantity.toLocaleString('fa-IR')} عدد · {formatMBazarPrice(item.unitPrice)} تومان</small></span></a>)}</div><footer><span>مرحله بعد</span><strong>{group.nextStep}</strong></footer></article>;
}

export function MBazarOrderCard({ order }: { order: MBazarOrder }) {
  const copy = statusCopy[order.status];
  return <article className={`mbazar-order-card status-${order.status}`}><header><div><small>سفارش {order.reference}</small><time>{order.createdAt}</time></div>{order.isNew && <span className="mbazar-new-badge">جدید</span>}</header><div className="mbazar-order-card-main"><div className="mbazar-order-thumbs">{order.items.slice(0, 3).map((item) => <img src={item.image} alt="" key={item.id} />)}</div><div><MBazarOrderStatus status={order.status} /><p>{copy.detail}</p>{order.sellerGroups.length > 1 && <small>{order.sellerGroups.length.toLocaleString('fa-IR')} مرسوله از {order.sellerGroups.length.toLocaleString('fa-IR')} فروشگاه؛ زمان تحویل می‌تواند متفاوت باشد.</small>}</div><div className="mbazar-order-total"><small>مبلغ سفارش</small><strong>{formatMBazarPrice(order.totals.total)}</strong><span>تومان</span></div></div><footer><div><small>اقدام بعدی</small><strong>{order.nextAction?.label ?? 'فعلاً اقدامی لازم نیست'}</strong></div><a className="button button-primary" href={`/examples/mbazar/orders/${order.id}`}>مشاهده سفارش<MResalatIcon name="next" size={16} /></a></footer></article>;
}

type OrderFilter = 'all' | 'active' | 'delivered' | 'problem';
export function MBazarOrdersPage({ initialFilter = 'all', empty = false }: { initialFilter?: OrderFilter; empty?: boolean }) {
  const { orders, hydrated, resetDemo } = useMBazarCart();
  const [filter, setFilter] = useState<OrderFilter>(initialFilter);
  const shown = useMemo(() => (empty ? [] : orders).filter((order) => filter === 'all' || filter === 'active' && ['placed', 'seller-confirmed', 'preparing', 'shipped'].includes(order.status) || filter === 'delivered' && order.status === 'delivered' || filter === 'problem' && ['cancelled', 'issue'].includes(order.status)), [orders, filter, empty]);
  const select = (value: OrderFilter) => { setFilter(value); history.pushState(null, '', `/examples/mbazar/orders?filter=${value}`); };
  if (!hydrated) return <MBazarShell active="profile"><main className="mbazar-purchase-page"><div className="mbazar-loading" role="status">در حال آماده‌سازی سفارش‌ها…</div></main></MBazarShell>;
  return <MBazarShell active="profile"><MBazarAccountLayout active="orders"><header className="mbazar-account-head"><div><span>خریدهای من</span><h1>سفارش‌های من</h1><p>سفارش‌های فعال در اولویت‌اند؛ وضعیت فعلی و اقدام بعدی را بدون باز کردن جزئیات ببینید.</p></div></header><div className="mbazar-order-tabs" role="tablist" aria-label="فیلتر سفارش‌ها">{([['all', 'همه'], ['active', 'در حال انجام'], ['delivered', 'تحویل شده'], ['problem', 'لغو شده / مشکل‌دار']] as const).map(([id, label]) => <button role="tab" aria-selected={filter === id} className={filter === id ? 'active' : ''} onClick={() => select(id)} key={id}>{label}</button>)}</div>{shown.length ? <div className="mbazar-order-list">{shown.map((order) => <MBazarOrderCard order={order} key={order.id} />)}</div> : <section className="mbazar-account-empty"><MResalatIcon name="orders" size={32} /><h2>سفارشی در این بخش نیست</h2><p>با شروع خرید، وضعیت سفارش و اقدام بعدی اینجا نمایش داده می‌شود.</p><a className="button button-primary" href="/examples/mbazar">شروع خرید</a>{empty && <button className="button button-ghost" type="button" onClick={resetDemo}>بازنشانی سناریوی QA</button>}</section>}</MBazarAccountLayout></MBazarShell>;
}

export function MBazarOrderDetail({ id }: { id: string }) {
  const { orders, hydrated, addItem, transitionOrder } = useMBazarCart();
  const order = orders.find((item) => item.id === id || item.reference === id);
  useEffect(() => { if (order) trackEvent({ event: 'mbazar_order_opened', surface: 'marketplace', entityId: order.id, metadata: { status: order.status } }); }, [order]);
  if (!hydrated) return <MBazarShell active="profile"><main className="mbazar-purchase-page"><div className="mbazar-loading" role="status">در حال آماده‌سازی جزئیات سفارش…</div></main></MBazarShell>;
  if (!order) return <MBazarShell active="profile"><main className="mbazar-purchase-page"><section className="mbazar-checkout-error"><h1>سفارش پیدا نشد</h1><a className="button button-primary" href="/examples/mbazar/orders">بازگشت به سفارش‌ها</a></section></main></MBazarShell>;
  const delivered = order.status === 'delivered';
  const nextGroup = order.sellerGroups.find((group) => group.status !== 'delivered') ?? order.sellerGroups[0];
  const buyAgain = () => order.items.forEach((item) => addItem(item.productId));
  return <MBazarShell active="profile"><main className="mbazar-purchase-page"><nav className="mbazar-breadcrumbs"><a href="/examples/mbazar/orders">سفارش‌های من</a><MResalatIcon name="next" size={16} /><span>{order.reference}</span></nav><section className={`mbazar-order-hero status-${order.status}`}><div><small>سفارش {order.reference} · {order.createdAt}</small><MBazarOrderStatus status={order.status} prominent /><div className="mbazar-order-next"><span>مرحله بعد</span><strong>{delivered ? 'در صورت تمایل نظر خود را ثبت کنید' : order.status === 'issue' ? 'جزئیات مشکل را برای پشتیبانی ثبت کنید' : nextGroup.nextStep}</strong></div></div><div className="mbazar-order-hero-actions">{delivered && order.nextAction && <a className="button button-primary" href={order.nextAction.href}>ثبت نظر</a>}<a className="button button-secondary" href={`/examples/mbazar/support/new?order=${order.id}&seller=${nextGroup.seller.id}`}>پشتیبانی سفارش</a>{delivered && <button className="button button-ghost" type="button" onClick={buyAgain}>خرید مجدد</button>}</div></section>{order.status === 'issue' && <section className="mbazar-order-warning"><MResalatIcon name="warning" size={24} /><div><strong>آنچه می‌دانیم</strong><p>{order.issueSummary}</p></div></section>}{order.status === 'cancelled' && <section className="mbazar-order-warning neutral"><MResalatIcon name="error" size={24} /><div><strong>دلیل لغو</strong><p>{order.cancellationReason}</p><small>این دمو زمان یا وضعیت بازپرداختی را وعده نمی‌دهد.</small></div></section>}<section className="mbazar-order-detail-layout"><div><header className="mbazar-section-title"><h2>{delivered ? 'بسته‌های تحویل‌شده' : 'پیشرفت بسته‌ها'}</h2><span>هر فروشگاه مرسوله مستقل دارد</span></header><div className="mbazar-fulfillment-list">{order.sellerGroups.map((group) => <MBazarFulfillmentGroup group={group} order={order} key={group.id} />)}</div><MBazarAssistant title="درباره وضعیت این سفارش سؤال دارید؟" prompts={['سفارشم الان کجاست؟', 'مرحله بعد چیست؟', 'برای این سفارش مشکلی دارم']} />{order.status === 'issue' && <HumanHandoff />}</div><aside className="mbazar-order-facts"><h2>خلاصه خرید</h2><dl><div><dt>آدرس تحویل</dt><dd>{order.deliveryAddress.title} · {order.deliveryAddress.city}</dd></div><div><dt>روش تحویل</dt><dd>{order.deliveryMethod}</dd></div><div><dt>پرداخت</dt><dd>{order.paymentMode === 'cash' ? 'نقدی' : 'اقساطی'}</dd></div><div><dt>کالاها</dt><dd>{formatMBazarPrice(order.totals.subtotal)} تومان</dd></div><div><dt>تخفیف</dt><dd>{formatMBazarPrice(order.totals.discount)} تومان</dd></div><div><dt>ارسال</dt><dd>{formatMBazarPrice(order.totals.delivery)} تومان</dd></div><div className="total"><dt>مبلغ نهایی</dt><dd>{formatMBazarPrice(order.totals.total)} تومان</dd></div></dl><span className="mbazar-receipt-placeholder">رسید نمایشی خرید · فایل واقعی صادر نمی‌شود</span><details className="mbazar-qa-control"><summary>کنترل داخلی QA</summary><button type="button" className="button button-secondary" onClick={() => transitionOrder(order.id)}>انتقال به مرحله بعد</button></details></aside></section></main></MBazarShell>;
}
