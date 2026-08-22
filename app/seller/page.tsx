import type { Metadata } from 'next';
import { AssistantShell } from '@/mresalat/ai/AssistantShell';
import { AppShell } from '@/mresalat/core/AppShell';
import { Badge } from '@/mresalat/core/primitives';
import { sellerStats } from '@/mresalat/domains/mock-data';

export const metadata: Metadata = { title: 'خانه فروشنده' };

const sellerActions = [
  { icon: '+', label: 'ثبت محصول', detail: 'افزودن کالای جدید' },
  { icon: '▤', label: 'سفارشات', detail: '۱۸ سفارش باز' },
  { icon: '↙', label: 'تسویه', detail: 'مشاهده و درخواست' },
  { icon: '⌁', label: 'گزارش فروش', detail: 'عملکرد و روندها' },
];

const orders = [
  { id: 'MB-۱۴۰۵۸۳۲', customer: 'مریم احمدی', amount: '۴٬۸۵۰٬۰۰۰ تومان', status: 'آماده‌سازی', tone: 'warning' as const },
  { id: 'MB-۱۴۰۵۸۲۹', customer: 'رضا کریمی', amount: '۲٬۳۹۰٬۰۰۰ تومان', status: 'ارسال شد', tone: 'info' as const },
  { id: 'MB-۱۴۰۵۸۲۵', customer: 'سارا توکلی', amount: '۷٬۱۲۰٬۰۰۰ تومان', status: 'تحویل شده', tone: 'success' as const },
];

export default function SellerPage() {
  return (
    <AppShell active="seller">
      <section className="seller-welcome"><div><span className="eyebrow">شنبه، ۲۲ مرداد ۱۴۰۵</span><h1>سلام حسین، روز خوبی داشته باشید</h1><p>خلاصه امروز فروشگاه «خانه آبی» آماده است.</p></div><div className="seller-assistant"><span className="ai-orb" aria-hidden="true"><i>✦</i></span><div><strong>دستیار فروشنده</strong><small>برای گزارش، سفارش یا تسویه بپرسید</small></div><AssistantShell variant="compact" /></div></section>

      <section className="seller-actions" aria-label="دسترسی سریع فروشنده">{sellerActions.map((action) => <a href="#orders" key={action.label}><span aria-hidden="true">{action.icon}</span><div><strong>{action.label}</strong><small>{action.detail}</small></div><i aria-hidden="true">←</i></a>)}</section>

      <section className="seller-stats" aria-label="آمار فروشگاه">{sellerStats.map((stat) => <article key={stat.label}><div className="stat-head"><span>{stat.label}</span><i className={`mini-indicator ${stat.tone}`} aria-hidden="true" /></div><strong>{stat.value} <small>{stat.unit}</small></strong><p>{stat.trend}</p></article>)}</section>

      <div className="seller-layout">
        <section className="operations-card" id="orders"><div className="card-heading"><div><span className="eyebrow">عملیات امروز</span><h2>آخرین سفارش‌ها</h2></div><a className="text-link" href="#orders">مشاهده همه ←</a></div><div className="order-table"><div className="order-row order-header"><span>شماره سفارش</span><span>خریدار</span><span>مبلغ</span><span>وضعیت</span></div>{orders.map((order) => <div className="order-row" key={order.id}><b>{order.id}</b><span>{order.customer}</span><span>{order.amount}</span><Badge tone={order.tone}>{order.status}</Badge></div>)}</div></section>
        <aside className="seller-side"><article className="attention-card"><Badge tone="warning">نیازمند اقدام</Badge><h3>۵ سفارش منتظر آماده‌سازی است</h3><p>برای حفظ امتیاز ارسال، بهتر است تا ساعت ۱۵ وضعیت آن‌ها را به‌روز کنید.</p><a className="button button-secondary" href="#orders">بررسی سفارش‌ها</a></article><article className="store-health"><div className="health-ring"><strong>۹۲</strong><small>از ۱۰۰</small></div><div><span className="eyebrow">سلامت فروشگاه</span><h3>عملکرد عالی</h3><p>نرخ پاسخ‌گویی شما بهتر از ۸۸٪ فروشندگان است.</p></div></article></aside>
      </div>
    </AppShell>
  );
}
