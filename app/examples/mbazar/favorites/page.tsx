import type { Metadata } from 'next';
import { MBazarFavoritesPage } from '@/mresalat/mbazar/MBazarAccount';
export const metadata: Metadata = { title: 'علاقه‌مندی‌های ام‌بازار' };
export default async function FavoritesPage({ searchParams }: { searchParams: Promise<{ state?: string }> }) { return <MBazarFavoritesPage unavailable={(await searchParams).state === 'error'} />; }
