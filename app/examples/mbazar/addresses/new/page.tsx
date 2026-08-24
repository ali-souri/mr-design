import type { Metadata } from 'next';
import { MBazarAddressForm } from '@/mresalat/mbazar/MBazarAccount';
export const metadata: Metadata = { title: 'افزودن آدرس ام‌بازار' };
export default async function NewAddressPage({ searchParams }: { searchParams: Promise<{ state?: string }> }) { return <MBazarAddressForm fail={(await searchParams).state === 'error'} />; }
