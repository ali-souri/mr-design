import type { Metadata } from 'next';
import { MBazarOrderDetail } from '@/mresalat/mbazar/MBazarOrders';
export const metadata: Metadata = { title: 'جزئیات سفارش ام‌بازار' };
export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) { return <MBazarOrderDetail id={(await params).id} />; }
