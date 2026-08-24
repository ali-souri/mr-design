import type { Metadata } from 'next';
import { MBazarReviewForm } from '@/mresalat/mbazar/MBazarAccount';
export const metadata: Metadata = { title: 'ثبت نظر ام‌بازار' };
export default async function NewReviewPage({ searchParams }: { searchParams: Promise<{ order?: string; product?: string }> }) { const query = await searchParams; return <MBazarReviewForm orderId={query.order} productId={query.product} />; }
