import type { Metadata } from 'next';
import { MBazarAddressesPage } from '@/mresalat/mbazar/MBazarAccount';
export const metadata: Metadata = { title: 'آدرس‌های من در ام‌بازار' };
export default async function AddressesPage({ searchParams }: { searchParams: Promise<{ state?: string }> }) { return <MBazarAddressesPage empty={(await searchParams).state === 'empty'} />; }
