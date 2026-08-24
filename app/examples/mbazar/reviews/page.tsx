import type { Metadata } from 'next';
import { MBazarReviewsPage } from '@/mresalat/mbazar/MBazarAccount';
export const metadata: Metadata = { title: 'نقد و نظرات ام‌بازار' };
export default async function ReviewsPage({ searchParams }: { searchParams: Promise<{ state?: string }> }) { return <MBazarReviewsPage noPending={(await searchParams).state === 'empty'} />; }
