import type { Metadata } from 'next';
import { MBazarSupportForm } from '@/mresalat/mbazar/MBazarSupport';
export const metadata: Metadata = { title: 'درخواست پشتیبانی ام‌بازار' };
export default async function NewSupportPage({ searchParams }: { searchParams: Promise<{ order?: string; seller?: string; state?: string }> }) { const query = await searchParams; return <MBazarSupportForm orderId={query.order} sellerId={query.seller} fail={query.state === 'error'} />; }
