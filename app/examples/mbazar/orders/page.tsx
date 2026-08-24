import type { Metadata } from 'next';
import { MBazarOrdersPage } from '@/mresalat/mbazar/MBazarOrders';
export const metadata: Metadata = { title: 'سفارش‌های من در ام‌بازار' };
export default async function OrdersPage({ searchParams }: { searchParams: Promise<{ filter?: string; state?: string }> }) { const query = await searchParams; const filter = ['all', 'active', 'delivered', 'problem'].includes(query.filter ?? '') ? query.filter as 'all' | 'active' | 'delivered' | 'problem' : 'all'; return <MBazarOrdersPage initialFilter={filter} empty={query.state === 'empty'} />; }
