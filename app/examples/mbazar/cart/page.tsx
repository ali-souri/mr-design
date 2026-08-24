import type { Metadata } from 'next';
import { MBazarCartPage } from '@/mresalat/mbazar/MBazarPurchase';

export const metadata: Metadata = { title: 'سبد خرید ام‌بازار', description: 'مرور کالاها، فروشنده‌ها و شرایط خرید در ام‌بازار' };
export default function CartPage() { return <MBazarCartPage />; }
