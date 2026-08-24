import type { Metadata } from 'next';
import { MBazarSupportPage } from '@/mresalat/mbazar/MBazarSupport';
export const metadata: Metadata = { title: 'پشتیبانی ام‌بازار' };
export default async function SupportPage({ searchParams }: { searchParams: Promise<{ state?: string }> }) { return <MBazarSupportPage empty={(await searchParams).state === 'empty'} />; }
